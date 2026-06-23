---
nav: Components
group:
  title: Navigation
  order: 5
title: Pagination
description: Nothing 风格分页导航，支持省略号与键盘导航
---

## 介绍

Pagination 是分页导航组件，用于在多页内容间切换。当页数较多时自动显示省略号（`…`），保留首尾页与当前页附近的兄弟页。

- 支持上一页/下一页按钮
- `siblingCount` 控制当前页两侧显示的页数
- 支持键盘 ArrowLeft/ArrowRight 翻页
- `totalPages <= 1` 时不渲染

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明                   | 类型                       | 默认值 |
| ------------- | ---------------------- | -------------------------- | ------ |
| page          | 当前页码（受控）       | `number`                   | -      |
| totalPages    | 总页数                 | `number`                   | -      |
| onPageChange  | 页码变化回调           | `(page: number) => void`   | -      |
| siblingCount  | 当前页两侧兄弟页数量   | `number`                   | `1`    |
