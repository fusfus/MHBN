# 🖐️ MotionHand Browser Navigator (MHBN)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/fusfus/MHBN/actions/workflows/deploy.yml/badge.svg)](https://github.com/fusfus/MHBN/actions/workflows/deploy.yml)

**[✨ Live Demo / 線上體驗 : https://fusfus.github.io/MHBN/](https://fusfus.github.io/MHBN/)**

> **MotionHand Browser Navigator** 是一個跨瀏覽器的 JS 函式庫，利用 Google MediaPipe 技術，讓使用者透過 **手勢 (Hand Gestures)** 操控網頁游標與互動。
>
> **MotionHand Browser Navigator** is a cross-browser library that enables browser interaction via hand gestures using Google MediaPipe technology. Start controlling the web with just your hands!

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-Vision-blue)](https://developers.google.com/mediapipe)

<p align="center">
  <strong><a href="#-english">English</a></strong> | <strong><a href="#-繁體中文-traditional-chinese">繁體中文 (Traditional Chinese)</a></strong>
</p>

---

## 🇺🇸 English

**MotionHand Browser Navigator (MHBN)** is a lightweight, cross-browser JavaScript library that empowers users to navigate the web using natural hand movements. Powered by Google MediaPipe, it transforms your webcam into a touchless controller, offering a futuristic and accessible way to interact with digital content.

### ✨ Features

MHBN is built with a modular architecture focusing on performance and user experience:

*   **⚡ Real-time Vision Engine**: High-performance hand tracking using MediaPipe Hands with a defined Region of Interest (ROI) for comfortable control.
*   **🖱️ Virtual Cursor**: A smooth, stabilized on-screen cursor that mimics your hand movements with precision.
*   **🎯 Smart Interaction**:
    *   **Magnetic Focus**: The cursor "snaps" to interactive elements (buttons, links) for easier clicking.
    *   **Visual Feedback**: Dynamic cursor states (Idle, Active, Click) and element highlighting.
*   **🛠️ Robust Debug Mode**: Built-in developer tools including a visual overlay, skeleton tracking, and session recording/replay capabilities.
*   **🛡️ Conflict Management**: Intelligently switches between the physical mouse and hand control based on user activity.

### 👋 Gesture Guide

Interact intuitively using these defining gestures:

| Gesture | Action | Description |
| :--- | :--- | :--- |
| **Pointing** | Move Cursor | Extend your **Index Finger**. The cursor follows your fingertip. |
| **Pinch** | Click | Bring **Index Finger** and **Thumb** tips together. Simulates a mouse click. |
| **Open Palm** | Reset / Stop | Open all fingers to immediately stop movement or reset cursor state. |
| **Fist** | Scroll Mode | Clench your hand into a fist to enter scroll mode (drag up/down to scroll). |
| **Thumb Left** | Back | Extend thumb to the left (like a hitchhiker) to navigate back in history. |

### 🚀 Quick Start

Get the project running locally in minutes.

#### Prerequisites
*   Node.js (v14 or higher)
*   A webcam

#### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/fusfus/MHBN.git
    cd MHBN
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit the URL shown in your terminal (usually `http://localhost:5173`). Grant camera permissions when prompted.

---

## 🇹🇼 繁體中文 (Traditional Chinese)

**MotionHand Browser Navigator (MHBN)** 是一個輕量級、跨瀏覽器的 JavaScript 函式庫，讓使用者能透過自然的手部動作來瀏覽網頁。本專案核心採用 Google MediaPipe 技術，將您的網路攝影機 (Webcam) 轉變為非接觸式的控制器，提供充滿未來感且無障礙的數位互動體驗。

### ✨ 功能特色

MHBN 採用模組化架構，專注於效能與使用者體驗：

*   **⚡ 即時視覺引擎 (Real-time Vision Engine)**: 使用 MediaPipe Hands 進行高效能手部追蹤，並定義了舒適的操作區域 (ROI)。
*   **🖱️ 虛擬游標 (Virtual Cursor)**: 平滑且穩定的螢幕游標，能精準模擬您的手部移動。
*   **🎯 智慧互動 (Smart Interaction)**:
    *   **磁吸對焦**: 游標會自動「吸附」到可互動的元件 (如按鈕、連結)，讓點擊更輕鬆。
    *   **視覺回饋**: 動態的游標狀態顯示 (閒置、作動、點擊) 以及元件高亮效果。
*   **🛠️ 強大的除錯模式 (Debug Mode)**: 內建開發者工具，包含視覺化疊加層 (Overlay)、骨架追蹤顯示，以及操作階段的錄製與重播功能。
*   **🛡️ 衝突管理 (Conflict Management)**:根據使用者的活動，智慧切換實體滑鼠與手勢控制模式。

### 👋 手勢指南 (Gesture Guide)

透過以下直覺的手勢進行互動：

| 手勢 (Gesture) | 動作 (Action) | 說明 (Description) |
| :--- | :--- | :--- |
| **指點 (Pointing)** | 移動游標 | 伸出您的**食指**。游標將跟隨您的指尖移動。 |
| **捏合 (Pinch)** | 點擊 (Click) | 將**食指**與**拇指**指尖靠龍 (捏合)。模擬滑鼠點擊動作。 |
| **張開手掌 (Open Palm)** | 重置 / 停止 | 張開所有手指，可立即停止游標移動或重置游標狀態。 |
| **握拳 (Fist)** | 捲動模式 | 將手握成拳頭進入捲動模式 (上下拖曳以捲動頁面)。 |
| **拇指向左 (Thumb Left)** | 上一頁 | 伸出拇指向左 (像搭便車手勢)，可導航至瀏覽紀錄的上一頁。 |

### 🚀 快速開始

只需幾分鐘即可在本地端執行專案。

#### 前置需求
*   Node.js (v14 或更高版本)
*   網路攝影機 (Webcam)

#### 安裝步驟

1.  **複製 (Clone) 儲存庫**
    ```bash
    git clone https://github.com/fusfus/MHBN.git
    cd MHBN
    ```

2.  **安裝依賴套件**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```

4.  **在瀏覽器中開啟**
    造訪終端機顯示的網址 (通常是 `http://localhost:5173`)。當瀏覽器詢問時，請允許使用攝影機權限。

---

## 🛠️ 技術堆疊 (Tech Stack)

*   **核心**: Vanilla JavaScript (ES6+), HTML5, CSS3
*   **視覺運算**: [Google MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 External / Standalone Usage (外部引用 / 獨立使用)

You can use MHBN in any HTML project without Node.js or build tools.
您可以直接在任何 HTML 專案中使用 MHBN，無需 Node.js 或建置工具。

### Setup (設定步驟)

1.  **Copy the Library**: Copy the `dist/lib` folder to your project root.
    **複製檔案**: 將 `dist/lib` 資料夾複製到您的專案根目錄。

2.  **Add Script**: Include `main.js` in your HTML. Use `data-auto-init="true"` to start automatically.
    **加入腳本**: 在 HTML 中引入 `main.js`。使用 `data-auto-init="true"` 讓它自動啟動。

    ```html
    <!-- Example: index.html -->
    <!DOCTYPE html>
    <html>
    <head>
        <title>My Web App</title>
    </head>
    <body>
        <h1>Control me with your hands!</h1>
        
        <!-- Load MHBN and auto-start -->
        <script src="lib/main.js" data-auto-init="true"></script>
    </body>
    </html>
    ```

### Configuration (設定)
If you prefer manual initialization (如果您希望手動啟動):
```html
<script src="lib/main.js"></script>
<script>
  window.onload = function() {
    // Start with debug overlay
    MotionHand.motionHand.init({ showDebug: true });
  };
</script>
```

## ⚙️ System Requirements & Compatibility (系統需求與相容性)

| Category | Recommended (推薦) | Minimum (最低需求) |
| :--- | :--- | :--- |
| **OS** | macOS (Apple Silicon), Windows 10/11 | macOS (Intel), Windows 7+ |
| **Browser** | **Google Chrome** (Recommended), Edge | Safari 17+, Firefox |
| **Device** | Webcam enabled Laptop/PC | Mobile Devices (Pixel, iPhone 14+) |

> [!WARNING]
> **Compatibility Notice (相容性說明)**:
> *   **Google Chrome** is the strongly recommended browser for this application due to its superior WebGL and WebAssembly support.
> *   **Safari on macOS (Intel/x64)** is currently **NOT SUPPORTED** due to WebGL backend incompatibilities with MediaPipe. Please use Chrome.
> *   **Safari on iOS (iPhone 12+)** is generally supported on iOS 17+.
> *   強烈建議使用 **Google Chrome** 以獲得最佳效能與穩定性。
> *   **Safari (Intel 架構 Mac)** 目前因底層 WebGL 相容性問題**不支援**，請改用 Chrome。
> *   **Safari (iOS)** 目前支援 iOS 17+ 之較新款 iPhone。

## 📄 授權條款 (License)

本專案採用 **MIT License** 授權 - 詳細內容請參閱 [LICENSE](LICENSE) 檔案。

---

<p align="center">
  <sub>Made with ❤️ by the HandFlow Team</sub>
</p>
