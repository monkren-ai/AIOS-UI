import { Pomodoro } from 'aios-ui-kit/pomodoro'
import type { ComponentDoc } from '../types'

import PomodoroDefault from '../../examples/pomodoro/default'
import PomodoroQuickCycle from '../../examples/pomodoro/quick-cycle'

import defaultSource from '../../examples/pomodoro/default.tsx?raw'
import quickCycleSource from '../../examples/pomodoro/quick-cycle.tsx?raw'

export const pomodoroDoc: ComponentDoc = {
  slug: 'pomodoro',
  name: 'Pomodoro',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '番茄钟，工作与休息自动交替，并累计已完成的轮数。',
    en: 'A pomodoro timer that flips between work and break, counting the rounds you finish.',
  },
  preview: () => <Pomodoro className="w-full max-w-xs" />,
  importStatement: `import { Pomodoro } from 'aios-ui-kit/pomodoro'`,
  usageSnippet: `<Pomodoro />`,
  examples: [
    {
      id: 'default',
      title: { zh: '默认', en: 'Default' },
      description: {
        zh: '默认 25 分钟工作 / 5 分钟休息，25 格进度条对应工作阶段。倒计时到 0 会自动切换阶段：工作结束时 `completedCount`（表头右侧的「completed」计数）加一。全程不需要外部状态，Start/Pause/Reset 都是自管理的。',
        en: 'Defaults to 25 minutes of work and a 5-minute break, with 25 progress segments matching the work phase. Hitting zero switches phases automatically, and finishing a work phase bumps the “completed” count in the header. It needs no external state at all — Start/Pause/Reset are fully self-managed.',
      },
      code: defaultSource,
      render: () => <PomodoroDefault />,
    },
    {
      id: 'quick-cycle',
      title: { zh: '快速演示', en: 'Quick-cycle demo' },
      description: {
        zh: '`workMinutes`、`breakMinutes`、`totalSegments` 都可以自由配置——这里把两个阶段都压到 1 分钟,方便在页面上快速看完一整个工作→休息的循环,不用真等 30 分钟。',
        en: '`workMinutes`, `breakMinutes`, and `totalSegments` are all freely configurable — here both phases are compressed to one minute, so you can watch a full work-to-break cycle on this page without waiting the usual 30.',
      },
      code: quickCycleSource,
      render: () => <PomodoroQuickCycle />,
    },
  ],
  api: [
    {
      name: 'Pomodoro',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'workMinutes',
          type: 'number',
          default: '25',
          description: { zh: '工作阶段时长（分钟）。', en: 'Work-phase length, in minutes.' },
        },
        {
          name: 'breakMinutes',
          type: 'number',
          default: '5',
          description: { zh: '休息阶段时长（分钟）。', en: 'Break-phase length, in minutes.' },
        },
        {
          name: 'totalSegments',
          type: 'number',
          default: '25',
          description: {
            zh: '进度条的格子总数，两个阶段共用同一条进度条。',
            en: 'How many segments the progress bar has; both phases share the same bar.',
          },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '1000',
          description: {
            zh: '倒计时刷新间隔（毫秒）。',
            en: 'How often, in milliseconds, the countdown ticks.',
          },
        },
        {
          name: 'phase',
          type: `'work' | 'break'`,
          description: {
            zh: '覆盖用于展示（配色、标签文字）的阶段值。只影响外观——真正驱动倒计时切换阶段的是组件内部状态，传这个 prop 不会让计时器提前或推迟切换。',
            en: 'Overrides the phase used for display (colouring, the label text). It only affects appearance — the actual countdown and phase switching are driven by internal state, so passing this will not make the timer switch early or late.',
          },
        },
        {
          name: 'running',
          type: 'boolean',
          description: {
            zh: '覆盖用于展示的运行状态。同样只改外观，不会启动或暂停内部计时器；Start/Pause 按钮上的文案仍然跟着内部状态走，可能与这个 prop 的值不一致。',
            en: 'Overrides the running state used for display. Also cosmetic only — it neither starts nor pauses the internal timer, and the Start/Pause button label still follows internal state, which can end up out of sync with this prop.',
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
      zh: 'Start/Pause 与 Reset 都是原生 `<button type="button">`，键盘可达，不额外处理焦点管理——这里不需要，两个按钮一直可见也一直可点。',
      en: 'Start/Pause and Reset are native `<button type="button">` elements, keyboard-reachable, with no extra focus management needed — both stay visible and clickable at all times.',
    },
    {
      zh: '阶段切换（工作→休息或反过来）没有任何播报或提示音，完全靠视觉的配色与文字变化（[WORK] / [BREAK]）。如果用户可能没在看屏幕，建议自己在切换时机上加一个提示音或系统通知。',
      en: 'Phase transitions (work to break or back) come with no announcement or sound — only a visual colour and label change ([WORK] / [BREAK]). If a user might not be looking at the screen, add your own chime or system notification at the transition.',
    },
    {
      zh: '倒计时数字每秒刷新，没有 `aria-live`，这是刻意的：逐秒播报会让屏幕阅读器完全没法用。已完成轮数（`completedCount`）变化频率低得多，如果需要播报，适合单独包一层 `aria-live="polite"`。',
      en: 'The countdown updates every second with no `aria-live`, and that is deliberate — announcing every second would make the timer unusable with a screen reader. The completed-round count changes far less often, and is a better candidate for its own `aria-live="polite"` wrapper if you need one.',
    },
  ],
}
