---
nav: Components
group:
  title: Forms
  order: 8
title: InputOTP
description: Nothing 风格一次性验证码输入，支持粘贴与键盘导航
---

## 介绍

InputOTP 用于输入一次性验证码（OTP），支持：

- 自定义长度（`length`，默认 6）
- 受控（`value`）与非受控用法
- 自动跳格、退格、方向键导航
- 粘贴整段验证码
- 禁用与错误状态

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明         | 类型                         | 默认值  |
| ------------- | ------------ | ---------------------------- | ------- |
| length        | 输入位数     | `number`                     | `6`     |
| value         | 受控值       | `string`                     | -       |
| disabled      | 是否禁用     | `boolean`                    | `false` |
| error         | 是否错误     | `boolean`                    | `false` |
| onValueChange | 值变化回调   | `(value: string) => void`     | -       |

此外，InputOTP 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
