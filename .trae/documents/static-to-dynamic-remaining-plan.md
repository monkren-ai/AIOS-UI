# 静态组件动态化 —— 剩余工作计划

**状态**: 计划中 (Plan Mode)
**日期**: 2026-06-14
**前序计划**: `.trae/documents/static-to-dynamic-components-plan.md`
**目标**: 完成 Phase 2 / 3 / 4 剩余工作,将所有静态占位组件升级为真实交互

---

## 0. 现状审计 (Phase 1: 探索总结)

### 0.1 已完成 ✅ (无需重做)

| 类别 | 文件 | 状态 |
|------|------|------|
| Hook | `hooks/useDeviceOrientation.ts` | ✅ 已创建 (iOS 13+ permission + 不可用时 real=false) |
| Hook | `hooks/useWeather.ts` | ✅ 已创建 (Open-Meteo + fallback) |
| Hook | `hooks/useLocalStorageState.ts` | ✅ 已创建 (跨 tab 同步) |
| Hook | `hooks/index.ts` | ✅ 已导出 |
| Nullframe | `nullframe/animations.ts` | ✅ 已创建 (6 种 GlyphAnim) |
| Nullframe | `nullframe/bodies.tsx` | ✅ 7 个 body (Activity/Contributions/Memory/Network/Glyph/Render/ClockHero/Seismo) 全部接入 telemetry / useNow / useTypedText / canvas |
| Widget | `widgets/CompassWidget.tsx` | ✅ 集成 `useDeviceOrientation`,`heading="auto"` 时 real |
| Widget | `widgets/WeatherWidget.tsx` | ✅ 集成 `useWeather` (Open-Meteo),`data-real` 切换 |
| Widget | `widgets/StepsWidget.tsx` | ✅ 内联编辑 + localStorage (`nothing-ui:steps`) |
| Widget | `widgets/ActivityWidget.tsx` | ✅ 双击编辑 + localStorage (`nothing-ui:activity`) |

### 0.2 剩余工作 (本次计划范围) ❌

| 类别 | 文件 | 工作量 | 优先级 |
|------|------|-------|--------|
| Widget | `widgets/PhotoFrameWidget.tsx` | 中 | 高 |
| Widget | `widgets/Time.tsx` (world 变体) | 中 | 高 |
| 通用 | `components/Quotes.tsx` | 小 | 中 |
| 通用 | `components/NextEvent.tsx` | 小 | 中 |
| 通用 | `components/Navigation.tsx` | 中 | 中 |
| 通用 | `components/DateNav.tsx` | 小 | 中 |
| 通用 | `components/Taskbar.tsx` | 小 | 中 |
| 通用 | `components/PhotoCarousel.tsx` | 中 | 中 |
| Demo | `App.tsx` (toggle bar) | 小 | 高 |
| 验证 | tsc + vite build + eslint | - | 必须 |

> ⚠️ 原计划提到 `Figma20Section.tsx` 替换 `<Compass heading={0}>` 为 `<Compass heading="auto">`,经核查 `Figma20Section.tsx` 实际从 `WidgetSubComponents` 导入 `Compass` (`sub/Compass.tsx`),**与本计划无关**。本计划不修改 `Figma20Section.tsx`。

---

## 1. 设计原则 (沿用前序计划)

1. **数据保真**: 优先真实 API → fallback 伪随机;根元素加 `data-real="true|false"`
2. **零破坏**: 现有 prop API 兼容,新功能默认开启
3. **可见性自动暂停**: 用 `useNow(N)` 替代裸 setInterval
4. **memory 安全**: useEffect cleanup 必须 clear
5. **最小变动**: 仅替换数据源/交互,视觉零变化

---

## 2. 剩余实施计划

### 2.1 PhotoFrameWidget (`useNow` + DotMatrix fallback)

**现状**: 仍用 `setInterval(advance, autoPlayInterval)`,无图时显示空白。

**改动**:
1. 引入 `useNow` 替换 setInterval:`const now = useNow(autoPlayInterval)`,当 `now` 变化时 advance
2. `images` 为空 / `src` 未传时,渲染 `<DotMatrix rows={4} cols={4} pattern="frame" />` 占位 (4×4 LED 网格)
3. 根元素加 `data-real="false"` 当无图,`data-real="true"` 当有外部 src
4. 保留 `autoPlay / autoPlayInterval / isPaused / handleDotClick` 不变
5. CSS: `photo-frame-widget.css` 末尾加 `&[data-real="false"]::after { content: 'SIM'; ... }` 小字标签

**文件**:
- 修改: `components/widgets/PhotoFrameWidget.tsx`
- 修改: `styles/photo-frame-widget.css` (+8 行)

### 2.2 Time (world 变体) —— Intl.supportedValuesOf 城市

**现状**: `defaultCities` 硬编码 4 个城市,无自动时区列表。

