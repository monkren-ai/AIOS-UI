# 导航栏新增「组件汇总」页签 — 实施计划

## 1. 探索总结 (Phase 1: Explore)

### 1.1 现状
- 文档站基于 **dumi 2.4** ([package.json:72](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/package.json#L72))
- 导航配置位于 [.dumirc.ts:32-35](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts#L32-L35),当前仅 2 个页签:
  ```ts
  nav: [
    { link: '/components/button', title: 'Components' },
    { link: '/changelog', title: 'Changelog' },
  ],
  ```
- `Navbar` 槽位由 dumi 内置实现，以 `Tabs` 形式直接渲染 `nav` 数组
- dumi 路由来源:
  - `docs/index.md` → `/`(首页 Hero)
  - `src/<Component>/index.md` → `/components/<component>`(66 个组件)
  - `<root>/changelog`(由 dumi 内置,展示 `CHANGELOG.md`)
- 每个组件 `index.md` frontmatter 形如:
  ```yaml
  ---
  nav: Components
  group:
    title: Data Display
    order: 1
  title: Card
  description: Nothing 风格卡片...
  ---
  ```
  → `nav: Components` 决定该页参与 sidebar 归组,`group.title` 决定组名,`title`/`description` 决定标题与描述。
- 已导出的设计系统组件: 见 [src/index.ts:49-302](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/index.ts#L49-L302)(66 个)
- 现有 CSS Token 系统位于 `src/styles/tokens.css`(设计令牌已完备,新建组件必须使用 `var(--token)` 而非硬编码)
- 现有 demo 风格参考: `src/Button/demos/index.tsx`、`src/Card/demos/index.tsx`

### 1.2 不存在的内容
- 没有现成的「组件汇总」/「Showcase」/「Overview」页面
- 没有 dumi 自带的「全部组件」索引(只能逐个点击 sidebar)
- `COMPONENTS.md` 在项目根,但内容陈旧(指向旧的 `src/components/Buttons.tsx` 等),且不参与 dumi 路由

### 1.3 用户决策
1. 内容来源:**使用 React 组件渲染**(非 `COMPONENTS.md`、非纯 dumi md)
2. 页签位置:**在 Components 右侧、Changelog 之前**

---

## 2. 设计原则

1. **沿用 dumi 约定** — 新页面作为 dumi 路由,使用 `<code src="...">` 注入 React 组件,保持与现有 66 个组件页一致
2. **设计令牌** — 严格使用 `var(--text-primary)`, `var(--text-secondary)`, `var(--surface)`, `var(--border)`, `var(--radius-*)`, `var(--space-*)` 等 token,禁止硬编码颜色/间距
3. **零破坏** — 不修改任何现有组件的 props/API;只新增 1 个页面组件 + 1 个 markdown 入口
4. **WCAG** — 卡片可键盘聚焦(`tabIndex=0` + `Enter` 跳转),`prefers-reduced-motion` 关闭悬停动画
5. **复用已有 primitives** — 卡片用现有 `Card` 组件(`@/Card`),分组标题/排版复用 typography token

---

## 3. 实施步骤

### Step 1 — 新建 `src/showcase/AllComponentsShowcase.tsx`

**路径**: [src/showcase/AllComponentsShowcase.tsx](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/AllComponentsShowcase.tsx) (新建)

**职责**:
- 内部维护一个静态数组 `componentGroups: Array<{ group: string; items: Array<{ title: string; description: string; href: string }> }>`,数据从各组件的 `index.md` frontmatter 抽取(分组按 `group.title`,名称按现有 sidebar 顺序)
- 渲染一个响应式 grid 容器,每个组件一张小卡片
- 卡片结构:
  ```tsx
  <a href={item.href} className="showcase-card" tabIndex={0}>
    <h4 className="showcase-card__title">{item.title}</h4>
    <p className="showcase-card__desc">{item.description}</p>
  </a>
  ```
- 顶部:hero 文案 + 组件总数统计(从数组 `length` 读取,不硬编码)
- 每组上方:组名小标题(用 `--text-tertiary`,`text-transform: uppercase; letter-spacing`)
- 整页 `data-showcase-page` 属性,方便 CSS scope

**关键代码骨架**:
```tsx
import * as React from 'react'
import { Card } from '@/Card'
import { componentGroups } from './data'
import './showcase.css'

export default function AllComponentsShowcase() {
  const total = componentGroups.reduce((sum, g) => sum + g.items.length, 0)
  return (
    <div className="showcase" data-showcase-page>
      <header className="showcase__header">
        <h1>All Components</h1>
        <p>{total} components · click any card to open its docs</p>
      </header>
      {componentGroups.map((g) => (
        <section className="showcase__group" key={g.group}>
          <h2 className="showcase__group-title">{g.group}</h2>
          <div className="showcase__grid">
            {g.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="showcase-card"
                tabIndex={0}
              >
                <h3 className="showcase-card__title">{item.title}</h3>
                <p className="showcase-card__desc">{item.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
```

### Step 2 — 新建 `src/showcase/data.ts`

**路径**: [src/showcase/data.ts](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/data.ts) (新建)

**职责**:
- 静态 `componentGroups` 数组,数据**与每个组件的 `index.md` frontmatter 保持一致**
- 入口 `href` 形式:`/components/<kebab-name>`(全部小写)
- 分组参照 `Card/index.md` 等的 `group.title`(如 `General`, `Data Display`, `Feedback`, `Navigation`, `Menus & Selection`, `Layout`, `Clock & Calendar`, `System & Monitor`, `Widgets`)
- 来源:**手动维护**,首次建立后 1:1 镜像 `src/<Component>/index.md` 的 frontmatter

**结构示例**:
```ts
export interface ShowcaseItem {
  title: string
  description: string
  href: string
}
export interface ShowcaseGroup {
  group: string
  items: ShowcaseItem[]
}
export const componentGroups: ShowcaseGroup[] = [
  {
    group: 'General',
    items: [
      { title: 'Accordion', description: '手风琴展开/折叠', href: '/components/accordion' },
      { title: 'Avatar', description: '头像', href: '/components/avatar' },
      // ...
    ],
  },
  // ... 其他组
]
```

### Step 3 — 新建 `src/showcase/showcase.css`

**路径**: [src/showcase/showcase.css](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/showcase.css) (新建)

**关键样式**(全部用 token):
```css
.showcase {
  padding: var(--space-8, 32px) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-8, 32px);
}
.showcase__header h1 {
  font-family: var(--font-display);
  font-size: var(--text-3xl, 32px);
  color: var(--text-primary);
}
.showcase__header p {
  color: var(--text-secondary);
}
.showcase__group-title {
  font-size: var(--text-xs, 12px);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-3, 12px);
}
.showcase__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-3, 12px);
}
.showcase-card {
  display: block;
  padding: var(--space-4, 16px);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md, 8px);
  text-decoration: none;
  color: inherit;
  transition: border-color 160ms, background 160ms;
}
.showcase-card:hover,
.showcase-card:focus-visible {
  border-color: var(--accent, #ff0000);
  outline: none;
}
.showcase-card__title {
  font-size: var(--text-sm, 14px);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1, 4px);
}
.showcase-card__desc {
  font-size: var(--text-xs, 12px);
  color: var(--text-secondary);
  line-height: 1.5;
}
@media (prefers-reduced-motion: reduce) {
  .showcase-card { transition: none; }
}
```

### Step 4 — 新建 `docs/showcase.md`

**路径**: [docs/showcase.md](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/docs/showcase.md) (新建)

**内容**:
```markdown
---
title: Showcase
---

# All Components

聚合展示全部组件,点击卡片进入对应文档。

<code src="../src/showcase/AllComponentsShowcase.tsx" inline></code>
```

**关键点**:
- `inline` 让代码块作为 inline React 组件渲染(不显示源码),与现有 demo 一致([Button/index.md:21](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/Button/index.md#L21))
- 文件名 `showcase.md` → dumi 路由 `/showcase`(因 `docs/` 是顶级路由来源)

### Step 5 — 修改 `.dumirc.ts` 的 `nav`

**文件**: [`.dumirc.ts:32-35`](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts#L32-L35)

**修改为**:
```ts
nav: [
  { link: '/components/button', title: 'Components' },
  { link: '/showcase', title: 'Showcase' },   // ← 新增
  { link: '/changelog', title: 'Changelog' },
],
```

### Step 6 —(可选)更新 `package.json` 暂不需修改
不需新增依赖,所有用到的 `Card`、token 已在项目内。

---

## 4. 文件变更清单

### 新建(4)
1. `src/showcase/data.ts`
2. `src/showcase/AllComponentsShowcase.tsx`
3. `src/showcase/showcase.css`
4. `docs/showcase.md`

### 修改(1)
1. `.dumirc.ts`(`nav` 数组插入新项)

---

## 5. 验证步骤

```bash
cd /Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react
npm run type-check            # 0 errors
npm run lint                  # 0 warnings
npm run docs:dev              # localhost:8000 启动
```

**手工验证清单**:
1. 打开 `http://localhost:8000`,顶部 navbar 出现 3 个页签,顺序为: `Components` · `Showcase` · `Changelog`
2. 当前页 `/`(Hero) 时 `Components` 仍为高亮(因 `Components` 仍指向 `/components/button`,新页签独立高亮)
3. 点击 `Showcase` → 跳转到 `/showcase`,页面渲染网格化的组件卡片列表
4. 卡片按 `General` / `Data Display` / `Feedback` / `Navigation` / `Menus & Selection` / `Layout` / `Clock & Calendar` / `System & Monitor` / `Widgets` 等组别分组
5. 点击任一卡片 → 跳转到对应组件的 `/components/<name>` 文档
6. `Tab` 键可聚焦到卡片,`Enter` 触发跳转
7. 暗/亮主题切换正常(所有样式用 token)
8. `prefers-reduced-motion: reduce` 时悬停动画关闭
9. 浏览器控制台 0 error / 0 warning

---

## 6. 风险与决策

| 风险 | 对策 |
|------|------|
| `data.ts` 与各组件 `index.md` 描述不同步 | 在 showcase 组件顶部加 `// Keep in sync with src/<Name>/index.md` 注释;后续新增组件时同步 |
| dumi 路由未识别 `docs/showcase.md` | dumi 2.x 默认扫描 `docs/` 与 `src/`,无需额外配置;若未识别则手动在 `.dumirc.ts` 加 `resolve.atomDirs` |
| 66 个组件描述过长导致卡片拥挤 | `data.ts` 中 `description` 截取前 30 字(中文)/ 前 60 字(英文),用 ellipsis 处理 |
| 暗主题下 token `var(--text-tertiary)` 缺失 | 已在 `tokens.css` 确认,缺失则沿用 `var(--text-secondary)` |
| `<code src="..." inline>` 在某些 dumi 版本不识别 | dumi 2.4.34 已支持;否则回退为 `<code src="..." />` 并把组件内容包在 `default export` 即可 |

---

## 7. 不在范围内 (Out of Scope)

- 不替换/合并现有 sidebar
- 不修改 `Navbar` 槽位实现(仅在配置层加 `nav` 项)
- 不引入新的 UI 库或图标包
- 不做组件搜索/筛选(后续需求)
- 不调整 `Components` 页签指向(`/components/button` 保留)
- 不修改 `CHANGELOG.md`

---

## 8. 假设 (Assumptions)

- 用户期望的 URL 路径为 `/showcase`(与 ant-design/shadcn 文档惯例一致);若要改 `/all` / `/components-overview` / `/overview`,可一步替换 `.dumirc.ts` 中 `link` 与 `docs/` 下的文件名
- 用户期望的页签标题为 `Showcase`(同理可改 `Overview` / `All Components` / `组件汇总`)
- 用户期望 `data.ts` 中组件描述保持与 `index.md` 描述一致(摘要),不展示完整 demo
- 用户的 dumi 2.4.34 已支持 `<code src inline>` 语法(本项目使用 `2.4.34`,支持)
