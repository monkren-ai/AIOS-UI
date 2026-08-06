import { Combobox } from 'aios-ui-kit/combobox'
import type { ComponentDoc } from '../types'

import ComboboxBasic from '../../examples/combobox/basic'
import ComboboxFreeInput from '../../examples/combobox/free-input'

import basicSource from '../../examples/combobox/basic.tsx?raw'
import freeInputSource from '../../examples/combobox/free-input.tsx?raw'

const PREVIEW_ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'ear', label: 'Ear' },
]

export const comboboxDoc: ComponentDoc = {
  slug: 'combobox',
  name: 'Combobox',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Combobox',
  description: {
    zh: '可搜索的选择器，开启 freeInput 后也能输入列表外的值。',
    en: 'A searchable selector that can also accept arbitrary input when freeInput is on.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Combobox items={PREVIEW_ITEMS} label="Device" defaultValue="phone-2a" />
    </div>
  ),
  importStatement: `import { Combobox } from 'aios-ui-kit/combobox'`,
  usageSnippet: `<Combobox
  label="Device"
  items={[
    { value: 'phone-2a', label: 'Phone (2a)' },
    { value: 'ear', label: 'Ear' },
  ]}
/>`,
  composition: {
    zh: '和 `Select` 一样是数据驱动的：选项走 `items` 数组，组件负责输入框、Portal 浮层、列表与选中标记。选中后会把选中项的 `label` 回填进输入框，并用 `ItemIndicator` 标记。浮层通过 Base UI 的 `Combobox.Portal` 渲染到 body，所以父级的 `overflow: hidden` 不会把它裁掉。需要完全自定义布局时，可以用 `Combobox.Input` / `Combobox.Content` / `Combobox.List` / `Combobox.Item` 这些带样式的原语在 `Combobox.Root` 下自行组装。',
    en: 'Data-driven like `Select`: options come in through the `items` array and the component owns the input, the portalled popup, the list, and the selection mark. On selection it fills the input with the chosen option’s `label` and flags it with an `ItemIndicator`. The popup renders to the body through Base UI’s `Combobox.Portal`, so an ancestor’s `overflow: hidden` cannot clip it. For full custom layouts, compose the styled primitives `Combobox.Input` / `Combobox.Content` / `Combobox.List` / `Combobox.Item` under a `Combobox.Root`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '输入即按 `label` 过滤，选中后输入框回填选中项的 `label`，`onValueChange` 给出的是选中项的 `value`。宽度撑满父容器，所以宽度交给外面的布局控制。',
        en: 'Typing filters on `label`; selecting an option fills the input with its `label` and `onValueChange` receives the option’s `value`. The control fills its container, so drive the width from the layout around it.',
      },
      code: basicSource,
      render: () => <ComboboxBasic />,
    },
    {
      id: 'free-input',
      title: { zh: '自由输入', en: 'Free input' },
      description: {
        zh: '开启 `freeInput` 后允许输入列表外的任意值：此时 `value` 就是输入框里的文本本身，`onValueChange` 会在每次输入时以当前文本触发；选中某个选项时则以该选项的 `label` 触发。搭配 `clearable` 可以一键清空。',
        en: 'With `freeInput` on, values outside the list are allowed: `value` becomes the input text itself, `onValueChange` fires with the current text on every keystroke, and selecting an option fires it with that option’s `label`. Pair with `clearable` for a one-tap reset.',
      },
      code: freeInputSource,
      render: () => <ComboboxFreeInput />,
    },
  ],
  api: [
    {
      name: 'Combobox',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` 外的原生 `<div>` 属性透传到最外层容器。`ref` 指向该容器，不是输入框。',
        en: 'Native `<div>` props other than `value`, `defaultValue`, and `onChange` are forwarded to the outer wrapper. `ref` points at that wrapper, not the input.',
      },
      props: [
        {
          name: 'items',
          type: 'ComboboxOption[]',
          description: {
            zh: '选项列表，每项是 `{ value, label, disabled? }`。',
            en: 'The options. Each is `{ value, label, disabled? }`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控选中值。非 freeInput 时是选项的 `value`；freeInput 时是输入文本。',
            en: 'Controlled value. The option’s `value` normally; the input text when `freeInput` is on.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: { zh: '非受控初始值。', en: 'Initial value when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '选中值变化回调。freeInput 时也会在每次输入时触发。',
            en: 'Fires when the value changes. Under `freeInput` it also fires on every keystroke.',
          },
        },
        {
          name: 'onInputValueChange',
          type: '(value: string) => void',
          description: {
            zh: '输入文本变化回调，适合跟踪过滤关键字。',
            en: 'Fires when the input text changes — handy for tracking the filter query.',
          },
        },
        {
          name: 'placeholder',
          type: 'string',
          description: { zh: '输入框占位文字。', en: 'Input placeholder.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签，自动关联到输入框。', en: 'Field label, associated with the input.' },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案，同时把输入框边框转红。',
            en: 'Error text; also turns the input border red.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '高度：36 / 44 / 52px。', en: 'Height: 36 / 44 / 52px.' },
        },
        {
          name: 'variant',
          type: `'outline' | 'soft'`,
          default: `'outline'`,
          description: { zh: '视觉样式。', en: 'Visual style.' },
        },
        {
          name: 'clearable',
          type: 'boolean',
          default: 'false',
          description: { zh: '是否显示清除按钮。', en: 'Show a clear button.' },
        },
        {
          name: 'freeInput',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '允许输入列表外的任意值；开启后 `value` 即输入文本。',
            en: 'Allow arbitrary values outside the list; when on, `value` is the input text.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用整个控件。', en: 'Disable the control.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到最外层容器的类名。', en: 'Extra classes on the outer wrapper.' },
        },
      ],
    },
    {
      name: 'ComboboxOption',
      description: {
        zh: '`items` 数组的元素类型。',
        en: 'The element type of the `items` array.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: { zh: '选项值，列表内唯一。', en: 'The value; unique within the list.' },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '显示文字，也是过滤依据；选中后回填进输入框。',
            en: 'The visible text and the filter key; filled into the input on selection.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '只禁用这一项。', en: 'Disable just this option.' },
        },
      ],
    },
    {
      name: 'comboboxVariants',
      description: {
        zh: '外层容器的 CVA 函数；输入外壳、选项、浮层分别是 `comboboxControlVariants` / `comboboxItemVariants` / `comboboxContentVariants`。',
        en: 'The CVA function for the outer wrapper; the control, items, and popup have `comboboxControlVariants`, `comboboxItemVariants`, and `comboboxContentVariants`.',
      },
      props: [
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
          description: { zh: '禁用态类名。', en: 'The disabled class.' },
        },
        {
          name: 'hasError',
          type: 'boolean',
          default: 'false',
          description: { zh: '错误态类名。', en: 'The error class.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 Combobox，输入框的 `role="combobox"`、`aria-expanded`、`aria-controls` 以及浮层的 `listbox` 语义都由它维护。',
      en: 'Built on Base UI’s Combobox, which maintains the input’s `role="combobox"`, `aria-expanded`, and `aria-controls`, along with the popup’s listbox semantics.',
    },
    {
      zh: '键盘操作走 Base UI 的标准实现：方向键在选项间移动，Enter 选中，Esc 关闭并把焦点还给输入框。',
      en: 'Keyboard behaviour comes from Base UI: arrows move through the options, Enter selects, Esc closes and returns focus to the input.',
    },
    {
      zh: '输入框固定 44px 高（md），正好等于最小触达尺寸。',
      en: 'The input is a fixed 44px tall at md, exactly the minimum touch target.',
    },
    {
      zh: '`error` 会同时置上 `aria-invalid` 与 `aria-describedby`，读屏软件能播报错误文案。',
      en: '`error` sets both `aria-invalid` and `aria-describedby`, so screen readers announce the message.',
    },
    {
      zh: '清除按钮带 `aria-label="Clear"`，纯图标可被读屏识别。',
      en: 'The clear button carries `aria-label="Clear"`, so the icon-only control is announced.',
    },
    {
      zh: '所有过渡都带 `motion-reduce:` 兜底，用户开了减弱动效就不会动。',
      en: 'Every transition has a `motion-reduce:` fallback, so nothing animates when the user asks for reduced motion.',
    },
  ],
}
