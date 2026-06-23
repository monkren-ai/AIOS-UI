---
nav: Components
group:
  title: Navigation
  order: 2
title: DateNav
description: Nothing 风格日期导航，左右箭头切换月份
---

## 介绍

DateNav 是日期/月份导航组件，由左右箭头按钮与中间标签组成。支持受控与非受控两种模式，默认显示当前月份。

- 不传 `label` 时，自动从 `currentDate` 派生 `Month YYYY` 文本
- 传入 `label` 时，显示自定义文本
- `grotesk` 切换为 Space Grotesk 字体（默认 Doto 等宽字体）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明                          | 类型                       | 默认值      |
| -------------- | ----------------------------- | -------------------------- | ----------- |
| label          | 自定义显示文本                | `string`                   | 派生自日期   |
| prevDisabled   | 禁用上一项按钮                | `boolean`                  | `false`     |
| nextDisabled   | 禁用下一项按钮                | `boolean`                  | `false`     |
| grotesk        | 使用 Space Grotesk 字体       | `boolean`                  | `false`     |
| disabled       | 整体禁用                      | `boolean`                  | `false`     |
| onPrev         | 上一项回调                    | `() => void`               | -           |
| onNext         | 下一项回调                    | `() => void`               | -           |
| initialDate    | 非受控初始日期                | `Date`                     | `new Date()`|
| currentDate     | 受控当前日期                  | `Date`                     | -           |
| onDateChange   | 日期变化回调（非受控模式）    | `(date: Date) => void`     | -           |
