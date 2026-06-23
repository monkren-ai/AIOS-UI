---
nav: Components
group:
  title: Feedback
  order: 1
title: Sheet
description: Nothing 风格侧边抽屉，支持四个方向滑出
---

## 介绍

Sheet 是从屏幕边缘滑入的抽屉组件，支持四个方向（left/right/top/bottom）。

- 支持标题、关闭按钮和自定义页脚
- 支持底部抽屉模式（bottom + sections），带拖拽手柄
- 支持全屏模式（full）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明         | 类型                                | 默认值     |
| ------------ | ------------ | ----------------------------------- | ---------- |
| open         | 是否打开     | `boolean`                          | -          |
| onOpenChange | 打开状态回调 | `(open: boolean) => void`          | -          |
| side         | 滑出方向     | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| title        | 标题         | `string`                           | -          |
| full         | 是否全屏     | `boolean`                          | `false`    |
| sections     | 分区内容     | `SheetSection[]`                   | -          |
| footer       | 自定义页脚   | `ReactNode`                        | -          |

此外，Sheet 支持所有原生 `<div>` 元素的属性。
