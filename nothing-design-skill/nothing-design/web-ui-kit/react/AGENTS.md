# AGENTS.md — Nothing UI 开发规范

> 本规范基于对 `appica-dev/appica-ui` 的调研，结合 Nothing 设计语言制定。所有贡献者（包括 AI Agent 与人类开发者）在修改本仓库前必须阅读并遵循。

---

## 1. 项目定位

Nothing UI 是一个基于 **Nothing 设计语言**的 React 组件库：

- 单色工业美学（monochrome industrial）
- 零阴影、零 blur、零渐变
- 所有主题令牌集中在 `tokens.css`
- 主题切换通过 `[data-theme]` 属性实现
- 所有 UI 文本必须提供中英双语

---

## 2. 技术栈（Stack Pin）

| 层级 | 技术 | 说明 |
|---|---|---|
| 框架 | React ^19.2.7 | 使用函数组件 + Hooks |
| 类型 | TypeScript ^6.0.3 | 严格模式 |
| 底层组件 | @base-ui/react ^1.6.0 | 优先复用其可访问性与焦点管理 |
| 动画 | motion（peerDependency） | 通过 `MotionProvider` 注入，库不直接依赖 |
| 样式 | 纯 CSS + CSS Variables | 不使用 Tailwind、Styled-components、CSS-in-JS |
| 变体 | class-variance-authority | CVA 定义集中放在 `*-variants.ts` |
| 构建 | Vite + tsdown | `build:showcase`（Vite）与 `build`（tsdown） |
| 测试 | Vitest + @testing-library/react | 新增组件必须伴随测试 |

---

## 3. 硬约束（Hard Constraints）

### 3.1 设计令牌

- **所有全局令牌必须定义在 `src/styles/tokens.css`**。
- 组件级私有变量必须以组件前缀命名，例如 `--button-*`、`agent-orb-*`。
- 禁止在组件 CSS 中重新定义 `--background-*`、`--text-*`、`--border-*` 等全局令牌。
- 颜色仅使用现有 monochrome 系统 + red event，禁止新增颜色、阴影、blur、渐变。

### 3.2 主题切换

- 必须使用 `[data-theme="dark"]` / `[data-theme="light"]`。
- 禁止使用 `prefers-color-scheme` 媒体查询直接切换样式。
- 如需响应系统主题，通过 `ThemeProvider` 的 `enableSystem` + `data-theme="system"` 实现。

### 3.3 双语内容

- 所有新增 UI 文本必须通过 `t(zh, en)` 提供双语。
- 常量、注释、文档使用中文；代码标识符、类型名保持英文。

### 3.4 组件 DOM 约定

- 每个组件根元素必须添加 `data-slot="<kebab-name>"`，例如 `data-slot="button"`。
- 子元素 slot 命名采用 BEM 风格：`data-slot="button-icon"`、`data-slot="plan-card-step"`。

---

## 4. 目录与文件组织

### 4.1 普通组件

```text
src/Button/
├── Button.tsx           # 组件实现
├── Button.css           # 组件样式
├── button-variants.ts   # CVA 变体（如复杂）
├── Button.test.tsx      # 单元测试
└── index.ts             # 对外导出
```

### 4.2 Agent / AI OS 组件

```text
src/agent/AgentOrb/
├── AgentOrb.tsx
├── AgentOrb.css
├── agentOrbVariants.ts  # 或 agent-orb-variants.ts
├── AgentOrb.test.tsx
└── index.ts
```

### 4.3 Provider

```text
src/ThemeProvider/
├── index.tsx            # Provider + hook
├── ThemeScript.tsx      # SSR/首屏无闪烁脚本
├── index.ts             # 聚合导出
└── ThemeProvider.css    # 如有需要
```

### 4.4 禁止的目录

- 不要在 `src/components`、`src/widgets` 中新增可复用组件。
- 展示项目代码放在 `src/showcase/`，不参与组件库导出。

---

## 5. 组件开发工作流

### 5.1 开发前

1. 阅读 `design.md` 与 `tokens.css`，确认视觉约束。
2. 如使用 @base-ui/react，优先查看其 API 文档与示例。
3. 设计 Props 接口，遵循：**显式优于隐式，受控优先于非受控**。

### 5.2 实现中

1. 在组件目录创建 `*.tsx` 与 `*.css`。
2. 使用 `cn()` 合并 className。
3. 使用 `dataAttr()` 处理布尔属性（如 `data-active`、`data-disabled`）。
4. 添加 `data-slot`。
5. 样式使用 CSS Variables，禁止硬编码色值。

### 5.3 实现后

1. 编写单元测试，覆盖：
   - 渲染与快照（如适用）
   - 变体 className
   - 交互（click、keyboard、focus）
   - 可访问性属性
2. 运行 `npm run sync:exports` 更新 `src/index.ts`。
3. 运行 `npm run type-check`、`npm run test`、`npm run lint`。

---

## 6. 样式规范

### 6.1 CSS 变量命名

| 作用域 | 示例 | 说明 |
|---|---|---|
| 全局 | `--background-primary` | 仅定义于 `tokens.css` |
| 组件公共 | `--button-height` | 定义于组件 CSS 顶层 |
| 组件私有 | `--agent-orb-pulse-duration` | 定义于组件 CSS 顶层 |
| 局部覆盖 | `--plan-card-step-gap` | 必要时在子选择器内重新定义 |

### 6.2 选择器优先级

- 优先使用类选择器，避免 `!important`。
- 状态样式使用 `[data-state]` 或 `[data-active]`，例如：

```css
.agent-orb[data-state='active'] {
  --agent-orb-opacity: 1;
}
```

### 6.3 动画

- 动画时长使用 `tokens.css` 中的 `--duration-*`。
- 优先使用 CSS transitions；复杂动画使用 motion，但需通过 `useMotionComponent` 获取注入的 motion 对象。

---

## 7. 测试规范

### 7.1 每个组件必须

- 渲染基本用例不报错。
- 验证 `data-slot` 存在。
- 验证变体 className 生成正确。
- 验证可访问性属性（如 `aria-*`、`role`）。

### 7.2 交互组件必须

- 模拟用户点击、键盘事件。
- 验证回调函数被正确调用。

### 7.3 示例

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with data-slot', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

---

## 8. 提交前检查清单

- [ ] 新增/修改组件是否通过 `npm run test`？
- [ ] `npm run type-check` 是否无新增错误？
- [ ] `npm run lint` 是否通过？
- [ ] `npm run sync:exports -- --check` 是否通过？
- [ ] 新增 UI 文本是否使用 `t(zh, en)`？
- [ ] 是否新增了全局令牌？（如是，必须迁移到 `tokens.css`）
- [ ] 是否新增了阴影/blur/渐变？（禁止）
- [ ] 手动验证：主题切换、语言切换、路由切换是否正常？

---

## 9. 参考文档

- [design.md](../design.md) — Nothing 设计原则
- [SKILL.md](../../SKILL.md) — Nothing UI Skill 使用指南（含 AI OS 扩展）
- [src/styles/tokens.css](src/styles/tokens.css) — 设计令牌
- [appica-ui](https://github.com/appica-dev/appica-ui) — 参考项目

---

## 10. 更新日志

| 日期 | 版本 | 说明 |
|---|---|---|
| 2026-07-25 | 1.0.0 | 初始版本，基于 appica-ui 调研与 Nothing 设计约束制定 |
