---
nav: Components
group:
  title: General
  order: -1
title: Button
description: Nothing 风格按钮，支持 4 种变体和 3 种尺寸
---

## 介绍

Button 是最基础的交互组件，提供 4 种视觉变体：

- `primary`：主按钮（白底黑字，圆角胶囊）
- `secondary`：次按钮（透明底，描边）
- `ghost`：幽灵按钮（无背景，无描边）
- `destructive`：危险按钮（红色描边，悬停填充）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性       | 说明         | 类型                                              | 默认值      |
| ---------- | ------------ | ------------------------------------------------- | ----------- |
| variant    | 按钮变体     | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` |
| size       | 按钮尺寸     | `'default' \| 'sm' \| 'lg'`                       | `'default'` |
| fullWidth  | 是否占满宽度 | `boolean`                                         | `false`     |

此外，Button 支持所有原生 `<button>` 元素的属性。
