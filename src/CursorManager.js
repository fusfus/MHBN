import { settingsStore } from './store/SettingsStore.js';

export class CursorManager {
    constructor() {
        this.cursor = null;
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        // Smoothing factor (0.1 = very smooth/slow, 0.9 = fast/jittery)
        this.smoothing = 0.3;
        this.isVisible = false;

        // Listen for settings changes
        settingsStore.addListener((state) => {
            // Map 1-10 to 0.05-0.9
            // 1 -> 0.05 (Very slow/smooth)
            // 5 -> 0.3 (Default)
            // 10 -> 0.9 (Fast/Responsive)
            const val = state.cursorSensitivity;
            this.smoothing = val === 1 ? 0.05 : (val * 0.09); // Approx
        });
    }

    initialize() {
        // Create cursor element
        this.cursor = document.createElement('div');
        this.cursor.className = 'virtual-cursor';
        document.body.appendChild(this.cursor);
        this.hide();
    }

    show() {
        if (!this.isVisible && this.cursor) {
            this.cursor.style.display = 'block';
            this.isVisible = true;
        }
    }

    hide() {
        if (this.isVisible && this.cursor) {
            this.cursor.style.display = 'none';
            this.isVisible = false;
        }
    }

    updatePosition(normalizedX, normalizedY) {
        if (!this.cursor) return;

        // Convert normalized (0-1) to screen coordinates
        // MediaPipe x is normalized [0,1], but mirrored. 
        // Usually we flip it in VisionEngine or here. 
        // Let's assume VisionEngine passes a screen-ready normalized X (0 = left, 1 = right).

        const screenX = normalizedX * window.innerWidth;
        const screenY = normalizedY * window.innerHeight;

        this.targetX = screenX;
        this.targetY = screenY;

        // Lerp (Linear Interpolation) for smoothing
        this.x += (this.targetX - this.x) * this.smoothing;
        this.y += (this.targetY - this.y) * this.smoothing;

        this.cursor.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    setClickState(isClicked) {
        if (!this.cursor) return;
        if (isClicked) {
            this.cursor.classList.add('active');
        } else {
            this.cursor.classList.remove('active');
        }
    }

    hideVisual() {
        if (this.cursor) this.cursor.style.opacity = '0';
    }

    showVisual() {
        if (this.cursor) this.cursor.style.opacity = '1';
    }
}

export const cursorManager = new CursorManager();
