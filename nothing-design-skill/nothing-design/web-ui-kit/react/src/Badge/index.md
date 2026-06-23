---
nav: Components
group:
  title: Data Display
  order: 4
title: Badge
description: Nothing 风格徽标，支持 4 种变体
---

## 介绍

Badge 是用于状态标记的徽标组件，提供 4 种视觉变体：

- `default`：默认（白底黑字）
- `secondary`：次要（灰底）
- `destructive`：危险（红色淡背景）
- `outline`：描边（透明底，描边）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性    | 说明   | 类型                                              | 默认值      |
| ------- | ------ | ------------------------------------------------- | ----------- |
| variant | 变体   | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` |

此外，Badge 支持所有原生 `<span>` 元素的属性。
