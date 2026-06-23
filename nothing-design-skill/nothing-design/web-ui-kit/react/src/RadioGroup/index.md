---
nav: Components
group:
  title: Forms
  order: 5
title: RadioGroup
description: Nothing 风格单选组，支持水平/垂直布局与键盘导航
---

## 介绍

RadioGroup 用于在多个互斥选项中选择一个，支持：

- 受控（`value`）与非受控（`defaultValue`）用法
- 水平 / 垂直布局（`orientation`）
- 完整的键盘导航（方向键、Home、End）
- 单项禁用与整组禁用

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明           | 类型                              | 默认值      |
| ------------ | -------------- | --------------------------------- | ----------- |
| options      | 选项数组       | `RadioOption[]`                   | -           |
| value        | 受控选中值     | `string`                          | -           |
| defaultValue | 非受控默认值   | `string`                          | `''`        |
| orientation  | 布局方向       | `'horizontal' \| 'vertical'`      | `'vertical'` |
| disabled     | 是否整组禁用   | `boolean`                         | `false`     |
| name         | 原生 radio name | `string`                        | -           |
| onValueChange | 值变化回调     | `(value: string) => void`         | -           |

### RadioOption

| 属性     | 说明       | 类型      | 默认值  |
| -------- | ---------- | --------- | ------- |
| value    | 选项值     | `string`  | -       |
| label    | 选项标签   | `string`  | -       |
| disabled | 是否禁用   | `boolean` | `false` |

此外，RadioGroup 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
