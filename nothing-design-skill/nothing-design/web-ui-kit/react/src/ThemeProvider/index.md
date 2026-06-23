---
nav: Providers
group:
  title: Providers
  order: -1
title: ThemeProvider
description: 明暗主题管理，通过 data-theme 属性切换并持久化到 localStorage
---

## 介绍

ThemeProvider 管理 Nothing UI 的明暗主题。

- 通过 `data-theme` 属性切换主题（与 `tokens.css` 的 `[data-theme="dark"]` 选择器协同）
- 持久化到 `localStorage`（key: `nothing-theme`）
- 默认主题为 `dark`（与 Nothing 设计语言一致）
- 子组件通过 `useTheme` 读取当前主题与切换方法

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### ThemeProviderProps

| 属性           | 说明         | 类型                | 默认值    |
| -------------- | ------------ | ------------------- | --------- |
| children       | 子节点       | `ReactNode`         | -         |
| defaultTheme   | 默认主题     | `'light' \| 'dark'` | `'dark'`  |
| onThemeChange  | 主题变化回调 | `(theme: ThemeAppearance) => void` | - |

### ThemeAppearance

| 值       | 说明     |
| -------- | -------- |
| `light`  | 亮色主题 |
| `dark`   | 暗色主题 |

### useTheme 返回值（ThemeContextValue）

| 属性        | 说明             | 类型                          |
| ----------- | ---------------- | ----------------------------- |
| theme       | 当前主题外观     | `'light' \| 'dark'`           |
| isDarkMode  | 是否暗色模式     | `boolean`                     |
| setTheme    | 设置主题         | `(theme: ThemeAppearance) => void` |
| toggleTheme | 切换主题         | `() => void`                  |
