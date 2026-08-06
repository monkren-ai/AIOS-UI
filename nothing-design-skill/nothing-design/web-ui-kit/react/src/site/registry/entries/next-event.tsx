import { NextEvent } from 'aios-ui-kit/next-event'
import type { ComponentDoc } from '../types'

import NextEventDefault from '../../examples/next-event/default'
import NextEventUrgent from '../../examples/next-event/urgent'

import defaultSource from '../../examples/next-event/default.tsx?raw'
import urgentSource from '../../examples/next-event/urgent.tsx?raw'

export const nextEventDoc: ComponentDoc = {
  slug: 'next-event',
  name: 'NextEvent',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '单行的下一个日程，给出日期与倒计时，临近时自动升为高优先级。',
    en: 'A one-line next-up event with a countdown that turns urgent as the time closes in.',
  },
  preview: () => (
    <NextEvent event={{ title: 'Design review', date: Date.now() + 6 * 60 * 60 * 1000 }} />
  ),
  importStatement: `import { NextEvent } from 'aios-ui-kit/next-event'`,
  usageSnippet: `<NextEvent event={{ title: 'Design review', date: Date.now() + 6 * 60 * 60 * 1000 }} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '事件数组', en: 'An array of events' },
      description: {
        zh: '传 `events` 时组件自己按时间排序，挑出最近一个尚未到期的展示；如果全部已过期，就退回展示时间最早的一条。日期用 `date`（毫秒时间戳）而不是 `Date` 对象或字符串。倒计时格式随剩余时间自动切档：`3D 04H 12M` → `4H 12M` → `12M` → `NOW`。',
        en: 'Passing `events` lets the component sort them itself and surface the nearest one that has not yet passed; if every one has already passed, it falls back to the earliest. Dates are a `date` field in millisecond epoch time, not a `Date` object or a string. The countdown format steps down automatically with the remaining time: `3D 04H 12M` → `4H 12M` → `12M` → `NOW`.',
      },
      code: defaultSource,
      render: () => <NextEventDefault />,
    },
    {
      id: 'urgent',
      title: { zh: '临近事件与主题', en: 'An urgent event, in both themes' },
      description: {
        zh: '不传 `priority` 时,组件用「不到 24 小时」这个规则自动判成 `high`,倒计时数字会变成强调色。`event`（单数）优先于 `events`,适合只有一条要展示的场景,也是为了兼容更早的 API 形态。`theme` 决定自身配色,默认 `dark`。',
        en: 'Without an explicit `priority`, the component auto-promotes to `high` whenever the event is under 24 hours out, turning the countdown into the accent colour. The singular `event` prop takes priority over `events` — handy when there is only one to show, and kept around for backward compatibility with an earlier API shape. `theme` sets its own palette and defaults to `dark`.',
      },
      code: urgentSource,
      render: () => <NextEventUrgent />,
    },
  ],
  api: [
    {
      name: 'NextEvent',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'event',
          type: 'EventData',
          description: {
            zh: '单个事件，优先于 `events`。`EventData` 形如 `{ title: string, date: number, month?: string }`——`month` 字段目前不会被组件读取，月份始终由 `date` 自己算出，传了也不会生效。',
            en: 'A single event; it wins over `events`. `EventData` is `{ title: string, date: number, month?: string }` — the `month` field is currently never read; the month label is always derived from `date`, so passing it has no effect.',
          },
        },
        {
          name: 'events',
          type: 'EventData[]',
          description: {
            zh: '事件数组。组件自动挑选并展示其中最近的一个未到期事件（全部到期则退回最早一条）。',
            en: 'An array of events. The component automatically picks and shows the nearest one that has not expired (or the earliest, if all have).',
          },
        },
        {
          name: 'priority',
          type: `'low' | 'normal' | 'high'`,
          description: {
            zh: '覆盖倒计时的强调档位。留空时按「剩余时间是否小于 24 小时」自动判 `high`，否则 `normal`。`low` 需要显式传入，组件自己不会推导出这一档。',
            en: 'Overrides the countdown’s emphasis level. Left unset, it is derived automatically — `high` when less than 24 hours remain, otherwise `normal`. `low` must be passed explicitly; the component never derives it on its own.',
          },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'dark'`,
          description: { zh: '组件自身的配色。', en: 'This widget’s own palette.' },
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
      zh: '既没传 `event` 也没传 `events` 时，组件会用内置的三条 demo 事件顶上（`data-state="demo"`，`data-real="false"`）——这在文档预览里方便，但生产代码里几乎总该显式传入真实数据，否则用户会看到跟自己日程无关的占位内容。',
      en: 'Without either `event` or `events`, the component falls back to three built-in demo entries (`data-state="demo"`, `data-real="false"`) — convenient for a docs preview, but production code should almost always pass real data explicitly, or users will see placeholder content unrelated to their own schedule.',
    },
    {
      zh: '倒计时是纯文本，每分钟静默刷新（内部用 `useNow(60000)`），没有 `aria-live`。如果事件真的临近到分秒必争，考虑在业务层单独为倒计时数字加一层节流过的 `aria-live="polite"`。',
      en: 'The countdown is plain text, silently refreshed once a minute (via an internal `useNow(60000)`), with no `aria-live`. If an event genuinely comes down to the wire, consider layering a throttled `aria-live="polite"` over the countdown at the application level.',
    },
    {
      zh: '`priority` 只切换颜色（`data-priority`），没有对应的可见文字或 `aria-label` 说「这条很紧急」。色觉障碍用户拿不到这层信息，重要场景建议在标题旁边加一个文字或图标提示。',
      en: 'Changing `priority` only swaps colour (via `data-priority`); there is no visible text or `aria-label` announcing “this one is urgent”. Colour-blind users lose that signal entirely, so for anything that matters, add a text or icon cue next to the title.',
    },
  ],
}
