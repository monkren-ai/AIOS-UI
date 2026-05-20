# Tasks

- [x] Task 1: 验证组件分类体系完整性
  - [x] 确认所有 82 个组件文件均有分类归属
  - [x] 确认 8 大类别覆盖所有组件，无遗漏无重复
  - [x] 确认 Widget 子系统 5 层结构（基础设施/预设/功能/字形/组合）边界清晰

- [x] Task 2: 验证组件信息字段完整性
  - [x] 抽查 10 个组件，确认 spec.md 中记录的接口名与源码一致
  - [x] 确认 Props 接口名与源码一致（AccordionProps, ButtonProps, CardProps, ModalProps, ClockProps, DotMatrixProps, WidgetCardProps, WeatherWidgetProps, SelectProps, ProgressBarProps）

- [x] Task 3: 验证命名不一致问题清单
  - [x] 确认 Buttons.tsx→Button、Inputs.tsx→Input、Date.tsx→DateWidget、Cards.tsx→Card、States.tsx→4 个状态组件等不一致情况已记录
  - [x] 新发现 NothingWidgets20.tsx→NothingWidgets 命名不一致已补充记录

- [x] Task 4: 验证依赖关系图准确性
  - [x] 确认仅 3 个组件存在跨组件依赖：Glyph→DotMatrix, WeatherWidget→DotMatrix, NothingWidgets20→WidgetIcons/WidgetPills/WidgetSubComponents
  - [x] 确认组件→Hook 依赖与源码 import 一致
  - [x] 确认组件→CSS 依赖与实际 import 一致
  - [x] 确认组件→资源依赖与源码一致

- [x] Task 5: 验证自定义 Hooks 清单
  - [x] 确认 6 个 Hooks 的功能描述和使用组件与源码一致
  - [x] 确认 useMobile 和 useToggle 当前无组件消费（未消费 Hooks）

- [x] Task 6: 验证 CSS 与组件映射关系
  - [x] 确认 78 个 CSS 文件（不含 tokens.css）与 82 个组件文件的映射无遗漏
  - [x] 确认 widgets.css 无对应组件文件，仅 App.tsx import
  - [x] 确认 WeatherWidget.tsx 额外 import dot-matrix.css
  - [x] 确认 10 个 CSS 文件未被 App.tsx 全局引入

# Task Dependencies
- [Task 2-6] 均依赖 [Task 1]（分类体系确认后才能验证信息完整性）
- [Task 2-6] 之间无依赖，可并行执行
