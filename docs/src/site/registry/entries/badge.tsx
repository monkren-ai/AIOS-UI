import { Badge } from 'aios-ui-kit/badge'
import type { ComponentDoc } from '../types'

import BadgeVariants from '../../examples/badge/variants'
import BadgeSizes from '../../examples/badge/sizes'
import BadgeStatusDot from '../../examples/badge/status-dot'
import BadgeWithIcon from '../../examples/badge/with-icon'

import variantsSource from '../../examples/badge/variants.tsx?raw'
import sizesSource from '../../examples/badge/sizes.tsx?raw'
import statusDotSource from '../../examples/badge/status-dot.tsx?raw'
import withIconSource from '../../examples/badge/with-icon.tsx?raw'

export const badgeDoc: ComponentDoc = {
  slug: 'badge',
  name: 'Badge',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '短标记，用于状态、计数与分类。',
    en: 'A compact marker for statuses, counts, and categories.',
  },
  preview: () => <Badge>New</Badge>,
  importStatement: `import { Badge } from 'aios-ui-kit/badge'`,
  usageSnippet: `<Badge>New</Badge>`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '四档强调：`primary` 是反相实心，最抓眼；`soft` 用中性灰底，适合大量并置；`outline` 只留一条边，几乎不抢注意力；`destructive` 是唯一用 AIOS 红的一档，留给真的出问题的状态。',
        en: 'Four levels of emphasis. `primary` is inverted solid and loudest; `soft` uses a neutral fill and survives being repeated many times over; `outline` is just a hairline and barely competes for attention; `destructive` is the only one that reaches for the AIOS red, so save it for states that are actually wrong.',
      },
      code: variantsSource,
      render: () => <BadgeVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档高度是 16 / 20 / 24px。每档都带 `min-w`，等于高度，所以单个字符的计数徽标是正圆而不是被挤扁的胶囊。Badge 不是控件，不参与 44px 触摸目标那套规则。',
        en: 'The three heights are 16 / 20 / 24px, and each sets a `min-w` equal to its height — so a single-character count reads as a circle instead of a squashed pill. A badge is not a control, so the 44px touch-target rule does not apply here.',
      },
      code: sizesSource,
      render: () => <BadgeSizes />,
    },
    {
      id: 'status-dot',
      title: { zh: '状态圆点', en: 'Status dot' },
      description: {
        zh: '`dot` 在文字前插一个呼吸的圆点，颜色用 `bg-current`——所以它跟着所在变体走，`destructive` 下自然变红，不必额外配色。圆点带 `aria-hidden`，状态本身要靠文字说清楚。',
        en: '`dot` prepends a pulsing dot filled with `bg-current`, so it inherits the badge’s own colour and turns red under `destructive` without any extra wiring. The dot is `aria-hidden`; the text has to carry the actual status.',
      },
      code: statusDotSource,
      render: () => <BadgeStatusDot />,
    },
    {
      id: 'with-icon',
      title: { zh: '带图标', en: 'With an icon' },
      description: {
        zh: '直接把图标当 children 放进去就行，无需 `data-icon` 标注——Badge 里的 SVG 会被规范到 `1.15em`，跟着字号缩放，所以同一个图标在三档尺寸下都合身。',
        en: 'Just drop the icon in as a child; no `data-icon` marker needed. Any SVG inside a badge is normalised to `1.15em`, so it scales with the type and the same icon fits at all three sizes.',
      },
      code: withIconSource,
      render: () => <BadgeWithIcon />,
    },
  ],
  api: [
    {
      name: 'Badge',
      description: {
        zh: '渲染为 `<span>`，透传所有原生 span 属性（`title`、`aria-*`、`ref` …）。',
        en: 'Renders a `<span>` and forwards every native span prop (`title`, `aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'variant',
          type: `'primary' | 'soft' | 'outline' | 'destructive'`,
          default: `'primary'`,
          description: {
            zh: '视觉样式。v1 的 `default` 与 `secondary` 仍被接受，分别映射到 `primary` 与 `soft`。',
            en: 'Visual style. The v1 names `default` and `secondary` still work, mapping to `primary` and `soft`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '高度与字号。', en: 'Height and type size.' },
        },
        {
          name: 'dot',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '在文字前渲染一个呼吸的状态圆点，并收紧起始侧内边距。',
            en: 'Render a pulsing status dot before the text, and tighten the inline-start padding.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖变体自带的工具类。',
            en: 'Extra classes, merged via `tailwind-merge` so they override the variant’s own utilities.',
          },
        },
      ],
    },
    {
      name: 'badgeVariants',
      description: {
        zh: '生成 badge 类名的 CVA 函数。适合贴到需要保留自身语义的元素上，例如把一条状态标记做成 `<output>`。',
        en: 'The CVA function behind the class names. Use it on elements that must keep their own semantics — say, rendering a status marker as an `<output>`.',
      },
      props: [
        {
          name: 'variant',
          type: 'BadgeVariant',
          default: `'primary'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'BadgeSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'dot',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '只调整内边距，不会替你渲染圆点元素。',
            en: 'Only adjusts padding; it does not render the dot element for you.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Badge 是纯展示元素：一个没有 role 的 `<span>`。它不可聚焦，也不在 tab 序列里，因为标记不是控件。',
      en: 'A badge is presentational — a `<span>` with no role. It is not focusable and not in the tab order, because a marker is not a control.',
    },
    {
      zh: '`dot` 渲染的圆点带 `aria-hidden="true"`。颜色和动画都不传达信息，状态必须由 badge 的文字说出来（写 “Live”，而不是只留一个绿点）。',
      en: 'The `dot` element is `aria-hidden="true"`. Neither its colour nor its animation conveys anything, so the badge text must state the status in words — “Live”, not just a coloured dot.',
    },
    {
      zh: '当 badge 是某个控件的计数（例如按钮上的未读数）时，它自己不会被关联起来。请在控件上写完整的 `aria-label`，比如 `aria-label="Inbox, 12 unread"`。',
      en: 'When a badge annotates a control — an unread count on a button, say — nothing links the two automatically. Put the full label on the control: `aria-label="Inbox, 12 unread"`.',
    },
    {
      zh: '内容会实时变化的计数不要只靠 badge。把它放进一个带 `role="status"` 的容器，或者用 `aria-live`，否则读屏用户不会知道数字变了。',
      en: 'A count that changes at runtime needs more than a badge. Wrap it in a `role="status"` region or use `aria-live`, or screen-reader users will never hear the number change.',
    },
    {
      zh: '圆点的呼吸动画走 `motion-safe:animate-pulse`，用户开启减弱动效后完全停止；所有颜色过渡也带 `motion-reduce:` 兜底。',
      en: 'The dot pulses via `motion-safe:animate-pulse` and stops entirely under reduced motion; the colour transitions have `motion-reduce:` fallbacks too.',
    },
    {
      zh: 'badge 本身可以接收 `focus-visible` 的轮廓样式（基类里已有），但只有你显式给它 `tabIndex` 时才用得上——一般不要这么做。',
      en: 'The base classes include a `focus-visible` outline, but it only ever shows if you add a `tabIndex` yourself — which you generally should not.',
    },
  ],
}
