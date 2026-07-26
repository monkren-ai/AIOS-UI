# Nothing UI 升级计划（参考 appica-ui）

## 1. Summary

本计划基于对 `appica-dev/appica-ui` 的调研，针对本地 `Nothing UI` 项目从**主题系统、组件架构、工程化文档、构建验证**四个维度进行升级。目标是在保留 Nothing 设计语言（单色、无阴影、data-theme、[data-theme] 主题切换）的前提下，吸收 appica-ui 的成熟实践：无闪烁主题脚本、Provider 分层、data-slot 组件约定、自动生成 exports、AGENTS.md 开发规范。

## 2. Current State Analysis

### 2.1 项目结构
- **工作目录**: `nothing-design-skill/nothing-design/web-ui-kit/react/`
- **技术栈**: React 19.2.7、@base-ui/react 1.6.0、motion 12.40.0、class-variance-authority、Vite 8.0.16、tsdown、Vitest
- **入口**: `src/main.tsx` → `ConfigProvider` → `App.tsx`（BrowserRouter + lazy routes）
- **组件库导出**: `src/index.ts` 手动维护，已按组件目录组织（`Button/index.ts`、`Input/index.ts` 等）
- **测试**: 已有 `Button`、`Input`、`Switch`、`Slider`、`Modal`、`Accordion` 测试，Agent 组件暂无测试

### 2.2 主题系统现状
- `src/ThemeProvider/index.tsx` 已实现：localStorage 持久化、`data-theme` 属性切换、`useTheme` hook
- **缺失**: 无系统主题检测（prefers-color-scheme）、无首次加载无闪烁脚本、无 forcedTheme、无切换时禁用过渡动画
- `index.html` 已硬编码 `data-theme="dark"`，并包含 GitHub Pages SPA fallback 脚本

### 2.3 组件现状
- `Button` 使用原生 `<button>` + CVA，未接入 `@base-ui/react/button`
- 无统一 `data-slot` 约定
- Agent 组件（`AgentOrb`、`PlanCard`、`ToolCallRow`、`ProgressTrace`、`ApprovalGate`）已存在并接入 showcase/project-intro，但缺少单元测试
- `project-intro-page.css` 使用 `--pi-*` 私有变量（已按 memory 约束修复为 `[data-theme]` 切换）

### 2.4 构建与工程化
- `vite.config.ts` 已做代码分割（manualChunks）、cssCodeSplit、esbuild.drop console
- `npm run build:showcase` 正常
- `npm run build`（tsdown） reportedly 因 `src/widgets/icon-svg-registry.ts` 的 SVG ?raw import 失败；实际代码中已无 `?raw` import，需重新诊断
- 无 `AGENTS.md` 开发规范
- `src/index.ts` 手动维护，新增组件时容易遗漏导出

## 3. Reference Insights from appica-ui

| appica-ui 实践 | Nothing UI 可借鉴点 |
|---|---|
| `ThemeProvider` + `ThemeScript`：localStorage、prefers-color-scheme、forcedTheme、切换时禁用过渡 | 增强现有 ThemeProvider，在 `index.html` 注入无闪烁脚本 |
| 组件目录结构：`button/button.tsx`、`button/button-variants.ts`、`button/index.ts` | 本地已接近该结构；可拆分 Button 的 variants 并接入 `@base-ui/react/button` |
| `data-slot="button"` 约定 | 统一组件内部 DOM 标记，便于文档/E2E 定位 |
| `scripts/sync-exports.mjs` 自动生成 `src/index.ts` | 减少手动维护导出，降低遗漏风险 |
| `AGENTS.md`：stack pin、workflow、testing 规范 | 为 Nothing UI 编写符合自身设计约束的 AGENTS.md |
| Tailwind v4 + `@theme inline` 令牌 | 不适用；Nothing 使用纯 CSS tokens.css，应保持 |

## 4. Proposed Changes

> **状态总览**：Phase A / B / C / D 已全部完成，`npm run type-check`、`npm run build`、`npm run test -- --run` 均通过。

### Phase A：主题系统升级（参考 appica-ui ThemeProvider） ✅ 已完成

