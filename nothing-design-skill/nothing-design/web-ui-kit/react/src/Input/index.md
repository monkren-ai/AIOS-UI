---
nav: Components
group:
  title: Forms
  order: 1
title: Input
description: Nothing 风格输入框，支持 underline / bordered 两种变体
---

## 介绍

Input 是基础的文本输入组件，提供 2 种视觉变体：

- `underline`：下划线样式（默认）
- `bordered`：描边样式

支持 `label`、`error` 提示与受控/非受控用法。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性       | 说明         | 类型                          | 默认值      |
| ---------- | ------------ | ----------------------------- | ----------- |
| variant    | 输入框变体   | `'underline' \| 'bordered'`  | `'underline'` |
| label      | 标签文本     | `string`                      | -           |
| error      | 错误提示     | `string`                      | -           |
| value      | 受控值       | `string`                      | -           |
| disabled   | 是否禁用     | `boolean`                     | `false`     |
| onChange   | 值变化回调   | `(value: string) => void`    | -           |

此外，Input 支持所有原生 `<input>` 元素的属性，并支持 `ref` 转发至内部 input 元素。
