---
nav: Components
group:
  title: Menus
  order: 3
title: Command
description: Nothing 风格命令面板，支持搜索过滤与分组
---

## 介绍

Command 是命令面板组件，提供搜索输入与分组命令列表。

- 输入即过滤，支持分组展示
- 支持键盘导航（ArrowUp/ArrowDown/Enter/Escape）
- 支持受控与非受控的打开状态
- 支持快捷键与图标展示

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明           | 类型                          | 默认值                |
| ------------- | -------------- | ----------------------------- | --------------------- |
| groups        | 命令分组列表   | `CommandGroup[]`              | -                     |
| placeholder   | 输入框占位文本 | `string`                      | `'Type a command...'` |
| emptyMessage  | 空结果提示     | `string`                      | `'No results found.'` |
| open          | 是否打开       | `boolean`                     | -                     |
| onOpenChange  | 打开状态回调   | `(open: boolean) => void`     | -                     |

### CommandGroup

| 属性    | 说明         | 类型             | 默认值 |
| ------- | ------------ | ---------------- | ------ |
| heading | 分组标题     | `string`         | -      |
| items   | 命令项列表   | `CommandItem[]`  | -      |

### CommandItem

| 属性     | 说明       | 类型         | 默认值  |
| -------- | ---------- | ------------ | ------- |
| id       | 唯一标识   | `string`     | -       |
| label    | 标签       | `string`     | -       |
| shortcut | 快捷键文本 | `string`     | -       |
| icon     | 图标       | `ReactNode`  | -       |
| onSelect | 选中回调   | `() => void` | -       |
| disabled | 是否禁用   | `boolean`    | `false` |

此外，Command 支持所有原生 `<div>` 元素的属性。
