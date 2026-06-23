---
nav: Components
group:
  title: Forms
  order: 3
title: Slider
description: Nothing 风格滑块，支持拖拽与键盘交互
---

## 介绍

Slider 用于在一个区间内选择数值，支持：

- 受控（`value`）与非受控（`defaultValue`）用法
- 自定义 `min` / `max` / `step`
- 键盘可访问性（方向键、Home、End）
- 可选的标签与当前值显示

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明           | 类型                         | 默认值  |
| ------------- | -------------- | ---------------------------- | ------- |
| value         | 受控值         | `number`                     | -       |
| defaultValue  | 非受控默认值   | `number`                     | `min`   |
| min           | 最小值         | `number`                     | `0`     |
| max           | 最大值         | `number`                     | `100`   |
| step          | 步长           | `number`                     | `1`     |
| label         | 标签文本       | `string`                     | -       |
| showValue     | 是否显示当前值 | `boolean`                    | `false` |
| disabled      | 是否禁用       | `boolean`                    | `false` |
| onValueChange | 值变化回调     | `(value: number) => void`     | -       |

此外，Slider 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
