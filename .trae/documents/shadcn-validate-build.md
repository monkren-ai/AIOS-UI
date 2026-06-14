# 验证 shadcn 优化方案：类型检查与构建

## 摘要

继续执行 `.trae/documents/optimize-from-shadcn-research.md` 计划中的**验证阶段（D3）**。前序所有改造已落地（`src/lib/utils.ts`、`src/lib/variants.ts`、`src/lib/index.ts`、`components.json`、6 个组件的 CVA 重构、`SKILL.md`/`tokens.md` 文档更新、`CtlCtx` 类型修复、依赖添加），本计划专注于闭环验证：依赖安装 → 类型检查 → 构建 → 视觉回归。

---

## 当前状态分析（已探索）

### ✅ 已完成（来自前序 plan）

| 阶段 | 状态 | 证据 |
|------|------|------|
| A1 `src/lib/utils.ts` | ✅ 已建 | [utils.ts](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/lib/utils.ts) 存在，含 `cn`/`mergeRefs`/`dataAttr` |
| A2 `class-variance-authority` 依赖 | ✅ 已加 | [package.json](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/package.json) `dependencies` 含 `"class-variance-authority": "^0.7.1"` |
| A3 `pnpm-lock.yaml` | ✅ 已删（前次已确认不存在） | 早前 Glob/LS 验证 |
| A4 `CtlCtx` 类型安全 | ✅ 已修 | [system/hooks.ts](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/system/hooks.ts#L30-L35) `createContext<Ctl \| null>(null)` + 运行时检查 |
| B1-B6 6 组件 CVA 重构 | ✅ 已改 | Button、Card、Badge、Alert、Input、QuickToggle 均使用 `cva()` + `cn()` + `data-*` |
| C1 `src/lib/variants.ts` | ✅ 已建 | `themeVariants`/`sizeVariants`/`stateVariants` |
| C2 `components.json` | ✅ 已建 | 含 shadcn 兼容 schema 别名 |
| C3 `src/lib/index.ts` | ✅ 已建 | 公共 re-export |
| D1 `SKILL.md` 追加 | ✅ 已加 | "Component Architecture Conventions (since 2026)" 章节 |
| D2 `tokens.md` 追加 | ✅ 已加 | "8. PATH ALIASES & UTILITIES (React UI Kit)" 章节 |

### ⚠️ 未完成（本次任务范围）

| 项 | 状态 | 风险 |
|----|------|------|
| **`node_modules` 安装** | 未执行（Glob 确认无 `node_modules` 目录） | 类型检查/构建/运行的前置条件 |
| **`npx tsc --noEmit`** | 未执行 | 验证 CVA 类型推导、`VariantProps<typeof xxxVariants>` 是否正确 |
| **`npm run build`** | 未执行 | 验证 Vite 打包 + CSS 资源正常 |
| **视觉回归** | 未执行 | 验证 6 个重构组件外观无变化（CSS 未改，理论一致） |

---

## 提议的修改

### 阶段 V：验证（无代码修改，纯执行）

#### V1. 安装依赖

```bash
cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
npm install
```

**目的**：拉取 `class-variance-authority`、`clsx`、`react@19` 等所有 deps，让 `tsc`/`vite` 能解析。

**预期结果**：`node_modules/` 创建，`package-lock.json` 不变（因为我们没改 `package.json`）。

#### V2. TypeScript 类型检查

```bash
cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
npx tsc --noEmit
```

**目的**：验证以下类型推断正确：
- `ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>`
- `cn(buttonVariants({ variant, size, fullWidth }), className)` 类型签名匹配
- `dataAttr(variant)` 接受 `string | undefined` 返回 `string | undefined`
- `forwardRef<HTMLButtonElement, ButtonProps>` 类型链路正确
- `noUnusedLocals` / `noUnusedParameters` 不报新警告

**预期结果**：0 错误。若有错误：
- **类型错误** → 修复对应组件的 `cva` 定义或 props 类型
- **未使用变量** → 删除 `_mode` 这类已存在的前缀下划线变量（已正确处理，见 [Card.tsx#L255](file:///c:/Users/monkr/Documents/github/Nothing%20UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/components/Card.tsx#L255)）

#### V3. 生产构建

```bash
cd "c:\Users\monkr\Documents\github\Nothing UI\nothing-design-skill\nothing-design\web-ui-kit\react"
npm run build
```

`package.json` `build` 脚本 = `tsc --noEmit && vite build`，所以会先做 V2 的检查再打包。

**目的**：验证：
- Vite 能正确解析 `cva` 和 `clsx` 的 ESM 输出
- CSS 文件按预期被打包
- bundle 体积未异常增长（重构纯结构改造，预期不变或略减）

**预期结果**：`dist/` 生成，无构建错误。

#### V4. ESLint 验证（可选）

```bash
npm run lint
```

**目的**：确认 CVA 模式无引入新 lint 规则违反。

#### V5. 视觉回归（手动 / 可选）

启动 dev server 后目测 6 个组件的演示：
- Button: primary/secondary/ghost/destructive × sm/default/lg × fullWidth
- Card: content vs widget mode
- Badge: default/secondary/destructive/outline
- Alert: default/destructive
- Input: underline/bordered × error/disabled
- QuickToggle: circle/pill × light/dark/accent × active

**理论保证**：CSS 文件未改，BEM 类名未变（`nothing-btn--primary` 等仍在），CVA 只是把字符串字面量集中管理——视觉零变化。

---

## 假设与决策

1. **`node_modules` 未安装是正常的**：之前的工作只到写文件 + 改 `package.json`，未执行 `npm install`。
2. **不修改代码**：本阶段不涉及代码改动，仅执行验证命令；如发现问题再回到修复分支。
3. **构建顺序锁定**：`npm run build` 内部 = `tsc --noEmit && vite build`，执行 V3 会隐含执行 V2，无需重复。
4. **视觉验证为可选**：CSS 文件零改动，理论上视觉零回归；如时间紧张可跳过 V5。
5. **网络/环境限制**：若 `npm install` 因网络问题失败，备选方案为 `npm install --registry=https://registry.npmmirror.com`。

---

## 验证步骤

| 步骤 | 命令 | 期望结果 | 失败时的处理 |
|------|------|---------|------------|
| 1 | `npm install` | `node_modules/` 创建，无 peer 警告 | 检查 `package-lock.json`，或换 npm registry |
| 2 | `npx tsc --noEmit` | 退出码 0，0 错误 | 按报错文件/行号修复类型 |
| 3 | `npm run build` | `dist/` 生成，Vite 报告无错 | 查看堆栈定位问题（最可能是 CSS import） |
| 4 | `npm run lint` | 退出码 0 | 处理新增告警 |
| 5 | 视觉目测 | 6 组件外观与重构前一致 | 几乎不可能发生（CSS 未改） |

---

## 不在本次范围

- ❌ 重构其余 67 个组件（仅 6 个试点）
- ❌ 引入 Tailwind CSS
- ❌ 添加 shadcn CLI/Registry
- ❌ App.tsx 拆分懒加载
- ❌ Storybook 集成
- ❌ 拼写错误修复
- ❌ nullframe 亮色主题适配

---

## 关键文件清单（仅参考，不修改）

| 文件 | 用途 |
|------|------|
| `src/lib/utils.ts` | `cn` / `mergeRefs` / `dataAttr` |
| `src/lib/variants.ts` | `themeVariants` / `sizeVariants` / `stateVariants` |
| `src/lib/index.ts` | 公共导出 |
| `components.json` | shadcn 风格元数据 |
| `package.json` | 含 CVA 依赖 |
| `src/components/Buttons.tsx` | CVA 重构样板 |
| `src/components/Card.tsx` | 双模式 CVA |
| `src/components/Badge.tsx` | 单维度变体 |
| `src/components/Alert.tsx` | 带 icon/title |
| `src/components/Inputs.tsx` | 受控 + 错误态 |
| `src/components/QuickToggle.tsx` | 三维变体 + aria-pressed |
| `src/system/hooks.ts` | `CtlCtx` 类型已修 |
| `tsconfig.json` | `@/*` 路径别名已配 |
| `vite.config.ts` | `@` 解析已配 |
| `SKILL.md` | "Component Architecture Conventions" 章节 |
| `references/tokens.md` | "8. PATH ALIASES & UTILITIES" 章节 |
