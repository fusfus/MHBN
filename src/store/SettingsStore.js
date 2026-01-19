export class SettingsStore {
    constructor() {
        // Default Settings
        this.state = {
            cursorSensitivity: 5, // 1-10
            scrollSpeed: 5,       // 1-10
            gestures: {
                click: true,
                scroll: true,
                back: true // Enable/Disable Shaka
            },
            showDebug: false
        };

        this.listeners = [];
        this.loadSettings();
    }

    // -- State Management --

    getState() {
        return this.state;
    }

    update(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
        this.saveSettings();
    }

    updateGesture(gestureName, isEnabled) {
        this.state.gestures = { ...this.state.gestures, [gestureName]: isEnabled };
        this.notify();
        this.saveSettings();
    }

    // -- Persistence --

    saveSettings() {
        try {
            localStorage.setItem('mhbn-settings', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save settings', e);
        }
    }

    loadSettings() {
        try {
            const stored = localStorage.getItem('mhbn-settings');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Merge to ensure new keys exist if stored is old
                this.state = { ...this.state, ...parsed, gestures: { ...this.state.gestures, ...parsed.gestures } };
            }
        } catch (e) {
            console.error('Failed to load settings', e);
        }
    }

    // -- Observer Pattern --

    addListener(callback) {
        this.listeners.push(callback);
        // Initial call
        callback(this.state);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notify() {
        this.listeners.forEach(cb => cb(this.state));
    }
}

export const settingsStore = new SettingsStore();
