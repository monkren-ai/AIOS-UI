# 静态组件动态化实施计划

**状态**: 计划中 (Plan Mode)
**日期**: 2026-06-14
**参考**: Nothing OS / Phone (1)/(2) UI 真实交互模式
**模式**: 真实 + 模拟混合 (`data-real` 切换)

---

## 1. 探索总结 (Phase 1: Explore)

### 1.1 现状审计

`web-ui-kit/react/src/components/` 目录下 89 个组件;其中:

**A. 已经是动态的 (无需改造, 但可对接 telemetry bus 提升数据保真度)**:
- `WalkieTalkie` - 真实 MediaRecorder
- `Clipboard` - 真实 navigator.clipboard
- `Caffeinate` - 状态机 + 半衰期衰减
- `SunDial` - 真实 geolocation + 太阳轨迹计算
- `SystemMonitor` - 真实 getBattery + 模拟 CPU/RAM
- `Battery` - 真实 getBattery API
- `Date` (DateWidget) - 当前时间
- `Taskbar` - 当前时间
- `Calendar` - 月份导航

**B. Nullframe 7 个占位 Body (紧急, 当前仅显示 "XXX card body" 文字)**:
- `ContributionsBody` - 已有 `system/fake.ts` 的 `contributions` 52×7 网格数据, 未使用
- `MemoryBody` - 应展示 JS heap 实时数据 (bus.snap.heapMB)
- `NetworkBody` - 应展示真实 navigator.connection (bus.snap.net)
- `GlyphBody` - 应展示 DotMatrix glyph 动画 (Phone Glyph Interface)
- `RenderBody` - 应展示 FPS 实时曲线 (bus.snap.fps)
- `ClockHeroBody` - 应使用 `useTypedText` 显示 SYS 状态循环
- `SeismoBody` - 应使用 noise + canvas 模拟地震波 (Phone 内置 seismo app)

**C. 静态展示组件 (中优先级, 需要真实数据源)**:
- `PhotoCarousel` - 4 张占位 SVG 图像 → 改用占位 dot-matrix 渲染 "frame", 或读 `user-provided` url
- `Quotes` - 默认空数组, 无名言库 → 集成 5-10 条静态 + 可注入 prop
- `NextEvent` - 完全无默认事件 → 拉取 ICS feed (mock) 或 demo 数据
- `Navigation` - 静态 href="#", 改为可路由 + 真实高亮
- `DateNav` - 无内置日历联动 → 暴露 `onDateChange` API, 默认显示当月
- `CompassWidget` - heading 写死 0 → DeviceOrientation API
- `ActivityWidget` - 硬编码 7 天数据 → 用户输入 + localStorage
- `StepsWidget` - 硬编码 0 → 真实 pedometer (Permission API) 或输入
- `WeatherWidget` - 默认 Toronto 30° → Open-Meteo API (无 key) + 真实 geolocation
- `Weather.tsx` 已支持 variant, 但调用点 Figma20Section 仍写死

**D. 整体微动态 (低优先级, 增强体验)**:
- `Taskbar` 时间应跟随系统时区
- `PhotoFrameWidget` autoplay 改用真实 useNow 节拍
- `Sides/ContextMenu` 点击应触发真实 CommandPalette 跳转

### 1.2 现有基础设施

| 资源 | 路径 | 作用 |
|------|------|------|
| `bus` + `useTelemetry` | `system/telemetry.ts` + `system/hooks.ts` | 60FPS 真实遥测, heap/online/battery/FPS/velocity/inputRate |
| `useNow(intervalMs)` | `system/hooks.ts` | 时间 (visibility 自动暂停) |
| `useTypedText(messages)` | `system/hooks.ts` | 打字机循环 (3 段式) |
| `useBootNumber(live)` | `system/hooks.ts` | boot 数字滚动 |
| `contributions` 数据 | `system/fake.ts` | 52 周×7 天 heatmap (已就绪, 未被任何组件消费) |
| `commitMessages` 数据 | `system/fake.ts` | 10 条 (已就绪) |
| `statusMessages` 数据 | `system/fake.ts` | 5 条 (已就绪) |
| `withWidgetCard` HOC | `widgets/withWidgetCard.tsx` | 通用 widget 壳 |

### 1.3 Nothing Phone UI 模式 (参考)

- **Glyph Interface**: LED 灯条 (DotMatrix 5x7 网格模拟), 与系统状态联动 (来电/通知/充电)
- **Clock Hero**: mono 字体大数字 + 状态行打字机
- **Quick Settings / Tiles**: 单一焦点 metric + 短副标
- **Dot Matrix Animation**: 旋转 / 闪烁 / scan 模式
- **Seismo / Recorder**: 实时波形
- **Always-on Display**: 低频刷新 (1Hz), 高对比度

---

## 2. 设计原则

