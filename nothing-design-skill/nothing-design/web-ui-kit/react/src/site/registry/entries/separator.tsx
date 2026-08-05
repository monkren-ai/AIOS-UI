import { Separator } from 'nothing-ui/separator'
import type { ComponentDoc } from '../types'

import SeparatorSizes from '../../examples/separator/sizes'
import SeparatorWithLabel from '../../examples/separator/with-label'
import SeparatorVertical from '../../examples/separator/vertical'
import SeparatorDecorative from '../../examples/separator/decorative'

import sizesSource from '../../examples/separator/sizes.tsx?raw'
import withLabelSource from '../../examples/separator/with-label.tsx?raw'
import verticalSource from '../../examples/separator/vertical.tsx?raw'
import decorativeSource from '../../examples/separator/decorative.tsx?raw'

export const separatorDoc: ComponentDoc = {
  slug: 'separator',
  name: 'Separator',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '分隔线，可横可竖，支持嵌入标签。',
    en: 'A divider, horizontal or vertical, optionally with a label.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Separator label="or" />
    </div>
  ),
  importStatement: `import { Separator } from 'nothing-ui/separator'`,
  usageSnippet: `<Separator />`,
  examples: [
    {
      id: 'sizes',
      title: { zh: '间距', en: 'Spacing' },
      description: {
        zh: '线本身永远是 1px 的 border 色，`size` 只改上下（竖向时是左右）的留白：4 / 8 / 16px。之所以把留白做进组件而不是交给外面的 margin，是因为分隔线的呼吸感是它的一半意义——只给一条线、留白靠调用方猜，最后每处都不一样。',
        en: 'The line is always a 1px border-coloured rule; `size` only changes the padding around it — 4 / 8 / 16px, block-axis for horizontal and inline-axis for vertical. The breathing room lives inside the component on purpose: it is half of what a divider does, and leaving it to each caller’s margin guarantees every instance ends up different.',
      },
      code: sizesSource,
      render: () => <SeparatorSizes />,
    },
    {
      id: 'with-label',
      title: { zh: '带标签', en: 'With a label' },
      description: {
        zh: '传 `label` 会自动切到 labeled 形态：两段线夹住一段等宽小字。这也是常见的 “or” 分割。注意传了 `label` 后组件不再输出 `role="separator"`（一个带可读文本的 separator 在 ARIA 里是矛盾的），所以带标签的分隔线在无障碍树里就是普通文本。',
        en: 'Passing `label` switches to the labeled form: two rules flanking a small monospaced word — the familiar “or” divider. Note that with a `label` the component no longer emits `role="separator"`, since a separator with readable text is contradictory in ARIA; a labeled divider is therefore just text in the accessibility tree.',
      },
      code: withLabelSource,
      render: () => <SeparatorWithLabel />,
    },
    {
      id: 'vertical',
      title: { zh: '竖向', en: 'Vertical' },
      description: {
        zh: '`orientation="vertical"` 用 `h-full`，所以它需要一个有确定高度的 flex 父容器——否则线会塌成 0。示例里父级给了 `h-6`。`aria-orientation` 会跟着一起改。',
        en: '`orientation="vertical"` relies on `h-full`, so it needs a flex parent with a resolved height or the rule collapses to nothing. The example gives the parent `h-6`. `aria-orientation` follows the prop.',
      },
      code: verticalSource,
      render: () => <SeparatorVertical />,
    },
    {
      id: 'decorative',
      title: { zh: '纯装饰', en: 'Decorative' },
      description: {
        zh: '当分隔线只是重复了一个已经由结构表达的边界——比如 `<li>` 之间——就用 `decorative`，它会置上 `aria-hidden` 并去掉 role。读屏用户已经从列表语义里知道条目边界了，再念一遍 “separator” 只是噪音。',
        en: 'When the rule only repeats a boundary the structure already conveys — between `<li>` items, for instance — use `decorative`, which sets `aria-hidden` and drops the role. A screen-reader user already knows where each item ends from the list semantics; announcing “separator” again is pure noise.',
      },
      code: decorativeSource,
      render: () => <SeparatorDecorative />,
    },
  ],
  api: [
    {
      name: 'Separator',
      description: {
        zh: '渲染为 `<div>`，内部是「线 + 可选标签 + 线」三段。透传所有原生 div 属性。',
        en: 'Renders a `<div>` containing rule, optional label, rule. Every native div prop is forwarded.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: {
            zh: '走向。竖向时依赖父容器的高度。',
            en: 'Direction. The vertical form depends on the parent’s height.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '线两侧的留白，同时决定标签字号。',
            en: 'Padding around the rule, which also sets the label’s type size.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '中缀文案。传了就自动进入 labeled 形态，并让组件不再输出 `role="separator"`。',
            en: 'The inline text. Passing it switches to the labeled form and suppresses `role="separator"`.',
          },
        },
        {
          name: 'labeled',
          type: 'boolean',
          description: {
            zh: '手动控制 `data-labeled`。默认由是否传了 `label` 推断；单独打开它不会凭空生出标签元素。',
            en: 'Force `data-labeled`. It is inferred from `label` by default, and turning it on alone does not conjure a label element.',
          },
        },
        {
          name: 'decorative',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '标为纯装饰：置 `aria-hidden="true"` 并去掉 role。',
            en: 'Mark it decorative: sets `aria-hidden="true"` and drops the role.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖留白等工具类。',
            en: 'Extra classes, merged via `tailwind-merge`, so the padding utilities are overridable.',
          },
        },
      ],
    },
    {
      name: 'separatorVariants',
      description: {
        zh: '生成外层容器类名的 CVA 函数。只包含容器（走向 + 留白），线与标签的类名分别来自 `separatorLineVariants` 与 `separatorLabelVariants`，未从子路径导出。',
        en: 'The CVA function for the outer container only (direction plus padding). The rule and label classes come from `separatorLineVariants` and `separatorLabelVariants`, which are not exported from the subpath.',
      },
      props: [
        {
          name: 'orientation',
          type: 'SeparatorOrientation',
          default: `'horizontal'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'SeparatorSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '默认输出 `role="separator"` 加上与 `orientation` 一致的 `aria-orientation`，读屏会把它报成一处分区边界。',
      en: 'By default it emits `role="separator"` plus an `aria-orientation` matching the prop, so assistive tech announces a section boundary.',
    },
    {
      zh: '`decorative` 会把 role 换成 `aria-hidden="true"`。判断标准很简单：这条线传达的边界，结构（列表、`<section>`、标题层级）是否已经表达过？表达过就设 `decorative`。',
      en: '`decorative` replaces the role with `aria-hidden="true"`. The test is simple: does the structure — a list, a `<section>`, a heading level — already convey this boundary? If so, mark it decorative.',
    },
    {
      zh: '传了 `label` 时组件既不输出 role 也不输出 `aria-hidden`：ARIA 的 separator 不该有可读子文本。此时标签文字本身就是给所有用户的提示，这是有意的取舍。',
      en: 'With a `label` the component emits neither the role nor `aria-hidden`, because an ARIA separator should not own readable child text. The label then reads as ordinary content for everyone, which is the intended trade-off.',
    },
    {
      zh: '这个 separator 不可聚焦。ARIA 里 separator 只有作为可调整分割条（如 resizable 面板）时才需要进 tab 序列并处理方向键——那是 `Resizable` 的职责，不是这里。',
      en: 'This separator is never focusable. In ARIA a separator only needs the tab order and arrow keys when it is a draggable split — that is `Resizable`’s job, not this component’s.',
    },
    {
      zh: '线的颜色用 `bg-border`，在浅色与深色主题下都满足非文本对比度要求；不要为了「更好看」把它调到与背景几乎同色。',
      en: 'The rule uses `bg-border`, which clears the non-text contrast requirement in both themes. Resist the urge to fade it into the background for looks.',
    },
  ],
}
