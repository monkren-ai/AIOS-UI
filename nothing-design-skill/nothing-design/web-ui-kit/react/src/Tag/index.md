---
nav: Components
group:
  title: Forms
  order: 10
title: Tag
description: Nothing 风格标签，支持 pill / technical 变体与可移除
---

## 介绍

Tag 用于展示可点击的标签，支持：

- 两种变体：`pill`（胶囊，默认）/ `technical`（方角）
- 激活态（`active`）
- 可移除（`removable`）
- 禁用状态
- 配合 `Tags` 容器进行流式布局

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Tag

| 属性      | 说明       | 类型                       | 默认值  |
| --------- | ---------- | -------------------------- | ------- |
| variant   | 变体       | `'pill' \| 'technical'`     | `'pill'` |
| active    | 是否激活   | `boolean`                  | `false` |
| removable | 是否可移除 | `boolean`                  | `false` |
| disabled  | 是否禁用   | `boolean`                  | `false` |
| onClick   | 点击回调   | `() => void`               | -       |
| onRemove  | 移除回调   | `() => void`               | -       |

此外，Tag 支持所有原生 `<span>` 元素的属性，并支持 `ref` 转发。

### Tags

| 属性     | 说明     | 类型              | 默认值 |
| -------- | -------- | ----------------- | ------ |
| children | 标签内容 | `React.ReactNode` | -      |

Tags 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
