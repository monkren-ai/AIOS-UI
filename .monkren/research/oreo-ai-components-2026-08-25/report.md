# Oreo UI AI 组件对比

日期：2026-08-25  
参考：BIAsia/oreo-ui `5042522`、AIOS-UI `29de035`

## 摘要与建议

AIOS UI 已覆盖基础对话、推理、计划、审批、搜索和工具调用。本次不复制 Oreo 的圆角、阴影、渐变或彩色状态，而是补齐其成熟的 Agent 交互模式，并保持 AIOS 的单色工业语言、红色事件色、双语、`data-slot` 和 reduced-motion 约束。

## 对比矩阵

| Oreo 能力 | AIOS 处理 | 结果 |
|---|---|---|
| Button / Avatar / Tag / Shortcut / Menu | 使用现有通用组件 | 已有 |
| Prompt Box | 增强 `Sender` 的附件、标签、模型与停止态 | 增强 |
| Conversation / Message | 新增 `ConversationViewport` 与组合式 `Message`，保留 Bubble API | 新增 + 兼容 |
| Thread List | 增强 `Conversations` 的分组、未读、创建和独立操作 | 增强 |
| Plan / Confirmation / Tool Call | 增强 `PlanCard`、`ApprovalGate`、`ToolCallRow` | 增强 |
| Code Block / Code Diff | 新增通用组件；AICSS 兼容件复用新原语 | 新增 |
| Attachment / Branch Picker / Sources / Response | 新增 AIOS 原生实现 | 新增 |
| Activity Label / Assistant Modal / Context Bar | 新增 `ActivityLabel`、`AssistantPanel`、`ContextBar` | 新增 |
| Subagents / Terminal | 新增并行 Agent 与命令输出组件 | 新增 |
| Oreo 阴影、blur、渐变、彩色状态 | 与 AIOS 设计规范冲突 | 不采用 |
| Oreo 品牌图标与素材 | 避免供应商耦合和源码复制 | 不采用 |

## 稳定模式

1. 流式内容只在用户位于底部时自动跟随，用户上滚后不抢位置。
2. 工具调用、审批和终端输出必须显式表达 running / done / error，而不能只靠动画或颜色。
3. 对话输入通过插槽组合附件、上下文标签和模型选择，不持有模型 SDK 或请求状态。
4. Markdown、来源、代码和 diff 是回答内容的基础原语，应独立导出并允许消费者覆盖。

## 来源

- https://github.com/BIAsia/oreo-ui/tree/5042522
- https://github.com/monkren-ai/AIOS-UI
