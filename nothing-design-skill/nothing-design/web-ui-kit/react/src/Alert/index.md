---
nav: Components
group:
  title: Feedback
  order: 1
title: Alert
description: Nothing 风格警告提示，用于展示重要信息
---

## 介绍

Alert 是用于展示重要信息的静态提示组件。

- `default`：默认提示（status 语义）
- `destructive`：危险提示（alert 语义）
- 支持自定义图标和标题

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                          | 默认值      |
| -------- | ---------- | ----------------------------- | ----------- |
| variant  | 变体       | `'default' \| 'destructive'` | `'default'` |
| title    | 标题       | `string`                     | -           |
| icon     | 自定义图标 | `ReactNode`                  | -           |

此外，Alert 支持所有原生 `<div>` 元素的属性。
