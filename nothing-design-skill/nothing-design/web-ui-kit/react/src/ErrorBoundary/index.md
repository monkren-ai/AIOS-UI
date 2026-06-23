---
nav: Components
group:
  title: Feedback
  order: 1
title: ErrorBoundary
description: Nothing 风格错误边界，捕获子组件渲染错误并展示降级 UI
---

## 介绍

ErrorBoundary 是一个错误边界组件，用于捕获子组件树中的 JavaScript 错误，展示降级 UI 而非白屏崩溃。

- 自动捕获子组件渲染错误
- 支持自定义 fallback UI
- 默认展示 Nothing 风格的错误页面，带 Reload 按钮

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| children | 子元素         | `ReactNode`  | -      |
| fallback | 自定义降级 UI  | `ReactNode`  | -      |
