---
nav: Components
group:
  title: Navigation
  order: 3
title: Collapsible
description: Nothing 风格折叠容器，支持受控与非受控展开
---

## 介绍

Collapsible 是可折叠的内容容器，点击触发器展开/收起内容。

- 支持受控（`open`）与非受控（`defaultOpen`）模式
- 支持自定义触发器内容
- 平滑的展开/收起动画

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明         | 类型                       | 默认值  |
| ------------- | ------------ | -------------------------- | ------- |
| open          | 是否展开     | `boolean`                  | -       |
| defaultOpen   | 默认是否展开 | `boolean`                  | `false` |
| onOpenChange  | 展开状态回调 | `(open: boolean) => void`  | -       |
| trigger       | 触发器内容   | `ReactNode`                | -       |
| children      | 折叠内容     | `ReactNode`                | -       |

此外，Collapsible 支持所有原生 `<div>` 元素的属性。
