---
nav: Components
group:
  title: Data Display
  order: 7
title: DotMatrix
description: 点阵组件，支持网格/字形/脉冲模式
---

## 介绍

DotMatrix 用于渲染点阵图案，特点：

- 支持 `sm` / `md` / `lg` 三种点尺寸
- 支持 `light` / `dark` 两种主题
- 支持 `grid` / `glyph` / `pulse` / `custom` 四种图案模式
- 可通过 `activeDots` / `dimDots` 控制单个点的状态

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性        | 说明       | 类型                                          | 默认值    |
| ----------- | ---------- | --------------------------------------------- | --------- |
| rows        | 行数       | `number`                                      | -         |
| cols        | 列数       | `number`                                      | -         |
| dotSize     | 点尺寸     | `'sm' \| 'md' \| 'lg'`                        | `'md'`    |
| theme       | 主题       | `'light' \| 'dark'`                           | `'light'` |
| pattern     | 图案模式   | `'grid' \| 'glyph' \| 'pulse' \| 'custom'`    | `'grid'`  |
| activeDots  | 激活点     | `[number, number][]`                          | `[]`      |
| dimDots     | 暗淡点     | `[number, number][]`                          | `[]`      |

此外，DotMatrix 支持所有原生 `<div>` 元素的属性。
