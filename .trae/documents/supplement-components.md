# 补充更多组件 - 实施计划

## 问题分析

当前 web-ui-kit 仅实现了 6 个"小部件"类组件（Clock、Battery、Calendar、SystemMonitor、MusicPlayer、PhotoCarousel），但 `references/components.md` 定义了 15 类基础 UI 组件，大部分核心交互组件缺失。

### 现有组件（6个）
- Clock ✅
- Battery ✅
- Calendar ✅
- SystemMonitor ✅
- MusicPlayer ✅
- PhotoCarousel ✅

### 缺失组件（按 components.md 规范）

**核心交互组件（高优先级）：**
1. **Buttons** — Primary / Secondary / Ghost / Destructive 四种变体
2. **Inputs** — 下划线风格输入框，带标签和验证状态
3. **Toggles / Switches** — 开关切换控件
4. **Tags / Chips** — 标签/芯片
5. **Segmented Control** — 分段控制器
6. **Navigation** — 导航栏（桌面水平文字栏 + 移动端底部栏）

**数据展示组件（中优先级）：**
7. **Cards / Surfaces** — 卡片/表面（当前 index.html 仅有简单 card，无独立组件）
8. **Lists / Data Rows** — 列表/数据行
9. **Tables / Data Grids** — 表格/数据网格
10. **Segmented Progress Bars** — 独立的分段进度条组件（当前仅在 Battery/Monitor 中内嵌）

**覆盖层组件（中优先级）：**
11. **Modal** — 模态对话框
12. **Dropdown** — 下拉选择
13. **Bottom Sheet** — 底部抽屉

**辅助组件（低优先级）：**
14. **Date / Period Navigation** — 日期/周期导航 `< LABEL >`
15. **State Patterns** — Loading / Error / Empty / Disabled 状态组件

---

## 实施步骤

### Step 1: 创建 Buttons 组件
- Vanilla JS: `css/buttons.css` + `js/buttons.js`
- React: `components/Buttons.tsx`
- 四种变体：Primary（pill 白底黑字）、Secondary（透明+边框）、Ghost（纯文字）、Destructive（红边红字）
- Space Mono, 13px, ALL CAPS, letter-spacing 0.06em, padding 12px 24px, min-height 44px

### Step 2: 创建 Inputs 组件
- Vanilla JS: `css/inputs.css` + `js/inputs.js`
- React: `components/Inputs.tsx`
- 下划线风格（`1px solid --border-visible` 底部）或全边框 8px radius
- 标签上方：Space Mono, ALL CAPS, `--text-secondary`
- Focus: border → `--text-primary`；Error: border → `--accent`

### Step 3: 创建 Toggles / Switches 组件
- Vanilla JS: `css/toggles.css` + `js/toggles.js`
- React: `components/Toggles.tsx`
- Pill track + circle thumb；Off: `--border-visible` track + `--text-disabled` thumb；On: `--text-display` track + `--black` thumb

### Step 4: 创建 Tags / Chips 组件
- Vanilla JS: `css/tags.css` + `js/tags.js`
- React: `components/Tags.tsx`
- Border: `1px solid --border-visible`，无填充；Space Mono, `--caption`, ALL CAPS
- Radius: 999px (pill) 或 4px (technical)

### Step 5: 创建 Segmented Control 组件
- Vanilla JS: `css/segmented-control.css` + `js/segmented-control.js`
- React: `components/SegmentedControl.tsx`
- Container: `1px solid --border-visible`，pill 或 8px rounded
- Active: `--text-display` bg + `--black` text；Inactive: transparent + `--text-secondary`

### Step 6: 创建 Navigation 组件
- Vanilla JS: `css/navigation.css` + `js/navigation.js`
- React: `components/Navigation.tsx`
- 桌面：水平文字栏；移动：底部栏
- Bracket `[ HOME ]  GALLERY  INFO` 或 pipe `HOME | GALLERY | INFO`
- Back button: 圆形 40-44px, `--surface` bg, thin chevron

### Step 7: 创建 Cards 组件
- Vanilla JS: `css/cards.css` + `js/cards.js`
- React: `components/Cards.tsx`
- `--surface` 或 `--surface-raised` bg
- Border: `1px solid --border` 或无；Radius: 12-16px cards, 8px compact, 4px technical
- Padding: 16-24px，无阴影

### Step 8: 创建 Lists / Data Rows 组件
- Vanilla JS: `css/data-rows.css` + `js/data-rows.js`
- React: `components/DataRows.tsx`
- Dividers: `1px solid --border`，全宽；Row padding: 12-16px vertical
- Left: label (Space Mono caps, `--text-secondary`)；Right: value (`--text-primary`)
- Stat rows: label left + value right (status color) + unit adjacent

### Step 9: 创建 Tables / Data Grids 组件
- Vanilla JS: `css/data-grid.css` + `js/data-grid.js`
- React: `components/DataGrid.tsx`
- Header: `--label` style + bottom border `--border-visible`
- Cell: Space Mono numeric, Space Grotesk text；Cell padding: 12px 16px
- Active row: `--surface-raised` bg + left `2px solid --accent`

