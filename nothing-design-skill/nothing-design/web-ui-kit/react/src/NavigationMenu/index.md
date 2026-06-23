---
nav: Components
group:
  title: Navigation
  order: 6
title: NavigationMenu
description: Nothing 风格导航菜单，支持水平/垂直方向与子菜单
---

## 介绍

NavigationMenu 是带子菜单的导航菜单组件，支持水平（`horizontal`）与垂直（`vertical`）两种方向。

- 支持多级子菜单（dropdown）
- 点击外部自动关闭子菜单
- 完整的键盘导航（Arrow/Home/End/Enter/Escape）
- 激活项高亮，有子菜单的项显示下拉箭头

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### NavigationMenu

| 属性        | 说明         | 类型                              | 默认值         |
| ----------- | ------------ | --------------------------------- | -------------- |
| items       | 菜单项列表   | `NavMenuItem[]`                   | -              |
| orientation | 方向         | `'horizontal' \| 'vertical'`      | `'horizontal'` |

### NavMenuItem

| 属性     | 说明           | 类型           | 默认值  |
| -------- | -------------- | -------------- | ------- |
| label    | 菜单项文本     | `string`       | -       |
| href     | 链接地址       | `string`       | -       |
| onClick  | 点击回调       | `() => void`   | -       |
| children | 子菜单项       | `NavMenuItem[]`| -       |
| active   | 是否激活       | `boolean`      | `false` |
