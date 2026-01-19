import { visionEngine } from '../VisionEngine.js';
import { debugManager } from '../DebugManager.js';
import { cursorManager } from '../CursorManager.js';
import { settingsModal } from './SettingsModal.js';

export class Dashboard {
    constructor() {
        this.element = null;
        this.sensitivity = 3;
        this.gestureScale = {
            'UNKNOWN': 1,
            'OPEN_PALM': 1,
            'FIST': 0.8,
            'PINCH': 0.8,
            'POINTING': 1,
            'THUMB_OPEN': 1,
            'VICTORY': 1,
            'SHAKA': 1
        };
    }

    updateGesture(gesture, isOutOfBounds = false) {
        if (!this.element) return;
        const valueEl = this.element.querySelector('#gesture-value');

        if (isOutOfBounds) {
            if (valueEl) valueEl.innerText = 'OUT OF RANGE';
            valueEl.style.color = '#FF3B30';
            this.element.querySelector('.glass-panel').classList.add('warning-border');
        } else {
            if (valueEl) {
                valueEl.innerText = gesture;
                valueEl.style.color = '#fff';
            }
            this.element.querySelector('.glass-panel').classList.remove('warning-border');
        }

        // Visual feedback on glass panel
        const scale = this.gestureScale[gesture] || 1;
        // this.element.querySelector('.glass-panel').style.transform = `scale(${scale})`;
    }

    render() {
        // Init Modal as well
        settingsModal.render();

        this.element = document.createElement('div');
        this.element.className = 'mhbn-dashboard';

        this.element.innerHTML = `
      <div class="glass-panel">
        <header class="dashboard-header">
           <div class="logo">
             <span class="icon">🖐️</span> HandFlow
           </div>
           <div class="status-indicator active" id="camera-status"></div>
        </header>

        <div class="content">
            <div class="stats">
                <div class="stat-item">
                    <span class="label">FPS</span>
                    <span class="value" id="fps-value">60</span>
                </div>
                <div class="stat-item">
                    <span class="label">Gesture</span>
                    <span class="value" id="gesture-value">--</span>
                </div>
            </div>

            <div class="actions">
                <button class="btn-primary" id="open-settings" style="background:#555; margin-bottom:10px;">⚙️ Settings</button>
                <button class="btn-primary" id="toggle-debug">Toggle Debug</button>
            </div>
        </div>
      </div>
    `;

        document.body.appendChild(this.element);
        this.attachListeners();
    }

    attachListeners() {
        const debugBtn = this.element.querySelector('#toggle-debug');
        debugBtn.addEventListener('click', () => {
            const video = document.querySelector('.debug-overlay');
            if (video) {
                video.style.display = video.style.display === 'none' ? 'block' : 'none';
            }
        });

        const settingsBtn = this.element.querySelector('#open-settings');
        settingsBtn.addEventListener('click', () => {
            settingsModal.open();
        });
    }
}

export const dashboard = new Dashboard();
