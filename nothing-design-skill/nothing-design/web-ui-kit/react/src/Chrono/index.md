---
nav: Components
group:
  title: Date & Time
  order: 1
title: Chrono
description: Nothing 风格计时器，支持计圈、最快/最慢圈高亮
---

## 介绍

Chrono 是 Nothing 风格的秒表计时器：

- 支持 START / PAUSE / LAP / RESET 操作
- 自动标记最快圈（绿色）与最慢圈（黄色）
- 三种尺寸 `sm` / `md` / `lg`，三种状态 `idle` / `running` / `paused`

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                              | 默认值  |
| -------- | ---------- | --------------------------------- | ------- |
| state    | 状态       | `'idle' \| 'running' \| 'paused'` | `'idle'`|
| size     | 尺寸       | `'sm' \| 'md' \| 'lg'`            | `'md'`  |
| maxLaps  | 最大圈数   | `number`                          | `10`    |

此外，Chrono 支持所有原生 `<div>` 元素的属性。
