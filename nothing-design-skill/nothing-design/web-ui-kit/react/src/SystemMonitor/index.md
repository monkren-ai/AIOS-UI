---
nav: Components
group:
  title: Widgets
  order: 1
title: SystemMonitor
description: Nothing 风格系统监控组件，展示 CPU/RAM/存储/网络/电池状态
---

## 介绍

SystemMonitor 是一个系统状态监控组件，以分段进度条形式展示：

- CPU 使用率
- 内存（RAM）使用率与总量
- 存储（Storage）使用率与总量
- 网络连接状态与速度
- 电池电量与充电状态

支持 `default` / `compact` / `detailed` 三种变体与 `sm` / `md` / `lg` 三种尺寸。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性             | 说明           | 类型                                  | 默认值      |
| ---------------- | -------------- | ------------------------------------- | ----------- |
| variant          | 变体           | `'default' \| 'compact' \| 'detailed'`| `'default'` |
| size             | 尺寸           | `'sm' \| 'md' \| 'lg'`                | `'md'`      |
| updateInterval   | 更新间隔(ms)   | `number`                              | `2000`      |
| totalSegments    | 分段数量       | `number`                              | `12`        |
| cpuPercent       | CPU 使用率     | `number`                              | -           |
| ramPercent       | 内存使用率     | `number`                              | -           |
| ramTotal         | 内存总量(GB)   | `number`                              | `8`         |
| storagePercent   | 存储使用率     | `number`                              | -           |
| storageTotal     | 存储总量(GB)   | `number`                              | `256`       |
| netConnected     | 网络是否连接   | `boolean`                             | -           |
| netSpeed         | 网络速度(MB/s) | `number`                              | -           |
| batteryPercent   | 电池百分比     | `number`                              | -           |
| batteryCharging  | 是否充电中     | `boolean`                             | -           |
