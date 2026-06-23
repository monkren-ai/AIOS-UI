---
nav: Components
group:
  title: Data Display
  order: 3
title: ProgressBar
description: 分段式进度条，支持状态色与不确定模式
---

## 介绍

ProgressBar 是 Nothing 风格的分段式进度条，特点：

- 分段填充动画，模拟点阵显示效果
- 支持 hero / standard / compact / slim 四种尺寸
- 支持 good / warning / overlimit / error 状态色
- 支持不确定模式（indeterminate）与禁用态

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性          | 说明         | 类型                                                          | 默认值       |
| ------------- | ------------ | ------------------------------------------------------------- | ------------ |
| value         | 当前值       | `number`                                                      | -            |
| total         | 总量         | `number`                                                      | `100`        |
| segments      | 分段数       | `number`                                                      | `20`         |
| size          | 尺寸         | `'hero' \| 'standard' \| 'compact'`                           | `'standard'` |
| variant       | 变体         | `'default' \| 'slim'`                                         | `'default'`  |
| status        | 状态色       | `'default' \| 'good' \| 'warning' \| 'overlimit' \| 'error'`  | `'default'`  |
| indeterminate | 不确定模式   | `boolean`                                                     | `false`      |
| disabled      | 是否禁用     | `boolean`                                                     | `false`      |
| label         | 标签文案     | `string`                                                      | -            |
| unit          | 单位         | `string`                                                      | -            |
| showReadout   | 显示读数     | `boolean`                                                     | `true`       |

此外，ProgressBar 支持所有原生 `<div>` 元素的属性。
