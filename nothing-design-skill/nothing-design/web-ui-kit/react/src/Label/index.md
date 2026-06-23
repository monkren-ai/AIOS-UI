---
nav: Components
group:
  title: Forms
  order: 7
title: Label
description: Nothing 风格标签，支持 required 与 disabled 状态
---

## 介绍

Label 用于为表单控件提供文本标签，支持：

- 必填标记（`required`）
- 禁用状态（`disabled`）
- 等宽字体大写风格

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型               | 默认值  |
| -------- | ---------- | ------------------ | ------- |
| required | 是否必填   | `boolean`          | `false` |
| disabled | 是否禁用   | `boolean`          | `false` |
| children | 标签内容   | `React.ReactNode`  | -       |

此外，Label 支持所有原生 `<label>` 元素的属性，并支持 `ref` 转发。
