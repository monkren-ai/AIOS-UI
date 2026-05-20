# 组件详细目录 - 验证清单

## Props 字段完整性

- [x] 所有 82 个组件的 Props 接口字段均已记录（无 Props 的组件标注"无"）
- [x] 每个字段的名称、TypeScript 类型、必填性、默认值均已记录
- [x] 辅助接口（AccordionItem, RadioOption, SelectOption, DataRowItem 等）均已记录

## 使用示例

- [x] 每个有 Props 的组件均提供了 1-2 个 JSX 使用示例
- [x] 使用示例中的 Props 字段名与接口定义一致
- [x] 使用示例中的变体值与组件支持的变体一致

## 适用场景

- [x] 每个组件均提供了 1-3 个典型适用场景描述
- [x] 适用场景描述具体且可操作

## 一致性验证

- [x] 抽查 5 个组件（Button, Modal, DataGrid, WeatherWidget, DotMatrix），确认 Props 字段名、类型、默认值与源码完全匹配
- [x] 变体/模式联合类型与源码定义一致
