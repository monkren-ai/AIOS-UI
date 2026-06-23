---
nav: Providers
group:
  title: Providers
  order: -1
title: ConfigProvider
description: 全局配置提供者，集成主题、动画和自定义元素配置
---

## 介绍

ConfigProvider 是 Nothing UI 的顶层全局配置 Provider，一站式集成三大能力：

- **ThemeProvider**：明暗主题管理（`data-theme` 属性 + `localStorage` 持久化）
- **MotionProvider**：动画组件注入（`motion/react` 或 `motion/react-m`）
- **ConfigContext**：CDN 代理、自定义 `<a>` / `<img>` 元素等全局配置

在应用根部包裹一次即可，子组件通过 `useConfig`、`useCdnFn`、`useTheme`、`useMotionComponent` 等 hook 读取上下文。

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

### ConfigProviderProps

| 属性           | 说明                 | 类型                | 默认值    |
| -------------- | -------------------- | ------------------- | --------- |
| children       | 子节点               | `ReactNode`         | -         |
| config         | 全局配置             | `Config`            | -         |
| defaultTheme   | 默认主题             | `'light' \| 'dark'` | `'dark'`  |
| onThemeChange  | 主题变化回调         | `(theme: ThemeAppearance) => void` | - |
| motion         | Motion 组件集合      | `MotionComponentType` | `motion/react` |

### Config

| 属性             | 说明                          | 类型        | 默认值     |
| ---------------- | ----------------------------- | ----------- | ---------- |
| aAs              | 自定义 `<a>` 元素             | `React.ElementType` | -  |
| imgAs            | 自定义 `<img>` 元素           | `React.ElementType` | -  |
| imgUnoptimized   | 图片是否不优化                | `boolean`   | -          |
| proxy            | CDN 代理                      | `CDNProxy`  | `'aliyun'` |
| customCdnFn      | 自定义 CDN URL 生成函数       | `CdnFn`     | -          |

### CDNProxy

| 值         | 说明                |
| ---------- | ------------------- |
| `aliyun`   | 阿里云 npmmirror    |
| `unpkg`    | unpkg CDN           |
| `jsdelivr` | jsDelivr CDN        |
| `custom`   | 自定义（需配 `customCdnFn`） |

### Hooks

| Hook           | 说明                          | 返回值             |
| -------------- | ----------------------------- | ------------------ |
| useConfig      | 获取全局配置                  | `Config \| null`   |
| useCdnFn       | 获取 CDN URL 生成函数         | `CdnFn`            |
