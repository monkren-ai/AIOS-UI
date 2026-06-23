---
nav: Components
group:
  title: Menus
  order: 1
title: ContextMenu
description: Nothing 风格右键上下文菜单，支持快捷键与分隔符
---

## 介绍

ContextMenu 是右键触发的上下文菜单，在鼠标位置弹出选项列表。

- 右键触发，点击外部或按 Escape 关闭
- 支持键盘导航（ArrowUp/ArrowDown/Enter）
- 支持分隔符与禁用项
- 支持快捷键展示

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明         | 类型                  | 默认值 |
| -------- | ------------ | --------------------- | ------ |
| items    | 菜单项列表   | `ContextMenuItem[]`   | -      |
| children | 触发元素     | `ReactElement`        | -      |

### ContextMenuItem

| 属性      | 说明       | 类型         | 默认值  |
| --------- | ---------- | ------------ | ------- |
| label     | 菜单项标签 | `string`     | -       |
| onClick   | 点击回调   | `() => void` | -       |
| disabled  | 是否禁用   | `boolean`    | `false` |
| separator | 是否分隔符 | `boolean`    | `false` |
| shortcut  | 快捷键文本 | `string`     | -       |

此外，ContextMenu 支持所有原生 `<div>` 元素的属性。
