# 继续参考 appica-ui 优化升级 Nothing UI 计划

## 1. Summary

在已完成的第一轮 appica-ui 调研升级基础上（主题系统、组件架构、工程化脚本、展示项目同步），继续深化优化。本轮聚焦四个维度：

1. **代码质量**：清理 ESLint 警告，使 `npm run lint` 通过。
2. **组件底层能力**：将更多交互组件接入 `@base-ui/react`，复用其可访问性与焦点管理。
3. **测试覆盖**：为核心组件与剩余 Agent 组件补充单元测试。
4. **工程自动化**：实现构建时 ThemeScript 注入、GitHub Actions CI。

## 2. Current State Analysis

基于对 `nothing-design-skill/nothing-design/web-ui-kit/react` 的探索：

- **主题系统**：`src/ThemeProvider/index.tsx` 已实现 `light`/`dark`/`system`、`forcedTheme`、切换过渡抑制；`src/ThemeProvider/ThemeScript.tsx` 提供无闪烁初始化脚本；`index.html` 中内联了相同逻辑。
- **组件架构**：`Button` 已接入 `@base-ui/react/button` 并拆分 `button-variants.ts`；`Input`、`Switch`、`Tag` 等已添加 `data-slot`；`src/agent/` 目录已目录化并导出到 `src/index.ts`。
- **工程化**：`scripts/sync-exports.ts` 自动生成 barrel exports；`AGENTS.md` 已制定开发规范。
- **展示项目**：`ShowcaseContext` 已移除 theme 状态；`App.tsx` 集中管理语言与预加载；路由代码分割已配置。
- **验证状态**：`type-check`、`build`、`test` 均通过；`lint` 仍有大量 `react-refresh/only-export-components` 与少量 `react-hooks/exhaustive-deps` 警告。

## 3. Proposed Changes

### Phase E：代码质量清理（Lint Cleanup）

**目标**：`npm run lint` 零警告退出。

**What / How**：

1. **统一 variants 导出策略**  
   文件：`src/Accordion/Accordion.tsx`、`src/Avatar/Avatar.tsx`、`src/Badge/Badge.tsx` 等 30+ 组件  
   当前多数组件在同一文件导出组件和 `*Variants`，触发 `react-refresh/only-export-components` 警告。采用与 `Button` 一致的拆分策略：
   - 将 CVA 变体定义迁移到 `src/<Component>/<component>-variants.ts`
   - 在 `src/<Component>/index.ts` 中聚合导出组件与变体
   - 组件文件仅默认/命名导出组件本身

2. **修复 hook 依赖警告**  
   文件：`src/AgeMotion/AgeMotion.tsx` 等  
   对 `react-hooks/exhaustive-deps` 警告进行逐项审查，通过 `useMemo` 稳定初始化值或调整依赖数组。

**Why**：保证开发规范可执行，避免 CI 阶段 lint 失败；同时统一组件文件结构，方便后续接入 `@base-ui/react`。

### Phase F：深化 @base-ui/react 集成

**目标**：将更多交互组件的底层行为迁移到 `@base-ui/react`，保留现有视觉变体与 API。

**What / How**：

1. **Switch**  
   文件：`src/Switch/Switch.tsx`  
   接入 `@base-ui/react/switch` 的 `Switch.Root` / `Switch.Thumb`，保留 `data-slot`、`label`、受控/非受控行为。

2. **Checkbox**  
   文件：`src/Checkbox/Checkbox.tsx`  
   接入 `@base-ui/react/checkbox`，复用其 indeterminate、focus、disabled 状态管理。

3. **RadioGroup**  
   文件：`src/RadioGroup/RadioGroup.tsx`  
   接入 `@base-ui/react/radio-group`，替换自定义 focus/arrow-key 处理。

4. **Select**  
   文件：`src/Select/Select.tsx`  
   经评估，`@base-ui/react/select` 不支持可过滤搜索（官方建议搜索场景使用 Combobox），而 Nothing UI 的 `Select` 已暴露 `searchable` 属性并在 showcase 中使用。为避免破坏现有行为，**保留现有自定义实现**，仅做样式/结构规范统一（拆分 variants、补充 `data-slot` 等），不强行接入 Base UI Select。

**Why**：`@base-ui/react` 提供经过充分测试的 accessibility、焦点管理和键盘交互；与其自行维护复杂状态，不如复用底层能力，同时保持 Nothing 视觉层。

### Phase G：测试覆盖扩展

**目标**：新增组件核心单元测试，覆盖渲染、变体、交互、可访问性。

**What / How**：

1. **核心组件测试**  
   新增文件：`src/Button/Button.test.tsx`、`src/Input/Input.test.tsx`、`src/Switch/Switch.test.tsx`、`src/Tag/Tag.test.tsx`  
   覆盖：
   - `data-slot` 存在
   - 各变体 className
   - 点击/键盘交互回调
   - disabled/loading 状态
   - aria 属性

2. **Agent 组件测试**  
   新增文件：`src/agent/ApprovalGate/ApprovalGate.test.tsx`、`src/agent/ProgressTrace/ProgressTrace.test.tsx`、`src/agent/ToolCallRow/ToolCallRow.test.tsx`  
   覆盖：
   - 各状态渲染
   - 批准/拒绝回调
   - 时间戳/参数展示
   - `data-slot` 与 `data-state`

