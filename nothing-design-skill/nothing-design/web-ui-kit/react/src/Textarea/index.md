---
nav: Components
group:
  title: Forms
  order: 6
title: Textarea
description: Nothing 风格多行文本输入，支持自动高度与错误提示
---

## 介绍

Textarea 用于多行文本输入，支持：

- 受控（`value`）与非受控（`defaultValue`）用法
- 自动高度（`autoResize`），可限制最小/最大行数
- 标签与错误提示
- 禁用状态

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明           | 类型                                            | 默认值  |
| ------------ | -------------- | ----------------------------------------------- | ------- |
| value        | 受控值         | `string`                                        | -       |
| defaultValue | 非受控默认值   | `string`                                        | `''`    |
| label        | 标签文本       | `string`                                        | -       |
| error        | 错误提示       | `string`                                        | -       |
| autoResize   | 是否自动高度   | `boolean`                                       | `false` |
| minRows      | 最小行数       | `number`                                        | `3`     |
| maxRows      | 最大行数       | `number`                                        | -       |
| disabled     | 是否禁用       | `boolean`                                       | `false` |
| onChange     | 值变化回调     | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | -       |

此外，Textarea 支持所有原生 `<textarea>` 元素的属性，并支持 `ref` 转发至内部 textarea 元素。
