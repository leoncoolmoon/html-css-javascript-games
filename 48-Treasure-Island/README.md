# 🌴 宝藏岛 · Treasure Island

一款运行在浏览器中的低多边形风格 3D 小游戏，无需安装，打开即玩。  
A low-poly 3D browser game — no install needed, just open and play.

---

## 玩法 · How to Play

在随机生成的小岛上收集 **10 颗宝石**，越快越好。  
每次开始都是全新的岛屿形态、山丘分布和石块位置。  
Collect all **10 gems** scattered across a procedurally generated island — as fast as you can.  
Every round spawns a brand-new island with different terrain, hills, and rock obstacles.

---

## 操作 · Controls

### 键盘 · Keyboard

| 按键 Key | 功能 Action |
|---|---|
| `W` / `↑` | 向前移动 Move forward |
| `S` / `↓` | 向后移动 Move backward |
| `A` / `←` | 向左移动 Move left |
| `D` / `→` | 向右移动 Move right |
| `PageUp` | 逆时针旋转视角 Rotate view left |
| `PageDown` | 顺时针旋转视角 Rotate view right |

### 鼠标 · Mouse

| 操作 Action | 功能 Function |
|---|---|
| 左键点击 Left click | 角色走向点击位置 Move player to clicked spot |
| 左键拖拽 Left drag | 水平旋转摄像机 Rotate camera horizontally |

### 触屏 · Touch

| 手势 Gesture | 功能 Function |
|---|---|
| 单指点击 Tap | 角色走向点击位置 Move player to tapped spot |
| 单指横滑 Swipe horizontally | 旋转摄像机 Rotate camera |
| 双指横滑 Two-finger swipe | 旋转摄像机（更精准）Rotate camera (more precise) |

---

## 界面说明 · HUD

| 元素 Element | 说明 Description |
|---|---|
| **宝石 Gems** | 已收集 / 总数 Collected / Total |
| **用时 Time** | 本局已用时间（从按下开始后计时）Elapsed time since game started |
| **最佳 Best** | 本设备历史最快记录（存储于 localStorage）All-time best on this device |

---

## 关卡特性 · Procedural Features

每局随机生成，保证每次体验不同：  
Every round is procedurally generated for a fresh experience:

- **地形 Terrain** — 1–4 个高斯包叠加形成山丘、洼地、鞍部等自然起伏  
  1–4 overlapping Gaussian lobes create hills, hollows, and ridges
- **海岸线 Coastline** — 角度谐波噪声让岛屿轮廓凹凸不规则  
  Angular harmonic noise gives each island an irregular, organic shoreline
- **树木 Trees** — 原版三层锥形树冠，10–15 棵随机分布  
  Original three-layer cone trees, 10–15 per island
- **石块 Rocks** — 8–15 组嵌入地面，有实体碰撞阻挡通行  
  8–15 rock clusters flush with terrain, with solid collision blocking
- **宝石 Gems** — 10 颗彩色八面体，漂浮旋转，避开石块生成  
  10 coloured spinning octahedra, spawned clear of rocks

---

## 技术栈 · Tech Stack

| 项目 | 说明 |
|---|---|
| **渲染 Renderer** | [Three.js r128](https://threejs.org/) via CDN |
| **地形 Terrain** | 60×60 细分平面 + 顶点位移 · PlaneGeometry + vertex displacement |
| **顶点着色 Vertex Color** | 按高于海平面高度插值草地↔沙滩 · height-based grass↔sand blend |
| **碰撞 Collision** | 岛屿边界（高度场）+ 石块圆柱体 · heightfield boundary + circle colliders |
| **存档 Persistence** | `localStorage` 保存最佳成绩 · best time saved locally |
| **依赖 Dependencies** | 零外部依赖（Three.js 通过 CDN 加载）· zero npm dependencies |

---

## 运行方式 · Running Locally

直接用浏览器打开 HTML 文件即可，无需服务器：  
Just open the HTML file in any modern browser — no server required:

```bash
# macOS
open lowpoly_island_game_v5.html

# Windows
start lowpoly_island_game_v5.html

# Linux
xdg-open lowpoly_island_game_v5.html
```

或将文件拖入浏览器窗口。  
Or drag the file into a browser window.

> **推荐浏览器 Recommended browsers:** Chrome 90+, Safari 15+, Firefox 88+, Edge 90+

---

## 文件说明 · Files

```
lowpoly_island_game_v5.html   # 游戏主文件 Main game (single file, self-contained)
README.md                      # 本文档 This document
```

---

*Made with Three.js · 2024*
