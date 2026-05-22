# 参考 nothing-kde-widgets 优化补充现有组件计划

## 摘要

参考 [nothing-kde-widgets](https://github.com/jaxparrow07/nothing-kde-widgets) (KDE Plasma 6 QML 小部件) 的设计，对现有 React 组件库进行优化和补充。KDE 项目包含 8 种 Widget（Analog Clock、Digital Clock、Digital Clock Large、Date、Battery、Weather、Media Player、Photo Frame），每种有多个变体。本计划聚焦于将 KDE 项目中**现有 React 组件缺失的变体、功能和设计模式**移植过来，以及补充**完全缺失的 Widget 组件**。

---

## 当前状态分析

### KDE 项目 Widget 清单 vs React 现有组件

| KDE Widget | KDE 变体 | React 现有组件 | React 缺失 |
|---|---|---|---|
| **Analog Clock** | Modern (Swiss Railway), Minimalist | `sub/WatchAnalog.tsx` (静态) | 无功能组件；缺 Minimalist 变体（红色圆点沿圆周移动） |
| **Digital Clock** | Pill, Square | `Clock.tsx` (digital/gauge/dual-ring/overlay) | 缺 Pill 变体（竖向胶囊 NDot 字体）；缺 World Clock 集成到同一组件 |
| **Digital Clock Large** | Serif, Sharp | 无 | 完全缺失——大号桌面时钟（Serif 用 Space Grotesk，Sharp 用 NDot） |
| **Date** | Page 1 (serif 字体 + page peel) | `Date.tsx` (rect/dual-ring) | 缺 Serif 字体变体；缺 Page Peel 交互效果 |
| **Battery** | Page 1 (分段 + 蓝牙设备) | `Battery.tsx` (segmented/ring) | 缺蓝牙设备电池显示；缺 SVG 图标系统 |
| **Weather** | Rect×2, Square×2, Circular×3, Grid | `WeatherWidget.tsx` (square/wide) | 缺 Circular 变体；缺 Grid 变体；缺更多天气条件（snow/thunder/fog/night）；缺 Open-Meteo API 集成 |
| **Media Player** | Page 1, Page 2 | `MusicPlayer.tsx` (功能组件) | 缺 KDE 风格深色卡片变体（专辑封面+进度条+Spotify 图标） |
| **Photo Frame** | Pill, Square | `PhotoCarousel.tsx` | 缺 Pill 变体（竖向胶囊照片框） |

### KDE 项目的关键设计模式

1. **VariantSelector**: 首次使用时展示变体选择器，用户选择后记住偏好
2. **NothingColors**: 统一颜色系统，支持 Dark/Light/Follow System + 系统强调色
3. **BlinkingSeparator**: 录制状态闪烁分隔符（用于 Media Player）
4. **Page Peel**: 日期 Widget 右下角的翻页效果
5. **SVG 天气图标**: 7 种天气 SVG 图标（sunny, partly_cloudy_day/night, cloudy, rain_or_mist, snow_fall, thunder）
6. **Open-Meteo API**: 天气 Widget 集成真实天气数据
7. **Smooth Hands**: 模拟时钟支持平滑/跳秒两种秒针模式
8. **Minimalist 时钟**: 红色圆点沿圆周边缘移动表示秒

---

## 提议变更

### 1. 新增 AnalogClockWidget 功能组件

**文件**: `src/components/widgets/AnalogClockWidget.tsx` + `src/styles/analog-clock-widget.css`

将 `sub/WatchAnalog.tsx` 从静态 Figma 快照升级为功能组件：

- **Props**: `variant?: 'swiss' | 'minimalist'`, `smoothSeconds?: boolean`, `theme?: 'light' | 'dark'`, `card?: CardProp`
- **Swiss 变体**: 60 个刻度线（5 分钟大刻度 + 1 分钟小刻度）+ 时/分/秒三根指针 + 红色秒针端点圆点 + 中心轴圆点
- **Minimalist 变体**: 无刻度线，时/分指针为胶囊形（pill shape），秒为红色圆点沿圆周边缘移动
- **平滑秒针**: `smoothSeconds={true}` 时 50ms 更新，`false` 时 1s 跳秒
- 使用 Canvas API 或 SVG 渲染（参考 KDE 的 Canvas 实现）
- 通过 `withWidgetCard` HOC 支持卡片包装

### 2. 新增 DigitalClockLargeWidget 组件

**文件**: `src/components/widgets/DigitalClockLargeWidget.tsx` + `src/styles/digital-clock-large-widget.css`

- **Props**: `variant?: 'serif' | 'sharp'`, `showSeconds?: boolean`, `theme?: 'light' | 'dark'`, `card?: CardProp`
- **Serif 变体**: Space Grotesk 字体，大号时间 `HH:MM`，优雅衬线感
- **Sharp 变体**: NDot 47 字体，大号时间 `HH:MM`，锐利点阵风格
- 可选秒数显示 `HH:MM:SS`
- 适合桌面/锁屏场景的大号显示

### 3. 增强 WeatherWidget

**文件**: 修改 `src/components/widgets/WeatherWidget.tsx` + `src/styles/weather-widget.css`

新增变体和天气条件：

- **新增 `variant: 'circular'`**: 圆形天气 Widget，中心显示温度，天气图标环绕
- **新增 `variant: 'grid'`**: 网格布局，4 个圆形天气图标 + 温度
- **新增天气条件**: `snowy`（雪）、`thunderstorm`（雷暴）、`foggy`（雾）、`night_clear`（夜间晴）、`night_cloudy`（夜间多云）
- **新增 `unit?: 'celsius' | 'fahrenheit'` prop**: 温度单位切换
- **新增 `hourlyForecast` prop**: 逐小时预报数据 `{ time, temp, condition }[]`
- 在 DotMatrix 天气图标映射中补充新增条件的点阵定义

### 4. 增强 Battery 组件（Widget 模式）

**文件**: 修改 `src/components/Battery.tsx` + `src/styles/battery.css`

- **新增 `widgetMode?: 'card' | 'ring'` prop**: 将 Battery 包装为 Widget 卡片
- **新增蓝牙设备支持**: `devices?: { name: string; type: 'mouse' | 'keyboard' | 'earbuds'; percent: number }[]`
- 蓝牙设备以小图标 + 百分比列表显示在主电池下方
- 使用 `withWidgetCard` HOC 支持卡片包装

### 5. 增强 Date 组件（Widget 模式）

**文件**: 修改 `src/components/Date.tsx` + `src/styles/date.css`

- **新增 `variant: 'serif'`**: 使用 Space Grotesk 字体的大号日期数字 + 强调色星期名
- **新增 Page Peel 效果**: 右下角翻页三角形，hover 时展开，点击可触发回调
- 使用 `withWidgetCard` HOC 支持卡片包装

### 6. 增强 MusicPlayer（Widget 模式）

**文件**: 修改 `src/components/MusicPlayer.tsx` + `src/styles/music-player.css`

- **新增 `variant: 'compact'`**: KDE 风格紧凑卡片——深色背景 + 64x64 专辑图标区 + 歌曲信息 + 细进度条
- **新增 BlinkingSeparator 组件**: 录制状态闪烁指示器（红色圆点 1s 闪烁）
- 使用 `withWidgetCard` HOC 支持卡片包装

### 7. 新增 PhotoFrameWidget 组件

**文件**: `src/components/widgets/PhotoFrameWidget.tsx` + `src/styles/photo-frame-widget.css`

- **Props**: `variant?: 'pill' | 'square'`, `src?: string`, `alt?: string`, `images?: string[]`, `autoPlay?: boolean`, `card?: CardProp`
- **Pill 变体**: 竖向胶囊形状（68px 宽），圆角图片
- **Square 变体**: 152x152 方形，圆角图片 + 8px 内边距
- 支持多图轮播（复用 PhotoCarousel 逻辑）

### 8. 下载并集成 KDE 天气 SVG 图标

**文件**: `src/assets/weather/` 目录

从 KDE 项目下载 7 个天气 SVG 图标：
- `sunny.svg`, `partly_cloudy_day.svg`, `partly_cloudy_night.svg`, `cloudy.svg`, `rain_or_mist.svg`, `snow_fall.svg`, `thunder.svg`

这些 SVG 图标使用 Nothing 风格的点阵设计，可作为 WeatherWidget 圆形/Grid 变体的图标源。

---

## 假设与决策

1. **不移植 KDE 特有功能**: 不移植 KDE Plasma 特有的功能（如系统托盘集成、Plasmoid 配置 UI、kpackagetool 安装）
2. **不移植 VariantSelector**: 首次使用变体选择器是 KDE Plasma 特有模式，Web 端通过 props 直接选择变体
3. **不移植 Open-Meteo API 集成**: 天气数据获取属于应用层逻辑，组件库仅负责展示。但会在 Props 中预留数据接口
4. **Canvas vs SVG**: AnalogClockWidget 优先使用 SVG 渲染（更好的可访问性和 CSS 动画支持），而非 KDE 的 Canvas 方案
5. **字体**: Serif 变体使用项目已有的 Space Grotesk 字体（而非 KDE 的自定义 serif.otf）
6. **Page Peel**: 作为可选交互效果实现，不影响无鼠标/触屏场景

---

## 验证步骤

1. TypeScript 编译通过 (`npx tsc --noEmit`)
2. 每个新组件在 App.tsx 中有 demo 展示
3. 所有新组件支持 light/dark 主题切换
4. 所有新组件遵循 `nothing-` BEM 命名规范
5. 所有新组件使用 CSS 自定义属性 token（无硬编码颜色/尺寸）
6. 所有新组件有基本的 ARIA 可访问性标注
7. 开发服务器正常渲染，无控制台错误
