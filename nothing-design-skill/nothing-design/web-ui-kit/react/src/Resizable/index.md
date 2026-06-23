---
nav: Components
group:
  title: Layout
  order: 2
title: Resizable
description: Nothing 风格的可调整大小面板容器
---

## 介绍

Resizable 提供可拖拽调整子面板大小的容器，支持水平与垂直两种方向，分隔条支持鼠标拖拽与键盘操作（方向键）。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明           | 类型                          | 默认值       |
| ------------ | -------------- | ----------------------------- | ------------ |
| direction    | 排列方向       | `'horizontal' \| 'vertical'`  | `'horizontal'` |
| initialSizes | 初始尺寸百分比 | `number[]`                    | -            |
| minSizes     | 最小尺寸百分比 | `number[]`                    | -            |
| maxSizes     | 最大尺寸百分比 | `number[]`                    | -            |

此外，Resizable 支持所有原生 `<div>` 元素的属性。
