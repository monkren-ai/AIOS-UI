import { Tag } from 'nothing-ui/tag'
import type { ComponentDoc } from '../types'

import TagVariants from '../../examples/tag/variants'
import TagSizes from '../../examples/tag/sizes'
import TagFilter from '../../examples/tag/filter'
import TagRemovable from '../../examples/tag/removable'
import TagProximity from '../../examples/tag/proximity'

import variantsSource from '../../examples/tag/variants.tsx?raw'
import sizesSource from '../../examples/tag/sizes.tsx?raw'
import filterSource from '../../examples/tag/filter.tsx?raw'
import removableSource from '../../examples/tag/removable.tsx?raw'
import proximitySource from '../../examples/tag/proximity.tsx?raw'

export const tagDoc: ComponentDoc = {
  slug: 'tag',
  name: 'Tag',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '可移除的标签，常用于筛选条件与关键词。',
    en: 'A removable chip, typically for filters and keywords.',
  },
  preview: () => <Tag>Design</Tag>,
  importStatement: `import { Tag, Tags } from 'nothing-ui/tag'`,
  usageSnippet: `<Tags>
  <Tag onClick={() => toggle('design')}>Design</Tag>
  <Tag removable onRemove={() => remove('glyph')}>Glyph</Tag>
</Tags>`,
  composition: {
    zh: '`Tag` 单独用没问题，但一组标签建议包在 `Tags` 里：它负责 flex 换行与间距，也是 proximity 效果的锚点——`Tags` 会给每个直接子元素挂上 `data-proximity-active`，Tag 只是响应这个属性，脱离容器后 proximity 就无从生效。注意 `Tags` 只处理直接子元素，中间套一层 `<div>` 就断链了。',
    en: '`Tag` works on its own, but a group of them belongs inside `Tags`: it owns the wrapping flex layout and the spacing, and it is the anchor for the proximity effect — `Tags` sets `data-proximity-active` on each direct child, and `Tag` merely reacts to it, so proximity cannot work outside the container. Note that `Tags` only reaches its direct children; wrapping them in a `<div>` breaks the chain.',
  },
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`secondary` 是默认值，也是筛选条最常用的一档：默认压暗，hover 时提亮并轻微放大。`soft` 有填充，适合放在深色卡片上；`ghost` 完全无边框，适合密集列表；`destructive` 只用于表示「移除后果不可逆」的标签。',
        en: '`secondary` is the default and the one filter bars want: muted at rest, brightening and lifting slightly on hover. `soft` has a fill and holds up on darker cards, `ghost` drops the border for dense lists, and `destructive` is reserved for tags whose removal is destructive.',
      },
      code: variantsSource,
      render: () => <TagVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸与形状', en: 'Size and shape' },
      description: {
        zh: '三档高度是 24 / 28 / 32px，都低于 44px 的触摸目标——标签本来就是密集排布的，如果它是移动端上的主要交互手段，请自己加上 padding 或改用按钮。`shape` 与 `variant` 正交：`pill` 是默认，`technical` 换成方角。',
        en: 'The three heights are 24 / 28 / 32px, all below the 44px touch target — tags are meant to sit densely. If they are the primary interaction on a touch device, pad them yourself or use buttons instead. `shape` is orthogonal to `variant`: `pill` by default, `technical` for square corners.',
      },
      code: sizesSource,
      render: () => <TagSizes />,
    },
    {
      id: 'filter',
      title: { zh: '做筛选条', en: 'As a filter bar' },
      description: {
        zh: '`active` 只负责视觉选中态，不会写任何 aria——所以多选筛选请自己加 `aria-pressed`，让读屏用户听得到状态。`disabled` 会把 `tabIndex` 设成 -1 并吞掉点击。注意 `onClick` 的签名是 `() => void`，拿不到事件对象。',
        en: '`active` is visual only and writes no ARIA, so add `aria-pressed` yourself on a multi-select filter bar or screen-reader users hear nothing. `disabled` sets `tabIndex` to -1 and swallows clicks. Note that `onClick` is typed `() => void` — there is no event object.',
      },
      code: filterSource,
      render: () => <TagFilter />,
    },
    {
      id: 'removable',
      title: { zh: '可移除', en: 'Removable' },
      description: {
        zh: '`removable` 在尾部插一个真正的 `<button>`，`onRemove` 时它会 `stopPropagation`，所以 Tag 自己的 `onClick` 不会跟着触发。它自带 `aria-label="Remove"`——如果一屏里有多个可移除标签，这个标签太笼统了，建议在外层用 `aria-label` 说清是哪一项。',
        en: '`removable` appends a real `<button>`, and its handler stops propagation so the tag’s own `onClick` does not also fire. It ships with `aria-label="Remove"`, which is too vague once several removable tags share a screen — give the surrounding tag an `aria-label` that names the item.',
      },
      code: removableSource,
      render: () => <TagRemovable />,
    },
    {
      id: 'proximity',
      title: { zh: '邻近高亮', en: 'Proximity highlight' },
      description: {
        zh: '`Tags` 的 `proximity` 打开后，离指针最近的标签会提亮放大，同组其余压暗到 55% 不透明度。`"x"` / `"y"` 限制测距轴向——横向单行标签用 `"x"` 更稳，否则鼠标在上下方向的抖动会引起误判。放大在减弱动效下自动关闭。',
        en: 'With `proximity` on, `Tags` brightens and scales the chip nearest the pointer and drops the rest of the group to 55% opacity. `"x"` and `"y"` constrain which axis counts — a single horizontal row is steadier with `"x"`, otherwise vertical pointer jitter keeps changing the winner. The scale-up switches off under reduced motion.',
      },
      code: proximitySource,
      render: () => <TagProximity />,
    },
  ],
  api: [
    {
      name: 'Tag',
      description: {
        zh: '渲染为 `<span>`，透传原生 span 属性（`onClick` 被重新定义）。',
        en: 'Renders a `<span>` and forwards native span props, except that `onClick` is redefined.',
      },
      props: [
        {
          name: 'variant',
          type: `'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive'`,
          default: `'secondary'`,
          description: {
            zh: '视觉样式。v1 的 `default` / `pill` / `technical` 仍被接受；其中 `technical` 只是形状，会被翻译到 `shape`。',
            en: 'Visual style. The v1 names `default`, `pill`, and `technical` still work; `technical` was only ever a shape and is translated onto `shape`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '高度与字号。', en: 'Height and type size.' },
        },
        {
          name: 'shape',
          type: `'pill' | 'technical'`,
          default: `'pill'`,
          description: { zh: '胶囊或工业风方角。', en: 'Pill, or industrial square corners.' },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '选中态。只改样式并置上 `data-active`，不写 aria。',
            en: 'Selected state. Purely visual plus `data-active`; it writes no ARIA.',
          },
        },
        {
          name: 'removable',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '在尾部渲染一个移除按钮。按钮存在与否只看这个 prop，不看有没有传 `onRemove`。',
            en: 'Render a remove button at the end. Its presence depends on this prop alone, not on whether `onRemove` is set.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '压暗、移出 tab 序列，并让 `onClick` 与 `onRemove` 都不再触发。',
            en: 'Dim it, take it out of the tab order, and stop both `onClick` and `onRemove` from firing.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '点击或按 Enter / Space 时触发。注意没有事件参数。',
            en: 'Fires on click and on Enter / Space. Note there is no event argument.',
          },
        },
        {
          name: 'onRemove',
          type: '() => void',
          description: {
            zh: '移除按钮的回调。组件不会自己删掉标签，列表状态由你维护。',
            en: 'Handler for the remove button. The component does not delete anything; the list stays your state.',
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
      name: 'Tags',
      description: {
        zh: '一组标签的容器，渲染为 `<div>`。透传原生 div 属性。',
        en: 'The container for a group of tags, rendered as a `<div>`. Native div props pass through.',
      },
      props: [
        {
          name: 'proximity',
          type: `boolean | 'x' | 'y' | 'xy'`,
          default: 'false',
          description: {
            zh: '开启邻近高亮。`true` 等价于 `"xy"`；给字符串可以只按某个轴测距。开启后容器会克隆每个直接子元素以注入 ref 与 `data-proximity-active`。',
            en: 'Enable the proximity highlight. `true` means `"xy"`; a string restricts the measured axis. When on, the container clones each direct child to inject a ref and `data-proximity-active`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。默认布局是 `flex flex-wrap gap-1`，间距可以直接覆盖。',
            en: 'Extra classes. The default layout is `flex flex-wrap gap-1`, so the gap is easy to override.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Tag 是带 `role="button"` 的 `<span>`：默认 `tabIndex=0`，Enter 与 Space 都会触发 `onClick`（并 `preventDefault`，避免 Space 滚页）。',
      en: 'A tag is a `<span>` with `role="button"`: `tabIndex=0` by default, and both Enter and Space fire `onClick` (with `preventDefault`, so Space does not scroll the page).',
    },
    {
      zh: '这个 role 是无条件的——就算你不传 `onClick`，读屏软件也会把它报成按钮。纯展示的标记请改用 `Badge`。',
      en: 'That role is unconditional: even with no `onClick`, assistive tech announces a button. For a purely presentational marker, use `Badge` instead.',
    },
    {
      zh: '选中态没有对应的 aria。多选筛选请自己传 `aria-pressed`，单选场景考虑 `aria-checked` 配 `role="radio"`（覆盖默认 role）。',
      en: 'The selected state has no ARIA counterpart. Pass `aria-pressed` for multi-select filters; for single-select, consider `aria-checked` with `role="radio"` overriding the default.',
    },
    {
      zh: '移除按钮是嵌套在 Tag 内部的真正 `<button>`，独立可聚焦，`aria-label="Remove"`。这意味着可移除标签在 tab 序列里占两站——标签本身，然后是它的移除按钮。',
      en: 'The remove control is a real nested `<button>`, separately focusable, labelled `aria-label="Remove"`. That means a removable tag takes two stops in the tab order: the tag, then its remove button.',
    },
    {
      zh: '`disabled` 会把 Tag 与移除按钮的 `tabIndex` 都设成 -1，但不会加 `aria-disabled`——需要让读屏说出「不可用」时请自己补上。',
      en: '`disabled` sets `tabIndex` to -1 on both the tag and its remove button, but it does not add `aria-disabled` — add that yourself if the state needs to be announced.',
    },
    {
      zh: 'proximity 的放大与 hover 的位移都写在 `motion-reduce:` 之外，开启减弱动效后只剩颜色与不透明度变化。',
      en: 'The proximity scale-up and the hover lift are both gated by `motion-reduce:`, so under reduced motion only colour and opacity change.',
    },
  ],
}
