# AIOS UI AI 组件改进记录

## 修复基线

- P1：`BubbleList` 在列表变化时无条件平滑滚到底部，用户阅读历史消息时会被抢位置。
- P1：`Conversations` 把可自定义操作区放在选择按钮内部，调用方传入按钮时形成嵌套交互元素。
- P1：AI 输出缺少附件、消息分支、Markdown、来源、子 Agent 与终端等通用原语。
- P2：AICSS 代码块和文件差异与通用组件能力重复。

## 实施结果

- 新增底部感知的 `ConversationViewport`，保留旧 `BubbleList` 兼容行为。
- `Conversations` 的选择按钮与操作区改为同级元素，并增加分组、未读和新建会话。
- 新增计划列出的 Agent、Conversation、CodeBlock 与 CodeDiff 组件。
- `AicssCodeBlock` 和 `AicssFileDiff` 改为新原语的兼容封装。
- Agent 与 Conversation 文档页新增可交互组件矩阵、源码示例、API 表和可访问性说明，组件不再只存在于导出与 PoC 中。

## 五维度复核

- 哲学一致性：8/10。新增组件只使用现有单色、表面、边框和红色事件 token；未引入 Oreo 的阴影或渐变。
- 视觉层级：7/10。状态、标题、正文和辅助信息形成三层，但最终视觉仍需在文档站桌面与窄屏人工确认。
- 细节执行：7/10。统一 4px 间距刻度、逻辑方向属性和标准圆角；复杂旧 AICSS 仍保留历史 CSS。
- 功能性：8/10。新增原语直接覆盖流式回答、附件、来源、分支、子 Agent 和终端任务。
- 创新性：6/10。属于生产组件库扩展，重点是将常见 Agent 模式转译为 AIOS 工业语言，而非追求概念视觉。
