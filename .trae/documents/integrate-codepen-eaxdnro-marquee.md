# 集成 CodePen EaxdNRo（点阵网格滚动文字）效果组件

## 摘要

将 [CodePen EaxdNRo](https://codepen.io/Cubiq-ish/pen/EaxdNRo) 的「网格蒙版 + 无限横向滚动文字」效果集成到 Nothing UI React 应用中。采用「新建独立 Section + 完整 Nothing design 主题适配」方案：把 CSS 中的硬编码颜色和 Google Fonts 替换为 `var(--...)` 设计 token 与 `var(--font-display)`，保留 `mask-composite: intersect` 实现的镂空点阵蒙版核心视觉。新增 `Marquee.tsx` 组件 + `MarqueeSection.tsx` 分类 Section，通过 lazy 加载接入 `App.tsx` 导航。

> 备注：CodePen 抓取受 Cloudflare 阻挡，源码由用户粘贴的 CSS（不完整，后半段 `h1` 的 animation 规则、HTML 文本内容按用户授权按 marquee 通用模板推断实现）。

## 当前状态分析

### 项目结构（已确认）

- 路径：`nothing-design-skill/nothing-design/web-ui-kit/react/`
- 框架：React 19 + Vite 8 + TypeScript 6 + Tailwind 3.4
- 设计 token 入口：`src/styles/tokens.css`（含 `--font-display`、`--font-mono`、`--black`、`--text-primary`、`--surface`、`--border-visible`、`--space-*`、`--radius-pill`、`--easing`、`--duration-*`）
- 命名约定：组件类名 `.nothing-*`，CSS 前缀 `.dmx-*`（已存在 dotmatrix-loaders），第三方前缀互不冲突
- 已有「特效」区段参考实现：
  - [src/sections/DotMatrixLoadersSection.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/sections/DotMatrixLoadersSection.tsx) — 简单 grid 展示多个 loader
  - [src/sections/NullframeSection.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/sections/NullframeSection.tsx) — 整个 Dashboard
- App.tsx 接入模式：
  - lazy import（L122–L124）
  - `categories` 数组追加新条目（L196–L216）
  - `<CategorySection>` 包裹 `<Suspense>` 渲染（L1411–L1421）

### 源效果代码（用户提供片段）

CSS 关键部分已确认：
- Manrope 字体（`@import url('https://fonts.googleapis.com/css2?family=Manrope:...')`）
- 自定义属性 `--_w: 80%`（mask 间隔比例）、`--_s: .3ch`（mask 单元尺寸）
- 双 linear-gradient + `mask-composite: intersect` 生成镂空网格
- 圆角 `border-radius: 99em`（胶囊形容器）
- `@keyframes scroll { from {translateX(0%)} to {translateX(-100%)} }`
- 悬停暂停：`--p: paused`（推断接 `animation-play-state: var(--p, running)`）

被截断部分（按用户授权按通用模式推断）：
- HTML：`<main><h1><span>TEXT</span><span>TEXT</span></h1></main>`（重复两次以实现无缝循环）
- h1 样式：`animation: scroll var(--dur, 12s) linear infinite; animation-play-state: var(--p, running);`
- 颜色：白字 + `#020617` 暗底
- 容器宽度：`width: min(25rem, 100%)`
- 无 JavaScript

## 提出的改动

### 1. 新建组件 `src/components/Marquee.tsx`

**位置**：[src/components/Marquee.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Marquee.tsx)

**实现要点**：
- 纯函数组件 + `React.forwardRef`
- 导入 CSS：`import '../styles/marquee.css'`
- Props 接口（TypeScript strict）：

  ```ts
  export interface MarqueeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    text: string                                  // 主显示文字
    duration?: number                             // 滚动周期（秒，默认 12）
    pauseOnHover?: boolean                        // 默认 true
    /** 自定义容器宽度（CSS 值），默认 "min(25rem, 100%)" */
    width?: string
    /** mask 网格大小（字符宽度单位 ch），默认 0.3 */
    cellSize?: number
    /** mask 间隔比例 0-1，默认 0.8 */
    gapRatio?: number
  }
  ```

- 渲染结构（沿用 CodePen 模式但用更稳健的 className）：

  ```tsx
  <div ref={ref} className="nothing-marquee" style={{...}} {...props}>
    <div className="nothing-marquee-track">
      <h1 className="nothing-marquee-text" aria-label={text}>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
      </h1>
    </div>
  </div>
  ```

  > 复制 3 段以确保视觉无缝；用 `aria-hidden` 避免屏幕阅读器朗读重复文本。

- CSS 变量透传：在根元素 `style` 中把 `duration/cellSize/gapRatio/width` 写为 CSS 自定义属性（`--mq-dur`、`--mq-cell`、`--mq-gap`、`--mq-width`），CSS 中读取。**不内联** `animation` 字符串，便于主题系统统一管控。

- 主题适配：
  - 文字色：`color: var(--text-primary)`
  - 蒙版层：`background: var(--surface)`，mask 路径色固定白（mask 层只看 alpha）
  - 字体：`font-family: var(--font-display)`
  - 尺寸：宽度 `--mq-width`，高度由内容决定，**不固定行高**，避免影响网格对齐

### 2. 新建样式 `src/styles/marquee.css`

**位置**：[src/styles/marquee.css](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/styles/marquee.css)

**实现要点**（保留 CodePen 视觉核心，主题变量化）：

```css
/* === Marquee — 镂空网格滚动文字 === */
.nothing-marquee {
  --mq-dur: 12s;        /* animation duration */
  --mq-cell: 0.3;       /* mask cell size (ch unit) */
  --mq-gap: 0.8;        /* mask gap ratio (0~1) */
  --mq-width: min(25rem, 100%);

  display: grid;
  place-items: center;
  padding: 1em;
  width: 100%;
}

.nothing-marquee-track {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: var(--mq-width);
  height: 1em;
  border-radius: var(--radius-pill, 999em);
  background: var(--surface);
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: inherit;
  line-height: 1;
  padding: 0.2em 0.4em;

  /* 镂空网格蒙版：双 linear-gradient + intersect 合成 */
  -webkit-mask:
    linear-gradient(to right, #0000 calc(var(--mq-gap) * 100%), #fff 0),
    linear-gradient(to bottom, #0000 calc(var(--mq-gap) * 100%), #fff 0);
  mask:
    linear-gradient(to right, #0000 calc(var(--mq-gap) * 100%), #fff 0),
    linear-gradient(to bottom, #0000 calc(var(--mq-gap) * 100%), #fff 0);
  -webkit-mask-size: calc(var(--mq-cell) * 1ch) calc(var(--mq-cell) * 1ch);
          mask-size: calc(var(--mq-cell) * 1ch) calc(var(--mq-cell) * 1ch);
  -webkit-mask-composite: intersect;
          mask-composite: intersect;
}

.nothing-marquee-text {
  display: inline-flex;
  gap: 2ch;
  margin: 0;
  font-weight: var(--weight-bold);
  font-stretch: 100%;
  letter-spacing: -0.01em;
  animation: nothing-marquee-scroll var(--mq-dur) linear infinite;
  animation-play-state: var(--mq-p, running);
}

.nothing-marquee:hover .nothing-marquee-text {
  --mq-p: paused;
}

@keyframes nothing-marquee-scroll {
  from { transform: translateX(0%); }
  to   { transform: translateX(calc(-100% / 3)); }
}

/* 尊重 reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .nothing-marquee-text { animation: none; }
  .nothing-marquee-track { -webkit-mask: none; mask: none; }
}
```

关键点：
- `translateX(calc(-100% / 3))` 对应复制 3 段的位移（每段占 1/3 宽度，循环 1 段即复原）
- `mask-composite: intersect` 保留 CodePen 核心视觉
- `prefers-reduced-motion` 停止动画并去除 mask（无障碍）
- `border-radius: var(--radius-pill, 999em)` 兼容设计系统
- 全部用 `var(--text-primary)` / `var(--surface)`，亮/暗主题自动切换（CSS 已由现有 `[data-theme]` 控制）

### 3. 新建展示 Section `src/sections/MarqueeSection.tsx`

**位置**：[src/sections/MarqueeSection.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/sections/MarqueeSection.tsx)

**结构**：
- 引入 `Marquee` 组件 + `../styles/marquee.css`
- 演示 3 种变体：默认（白字+暗底）、双段（长文本+短文本）、fast（小尺寸快滚动）
- 每个变体：上方 `demoTitleStyle` 标签 + 下方卡片容器（沿用现有 `border: 1px solid var(--border)` / `border-radius: var(--radius-md)` / `background: var(--surface)` 风格）
- 文案使用与项目一致的 i18n `t(zh, en)` 模式（从 `App.tsx` 复制 `t` 模式或改用静态 zh，因为 section 接收不到 lang context）—— **简化决策**：section 内仅展示英文标签（与 NullframeSection/DotMatrixLoadersSection 一致），不引入跨 section 的语言 prop

**参考实现骨架**：

```tsx
import Marquee from '@/components/Marquee'
import '@/styles/marquee.css'

const variants = [
  { id: 'default', label: 'DEFAULT', text: 'NOTHING UI / DESIGN SYSTEM' },
  { id: 'long',    label: 'LONG',    text: 'PRECISION · RESTRAINT · TECHNICAL · CHARACTER' },
  { id: 'fast',    label: 'FAST',    text: 'SCROLL' },
] as const

function MarqueeSection() {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
      {variants.map(v => (
        <div key={v.id} style={{ ...cardStyle }}>
          <div style={demoTitleStyle}>{v.label}</div>
          <Marquee text={v.text} duration={v.id === 'fast' ? 6 : 14} />
        </div>
      ))}
    </div>
  )
}

export default MarqueeSection
```

### 4. 接入 `src/App.tsx`

**位置**：[src/App.tsx](file:///c:/Users/monkr/Documents/github/Nothing UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/App.tsx)

**改动**：
1. 在 L122 附近添加 lazy import：
   ```ts
   const MarqueeSection = lazy(() => import('./sections/MarqueeSection'))
   ```
2. 在 `categories` 数组（L196–L216）追加：
   ```ts
   { id: 'marquee-effect', zh: '滚动效果', en: 'Marquee Effect' },
   ```
   插在 `dotmatrix-loaders` 之后、`nullframe` 之前。
3. 在 DotMatrixLoadersSection 渲染块之后、L1417 之前新增 CategorySection：
   ```tsx
   <CategorySection id="marquee-effect" title={t('滚动效果', 'Marquee Effect')}>
     <Suspense fallback={<div style={{ color: 'var(--text-secondary)', padding: '24px' }}>{t('加载中…', 'Loading...')}</div>}>
       <MarqueeSection />
     </Suspense>
   </CategorySection>
   ```
4. 不需要 import `Marquee` 组件本身（仅 section 内部使用）。

### 5. 不需要改动的部分

- `tokens.css` — 所有需要的 token 已存在
- `tailwind.config.js` — 不使用 Tailwind 实现此组件
- `package.json` — 无新依赖（无 JS 动画库，纯 CSS）

## 假设与决策

1. **源码不完整，按用户授权按通用 marquee 模式推断**：HTML 复制 3 段（更稳健的视觉无缝），CSS 动画位移 `translateX(-100%/3)`。若实际 CodePen 是 2 段，将 `to { translateX(-50%) }` 即可，**实现完成后在 Plan Verification 中确认。**
2. **保留 CodePen 核心视觉**：mask 网格、胶囊圆角、滚动行为是此效果的灵魂；主题适配只替换颜色/字体 token，不改变几何。
3. **不引入 Google Fonts**：项目已用 `--font-display`（Doto / Space Mono），CSS 改为 `font-family: var(--font-display)`，移除 Manrope 导入。
4. **不内联 style.animation**：用 CSS 变量 `--mq-dur`、`--mq-p` 让组件在 props 改变时通过 React style 重新写入，更易被 React 调和。
5. **复制 3 段而非 2 段**：3 段确保任意时刻屏幕外仍有富余文字，避免文本短时出现空白。
6. **无 JS 动画库依赖**：CodePen 原版无 JS，保持纯 CSS。
7. **可访问性**：`aria-label` 主文本 + `aria-hidden` 重复段；`prefers-reduced-motion` 停止动画并降级到无 mask。
8. **懒加载**：与 `DotMatrixLoadersSection`、`NullframeSection` 保持一致（不影响首屏）。
9. **section 内不接入 `lang` 状态**：与现有 section 一致（NullframeSection / DotMatrixLoadersSection 也只展示英文标签）。如未来需要中英双标签，可在 App.tsx 把 `lang` 提升到 Context 中。

## 验证步骤

1. `cd nothing-design-skill/nothing-design/web-ui-kit/react && npm run type-check` — 零类型错误
2. `npm run dev` — 启动 Vite 开发服务器
3. 浏览器检查：
   - 左侧导航出现「滚动效果 / Marquee Effect」分类，点击跳转
   - 3 个变体依次渲染：
     - DEFAULT：长文字均匀滚动，悬停暂停
     - LONG：带间隔符长文本滚动
     - FAST：6s 快周期滚动
   - 滚动文字带镂空点阵蒙版（mask-composite intersect 效果）
   - 切换「切换主题」按钮，文字/蒙版/胶囊底色随 dark/light 主题变化
   - 切换「EN/中」按钮，分类标题中英文切换（Marquee 文字本身不切换，按设计）
4. 启用 `prefers-reduced-motion: reduce`（浏览器 DevTools Rendering → Emulate CSS media feature）后动画停止，mask 也降级消失
5. 控制台无报错（无外部字体 404、无未定义 class）
6. 视觉检查：胶囊宽度 `min(25rem, 100%)` 居中，圆角完整不破

## 风险与回退

- **风险 1**：若 `mask-composite: intersect` 在某些浏览器不识别（Chrome ≥120、Firefox ≥113 已支持），准备 `-webkit-mask-composite` 双前缀（已加），并提供 `@supports not (mask-composite: intersect)` 降级到无蒙版。
- **风险 2**：若用户后续提供完整 CodePen 源码发现实际是 2 段或不同动画曲线，仅需修改 `keyframes` 终止位移与 `<span>` 数量，不影响组件接口。
- **回退**：删除 `Marquee.tsx`、`marquee.css`、`MarqueeSection.tsx` 及 App.tsx 中的 3 处改动即可。
