# Oreo AI 组件增量对比（2026-09-01）

## 基线

- 参考仓库：`/Users/ruishengzhang/Documents/GitHub/oreo-ui`
- Oreo 基线：`5c44e04`
- AIOS UI：本次工作区状态
- 对比范围：Oreo 自 `5042522` 之后新增或重做的可复用 AI 组件能力

## 逐项结论

| Oreo 能力 | AIOS 结论 | 本次处理 |
| --- | --- | --- |
| `StreamingText` | 缺少独立原语 | 新增 `StreamingText`，支持 `plain / fade / tail`、增量 token 动效、输入光标、busy 状态、稳定折叠、替换重置、`aria-live` 与 reduced motion。AIOS 不采用 Oreo 的渐变表现。 |
| `Reasoning` | 原有推理组件偏结果卡片，缺少紧凑活动行 | 新增 `Reasoning`、`ReasoningGroup`、`ReasoningSubject`，支持运行/完成/错误、受控展开、结束折叠、耗时、变更计数与渐进揭示。 |
| `PromptBox` | 文档曾映射到 `Sender`，体验与 Oreo 的组合输入不一致 | 新增真实 `PromptBox` 和 `PromptBoxModelSelect`，复用 `Sender` 并补齐附件、mention、模型、语音、停止、自适应高度、上下文前后插槽、inset 与语音生命周期。 |
| `Plan` | 文档曾映射到 `PlanCard`，缺少组合式步骤与派生进度 | 新增 `Plan / PlanItem`；保留 `PlanCard` 的数据驱动接口与 `PlanStep` 类型。 |
| `Confirmation` | 文档曾映射到 `ApprovalGate`，命名与状态映射不完整 | 新增兼容封装，提供 danger、details、pending/approved/denied 与 approve/deny 回调。 |
| `WebSearch` | 文档曾映射到 `AicssWebSearch`，缺少受控展开和结果类型 | 新增独立 `WebSearch`，支持运行/完成/错误、安全外链和受控/非受控披露。 |
| `ThreadList` | 文档曾映射到 `Conversations`，操作区体验不同 | 新增组合式 `ThreadList`；会话选择按钮与操作按钮并列，消除嵌套按钮并保留 current/unread 语义。 |
| `Switch` | 已有 | 保留 AIOS 现有实现，不重复增加。 |
| Settings 页面 | 属于产品级页面模式，不是 AI 通用组件 | 不采用；继续由产品根据现有表单、导航和布局原语组合。 |

## 设计与兼容说明

- 组件沿用 AIOS 的单色与红色令牌、逻辑方向属性和 `data-slot`，没有新增阴影、模糊、渐变或色板。
- `StreamingText` 从 `aios-ui-kit/conversation` 导出；`Reasoning` 系列从 `aios-ui-kit/agent` 导出；根入口同步导出。
- 现有 `Aicss*`、`Thinking*`、`Response` 等公共接口未删除或改名。
- 文档站增加 `/components/streaming-text` 与 `/components/reasoning`，两页均含可运行示例、API 与可访问性说明。
- 参考 Oreo 的信息架构，将 AI 文档拆为 Chat、Agent、Shell 三组；不复制 Oreo 视觉或 DOM。
- 补齐 15 个原先只存在于聚合页、没有独立入口的组件页面，同时保留原聚合页链接兼容。
- 补齐 8 个只在 AIOS Agent 聚合页出现、但已从 `aios-ui-kit/agent` 公共导出的独立页面；至此 Oreo Agent 12 项和 AIOS-native Agent 原语均可独立发现。
- 上述 5 个文档入口已由旧组件别名升级为真实导出，行为参考 Oreo，DOM、视觉与 API 按 AIOS 规范实现。

## 验证

- 本轮 5 个体验对齐组件：5 个测试文件、12 项测试通过；连同 `StreamingText`、`Reasoning` 均纳入全量回归。
- 组件库完整回归：119 个测试文件、1028 项测试通过；lint 0 error（保留 3 条既有 `TimeField` warning）。
- 组件库与文档 TypeScript 检查通过，组件库与文档生产构建通过。
- 文档 registry 清单与懒加载 entry 一致性测试通过。
- 浏览器验证：两个页面的桌面与 390px 移动视口均无横向溢出；流式追加产生 5 个临时 segment，推理详情可展开。
- Agent 文档复核：导航显示 23 个独立 Agent 入口；新增 8 页均正常加载，AssistantPanel 与 ApprovalGate 状态交互通过，390px 视口无横向溢出。
- 文档完整测试：9 个测试文件、41 项测试通过。
