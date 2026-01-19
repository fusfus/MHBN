import { DrawingUtils, HandLandmarker } from '@mediapipe/tasks-vision';

export class DebugManager {
    constructor() {
        this.overlayContainer = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.infoElement = null;
        this.drawingUtils = null;
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
    }
}

export const debugManager = new DebugManager();
