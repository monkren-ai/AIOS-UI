---
nav: Components
group:
  title: Navigation
  order: 1
title: Taskbar
description: Nothing 风格任务栏，支持应用图标、搜索、时间和电量显示
---

## 介绍

Taskbar 是模拟桌面系统任务栏的组件，提供开始按钮、搜索框、应用图标区和系统托盘（音量、电量、时间）。

- 支持明暗两种主题（light/dark）
- 支持固定定位（fixed）与内联（inline）
- 自动读取系统电量与时间

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性        | 说明         | 类型                          | 默认值     |
| ----------- | ------------ | ----------------------------- | ---------- |
| theme       | 主题         | `'light' \| 'dark'`           | `'dark'`   |
| fixed       | 是否固定定位 | `boolean`                     | `false`    |
| apps        | 应用列表     | `TaskbarApp[]`                | `[]`       |
| showSearch  | 显示搜索框   | `boolean`                     | `true`     |
| showTime    | 显示时间     | `boolean`                     | `true`     |
| showBattery | 显示电量     | `boolean`                     | `true`     |

### TaskbarApp

| 属性    | 说明       | 类型         | 默认值 |
| ------- | ---------- | ------------ | ------ |
| name    | 应用名称   | `string`     | -      |
| icon    | 应用图标   | `string`     | -      |
| onClick | 点击回调   | `() => void` | -      |

此外，Taskbar 支持所有原生 `<div>` 元素的属性。
