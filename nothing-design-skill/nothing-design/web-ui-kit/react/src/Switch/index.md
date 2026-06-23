---
nav: Components
group:
  title: Forms
  order: 2
title: Switch
description: Nothing 风格开关，支持受控与非受控用法
---

## 介绍

Switch 是一个二态开关组件，用于在「开/关」之间切换。

- 支持受控（`on`）与非受控（`checked`）用法
- 支持禁用状态与标签文本
- 内置键盘可访问性与触屏适配

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明         | 类型                       | 默认值  |
| -------- | ------------ | -------------------------- | ------- |
| on       | 受控开关状态 | `boolean`                  | -       |
| checked  | 非受控开关状态 | `boolean`                | `false` |
| label    | 标签文本     | `string`                   | -       |
| disabled | 是否禁用     | `boolean`                  | `false` |
| onChange | 状态变化回调 | `(on: boolean) => void`     | -       |

此外，Switch 支持所有原生 `<label>` 元素的属性，并支持 `ref` 转发。
