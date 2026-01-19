# Project HandFlow (MHBN) - Implementation Specification

## 1. Project Overview
We are building **MotionHand Browser Navigator (MHBN)**, a cross-browser library that allows users to control the mouse cursor and interact with web elements using hand gestures via a webcam.
* **Core Tech:** Google MediaPipe Hands, Vanilla JavaScript (ES6+), HTML5, CSS3.
* **Build Tool:** Vite (Preferred for HMR and module handling).

## 2. Core Architecture
The system consists of three main modules:
1.  **Vision Engine:** Wraps MediaPipe Hands, handles camera input, and coordinate mapping.
2.  **Interaction Engine:** State machine for gestures, conflict management (Mouse vs. Hand), and event triggering.
3.  **Debug System:** 3-layer observability stack (Visual Overlay, Console, IndexedDB).

## 3. Functional Requirements

### 3.1 Vision & Mapping
* **Input:** Webcam stream (mirrored).
* **ROI Mapping:** Define a "virtual box" (approx 60% of camera view) in the center. Map hand movements within this box to 100% of the screen viewport.
* **Smoothing:** Implement a smoothing algorithm (e.g., Moving Average or Kalman Filter) to reduce jitter for the virtual cursor.

### 3.2 Gesture Definitions
Implement a Gesture Recognizer that detects:
* **POINTING (Idle/Move):** Index finger extended. Controls cursor position.
* **PINCH (Click):** Index tip (Landmark 8) and Thumb tip (Landmark 4) distance < threshold. Triggers `click` event.
* **OPEN_PALM (Cancel/Reset):** All fingers extended. Stops cursor movement immediately.
* **THUMB_LEFT (Back):** Thumb extended to the left (hitchhiker style) or Swipe Left. Triggers a "Go Back" action.
* **FIST (Scroll):** All fingers closed. Enters scroll mode (drag to scroll).

### 3.3 Visual Feedback (UI)
* **Virtual Cursor:**
    * State 1 (Idle): Red ring or semi-transparent hand icon.
    * State 2 (Active/Click): Shrinks, color changes to Green.
* **Focus Target (The "Blue Box"):**
    * When the virtual cursor hovers over clickable elements (a, button, input) for > 200ms:
    * Add a CSS class `.focused` to the target element (Style: Blue Outline / Glow).
    * Snap the virtual cursor slightly to the center of the element (Magnetic effect).

### 3.4 Conflict Management (Input Preemption)
* **Default:** Physical mouse has priority.
* **Hand Activation:** When hand is detected + stable for 1s -> Hide physical cursor, Show virtual cursor.
* **Mouse Override:** If physical mouse moves > 50px -> Hide virtual cursor, Show physical cursor.

## 4. Debug Mode & Observability (CRITICAL)
Implement a robust `DebugManager` class controlled by a flag `DEBUG_MODE = true`.

* **Layer 1: Visual Overlay (PIP)**
    * Create a PIP (Picture-in-Picture) window in the corner.
    * Show raw camera feed with MediaPipe Skeleton (Landmarks & Connectors).
    * Show the ROI (Region of Interest) blue box.
    * Display HUD: Current Gesture Name, FPS, Confidence Score.
* **Layer 2: Console Telemetry**
    * Implement Log Levels: 0 (Silent), 1 (Events - "Gesture: Pinch"), 2 (Errors).
* **Layer 3: Session Recorder (IndexedDB)**
    * Use a Web Worker to asynchronously log frame data (timestamp, landmarks, gesture_state) to IndexedDB.
    * Provide a UI button in the PIP overlay: "Download Session Log" (exports JSON).

## 5. File Structure Plan
```text
/
├── index.html
├── style.css
├── main.js             # Entry point
├── src/
│   ├── VisionEngine.js     # MediaPipe setup & Coordinate Mapping
│   ├── GestureRecognizer.js # Logic for Pinch, Open, Fist
│   ├── CursorManager.js    # Virtual cursor DOM & Smoothing
│   ├── InteractionManager.js # Conflict handling & Click triggering
│   └── DebugManager.js     # Overlay, Logging, IndexedDB

## 6. Implementation Instructions
Phase 1: Set up Vite project, initialize MediaPipe, and render the Debug Overlay (Layer 1) first. We need to see the skeleton before moving the cursor.

Phase 2: Implement VisionEngine with ROI mapping and CursorManager to move a div on screen.

Phase 3: Implement GestureRecognizer and InteractionManager (The Blue Box focus logic).

Phase 4: Complete the Debug System (IndexedDB) and polish UI.

Action: Please start by generating the project structure and the code for Phase 1 (Setup + Vision + Debug Overlay). I want to confirm I can see the camera and skeleton first.