import './style.css';
import { visionEngine } from './src/VisionEngine.js';
import { debugManager } from './src/DebugManager.js';
import { cursorManager } from './src/CursorManager.js';
import { gestureRecognizer } from './src/GestureRecognizer.js';
import { interactionManager } from './src/InteractionManager.js';

import { dashboard } from './src/ui/Dashboard.js';
import { landingPage } from './src/ui/LandingPage.js';

// Remove old innerHTML setup entirely
document.querySelector('#app').innerHTML = ``;
dashboard.render();

// Splash Screen Creation
const splash = document.createElement('div');
splash.className = 'splash-screen';
splash.innerHTML = `
    <div class="splash-content">
        <h1>HandFlow</h1>
        <p>Advanced Hand Gesture Navigation</p>
        <button id="start-btn-premium" class="btn-primary" style="margin-top:20px; font-size:1.2rem; padding:12px 30px;">Initialize System</button>
    </div>
`;
document.body.appendChild(splash);

const startBtn = document.querySelector('#start-btn-premium');
let initialized = false;

startBtn.addEventListener('click', async () => {
  if (initialized) return;
  initialized = true;
  startBtn.innerText = 'System Initializing...';
  startBtn.disabled = true;

  try {
    // 1. Create Debug Overlay (default hidden maybe?)
    const videoElement = debugManager.createOverlay();
    // Hide debug overlay by default for premium feel
    document.querySelector('.debug-overlay').style.display = 'none';

    // 1.1 Init Cursor
    cursorManager.initialize();

    // 2. Initialize Vision Engine
    await visionEngine.initialize();

    // 3. Start Camera
    await visionEngine.startCamera(videoElement);

    // Fade out splash
    splash.style.transition = 'opacity 0.5s';
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.remove();
      // Render Landing Page after splash is gone
      landingPage.render();
    }, 500);

    // 4. Start Render Loop
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

      // Update Dashboard
      dashboard.updateGesture(detectedGesture, result ? result.isOutOfBounds : false);

      if (result && result.cursor) {
        cursorManager.show();
        // Pass gesture to cursor if we want to change cursor icon based on gesture (e.g. Fist icon)
        cursorManager.updatePosition(result.cursor.x, result.cursor.y);
      }

      requestAnimationFrame(loop);
    };
    loop();

  } catch (error) {
    console.error('Failed to start:', error);
    alert('Failed to start MotionHand: ' + error.message);
    startBtn.innerText = 'Error';
    startBtn.disabled = false;
    initialized = false;
  }
});
