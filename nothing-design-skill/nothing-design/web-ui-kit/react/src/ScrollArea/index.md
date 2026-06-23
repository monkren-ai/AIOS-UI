---
nav: Components
group:
  title: Layout
  order: 1
title: ScrollArea
description: Nothing 风格的滚动区域，带自定义滚动条
---

## 介绍

ScrollArea 提供一个可滚动容器，使用自定义滚动条替代原生滚动条，悬停时显示滚动滑块，支持拖拽与轨道点击定位。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性    | 说明       | 类型                | 默认值 |
| ------- | ---------- | ------------------- | ------ |
| height  | 容器高度   | `string`            | -      |
| className | 自定义类名 | `string`          | -      |

此外，ScrollArea 支持所有原生 `<div>` 元素的属性。