1. **数据保真**: 优先用 `useTelemetry()` 真实数据 (`bus.start()` 已在 NullframeDashboard 调用), 失败时降级到 `useNow` + 伪随机
2. **`data-real` 切换**: 每个动态组件根元素上加 `data-real="true|false"`, 模拟数据用 `data-real="false"`, 让 CSS 可差异化样式 (e.g. 真实数据 dim, 模拟数据 italic)
3. **零破坏**: 现有 prop API 保持兼容, 仅在 `useEffect` 内 fallback
4. **可见性自动暂停**: 所有 setInterval 必须 `if (document.hidden) return` 或用 `useNow`
5. **memory 安全**: 卸载时 clear timeout/interval/rAF

---

## 3. 实施阶段 (Phased)

### Phase 1: Nullframe 7 个 Body 动态化 (高优先级, 1-2 天)

**目标**: 让 Nullframe dashboard 看上去"活的"。

| Body | 动态化方案 | data-real 来源 |
|------|-----------|----------------|
| `ContributionsBody` | 用 `system/fake.ts` 的 52×7 网格, onClick reroll (`bus.reroll()`) 重新生成 | `bus.real` 不存在, 永远 SIM |
| `MemoryBody` | `useTelemetry().heapMB` 数字滚动 + 24-seg bar, 每 500ms 更新 | `bus.snap.heapReal` (来自 `performance.memory`) |
| `NetworkBody` | `useTelemetry().net.downlink` 实时变化 + 类别图示 (wifi/cellular) | `bus.snap.netReal` (来自 `navigator.connection`) |
| `GlyphBody` | DotMatrix 5x7 网格 + 6 种动画 (pulse / scan / wave / sparkle / fill / wipe), useNow 1s 切换 | 永远 SIM |
| `RenderBody` | canvas 绘制 60 个最近 FPS 样本折线, `useTelemetry().fps` | 永远 SIM (FPS 模拟) |
| `ClockHeroBody` | `useNow(1000)` 大数字 + `useTypedText(statusMessages)` 副标, 真实 `bootAt` 决定 uptime | 真实 `Date` |
| `SeismoBody` | canvas + Perlin noise + R 通道颜色, 模拟地震波 (3s 周期) | 永远 SIM |

**新建文件**:
- `nullframe/animations.ts` - 6 种 glyph 动画的 frame 数据生成
- `nullframe/useSimulatedWeather.ts` (可选, 提前用于 Memory/Network 备份数据)

**修改文件**:
- `nullframe/bodies.tsx` - 7 个 body 全部重写

### Phase 2: Widget 层真实数据接入 (中优先级, 2-3 天)

| 组件 | 改造 |
|------|------|
| `CompassWidget` | `DeviceOrientationEvent` API, `heading` prop 接受 `number \| 'auto'`, auto 时监听 `deviceorientation` |
| `WeatherWidget` | Open-Meteo `https://api.open-meteo.com/v1/forecast?latitude=...&current=temperature_2m,...` 无需 key, 失败回退默认 30° Toronto |
| `StepsWidget` | 暴露 `usePedometor()` hook: 优先 `navigator.permissions` + `DeviceMotionEvent` (浏览器 API 有限), 降级到用户输入框 |
| `ActivityWidget` | localStorage 持久化 7 天数据, 默认从 commitMessages 计算 (与 ActivityBody 联动) |
| `PhotoFrameWidget` | autoplay interval 用 `useNow(1000)` 节拍, 失败/无图时显示 DotMatrix 4x4 几何图案 |
| `widgets/Time.tsx` | `world` 变体根据 `Intl.supportedValuesOf('timeZone')` 自动补全城市列表 |

**新建文件**:
- `hooks/useDeviceOrientation.ts`
- `hooks/useWeather.ts` (Open-Meteo 客户端)
- `hooks/useLocalStorageState.ts` (供 ActivityWidget 复用)

**修改文件**:
- `widgets/CompassWidget.tsx` (内联 useDeviceOrientation)
- `widgets/WeatherWidget.tsx` (内联 useWeather)
- `widgets/StepsWidget.tsx` (内联 usePedometor)
- `widgets/ActivityWidget.tsx` (localStorage)
- `widgets/PhotoFrameWidget.tsx` (useNow 节拍)
- `widgets/Time.tsx` (world 自动城市列表)

### Phase 3: 通用组件真实数据 (低优先级, 1-2 天)

| 组件 | 改造 |
|------|------|
| `Quotes` | 注入 8 条默认英文/中文双语名言, 30s 轮换 (而非 5min) |
| `NextEvent` | 接受 `events: EventData[]` 数组, 默认 3 条 demo 事件, 倒计时到下一个 |
| `Navigation` | 当前路由用 `useLocation` (若 react-router) 或 URL hash, 高亮 active |
| `DateNav` | 默认 `initialDate = new Date()`, 暴露 `onChange(date)` |
| `Taskbar` | 接入 `useTelemetry().battery` 显示真实电量图标 (失败显示 0% 灰色) |
| `PhotoCarousel` | `slides` 默认为 4 张 CSS 渐变 (橙/绿/蓝/紫) + DotMatrix 几何 (无外部图片依赖) |

