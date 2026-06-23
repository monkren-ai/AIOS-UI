---
nav: Components
group:
  title: Widgets
  order: 1
title: Battery
description: Nothing 风格电池组件，支持分段/环形两种变体与设备列表
---

## 介绍

Battery 是一个电池状态展示组件，支持两种视觉变体：

- `segmented`：分段进度条样式（默认）
- `ring`：环形进度样式

同时支持 `widgetMode`（`none` / `card` / `ring`）用于小部件卡片场景，并可展示蓝牙设备电量列表。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明             | 类型                                              | 默认值        |
| -------------- | ---------------- | ------------------------------------------------- | ------------- |
| variant        | 视觉变体         | `'segmented' \| 'ring'`                           | `'segmented'`|
| theme          | 主题             | `'light' \| 'dark'`                               | `'dark'`      |
| percent        | 电量百分比       | `number`                                          | -             |
| isCharging     | 是否充电中       | `boolean`                                         | `false`       |
| widgetMode     | 小部件模式       | `'none' \| 'card' \| 'ring'`                      | `'none'`      |
| totalSegments  | 分段数量         | `number`                                          | `10`          |
| updateInterval | 更新间隔(ms)     | `number`                                          | `5000`        |
| devices        | 蓝牙设备列表     | `BatteryDevice[]`                                 | -             |
| onDeviceClick  | 设备点击回调     | `(device: BatteryDevice) => void`                 | -             |

### BatteryDevice

| 属性       | 说明         | 类型                                            |
| ---------- | ------------ | ----------------------------------------------- |
| name       | 设备名称     | `string`                                        |
| type       | 设备类型     | `'mouse' \| 'keyboard' \| 'earbuds' \| 'phone' \| 'watch'` |
| percent    | 电量百分比   | `number`                                        |
| isCharging | 是否充电中   | `boolean`                                       |
