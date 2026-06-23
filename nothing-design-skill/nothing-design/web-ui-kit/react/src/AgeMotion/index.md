---
nav: Components
group:
  title: Date & Time
  order: 1
title: AgeMotion
description: Nothing 风格年龄进度组件，可视化人生与年度进度
---

## 介绍

AgeMotion 是 Nothing 风格的年龄进度组件：

- 输入出生日期后实时计算年龄（年/月/日）及累计小时/分钟/秒
- 以 10 年为一段绘制人生进度条，当前段以黄色填充
- 显示当年进度条与百分比
- 三种尺寸 `sm` / `md` / `lg`，两种主题 `light` / `dark`

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明                 | 类型                  | 默认值    |
| -------------- | -------------------- | --------------------- | --------- |
| birthDate      | 出生日期（YYYY-MM-DD）| `string`              | -         |
| lifespan       | 预期寿命             | `number`              | `80`      |
| updateInterval | 更新间隔（毫秒）    | `number`              | `1000`    |
| yearSegments   | 年度进度段数         | `number`              | `20`      |
| size           | 尺寸                 | `'sm' \| 'md' \| 'lg'`| `'md'`    |
| theme          | 主题                 | `'light' \| 'dark'`   | `'dark'`  |

此外，AgeMotion 支持所有原生 `<div>` 元素的属性。
