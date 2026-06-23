---
nav: Components
group:
  title: Data Display
  order: 2
title: DataTable
description: 统一表格展示组件，支持 table / grid / rows 三种变体
---

## 介绍

DataTable 是统一表格展示入口，合并自 Table / DataGrid / DataRows，提供三种变体：

- `table`：基于 HTML `<table>` 的静态列/行展示，支持 striped/compact/hoverable
- `grid`：基于 CSS Grid 的可交互表格，支持行 active/interactive、单元格 status
- `rows`：基于 label/value 的状态行展示，支持 sub-row、trend/unit

## 基础用法

<code src="./demos/index.tsx" nopadding></code>

## API

| 属性         | 说明           | 类型                                       | 默认值      |
| ------------ | -------------- | ------------------------------------------ | ----------- |
| variant      | 表格变体       | `'table' \| 'grid' \| 'rows'`              | `'table'`   |
| columns      | 列定义         | `DataTableColumn[]`                        | -           |
| rows         | 行数据         | `DataTableGridRow[]`                        | `[]`        |
| items        | 行项（rows 模式） | `DataTableRowsItem[]`                    | `[]`        |
| caption      | 表格标题       | `string`                                   | -           |
| emptyMessage | 空数据提示     | `string`                                   | `'No data'` |
| onRowClick   | 行点击回调     | `(index: number) => void`                  | -           |
| striped      | 斑马纹         | `boolean`                                  | `false`     |
| compact      | 紧凑模式       | `boolean`                                  | `false`     |
| hoverable    | 悬停高亮       | `boolean`                                  | `false`     |

此外，DataTable 支持所有原生 `<div>` 元素的属性。
