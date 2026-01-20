import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export class VisionEngine {
    constructor() {
        this.video = null;
        this.handLandmarker = null;
        this.isRunning = false;
        this.lastVideoTime = -1;
        this.results = null;
    }

    async initialize() {
        // 1. Initialize MediaPipe HandLandmarker
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
        );

        try {
            this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: 'GPU',
                },
                runningMode: 'VIDEO',
                numHands: 1,
            });
            console.log('VisionEngine: HandLandmarker initialized (GPU)');
        } catch (error) {
            console.warn('VisionEngine: GPU initialization failed, falling back to CPU.', error);
            this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: 'CPU',
                },
                runningMode: 'VIDEO',
                numHands: 1,
            });
            console.log('VisionEngine: HandLandmarker initialized (CPU)');
        }
    }

    async startCamera(videoElement) {
        this.video = videoElement;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser API navigator.mediaDevices.getUserMedia not available');
        }

        try {
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = stream;
        } catch (err) {
            console.warn('VisionEngine: Standard constraints failed, trying fallback...', err);
            // Fallback: minimal constraints
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            this.video.srcObject = stream;
        }
        await new Promise((resolve) => {
            this.video.onloadedmetadata = () => {
                this.video.play();
                resolve();
            };
        });

        this.isRunning = true;
        console.log('VisionEngine: Camera started');
    }

    detect() {
        if (!this.isRunning || !this.handLandmarker || !this.video) return null;

        let startTimeMs = performance.now();

        if (this.video.currentTime !== this.lastVideoTime) {
            this.lastVideoTime = this.video.currentTime;
            this.results = this.handLandmarker.detectForVideo(this.video, startTimeMs);
        }

        // Process results for Cursor
        if (this.results && this.results.landmarks && this.results.landmarks.length > 0) {
            const landmarks = this.results.landmarks[0];
            const indexTip = landmarks[8]; // Index finger tip

            // Remap coordinates
            const cursorState = this.remapCoordinates(indexTip);

            // Check if out of bounds (ROI defined in remapCoordinates is 0.2 to 0.8)
            // Let's centralize ROI logic or just check raw usage.
            // Raw x, y are 0-1. ROI is 0.2-0.8.
            // Margin of error: If < 0.15 or > 0.85, warn user.
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

        // Invert X because user expects mirror behavior for cursor?
        // If I move my hand RIGHT (screen right), landmark x increases.
        // So mapX increases.
        // CSS transform translate(x,y) moves RIGHT.
        // So NO inversion needed if we want direct mapping. 

        return { x: 1 - mapX, y: mapY };
    }
}

export const visionEngine = new VisionEngine();
