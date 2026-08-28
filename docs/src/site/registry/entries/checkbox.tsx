import { Checkbox } from 'aios-ui-kit/checkbox'
import type { ComponentDoc } from '../types'

import CheckboxBasic from '../../examples/checkbox/basic'
import CheckboxSizes from '../../examples/checkbox/sizes'
import CheckboxIndeterminate from '../../examples/checkbox/indeterminate'
import CheckboxControlled from '../../examples/checkbox/controlled'

import basicSource from '../../examples/checkbox/basic.tsx?raw'
import sizesSource from '../../examples/checkbox/sizes.tsx?raw'
import indeterminateSource from '../../examples/checkbox/indeterminate.tsx?raw'
import controlledSource from '../../examples/checkbox/controlled.tsx?raw'

export const checkboxDoc: ComponentDoc = {
  slug: 'checkbox',
  name: 'Checkbox',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'Checkbox',
  description: {
    zh: '勾选框，支持选中、未选与中间态。',
    en: 'A checkbox with checked, unchecked, and indeterminate states.',
  },
  preview: () => <Checkbox label="Accept" defaultChecked />,
  importStatement: `import { Checkbox } from 'aios-ui-kit/checkbox'`,
  usageSnippet: `<Checkbox label="Accept" defaultChecked />`,
  composition: {
    zh: '组件最外层是一个 `<label>`，里面包着 Base UI 的 `Checkbox.Root` 和文字。这样点标签文字也能切换状态，不需要你手动配 `htmlFor` / `id`。',
    en: 'The outermost element is a `<label>` wrapping Base UI’s `Checkbox.Root` and the text. That is what makes clicking the text toggle the box, with no `htmlFor` / `id` pairing on your side.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`label` 是可选的：不传就只剩一个方框，这时候必须自己给 `aria-label`，否则读屏软件念不出它是干什么的。行高固定走 36 / 44 / 52 的触达基线，所以竖排多个时不用额外加间距。',
        en: '`label` is optional — leave it out and you get a bare box, which then needs its own `aria-label` or assistive tech has nothing to announce. The row height follows the 36 / 44 / 52 touch baseline, so a vertical stack needs no extra spacing.',
      },
      code: basicSource,
      render: () => <CheckboxBasic />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 同时调方框、勾号和文字。注意方框本身只有 16–22px，真正保证可点击的是整行 36 / 44 / 52px 的高度加上包住文字的 `<label>`——所以别把 `label` 省掉再抱怨难点。',
        en: '`size` scales the box, the check mark, and the text together. The box itself is only 16–22px; what actually makes it easy to hit is the 36 / 44 / 52px row height plus the `<label>` wrapping the text — which is a good reason not to drop `label`.',
      },
      code: sizesSource,
      render: () => <CheckboxSizes />,
    },
    {
      id: 'indeterminate',
      title: { zh: '中间态', en: 'Indeterminate' },
      description: {
        zh: '把 `checked` 设成 `"indeterminate"` 就得到那条横线，用来表示「部分子项被选中」。它不是第三种取值，只是显示：点击时 Base UI 只会回给你 `true` / `false`，中间态该跳到哪一档由你决定——下面的例子选的是「全不选 → 全选」。',
        en: 'Pass `checked="indeterminate"` for the dash that means “some children are selected”. It is a display state, not a third value: Base UI still only reports `true` / `false` on click, so you decide where the dash jumps to — the example below goes to “select all”.',
      },
      code: indeterminateSource,
      render: () => <CheckboxIndeterminate />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '`onCheckedChange` 的类型是 `boolean | "indeterminate"`，但实际上永远只会收到 `boolean`——中间态是你自己算出来喂进去的。所以写 `checked === true` 而不是直接当布尔用，能让类型和现实对上。',
        en: 'The type of `onCheckedChange` is `boolean | "indeterminate"`, but in practice you only ever receive a `boolean` — the indeterminate state is something you compute and feed in. Writing `checked === true` rather than treating it as a bare boolean keeps the types honest.',
      },
      code: controlledSource,
      render: () => <CheckboxControlled />,
    },
  ],
  api: [
    {
      name: 'Checkbox',
      description: {
        zh: '除 `onChange` 外的原生 `<label>` 属性都透传到最外层 `<label>` 上。',
        en: 'Every native `<label>` prop except `onChange` is forwarded to the outer `<label>`.',
      },
      props: [
        {
          name: 'checked',
          type: `boolean | 'indeterminate'`,
          description: {
            zh: '受控状态。传了它就完全由你控制，内部状态不再生效。',
            en: 'Controlled state. Once set, the component stops tracking its own.',
          },
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          default: 'false',
          description: { zh: '非受控初始状态。', en: 'Initial state when uncontrolled.' },
        },
        {
          name: 'onCheckedChange',
          type: `(checked: boolean | 'indeterminate') => void`,
          description: {
            zh: '状态变化回调。实际只会以 `boolean` 调用。',
            en: 'Fires on change. In practice it is only ever called with a `boolean`.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '方框右侧的文字，包在同一个 `<label>` 里，点击即可切换。',
            en: 'Text beside the box, inside the same `<label>`, so clicking it toggles.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '方框与行高阶梯：行高 36 / 44 / 52px。',
            en: 'Box and row scale; rows are 36 / 44 / 52px.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用交互，整行降到 40% 不透明度。',
            en: 'Block interaction and drop the whole row to 40% opacity.',
          },
        },
        {
          name: 'id',
          type: 'string',
          description: {
            zh: '透传给内部的 checkbox 元素，供外部 `<label htmlFor>` 或表单关联使用。',
            en: 'Forwarded to the inner checkbox element, for an external `<label htmlFor>` or form wiring.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层 `<label>` 的类名。',
            en: 'Extra classes on the outer `<label>`.',
          },
        },
      ],
    },
    {
      name: 'checkboxVariants',
      description: {
        zh: '最外层行的 CVA 函数。方框、勾号、横线、文字分别对应 `checkboxBoxVariants` / `checkboxCheckVariants` / `checkboxDashVariants` / `checkboxLabelVariants`。',
        en: 'The CVA function for the outer row. The box, check, dash, and text map to `checkboxBoxVariants`, `checkboxCheckVariants`, `checkboxDashVariants`, and `checkboxLabelVariants`.',
      },
      props: [
        {
          name: 'size',
          type: 'CheckboxSize',
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
      zh: '底层是 Base UI 的 `Checkbox.Root`，`role="checkbox"` 与 `aria-checked`（含 `mixed`）都由它维护，Space 切换状态。',
      en: 'It is built on Base UI’s `Checkbox.Root`, which maintains `role="checkbox"` and `aria-checked` (including `mixed`), and toggles on Space.',
    },
    {
      zh: '整个组件包在 `<label>` 里，所以文字本身就是命中区域，不需要额外的 `htmlFor`。',
      en: 'The whole component sits inside a `<label>`, so the text is part of the hit area without any `htmlFor` wiring.',
    },
    {
      zh: '不传 `label` 时组件没有可访问名称，必须自己补 `aria-label`。',
      en: 'Without `label` there is no accessible name, so you must supply an `aria-label`.',
    },
    {
      zh: '焦点环用 `focus-visible:outline`，只在键盘操作时出现，鼠标点击不会闪一下。',
      en: 'The focus ring uses `focus-visible:outline`, so it appears for keyboard use and does not flash on mouse clicks.',
    },
    {
      zh: '勾选是 SVG `stroke-dashoffset` 描边，不是缩放弹入。减弱动效时勾号直接出现。',
      en: 'The check is an SVG `stroke-dashoffset` draw, not a scale-in. Reduced motion shows the mark immediately.',
    },
  ],
}
