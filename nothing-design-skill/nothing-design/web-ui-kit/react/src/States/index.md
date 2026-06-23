---
nav: Components
group:
  title: Feedback
  order: 1
title: States
description: Nothing 风格状态展示组件，包含加载、错误、空状态和禁用状态
---

## 介绍

States 是一组状态展示组件，用于在数据加载、出错、空数据等场景下向用户反馈当前状态。

- `LoadingState`：加载状态，支持进度条和标签
- `ErrorState`：错误状态，支持重试按钮
- `EmptyState`：空状态，支持自定义操作
- `DisabledState`：禁用状态

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### LoadingState

| 属性           | 说明         | 类型                  | 默认值  |
| -------------- | ------------ | --------------------- | ------- |
| progress       | 进度百分比   | `number`             | -       |
| totalSegments  | 进度条段数   | `number`             | `20`    |
| label          | 标签文字     | `string`             | -       |
| size           | 尺寸         | `'sm' \| 'md' \| 'lg'` | `'md'`  |

### ErrorState

| 属性      | 说明       | 类型                  | 默认值  |
| --------- | ---------- | --------------------- | ------- |
| headline  | 标题       | `string`             | -       |
| message   | 描述信息   | `string`             | -       |
| prefix    | 前缀       | `string`             | -       |
| onRetry   | 重试回调   | `() => void`         | -       |
| size      | 尺寸       | `'sm' \| 'md' \| 'lg'` | `'md'`  |

### EmptyState

| 属性         | 说明       | 类型                  | 默认值           |
| ------------ | ---------- | --------------------- | ---------------- |
| headline     | 标题       | `string`             | `'Nothing here'` |
| description  | 描述信息   | `string`             | -                |
| action       | 自定义操作 | `ReactNode`          | -                |
| size         | 尺寸       | `'sm' \| 'md' \| 'lg'` | `'md'`           |

### DisabledState

| 属性         | 说明       | 类型                  | 默认值          |
| ------------ | ---------- | --------------------- | --------------- |
| headline     | 标题       | `string`             | `'Unavailable'` |
| description  | 描述信息   | `string`             | -               |
| size         | 尺寸       | `'sm' \| 'md' \| 'lg'` | `'md'`          |
