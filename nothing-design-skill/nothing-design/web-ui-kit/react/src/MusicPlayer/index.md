---
nav: Components
group:
  title: Widgets
  order: 1
title: MusicPlayer
description: Nothing 风格音乐播放器，支持 default/compact/mini 三种变体
---

## 介绍

MusicPlayer 是一个音乐播放器组件，支持三种视觉变体：

- `default`：完整播放器（专辑封面、进度条、控制按钮）
- `compact`：紧凑播放器（专辑缩略图 + 进度条）
- `mini`：迷你小部件卡片样式

内置播放/暂停、上一首/下一首控制，并支持录音指示器（`BlinkingSeparator`）。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性                   | 说明             | 类型                                  | 默认值      |
| ---------------------- | ---------------- | ------------------------------------- | ----------- |
| variant                | 变体             | `'default' \| 'compact' \| 'mini'`    | `'default'` |
| theme                  | 主题(mini)       | `'light' \| 'dark'`                   | `'dark'`    |
| size                   | 尺寸(mini)       | `'small' \| 'medium' \| 'large'`      | `'medium'`  |
| tracks                 | 曲目列表         | `Track[]`                             | 内置示例    |
| totalSegments          | 进度分段数量     | `number`                              | `20`        |
| updateInterval         | 更新间隔(ms)     | `number`                              | `1000`      |
| showRecordingIndicator | 显示录音指示器   | `boolean`                             | `false`     |
| recording              | 是否录音中       | `boolean`                             | `false`     |
| sourceIcon             | 来源图标         | `ReactNode`                           | -           |

### Track

| 属性     | 说明       | 类型     |
| -------- | ---------- | -------- |
| title    | 曲目标题   | `string` |
| artist   | 艺术家     | `string` |
| duration | 时长(秒)   | `number` |
