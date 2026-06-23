---
nav: Components
group:
  title: Data Display
  order: 6
title: Separator
description: 分隔线组件，支持水平/垂直与带标签模式
---

## 介绍

Separator 用于在内容之间添加视觉分隔，特点：

- 支持 `horizontal` / `vertical` 两种方向
- 支持带标签模式（`label`），在分隔线中间显示文字
- 支持 `decorative` 模式，标记为纯装饰元素（对辅助技术隐藏）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性        | 说明         | 类型                              | 默认值        |
| ----------- | ------------ | --------------------------------- | ------------- |
| orientation | 方向         | `'horizontal' \| 'vertical'`      | `'horizontal'` |
| labeled     | 是否带标签   | `boolean`                         | `false`       |
| label       | 标签文案     | `string`                          | -             |
| decorative  | 是否为装饰   | `boolean`                         | `false`       |

此外，Separator 支持所有原生 `<div>` 元素的属性。
