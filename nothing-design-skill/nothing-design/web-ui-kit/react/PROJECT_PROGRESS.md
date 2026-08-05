# Nothing UI — 项目进度

> 最后更新：2026-08-05  
> 包版本：`1.0.0` · 路径：`nothing-design-skill/nothing-design/web-ui-kit/react`

---

## 概览

Nothing UI 是基于 Nothing 设计语言的 React 组件库，面向 AI OS 场景扩展了 Agent 流程组件与对话式 AI 组件。当前处于 **v1.0 功能完备、展示就绪** 阶段。

| 指标 | 数值 |
|------|------|
| React | ^19.2.7 |
| TypeScript | ^6.0.3 |
| Vite | ^8.0.16 |
| 组件模块（`src/*/`） | 72 个顶层 + 14 widgets + 7 agent + 7 conversation |
| 公开导出（`index.ts`） | 76 组 |
| 单元测试文件 | 40 |
| CSS 文件 | 109 |
| Showcase 分类 | 17 |
| Widget 子组件 | 32 |
| Nullframe 组件 | 7 |
| 点阵加载器 | 12 |

---

## 里程碑进度

### ✅ 已完成

| 阶段 | 内容 | 状态 |
|------|------|------|
| **v3→v4 架构重构** | `cn` / `dataAttr` / CVA 变体 / `data-slot` 约定；组件目录化（`Button/`、`Card/` 等）；`lib/` 基础设施 | ✅ |
| **appica-ui 工程化升级** | `ThemeProvider` + `ThemeScript` 无闪烁主题；`scripts/sync-exports.ts`；`AGENTS.md` 开发规范；Agent 组件目录化 + 测试 | ✅ |
| **v5 组件合并** | Card/Active/Weather 等 variant 合并；`WidgetPill` 工厂；`NfCard` + bodies；`Time` 统一入口；`DataTable` 三合一；`OverlayPortal` 抽象 | ✅ |
| **AI OS Agent 组件** | `AgentOrb` · `PlanCard` · `ToolCallRow` · `ProgressTrace` · `ApprovalGate` · `ThinkingIndicator` · `ThinkingSteps` | ✅ |
| **对话式 AI 组件（Ant Design X 参考）** | Phase 1：`Sender` · `Bubble` · `ThoughtChain`；Phase 2：`Prompts` · `Conversations` · `Welcome` | ✅ |
| **Showcase 站点** | 17 分类展示；`/project-intro` 项目介绍页；`/ai-poc` AI 演示页；懒加载 + 路由 | ✅ |
| **扩展交互组件** | `AskUserQuestions` · `InputMessage` · `InputCopy` · `ColorPicker` · `CheckboxGroup` · `NavigationMenu` · `Surfaces` | ✅ |
| **设计系统文档** | `COMPONENTS.md` · `MIGRATION.md` · `design.md` · `tokens.md` · ADR-001 | ✅ |

### 🔄 进行中 / 待完善

| 项目 | 说明 | 优先级 |
|------|------|--------|
| **Lint 清理** | `npm run lint` 尚未全量通过，建议作为后续代码清理步骤 | 中 |
| **测试覆盖率** | 40 个测试文件覆盖核心/Agent/Conversation 组件；Widgets、Nullframe、点阵加载器等仍缺测试 | 中 |
| **COMPONENTS.md 同步** | 部分新增 AI 组件与合并后 API 需更新目录文档 | 低 |
| **Vanilla JS Kit 同步** | `web-ui-kit/` 下 Vanilla 版本尚未完全对齐 React 新增组件 | 低 |

### ⬜ 规划中

| 项目 | 说明 |
|------|------|
| **Phase 3 AI 组件** | 参考 Ant Design X 继续扩展（如 `Actions` · `FileCard` · `Sources` 等） |
| **Podcast Demo 完善** | `PodcastSection` 交互演示（播放/进度/AI 面板） |
| **fluid-functionalism 借鉴** | Base UI 迁移、更多交互 primitive 统一（见 `.trae/documents/` 计划） |
| **npm 包发布** | tsdown 构建产物已就绪，正式发布流程待定义 |

---

## 模块完成度

### 核心组件（72 个顶层模块）

```
Accordion · Alert · AskUserQuestions · AspectRatio · Avatar · Badge · Battery
Breadcrumb · Button · Caffeinate · Calendar · Card · Checkbox · CheckboxGroup
Chrono · Clipboard · Collapsible · ColorPicker · Command · ConfigProvider
ContextMenu · DataTable · Date · DateNav · DotMatrix · DropdownMenu · ErrorBoundary
Form · HoverCard · Input · InputCopy · InputMessage · InputOTP · Label · Modal
MotionProvider · MusicPlayer · Navigation · NavigationMenu · NextEvent · OverlayPortal
Pagination · PhotoCarousel · Pomodoro · Popover · ProgressBar · QuickToggle · Quotes
RadioGroup · Resizable · ScrollArea · SegmentedControl · Select · Separator · Sheet
Sidebar · Slider · Spinner · States · SunDial · Surfaces · Switch · SystemMonitor
Tabs · Tag · Taskbar · Textarea · ThemeProvider · Toggle · Tooltip · WalkieTalkie
AgeMotion · …
```

