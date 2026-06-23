---
nav: Components
group:
  title: Widgets
  order: 1
title: PhotoCarousel
description: Nothing 风格照片轮播组件，支持自动播放与方向切换
---

## 介绍

PhotoCarousel 是一个照片/幻灯片轮播组件：

- 支持渐变色背景或图片 URL 作为幻灯片内容
- 支持自动播放（`autoplay`）与播放间隔（`autoPlayInterval`）
- 支持水平/垂直方向（`orientation`）
- 内置上一张/下一张导航与指示器

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性             | 说明           | 类型                              | 默认值      |
| ---------------- | -------------- | --------------------------------- | ----------- |
| orientation      | 方向           | `'horizontal' \| 'vertical'`     | `'horizontal'` |
| autoPlay         | 自动播放       | `boolean`                         | `true`      |
| autoplay         | 自动播放(别名) | `boolean`                         | -           |
| autoPlayInterval | 切换间隔(ms)   | `number`                          | `4000`      |
| slides           | 幻灯片列表     | `Slide[]`                         | 内置示例    |

### Slide

| 属性      | 说明                | 类型     |
| --------- | ------------------- | -------- |
| title     | 标题                | `string` |
| subtitle  | 副标题              | `string` |
| gradient  | CSS 渐变背景        | `string` |
| image     | 图片 URL（优先于 gradient） | `string` |