**改动**:
1. 新增 `useWorldCities()` 内联 hook,优先使用 `Intl.supportedValuesOf('timeZone')` (Chromium / Safari 16.4+ / Firefox 96+) 提取前 8 个有意义的时区
2. 不可用时回退到 `defaultCities`
3. 暴露 `useBrowserTimezones?: boolean` prop (默认 `true`)
4. 计算每个城市的 offset:`getTimezoneOffset(tz)` 通过 `new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' })`
5. 城市名通过 `tz.split('/').pop().replace(/_/g, ' ')` 提取
6. 根元素加 `data-real` 标识

**文件**:
- 修改: `components/widgets/Time.tsx` (仅 world 分支 + 新增 useWorldCities)

### 2.3 Quotes (默认名言库)

**现状**: `quotes = []` 默认空,无任何数据。

**改动**:
1. 新增 `defaultQuotes: QuoteData[]` (8 条英文 + 中文/作者) 包含技术 / 设计 / 哲学类
2. `interval` 默认改 30000 (30s, 原 5min 太久)
3. 引入 `useNow(interval)` 替代 setInterval
4. 根元素加 `data-real="false"` 当无外部 quotes prop
5. 保留 rotation / 空状态 fallback

**文件**:
- 修改: `components/Quotes.tsx`

### 2.4 NextEvent (默认事件 + 倒计时)

**现状**: `event` prop 不传时显示 "No upcoming events",无数据。

**改动**:
1. 新增 `defaultEvents: EventData[]` (3 条 demo,1 个今天,1 个 3 天后,1 个 1 周后)
2. 计算 `now → event.date` 倒计时 (DD : HH : MM 格式)
3. `useNow(60_000)` 每分钟更新倒计时
4. 根元素加 `data-real` 标识,`priority="high"` 当 < 24h
5. 暴露 `events?: EventData[]` prop 取代单 event (向后兼容 `event`)

**文件**:
- 修改: `components/NextEvent.tsx`

### 2.5 Navigation (URL hash 路由 + 真实高亮)

**现状**: `activeIndex` 内部 state,无 URL 同步。

**改动**:
1. 内部 `useEffect` 监听 `window.location.hash`,hash 变化时更新 activeIndex
2. 点击 item 时 `window.location.hash = '#' + item.label.toLowerCase()`,并触发 `onChange`
3. 初始 hash 与某 item label 匹配时高亮
4. 暴露 `syncWithUrl?: boolean` prop (默认 `true`)
5. 根元素加 `data-active-index` 反映当前 active
6. SSR-safe:`typeof window === 'undefined'` 跳过

**文件**:
- 修改: `components/Navigation.tsx`

### 2.6 DateNav (默认当月 + 真实月份导航)

**现状**: `label` 完全由外部 prop 提供,无默认。

**改动**:
1. 新增 `defaultLabel?: string` prop,默认从 `useNow(86_400_000)` 提取 "Month YYYY"
2. `onPrev/onNext` 不传时,内部维护 `currentDate` state,自动格式化 label
3. 边界处理:不传 onPrev 时禁用 prev 当月份 = 1970-01 (或允许无限)
4. 暴露 `initialDate?: Date` prop,默认 `new Date()`
5. 根元素加 `data-month` `data-year` 反映当前显示

**文件**:
- 修改: `components/DateNav.tsx`

### 2.7 Taskbar (useNow + 真实 battery)

**现状**: `useEffect + setInterval` 每秒 setTime,无真实 battery 数据。

**改动**:
1. 引入 `useNow(1000)` 替代 setInterval (沿用 `useNow` 自动暂停)
2. `useTelemetry()` 取 `battery` 真实电量 + `charging` 状态
3. 真实数据时 `data-real="true"`,TaskbarBatteryIcon 内部 fill 反映百分比
4. 失败时 `data-real="false"`,显示静态图标
5. `showBattery=true` 时显示 `XX%` 数字旁标

**文件**:
- 修改: `components/Taskbar.tsx`

### 2.8 PhotoCarousel (CSS 渐变占位图)

**现状**: 每个 slide 是 SVG 图标 + title,无视觉吸引力。

**改动**:
1. 4 个 `defaultSlides` 改为携带 `gradient: string` 字段
2. 每个 slide 渲染 `<div style={{ background: slide.gradient }}>` + 标题叠层
3. 渐变:线性 4 色组合 (橙→黄 / 绿→青 / 蓝→紫 / 粉→红)
4. 保留 SVG 占位作为 fallback 当 slide 有 `image` 但加载失败
5. 根元素加 `data-real` 标识

**文件**:
- 修改: `components/PhotoCarousel.tsx`
- 修改: `styles/photo-carousel.css` (+10 行渐变样式)

### 2.9 App.tsx (data-real toggle bar)

**现状**: 顶部有 toggleTheme / toggleLang 按钮,无 data-real 强制开关。

