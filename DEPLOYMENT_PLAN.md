# MHBN Deployment & Integration Plan

To deploy MHBN to GitHub Pages and enable external integration (using it as a library/widget on another site), we will follow these steps:

## Phase 1: Code Adaptation for Integration
Currently, `main.js` assumes it runs as a standalone app (clearing `#app`). We need to make it modular so it can be "mounted" onto any website as an overlay.

1.  **Refactor Entry Point**: Create a new `lib.js` entry point for external users.
    *   This script will export a simple `init()` function.
    *   It will dynamically create necessary DOM elements (like the overlay container) so the host site doesn't need to prepare specific HTML.
2.  **Styles**: Ensure `style.css` is bundled or injected so the widget looks correct on the host site without affecting host styles (namespace CSS).

## Phase 2: Build Configuration
1.  **Update `vite.config.js`**:
    *   Set `base` path correctly for GitHub Pages (usually `/MHBN/`).
    *   Configure **Library Mode** (`build.lib`) to output a single, portable JavaScript file (e.g., `mhbn.js`) and CSS file.
2.  **Scripts**: Add `npm run build:lib` to `package.json`.

## Phase 3: Deployment (GitHub Pages)
1.  **GitHub Actions**: Create `.github/workflows/deploy.yml`.
    *   This will automatically build the project and push the `dist/` folder to the `gh-pages` branch whenever you push to `main`.
2.  **Manual Verification**: Confirm the demo site works at `https://<your-username>.github.io/MHBN/`.

## Phase 4: Integration Guide
Once deployed, your other web system can use MHBN by simply including the script:

```html
<!-- Example usage in your other system -->
<link rel="stylesheet" href="https://neo.github.io/MHBN/assets/style.css">
<script type="module">
  import { MotionHand } from 'https://neo.github.io/MHBN/dist/mhbn.js';
  
  // Initialize the Navigator Overlay
  MotionHand.init({
    mode: 'cursor', // or 'scroll'
    enableDashboard: true
  });
</script>
```

## Execution Steps for Agent
1.  Modify `vite.config.js` to add `base` and library build options.
2.  Refactor `main.js` / create `src/lib_entry.js` for clean exporting.
3.  Create `.github/workflows/deploy.yml`.
4.  Commit and Push.
