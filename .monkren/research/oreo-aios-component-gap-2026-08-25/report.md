# Oreo UI → AIOS UI 组件差异研究

日期：2026-08-25  
来源：[BIAsia/oreo-ui](https://github.com/BIAsia/oreo-ui)（当前 `components/` 目录与公开源码）  
目标：识别真实能力缺口；已有等价组件只建立映射，不复制实现与视觉。

## 结论

Oreo 当前公开 29 个组件目录。AIOS 已经以同名或等价职责覆盖 24 项；本轮补充 5 个公开入口：`AssistantModal`、`AvatarGroup`、`IconButton`、`Chip / ChipGroup`、`Icon`。

实现遵循 AIOS 约束：单色令牌、无阴影与模糊、紧凑圆角、可见焦点、reduced motion，以及 React 19 的 ref-as-prop。Oreo 的 Motion、浮动阴影和图标注册表没有直接复制。

## 全量映射

| Oreo | AIOS | 处理 |
|---|---|---|
| activity-label | ActivityLabel | 已覆盖 |
| assistant-modal | AssistantModal → AssistantPanel | 新增语义入口，复用既有行为 |
| attachment | Attachment / AttachmentList | 已覆盖 |
| avatar | Avatar | 已覆盖 |
| branch-picker | BranchPicker | 已覆盖 |
| button | Button | 已覆盖 |
| chip | Chip / ChipGroup | 新增 |
| code-block | CodeBlock | 已覆盖 |
| code-diff | CodeDiff | 已覆盖 |
| confirmation | ApprovalGate | 等价覆盖 |
| context-bar | ContextBar | 已覆盖 |
| conversation | ConversationViewport | 等价覆盖 |
| icon | Icon | 新增轻量适配器，不内置注册表 |
| keyword-tag | KeywordTag | 已覆盖 |
| menu | DropdownMenu / Menubar | 等价覆盖 |
| message | Message | 已覆盖 |
| plan | PlanCard | 等价覆盖 |
| prompt-box | Sender | 等价覆盖 |
| reasoning | ThoughtChain / ThinkingSteps | 等价覆盖 |
| response | Response | 已覆盖 |
| shortcut | Kbd | 等价覆盖（已有 keys 与 separator） |
| sources | Sources / Source | 已覆盖 |
| subagents | Subagent / SubagentList | 已覆盖 |
| tag | Tag / Tags | 已覆盖 |
| terminal | Terminal / TerminalLine | 已覆盖 |
| thread-list | Conversations | 等价覆盖 |
| tool-call | ToolCallRow | 等价覆盖 |
| web-search | AicssWebSearch | 等价覆盖 |
| icon-button（Oreo button 子能力） | IconButton | 新增强类型语义入口 |

## 新增能力边界

- `IconButton`：复用 Button 变体、尺寸、loading、disabled 与焦点系统；`aria-label` 在类型层必填。
- `AvatarGroup`：统一子头像尺寸、物理重叠和 `+N` 折叠；不新增头像数据模型。
- `Chip / ChipGroup`：原生 button / pressed 语义，横向溢出；不与可移除的 `Tag` 混用。
- `Icon`：接收任意 SVG React 组件，只统一尺寸、currentColor 和无障碍默认值；推荐搭配 Tabler。
- `AssistantModal`：为 Oreo 迁移提供名称兼容，状态、焦点恢复、Escape 和定位全部委托给 `AssistantPanel`。

## 明确不增加

- `Shortcut`：`Kbd` 已覆盖组合键显示。
- `Confirmation`：涉及 Agent 权限时使用信息更完整的 `ApprovalGate`；普通确认继续使用 `AlertDialog`。
- `PromptBox`：继续使用带附件与发送状态的 `Sender`。
- 任何 Oreo 阴影、玻璃模糊或装饰性动效：与 AIOS 视觉哲学冲突。
