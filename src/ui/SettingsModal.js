import { settingsStore } from '../store/SettingsStore.js';

export class SettingsModal {
    constructor() {
        this.element = null;
        this.isOpen = false;
        this.unsub = null;
    }

    render() {
        if (this.element) return;

        this.element = document.createElement('div');
        this.element.className = 'mhbn-settings-modal hidden';

        this.element.innerHTML = `
            <div class="settings-content glass-panel">
                <div class="settings-header">
                    <h2>⚙️ Configuration</h2>
                    <button class="close-btn" id="settings-close">×</button>
                </div>
                
                <div class="settings-section">
                    <h3>Sensitivity</h3>
                    
                    <div class="control-row">
                        <label>Cursor Smoothness</label>
                        <input type="range" min="1" max="10" id="set-cursor-speed">
                    </div>
                    <div class="control-row">
                        <label>Scroll Speed</label>
                        <input type="range" min="1" max="10" id="set-scroll-speed">
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Gestures</h3>
                    
                    <div class="control-row">
                        <label>👌 Pinch to Click</label>
                        <input type="checkbox" class="toggle" id="toggle-click">
                    </div>
                    <div class="control-row">
                        <label>✊ Fist to Scroll</label>
                        <input type="checkbox" class="toggle" id="toggle-scroll">
                    </div>
                    <div class="control-row">
                        <label>🤙 Shaka to Go Back</label>
                        <input type="checkbox" class="toggle" id="toggle-back">
                    </div>
                </div>
                
                <div class="settings-footer">
                    <button class="btn-primary" id="settings-save">Done</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.element);
        this.attachListeners();

        // Subscribe to store updates to sync UI
        this.unsub = settingsStore.addListener((state) => {
            this.syncUI(state);
        });
    }

    attachListeners() {
        const closeBtn = this.element.querySelector('#settings-close');
        const saveBtn = this.element.querySelector('#settings-save');

        const closeAction = () => this.close();
        closeBtn.addEventListener('click', closeAction);
        saveBtn.addEventListener('click', closeAction);

        // Inputs
        this.element.querySelector('#set-cursor-speed').addEventListener('input', (e) => {
            settingsStore.update({ cursorSensitivity: parseInt(e.target.value) });
        });

        this.element.querySelector('#set-scroll-speed').addEventListener('input', (e) => {
            settingsStore.update({ scrollSpeed: parseInt(e.target.value) });
        });

        // Toggles
        this.element.querySelector('#toggle-click').addEventListener('change', (e) => {
            settingsStore.updateGesture('click', e.target.checked);
        });

        this.element.querySelector('#toggle-scroll').addEventListener('change', (e) => {
            settingsStore.updateGesture('scroll', e.target.checked);
        });

        this.element.querySelector('#toggle-back').addEventListener('change', (e) => {
            settingsStore.updateGesture('back', e.target.checked);
        });
    }

    syncUI(state) {
        if (!this.element) return;

        this.element.querySelector('#set-cursor-speed').value = state.cursorSensitivity;
        this.element.querySelector('#set-scroll-speed').value = state.scrollSpeed;

        this.element.querySelector('#toggle-click').checked = state.gestures.click;
        this.element.querySelector('#toggle-scroll').checked = state.gestures.scroll;
        this.element.querySelector('#toggle-back').checked = state.gestures.back;
    }

    open() {
        this.element.classList.remove('hidden');
        this.isOpen = true;
    }

    close() {
        this.element.classList.add('hidden');
        this.isOpen = false;
    }
}

export const settingsModal = new SettingsModal();