**Why**：新增组件必须伴随测试是 `AGENTS.md` 的硬性要求；现有测试仅覆盖 AgentOrb 与 PlanCard，需补齐矩阵。

### Phase H：构建时 ThemeScript 注入

**目标**：消除 `index.html` 与 `ThemeScript.tsx` 之间的手动同步风险。

**What / How**：

1. 创建 Vite 插件 `scripts/vite-theme-script-plugin.ts`  
   在 `transformIndexHtml` 阶段读取 `getThemeScript()` 输出，将脚本注入到 `<head>` 最前面。

2. 更新 `vite.config.ts`  
   注册该插件，并移除 `index.html` 中硬编码的 ThemeScript 内联脚本。

3. 保留 `ThemeScript` 组件  
   作为 SSR/非 Vite 场景的备用方案继续导出。

**Why**：避免同一逻辑在 HTML 与 TSX 中重复维护；未来修改 storageKey、system 检测或 forcedTheme 只需改一处。

### Phase I：文档与 CI 自动化

**目标**：将验证步骤固化到 CI，减少人工回归检查。

**What / How**：

1. **GitHub Actions 工作流**  
   新增文件：`.github/workflows/ci.yml`  
   运行：
   - `npm ci`
   - `npm run type-check`
   - `npm run lint`
   - `npm run test -- --run`
   - `npm run build`
   - `npm run build:showcase`
   - `npm run sync:exports -- --check`

2. **更新 AGENTS.md**  
   如 Phase E 的 variants 拆分策略确认有效，更新 §4.1 目录示例，明确 variants 文件命名规范。

3. **README/升级记录**（可选）  
   如用户需要，可在 `.trae/documents/` 追加升级报告；不主动创建新文档。

## 4. Assumptions & Decisions

- **保留 Nothing 设计语言**：本轮继续禁止新增颜色、阴影、blur、渐变；所有视觉变更仅调整 className 与结构。
- **双语约束**：新增测试文案、aria-label、注释必须中英双语；组件内部常量仍用英文。
- **破坏性变更控制**：尽量保持现有 Props API 不变；若 `@base-ui/react` 集成导致 API 调整，需同步更新 `AGENTS.md` 与 showcase 用法。
- **lint 策略**：优先拆分 variants 文件以消除 `react-refresh/only-export-components`；若某些文件拆分成本过高，再考虑 ESLint 局部禁用规则，但需记录理由。
- **CI 触发**：暂定为 push 到 main 与 PR 时触发；Node 版本使用项目当前开发版本（由 package.json 推断）。

## 5. Verification Steps

| 阶段 | 验证命令 | 通过标准 |
|---|---|---|
| Phase E | `npm run lint` | 零 warning/error 退出 |
| Phase F | `npm run type-check` + `npm run test -- --run` | 无新增类型错误；测试通过 |
| Phase F | 手动验证 showcase | Switch/Checkbox/RadioGroup/Select 的变体、交互、主题切换正常 |
| Phase G | `npm run test -- --run` | 新增测试全部通过；覆盖率提升 |
| Phase H | `npm run build:showcase` + 刷新页面 | 首屏无闪烁；查看页面源码确认 ThemeScript 已注入 |
| Phase I | GitHub Actions 运行 | 所有检查步骤通过 |

## 6. Completion Summary

| 阶段 | 状态 | 关键结果 |
|---|---|---|
| Phase E | 已完成 | `Select` 拆分 `select-variants.ts`，`lint` 零警告退出 |
| Phase F | 已完成 | `Switch`/`Checkbox`/`RadioGroup` 接入 `@base-ui/react`；`Select` 保留自定义 searchable 实现 |
| Phase G | 已完成 | 新增 `Tag`、`ApprovalGate`、`ProgressTrace`、`ToolCallRow` 测试；共 135 个测试通过 |
| Phase H | 已完成 | `vite-theme-script-plugin.ts` 在构建时注入 ThemeScript；`index.html` 移除硬编码脚本 |
| Phase I | 已完成 | `.github/workflows/ci.yml` 创建；本地验证 `type-check`、`lint`、`test`、`build`、`build:showcase`、`sync:exports --check` 全部通过 |

## 7. Rollback Plan

- Phase E 的 variants 拆分可通过 git 回滚单文件；若拆分导致外部引用路径变化，需同步更新 `src/index.ts`（由 `sync:exports` 自动处理）。
- Phase F 若 `@base-ui/react` 集成造成样式回归，可保留组件外壳，仅回滚内部底层组件为原生实现。
- Phase H 保留 `ThemeScript` 组件，Vite 插件故障时可快速恢复 `index.html` 硬编码脚本。

## 8. Recommended Order

1. Phase E（先保证 lint 通过，为后续 CI 铺路）
2. Phase F（lint 干净后接入 @base-ui/react，便于发现新的 lint/type 问题）
3. Phase G（同步补充测试）
4. Phase H（构建时注入，独立性强）
5. Phase I（最后固化 CI）
