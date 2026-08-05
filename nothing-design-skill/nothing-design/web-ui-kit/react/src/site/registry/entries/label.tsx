import { Label } from 'nothing-ui/label'
import type { ComponentDoc } from '../types'

import LabelBasic from '../../examples/label/basic'
import LabelSizes from '../../examples/label/sizes'
import LabelRequired from '../../examples/label/required'
import LabelDisabled from '../../examples/label/disabled'

import basicSource from '../../examples/label/basic.tsx?raw'
import sizesSource from '../../examples/label/sizes.tsx?raw'
import requiredSource from '../../examples/label/required.tsx?raw'
import disabledSource from '../../examples/label/disabled.tsx?raw'

export const labelDoc: ComponentDoc = {
  slug: 'label',
  name: 'Label',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '表单标签，点击时把焦点交给关联控件。',
    en: 'A form label that hands focus to the control it names.',
  },
  preview: () => <Label required>Serial number</Label>,
  importStatement: `import { Label } from 'nothing-ui/label'`,
  usageSnippet: `<Label htmlFor="email">Email</Label>`,
  composition: {
    zh: '这是个原生 `<label>`，只是把 Nothing 的标签排版（等宽字体、全大写、宽字距、`foreground-muted`）固化下来。`Input`、`Textarea`、`Select`、`Slider` 都自带 `label` 属性，日常表单用那个就够；当你需要自己决定标签的位置——放在控件右侧、和别的元素同一行、或者标注一组控件——才轮到 `Label` 出场。',
    en: 'A native `<label>` that fixes the Nothing label typography in place: monospace, uppercase, wide tracking, `foreground-muted`. `Input`, `Textarea`, `Select`, and `Slider` all have their own `label` prop, which covers ordinary forms. `Label` is for when you need to place the text yourself — beside the control, on a shared row, or naming a group.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`htmlFor` 必须指向控件的 `id`，这条关联既让点击标签能聚焦控件，也让读屏软件读出控件的名字。跟 `Input` 自带的 `label` 相比，手写这一对的唯一理由是你要自己排版；只是想在上面放一行字的话，用 `label` 属性更省事也更不容易漏配 `id`。',
        en: '`htmlFor` has to match the control’s `id`. That link is what makes clicking the text focus the control, and what gives the control its name in assistive tech. The only reason to hand-write the pair instead of using `Input`’s built-in `label` is that you want to control the layout; if you just need a line of text above the field, the prop is less code and one fewer `id` to forget.',
      },
      code: basicSource,
      render: () => <LabelBasic />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档字号对齐 `Input` / `Textarea` 的 `sm` / `md` / `lg`，所以手写标签配某个尺寸的控件时，`size` 跟着填一样的值就能和内建标签长得一致。',
        en: 'The three steps line up with `sm` / `md` / `lg` on `Input` and `Textarea`, so when you pair a hand-written label with a sized control, matching the `size` gets you the same result as the built-in label.',
      },
      code: sizesSource,
      render: () => <LabelSizes />,
    },
    {
      id: 'required',
      title: { zh: '必填标记', en: 'Required marker' },
      description: {
        zh: '`required` 加一个红色星号，且它是 `aria-hidden` 的——星号是给眼睛看的约定，读屏软件应该从控件自己的 `required` / `aria-required` 得知必填性。所以这两处要一起写，只标星号等于对读屏用户隐瞒了这条规则。',
        en: '`required` adds a red asterisk, and that asterisk is `aria-hidden`: it is a visual convention, while assistive tech should learn the constraint from the control’s own `required` / `aria-required`. Set both — an asterisk alone hides the rule from screen reader users.',
      },
      code: requiredSource,
      render: () => <LabelRequired />,
    },
    {
      id: 'disabled',
      title: { zh: '禁用', en: 'Disabled' },
      description: {
        zh: '`disabled` 只改标签自己的配色和光标，不会影响关联的控件——控件的禁用状态要单独设。这看起来重复，但标签和控件本来就是两个元素，能不能编辑是控件说了算。',
        en: '`disabled` only changes the label’s own colour and cursor; it does not reach the control, which you disable separately. That looks redundant, but the label and the control are two elements, and whether something is editable is the control’s business.',
      },
      code: disabledSource,
      render: () => <LabelDisabled />,
    },
  ],
  api: [
    {
      name: 'Label',
      description: {
        zh: '透传所有原生 `<label>` 属性（`htmlFor`、`id`、`onClick`、`ref` …）。',
        en: 'Forwards every native `<label>` prop (`htmlFor`, `id`, `onClick`, `ref`, …).',
      },
      props: [
        {
          name: 'htmlFor',
          type: 'string',
          description: {
            zh: '关联控件的 `id`。这是这个组件存在的意义，别省。',
            en: 'The `id` of the control it names. This is the whole point of the component — do not skip it.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '字号阶梯，与 `Input` / `Textarea` 的同名尺寸对齐。',
            en: 'Type scale, matching the same-named sizes on `Input` and `Textarea`.',
          },
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '在文字后追加 `aria-hidden` 的红色星号，并置上 `data-required`。',
            en: 'Append an `aria-hidden` red asterisk and set `data-required`.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '标签自身的禁用外观，不影响关联控件。',
            en: 'The label’s own disabled appearance; the control is unaffected.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '标签内容，包在 `data-slot="label-text"` 的 `<span>` 里。',
            en: 'The label content, wrapped in a `<span data-slot="label-text">`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，经 `tailwind-merge` 合并，可以覆盖默认的大写与字距。',
            en: 'Extra classes, merged via `tailwind-merge`, so they can override the default uppercase and tracking.',
          },
        },
      ],
    },
    {
      name: 'labelVariants',
      description: {
        zh: '标签类名的 CVA 函数。文字与星号分别是 `labelTextVariants` / `labelRequiredVariants`。',
        en: 'The CVA function behind the label classes. The text and asterisk have `labelTextVariants` and `labelRequiredVariants`.',
      },
      props: [
        {
          name: 'size',
          type: 'LabelSize',
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
      zh: '渲染的是原生 `<label>`：配好 `htmlFor` 后，点击标签会聚焦控件，读屏软件也会把它当作控件的可访问名称。',
      en: 'It renders a native `<label>`: once `htmlFor` is set, clicking it focuses the control and assistive tech uses it as the control’s accessible name.',
    },
    {
      zh: '必填星号是 `aria-hidden="true"`，不会被念成「星号」。必填语义请落在控件的 `required` / `aria-required` 上。',
      en: 'The required asterisk is `aria-hidden="true"`, so it is never read out as “star”. Express the constraint on the control with `required` / `aria-required`.',
    },
    {
      zh: '`disabled` 只是视觉与光标的变化，不带任何 ARIA 语义——读屏软件是从控件那边知道它不可用的。',
      en: '`disabled` is purely visual and a cursor change, with no ARIA meaning attached; assistive tech learns about the state from the control.',
    },
    {
      zh: '标签自身不可聚焦，也不在 tab 序列内，符合原生 `<label>` 的行为。',
      en: 'The label is not focusable and not in the tab order, matching native `<label>` behaviour.',
    },
    {
      zh: '默认全大写只是 `text-transform`，不改变底层文本，读屏软件读到的还是原始大小写。',
      en: 'The uppercase styling is `text-transform` only — the underlying text is untouched, so screen readers still read the original casing.',
    },
  ],
}
