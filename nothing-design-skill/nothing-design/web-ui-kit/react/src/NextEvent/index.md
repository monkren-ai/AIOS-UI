---
nav: Components
group:
  title: Date & Time
  order: 1
title: NextEvent
description: Nothing 风格下一个事件组件，自动倒计时并按紧急程度高亮
---

## 介绍

NextEvent 是 Nothing 风格的下一个事件组件：

- 支持传入单个 `event` 或事件数组 `events`，自动选择最近一个未到期事件
- 未传入事件时使用内置 demo 数据，并以 `SIM` 标记
- 自动倒计时，24 小时内的事件标记为 `high` 优先级（红色高亮）
- 支持 `light` / `dark` 两种主题

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明                       | 类型                          | 默认值    |
| -------- | -------------------------- | ----------------------------- | --------- |
| event    | 单个事件（优先于 events） | `EventData`                  | -         |
| events   | 事件数组                   | `EventData[]`                 | -         |
| priority | 优先级                     | `'low' \| 'normal' \| 'high'` | 自动判断  |
| theme    | 主题                       | `'light' \| 'dark'`           | `'dark'`  |

### EventData

| 属性   | 说明             | 类型     |
| ------ | ---------------- | -------- |
| title  | 事件标题         | `string` |
| date   | Unix 时间戳（毫秒）| `number` |
| month  | 月份（可选）     | `string` |

此外，NextEvent 支持所有原生 `<div>` 元素的属性。
