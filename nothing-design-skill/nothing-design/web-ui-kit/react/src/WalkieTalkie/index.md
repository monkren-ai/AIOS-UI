---
nav: Components
group:
  title: Widgets
  order: 1
title: WalkieTalkie
description: Nothing 风格对讲机组件，支持按住说话与频道切换
---

## 介绍

WalkieTalkie 是一个对讲机风格组件：

- 频道切换（`channel` / `minChannel` / `maxChannel`）
- 按住 PTT 按钮发射，松开结束（`READY` → `TRANSMITTING` → `SENT`）
- 发射时显示脉冲动画
- 音量分段指示（`volumeSegments` / `volumeLevel`）
- 状态可受控（`status`）

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性            | 说明           | 类型                                        | 默认值  |
| --------------- | -------------- | ------------------------------------------- | ------- |
| status          | 状态           | `'ready' \| 'transmitting' \| 'sent'`       | `'ready'` |
| channel         | 当前频道       | `number`                                    | `1`     |
| minChannel      | 最小频道       | `number`                                    | `1`     |
| maxChannel      | 最大频道       | `number`                                    | `22`    |
| volumeSegments  | 音量分段数     | `number`                                    | `5`     |
| volumeLevel     | 音量等级       | `number`                                    | `3`     |
