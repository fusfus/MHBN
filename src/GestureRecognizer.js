export class GestureRecognizer {
    constructor() {
        this.lastGesture = 'UNKNOWN';
    }

    detect(landmarks) {
        if (!landmarks || landmarks.length === 0) return 'UNKNOWN';

        // 1. Calculate distances
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];

        // Distance between Index and Thumb (for PINCH)
        const pinchDist = this.getDistance(thumbTip, indexTip);

        // Check individual finger states
        const isMiddleCurled = this.isFingerCurled(landmarks, 12, 9);
        const isRingCurled = this.isFingerCurled(landmarks, 16, 13);
        const isPinkyCurled = this.isFingerCurled(landmarks, 20, 17);
        const isIndexCurled = this.isFingerCurled(landmarks, 8, 5);

        // Check Thumb Extended
        const indexMCP = landmarks[5];
        const isThumbExtended = this.getDistance(thumbTip, indexMCP) > 0.08;

        // Check Index Extended (Strict)
        // Length of index finger (MCP to Tip)
        const indexLen = this.getDistance(indexTip, indexMCP);
        // If tip is far from mcp, it's extended.
        // Approx 0.08 - 0.1 depending on hand size. Let's say > 0.06 is extended.
        const isIndexExtended = indexLen > 0.06;

        // Logic Tree Priority
        if (pinchDist < 0.05) {
            return 'PINCH';
        }

        // SHAKA (Call Me): Thumb & Pinky Extended. Middle/Ring Curled.
        if (!isPinkyCurled && isThumbExtended && isMiddleCurled && isRingCurled) {
            return 'SHAKA';
        }

        // FIST: 4 fingers curled OR (3 fingers curled + Index NOT Extended)
        // Relaxed Fist often has index slightly loose, causing isIndexCurled to be false.
        // But if it's not extended, it shouldn't be Pointing.
        if ((isIndexCurled && isMiddleCurled && isRingCurled && isPinkyCurled) ||
            (!isIndexExtended && isMiddleCurled && isRingCurled && isPinkyCurled)) {
            return 'FIST';
        }

        // POINTING: Index Extended, others curled
        // STRICTER: Must check isIndexExtended
        if (isIndexExtended && isMiddleCurled && isRingCurled && isPinkyCurled) {
            return 'POINTING';
        }

        if (!isIndexCurled && !isMiddleCurled && !isRingCurled && !isPinkyCurled) {
            return 'OPEN_PALM';
        }

        return 'UNKNOWN';
    }

    isFingerCurled(landmarks, tipIdx, mcpIdx) {
        const tip = landmarks[tipIdx];
        const mcp = landmarks[mcpIdx]; // Knuckle
        const wrist = landmarks[0];

        // Simple heuristic: distance from tip to wrist < distance from mcp to wrist
        // Works well for palm facing camera
        return this.getDistance(tip, wrist) < this.getDistance(mcp, wrist);
    }

    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
    }
}

export const gestureRecognizer = new GestureRecognizer();
