---
nav: Components
group:
  title: Date & Time
  order: 1
title: SunDial
description: Nothing 风格日晷，根据经纬度计算日出日落并显示剩余日照时长
---

## 介绍

SunDial 是 Nothing 风格的日晷组件，基于经纬度计算日出与日落时间，并以弧线展示太阳轨迹：

- 自动获取地理位置（可通过 `latitude` / `longitude` 手动指定）
- 实时显示当前时间与剩余日照/夜晚时长
- 支持 `day` / `night` 与 `light` / `dark` 主题切换

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性           | 说明                 | 类型                  | 默认值    |
| -------------- | -------------------- | --------------------- | --------- |
| latitude       | 纬度                 | `number`              | -         |
| longitude      | 经度                 | `number`              | -         |
| updateInterval | 更新间隔（毫秒）    | `number`              | `60000`   |
| time           | 强制昼夜状态         | `'day' \| 'night'`    | 自动判断  |
| theme          | 主题                 | `'light' \| 'dark'`   | `'dark'`  |

此外，SunDial 支持所有原生 `<div>` 元素的属性。
