---
nav: Components
group:
  title: Forms
  order: 4
title: Checkbox
description: Nothing 风格复选框，支持 checked / indeterminate 状态
---

## 介绍

Checkbox 用于在多个选项中进行多选，支持：

- 受控（`checked`）与非受控（`defaultChecked`）用法
- `indeterminate`（半选）状态
- 禁用状态与标签文本
- 键盘可访问性（空格切换）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性            | 说明           | 类型                                          | 默认值     |
| --------------- | -------------- | --------------------------------------------- | ---------- |
| checked         | 受控选中状态   | `boolean \| 'indeterminate'`                  | -          |
| defaultChecked  | 非受控默认状态 | `boolean`                                     | `false`    |
| label           | 标签文本       | `string`                                      | -          |
| disabled        | 是否禁用       | `boolean`                                     | `false`    |
| id              | input id       | `string`                                      | -          |
| onCheckedChange | 状态变化回调   | `(checked: boolean \| 'indeterminate') => void` | -        |

此外，Checkbox 支持所有原生 `<label>` 元素的属性，并支持 `ref` 转发。