### Step 10: 创建 Segmented Progress Bar 独立组件
- Vanilla JS: `css/progress-bar.css` + `js/progress-bar.js`
- React: `components/ProgressBar.tsx`
- 离散矩形分段 + 2px 间隙
- 三种尺寸：Hero 16-20px, Standard 8-12px, Compact 4-6px
- 状态颜色：Neutral(`--text-display`), Over limit(`--accent`), Good(`--success`), Moderate(`--warning`)

### Step 11: 创建 Modal 组件
- Vanilla JS: `css/modal.css` + `js/modal.js`
- React: `components/Modal.tsx`
- Backdrop: `rgba(0,0,0,0.8)`；Dialog: `--surface` + `1px solid --border-visible` + 16px radius
- Centered max 480px；Close: `[ X ]` top-right ghost button

### Step 12: 创建 Dropdown 组件
- Vanilla JS: `css/dropdown.css` + `js/dropdown.js`
- React: `components/Dropdown.tsx`
- `--surface-raised`, `1px solid --border-visible` 8px radius, 44px items
- Selected: left 2px accent bar；无阴影

### Step 13: 创建 Bottom Sheet 组件
- Vanilla JS: `css/bottom-sheet.css` + `js/bottom-sheet.js`
- React: `components/BottomSheet.tsx`
- `--surface`, 2px handle bar centered, 16px top radius

### Step 14: 创建 Date / Period Navigation 组件
- Vanilla JS: `css/date-nav.css` + `js/date-nav.js`
- React: `components/DateNav.tsx`
- Layout: `< LABEL >` — back arrow + label + forward arrow

### Step 15: 创建 State Patterns 组件
- Vanilla JS: `css/states.css` + `js/states.js`
- React: `components/States.tsx`
- Loading: segmented spinner 或 `[LOADING]` text
- Error: `[ERROR]` prefix inline
- Empty: centered, `--text-secondary` headline + `--text-disabled` description

### Step 16: 更新演示页面
- 更新 `vanilla/index.html`，添加所有新组件的展示区域
- 更新 `react/src/App.tsx`，添加所有新 React 组件

### Step 17: 更新文档
- 更新 `web-ui-kit/README.md`，添加新组件的 API 文档
- 更新 `SKILL.md` 中的 Available Components 列表

---

## 文件结构（新增）

```
web-ui-kit/
├── css/
│   ├── buttons.css          [NEW]
│   ├── inputs.css           [NEW]
│   ├── toggles.css          [NEW]
│   ├── tags.css             [NEW]
│   ├── segmented-control.css [NEW]
│   ├── navigation.css       [NEW]
│   ├── cards.css            [NEW]
│   ├── data-rows.css        [NEW]
│   ├── data-grid.css        [NEW]
│   ├── progress-bar.css     [NEW]
│   ├── modal.css            [NEW]
│   ├── dropdown.css         [NEW]
│   ├── bottom-sheet.css     [NEW]
│   ├── date-nav.css         [NEW]
│   └── states.css           [NEW]
├── js/
│   ├── buttons.js           [NEW]
│   ├── inputs.js            [NEW]
│   ├── toggles.js           [NEW]
│   ├── tags.js              [NEW]
│   ├── segmented-control.js [NEW]
│   ├── navigation.js        [NEW]
│   ├── cards.js             [NEW]
│   ├── data-rows.js         [NEW]
│   ├── data-grid.js         [NEW]
│   ├── progress-bar.js      [NEW]
│   ├── modal.js             [NEW]
│   ├── dropdown.js          [NEW]
│   ├── bottom-sheet.js      [NEW]
│   ├── date-nav.js          [NEW]
│   └── states.js            [NEW]
├── react/src/
│   ├── components/
│   │   ├── Buttons.tsx      [NEW]
│   │   ├── Inputs.tsx       [NEW]
│   │   ├── Toggles.tsx      [NEW]
│   │   ├── Tags.tsx         [NEW]
│   │   ├── SegmentedControl.tsx [NEW]
│   │   ├── Navigation.tsx   [NEW]
│   │   ├── Cards.tsx        [NEW]
│   │   ├── DataRows.tsx     [NEW]
│   │   ├── DataGrid.tsx     [NEW]
│   │   ├── ProgressBar.tsx  [NEW]
│   │   ├── Modal.tsx        [NEW]
│   │   ├── Dropdown.tsx     [NEW]
│   │   ├── BottomSheet.tsx  [NEW]
│   │   ├── DateNav.tsx      [NEW]
│   │   └── States.tsx       [NEW]
│   └── styles/
│       ├── buttons.css      [NEW]
│       ├── inputs.css       [NEW]
│       ├── toggles.css      [NEW]
│       ├── tags.css         [NEW]
│       ├── segmented-control.css [NEW]
│       ├── navigation.css   [NEW]
│       ├── cards.css        [NEW]
│       ├── data-rows.css    [NEW]
│       ├── data-grid.css    [NEW]
│       ├── progress-bar.css [NEW]
│       ├── modal.css        [NEW]
│       ├── dropdown.css     [NEW]
│       ├── bottom-sheet.css [NEW]
│       ├── date-nav.css     [NEW]
│       └── states.css       [NEW]
```
