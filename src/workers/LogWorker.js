// LogWorker.js - Handles async logging to IndexedDB
const DB_NAME = 'MHBN_Logs';
const STORE_NAME = 'sessions';
let db = null;
let currentSessionId = null;
let isRecording = false;

self.onmessage = async (e) => {
    const { type, payload } = e.data;

    switch (type) {
        case 'INIT':
            await initDB();
            self.postMessage({ type: 'INIT_DONE' });
            break;
        case 'START':
            startSession();
            break;
        case 'LOG_FRAME':
            if (isRecording) logFrame(payload);
            break;
        case 'STOP':
            await stopSession();
            break;
        case 'EXPORT':
            await exportSession();
            break;
    }
};

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve();
        };

        request.onerror = (event) => {
            console.error('Worker DB Error:', event.target.error);
            reject(event.target.error);
        };
    });
}

function startSession() {
    if (!db) return;
    currentSessionId = Date.now();
    isRecording = true;

    // Create new session entry
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.add({
        id: currentSessionId,
        startTime: new Date().toISOString(),
        frames: []
    });

    self.postMessage({ type: 'RECORDING_STARTED', sessionId: currentSessionId });
}

function logFrame(frameData) {
    if (!db || !currentSessionId) return;

    // We append to the current session's frame array
    // NOTE: For very long sessions, this naive "get-update-put" approach is slow.
    // Ideally we would store frames in a separate store mapped by session_id.
    // But for short debug sessions (< 1 min), this is fine.

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(currentSessionId);

    request.onsuccess = () => {
        const data = request.result;
        if (data) {
            data.frames.push({
                t: Date.now(),
                ...frameData
            });
            store.put(data);
        }
    };
}

async function stopSession() {
    isRecording = false;
    self.postMessage({ type: 'RECORDING_STOPPED' });
}

async function exportSession() {
    if (!db) return;

    // Get the last session (or all?) - Let's get the most recent one
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll(); // Be careful if DB is huge

    request.onsuccess = () => {
        const sessions = request.result;
        if (sessions.length > 0) {
            // Get last session
            const lastSession = sessions[sessions.length - 1];
            self.postMessage({ type: 'EXPORT_READY', data: lastSession });
        } else {
            console.warn('Worker: No sessions to export');
        }
    };
}
