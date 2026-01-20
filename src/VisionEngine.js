import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export class VisionEngine {
    constructor() {
        this.video = null;
        this.handLandmarker = null;
        this.isRunning = false;
        this.lastVideoTime = -1;
        this.results = null;

        // Offscreen canvas for Safari CPU fallback
        this.offscreenCanvas = null;
        this.offscreenCtx = null;
        this.isSafari = false;
    }

    async initialize() {
        // Safari detection
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // 1. Initialize MediaPipe HandLandmarker
        // Use a more recent stable version for WASM 
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
        );

        const isWebGLSupported = () => {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        };

        // Determine Delegate
        // Force CPU on Safari to avoid "kGpuService" / emscripten WebGL errors
        const useGPU = isWebGLSupported() && !this.isSafari;
        const delegate = useGPU ? 'GPU' : 'CPU';

        console.log(`VisionEngine: Environment Check - WebGL: ${isWebGLSupported()}, Safari: ${this.isSafari}`);
        console.log(`VisionEngine: Selected Delegate: ${delegate}`);

        const createLandmarker = async (selectedDelegate) => {
            return await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: selectedDelegate,
                },
                runningMode: 'VIDEO',
                numHands: 1,
            });
        };

        try {
            // SAFARI FIX V4: Dummy Class + getContext Hijacking
            // 1. "undefined" checks caused "instanceof" error.
            // 2. Real WebGL caused "kGpuService" error.
            // Solution: Replace WebGLRenderingContext with a DUMMY CLASS.
            // This satisfies "instanceof" (it won't throw, just returns false)
            // and hides the real WebGL capability from Emscripten/MediaPipe.

            let savedWebGL = null;
            let savedWebGL2 = null;
            let originalGetContext = null;

            if (this.isSafari) {
                console.log('VisionEngine: Applying Safari WebGL Dumb-stub...');

                // 1. Backup and Replace Globals with Dummy Class
                if (window.WebGLRenderingContext) {
                    savedWebGL = window.WebGLRenderingContext;
                    window.WebGLRenderingContext = class MockWebGL { };
                }
                if (window.WebGL2RenderingContext) {
                    savedWebGL2 = window.WebGL2RenderingContext;
                    window.WebGL2RenderingContext = class MockWebGL2 { };
                }

                // 2. Hijack getContext to ensure no sneakiness
                originalGetContext = HTMLCanvasElement.prototype.getContext;
                HTMLCanvasElement.prototype.getContext = function (type, options) {
                    if (type === 'webgl' || type === 'experimental-webgl' || type === 'webgl2') {
                        return null;
                    }
                    return originalGetContext.call(this, type, options);
                };
            }

            try {
                this.handLandmarker = await createLandmarker(delegate);
                console.log(`VisionEngine: HandLandmarker initialized (${delegate})`);
            } finally {
                // RESTORE Everything immediately
                if (this.isSafari) {
                    if (savedWebGL) window.WebGLRenderingContext = savedWebGL;
                    if (savedWebGL2) window.WebGL2RenderingContext = savedWebGL2;
                    if (originalGetContext) HTMLCanvasElement.prototype.getContext = originalGetContext;
                    console.log('VisionEngine: Safari WebGL Hooks Restored.');
                }
            }

        } catch (error) {
            console.warn(`VisionEngine: ${delegate} initialization failed.`, error);
            if (delegate === 'GPU') {
                console.log('VisionEngine: Falling back to CPU...');
                try {
                    this.handLandmarker = await createLandmarker('CPU');
                    console.log('VisionEngine: HandLandmarker initialized (CPU - Fallback)');
                } catch (cpuError) {
                    console.error('VisionEngine: CPU Fallback also failed.', cpuError);
                    throw cpuError;
                }
            } else {
                throw error;
            }
        }
    }

    async startCamera(videoElement) {
        this.video = videoElement;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
        }

        const startVideo = async (constraints) => {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = stream;

            // Wait for metadata to load
            await new Promise((resolve) => {
                if (this.video.readyState >= 2) { // 2 = HAVE_CURRENT_DATA
                    resolve();
                } else {
                    this.video.onloadedmetadata = () => resolve();
                }
            });

            // Initialize offscreen canvas for Safari
            if (this.isSafari) {
                this.offscreenCanvas = document.createElement('canvas');
                this.offscreenCanvas.width = this.video.videoWidth;
                this.offscreenCanvas.height = this.video.videoHeight;
                this.offscreenCtx = this.offscreenCanvas.getContext('2d');
                console.log('VisionEngine: Offscreen Canvas initialized for Safari fallback');
            }

            // Robust play handling for Safari
            try {
                await this.video.play();
            } catch (playError) {
                console.warn('VisionEngine: Auto-play failed, attempting mute-play workaround.', playError);
                this.video.muted = true;
                await this.video.play();
            }
        };

        try {
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            };
            await startVideo(constraints);

        } catch (err) {
            console.warn('VisionEngine: Standard constraints failed, trying fallback...', err);
            await startVideo({ video: true });
        }

        this.isRunning = true;
        console.log('VisionEngine: Camera started');
    }

    detect() {
        if (!this.isRunning || !this.handLandmarker || !this.video) return null;

        let startTimeMs = performance.now();

        if (this.video.currentTime !== this.lastVideoTime) {
            this.lastVideoTime = this.video.currentTime;

            // CRITICAL SAFARI FIX:
            // Passing <video> directly to detectForVideo on Safari (even in CPU mode)
            // can trigger internal WebGL usage causing kGpuService errors.
            // We force drawing to a canvas first, then pass the canvas.
            let inputSource = this.video;

            if (this.isSafari && this.offscreenCtx) {
                this.offscreenCtx.drawImage(this.video, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
                inputSource = this.offscreenCanvas;
            }

            this.results = this.handLandmarker.detectForVideo(inputSource, startTimeMs);
        }

        // Process results for Cursor
        if (this.results && this.results.landmarks && this.results.landmarks.length > 0) {
            const landmarks = this.results.landmarks[0];
            const indexTip = landmarks[8]; // Index finger tip

            // Remap coordinates
            const cursorState = this.remapCoordinates(indexTip);

            // Check Bounds
            const x = indexTip.x;
            const y = indexTip.y;
            const isOutOfBounds = (x < 0.15 || x > 0.85 || y < 0.15 || y > 0.85);

            return {
                raw: this.results,
                cursor: cursorState,
                isOutOfBounds: isOutOfBounds
            };
        }

        return { raw: this.results, cursor: null };
    }

    // Map Hand coordinates (0-1) from ROI to Screen (0-1)
    remapCoordinates(landmark) {
        // MediaPipe: x increases left to right (0 -> 1), y top to bottom (0 -> 1)
        const x = landmark.x;
        const y = landmark.y;

        // ROI Config (60% box in center)
        const roiSize = 0.6;
        const roiStart = (1 - roiSize) / 2; // 0.2
        const roiEnd = roiStart + roiSize;  // 0.8

        // Remap
        let mapX = (x - roiStart) / roiSize;
        let mapY = (y - roiStart) / roiSize;

        // Clamp
        mapX = Math.max(0, Math.min(1, mapX));
        mapY = Math.max(0, Math.min(1, mapY));

        return { x: 1 - mapX, y: mapY };
    }
}

export const visionEngine = new VisionEngine();
