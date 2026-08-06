import { RadioGroup } from 'aios-ui-kit/radio-group'
import type { ComponentDoc } from '../types'

import RadioGroupBasic from '../../examples/radio-group/basic'
import RadioGroupOrientation from '../../examples/radio-group/orientation'
import RadioGroupSizes from '../../examples/radio-group/sizes'
import RadioGroupDisabled from '../../examples/radio-group/disabled'
import RadioGroupControlled from '../../examples/radio-group/controlled'

import basicSource from '../../examples/radio-group/basic.tsx?raw'
import orientationSource from '../../examples/radio-group/orientation.tsx?raw'
import sizesSource from '../../examples/radio-group/sizes.tsx?raw'
import disabledSource from '../../examples/radio-group/disabled.tsx?raw'
import controlledSource from '../../examples/radio-group/controlled.tsx?raw'

const PREVIEW_OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

export const radioGroupDoc: ComponentDoc = {
  slug: 'radio-group',
  name: 'RadioGroup',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'RadioGroup',
  description: {
    zh: '一组互斥选项，方向键在组内移动焦点。',
    en: 'A set of mutually exclusive options, navigated with the arrow keys.',
  },
  preview: () => (
    <RadioGroup
      name="preview"
      orientation="horizontal"
      options={PREVIEW_OPTIONS}
      defaultValue="a"
    />
  ),
  importStatement: `import { RadioGroup } from 'aios-ui-kit/radio-group'`,
  usageSnippet: `<RadioGroup
  name="theme"
  options={[
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ]}
  defaultValue="light"
/>`,
  composition: {
    zh: '这是数据驱动而非组合式的 API：选项走 `options` 数组，组件自己渲染每一行。好处是不会有人漏掉 `value`，代价是你没法往单个选项里塞任意内容——需要富文本选项时，请直接用 Base UI 的 `Radio` 自行拼装。',
    en: 'This is a data-driven API rather than a compositional one: options come in through the `options` array and the component renders each row. Nobody can forget a `value`, but you also cannot put arbitrary content inside a single option — if you need rich options, compose Base UI’s `Radio` yourself.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认竖排。`name` 不是可选的装饰——放进原生表单提交时靠它给出字段名，而且同页多组单选共用一个 `name` 会互相抢选中，记得区分开。',
        en: 'Vertical by default. `name` is not decoration: it is the field name when the group is submitted with a native form, and two groups sharing one `name` on the same page will fight over the selection.',
      },
      code: basicSource,
      render: () => <RadioGroupBasic />,
    },
    {
      id: 'orientation',
      title: { zh: '方向', en: 'Orientation' },
      description: {
        zh: '`orientation` 同时改布局和 `aria-orientation`，读屏软件会照着播报方向键的含义。横排适合三四个短标签；标签一长就换回竖排，别指望 `flex-wrap` 把可读性救回来。',
        en: '`orientation` changes both the layout and `aria-orientation`, so screen readers describe the arrow keys correctly. Horizontal works for three or four short labels; once labels get long, go back to vertical rather than relying on `flex-wrap` to save readability.',
      },
      code: orientationSource,
      render: () => <RadioGroupOrientation />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 同时调圆环、圆心与文字，行高分别是 36 / 44 / 52px。`md` 命中 44px 触达基线，所以是默认值。',
        en: '`size` scales the ring, the dot, and the text together, with rows of 36 / 44 / 52px. `md` hits the 44px touch baseline, which is why it is the default.',
      },
      code: sizesSource,
      render: () => <RadioGroupSizes />,
    },
    {
      id: 'disabled',
      title: { zh: '禁用', en: 'Disabled' },
      description: {
        zh: '两个层级：单个选项的 `disabled` 只锁那一行（用来表达「这个方案你的账号还用不了」），组级 `disabled` 锁掉全部（用来表达「整个设置项现在不可改」）。两者会取并集，组级禁用时单项设不设都一样。',
        en: 'Two levels. Per-option `disabled` locks a single row — “this plan is not available on your account”. Group-level `disabled` locks all of them — “this setting cannot be changed right now”. They are OR-ed together, so once the group is disabled the per-option flag no longer matters.',
      },
      code: disabledSource,
      render: () => <RadioGroupDisabled />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '传了 `value` 就必须自己在 `onValueChange` 里写回，否则界面点不动。想要「一开始就有默认选中、之后不用管」的话用 `defaultValue`，两者不要同时传。',
        en: 'Once you pass `value` you must write it back in `onValueChange`, or the UI stops responding. If you only want an initial selection and no further involvement, use `defaultValue` — never both.',
      },
      code: controlledSource,
      render: () => <RadioGroupControlled />,
    },
  ],
  api: [
    {
      name: 'RadioGroup',
      description: {
        zh: '其余原生 `<div>` 属性（`aria-labelledby`、`id`、`ref` …）透传到 Base UI 的 RadioGroup 根节点。',
        en: 'Remaining native `<div>` props (`aria-labelledby`, `id`, `ref`, …) are forwarded to Base UI’s RadioGroup root.',
      },
      props: [
        {
          name: 'options',
          type: 'RadioOption[]',
          description: {
            zh: '选项列表。每项是 `{ value, label, disabled? }`。',
            en: 'The options. Each is `{ value, label, disabled? }`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: { zh: '受控选中值。', en: 'Controlled selected value.' },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: { zh: '非受控初始选中值。', en: 'Initial value when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: { zh: '选中项变化回调。', en: 'Fires when the selection changes.' },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'vertical'`,
          description: {
            zh: '排列方向，同时写入 `aria-orientation`。',
            en: 'Layout direction; also written to `aria-orientation`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '圆环与行高阶梯：行高 36 / 44 / 52px。',
            en: 'Ring and row scale; rows are 36 / 44 / 52px.',
          },
        },
        {
          name: 'name',
          type: 'string',
          description: {
            zh: '表单字段名。同页多组务必区分。',
            en: 'Form field name. Keep it unique across groups on a page.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用整组。', en: 'Disable the whole group.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到根节点的类名。', en: 'Extra classes on the root.' },
        },
      ],
    },
    {
      name: 'RadioOption',
      description: {
        zh: '`options` 数组的元素类型。',
        en: 'The element type of the `options` array.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: { zh: '选项值，组内唯一。', en: 'The value; unique within the group.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '显示文字。', en: 'The visible text.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '只禁用这一项。', en: 'Disable just this row.' },
        },
      ],
    },
    {
      name: 'radioGroupVariants',
      description: {
        zh: '根容器的 CVA 函数。选项行、圆环、圆心、文字分别是 `radioGroupItemVariants` / `radioGroupCircleVariants` / `radioGroupDotVariants` / `radioGroupLabelVariants`。',
        en: 'The CVA function for the root. Rows, rings, dots, and text map to `radioGroupItemVariants`, `radioGroupCircleVariants`, `radioGroupDotVariants`, and `radioGroupLabelVariants`.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'vertical'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'RadioGroupSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 RadioGroup + Radio，`role="radiogroup"` 与每项的 `aria-checked` 都由它维护。',
      en: 'Built on Base UI’s RadioGroup and Radio, which maintain `role="radiogroup"` and each option’s `aria-checked`.',
    },
    {
      zh: '整组在 tab 序列里只占一站：Tab 进到当前选中项，方向键在组内移动并即时改变选中值——这是单选按钮的标准行为，别用 Tab 逐个遍历。',
      en: 'The group is a single tab stop: Tab moves to the selected option, and the arrow keys move within the group while changing the selection. That is the standard radio behaviour — do not expect Tab to walk the options.',
    },
    {
      zh: '每个选项都包在自己的 `<label>` 里，点文字等同于点圆环。',
      en: 'Each option is wrapped in its own `<label>`, so clicking the text is the same as clicking the ring.',
    },
    {
      zh: '组本身没有可访问名称。放进表单时请用 `<fieldset>` + `<legend>`，或者给根节点传 `aria-labelledby` 指向标题。',
      en: 'The group itself has no accessible name. In a form, wrap it in `<fieldset>` with a `<legend>`, or point `aria-labelledby` at your heading.',
    },
    {
      zh: '被禁用的选项走 `data-disabled`，除了 40% 不透明度外还会被移出方向键的循环。',
      en: 'Disabled options carry `data-disabled`; beyond the 40% opacity they also drop out of the arrow-key rotation.',
    },
  ],
}