**改动**:
1. 新增 state: `const [forceSim, setForceSim] = useState(false)`
2. 顶部按钮 (toggleLang 下方) 新增 "FORCE SIM" / "REAL" 按钮
3. 创建 `useDataReal(forceSim)` hook 返回 `(real: boolean) => boolean`,当 `forceSim=true` 时强制返回 `false`
4. 改造关键 demo 组件传 prop 或包装 (如 `<WeatherWidget temp="30°" ... data-real={forceSim ? 'false' : 'true'}>`);由于组件内部已自管 data-real,改用 CSS 注入:
   - `document.documentElement.dataset.forceSim = forceSim ? 'true' : 'false'`
   - CSS 中加 `html[data-force-sim='true'] [data-real='true'] { ... }` 切到 sim 样式
5. **简化方案**: 仅 toggle 状态,不动组件 prop;CSS override 已经覆盖

**文件**:
- 修改: `App.tsx` (+ 1 按钮 + state)
- 修改: `styles/tokens.css` 或 `tokens.css` 末尾 (+5 行 override)

---

## 3. 改动文件清单 (汇总)

### 修改 (10 个)

1. `components/widgets/PhotoFrameWidget.tsx` — useNow + DotMatrix fallback
2. `components/widgets/Time.tsx` — useWorldCities (world 变体)
3. `components/Quotes.tsx` — 默认名言库
4. `components/NextEvent.tsx` — 默认事件 + 倒计时
5. `components/Navigation.tsx` — URL hash 路由
6. `components/DateNav.tsx` — 默认当月
7. `components/Taskbar.tsx` — useNow + 真实 battery
8. `components/PhotoCarousel.tsx` — CSS 渐变占位
9. `App.tsx` — FORCE SIM 切换按钮
10. `styles/photo-frame-widget.css` — `[data-real="false"]` 标签
11. `styles/photo-carousel.css` — 渐变 slide 样式

**总计**: 9 个 .tsx + 2 个 .css = 11 文件

---

## 4. 验证步骤

```bash
cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
npx tsc --noEmit                                    # 0 errors
npx vite build                                      # success
npx eslint src --max-warnings 0                     # 0 warnings
npx vite dev                                        # http://localhost:5173 启动
```

**手工验证**:
1. PhotoFrameWidget 无 src/images 时显示 4×4 DotMatrix 占位,每 N 秒"无变化" (无图不轮播)
2. Time variant="world" city 列表 ≥ 4 个,browser 时区检测在 DevTools Console 看
3. Quotes 默认轮换 8 条,30s 一次,有 `[SIM]` 标签
4. NextEvent 显示 3 条 demo 倒计时,每分钟更新
5. Navigation 点击 item,URL hash 变化,刷新后保持 active
6. DateNav 不传 prop 时显示 "June 2026" 当前月
7. Taskbar 时间随秒数跳变,Chrome DevTools 看到 battery 数字
8. PhotoCarousel 4 张渐变背景
9. App.tsx 顶部 FORCE SIM 切换,所有 `[data-real]` 视觉差异化

---

## 5. 风险与决策

| 风险 | 决策 |
|------|------|
| `Intl.supportedValuesOf('timeZone')` 兼容性 (Firefox < 96 / Safari < 16.4) | try/catch 包裹,失败回退 defaultCities |
| `getBattery` 仅 Chrome / Edge | `useTelemetry().battery` 已处理 fallback,直接复用 |
| `performance.memory` 仅 Chrome | 与本计划无关,Nullframe MemoryBody 已用 |
| PhotoFrameWidget 无图时 advance 仍触发 (会跳到 0/空索引) | 守卫 `displayImages.length === 0` 时不调用 advance |
| Navigation hash 改变触发 `popstate` 死循环 | 仅在 click handler 内 set hash,不监听 popstate |
| DateNav 月份 1970-01 边界 | 不强制,允许无限 (历史日期无意义但不影响功能) |
| App.tsx toggle 切换 SIM 不影响实际数据 (组件内部已自管) | 通过 CSS `html[data-force-sim]` 强制覆盖视觉,真实数据流不变 |

---

## 6. 不在范围

- ❌ 任何 Phase 1 / 已完成组件的二次修改 (Nullframe bodies / CompassWidget / WeatherWidget / StepsWidget / ActivityWidget)
- ❌ 替换任何 prop API (向后兼容)
- ❌ 新建额外 hook (useWorldCities 内联到 Time.tsx)
- ❌ Figma20Section.tsx (使用不同 Compass 实现,无关)
- ❌ 真实麦克风 / 剪贴板 / WebSocket (已有真实实现)

---

## 7. 执行 Todo

按依赖顺序执行,每完成 1-2 个子任务立刻 tsc 检查:

1. **PhotoFrameWidget** (useNow + DotMatrix fallback) — 1 子任务
2. **Time world** (useWorldCities) — 1 子任务
3. **Quotes** (默认名言库) — 1 子任务
4. **NextEvent** (默认事件 + 倒计时) — 1 子任务
5. **Navigation** (URL hash 路由) — 1 子任务
6. **DateNav** (默认当月) — 1 子任务
7. **Taskbar** (useNow + 真实 battery) — 1 子任务
8. **PhotoCarousel** (CSS 渐变占位) — 1 子任务
9. **App.tsx toggle bar** — 1 子任务
10. **最终验证**: tsc + vite build + eslint + 浏览器手工
