import { Chrono } from 'nothing-ui/chrono'
import type { ComponentDoc } from '../types'

import ChronoDefault from '../../examples/chrono/default'
import ChronoSizes from '../../examples/chrono/sizes'

import defaultSource from '../../examples/chrono/default.tsx?raw'
import sizesSource from '../../examples/chrono/sizes.tsx?raw'

export const chronoDoc: ComponentDoc = {
  slug: 'chrono',
  name: 'Chrono',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '秒表，精确到百分之一秒，可记圈并标出最快与最慢的一圈。',
    en: 'A stopwatch down to hundredths, with laps and the fastest and slowest ones marked.',
  },
  preview: () => <Chrono size="sm" className="w-full max-w-xs" />,
  importStatement: `import { Chrono } from 'nothing-ui/chrono'`,
  usageSnippet: `<Chrono />`,
  examples: [
    {
      id: 'default',
      title: { zh: '默认', en: 'Default' },
      description: {
        zh: '完全自管理：内部用 `requestAnimationFrame` 驱动计时，`START`/`PAUSE`/`LAP`/`RESET` 都不需要外部接线。计时格式是 `MM:SS.CC`（分:秒.百分秒）。点两次以上 LAP 后，最快的一圈标 `fastest`，最慢的标 `slowest`，其余是 `normal`——只有一圈时不做这个区分。',
        en: 'Fully self-managed: an internal `requestAnimationFrame` loop drives the clock, and Start/Pause/Lap/Reset need no external wiring. The display format is `MM:SS.CC` (minutes:seconds.hundredths). After two or more laps, the fastest one is marked `fastest` and the slowest `slowest`, the rest stay `normal` — with only one lap, no comparison is made.',
      },
      code: defaultSource,
      render: () => <ChronoDefault />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 只缩放数字读数与容器内边距，控件按钮和圈列表的排版不变。`maxLaps` 不会真的截断圈数——它只影响记圈列表在超出这个数量后自动把滚动条滚回顶部（最新一圈）。',
        en: '`size` only scales the numeric readout and the container’s padding; the control buttons and lap-list layout stay the same. `maxLaps` does not actually cap how many laps you can record — it just makes the lap list auto-scroll back to the top (the newest lap) once that count is exceeded.',
      },
      code: sizesSource,
      render: () => <ChronoSizes />,
    },
  ],
  api: [
    {
      name: 'Chrono',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'maxLaps',
          type: 'number',
          default: '10',
          description: {
            zh: '超过这个圈数后，记圈列表在新增一圈时自动滚回顶部。不限制实际能记多少圈。',
            en: 'Once the lap count passes this, the list auto-scrolls back to the top whenever a new lap is added. It does not limit how many laps can actually be recorded.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '数字读数字号与容器内边距。', en: 'Readout type size and container padding.' },
        },
        {
          name: 'state',
          type: `'idle' | 'running' | 'paused'`,
          description: {
            zh: '覆盖用于视觉状态（`data-state`、配色）的值。留空时组件根据自己的内部计时状态推导：没开始过是 `idle`，正在跑是 `running`，暂停且已有耗时是 `paused`。传了这个 prop 只改外观，不会代替内部状态驱动计时——按钮上的 START/PAUSE 文案与是否真的在计时，仍然看内部状态。',
            en: 'Overrides the value used for the visual state (`data-state`, colouring). Left unset, the component derives it from its own timer: never started is `idle`, ticking is `running`, stopped with elapsed time is `paused`. Passing this only changes appearance — it does not drive the actual timer, and the Start/Pause button label still follows the internal state.',
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
      zh: 'START/PAUSE、LAP、RESET 都是原生 `<button type="button">`，键盘可达；LAP 在未运行时、RESET 在运行中或耗时为零时都会正确 `disabled`，不会点出一个没有意义的操作。',
      en: 'Start/Pause, Lap, and Reset are all native `<button type="button">` elements and keyboard-reachable; Lap is correctly `disabled` while not running, and Reset while running or at zero elapsed time — neither can trigger a meaningless action.',
    },
    {
      zh: '计时读数、每一圈的用时都是纯文本，没有 `aria-live`——秒表本身刷新极快（帧级），持续播报只会淹没读屏用户，需要播报的场景应该自己在暂停/记圈这类离散事件上包一层 `aria-live="polite"`。',
      en: 'The running readout and each lap’s time are plain text with no `aria-live` — the stopwatch updates at frame rate, and continuous announcements would drown a screen-reader user out. If you need announcements, wrap discrete events like pause or lap in your own `aria-live="polite"` region.',
    },
    {
      zh: '最快/最慢圈只用颜色区分（`data-pace`），列表本身没有对应的文字标注。如果这个信息很重要，建议在圈数字旁边额外加一个可见的 “Fastest”/“Slowest” 文本。',
      en: 'The fastest and slowest laps are distinguished by colour alone (`data-pace`); the list itself carries no matching text label. If that distinction matters, add a visible “Fastest”/“Slowest” label next to the lap number.',
    },
  ],
}
