---
nav: Components
group:
  title: Layout
  order: 5
title: OverlayPortal
description: 浮层原语集合，Modal/Sheet/Popover 等组件的共享底层
---

## 介绍

OverlayPortal 是 6 个 overlay 组件（Modal / Sheet / HoverCard / Popover / ContextMenu / DropdownMenu）共享的原语集合，提供：

- `useOverlayState`：受控/非受控开关状态
- `useEscapeKey`：Escape 键监听
- `useScrollLock`：body 滚动锁
- `useFocusTrap`：焦点陷阱
- `useTabCycle`：Tab 循环焦点
- `OverlayPortal`：createPortal 包装
- `useOverlayClickOutside`：容器外点击关闭

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### OverlayPortal

| 属性      | 说明           | 类型              | 默认值 |
| --------- | -------------- | ----------------- | ------ |
| open      | 是否渲染内容   | `boolean`         | -      |
| container | 自定义容器     | `HTMLElement`     | `document.body` |
| ssrGuard  | SSR 安全守卫   | `boolean`         | `true` |
