import './style.css';
import { motionHand } from './src/MotionHand.js';
import { dashboard } from './src/ui/Dashboard.js';
import { landingPage } from './src/ui/LandingPage.js';

// Init Standalone Dashboard
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
    // Initialize the Core System
    await motionHand.init({
      showDebug: false // Default to hidden for premium feel
    });

    // Fade out splash
    splash.style.transition = 'opacity 0.5s';
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.remove();
      // Render Landing Page after splash is gone
      landingPage.render();
    }, 500);

  } catch (error) {
    console.error('Failed to start:', error);
    startBtn.innerText = 'Initialization Failed';
    startBtn.disabled = false;
    initialized = false;

    // Show Error Modal
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isGLContextError = error.toString().includes('GLctx') || error.toString().includes('undefined is not an object');

    let title = 'Initialization Error';
    let message = `Failed to start MotionHand: ${error.message}`;
    let solution = 'Please try refreshing the page.';

    if (isSafari && isGLContextError) {
      title = 'Browser Compatibility Issue';
      message = 'Safari on this device is currently experiencing WebGL compatibility issues with the MediaPipe engine.';
      solution = '<b>Recommended Solution:</b> Please use <b>Google Chrome</b> for the best experience. We are working on a fix.';
    }

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    modal.style.backdropFilter = 'blur(10px)';

    modal.innerHTML = `
        <div style="background: #1e1e1e; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 50px rgba(0,0,0,0.5);">
            <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
            <h2 style="margin-bottom: 15px; color: #ff6b6b;">${title}</h2>
            <p style="margin-bottom: 20px; line-height: 1.6; color: #ccc;">${message}</p>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin-bottom: 30px; font-size: 0.9em; color: #fff;">
                ${solution}
            </div>
            <button id="close-modal-btn" class="btn-primary" style="padding: 12px 30px;">Close this message</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('close-modal-btn').onclick = () => modal.remove();
  }
});
