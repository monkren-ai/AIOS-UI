---
nav: Components
group:
  title: Layout
  order: 4
title: Clipboard
description: Nothing 风格的剪贴板历史组件
---

## 介绍

Clipboard 用于展示剪贴板历史记录，支持点击复制、删除单条、清空全部，并自动监听系统剪贴板变化。提供 `sm`/`md`/`lg` 三种尺寸与 `idle`/`copied` 两种状态。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明             | 类型                  | 默认值 |
| -------------- | ---------------- | --------------------- | ------ |
| size           | 尺寸             | `'sm' \| 'md' \| 'lg'` | `'md'` |
| state          | 状态             | `'idle' \| 'copied'`  | `'idle'` |
| maxItems       | 最大记录数       | `number`              | `5`    |
| truncateLength | 文本截断长度     | `number`              | `40`   |
| copiedDuration | 复制提示持续毫秒 | `number`              | `2000` |
| demoItems      | 初始演示数据     | `ClipboardItem[]`     | -      |

此外，Clipboard 支持所有原生 `<div>` 元素的属性。
