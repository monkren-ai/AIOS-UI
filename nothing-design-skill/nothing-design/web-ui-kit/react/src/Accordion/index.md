---
nav: Components
group:
  title: Navigation
  order: 2
title: Accordion
description: Nothing 风格手风琴，支持单展开与多展开模式
---

## 介绍

Accordion 是垂直堆叠的折叠面板，点击标题展开/收起内容。

- 支持 `single`（单展开）与 `multiple`（多展开）两种模式
- 支持键盘导航（ArrowUp/ArrowDown/Home/End）
- 支持禁用单项

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性       | 说明         | 类型                          | 默认值     |
| ---------- | ------------ | ----------------------------- | ---------- |
| type       | 展开模式     | `'single' \| 'multiple'`      | `'single'` |
| items      | 折叠项列表   | `AccordionItem[]`             | -          |
| defaultOpen | 默认展开项 id | `string[]`                   | `[]`       |

### AccordionItem

| 属性     | 说明     | 类型      | 默认值  |
| -------- | -------- | --------- | ------- |
| id       | 唯一标识 | `string`  | -       |
| title    | 标题     | `string`  | -       |
| content  | 内容     | `string`  | -       |
| disabled | 是否禁用 | `boolean` | `false` |

此外，Accordion 支持所有原生 `<div>` 元素的属性。
