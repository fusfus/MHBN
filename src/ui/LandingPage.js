export class LandingPage {
    constructor() {
        this.element = null;
        this.clickCount = 0;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'mhbn-landing';

        // Generate dummy list items
        let listItems = '';
        for (let i = 1; i <= 20; i++) {
            listItems += `<div class="list-item">📜 Scroll Item ${i} - Fist to Scroll</div>`;
        }

        this.element.innerHTML = `
      <div class="landing-container">
        
        <!-- Section 1: Interaction Test -->
        <div class="test-card">
            <h2>👆 Click Test</h2>
            <p>Pinch your index and thumb to click.</p>
            <div class="counter-display" id="click-counter">0</div>
            <button class="btn-test" id="test-btn">Hit Me!</button>
        </div>

        <!-- Section 2: Navigation Test -->
        <div class="test-card">
            <h2>🔙 Navigation Test</h2>
            <p>🤙 Show "Shaka/Call Me" (Thumb & Pinky) to go back.</p>
            <div class="nav-status">Current: <span id="path-display">/home</span></div>
            <button class="btn-test secondary" id="nav-btn">Go to /page2</button>
        </div>

        <!-- Section 3: Scroll Test -->
        <div class="test-card full-width">
            <h2>✊ Scroll Test</h2>
            <p>Make a Fist and move hand Up/Down or Left/Right.</p>
            
            <!-- Vertical List -->
            <div class="scroll-area" style="max-height: 150px; overflow-y: auto; background: rgba(0,0,0,0.3); border-radius: 8px; margin-bottom: 10px;">
                ${listItems}
            </div>

            <!-- Horizontal Gallery -->
            <div class="h-scroll-area" style="display: flex; gap: 10px; overflow-x: auto; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                 <div style="min-width: 120px; height: 80px; background: #FF3B30; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 1</div>
                 <div style="min-width: 120px; height: 80px; background: #ff9500; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 2</div>
                 <div style="min-width: 120px; height: 80px; background: #ffcc00; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 3</div>
                 <div style="min-width: 120px; height: 80px; background: #34c759; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 4</div>
                 <div style="min-width: 120px; height: 80px; background: #007aff; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 5</div>
                 <div style="min-width: 120px; height: 80px; background: #5856d6; border-radius: 8px; display:flex; align-items:center; justify-content:center;">Card 6</div>
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
            btn.innerText = 'Clicked!';
            setTimeout(() => btn.innerText = 'Hit Me!', 500);
        });

        // Nav Test
        const navBtn = this.element.querySelector('#nav-btn');
        const pathDisplay = this.element.querySelector('#path-display');

        // Handle HTML5 History for fake nav
        window.addEventListener('popstate', () => {
            pathDisplay.innerText = window.location.pathname;
        });

        navBtn.addEventListener('click', () => {
            history.pushState({ page: 2 }, 'Page 2', '/page2');
            pathDisplay.innerText = '/page2';
        });

        // Init path
        pathDisplay.innerText = window.location.pathname;
    }
}

export const landingPage = new LandingPage();
