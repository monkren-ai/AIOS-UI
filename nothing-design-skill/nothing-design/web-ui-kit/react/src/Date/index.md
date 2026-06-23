---
nav: Components
group:
  title: Date & Time
  order: 1
title: Date
description: Nothing 风格日期组件，支持 rect / dual-ring / serif 三种样式
---

## 介绍

DateWidget 是 Nothing 风格的日期显示组件，提供三种视觉样式：

- `rect`：胶囊矩形，带 24 小时进度环
- `dual-ring`：双环样式，居中显示日期与星期
- `serif`：衬线样式，支持右下角翻页交互

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明             | 类型                              | 默认值    |
| -------------- | ---------------- | --------------------------------- | --------- |
| type           | 日期样式         | `'rect' \| 'dual-ring' \| 'serif'` | `'rect'`  |
| theme          | 主题             | `'light' \| 'dark'`               | `'light'` |
| updateInterval | 更新间隔（毫秒）| `number`                          | `60000`   |
| showPeel       | 是否显示翻页角   | `boolean`                         | `false`   |
| onPeelClick    | 翻页点击回调     | `() => void`                      | -         |

此外，DateWidget 支持所有原生 `<div>` 元素的属性。
