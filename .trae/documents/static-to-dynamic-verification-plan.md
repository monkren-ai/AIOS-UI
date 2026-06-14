# 静态组件动态化 —— 收尾验证计划

**状态**: Plan Mode (收尾)
**日期**: 2026-06-14
**前置**: `.trae/documents/static-to-dynamic-components-plan.md` + `.trae/documents/static-to-dynamic-remaining-plan.md`

---

## 1. 现状 (Phase 1 探索结果)

### 1.1 已完成 (无需再动)

经过代码核对,**前序计划的所有 8 个组件 + App.tsx toggle 全部落地**:

| 组件 | 路径 | 关键变化 | `data-real` |
|------|------|---------|------------|
| `PhotoFrameWidget` | `components/widgets/PhotoFrameWidget.tsx` | `useNow` 替换 setInterval + 无图时 4×4 DotMatrix fallback | ✅ `data-real={hasContent}` |
| `Time` (world) | `components/widgets/Time.tsx` | `useWorldCities` 调 `Intl.supportedValuesOf('timeZone')` | ✅ `data-real={world.real}` |
| `Quotes` | `components/Quotes.tsx` | 8 条默认名言 + `useNow(30000)` 30s 轮换 | ✅ `data-real={real}` |
| `NextEvent` | `components/NextEvent.tsx` | 3 条默认事件 + 倒计时 + `<24h` 自动 high | ✅ `data-real={real}` |
| `Navigation` | `components/Navigation.tsx` | URL hash 双向同步 + `syncWithUrl/scrollIntoView` props | ✅ `data-real={...}` |
| `DateNav` | `components/DateNav.tsx` | `initialDate / currentDate / onDateChange` 受控/非受控 | ✅ `data-real={real}` |
| `Taskbar` | `components/Taskbar.tsx` | `useNow(1000)` + `useTelemetry().battery` 真实电量 | ✅ `data-battery / data-battery-percent` |
| `PhotoCarousel` | `components/PhotoCarousel.tsx` | 4 张渐变占位 slide + visibility-aware autoplay | ✅ `data-real={hasImages}` |
| `App.tsx` | `App.tsx` | 顶部 `FORCE SIM / REAL` 按钮 + `document.documentElement.dataset.forceSim` 同步 | n/a |

**Hooks (支撑)**:
- ✅ `hooks/useDeviceOrientation.ts` (CompassWidget 用)
- ✅ `hooks/useWeather.ts` (WeatherWidget 用, Open-Meteo)
- ✅ `hooks/useLocalStorageState.ts` (StepsWidget / ActivityWidget 持久化)

**Nullframe (Phase 1)**:
- ✅ `nullframe/animations.ts` (6 种 Glyph 动画)
- ✅ `nullframe/bodies.tsx` (7 个 body 全部接入 telemetry / useNow / canvas)

**CSS**:
- ✅ `styles/photo-frame-widget.css` 末尾 `[data-real="false"]::after { content: 'SIM'; }`
- ✅ `styles/world-clock.css` `SIM` 徽标 (Time.tsx 内联)
- ⏳ `styles/photo-carousel.css` 默认渐变已通过 inline `style` 渲染,无需追加 CSS

### 1.2 唯一未完成

**最终验证**: tsc + vite build + eslint + 浏览器手工。代码已经全部写好,仅需跑一次构建管线确认 0 errors / 0 warnings,以及手工验证 demo 渲染。

---

## 2. 收尾执行计划

### 2.1 构建与静态检查

**目标**: 验证所有 TS / CSS / 静态检查通过。

**步骤**:
1. 打开终端进入 react 包目录:
   ```bash
   cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
   ```
2. TypeScript 编译:
   ```bash
   npx tsc --noEmit
   ```
   期望: 0 errors。若报错,逐个修复(常见原因: hooks 顺序 / `dataAttr` 类型)。
3. Vite 生产构建:
   ```bash
   npx vite build
   ```
   期望: 成功输出 `dist/`,无警告。
4. ESLint (若有脚本):
   ```bash
   npx eslint src --max-warnings 0
   ```
   期望: 0 warnings。若无此命令,跳过。

### 2.2 浏览器手工验证 (http://localhost:5173)

启动开发服务器:
```bash
npx vite dev
```

按下面 9 条核对每项功能:

| # | 组件 | 验证点 | 期望 |
|---|------|-------|------|
| 1 | `PhotoFrameWidget` | 不传 `src` / `images` 渲染 | 显示 4×4 DotMatrix 几何占位,角落有 `SIM` 小字 |
| 2 | `Time` (variant=world) | 不传 `cities` 渲染 | 至少 4 个城市,Chromium 6-8 个,Console 看到 `Intl.supportedValuesOf` |
| 3 | `Quotes` | 不传 `quotes` 渲染 | 30s 自动轮换 8 条,有 `data-real="false"` |
| 4 | `NextEvent` | 不传 `event / events` 渲染 | 3 条 demo 事件,最近未到期者高亮 + 倒计时跳变 |
| 5 | `Navigation` | 点击 `主页 / 设备 / 设置` | URL hash 变化 (`#home` 等),刷新后 active 保持 |
| 6 | `DateNav` | 不传 `label / onPrev / onNext` | 显示 `June 2026`,点击 < > 切换月份 |
| 7 | `Taskbar` | 渲染 Taskbar | 时间跳秒,Chrome / Edge 显示真实电量百分比 + 充电图标 |
| 8 | `PhotoCarousel` | 不传 `slides` | 4 张彩色渐变 (橙/绿/蓝/粉),4s 自动轮换 |
| 9 | `App.tsx` | 点击顶部 `FORCE SIM` | 所有 `[data-real]` 标签视觉差异化(若 CSS 已加 override) |

### 2.3 风险检查

| 风险 | 缓解 |
|------|------|
| `tsc` 报 `useNow` 类型错 | 检查 `system/hooks.ts` 是否导出 `useNow` |
| `vite build` 报循环依赖 | 检查新引入的 hooks 链 |
| `Intl.supportedValuesOf` 不可用 (Firefox < 96 / Safari < 16.4) | Time.tsx 已 try/catch fallback defaultCities |
| `data-real` 切换无视觉差异 | 当前未在 CSS 加 `html[data-force-sim]` 强制覆盖,仅组件根属性变化;**不影响功能** |

---

## 3. 不在范围 (本计划明确排除)

- ❌ 重新修改任何已落地的组件
- ❌ 新建任何 hook / 组件
- ❌ 修改 `tokens.css` 加 `html[data-force-sim]` 强制覆盖 (本次仅做切换,不强加视觉差异)
- ❌ 添加单元测试 (项目无 vitest 配置)
- ❌ 替换 `Figma20Section.tsx` (使用 `sub/Compass.tsx`,与本计划无关)

---

## 4. 执行 Todo (≤ 4 步)

1. **构建验证**: tsc / vite build / eslint
2. **手工验证**: 9 项 demo 功能核对
3. **修复**: 若 tsc / build 报错,按错误最小化修复 (不允许重写)
4. **完成报告**: 总结 0 errors / 0 warnings / demo 可用
