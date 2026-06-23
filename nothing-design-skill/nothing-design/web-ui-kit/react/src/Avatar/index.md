---
nav: Components
group:
  title: Data Display
  order: 5
title: Avatar
description: 头像组件，支持图片与文字回退
---

## 介绍

Avatar 用于展示用户头像，特点：

- 支持 `sm` / `md` / `lg` 三种尺寸
- 支持图片源（`src`），加载失败时回退到文字（`fallback`）
- 支持 `asChild` 模式，将头像行为合并到子元素上

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性      | 说明           | 类型                       | 默认值  |
| --------- | -------------- | -------------------------- | ------- |
| size      | 尺寸           | `'sm' \| 'md' \| 'lg'`     | `'md'`  |
| asChild   | 合并到子元素   | `boolean`                  | `false` |
| src       | 图片地址       | `string`                   | -       |
| alt       | 替代文本       | `string`                   | `''`    |
| fallback  | 回退文字       | `string`                   | -       |

此外，Avatar 支持所有原生 `<div>` 元素的属性。
