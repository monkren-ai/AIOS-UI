import { DataTable } from 'aios-ui-kit/data-table'
import type { ComponentDoc } from '../types'

import DataTableTable from '../../examples/data-table/table'
import DataTableGrid from '../../examples/data-table/grid'
import DataTableRows from '../../examples/data-table/rows'

import tableSource from '../../examples/data-table/table.tsx?raw'
import gridSource from '../../examples/data-table/grid.tsx?raw'
import rowsSource from '../../examples/data-table/rows.tsx?raw'

export const dataTableDoc: ComponentDoc = {
  slug: 'data-table',
  name: 'DataTable',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '表格的统一入口：`variant` 在原生 `<table>`、CSS grid 与 label/value 行三种渲染方式间切换，三者共享行点击与状态类的行为。',
    en: 'One entry point for three table shapes: `variant` switches between a native `<table>`, a CSS grid, and label/value rows, and all three share the same row-click and status-class behaviour.',
  },
  preview: () => (
    <DataTable
      className="w-full max-w-sm"
      variant="table"
      columns={[
        { key: 'device', label: 'Device' },
        { key: 'battery', label: 'Battery' },
      ]}
      rows={[{ cells: { device: 'Phone (2a)', battery: '87%' } }]}
    />
  ),
  importStatement: `import { DataTable } from 'aios-ui-kit/data-table'`,
  usageSnippet: `<DataTable\n  variant="table"\n  columns={[{ key: 'name', label: 'Name' }]}\n  rows={[{ cells: { name: 'Alice' } }]}\n/>`,
  composition: {
    zh: 'DataTable 不是复合组件——它是单个组件，`variant` 决定内部渲染路径与哪些 props 生效。三种形态的 props 几乎不重叠：`table` 用 `columns` + `rows` + `caption`，走真正的 `<table>`；`grid` 也用 `columns` + `rows`，但渲染成 CSS grid，支持整行可点击与逐格状态色；`rows` 用完全不同的 `items`，是一列 label/value 读数，不接受 `columns`。排序状态（`sortKey` / `sortDirection`）只对 `table` 与 `grid` 有意义，且是组件内部状态——`onSortChange` 只是旁路通知，不受控。',
    en: 'DataTable is not a compound component — it is one component whose `variant` decides both the rendering path and which props apply. The three shapes barely share props: `table` takes `columns` + `rows` + `caption` and renders a real `<table>`; `grid` also takes `columns` + `rows` but renders a CSS grid with whole-row clicks and per-cell status colours; `rows` takes an entirely different `items` list of label/value readouts and ignores `columns` altogether. Sort state (`sortKey` / `sortDirection`) only means anything for `table` and `grid`, and it lives in internal state — `onSortChange` is a side-channel notification, not a controlled value.',
  },
  examples: [
    {
      id: 'table',
      title: { zh: 'Table 形态', en: 'Table variant' },
      description: {
        zh: "默认值，渲染真正的 `<table>` / `<thead>` / `<tbody>`。`striped`、`compact`、`hoverable` 三个布尔量只在这个形态下生效——传给 `grid` 或 `rows` 会被直接忽略（组件在内部按 `variant === 'table'` 判断才应用）。`caption` 同理，只有这里认。",
        en: "The default, rendering a real `<table>` / `<thead>` / `<tbody>`. The three booleans — `striped`, `compact`, `hoverable` — only take effect in this variant; passing them under `grid` or `rows` is silently ignored, since the component only applies them when `variant === 'table'`. `caption` is the same story.",
      },
      code: tableSource,
      render: () => <DataTableTable />,
    },
    {
      id: 'grid',
      title: { zh: 'Grid 形态', en: 'Grid variant' },
      description: {
        zh: '同样吃 `columns` + `rows`，但每一行是 `<div>` 而不是 `<tr>`。`row.interactive` 让整行变成 `role="button"` 并支持点击与 Enter/Space；`row.cellStatuses` 给单个格子上色（`good` / `warning` / `error` / `info`），与 `row.active` 无关——后者只影响整行的高亮背景。`emptyMessage`（默认 `\'No data\'`）在 `rows` 为空数组时才会渲染。',
        en: 'Also takes `columns` + `rows`, but every row is a `<div>` rather than a `<tr>`. `row.interactive` turns the whole row into a `role="button"` with click and Enter/Space support; `row.cellStatuses` colours individual cells (`good` / `warning` / `error` / `info`), independent of `row.active`, which only controls the row’s highlighted background. `emptyMessage` (default `\'No data\'`) only renders when `rows` is an empty array.',
      },
      code: gridSource,
      render: () => <DataTableGrid />,
    },
    {
      id: 'rows',
      title: { zh: 'Rows 形态', en: 'Rows variant' },
      description: {
        zh: '这一形态完全不用 `columns`：每条 `items` 就是一行，左边 `label`，右边 `value` + 可选 `unit` / `trend`。`isSub` 把行标成缩进的子项（比如某个大项下的明细），`status` 给整行上色，`disabled` 会同时压暗并撤掉 `interactive`——就算 `interactive` 也传了 `true`，`disabled` 优先。',
        en: 'This shape skips `columns` entirely: each `items` entry is one row, a `label` on the left and a `value` plus optional `unit` / `trend` on the right. `isSub` marks a row as an indented child (a detail line under a bigger figure), `status` colours the whole row, and `disabled` dims it and cancels `interactive` — even with `interactive` set to `true`, `disabled` wins.',
      },
      code: rowsSource,
      render: () => <DataTableRows />,
    },
  ],
  api: [
    {
      name: 'DataTable',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的原生 div 属性（内容完全由 `variant` 及其配套的数据 props 决定）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` — content comes entirely from `variant` and its matching data props.',
      },
      props: [
        {
          name: 'variant',
          type: `'table' | 'grid' | 'rows'`,
          default: `'table'`,
          description: {
            zh: '选择渲染路径，见上方组成说明。',
            en: 'Picks the rendering path; see the composition note above.',
          },
        },
        {
          name: 'columns',
          type: 'DataTableColumn[]',
          description: {
            zh: '`table` 与 `grid` 用。每列 `{ key, label, width?, align?, type?, sortable? }`；`sortable` 会渲染带排序图标的表头按钮。',
            en: 'Used by `table` and `grid`. Each column is `{ key, label, width?, align?, type?, sortable? }`; `sortable` renders a sort button in the header with a direction icon.',
          },
        },
        {
          name: 'rows',
          type: 'DataTableGridRow[]',
          default: '[]',
          description: {
            zh: "`table` 与 `grid` 用。每行 `{ cells, active?, interactive?, cellStatuses?, id? }`，`cells` 是 `{ [columnKey]: ReactNode }`。排序按列的 `type`（`'numeric'` 走数值比较，其余按小写字符串比较）作用在这份数据上，生成的是一份新数组，不会改动你传入的 `rows`。",
            en: "Used by `table` and `grid`. Each row is `{ cells, active?, interactive?, cellStatuses?, id? }`, where `cells` is `{ [columnKey]: ReactNode }`. Sorting compares values per the column’s `type` (`'numeric'` does numeric comparison, everything else compares lower-cased strings) and produces a new array — your `rows` is never mutated.",
          },
        },
        {
          name: 'caption',
          type: 'string',
          description: {
            zh: '`table` 用。渲染成 `<caption>`。',
            en: 'Used by `table`. Renders as a `<caption>`.',
          },
        },
        {
          name: 'striped',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '`table` 用。奇偶行加背景条纹。',
            en: 'Used by `table`. Alternates a background stripe by row parity.',
          },
        },
        {
          name: 'compact',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '`table` 用。收紧行高与内边距。',
            en: 'Used by `table`. Tightens row height and padding.',
          },
        },
        {
          name: 'hoverable',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '`table` 用。悬停行加高亮背景。',
            en: 'Used by `table`. Highlights a row’s background on hover.',
          },
        },
        {
          name: 'emptyMessage',
          type: 'string',
          default: `'No data'`,
          description: {
            zh: '`grid` 用。`rows` 为空数组时显示的占位文案。',
            en: 'Used by `grid`. Placeholder text shown when `rows` is an empty array.',
          },
        },
        {
          name: 'items',
          type: 'DataTableRowsItem[]',
          default: '[]',
          description: {
            zh: '`rows` 形态专用（注意跟上面的 `rows` prop 是两回事）。每项 `{ label, value, unit?, trend?, status?, isSub?, interactive?, disabled? }`。',
            en: 'Only for the `rows` variant (not to be confused with the `rows` prop above). Each item is `{ label, value, unit?, trend?, status?, isSub?, interactive?, disabled? }`.',
          },
        },
        {
          name: 'onRowClick',
          type: '(index: number) => void',
          description: {
            zh: '`grid` 与 `rows` 用，且只在该行 `interactive`（`rows` 里还要求非 `disabled`）时才会触发，参数是行在数组中的索引。`table` 没有行点击。',
            en: 'Used by `grid` and `rows`, and only fires when the row is `interactive` (and, under `rows`, not `disabled`). The argument is the row’s index in the array. `table` has no row click at all.',
          },
        },
        {
          name: 'onSortChange',
          type: '(key: string | null, direction: SortDirection) => void',
          description: {
            zh: '`table` 与 `grid` 用。点击同一列在 `asc → desc → 取消排序` 之间循环；取消时 `key` 会传 `null`。排序结果本身由组件内部状态驱动——这个回调只是通知，不是受控接口。',
            en: 'Used by `table` and `grid`. Clicking the same column cycles `asc → desc → no sort`; on the last step `key` comes back as `null`. The actual sort is driven by internal state — this callback only notifies, it does not control anything.',
          },
        },
        {
          name: 'proximity',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '所有形态都接受，加一个 `nothing-data-table--proximity` 类。该类没有配套的全局 CSS 随本包发布——如果项目里没有自己定义它的鼠标接近高亮效果，这个开关不会有任何可见变化。',
            en: 'Accepted by every variant; adds a `nothing-data-table--proximity` class. No global CSS ships with the package for that class — without your own pointer-proximity styling defined for it, flipping this on has no visible effect.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并。',
            en: 'Extra classes, merged via `tailwind-merge`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`table` 形态输出真正的 `<table>`/`<th>`/`<td>`，读屏能用标准的表格导航；`grid` 与 `rows` 都是 `<div>` 拼的，不带任何表格 role，读屏只会当成一串平铺内容，列头与单元格的对应关系不会被播报。',
      en: 'The `table` variant emits real `<table>`/`<th>`/`<td>` markup, so a screen reader gets standard table navigation. `grid` and `rows` are built from plain `<div>`s with no table role at all — a screen reader hears a flat run of content, and the header-to-cell relationship is never announced.',
    },
    {
      zh: '`grid` 的可排序表头是货真价实的 `<button aria-label="Sort by {label}">`，并带 `aria-sort`，键盘可达；但 `table` 形态的排序按钮同理带 `aria-sort`，只是外层元素不是可 tab 到的表格单元格标题标准结构，视觉一致但语义仍是「表头里的一个按钮」。',
      en: '`grid`’s sortable headers are real `<button aria-label="Sort by {label}">` elements with `aria-sort`, and are keyboard reachable. `table`’s sort buttons carry the same `aria-sort`, but sit inside an ordinary `<th>` — visually identical, but the accessible structure is still “a button inside a header cell”, not a native sortable-column affordance.',
    },
    {
      zh: '`grid` 的 `interactive` 行会拿到 `role="button"`、`tabIndex={0}` 与 Enter/Space 处理；`rows` 的 `interactive` 行同理，但 `disabled` 时两者都不会。整行只有一个可读名称来源——`cells` 里的文字——没有内容的空单元格会让整行读起来缺一截。',
      en: '`grid` rows with `interactive` get `role="button"`, `tabIndex={0}`, and Enter/Space handling; `rows` items behave the same way, minus `disabled`. Either way, the row’s accessible name comes only from the text inside `cells` — an empty cell there just reads as a gap.',
    },
    {
      zh: '状态色（`cellStatuses` 的 `good` / `warning` / `error` / `info`，以及 `rows` 的 `status`）只表现为颜色，没有配套的文字或图标。单色主题下这些颜色本就彼此接近，别把它们当成唯一的信息来源。',
      en: 'Status colours — `cellStatuses`’ `good` / `warning` / `error` / `info`, and `rows`’ `status` — are colour only, with no accompanying text or icon. In a monochrome theme these hues already sit close together, so they should never be the sole carrier of the information.',
    },
    {
      zh: '排序图标 `SortIcon` 是纯装饰性 SVG，带 `aria-hidden`；方向信息完全靠按钮上的 `aria-sort` 传达，不依赖图标本身的视觉朝向。',
      en: 'The `SortIcon` glyph is purely decorative and `aria-hidden`; direction is conveyed entirely through the button’s `aria-sort`, never through the icon’s visual orientation alone.',
    },
  ],
}
