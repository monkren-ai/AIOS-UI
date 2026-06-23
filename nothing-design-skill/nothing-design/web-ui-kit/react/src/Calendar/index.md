---
nav: Components
group:
  title: Date & Time
  order: 1
title: Calendar
description: Nothing 风格日历，支持紧凑与完整两种视图
---

## 介绍

Calendar 是 Nothing 风格的日历组件，提供两种视图：

- `compact`：紧凑视图，仅显示星期、日期与月份
- `full`：完整视图，显示整月网格并支持月份切换

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明         | 类型                       | 默认值      |
| ------------ | ------------ | -------------------------- | ----------- |
| type         | 日历视图类型 | `'compact' \| 'full'`      | `'compact'` |
| initialDate  | 初始日期     | `Date`                     | `new Date()`|

此外，Calendar 支持所有原生 `<div>` 元素的属性。
