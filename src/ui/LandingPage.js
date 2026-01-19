export class LandingPage {
    constructor() {
        this.element = null;
        this.clickCount = 0;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'mhbn-landing';

        // Generate V-Items
        let vItems = '';
        for (let i = 1; i <= 20; i++) {
            vItems += `<div class="v-item">📜 Vertical Item ${i}</div>`;
        }

        this.element.innerHTML = `
      <div class="landing-container">
        
        <!-- Section 1: Interaction Test -->
        <div class="test-card">
            <h2>👆 Click Test</h2>
            <p>Pinch index & thumb.</p>
            <div class="counter-display" id="click-counter">0</div>
            <button class="btn-test" id="test-btn">Hit Me!</button>
        </div>

        <!-- Section 2: Navigation Test -->
        <div class="test-card">
            <h2>🔙 Navigation</h2>
            <p>Gesture: "Call Me" (🤙) to Back.</p>
            <div style="margin: 20px 0; font-size: 1.2rem; color:#aaa;">Path: <span id="path-display" style="color:#fff;">/home</span></div>
            <button class="btn-test secondary" id="nav-btn">Go to /page2</button>
        </div>

        <!-- Section 3: Scroll Test -->
        <div class="test-card full-width">
            <h2>✊ Scroll Playground</h2>
            <p style="text-align: left; width: 100%; margin-bottom: 5px; color:#ccc;">1. Hover over the <b>Vertical List</b> and make a Fist to scroll UP/DOWN.</p>
            
            <div class="v-scroll-box" id="v-scroll-target">
                ${vItems}
            </div>

            <p style="text-align: left; width: 100%; margin-top: 20px; margin-bottom: 5px; color:#ccc;">2. Hover over the <b>Horizontal Gallery</b> and make a Fist to scroll LEFT/RIGHT.</p>

            <div class="h-scroll-box" id="h-scroll-target">
                 <div class="h-card" style="background: #FF3B30;">Red</div>
                 <div class="h-card" style="background: #FF9500;">Orange</div>
                 <div class="h-card" style="background: #FFCC00; color:#000;">Yellow</div>
                 <div class="h-card" style="background: #34C759;">Green</div>
                 <div class="h-card" style="background: #007AFF;">Blue</div>
                 <div class="h-card" style="background: #5856D6;">Indigo</div>
                 <div class="h-card" style="background: #AF52DE;">Purple</div>
                 <div class="h-card" style="background: #FF2D55;">Pink</div>
            </div>
        </div>

      </div>
    `;

        document.body.appendChild(this.element);
        this.attachListeners();
    }

    attachListeners() {
        // Click Test
        const btn = this.element.querySelector('#test-btn');
        const display = this.element.querySelector('#click-counter');
        btn.addEventListener('click', () => {
            this.clickCount++;
            display.innerText = this.clickCount;
            btn.classList.add('active'); // Use CSS transition if wanted
            setTimeout(() => btn.classList.remove('active'), 200);
        });

        // Nav Test
        const navBtn = this.element.querySelector('#nav-btn');
        const pathDisplay = this.element.querySelector('#path-display');

        window.addEventListener('popstate', () => {
            pathDisplay.innerText = window.location.pathname;
        });

        navBtn.addEventListener('click', () => {
            history.pushState({ page: 2 }, 'Page 2', '/page2');
            pathDisplay.innerText = '/page2';
        });

        pathDisplay.innerText = window.location.pathname;
    }
}

export const landingPage = new LandingPage();
