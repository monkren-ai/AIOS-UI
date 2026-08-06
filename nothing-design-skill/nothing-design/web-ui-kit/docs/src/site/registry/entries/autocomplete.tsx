import { Autocomplete } from 'aios-ui-kit/autocomplete'
import type { ComponentDoc } from '../types'

import AutocompleteBasic from '../../examples/autocomplete/basic'
import AutocompleteClearable from '../../examples/autocomplete/clearable'

import basicSource from '../../examples/autocomplete/basic.tsx?raw'
import clearableSource from '../../examples/autocomplete/clearable.tsx?raw'

const PREVIEW_ITEMS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'ear', label: 'Ear' },
]

export const autocompleteDoc: ComponentDoc = {
  slug: 'autocomplete',
  name: 'Autocomplete',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Autocomplete',
  description: {
    zh: '文本输入框配过滤浮层，边输入边按 label 过滤选项。',
    en: 'A text input with a filtering popup that narrows options by label as you type.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Autocomplete items={PREVIEW_ITEMS} label="Device" placeholder="Search..." />
    </div>
  ),
  importStatement: `import { Autocomplete } from 'aios-ui-kit/autocomplete'`,
  usageSnippet: `<Autocomplete
  label="Device"
  items={[
    { value: 'phone-2a', label: 'Phone (2a)' },
    { value: 'ear', label: 'Ear' },
  ]}
/>`,
  composition: {
    zh: '和 `Select` 一样是数据驱动的：选项走 `items` 数组，组件负责输入框、Portal 浮层、列表与选中标记。输入即按 `label` 过滤，`onValueChange` 给出当前输入文本。浮层通过 Base UI 的 Portal 渲染到 body，所以父级的 `overflow: hidden` 不会把它裁掉。需要完全自定义布局时，可以用 `Autocomplete.Input` / `Autocomplete.Content` / `Autocomplete.List` / `Autocomplete.Item` 这些带样式的原语在 `Autocomplete.Root` 下自行组装。',
    en: 'Data-driven like `Select`: options come in through the `items` array and the component owns the input, the portalled popup, the list, and the filter logic. Typing filters on `label` and `onValueChange` fires with the current text. The popup renders to the body through Base UI’s Portal, so an ancestor’s `overflow: hidden` cannot clip it. For full custom layouts, compose the styled primitives `Autocomplete.Input` / `Autocomplete.Content` / `Autocomplete.List` / `Autocomplete.Item` under an `Autocomplete.Root`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '输入即按 `label` 过滤，`onValueChange` 给出当前输入文本。宽度撑满父容器。',
        en: 'Typing filters on `label` and `onValueChange` fires with the current text. The control fills its container.',
      },
      code: basicSource,
      render: () => <AutocompleteBasic />,
    },
    {
      id: 'clearable',
      title: { zh: '可清除', en: 'Clearable' },
      description: {
        zh: '开启 `clearable` 后输入框右侧出现清除按钮，点击一键清空。下方展示受控 value。',
        en: 'With `clearable` on, a clear button appears on the right for a one-tap reset. The controlled value is shown below.',
      },
      code: clearableSource,
      render: () => <AutocompleteClearable />,
    },
  ],
  api: [
    {
      name: 'Autocomplete',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` 外的原生 `<div>` 属性透传到最外层容器。`ref` 指向该容器，不是输入框。',
        en: 'Native `<div>` props other than `value`, `defaultValue`, and `onChange` are forwarded to the outer wrapper. `ref` points at that wrapper, not the input.',
      },
      props: [
        {
          name: 'items',
          type: 'AutocompleteOption[]',
          description: {
            zh: '选项列表，每项是 `{ value, label, disabled? }`。',
            en: 'The options. Each is `{ value, label, disabled? }`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控输入文本。',
            en: 'Controlled input text.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: { zh: '非受控初始输入文本。', en: 'Initial input text when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '输入文本变化回调（含选中项后填入的 label）。',
            en: 'Fires when the input text changes (including after a selection fills in the label).',
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
          name: 'icon',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否显示右侧下拉箭头。', en: 'Show the trailing dropdown arrow.' },
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
      name: 'AutocompleteOption',
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
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 Autocomplete，输入框的 `role="combobox"`、`aria-expanded`、`aria-controls` 以及浮层的 `listbox` 语义都由它维护。',
      en: 'Built on Base UI’s Autocomplete, which maintains the input’s `role="combobox"`, `aria-expanded`, and `aria-controls`, along with the popup’s listbox semantics.',
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
