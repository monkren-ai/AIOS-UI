import { ProgressBar } from 'aios-ui-kit/progress-bar'
import type { ComponentDoc } from '../types'

import ProgressBarReadout from '../../examples/progress-bar/readout'
import ProgressBarStatus from '../../examples/progress-bar/status'
import ProgressBarSegments from '../../examples/progress-bar/segments'
import ProgressBarSlim from '../../examples/progress-bar/slim'
import ProgressBarIndeterminate from '../../examples/progress-bar/indeterminate'

import readoutSource from '../../examples/progress-bar/readout.tsx?raw'
import statusSource from '../../examples/progress-bar/status.tsx?raw'
import segmentsSource from '../../examples/progress-bar/segments.tsx?raw'
import slimSource from '../../examples/progress-bar/slim.tsx?raw'
import indeterminateSource from '../../examples/progress-bar/indeterminate.tsx?raw'

export const progressBarDoc: ComponentDoc = {
  slug: 'progress-bar',
  name: 'ProgressBar',
  category: 'feedback',
  status: 'stable',
  description: {
    zh: '进度条，支持确定进度与不确定进度两种模式。',
    en: 'A progress bar, in both determinate and indeterminate modes.',
  },
  preview: () => (
    <ProgressBar
      className="w-full max-w-sm"
      value={64}
      label="Storage"
      unit="%"
      aria-label="Storage used"
    />
  ),
  importStatement: `import { ProgressBar } from 'aios-ui-kit/progress-bar'`,
  usageSnippet: `<ProgressBar value={64} label="Storage" unit="%" aria-label="Storage used" />`,
  examples: [
    {
      id: 'readout',
      title: { zh: '读数行', en: 'The readout' },
      description: {
        zh: '默认在轨道下方给出一行读数：起始侧是数值（`unit` 作为小一号的后缀），末端是 `label`。数字用 `tabular-nums`，所以进度变化时它不会左右跳动。只想要一条轨道就设 `showReadout={false}`——但那样进度就完全靠视觉表达了，别忘了给控件本身一个名字。',
        en: 'By default a readout sits under the track: the value on the inline-start side (with `unit` as a smaller suffix) and `label` at the end. The number uses `tabular-nums`, so it does not jitter as the value changes. Set `showReadout={false}` for a bare track — but then progress is conveyed visually only, so the control itself had better have a name.',
      },
      code: readoutSource,
      render: () => <ProgressBarReadout />,
    },
    {
      id: 'status',
      title: { zh: '状态', en: 'Status' },
      description: {
        zh: '`status` 同时给已填充的刻度和读数上色：`good` 绿、`warning` 黄、`overlimit` 用 AIOS 红、`error` 用错误色。这四档是全库少见的多色场景——进度条的语义就是「量」，量到了什么程度需要颜色帮忙。`disabled` 只是整体压到 40% 不透明度，不改状态色。',
        en: '`status` tints both the filled ticks and the readout: green for `good`, yellow for `warning`, the AIOS red for `overlimit`, and the error colour for `error`. These four are a rare multi-colour moment in the library, justified because a progress bar is about quantity and how far along it is genuinely benefits from colour. `disabled` just drops the whole thing to 40% opacity without touching the status colour.',
      },
      code: statusSource,
      render: () => <ProgressBarStatus />,
    },
    {
      id: 'segments',
      title: { zh: '分段', en: 'Segments' },
      description: {
        zh: 'AIOS 的进度条是分段刻度而不是连续条，`segments` 决定切成几段（默认 20）。段数应该和你要表达的粒度对上：10 步的向导就用 `segments={10}`，让每一段正好等于一步；段数拉到 60 以上视觉上就接近实心条，反而丢掉了「刻度」这个语言。填充段数按 `value / total` 四舍五入，所以显示的格数可能和读数略有出入。',
        en: 'The bar is a row of ticks rather than a continuous fill, and `segments` sets how many (20 by default). Match the count to the granularity you are describing: a ten-step wizard wants `segments={10}` so one tick equals one step. Past sixty it reads as a solid bar and loses the tick language entirely. The filled count is `value / total` rounded, so the ticks can be marginally ahead of or behind the printed number.',
      },
      code: segmentsSource,
      render: () => <ProgressBarSegments />,
    },
    {
      id: 'slim',
      title: { zh: '细轨与高度', en: 'Slim and heights' },
      description: {
        zh: '`variant="slim"` 是 4px 的细轨，并且强制隐藏读数——它是给「进度不是重点」的位置准备的，比如列表行底部。分段形态的三档高度是 5 / 10 / 20px；`slim` 会覆盖掉 `size` 的高度，所以两者组合时只有间距还有区别。',
        en: '`variant="slim"` is a 4px track that also forces the readout off — it is for places where progress is context rather than content, like the bottom edge of a list row. The segmented form comes in 5 / 10 / 20px heights; `slim` overrides the height from `size`, so combining them only changes the gap between ticks.',
      },
      code: slimSource,
      render: () => <ProgressBarSlim />,
    },
    {
      id: 'indeterminate',
      title: { zh: '不确定进度', en: 'Indeterminate' },
      description: {
        zh: '`indeterminate` 换成一条来回扫过的游标，同时撤掉 `aria-valuenow`——这正是 ARIA 规定的「进度未知」表示法，读屏会播报「忙」而不是编一个百分比。它还会隐藏读数，因为没有数可读。注意 `value` 仍是必填的类型，随便传个 `0` 即可。',
        en: '`indeterminate` swaps in a sweeping cursor and drops `aria-valuenow`, which is exactly how ARIA expresses unknown progress — assistive tech reports busy instead of inventing a percentage. It also hides the readout, since there is no number to read. Note that `value` is still required by the type; pass `0`.',
      },
      code: indeterminateSource,
      render: () => <ProgressBarIndeterminate />,
    },
  ],
  api: [
    {
      name: 'ProgressBar',
      description: {
        zh: '渲染为带 `role="progressbar"` 的 `<div>`，透传原生 div 属性。`children` 被移除。',
        en: 'Renders a `<div>` with `role="progressbar"` and forwards native div props. `children` is omitted from the type.',
      },
      props: [
        {
          name: 'value',
          type: 'number',
          description: {
            zh: '当前进度。必填，即使 `indeterminate` 也要给一个值。',
            en: 'The current progress. Required, even in `indeterminate` mode.',
          },
        },
        {
          name: 'total',
          type: 'number',
          default: '100',
          description: {
            zh: '进度上限，同时是 `aria-valuemax`。组件不会做范围校验，超出 `total` 的 `value` 只会把所有刻度填满。',
            en: 'The upper bound, and the value of `aria-valuemax`. AIOS is clamped: a `value` beyond `total` simply fills every tick.',
          },
        },
        {
          name: 'segments',
          type: 'number',
          default: '20',
          description: { zh: '轨道被切成几段。', en: 'How many ticks the track is divided into.' },
        },
        {
          name: 'variant',
          type: `'segmented' | 'slim'`,
          default: `'segmented'`,
          description: {
            zh: '结构而非强调层级：`slim` 是 4px 细轨且没有读数。v1 的 `default` 仍被接受。',
            en: 'Structure rather than emphasis: `slim` is a 4px track with no readout. The v1 name `default` still works.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '轨道高度（5 / 10 / 20px）。v1 的 `compact` / `standard` / `hero` 仍被接受。`slim` 会覆盖高度。',
            en: 'Track height (5 / 10 / 20px). The v1 names `compact`, `standard`, and `hero` still work. `slim` overrides the height.',
          },
        },
        {
          name: 'status',
          type: `'default' | 'good' | 'warning' | 'overlimit' | 'error'`,
          default: `'default'`,
          description: {
            zh: '已填充刻度与读数的颜色。',
            en: 'The colour of the filled ticks and the readout.',
          },
        },
        {
          name: 'indeterminate',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '进度未知：换成扫动游标，撤掉 `aria-valuenow`，并隐藏读数。',
            en: 'Unknown progress: sweeping cursor, no `aria-valuenow`, readout hidden.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '读数行末端的说明文字。它不是无障碍名称，见下方说明。',
            en: 'The caption at the end of the readout. It is not the accessible name — see below.',
          },
        },
        {
          name: 'unit',
          type: 'string',
          description: {
            zh: '数值后缀，例如 `%` 或 `GB`。',
            en: 'A suffix for the value, such as `%` or `GB`.',
          },
        },
        {
          name: 'showReadout',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '是否显示读数行。`slim` 与 `indeterminate` 下无论如何都不显示。',
            en: 'Whether to render the readout. It is suppressed regardless under `slim` and `indeterminate`.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '压到 40% 不透明度，并置 `data-state="disabled"`。纯视觉，不写 aria。',
            en: 'Drop to 40% opacity and set `data-state="disabled"`. Purely visual; no ARIA is written.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在最外层。宽度就靠它给——组件自己不设宽度。',
            en: 'Extra classes on the outer element. Width comes from here, since the component sets none.',
          },
        },
      ],
    },
    {
      name: 'progressBarVariants',
      description: {
        zh: '生成最外层容器类名的 CVA 函数。轨道、刻度、游标、读数各有自己的 CVA，其中只有 `progressValueVariants` 一并从子路径导出。',
        en: 'The CVA function for the outer container. The track, ticks, cursor, and readout each have their own CVA, of which only `progressValueVariants` is also exported from the subpath.',
      },
      props: [
        {
          name: 'variant',
          type: `'segmented' | 'slim'`,
          default: `'segmented'`,
          description: {
            zh: '同上。不接受 v1 别名，需要先过 `resolveProgressBarVariant`。',
            en: 'Same as above. It does not take the v1 alias, so run it through `resolveProgressBarVariant` first.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根元素始终带 `role="progressbar"`、`aria-valuemin={0}` 与 `aria-valuemax={total}`，确定进度时再补 `aria-valuenow={value}`。',
      en: 'The root always carries `role="progressbar"`, `aria-valuemin={0}`, and `aria-valuemax={total}`, plus `aria-valuenow={value}` when progress is determinate.',
    },
    {
      zh: '`indeterminate` 时 `aria-valuenow` 被刻意省略。ARIA 规定：进度未知就不要给 `valuenow`，读屏据此播报「忙」；填一个 0 会被理解成「刚开始且卡住了」。',
      en: '`aria-valuenow` is deliberately omitted when `indeterminate`. ARIA says an unknown progress should have no `valuenow`, which is how assistive tech knows to report busy; supplying 0 instead reads as “started and stuck”.',
    },
    {
      zh: '组件不会替你生成无障碍名称。`label` 只是读数行里的视觉文字，不带 `aria-labelledby`——所以每个 ProgressBar 都要自己传 `aria-label`，或者用 `aria-labelledby` 指向页面上已有的标题。',
      en: 'The component generates no accessible name. `label` is only visual text in the readout, with no `aria-labelledby` wiring, so every ProgressBar needs its own `aria-label` — or an `aria-labelledby` pointing at a heading you already have.',
    },
    {
      zh: '`unit` 也只影响视觉。读屏念到的是 `aria-valuenow` 的裸数字，「64」和「64%」的区别丢了——想让它准确，配 `aria-valuetext="64%"`。',
      en: '`unit` is visual too. A screen reader reads the bare `aria-valuenow`, so the difference between “64” and “64 percent” is lost; pass `aria-valuetext="64%"` when that matters.',
    },
    {
      zh: '`status` 与 `disabled` 都只改颜色和不透明度，不写任何 aria。「超限」「失败」这类信息必须同时出现在文字里（`label` 或旁边的说明），否则只有能分辨颜色的用户看得到。',
      en: '`status` and `disabled` only change colour and opacity and write no ARIA. Meanings like “over limit” or “failed” must appear in text as well — in `label` or nearby copy — or only users who can distinguish the colours will get them.',
    },
    {
      zh: '不定量游标的动画走 `motion-safe:`；开启减弱动效后它不再横向平移，而是整条轨道做呼吸——依然表达「在动」，但没有位移。',
      en: 'The indeterminate cursor animates under `motion-safe:`. With reduced motion it stops travelling and the whole track breathes instead — still clearly active, but nothing moves across the screen.',
    },
    {
      zh: '刻度填充有一段 50ms 延迟后的入场过渡，纯视觉；`aria-valuenow` 是同步更新的，读屏不会等动画。',
      en: 'The ticks fill in through a transition kicked off 50ms after mount, which is purely visual; `aria-valuenow` updates synchronously, so assistive tech never waits on the animation.',
    },
  ],
}
