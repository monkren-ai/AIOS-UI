# 组件全面梳理 - 验证清单

## 分类体系完整性

- [x] 所有 82 个组件文件均有分类归属，无遗漏
- [x] 8 大类别（UI Primitive / Core Interaction / Data Display / Feedback & Overlay / Navigation / Layout & Container / Functional Widget / Nothing Widget 2.0）覆盖所有组件
- [x] 每个组件有且仅有一个主要分类归属，无重复
- [x] Widget 子系统 5 层结构（基础设施层/预设组件层/功能组件层/字形层/组合层）边界清晰

## 组件信息完整性

- [x] 抽查 10 个组件的接口名与源码一致（AccordionProps, ButtonProps, CardProps, ModalProps, ClockProps, DotMatrixProps, WidgetCardProps, WeatherWidgetProps, SelectProps, ProgressBarProps）
- [x] Props 接口名与源码定义一致
- [x] 变体/模式信息与组件实际支持的 variant/size/theme 一致

## 命名一致性

- [x] Buttons.tsx→Button、Inputs.tsx→Input、Date.tsx→DateWidget、Cards.tsx→Card、States.tsx→4 个状态组件的命名不一致已记录
- [x] NothingWidgets20.tsx→NothingWidgets 命名不一致已补充记录
- [x] 无遗漏的命名不一致情况（文件名与导出名不匹配）

## 依赖关系准确性

- [x] 组件→组件依赖与源码 import 语句一致（仅 3 个组件有跨组件依赖：Glyph→DotMatrix, WeatherWidget→DotMatrix, NothingWidgets20→WidgetIcons/WidgetPills/WidgetSubComponents）
- [x] 组件→Hook 依赖与源码 import 语句一致
- [x] 组件→CSS 依赖与源码 import 语句一致
- [x] 组件→资源依赖（图片、SVG 路径数据）与源码 import 语句一致

## Hooks 清单准确性

- [x] 6 个自定义 Hooks 的功能描述准确
- [x] useClickOutside 使用组件：Command, ContextMenu, DropdownMenu, NavigationMenu, Popover, Select
- [x] useDisclosure 使用组件：DropdownMenu, Popover
- [x] useFloating 使用组件：DropdownMenu, HoverCard, Popover, Tooltip
- [x] useKeyboardNavigation 使用组件：ContextMenu, DropdownMenu
- [x] useMobile 和 useToggle 当前无组件消费（未消费 Hooks）

## CSS 映射完整性

- [x] 78 个 CSS 文件（不含 tokens.css）与 82 个组件文件的映射无遗漏
- [x] tokens.css 全局 Token 映射关系已记录
- [x] widgets.css 综合布局工具类映射关系已记录（无对应组件，仅 App.tsx import）
- [x] CSS 命名规范（nothing- 前缀 BEM + widget- 前缀工具类）已记录
- [x] WeatherWidget.tsx 额外 import dot-matrix.css 已记录
- [x] 10 个 CSS 文件未被 App.tsx 全局引入已记录
