---
nav: Components
group:
  title: Menus
  order: 2
title: DropdownMenu
description: Nothing 风格下拉菜单，支持默认与菜单栏两种变体
---

## 介绍

DropdownMenu 是点击触发的下拉菜单，支持两种变体：

- `default`：点击触发器展开下拉列表，支持 start/center/end 对齐
- `menubar`：水平菜单栏，每个触发器下挂子菜单

两种变体均支持键盘导航、分隔符、禁用项与快捷键展示。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                                  | 默认值      |
| -------- | ---------- | ------------------------------------- | ----------- |
| trigger  | 触发内容   | `ReactNode`                           | -           |
| items    | 菜单项列表 | `DropdownMenuItem[] \| MenubarItem[]` | -           |
| align    | 对齐方式   | `'start' \| 'center' \| 'end'`        | `'start'`   |
| side     | 弹出方向   | `OverlaySide`                         | `'bottom'`  |
| variant  | 变体       | `'default' \| 'menubar'`              | `'default'` |

### DropdownMenuItem

| 属性      | 说明       | 类型         | 默认值  |
| --------- | ---------- | ------------ | ------- |
| label     | 菜单项标签 | `string`     | -       |
| onClick   | 点击回调   | `() => void` | -       |
| disabled  | 是否禁用   | `boolean`    | `false` |
| separator | 是否分隔符 | `boolean`    | `false` |
| shortcut  | 快捷键文本 | `string`     | -       |
| icon      | 图标       | `ReactNode`  | -       |

### MenubarItem

| 属性   | 说明         | 类型                 | 默认值 |
| ------ | ------------ | -------------------- | ------ |
| label  | 菜单栏标签   | `string`             | -      |
| items  | 子菜单项列表 | `DropdownMenuItem[]` | -      |

此外，DropdownMenu 支持所有原生 `<div>` 元素的属性。
