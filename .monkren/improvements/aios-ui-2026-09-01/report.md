# AIOS UI AI 组件补充记录（2026-09-01）

## 问题

上一轮实现覆盖了 Oreo 早期基线，但 Oreo 后续新增的流式文本反馈和紧凑推理活动没有进入 AIOS；同时缺少对应组件文档入口，用户无法在组件站发现能力。

## 改进

- 新增 `StreamingText`：仅动画新追加内容，避免整段回答重复闪烁。
- 新增 `Reasoning` 组合：统一推理步骤的状态、详情和渐进展示。
- 增加两个独立组件文档页及交互示例，并加入 Agent 分类导航。
- 同步根导出、`agent` 与 `conversation` 分组入口。
- 将原先单一的“AI OS 与对话”文档分组拆为 `Chat / Agent / Shell`。
- 新增 15 个独立文档入口，补齐 Message、Response、Attachment、BranchPicker、Prompt Box、Keyword Tag、Context Bar、Tool Call、Plan、Sources、Confirmation、Web Search、Terminal、Subagents 与 Thread List。
- 将文档中的 5 个体验别名替换为真实公共组件：`PromptBox`、`Plan / PlanItem`、`Confirmation`、`WebSearch`、`ThreadList`。
- `PromptBox` 补齐附件、mention、模型选择、语音、运行停止与自适应高度；进一步加入 `contextBefore/contextAfter`、inset 和 `idle/inputting/thinking` 语音生命周期，并将文档预览升级为可操作的完整链路。`WebSearch` 补齐受控折叠和安全外链；`ThreadList` 使用并列操作按钮，避免嵌套交互元素。
- `StreamingText` 增加 `streaming` 输入态、可见光标和 `aria-busy`；文档自动播放增量文本，AI PoC 的新回复逐字生成。用户输入本身保持稳定，不对 textarea 字符做位移动画。
- 旧 `Sender`、`PlanCard`、`ApprovalGate`、`AicssWebSearch`、`Conversations` 接口保持不变。

## 约束落实

- 使用 Tailwind CSS v4、CVA、React 19 ref-as-prop 与 `data-slot`。
- 默认文案中英双语；动画尊重 reduced motion。
- 未引入新色板、阴影、blur 或 gradient。
- 未修改已有公共组件接口。

## 文档验证

- AI Agent 页面现包含 Chat 7 项、Agent 15 项、Shell 2 项，共 24 个入口。
- 15 个新增路由均可打开并渲染独立标题、预览、用法、API 和可访问性内容。
- 文档类型检查、9 个测试文件共 41 项测试、生产构建通过。
- 浏览器抽测分支翻页从 `2 / 3` 正常切换到 `3 / 3`；桌面与移动视口无横向溢出。
- 5 个体验对齐组件共 13 项专项测试通过；组件库全量为 119 个测试文件、1028 项测试通过。
- 根导出、`agent` / `conversation` subpath 一致性检查以及组件库生产构建通过；lint 0 error，保留 3 条既有 `TimeField` warning。