- 重构模式：CVA 变体 + `data-slot` + 独立 CSS + 单元测试（核心组件已覆盖）
- 构建：`npm run build`（tsdown）→ `es/` 目录

### Agent / AI OS（7 组件）

| 组件 | 测试 | Showcase |
|------|------|----------|
| AgentOrb | ✅ | ✅ AgentOSSection + ProjectIntroPage |
| PlanCard | ✅ | ✅ |
| ToolCallRow | ✅ | ✅ |
| ProgressTrace | ✅ | ✅ |
| ApprovalGate | ✅ | ✅ |
| ThinkingIndicator | ✅ | ✅ AgentOSSection |
| ThinkingSteps | ✅ | ✅ AgentOSSection |

### Conversation / AI 对话（7 组件）

| 组件 | 测试 | AIPocPage |
|------|------|-----------|
| Sender | ✅ | ✅ |
| Bubble / BubbleList | ✅ | ✅ |
| ThoughtChain | ✅ | ✅ |
| Prompts | ✅ | ✅ |
| Conversations | ✅ | ✅ |
| Welcome | ✅ | ✅ |

### Widgets & 特色组件

| 类别 | 数量 | 状态 |
|------|------|------|
| Widget 主组件 | 14 | ✅ 展示就绪 |
| Widget 子组件（`widgets/sub/`） | 32 | ✅ v5 合并后精简 |
| Nullframe 仪表盘 | 7 | ✅ |
| 点阵加载器 | 12 | ✅ DotMatrixLoadersSection |
| Figma 2.0 库 | — | ✅ Figma20LibrarySection |
| Podcast Demo | — | 🔄 基础框架 |

---

## Showcase 站点

| 路由 | 页面 | 状态 |
|------|------|------|
| `/` | 组件库展示（17 分类） | ✅ |
| `/project-intro` | 项目介绍（设计哲学 + AI OS 演示） | ✅ |
| `/ai-poc` | AI 对话 PoC（Sender + Bubble + ThoughtChain + Prompts + Conversations + Welcome） | ✅ |

**Showcase 分类：**

Core Interaction · Data Display · Overlays · Navigation · Menus & Selection · States & Feedback · Time & Calendar · System Monitoring · Utility · Utility Tools · Visual Display · Feature Widgets · Widget Layout · Figma 2.0 Library · Nullframe · Agent OS · Dot Matrix Loaders

---

## 验证状态

| 命令 | 状态 | 备注 |
|------|------|------|
| `npm run type-check` | ✅ | TypeScript 严格模式 |
| `npm run test` | ✅ | 40 测试文件（核心 + Agent + Conversation） |
| `npm run build` | ✅ | tsdown → `es/` |
| `npm run build:showcase` | ✅ | Vite → `dist/` |
| `npm run sync:exports -- --check` | ✅ | 导出与目录同步 |
| `npm run lint` | ⚠️ | 建议后续清理 |

---

## 近期变更摘要（2026-07 ~ 2026-08）

1. **目录重构**：`src/components/` 扁平化为 `src/Button/` 等独立模块；Showcase 迁入 `src/showcase/`。
2. **图标注册表**：`widgets/icon-svg-registry.ts` 统一点阵 SVG 图标。
3. **AI 组件矩阵**：Conversation 模块 7 组件 + `/ai-poc` 完整演示链路。
4. **合并 origin/main**：解决目录重构与图标注册表集成冲突。

---

## 相关文档

| 文档 | 用途 |
|------|------|
| [AGENTS.md](./AGENTS.md) | 开发规范与提交检查清单 |
| [COMPONENTS.md](./COMPONENTS.md) | 组件目录与 API 参考 |
| [MIGRATION.md](../../MIGRATION.md) | v3→v4→v5 迁移指南 |
| [docs/adr/001-ant-design-x-upgrade.md](./docs/adr/001-ant-design-x-upgrade.md) | AI 组件升级决策记录 |
| [design.md](../../design.md) | Nothing 设计原则 |
| [.trae/documents/](../../../../../.trae/documents/) | 历史计划与审计文档 |

---

## 下一步建议

1. 运行 `npm run lint` 并分批修复，纳入 CI。
2. 为 Widgets / Nullframe 补充 Vitest 冒烟测试。
3. 更新 `COMPONENTS.md` 第 13–14 节（Agent + Conversation）。
4. 评估 Phase 3 AI 组件优先级，更新 ADR。
