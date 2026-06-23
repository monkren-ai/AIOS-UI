---
nav: Components
group:
  title: Widgets
  order: 1
title: Caffeinate
description: Nothing 风格咖啡因追踪组件，记录摄入并计算衰减
---

## 介绍

Caffeinate 是一个咖啡因摄入追踪组件：

- 记录饮品摄入（Espresso / Coffee / Tea / Energy）
- 基于半衰期实时计算当前体内咖啡因含量
- 显示距离降至阈值以下的时间
- 状态分三档：`low` / `medium` / `high`
- 支持禁用状态（`disabled`）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性             | 说明           | 类型                              | 默认值  |
| ---------------- | -------------- | --------------------------------- | ------- |
| status           | 状态           | `'low' \| 'medium' \| 'high'`     | `'low'` |
| disabled         | 是否禁用       | `boolean`                         | `false` |
| maxCaffeine      | 最大值(mg)     | `number`                          | `400`   |
| halfLifeMinutes  | 半衰期(分钟)   | `number`                          | `300`   |
| thresholdMg      | 阈值(mg)       | `number`                          | `50`    |
| totalSegments    | 分段数量       | `number`                          | `10`    |
| updateInterval   | 更新间隔(ms)   | `number`                          | `60000` |
