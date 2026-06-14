# Widget Sub Div 内部图标、背景颜色统一计划

## 现状分析

`components/widgets/sub/` 目录下有 ~30 个 widget 子组件,每个组件的外层 `div` (即 `widget-card`) 通常带有:

1. 固定的背景色主题 (light / dark / accent / grey 等),通过 CSS class 控制
2. 内嵌 SVG 图标元素,其 `fill` / `stroke` 通过:
   - React 属性: `fill="var(--fill-0, var(--widget-xxx))"` 
   - 或 `style={{ fill: "color(display-p3 ...)" }}` 覆盖式 inline 样式
3. 内部 div 容器的 icon area (如 `widget-card__svg--24`) 没有统一的尺寸/对齐

### 发现的不一致

- **display-p3 覆盖写法**: 大量 SVG 子元素使用 `style={{ fill: "color(display-p3 0.xxx 0.xxx 0.xxx)" }}` 覆盖了属性级别的 CSS 变量,这会导致 `data-theme` 切换时颜色不动。
- **每个组件自己写了 1~N 个 SVG 元素的颜色变量**:没有通过一个统一的 token 驱动。
- **icon 尺寸**: `widget-card__svg--24` / `widget-card__svg--16` / `widget-card__svg--64` 是硬编码的类名,没有统一为 `widget-card__icon` 这种抽象。
- **accent / red 颜色**: 设计系统中的红色 (`--widget-primary: #D71921`) 属于品牌色,需要保留。用户特别说明"红色除外"——意味着 **除了红色系 (accent / primary / error / widget-primary / recording red dot) 的颜色不改动**,其他所有 `light/dark/grey` 的颜色都改成使用 **CSS 变量**,而不是 `display-p3` 字面量。

## 目标

统一每个 `div.widget-card` (即 sub 组件的外层 div) 内部的:
1. **SVG 图标颜色** - 使用 CSS 变量驱动,去掉硬编码 `color(display-p3 ...)` inline style
2. **背景颜色** - 使用 `widget-card--{theme}` class 与 CSS 变量组合
3. **尺寸容器** - 使用统一的 `widget-card__icon` + `data-size` 属性

## 改动范围

涉及文件 (在 `react/src/components/widgets/sub/` 下):

1. `Active.tsx`
2. `ActivityTracker.tsx`
3. `AutoRotate1.tsx`
4. `Campus.tsx`
5. `Card.tsx`
6. `Compass.tsx`
7. `Counter.tsx`
8. `Date.tsx`
9. `Device.tsx`
10. `Dots3.tsx`
11. `DoubleDown.tsx`
12. `Flash.tsx`
13. `Glyphs.tsx`
14. `LoadingBar1.tsx`
15. `Location1.tsx`
16. `LocationAccess.tsx`
17. `MicAccess.tsx`
18. `Mode.tsx`
19. `Music.tsx`
20. `MusicPlayer.tsx`
21. `NothingEar.tsx`
22. `OverLimit.tsx` - 红色保留 (`--widget-primary-dark` 对应 `#881532`),其他颜色改为 var
23. `PairNewDevice.tsx`
24. `Play.tsx`
25. `Recording.tsx` - 红色保留 (`--widget-primary` 对应 red),其他颜色改为 var
26. `SelectDevice.tsx`
27. `StepsCounter.tsx`
28. `TempControl.tsx`
29. `Watch.tsx` - 内部红点 (`--widget-primary`) 保留
30. `Weather.tsx`
31. `Wedget.tsx`

以及 CSS:

- `react/src/styles/widgets.css`

## 详细改动方案

### 1. CSS Token 统一 (在 `widgets.css`)

补充 / 确认已有的变量:

```css
/* 图标颜色: 根据主题使用 text color */
.widget-card[data-theme="light"] .widget-card__icon {
  color: var(--widget-dark-bg);
}
.widget-card[data-theme="dark"] .widget-card__icon {
  color: var(--widget-white);
}
.widget-card[data-theme="accent"] .widget-card__icon {
  color: var(--widget-white);
}
.widget-card[data-theme="grey"] .widget-card__icon {
  color: var(--widget-dark-bg);
}

/* SVG 内部 path 继承颜色 */
.widget-card__icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  stroke: currentColor;
}
```

### 2. 每个 .tsx 组件的改动模式

#### 步骤 A: 统一外层 div 主题 class

原来:
```tsx
<div className="widget-card widget-card--152 widget-card--pill widget-card--light ...">
```

确保:
- 使用 `data-theme={dataAttr(theme)}` 属性 (已有)
- 使用 `widget-card--{主题}` class 控制背景色

#### 步骤 B: 把 SVG 内部的 `style={{ fill: "color(display-p3 ...)" }}` 删掉,改用 CSS 变量作为 `fill` 属性

原模式:
```tsx
<path fill="var(--fill-0, var(--widget-dark-bg))" 
      style={{ fill: "color(display-p3 0.1020 0.1137 0.1098)", fillOpacity: "1" }} />
```

统一为:
```tsx
<path fill="var(--widget-dark-bg)" fillOpacity="1" />
```

对于**红色系**的元素 (recording dot, watch red hand, overlimit chevron 等),保留:
```tsx
<circle fill="var(--widget-primary)" fillOpacity="1" />
```

#### 步骤 C: 把 SVG 容器 div 从手写的定位类统一为 `widget-card__icon`

原:
```tsx
<div className="widget-col-1 ml-[71px] mt-[9px] widget-relative widget-row-1 widget-card__svg--24">
  <svg className="nothing-widget-icon-svg" ...>
```

保留原定位,添加统一的 `widget-card__icon` class:
```tsx
<div className="widget-card__icon widget-col-1 ml-[71px] mt-[9px] widget-relative widget-row-1 widget-card__svg--24">
```

这样后续可以通过 `.widget-card__icon svg { fill: currentColor }` 统一驱动。

### 3. 红色系保留清单 (不改动)

- 任何使用 `var(--widget-primary)` (即 `#D71921` / `color(display-p3 0.8431 0.0980 0.1294)`) 的 SVG 元素
- `widget-card--accent` 外层主题 class (本身就是红色背景)
- `--widget-primary-dark` (#881532) - OverLimit 的红色 chevron

### 4. 受保护的组件 (整体红色为主 - 不改动内部 SVG)

- `Recording.tsx` - 整体红色,图标全为白色/红色 → 保持不变或仅把白色改为 `var(--widget-white)`
- `MicAccess.tsx` - 整体红色背景 → 同上
- `LocationAccess.tsx` - 默认红色主题 → 同上
- `OverLimit.tsx` - 默认红色主题 → 同上

这些组件**只做变量化的替换** (把硬编码 display-p3 红色换成 `var(--widget-primary)`),不改变视觉结果。

## 验证

1. `npm run dev` 启动后,打开 widgets 展示页:
   - 切换 data-theme (dark/light): 背景和 SVG 颜色正确变化
   - Recording/MicAccess 保持红色
   - 组件尺寸、位置不变
2. `npm run build` / `npm run typecheck` 通过

## 实施顺序

1. 先在 `widgets.css` 中补充 `.widget-card__icon` 样式
2. 逐个组件处理: 先处理 **非红色主题** 组件 (Active, Weather, Campus, ActivityTracker 等)
3. 最后处理 **红色主题** 组件 (Recording, MicAccess, LocationAccess, OverLimit),仅做变量化
4. 验证 & 修复
