---
nav: Components
group:
  title: Feedback
  order: 1
title: HoverCard
description: Nothing 风格悬停卡片，鼠标悬停时展示额外内容
---

## 介绍

HoverCard 是鼠标悬停或聚焦时展示的浮动卡片，用于展示补充信息。

- 支持上下两个方向定位（top/bottom）
- 支持延迟显示（delay）
- 支持鼠标悬停和键盘聚焦触发

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                    | 默认值      |
| -------- | ---------- | ----------------------- | ----------- |
| content  | 卡片内容   | `ReactNode`            | -           |
| side     | 弹出方向   | `'top' \| 'bottom'`    | `'bottom'`  |
| delay    | 显示延迟   | `number`               | `300`       |
| children | 触发元素   | `ReactElement`         | -           |

此外，HoverCard 支持所有原生 `<div>` 元素的属性。
