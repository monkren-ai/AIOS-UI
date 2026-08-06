import { AgeMotion } from 'aios-ui-kit/age-motion'
import type { ComponentDoc } from '../types'

import AgeMotionDefault from '../../examples/age-motion/default'
import AgeMotionThemes from '../../examples/age-motion/themes'

import defaultSource from '../../examples/age-motion/default.tsx?raw'
import themesSource from '../../examples/age-motion/themes.tsx?raw'

export const ageMotionDoc: ComponentDoc = {
  slug: 'age-motion',
  name: 'AgeMotion',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '填入出生日期，年月日逐秒累加，并按十年一段标出人生进度。',
    en: 'Enter a birth date and watch the years, months, and days tick up, decade by decade.',
  },
  preview: () => <AgeMotion birthDate="1990-06-15" size="sm" className="w-full max-w-xs" />,
  importStatement: `import { AgeMotion } from 'aios-ui-kit/age-motion'`,
  usageSnippet: `<AgeMotion birthDate="1990-06-15" />`,
  examples: [
    {
      id: 'default',
      title: { zh: '默认', en: 'Default' },
      description: {
        zh: '不传 `birthDate` 时组件只渲染一个日期输入框，等用户填。这里预填了一个日期,好让年/月/日、总时长与两条进度条立刻有数据可看——`totalHours` 等派生字段每 `updateInterval`（默认 1000ms）重算一次，秒数是真的在跳的。',
        en: 'Without a `birthDate`, the component renders nothing but the date input and waits. Here one is pre-filled so the year/month/day readout, the running totals, and both progress bars have something to show immediately — the derived fields recompute every `updateInterval` (1000ms by default), so the seconds genuinely tick.',
      },
      code: defaultSource,
      render: () => <AgeMotionDefault />,
    },
    {
      id: 'themes',
      title: { zh: '主题与尺寸', en: 'Theme & size' },
      description: {
        zh: '`theme` 只影响自身配色（默认 `dark`），不读取 `[data-theme]`；`size` 控制整体字号与内边距；`yearSegments` 决定「本年进度」那一排格子的密度，这里降到 12 格对应十二个月。',
        en: '`theme` only sets this widget’s own palette (default `dark`) and does not read `[data-theme]`; `size` scales the overall type and padding; `yearSegments` sets how many cells the “year progress” row is split into — here it’s dropped to 12, one per month.',
      },
      code: themesSource,
      render: () => <AgeMotionThemes />,
    },
  ],
  api: [
    {
      name: 'AgeMotion',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'birthDate',
          type: 'string',
          description: {
            zh: '`YYYY-MM-DD` 格式的出生日期。留空则只显示输入框，年龄区块整体不渲染。可作为受控值传入，但组件内部维护自己的输入状态，改这个 prop 不会同步覆盖用户已经输入的值。',
            en: 'A birth date in `YYYY-MM-DD` form. Leave it unset and only the input renders — the whole age block is skipped. It seeds the field, but the component keeps its own input state afterwards, so changing this prop later will not overwrite what the user already typed.',
          },
        },
        {
          name: 'lifespan',
          type: 'number',
          default: '80',
          description: {
            zh: '预期寿命（年）。决定「人生进度」一共画多少个十年格（`lifespan / 10`）。',
            en: 'Expected lifespan in years. Sets how many decade cells the life-progress row draws (`lifespan / 10`).',
          },
        },
        {
          name: 'yearSegments',
          type: 'number',
          default: '20',
          description: {
            zh: '「本年进度」那一排的格子数。20 格意味着每格约等于 18.25 天。',
            en: 'How many cells the “year progress” row is divided into. 20 cells works out to roughly 18.25 days each.',
          },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '1000',
          description: {
            zh: '重新计算年龄数据的间隔（毫秒）。只有填了 `birthDate` 才会启动计时器。',
            en: 'How often, in milliseconds, the age data recomputes. The timer only runs once `birthDate` is set.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体字号与内边距。', en: 'Overall type size and padding.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'dark'`,
          description: {
            zh: '组件自身的配色，与页面级 `[data-theme]` 无关。',
            en: 'This widget’s own palette, independent of the page-level `[data-theme]`.',
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
      zh: '出生日期输入是原生 `<input type="date">`，带 `<label>` 且用 `htmlFor` 正确关联，键盘与读屏都走浏览器自带的日期控件行为。',
      en: 'The birth-date field is a native `<input type="date">` with a properly associated `<label htmlFor>`, so keyboard and screen-reader behaviour comes straight from the browser’s own date control.',
    },
    {
      zh: '年/月/日的数字与「人生进度」「本年进度」的格子都是纯视觉展示，没有 `aria-live`。如果需要读屏用户感知到数字在变化，需要自己包一层 `role="status"`——但请谨慎，这些值每秒都在变，多数场景下持续播报只会造成噪音。',
      en: 'The year/month/day numbers and the life-/year-progress cells are purely visual and carry no `aria-live`. If a screen-reader user needs to notice the numbers changing, wrap them in your own `role="status"` — but be careful: these values move every second, and continuous announcements would be noise in most contexts.',
    },
    {
      zh: '所有颜色与透明度过渡都带 `motion-reduce:transition-none`，减弱动效偏好下数字仍然更新，只是不再有过渡动画。',
      en: 'Every colour and opacity transition carries `motion-reduce:transition-none` — under reduced motion the numbers still update, just without the transition.',
    },
    {
      zh: '十年格与本年格本身没有文字说明当前所处的具体阶段，仅靠位置与填充区分「已完成/当前/未来」。如果这个信息对你的用户很重要，建议在旁边补一句文字总结，比如「第 3 个十年，已过 42%」。',
      en: 'The decade and year cells rely on position and fill alone to distinguish completed, current, and upcoming — there is no text label for where you currently sit. If that matters to your users, add a short text summary alongside it, such as “3rd decade, 42% through”.',
    },
  ],
}
