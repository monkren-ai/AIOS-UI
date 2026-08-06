import { Calendar } from 'aios-ui-kit/calendar'
import type { ComponentDoc } from '../types'

import CalendarCompact from '../../examples/calendar/compact'
import CalendarFull from '../../examples/calendar/full'

import compactSource from '../../examples/calendar/compact.tsx?raw'
import fullSource from '../../examples/calendar/full.tsx?raw'

export const calendarDoc: ComponentDoc = {
  slug: 'calendar',
  name: 'Calendar',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '只读日历，紧凑版突出今天，完整版给出可翻月的整月网格。',
    en: 'A read-only calendar: compact highlights today, full shows a month grid you can page.',
  },
  preview: () => <Calendar type="compact" />,
  importStatement: `import { Calendar } from 'aios-ui-kit/calendar'`,
  usageSnippet: `<Calendar type="compact" />`,
  composition: {
    zh: 'Calendar 是只读的：`full` 版型里的月份翻页只改变自己内部显示的月份，不会告诉外部选中了哪一天，组件也没有 `onSelect` 之类的回调。它是用来「看」日期的展示件，不是日期选择器——需要选日期请用 Popover/Modal 包一个原生 `<input type="date">`，或者自己在 Calendar 之外接一套选中态。',
    en: 'Calendar is read-only: paging the month in the `full` layout only changes what month it displays internally — it never reports a selected day, and there is no `onSelect` callback at all. It is a display piece for looking at dates, not a date picker. If you need selection, wrap a native `<input type="date">` in a Popover/Modal, or build your own selected-state layer around Calendar.',
  },
  examples: [
    {
      id: 'compact',
      title: { zh: '紧凑版', en: 'Compact' },
      description: {
        zh: '默认 `type`。只显示今天的星期、日期数字与月份三行，没有网格也没有导航，适合塞进一张小卡片或侧栏角落。',
        en: 'The default `type`. Just three lines — today’s weekday, the day number, and the month — with no grid and no navigation. Fits a small card or a corner of a sidebar.',
      },
      code: compactSource,
      render: () => <CalendarCompact />,
    },
    {
      id: 'full',
      title: { zh: '完整版', en: 'Full' },
      description: {
        zh: '`type="full"` 给出可翻页的整月 6×7 网格,今天会高亮,上下月溢出的日期变暗。翻页按钮只改组件内部状态,不会通知外部——`initialDate` 只决定打开时显示哪个月,之后就不再受这个 prop 控制了。',
        en: '`type="full"` renders a pageable 6×7 month grid; today is highlighted and the overflow days from adjacent months are dimmed. The paging buttons only change internal state and report nothing outward — `initialDate` just seeds which month opens first and stops mattering after that.',
      },
      code: fullSource,
      render: () => <CalendarFull />,
    },
  ],
  api: [
    {
      name: 'Calendar',
      description: {
        zh: '渲染为 `<div>`，透传所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'type',
          type: `'compact' | 'full'`,
          default: `'compact'`,
          description: { zh: '版型。', en: 'The layout.' },
        },
        {
          name: 'initialDate',
          type: 'Date',
          default: 'new Date()',
          description: {
            zh: '`full` 版型初始显示的月份所在日期。只在挂载时读取一次，之后的月份切换全靠内部状态。',
            en: 'The date whose month the `full` layout opens on. Read once on mount; every later month switch is driven by internal state.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes, merged via `tailwind-merge`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '整月网格带 `role="grid"`，但单元格是普通 `<div>`，没有 `role="gridcell"`/`role="row"`，也不接收焦点——因为它是只读展示，不是可选中、可键盘导航的表格。如果你的场景需要「选中某一天」，这不是那个组件。',
      en: 'The month grid carries `role="grid"`, but its cells are plain `<div>`s — no `role="gridcell"`/`role="row"`, and none of them take focus, because this is a read-only display rather than a selectable, keyboard-navigable grid. If your scenario needs “pick a day”, this is not that component.',
    },
    {
      zh: '上/下月按钮各自带明确的 `aria-label`（Previous month / Next month），不依赖 `<` `>` 符号本身传达含义。',
      en: 'The previous/next-month buttons each carry an explicit `aria-label` (Previous month / Next month) and do not rely on the `<`/`>` glyphs alone to convey meaning.',
    },
    {
      zh: '「今天」只用背景色和字重区分，没有额外的文字标注（例如 aria 层面的 “today”）。如果读屏用户必须知道哪一天是今天，考虑在网格外单独用文字说一句。',
      en: 'Today is distinguished only by background and weight, with no extra text marker (e.g. an aria-level “today”). If a screen-reader user must know which day is today, say so in plain text outside the grid.',
    },
    {
      zh: '所有颜色过渡都带 `motion-reduce:transition-none`，减弱动效偏好下翻页仍然生效，只是不再有渐变。',
      en: 'Every colour transition carries `motion-reduce:transition-none` — paging still works under reduced motion, just without the fade.',
    },
  ],
}
