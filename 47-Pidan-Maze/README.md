# 🌿 皮蛋迷宫 / Pidan Maze

一款运行在浏览器里的单文件 3D 迷宫探索游戏，无需安装，无需联网。  
A single-file browser 3D maze game. No install, no server required.

---

## 🎮 玩法 / How to Play

在每局随机生成的绿篱迷宫里，操控银色小球寻找并收集散落各处的 **10 颗宝石**。  
收集完毕后游戏结束并显示本局用时。  

Navigate a randomly generated hedge maze as a silver ball.  
Find and collect all **10 gems** — your elapsed time is shown when you finish.

---

## 🕹️ 操控方式 / Controls

### 键盘 / Keyboard

| 按键 / Key | 动作 / Action |
|---|---|
| ↑ / W | 前进 Forward |
| ↓ / S | 后退 Backward |
| ← / A | 左转 Turn Left |
| → / D | 右转 Turn Right |

### 鼠标 / Mouse

| 区域 / Zone | 动作 / Action |
|---|---|
| 点击并按住小球上方（到地平线） | 前进 Forward |
| 按住小球左侧（屏幕左 1/3） | 左转 Turn Left |
| 按住小球右侧（屏幕右 1/3） | 右转 Turn Right |

> 按住不放持续移动，松开立即停止。  
> Hold to move continuously, release to stop.

### 触屏 / Touch

与鼠标分区相同，支持多指同时输入。  
Same zones as mouse. Multi-touch supported.

---

## ✨ 特性 / Features

- 🌿 **随机迷宫** — 每局由递归回溯算法生成，附加随机开孔增加分支，每次不同  
  **Random maze** — recursive backtracker + extra loops, unique every game
- ⚽ **物理小球** — 冲量驱动、惯性滑行、撞墙反弹、压扁形变  
  **Physics ball** — impulse-driven, inertia, wall bounce, squash deformation
- 🌲 **绿篱透明** — 遮挡摄像机的绿篱自动半透明，视线不受阻  
  **Occlusion fade** — hedges blocking the camera become transparent automatically
- 🗺️ **迷雾小地图** — 宝石只在靠近时才出现在小地图上  
  **Fog-of-war minimap** — gems only appear on map when you're nearby
- ☀️ **方向定位** — 太阳固定在正南方 35° 高度，白云固定位置辅助定位  
  **Orientation aids** — sun fixed at south 35°, static clouds as landmarks
- 🌐 **中英双语** — 左上角一键切换界面语言  
  **Bilingual** — toggle UI language with one button (top-left)
- 📱 **移动端友好** — 触屏分区控制，适配手机/平板  
  **Mobile-friendly** — touch zone controls for phones and tablets

---

## 🚀 运行方式 / How to Run

直接用浏览器打开 `pidan_maze.html` 即可，无需服务器。  
Just open `pidan_maze.html` in any modern browser. No server needed.

推荐浏览器 / Recommended browsers: Chrome · Edge · Firefox · Safari

```
双击 pidan_maze.html  →  浏览器打开  →  点击「开始冒险」
Double-click pidan_maze.html → browser opens → click "Start Adventure"
```

---

## 🛠️ 技术栈 / Tech Stack

| | |
|---|---|
| 渲染引擎 / Renderer | [Three.js](https://threejs.org/) r128 |
| 迷宫算法 / Maze algorithm | Recursive Backtracker + random loop cuts |
| 物理 / Physics | Custom impulse + exponential drag |
| 遮挡检测 / Occlusion | Per-frame raycasting (camera → player) |
| 语言 / Language | Vanilla JavaScript, zero dependencies beyond Three.js |
| 打包 / Bundling | Single HTML file, self-contained |

---

## 📁 文件说明 / Files

```
pidan_maze.html   主游戏文件 / Main game file (everything included)
README.md         本文档 / This document
```

---

## 🔮 后续可扩展方向 / Future Ideas

- 多人联机（WebSocket）/ Multiplayer via WebSocket
- 计分排行榜（localStorage）/ Leaderboard
- 多种地图主题（雪地、沙漠）/ Map themes
- 移动端摇杆 UI / Virtual joystick for mobile
- 宝石收集音效 / Sound effects
