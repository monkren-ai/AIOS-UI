---
nav: Providers
group:
  title: Providers
  order: -1
title: MotionProvider
description: 动画组件注入提供者，支持完整版与 LazyMotion 精简版
---

## 介绍

MotionProvider 为子组件注入 motion 实现。

- 默认使用 `motion/react`（完整版，体积较大）
- 若应用使用 `LazyMotion`，应传入 `motion/react-m`（精简版）
- 子组件通过 `useMotionComponent` 获取注入的 motion 组件集合，避免直接依赖

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### MotionProviderProps

| 属性     | 说明             | 类型                  | 默认值          |
| -------- | ---------------- | --------------------- | --------------- |
| children | 子节点           | `ReactNode`           | -               |
| motion   | Motion 组件集合  | `MotionComponentType` | `motion/react`  |

### Hooks

| Hook              | 说明                       | 返回值               |
| ----------------- | -------------------------- | -------------------- |
| useMotionComponent | 获取注入的 motion 组件集合 | `MotionComponentType` |
