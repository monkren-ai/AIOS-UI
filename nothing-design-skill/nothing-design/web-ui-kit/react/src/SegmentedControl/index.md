---
nav: Components
group:
  title: Forms
  order: 11
title: SegmentedControl
description: Nothing 风格分段控件，支持 pill / rounded 变体与滑块动画
---

## 介绍

SegmentedControl 用于在多个互斥选项间切换，类似分段选择器：

- 两种变体：`pill`（胶囊，默认）/ `rounded`（圆角）
- 受控（`activeIndex`）与非受控用法
- 滑块跟随激活项的过渡动画
- 禁用状态与触屏适配

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性        | 说明         | 类型                          | 默认值  |
| ----------- | ------------ | ----------------------------- | ------- |
| segments    | 分段标签数组 | `string[]`                    | -       |
| activeIndex | 受控激活索引 | `number`                      | -       |
| variant     | 变体         | `'pill' \| 'rounded'`          | `'pill'` |
| disabled    | 是否禁用     | `boolean`                     | `false` |
| onChange    | 切换回调     | `(index: number) => void`     | -       |

此外，SegmentedControl 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
