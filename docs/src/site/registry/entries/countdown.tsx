import { Countdown } from 'aios-ui-kit/countdown'
import type { ComponentDoc } from '../types'

import CountdownBasic from '../../examples/countdown/basic'
import CountdownUrgent from '../../examples/countdown/urgent'

import basicSource from '../../examples/countdown/basic.tsx?raw'
import urgentSource from '../../examples/countdown/urgent.tsx?raw'

export const countdownDoc: ComponentDoc = {
  slug: 'countdown',
  name: 'Countdown',
  category: 'time-system',
  status: 'new',
  baseUi: '—（自实现，setInterval）',
  description: {
    zh: '倒计时，Doto 大数字，临近时数值升为红色。',
    en: 'A countdown in Doto display type that turns red as it nears zero.',
  },
  preview: () => (
    <Countdown target={Date.now() + 5 * 60 * 1000} label="DROP IN" />
  ),
  importStatement: `import { Countdown } from 'aios-ui-kit/countdown'`,
  usageSnippet: `<Countdown target={Date.now() + 60000} />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '`target` 接毫秒时间戳或 `Date`。读数用 Doto 大字（`font-display`，36px），单位 H/M/S 用 Space Mono。内部 `setInterval(1000)` 每秒刷新，卸载时自动清理。`label` 是可选的小标题。',
        en: '`target` takes a millisecond timestamp or a `Date`. The readout uses Doto display type (`font-display`, 36px); the H/M/S units use Space Mono. An internal `setInterval(1000)` refreshes each second and cleans up on unmount. `label` is an optional caption.',
      },
      code: basicSource,
      render: () => <CountdownBasic />,
    },
    {
      id: 'urgent',
      title: { zh: '临近变色', en: 'Urgent threshold' },
      description: {
        zh: '`threshold`（默认 10 秒）定义「临近」区间：剩余秒数落进这个区间，读数就从 display 白升到 AIOS 红（`--accent`），`data-state` 变成 `urgent`。到点后触发 `onComplete` 一次，显示 `onCompleteText`（默认 `DONE`），`data-state` 变成 `done`。',
        en: '`threshold` (default 10s) defines the “urgent” window: once the remaining seconds fall inside it, the readout climbs from display white to the AIOS red (`--accent`) and `data-state` becomes `urgent`. On zero it fires `onComplete` once, shows `onCompleteText` (default `DONE`), and `data-state` becomes `done`.',
      },
      code: urgentSource,
      render: () => <CountdownUrgent />,
    },
  ],
  api: [
    {
      name: 'Countdown',
      description: {
        zh: '渲染为 `<div>`，`role="timer"`。透传所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` with `role="timer"`. Forwards every native div prop (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'target',
          type: 'number | Date',
          required: true,
          description: { zh: '目标时刻；number 视为毫秒时间戳。', en: 'The target moment; a number is read as a millisecond timestamp.' },
        },
        {
          name: 'onComplete',
          type: '() => void',
          description: { zh: '到点回调，只触发一次。', en: 'Fired once when the countdown reaches zero.' },
        },
        {
          name: 'onCompleteText',
          type: 'string',
          default: `'DONE'`,
          description: { zh: '到点后显示的文案。', en: 'Text shown after the countdown finishes.' },
        },
        {
          name: 'threshold',
          type: 'number',
          default: '10',
          description: { zh: '进入此秒数区间时读数升为红色。', en: 'Seconds remaining at which the readout turns red.' },
        },
        {
          name: 'showDays',
          type: 'boolean',
          default: 'false',
          description: { zh: '前置显示天数段（DD）。', en: 'Prepend a days segment (DD).'},
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '可选小标题，渲染在读数上方。', en: 'Optional caption rendered above the readout.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名，经 `tailwind-merge` 合并。', en: 'Extra classes, merged via `tailwind-merge`.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`role="timer"`、`aria-live="off"`：读数每秒跳，持续播报只会淹没读屏用户；需要播报的场景应在 `onComplete` 这类离散事件上自行包一层 `aria-live="polite"`。',
      en: '`role="timer"` with `aria-live="off"`: the readout jumps every second, and continuous announcements would drown a screen-reader user. Wrap discrete events like `onComplete` in your own `aria-live="polite"` region if announcements are needed.',
    },
    {
      zh: '临近变色只用颜色区分（`data-state`），没有额外文字。若这个信息重要，建议在 `label` 里显式写出。',
      en: 'The urgent state is conveyed by colour alone (`data-state`); there is no extra text. If that distinction matters, make it explicit in `label`.',
    },
  ],
}
