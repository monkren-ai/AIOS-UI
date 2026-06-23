---
nav: Components
group:
  title: Navigation
  order: 4
title: Breadcrumb
description: Nothing 风格面包屑导航，展示当前页面层级路径
---

## 介绍

Breadcrumb 是面包屑导航组件，用于展示当前页面在层级结构中的位置。最后一项为当前页（不可点击），其余项可配置为链接、按钮或纯文本。

- 支持 `href` 链接、`onClick` 按钮与纯文本三种交互方式
- 自定义分隔符（默认 `/`）
- 最后一项自动添加 `aria-current="page"`

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### Breadcrumb

| 属性       | 说明         | 类型               | 默认值 |
| ---------- | ------------ | ------------------ | ------ |
| items      | 面包屑项列表 | `BreadcrumbItem[]` | -      |
| separator | 分隔符       | `string`           | `'/'`  |

### BreadcrumbItem

| 属性     | 说明             | 类型         | 默认值 |
| -------- | ---------------- | ------------ | ------ |
| label    | 文本             | `string`     | -      |
| href     | 链接地址         | `string`     | -      |
| onClick  | 点击回调（按钮） | `() => void` | -      |
