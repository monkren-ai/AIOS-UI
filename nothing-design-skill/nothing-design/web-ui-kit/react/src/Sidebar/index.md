---
nav: Components
group:
  title: Navigation
  order: 7
title: Sidebar
description: Nothing 风格侧边栏，支持折叠与徽标
---

## 介绍

Sidebar 是侧边栏导航组件，常用于应用左侧主导航。支持折叠/展开、自定义头部与底部、徽标显示。

- 支持受控（`collapsed`）与非受控两种模式
- 折叠后仅显示图标，悬停显示 `title` 提示
- 激活项高亮，支持 `badge` 徽标
- 可自定义 `header` 与 `footer` 插槽

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Sidebar

| 属性              | 说明             | 类型                              | 默认值      |
| ----------------- | ---------------- | --------------------------------- | ----------- |
| items             | 侧边栏项列表     | `SidebarItem[]`                   | -           |
| collapsed         | 受控折叠状态     | `boolean`                         | `undefined` |
| onCollapsedChange | 折叠状态变化回调 | `(collapsed: boolean) => void`    | -           |
| header            | 头部内容         | `ReactNode`                       | -           |
| footer            | 底部内容         | `ReactNode`                       | -           |

### SidebarItem

| 属性     | 说明       | 类型               | 默认值  |
| -------- | ---------- | ------------------ | ------- |
| icon     | 图标       | `ReactNode`        | -       |
| label    | 文本       | `string`           | -       |
| href     | 链接地址   | `string`           | -       |
| onClick  | 点击回调   | `() => void`       | -       |
| active   | 是否激活   | `boolean`          | `false` |
| badge    | 徽标内容   | `string \| number` | -       |
