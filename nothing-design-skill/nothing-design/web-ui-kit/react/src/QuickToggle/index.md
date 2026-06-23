---
nav: Components
group:
  title: Widgets
  order: 1
title: QuickToggle
description: Nothing 风格快速切换按钮，支持圆形/胶囊两种变体
---

## 介绍

QuickToggle 是一个快速切换按钮组件，常用于控制中心或小部件场景：

- `circle`：圆形按钮（默认）
- `pill`：胶囊形按钮

支持 `light` / `dark` / `accent` 三种主题，以及 `active` 状态切换。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性    | 说明     | 类型                                  | 默认值     |
| ------- | -------- | ------------------------------------- | ---------- |
| variant | 变体     | `'circle' \| 'pill'`                  | `'circle'`|
| theme   | 主题     | `'light' \| 'dark' \| 'accent'`       | `'light'`  |
| active  | 是否激活 | `boolean`                             | `false`    |
| icon    | 图标     | `ReactNode`                           | -          |
| label   | 标签     | `string`                              | -          |

此外，QuickToggle 支持所有原生 `<button>` 元素的属性。
