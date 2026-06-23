---
nav: Components
group:
  title: Navigation
  order: 3
title: Tabs
description: Nothing 风格选项卡，支持键盘导航与滑动指示器
---

## 介绍

Tabs 是选项卡组件，由触发器列表与面板组成。激活项下方有滑动指示器，支持完整的键盘导航（ArrowLeft/Right、Home、End、Enter/Space）。

- 支持受控（`value`）与非受控（`defaultValue`）两种模式
- 通过 `TabPanel` 子组件声明面板内容
- 支持禁用单个选项卡

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Tabs

| 属性           | 说明                | 类型                          | 默认值            |
| -------------- | ------------------- | ----------------------------- | ----------------- |
| items          | 选项卡项列表        | `TabItem[]`                   | -                 |
| value          | 受控当前值          | `string`                      | `undefined`       |
| defaultValue   | 非受控默认值        | `string`                      | 首项 value        |
| onValueChange  | 值变化回调          | `(value: string) => void`     | -                 |

### TabItem

| 属性     | 说明       | 类型      | 默认值  |
| -------- | ---------- | --------- | ------- |
| value    | 选项卡值   | `string`  | -       |
| label    | 选项卡文本 | `string`  | -       |
| disabled | 是否禁用   | `boolean` | `false` |

### TabPanel

| 属性     | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 对应选项卡值   | `string`      | -      |
| children | 面板内容       | `ReactNode`   | -      |
