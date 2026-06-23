---
nav: Components
group:
  title: Feedback
  order: 1
title: Spinner
description: Nothing 风格转盘抽奖组件，点击旋转随机选择结果
---

## 介绍

Spinner 是一个转盘抽奖组件，点击 SPIN 按钮后随机选择一个扇区。

- 支持自定义选项（items）
- 支持自定义旋转时长（spinDuration）
- 支持三种尺寸（sm/md/lg）和两种变体（default/accent）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明       | 类型                          | 默认值      |
| ------------ | ---------- | ----------------------------- | ----------- |
| items        | 选项列表   | `string[]`                   | `['YES', 'NO', ...]` |
| spinDuration | 旋转时长   | `number`                     | `3500`      |
| size         | 尺寸       | `'sm' \| 'md' \| 'lg'`       | `'md'`      |
| variant      | 变体       | `'default' \| 'accent'`      | `'default'` |

此外，Spinner 支持所有原生 `<div>` 元素的属性。
