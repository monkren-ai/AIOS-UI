---
nav: Components
group:
  title: Forms
  order: 9
title: Form
description: Nothing 风格表单容器，封装原生 form 的提交行为
---

## 介绍

Form 是表单容器组件，封装了原生 `<form>` 的提交行为：

- 阻止默认提交，转而触发 `onSubmit`
- 提供统一的纵向间距布局
- 支持所有原生 `<form>` 属性

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性     | 说明       | 类型                                          | 默认值 |
| -------- | ---------- | --------------------------------------------- | ------ |
| onSubmit | 提交回调   | `(e: FormEvent<HTMLFormElement>) => void`     | -      |
| children | 表单内容   | `React.ReactNode`                             | -      |

此外，Form 支持所有原生 `<form>` 元素的属性，并支持 `ref` 转发。