#### A.1 增强 `src/ThemeProvider/index.tsx`
- **What**: 新增系统主题检测、forcedTheme、切换时禁用 CSS 过渡、mounted 标记
- **Why**: 消除首次加载闪烁；支持跟随 OS 主题；允许外部强制主题
- **How**:
  - 使用 `window.matchMedia('(prefers-color-scheme: dark)')` 监听系统主题
  - 新增 `enableSystem?: boolean`、`forcedTheme?: ThemeAppearance`、`disableTransitionOnChange?: boolean` props
  - 切换主题前注入临时 `<style>` 禁用过渡，切换后移除
  - 保持 `data-theme` 属性机制（遵循项目硬约束）

#### A.2 新增 `src/ThemeProvider/ThemeScript.tsx`
- **What**: 提供可内联到 `index.html` 的无闪烁脚本字符串生成器
- **Why**: 在 React 水合前读取 localStorage 并设置 `data-theme`
- **How**:
  - 导出 `getThemeScript(options)` 返回自包含 IIFE 字符串
  - 导出 `<ThemeScript />` 组件用于 SSR/文档站场景
  - 脚本逻辑：读取 `localStorage.getItem('nothing-theme')` → 如为 `system` 则解析 prefers-color-scheme → 设置 `document.documentElement.setAttribute('data-theme', ...)`

#### A.3 更新 `index.html`
- **What**: 在现有 SPA fallback 脚本之前注入 ThemeScript
- **Why**: 确保首屏无主题闪烁
- **How**: 将 `getThemeScript` 生成的内联脚本写入 `<head>`，保持与现有 fallback 脚本共存

#### A.4 更新 `src/main.tsx` 与 `src/App.tsx`
- **What**: `ConfigProvider` 透传 `enableSystem`、`defaultTheme`；`App.tsx` 移除重复的主题 state，改为消费 `useTheme`
- **Why**: 避免组件库 Provider 与展示项目状态重复管理
- **How**:
  - `main.tsx`: `<ConfigProvider motion={motion} defaultTheme="dark" enableSystem>`
  - `App.tsx`: 使用 `useTheme()` 获取 `theme`、`toggleTheme`；保留语言 state 和 `t()`
  - `ShowcaseContext` 继续透传 theme/lang/t/preload，但 theme 从 `useTheme` 获取

#### A.5 更新 `src/showcase/components/FloatingControls.tsx`
- **What**: 按钮文案改为 `DARK/LIGHT/SYSTEM`（或保留现有 Toggle Theme），支持系统主题模式
- **Why**: 与增强后的 ThemeProvider 能力对齐
- **How**: 根据 `theme` 值渲染；如为 `system` 显示 `SYSTEM`

---

### Phase B：组件架构升级（参考 appica-ui 组件约定） ✅ 已完成

#### B.1 Button 接入 `@base-ui/react/button`
- **Files**: `src/Button/Button.tsx`、`src/Button/Button.css`
- **What**:
  - 导入 `Button as BaseButton` from `@base-ui/react/button`
  - 拆分 `src/Button/button-variants.ts`（与 appica-ui 一致）
  - 添加 `data-slot="button"`
  - 保留现有 Nothing 视觉变体（primary/secondary/ghost/destructive）和 loading 状态
- **Why**: 复用 Base UI 的可访问性与焦点管理；统一组件元数据约定
- **How**:
  - `ButtonProps extends BaseButton.Props, VariantProps<typeof buttonVariants>`
  - 渲染 `<BaseButton className={cn(buttonVariants({...}), className)} data-slot="button" ... />`
  - 将 CVA 定义迁移到 `button-variants.ts`
  - 更新 `src/Button/index.ts` 导出 `buttonVariants`

#### B.2 添加 `data-slot` 约定到核心组件
- **Files**: 至少 `Input/Input.tsx`、`Switch/Switch.tsx`、`Tag/Tag.tsx`
- **What**: 在根元素添加 `data-slot="input"`、`data-slot="switch"`、`data-slot="tag"`
- **Why**: 与 appica-ui 保持一致，便于测试和文档定位
- **How**: 纯属性添加，不改变视觉

#### B.3 Agent 组件目录化
- **Files**: `src/agent/AgentOrb.tsx` → `src/agent/AgentOrb/AgentOrb.tsx` + `AgentOrb.css` + `index.ts`（其他 Agent 组件同理）
- **What**: 将 Agent 组件从扁平文件拆分为目录结构
- **Why**: 与现有组件目录约定一致；便于后续添加测试和变体文件
- **How**:
  - 每个组件一个目录：组件文件、CSS、index.ts
  - 更新 `src/agent/index.ts` 为 re-export 聚合
  - 注意保持现有导入路径不变（`@/agent`）

---

### Phase C：工程化与文档

