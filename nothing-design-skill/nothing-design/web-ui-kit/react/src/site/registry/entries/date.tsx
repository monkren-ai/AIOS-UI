import { DateWidget } from 'aios-ui-kit/date'
import type { ComponentDoc } from '../types'

import DateTypes from '../../examples/date/types'
import DatePeel from '../../examples/date/peel'

import typesSource from '../../examples/date/types.tsx?raw'
import peelSource from '../../examples/date/peel.tsx?raw'

export const dateDoc: ComponentDoc = {
  slug: 'date',
  name: 'DateWidget',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '日期卡片，三种版型：方块配当日进度环、双环、以及衬线撕页。',
    en: 'A date card in three looks: block with a day-progress ring, dual ring, or serif tear-off.',
  },
  preview: () => <DateWidget type="rect" theme="light" />,
  importStatement: `import { DateWidget } from 'aios-ui-kit/date'`,
  usageSnippet: `<DateWidget type="rect" />`,
  examples: [
    {
      id: 'types',
      title: { zh: '三种版型', en: 'Three types' },
      description: {
        zh: '`rect`（默认）是方块配一个进度环，环走完一整圈对应一天，进度按当前时:分算；`dual-ring` 是双层同心环，只显示星期与日期数字；`serif` 是撕页历风格，衬线数字加一角标注星期。三者都是当前系统时间，每 `updateInterval`（默认 60000ms，即 1 分钟）刷新一次。',
        en: '`rect` (the default) is a block with a progress ring that completes one full turn per day, its position driven by the current hour and minute; `dual-ring` is two concentric rings showing just the weekday and the day number; `serif` is a tear-off-calendar look with a serif numeral and a corner weekday tag. All three read the system clock and refresh every `updateInterval` (60000ms, i.e. once a minute) by default.',
      },
      code: typesSource,
      render: () => <DateTypes />,
    },
    {
      id: 'peel',
      title: { zh: '撕角交互', en: 'Tear-off corner' },
      description: {
        zh: '`showPeel` 只对 `type="serif"` 生效，会在右下角画一个三角形撕角；给 `onPeelClick` 后这个角变成可点击、可键盘操作（Enter/空格）的按钮，但组件本身不会真的「撕掉」日期或触发翻页——具体动作完全由你在回调里实现。',
        en: '`showPeel` only applies to `type="serif"` and draws a triangular tear-off corner; adding `onPeelClick` makes it clickable and keyboard-operable (Enter/Space), but the component never actually “tears off” the date or advances anything by itself — whatever happens next is entirely up to your callback.',
      },
      code: peelSource,
      render: () => <DatePeel />,
    },
  ],
  api: [
    {
      name: 'DateWidget',
      description: {
        zh: '渲染为 `<div>`，透传除 `children`、`onClick` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` and `onClick` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'type',
          type: `'rect' | 'dual-ring' | 'serif'`,
          default: `'rect'`,
          description: { zh: '版型。', en: 'The layout.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'light'`,
          description: {
            zh: '组件自身的配色，三种版型都受它影响。注意默认值是 `light`，和本文档区里大多数时间/系统组件默认 `dark` 不一样。',
            en: 'This widget’s own palette, applied across all three layouts. Note the default is `light` — unlike most other time/system components in this section, which default to `dark`.',
          },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '60000',
          description: {
            zh: '重新读取系统时间的间隔（毫秒）。',
            en: 'How often, in milliseconds, the system clock is re-read.',
          },
        },
        {
          name: 'showPeel',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `type="serif"` 生效。是否绘制右下角的撕角。',
            en: 'Applies to `type="serif"` only. Whether to draw the bottom-corner tear-off triangle.',
          },
        },
        {
          name: 'onPeelClick',
          type: '() => void',
          description: {
            zh: '点击或键盘激活撕角时触发。只有配合 `showPeel` 使用才有意义；组件不会自己改变日期或做动画，动作完全由你决定。',
            en: 'Fires when the corner is clicked or keyboard-activated. Only meaningful alongside `showPeel`; the component never changes the date or animates anything by itself — the follow-up action is entirely yours.',
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
      zh: '三种版型的进度环 SVG 都带 `aria-hidden="true"`，日期与星期信息完全靠旁边的文字节点传达，环本身只是装饰。',
      en: 'The progress-ring SVGs in all three layouts carry `aria-hidden="true"`; the date and weekday are fully conveyed by the adjoining text nodes, and the ring itself is purely decorative.',
    },
    {
      zh: '撕角在有 `onPeelClick` 时会拿到 `role="button"`、`tabIndex={0}` 与 Enter/空格键盘处理；没有 `onPeelClick` 时它纯粹是视觉元素，不接收焦点。',
      en: 'The tear-off corner gets `role="button"`, `tabIndex={0}`, and Enter/Space handling whenever `onPeelClick` is set; without it, the corner is purely visual and never takes focus.',
    },
    {
      zh: '日期每分钟静默刷新一次，没有 `aria-live`——这是预期行为：日期变化极其低频，持续宣告反而打扰。跨日刷新那一刻也不会有任何播报，如果业务上需要，请自己在外层监听并宣布。',
      en: 'The date refreshes silently once a minute with no `aria-live`, and that is intentional: date changes are so infrequent that an announcement would just be noise. Crossing midnight produces no announcement either — wire your own listener outside the component if your product needs one.',
    },
  ],
}
