---
nav: Components
group:
  title: Feedback
  order: 1
title: Popover
description: Nothing 风格弹出层，点击触发，支持四个方向定位
---

## 介绍

Popover 是点击触发的浮动弹出层，用于展示额外内容。

- 支持四个方向定位（top/bottom/left/right）
- 支持受控和非受控模式
- 点击外部或按 Escape 关闭

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明         | 类型                                       | 默认值      |
| ------------ | ------------ | ------------------------------------------ | ----------- |
| content      | 弹出内容     | `ReactNode`                               | -           |
| side         | 弹出方向     | `'top' \| 'bottom' \| 'left' \| 'right'`  | `'bottom'`  |
| open         | 是否打开     | `boolean`                                 | -           |
| onOpenChange | 打开状态回调 | `(open: boolean) => void`                 | -           |
| children     | 触发元素     | `ReactElement`                            | -           |

此外，Popover 支持所有原生 `<div>` 元素的属性。
