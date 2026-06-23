---
nav: Components
group:
  title: Widgets
  order: 1
title: Pomodoro
description: Nothing 风格番茄钟组件，支持工作/休息循环
---

## 介绍

Pomodoro 是一个番茄钟计时组件：

- 工作（`work`）与休息（`break`）两阶段循环
- 分段进度条可视化剩余时间
- 工作阶段使用红色（`accent`），休息阶段使用绿色（`success`）
- 内置 Start/Pause 与 Reset 控制

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性            | 说明          | 类型                  | 默认值  |
| --------------- | ------------- | --------------------- | ------- |
| phase           | 阶段          | `'work' \| 'break'`   | `'work'`|
| running         | 是否运行中    | `boolean`             | `false` |
| workMinutes     | 工作时长(分)  | `number`              | `25`    |
| breakMinutes    | 休息时长(分)  | `number`              | `5`     |
| totalSegments    | 分段数量      | `number`              | `25`    |
| updateInterval  | 更新间隔(ms)  | `number`              | `1000`  |
