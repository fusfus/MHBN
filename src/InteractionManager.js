import { cursorManager } from './CursorManager.js';
import { settingsStore } from './store/SettingsStore.js';

export class InteractionManager {
    constructor() {
        this.currentGesture = 'UNKNOWN';
        this.lastGesture = 'UNKNOWN';

        // Settings Cache
        this.settings = settingsStore.getState();
        settingsStore.addListener((state) => {
            this.settings = state;
        });

        // Click State
        this.isClicking = false;
        this.lastClickTime = 0;

        // Scroll State
        this.isScrolling = false;
        this.scrollStartY = 0; // Hand Y position when scroll started
        this.lastScrollY = 0;
    }

    update(gesture, handY, handX) {
        this.lastGesture = this.currentGesture;
        this.currentGesture = gesture;

        this.handleClicks(gesture);
        this.handleScroll(gesture, handY, handX);
        this.handleNavigation(gesture);
    }

    handleNavigation(gesture) {
        if (!this.settings.gestures.back) return;

        if (gesture === 'SHAKA') {
            const now = Date.now();
            if (!this.lastNavTime || now - this.lastNavTime > 1500) {
                console.log('Shaka! Going Back.');
                this.lastNavTime = now;
                this.showToast('🤙 Going Back');

                if (window.history.length > 1) {
                    window.history.back();
                }
            }
        }
    }

    showToast(msg) {
        const toast = document.createElement('div');
        toast.innerText = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '10%';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(0,0,0,0.8)';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '20px';
        toast.style.zIndex = '10002';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1000);
    }

    handleClicks(gesture) {
        if (!this.settings.gestures.click) return;

        if (gesture === 'PINCH') {
            if (!this.isClicking) {
                // Start Click
                this.isClicking = true;
                cursorManager.setClickState(true);

                // Debounce / Trigger Click
                const now = Date.now();
                if (now - this.lastClickTime > 200) {
                    this.triggerClickAtCursor();
                    this.lastClickTime = now;
                }
            }
        } else {
            // Release Click
            if (this.isClicking) {
                this.isClicking = false;
                cursorManager.setClickState(false);
            }
        }
    }

    handleScroll(gesture, handY, handX) {
        if (!this.settings.gestures.scroll) {
            this.handleScrollEnd();
            return;
        }

        if (gesture === 'FIST') {
            if (!this.isScrolling) {
                // Start Scrolling
                this.isScrolling = true;
                this.scrollStartY = handY;
                this.lastScrollY = handY;
                this.scrollSmoothedY = handY;

                // Init X
                this.lastScrollX = handX;
                this.scrollSmoothedX = handX;

                // Identify Scroll Target
                const { x, y } = cursorManager.getPosition();
                // Temporarily hide cursor to hit element below
                cursorManager.hideVisual();
                const element = document.elementFromPoint(x, y);
                cursorManager.showVisual();

                this.activeScrollElement = this.getScrollParent(element);

                // Debug Feedback
                let targetName = 'Window';
                if (this.activeScrollElement && this.activeScrollElement !== window) {
                    targetName = this.activeScrollElement.className || this.activeScrollElement.tagName;
                    this.activeScrollElement.style.outline = '2px solid rgba(0, 255, 0, 0.5)'; // Visual debug
                    setTimeout(() => this.activeScrollElement.style.outline = '', 500);
                }
                console.log('Scroll Target:', targetName);
                this.showToast(`Scrolling: ${targetName}`);

            } else {
                // Continue Scrolling

                // 1. Smooth inputs
                const alpha = 0.15;
                this.scrollSmoothedY = (this.scrollSmoothedY * (1 - alpha)) + (handY * alpha);
                if (typeof handX === 'number') {
                    this.scrollSmoothedX = (this.scrollSmoothedX * (1 - alpha)) + (handX * alpha);
                }

                // 2. Calculate deltas
                const deltaY = this.scrollSmoothedY - this.lastScrollY;

                let deltaX = 0;
                if (typeof handX === 'number') {
                    deltaX = this.scrollSmoothedX - this.lastScrollX;
                }

                // 3. Deadzone
                if (Math.abs(deltaY) < 0.002 && Math.abs(deltaX) < 0.002) {
                    return;
                }

                const baseSens = 500 * this.settings.scrollSpeed;

                // Apply Scroll
                if (this.activeScrollElement && this.activeScrollElement !== window) {
                    // Direct manipulation is often more reliable than scrollBy on mobile
                    const moveX = deltaX * baseSens * 3.0; // Boost X
                    const moveY = deltaY * baseSens * 2.0;

                    this.activeScrollElement.scrollLeft += moveX;
                    this.activeScrollElement.scrollTop += moveY;
                } else {
                    window.scrollBy(deltaX * baseSens * 1.5, deltaY * baseSens);
                }

                this.lastScrollY = this.scrollSmoothedY;
                this.lastScrollX = this.scrollSmoothedX;
            }
        } else {
            this.handleScrollEnd();
        }
    }

    handleScrollEnd() {
        if (this.isScrolling) {
            this.isScrolling = false;
            this.activeScrollElement = null;
        }
    }

    getScrollParent(node) {
        if (!node) return window;
        if (node === document.body || node === document.documentElement) return window;

        const isElement = node instanceof HTMLElement;
        if (isElement) {
            const style = window.getComputedStyle(node);
            const overflowY = style.overflowY;
            const overflowX = style.overflowX;
            // Strict check: must be auto or scroll
            const isScrollableY = (overflowY === 'auto' || overflowY === 'scroll');
            const isScrollableX = (overflowX === 'auto' || overflowX === 'scroll');

            if (isScrollableY || isScrollableX) {
                return node;
            }
        }

        return node.parentElement ? this.getScrollParent(node.parentElement) : window;
    }

    triggerClickAtCursor() {
        const { x, y } = cursorManager.getPosition();
        console.log(`Triggering click at ${x}, ${y}`);

        // Hide cursor momentarily so we don't click the cursor element itself
        cursorManager.hideVisual();

        const element = document.elementFromPoint(x, y);
        if (element) {
            console.log('Clicked element:', element);
            element.click();

            // Visual feedback
            element.classList.add('mhbn-clicked');
            setTimeout(() => element.classList.remove('mhbn-clicked'), 200);
        }

        cursorManager.showVisual();
    }
}

export const interactionManager = new InteractionManager();
