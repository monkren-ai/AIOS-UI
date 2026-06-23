---
nav: Components
group:
  title: Data Display
  order: 1
title: Card
description: Nothing 风格卡片，支持内容卡片与小组件卡片两种模式
---

## 介绍

Card 提供两种模式：

- **content**（默认）：内容卡片，支持标题、操作按钮、正文与页脚
- **widget**：小组件卡片，支持数值、图标、副标题，适合仪表盘场景

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Card

| 属性        | 说明           | 类型                                  | 默认值      |
| ----------- | -------------- | ------------------------------------- | ----------- |
| mode        | 卡片模式       | `'content' \| 'widget'`               | `'content'` |

### ContentCard（mode='content'）

| 属性         | 说明         | 类型                                              | 默认值      |
| ------------ | ------------ | ------------------------------------------------- | ----------- |
| variant      | 卡片变体     | `'default' \| 'raised' \| 'compact' \| 'technical'` | `'default'` |
| interactive | 是否可交互   | `boolean`                                         | `false`     |
| disabled     | 是否禁用     | `boolean`                                         | `false`     |
| title        | 标题         | `string`                                          | -           |
| action       | 操作按钮文案 | `string`                                          | -           |
| onAction     | 操作回调     | `(e: MouseEvent) => void`                         | -           |
| footer       | 页脚内容     | `ReactNode`                                       | -           |

### WidgetCard（mode='widget'）

| 属性         | 说明       | 类型                                              | 默认值      |
| ------------ | ---------- | ------------------------------------------------- | ----------- |
| size         | 尺寸       | `'square' \| 'wide' \| 'tall' \| 'auto'`         | `'square'`  |
| shape        | 形状       | `'rounded' \| 'pill' \| 'circle'`                | `'rounded'` |
| theme        | 主题       | `'light' \| 'dark' \| 'accent'`                  | `'dark'`    |
| variant      | 变体       | `'default' \| 'compact'`                          | `'default'` |
| align        | 对齐方式   | `'left' \| 'center' \| 'right'`                   | `'center'`  |
| iconPosition | 图标位置   | `'top' \| 'left' \| 'right' \| 'bottom'`          | `'top'`     |
| title        | 标题       | `string`                                          | -           |
| value        | 主数值     | `string \| number`                                | -           |
| subtitle     | 副标题     | `string`                                          | -           |
| icon         | 图标节点   | `ReactNode`                                       | -           |
| onClick      | 点击回调   | `() => void`                                      | -           |

此外，Card 支持所有原生 `<div>` 元素的属性。