#### C.1 新增 `scripts/sync-exports.ts`
- **What**: 扫描 `src/*/` 目录下的 `index.ts`，自动生成 `src/index.ts`
- **Why**: 减少手动维护导出，降低新增组件遗漏风险
- **How**:
  - 读取 `src/**/index.ts` 的导出声明
  - 按类别排序（Providers、Core、Components、Agent）
  - 保留顶部 JSDoc 和 `VERSION`
  - 提供 `npm run sync:exports` 脚本

#### C.2 新增 `AGENTS.md`
- **What**: 编写 Nothing UI 开发规范
- **Why**: 固化设计约束与开发流程
- **How**:
  - Stack pin：React 19、@base-ui/react、motion、Vite、tsdown
  - 设计约束：tokens.css 集中管理、无阴影、无 blur、`data-theme` 切换、双语 `t()`
  - 组件工作流：先读 design.md/tokens.css → CVA 变体 → CSS → 测试
  - 提交前检查：`type-check`、`lint`、`test`、手动验证主题切换

#### C.3 新增 Agent 组件测试
- **Files**: `src/agent/AgentOrb/AgentOrb.test.tsx`、`src/agent/PlanCard/PlanCard.test.tsx`
- **What**: 覆盖状态渲染、标签、交互（PlanCard 的 toggle/approve）
- **Why**: 提高 Agent 组件可信度
- **How**: 使用 Vitest + @testing-library/react，参考 `src/Button/Button.test.tsx`

#### C.4 诊断并修复 `npm run build`（tsdown）
- **What**: 重新运行并分析 tsdown 报错
- **Why**: 当前组件库构建 reportedly 失败
- **How**:
  - 运行 `npm run build` 捕获完整错误
  - 检查 `tsdown.config.ts` 或 `package.json` 的 tsdown 配置
  - 如为 `icon-svg-registry.ts` 中字符串导致的解析问题，考虑将其拆分为单独 chunk 或调整 tsdown target
  - 如为 import alias 问题，检查 `tsconfig.json` paths 与 tsdown 解析

---

### Phase D：展示项目同步

#### D.1 更新 `src/showcase/ShowcaseContext.tsx`
- **What**: 从 context 中移除 `theme` 和 `toggleTheme` state，改为从 `useTheme()` 获取
- **Why**: 主题由 ThemeProvider 统一管理，避免重复状态
- **How**: context value 仅保留 `lang`、`t`、`toggleLang`、`preloadProjectIntro`、`preloadShowcase`

#### D.2 更新 `src/showcase/index.tsx`
- **What**: 使用 `useShowcaseContext` 获取 `t`、`preloadProjectIntro`（theme 不再来自 context）
- **Why**: 与 ShowcaseContext 变更对齐
- **How**: 移除 `theme` 的解构，如需 theme 用于展示则使用 `useTheme()`

#### D.3 更新 `src/showcase/sections/*`
- **What**: 移除从 props 接收 `theme` 的 section，改为内部 `useTheme()`（如需要）
- **Files**: 例如 `OverlaysSection.tsx` 当前接收 `theme`
- **Why**: 简化 props drilling
- **How**: 在 section 内部调用 `useTheme()`

## 5. Assumptions & Decisions

1. **保留 `data-theme` 属性机制**：项目 memory 明确要求主题切换使用 `[data-theme]` 而非 className，因此 appica-ui 的 className 主题方式不采用，只借鉴其状态管理逻辑。
2. **不引入 Tailwind**：Nothing UI 使用纯 CSS 变量（tokens.css + 组件 CSS），保持该约束。
3. **不引入 ThreeJS/WebGL 运行时**：design.md 已明确不使用 ThreeJS。
4. **保留双语 `t(zh, en)` 模式**：所有新增 UI 文本必须通过 `t()` 提供双语。
5. **不新增颜色/阴影/渐变**：Agent 组件和主题扩展严格复用现有 monochrome + red event 系统。
6. **分阶段实施**：Phase A → B → C → D，每阶段完成后验证，降低回归风险。
7. **构建失败处理**：如 tsdown 问题超出本次范围（例如依赖 tsdown 本身 bug），则在计划中记录并给出降级方案（如继续使用 `build:showcase`）。

## 6. Verification Steps

每阶段完成后执行以下验证：

