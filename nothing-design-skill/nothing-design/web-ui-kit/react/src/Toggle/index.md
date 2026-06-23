---
nav: Components
group:
  title: Forms
  order: 12
title: Toggle
description: Nothing 风格切换按钮，支持单按钮与多选分组
---

## 介绍

Toggle 是一个可切换按压状态的按钮，支持：

- 两种变体：`default`（默认）/ `outline`（描边）
- 三种尺寸：`sm` / `md` / `lg`
- 受控（`pressed`）与非受控（`defaultPressed`）用法
- 配合 `ToggleGroup` 实现多选分组

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Toggle

| 属性            | 说明         | 类型                              | 默认值      |
| --------------- | ------------ | --------------------------------- | ----------- |
| pressed         | 受控按压状态 | `boolean`                         | -           |
| defaultPressed  | 非受控默认值 | `boolean`                         | `false`     |
| variant         | 变体         | `'default' \| 'outline'`           | `'default'` |
| size            | 尺寸         | `'sm' \| 'md' \| 'lg'`             | `'md'`      |
| disabled        | 是否禁用     | `boolean`                         | `false`     |
| value           | 分组中的值   | `string`                          | -           |
| onPressedChange | 状态变化回调 | `(pressed: boolean) => void`     | -           |
| onClick         | 点击回调     | `MouseEventHandler<HTMLButtonElement>` | -       |

此外，Toggle 支持所有原生 `<button>` 元素的属性，并支持 `ref` 转发。

### ToggleGroup

| 属性          | 说明           | 类型                         | 默认值      |
| ------------- | -------------- | ---------------------------- | ----------- |
| value         | 受控选中值数组 | `string[]`                   | -           |
| defaultValue  | 非受控默认值   | `string[]`                   | `[]`        |
| variant       | 变体           | `'default' \| 'outline'`      | `'default'` |
| size          | 尺寸           | `'sm' \| 'md' \| 'lg'`        | `'md'`      |
| onValueChange | 值变化回调     | `(value: string[]) => void`   | -           |

ToggleGroup 支持所有原生 `<div>` 元素的属性，并支持 `ref` 转发。
