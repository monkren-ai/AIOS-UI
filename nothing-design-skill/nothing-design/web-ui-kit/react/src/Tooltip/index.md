---
nav: Components
group:
  title: Feedback
  order: 1
title: Tooltip
description: Nothing 风格文字提示，鼠标悬停或聚焦时显示
---

## 介绍

Tooltip 是轻量级的文字提示组件，在鼠标悬停或键盘聚焦时显示。

- 支持四个方向定位（top/bottom/left/right）
- 支持延迟显示（delay）
- 支持鼠标悬停和键盘聚焦触发

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                                       | 默认值  |
| -------- | ---------- | ------------------------------------------ | ------- |
| content  | 提示文字   | `string`                                  | -       |
| side     | 弹出方向   | `'top' \| 'bottom' \| 'left' \| 'right'`  | `'top'` |
| delay    | 显示延迟   | `number`                                  | `300`   |
| children | 触发元素   | `ReactElement`                            | -       |

此外，Tooltip 支持所有原生 `<div>` 元素的属性。