**修改文件**:
- 上述 6 个组件

### Phase 4: Demo App 整合 (0.5 天)

- `App.tsx` 给每个动态组件加 `data-real` 演示开关 (顶部 toggle bar, 强制 SIM)
- `Figma20Section.tsx` 替换硬编码 <Compass heading={0}> 为 <Compass heading="auto">
- `NullframeSection.tsx` 无改动 (NullframeDashboard 已经接 bus)

---

## 4. 改动文件清单 (汇总)

### 新建
1. `nullframe/animations.ts`
2. `hooks/useDeviceOrientation.ts`
3. `hooks/useWeather.ts`
4. `hooks/useLocalStorageState.ts`

### 重写
5. `nullframe/bodies.tsx` (7 body 全部)
6. `widgets/CompassWidget.tsx`
7. `widgets/WeatherWidget.tsx`
8. `widgets/StepsWidget.tsx`
9. `widgets/ActivityWidget.tsx`
10. `widgets/PhotoFrameWidget.tsx`
11. `widgets/Time.tsx` (仅 `world` 变体)

### 调整
12. `Quotes.tsx`
13. `NextEvent.tsx`
14. `Navigation.tsx`
15. `DateNav.tsx`
16. `Taskbar.tsx`
17. `PhotoCarousel.tsx`
18. `App.tsx` (演示开关)
19. `Figma20Section.tsx`

**总计**: 4 新建 + 7 重写 + 8 调整 = 19 文件

---

## 5. CSS / 样式调整

需在对应 `.css` 文件加 `data-real="false"` 下的次级样式 (italic / dim / `::after` "SIM" 标签):

- `nullframe.css` - body 容器底部小字 `[SIM]` 当 `data-real="false"`
- `weather-widget.css` - `data-real="false"` 时温度数字加 `::after` " (sim)"
- `compass-widget.css` - 同上
- 其他组件同理

总计: 6 个 CSS 文件加 ~3 行/文件, 不影响现有样式。

---

## 6. 验证步骤

```bash
cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
npx tsc --noEmit                                    # 0 errors
npx vite build                                      # success
npx eslint src --max-warnings 0                     # 0 warnings
npx vite dev                                        # http://localhost:5173 启动
```

**手工验证 (http://localhost:5173)**:
1. Nullframe dashboard 看到 7 个 body 都有动态内容
2. MemoryBody 数字与 DevTools Memory 同步
3. NetworkBody 数字与 DevTools Network Throttle 同步
4. CompassWidget 在手机上旋转跟随 (PC 无 deviceorientation 时显示 SIM 标记)
5. WeatherWidget 默认显示 Toronto, 手动改 lat/lng prop 后 fetch
6. PhotoCarousel 4 张几何渐变图, 自动轮播
7. App.tsx 顶部 toggle 切换 SIM/REAL, 所有组件 data-real 同步更新

---

## 7. 风险与决策

| 风险 | 决策 |
|------|------|
| Open-Meteo CORS / 离线 | 加 try/catch, 失败 fallback 30° Toronto + `data-real="false"` |
| DeviceOrientationEvent 仅 HTTPS / 部分浏览器 | 检测 `'DeviceOrientationEvent' in window`, 不存在时显示 SIM |
| `performance.memory` 仅 Chrome | 已有 `heapReal` 字段, 复用 |
| 频繁 setInterval 性能 | 用 `useNow(1000)` 或 `useTelemetry` (rAF 节流到 2Hz) 替代裸 setInterval |
| 真实数据无障碍 | 已有 `aria-live="polite"` 模式 (States.tsx 示范), 沿用 |
| 破坏现有 demo 视觉 | 全部改动保持现有 variant 行为, 仅替换数据源; 视觉零变化 |

---

## 8. 不在范围内 (明确排除)

- ❌ 真实麦克风录音 (WalkieTalkie 已有 MediaRecorder, 不动)
- ❌ 真实剪贴板监听 (Clipboard 已有 navigator.clipboard, 不动)
- ❌ 真实后台推送 / WebSocket
- ❌ 真实 IndexedDB 缓存 (localStorage 已够用)
- ❌ Service Worker / PWA
- ❌ 替换任何已合并组件的 API (Card / Time / Weather variant 等保持不变)

---

## 9. 计划执行 Todo (Phase 1-4)

1. **Phase 1 (Nullframe 7 body)**: 6 子任务
   - 1.1 contributions 网格 + reroll
   - 1.2 memory telemetry 接入
   - 1.3 network telemetry 接入
   - 1.4 glyph animations.ts 6 模式
   - 1.5 render FPS canvas
   - 1.6 clock hero useTypedText
   - 1.7 seismo canvas noise
2. **Phase 2 (Widgets)**: 6 子任务 (见 §3 Phase 2 表)
3. **Phase 3 (通用组件)**: 6 子任务
4. **Phase 4 (Demo 整合)**: 3 子任务 (toggle, Figma20Section, App)
5. **最终验证**: tsc / vite build / eslint / 浏览器手工
