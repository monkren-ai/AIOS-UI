---
nav: Components
group:
  title: Layout
  order: 3
title: AspectRatio
description: Nothing 风格的宽高比容器
---

## 介绍

AspectRatio 用于约束内容按指定宽高比展示，内部子元素会铺满整个容器。支持现代 `aspect-ratio` CSS 属性，并对不支持的浏览器提供降级方案。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性   | 说明     | 类型     | 默认值  |
| ------ | -------- | -------- | ------- |
| ratio  | 宽高比   | `number` | `16/9`  |

此外，AspectRatio 支持所有原生 `<div>` 元素的属性。
