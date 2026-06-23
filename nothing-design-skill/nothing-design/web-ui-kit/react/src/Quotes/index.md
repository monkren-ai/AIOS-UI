---
nav: Components
group:
  title: Data Display
  order: 8
title: Quotes
description: 圆形引言组件，自动轮播名言
---

## 介绍

Quotes 是 Nothing 风格的圆形引言组件，特点：

- 圆形外观，内嵌双圈 SVG 装饰
- 自动轮播名言，支持自定义 `quotes` 与 `interval`
- 支持 `light` / `dark` 两种主题与 `sm` / `md` / `lg` 三种尺寸
- 内置默认名言集，未传入 `quotes` 时使用

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                       | 默认值   |
| -------- | ---------- | -------------------------- | -------- |
| theme    | 主题       | `'light' \| 'dark'`        | `'dark'` |
| size     | 尺寸       | `'sm' \| 'md' \| 'lg'`     | `'md'`   |
| quotes   | 名言列表   | `QuoteData[]`              | 内置集   |
| interval | 轮播间隔   | `number`                   | `30000`  |

### QuoteData

| 属性   | 说明   | 类型     |
| ------ | ------ | -------- |
| text   | 名言   | `string` |
| author | 作者   | `string` |

此外，Quotes 支持所有原生 `<div>` 元素的属性。
