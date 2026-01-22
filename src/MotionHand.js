import { visionEngine } from './VisionEngine.js';
import { debugManager } from './DebugManager.js';
import { cursorManager } from './CursorManager.js';
import { gestureRecognizer } from './GestureRecognizer.js';
import { interactionManager } from './InteractionManager.js';
import { dashboard } from './ui/Dashboard.js';

export class MotionHandSystem {
    constructor() {
        this.initialized = false;
        this.loopId = null;
    }

    async init(config = {}) {
        if (this.initialized) return;

        console.log('MotionHand: Initializing...');

        // 1. Setup UI Overlay for Host System (if needed)
        // If config.overlay is true, we might create a container. 
        // For now, we assume the host provides the video element implicitly via debugManager or we make one.

        // 2. Vision & Debug
        // Create overlay video element (hidden or shown)
        const videoElement = debugManager.createOverlay();

        // Configurable debug visibility
        const debugOverlay = document.querySelector('.debug-overlay');
        if (debugOverlay) {
            debugOverlay.style.display = config.showDebug ? 'block' : 'none';
        }

        // 3. Cursor
        cursorManager.initialize();

        // 4. Vision Engine
        await visionEngine.initialize();
        await visionEngine.startCamera(videoElement);

        this.initialized = true;
        this.startLoop();

        console.log('MotionHand: System Ready.');
    }

    startLoop() {
        const loop = () => {
            const result = visionEngine.detect();
            let detectedGesture = 'UNKNOWN';

            if (result && result.raw && result.raw.landmarks && result.raw.landmarks.length > 0) {
                const landmarks = result.raw.landmarks[0];
                detectedGesture = gestureRecognizer.detect(landmarks);

                debugManager.update(result.raw, detectedGesture, result.isOutOfBounds);
                if (result.cursor) {
                    interactionManager.update(detectedGesture, result.cursor.y, result.cursor.x);
                }
            } else {
                debugManager.update(null, 'NO HAND');
            }

            // Update Dashboard if it exists (Standalone Mode)
            // In library mode, we might emit events instead.
            if (typeof dashboard !== 'undefined' && dashboard.updateGesture) {
                dashboard.updateGesture(detectedGesture, result ? result.isOutOfBounds : false);
            }

            if (result && result.cursor) {
                cursorManager.show();
                cursorManager.updatePosition(result.cursor.x, result.cursor.y);
            }

            this.loopId = requestAnimationFrame(loop);
        };
        loop();
    }

    stop() {
        if (this.loopId) {
            cancelAnimationFrame(this.loopId);
        }
        // Additional cleanup...
    }
}

export const motionHand = new MotionHandSystem();

// Auto-Initialization for Standalone/External Usage
if (typeof window !== 'undefined') {
    window.onload = () => {
        const autoInitGlobal = window.MHBN_AUTO_INIT === true;
        let autoInitScript = false;

        // Check for script tag attribute: <script src="..." data-auto-init="true">
        // Note: document.currentScript is only available during script execution, 
        // effectively for UMD/IIFE scripts, not modules if deferred.
        if (document.currentScript && document.currentScript.getAttribute('data-auto-init') === 'true') {
            autoInitScript = true;
        } else {
            // Fallback: search all scripts if we missed it (e.g. for modules or async)
            const scripts = document.querySelectorAll('script');
            for (let script of scripts) {
                if (script.src.includes('main.js') && script.getAttribute('data-auto-init') === 'true') {
                    autoInitScript = true;
                    break;
                }
            }
        }

        if (autoInitGlobal || autoInitScript) {
            console.log('MotionHand: Auto-initializing...');
            motionHand.init({ showDebug: true });
        }
    };
}
