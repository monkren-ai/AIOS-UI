---
nav: Components
group:
  title: Forms
  order: 1
title: Select
description: Nothing 风格下拉选择器，支持搜索与键盘导航
---

## 介绍

Select 是下拉选择器，点击触发器展开选项列表。

- 支持受控与非受控模式
- 支持搜索过滤（searchable）
- 支持键盘导航（ArrowUp/ArrowDown/Enter/Escape）
- 支持错误状态与禁用

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明         | 类型                          | 默认值               |
| ------------- | ------------ | ----------------------------- | -------------------- |
| options       | 选项列表     | `SelectOption[]`              | -                    |
| value         | 受控值       | `string`                      | -                    |
| defaultValue  | 默认值       | `string`                      | -                    |
| onValueChange | 值变更回调   | `(value: string) => void`     | -                    |
| placeholder   | 占位文本     | `string`                      | `'Select an option'` |
| label         | 标签文本     | `string`                      | -                    |
| error         | 错误信息     | `string`                      | -                    |
| searchable    | 是否可搜索   | `boolean`                     | `false`              |
| disabled      | 是否禁用     | `boolean`                     | `false`              |

### SelectOption

| 属性     | 说明     | 类型      | 默认值  |
| -------- | -------- | --------- | ------- |
| value    | 选项值   | `string`  | -       |
| label    | 选项标签 | `string`  | -       |
| disabled | 是否禁用 | `boolean` | `false` |

此外，Select 支持所有原生 `<div>` 元素的属性。
