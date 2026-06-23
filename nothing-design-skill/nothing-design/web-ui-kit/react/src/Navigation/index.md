---
nav: Components
group:
  title: Navigation
  order: 1
title: Navigation
description: Nothing 风格导航，支持 default/bracket/pipe 三种变体与 URL hash 同步
---

## 介绍

Navigation 是顶部/底部导航组件，提供 3 种视觉变体：

- `default`：默认样式，激活项下方显示圆点
- `bracket`：激活项两侧显示 `[ ]` 方括号
- `pipe`：项之间使用 `|` 分隔符

支持与 URL hash 双向同步，便于锚点跳转。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性            | 说明                | 类型                                  | 默认值      |
| --------------- | ------------------- | ------------------------------------- | ----------- |
| items           | 导航项列表           | `NavItem[]`                           | -           |
| activeIndex     | 受控激活索引         | `number`                              | `undefined` |
| variant         | 导航变体            | `'default' \| 'bracket' \| 'pipe'`    | `'default'` |
| showBack        | 是否显示返回按钮     | `boolean`                             | `false`     |
| onBack          | 返回按钮回调         | `() => void`                          | -           |
| onChange        | 激活项变化回调       | `(index: number) => void`             | -           |
| syncWithUrl     | 是否与 URL hash 同步 | `boolean`                             | `true`      |
| scrollIntoView  | hash 改变时是否滚动  | `boolean`                             | `false`     |

### NavItem

| 属性   | 说明                       | 类型              | 默认值 |
| ------ | -------------------------- | ----------------- | ------ |
| label  | 导航项文本                 | `string`          | -      |
| icon   | 导航项图标                 | `ReactNode`       | -      |
| slug   | URL hash 锚点，默认由 label 生成 | `string`     | -      |
