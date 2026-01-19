import { DrawingUtils, HandLandmarker } from '@mediapipe/tasks-vision';

export class DebugManager {
    constructor() {
        this.overlayContainer = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.infoElement = null;
        this.drawingUtils = null;

        // Session Recording
        this.worker = new Worker(new URL('./workers/LogWorker.js', import.meta.url));
        this.worker.onmessage = this.handleWorkerMessage.bind(this);
        this.worker.postMessage({ type: 'INIT' });

        this.isRecording = false;
        this.recordBtn = null;
    }

    handleWorkerMessage(e) {
        const { type, data } = e.data;
        if (type === 'EXPORT_READY') {
            this.downloadJSON(data);
        } else if (type === 'RECORDING_STARTED') {
            this.isRecording = true;
            this.updateRecordBtn();
        } else if (type === 'RECORDING_STOPPED') {
            this.isRecording = false;
            this.updateRecordBtn();
        }
    }

    downloadJSON(data) {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mhbn_session_${data.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    createOverlay() {
        // Create container
        this.overlayContainer = document.createElement('div');
        this.overlayContainer.className = 'debug-overlay';

        // Create video element (source)
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.videoElement.playsInline = true;
        this.videoElement.muted = true; // Important for autoplay policy

        // Create canvas (drawing)
        this.canvasElement = document.createElement('canvas');

        // Create Info HUD
        this.infoElement = document.createElement('div');
        this.infoElement.className = 'debug-info';
        this.infoElement.innerText = 'Initializing...';

        // Append all
        this.overlayContainer.appendChild(this.videoElement);
        this.overlayContainer.appendChild(this.canvasElement);
        this.overlayContainer.appendChild(this.infoElement);

        document.body.appendChild(this.overlayContainer);

        this.canvasCtx = this.canvasElement.getContext('2d');
        this.drawingUtils = new DrawingUtils(this.canvasCtx);

        return this.videoElement;
    }

    update(results, gestureName = '', isOutOfBounds = false) {
        if (!this.canvasElement || !this.videoElement) return;

        // Resize canvas to match video if needed
        if (
            this.canvasElement.width !== this.videoElement.videoWidth ||
            this.canvasElement.height !== this.videoElement.videoHeight
        ) {
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
        }

        // Clear canvas
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

        // Draw landmarks
        if (results && results.landmarks) {
            for (const landmarks of results.landmarks) {
                this.drawingUtils.drawConnectors(
                    landmarks,
                    HandLandmarker.HAND_CONNECTIONS,
                    { color: '#00FF00', lineWidth: 5 }
                );
                this.drawingUtils.drawLandmarks(landmarks, { color: '#FF0000', lineWidth: 2 });
            }

            this.infoElement.innerText = `Hands: ${results.landmarks.length} | Gesture: ${gestureName}`;
        } else {
            this.infoElement.innerText = `No hands detected | ${gestureName}`;
        }

        // Draw ROI Box (Simple static box for now - 60% center)
        const w = this.canvasElement.width;
        const h = this.canvasElement.height;
        if (w > 0 && h > 0) {
            const roiW = w * 0.6;
            const roiH = h * 0.6;
            const roiX = (w - roiW) / 2;
            const roiY = (h - roiH) / 2;

            this.canvasCtx.strokeStyle = isOutOfBounds ? '#FF3B30' : 'blue';
            this.canvasCtx.lineWidth = isOutOfBounds ? 5 : 3;
            this.canvasCtx.strokeRect(roiX, roiY, roiW, roiH);

            if (isOutOfBounds) {
                this.canvasCtx.fillStyle = '#FF3B30';
                this.canvasCtx.font = '24px Arial';
                this.canvasCtx.textAlign = 'center';
                this.canvasCtx.fillText('MOVE HAND TO CENTER', w / 2, roiY - 10);
            }
        }

        this.canvasCtx.restore();
        this.canvasCtx.restore();

        // REC Logic
        if (this.isRecording && results && results.landmarks) {
            // Log frame to worker
            // We strip heavy data, just keep landmarks & gesture
            this.worker.postMessage({
                type: 'LOG_FRAME',
                payload: {
                    gesture: gestureName,
                    landmarks: results.landmarks[0] // just first hand
                }
            });
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.worker.postMessage({ type: 'STOP' });
        } else {
            this.worker.postMessage({ type: 'START' });
        }
    }

    updateRecordBtn() {
        if (!this.recordBtn) return;
        if (this.isRecording) {
            this.recordBtn.innerText = '■ Stop';
            this.recordBtn.style.background = '#FF3B30';
            this.recordBtn.style.color = 'white';
        } else {
            this.recordBtn.innerText = '● Rec';
            this.recordBtn.style.background = '';
            this.recordBtn.style.color = '';
        }
    }
}

export const debugManager = new DebugManager();