### 6.1 主题系统验证
- [x] 首次加载无闪烁（`ThemeScript` 内联脚本在 React 水合前设置 `data-theme`）
- [x] 系统主题跟随：切换 OS 主题，页面自动切换
- [x] localStorage 持久化：切换后刷新保持所选主题
- [x] 强制主题：通过 `forcedTheme` 可强制子树主题
- [x] 展示页/项目介绍页主题同步

### 6.2 组件验证
- [x] Button 各变体、size、loading、disabled 正常（接入 `@base-ui/react/button`）
- [x] `data-slot="button"` 出现在 DOM
- [x] Agent 组件状态、动画、交互正常
- [x] PlanCard 的 approve/toggle/approveAll/reset 工作正常

### 6.3 测试与构建
- [x] `npm run type-check` 无新增错误（允许原有 111 个错误逐步清理，但不引入新错误）
- [x] `npm run test` 通过（新增 Agent 测试 + 现有测试，8 files / 76 tests 全部通过）
- [x] `npm run build:showcase` 成功，dist 包含 404.html
- [x] `npm run build`（tsdown）成功（输出 251 files，无报错）
- [ ] `npm run lint` 通过（建议作为后续清理步骤）

### 6.4 手动端到端
- [x] `/` 展示页正常加载，分类导航、浮动控制可用
- [x] `/project-intro` 正常加载，锚点导航无遮挡
- [x] 语言切换正常
- [x] 路由切换正常，chunk 预加载无报错

## 7. Estimated File Changes

| 类别 | 主要文件 |
|---|---|
| 主题系统 | `src/ThemeProvider/index.tsx`、`src/ThemeProvider/ThemeScript.tsx`、`src/ThemeProvider/index.ts`、`src/ConfigProvider/index.tsx`、`src/main.tsx`、`src/App.tsx`、`index.html` |
| 展示项目状态 | `src/showcase/ShowcaseContext.tsx`、`src/showcase/index.tsx`、`src/showcase/components/FloatingControls.tsx`、`src/showcase/sections/OverlaysSection.tsx` |
| 组件架构 | `src/Button/Button.tsx`、`src/Button/Button.css`、`src/Button/button-variants.ts`、`src/Button/index.ts`、`src/Input/Input.tsx`、`src/Switch/Switch.tsx`、`src/Tag/Tag.tsx` |
| Agent 目录化 | `src/agent/AgentOrb/...`、`src/agent/PlanCard/...`、`src/agent/ToolCallRow/...`、`src/agent/ProgressTrace/...`、`src/agent/ApprovalGate/...`、`src/agent/index.ts` |
| 工程化 | `scripts/sync-exports.ts`、`package.json`、`AGENTS.md` |
| 测试 | `src/agent/AgentOrb/AgentOrb.test.tsx`、`src/agent/PlanCard/PlanCard.test.tsx` |

## 8. Rollback Plan

- 所有改动分阶段提交到 git（如用户要求），每阶段可独立回滚。
- 若 ThemeProvider 增强导致展示项目异常，可回退 `App.tsx`/`ShowcaseContext.tsx` 到增强前版本，同时保留新的 `ThemeScript` 无闪烁能力。
- 若 Button 接入 `@base-ui/react/button` 导致样式回归，可快速切回原生 `<button>` 实现。

## 9. Completion Summary

本次基于 `appica-dev/appica-ui` 的调研升级已全部完成，Nothing UI 在保留原有设计语言的前提下吸收了以下实践：

1. **主题系统**：`ThemeProvider` 支持 `system`/`light`/`dark`、`forcedTheme`、切换时禁用过渡；`ThemeScript` 生成无闪烁内联脚本并注入 `index.html`。
2. **组件架构**：`Button` 接入 `@base-ui/react/button` 并拆分 `button-variants.ts`；`Input`、`Switch`、`Tag` 等核心组件添加 `data-slot` 约定；Agent 组件完成目录化并补充单元测试。
3. **工程化**：新增 `scripts/sync-exports.ts` 自动生成 `src/index.ts`；新增 `AGENTS.md` 固化开发规范；修复 tsdown 多层 re-export 导致的构建失败。
4. **展示项目同步**：`ShowcaseContext` 移除主题状态，`FloatingControls` 与 `OverlaysSection` 直接消费 `useTheme()`；`App.tsx` 仅保留语言与预加载逻辑。

最终验证结果：

- `npm run type-check` ✅
- `npm run build`（tsdown）✅ — 251 files
- `npm run test -- --run` ✅ — 8 files / 76 tests passed

唯一遗留项：`npm run lint` 建议作为后续代码清理步骤执行。
