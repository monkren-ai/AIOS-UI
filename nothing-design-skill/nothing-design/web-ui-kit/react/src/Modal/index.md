---
nav: Components
group:
  title: Feedback
  order: 1
title: Modal
description: Nothing 风格模态对话框，支持标准对话框和警告框两种模式
---

## 介绍

Modal 是覆盖在页面之上的对话框组件，提供两种模式：

- `default`：标准对话框，包含关闭按钮、标题、内容和自定义页脚
- `alert`：警告框，包含描述文字、取消和确认按钮，支持 destructive 样式

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明           | 类型                       | 默认值      |
| ------------- | -------------- | -------------------------- | ----------- |
| open          | 是否打开       | `boolean`                 | -           |
| onClose       | 关闭回调       | `() => void`              | -           |
| title         | 标题           | `string`                  | -           |
| footer        | 自定义页脚     | `ReactNode`               | -           |
| variant       | 模式           | `'default' \| 'alert'`    | `'default'` |
| description   | 描述（alert）  | `string`                  | -           |
| confirmLabel  | 确认按钮文字   | `string`                  | `'Confirm'` |
| cancelLabel   | 取消按钮文字   | `string`                  | `'Cancel'`  |
| onConfirm     | 确认回调       | `() => void`              | -           |
| onCancel      | 取消回调       | `() => void`              | -           |
| destructive   | 是否危险操作   | `boolean`                 | `false`     |

此外，Modal 支持所有原生 `<div>` 元素的属性。
