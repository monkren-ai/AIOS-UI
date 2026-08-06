import { Select } from 'aios-ui-kit/select'
import type { ComponentDoc } from '../types'

import SelectBasic from '../../examples/select/basic'
import SelectWithLabel from '../../examples/select/with-label'
import SelectSearchable from '../../examples/select/searchable'
import SelectStates from '../../examples/select/states'
import SelectControlled from '../../examples/select/controlled'

import basicSource from '../../examples/select/basic.tsx?raw'
import withLabelSource from '../../examples/select/with-label.tsx?raw'
import searchableSource from '../../examples/select/searchable.tsx?raw'
import statesSource from '../../examples/select/states.tsx?raw'
import controlledSource from '../../examples/select/controlled.tsx?raw'

const PREVIEW_OPTIONS = [
  { value: 'phone-2a', label: 'Phone (2a)' },
  { value: 'ear', label: 'Ear' },
]

export const selectDoc: ComponentDoc = {
  slug: 'select',
  name: 'Select',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'Select',
  description: {
    zh: '从一组选项里挑一个，带可搜索的浮层列表。',
    en: 'Choose one option from a list, in a searchable popup.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Select options={PREVIEW_OPTIONS} defaultValue="phone-2a" />
    </div>
  ),
  importStatement: `import { Select } from 'aios-ui-kit/select'`,
  usageSnippet: `<Select
  label="Region"
  options={[
    { value: 'eu', label: 'Europe' },
    { value: 'na', label: 'North America' },
  ]}
/>`,
  composition: {
    zh: '和 `RadioGroup` 一样是数据驱动的：选项走 `options` 数组，组件负责 trigger、Portal 浮层、列表与选中标记。浮层通过 Base UI 的 `Select.Portal` 渲染到 body，所以父级的 `overflow: hidden` 不会把它裁掉。',
    en: 'Data-driven like `RadioGroup`: options come in through the `options` array and the component owns the trigger, the portalled popup, the list, and the check mark. The popup renders to the body through Base UI’s `Select.Portal`, so an ancestor’s `overflow: hidden` cannot clip it.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: 'Trigger 高度固定 44px，宽度撑满父容器——所以宽度请交给外面的布局控制，别去改组件本身。选项超过五六个才值得用 Select；只有两三个时，一排 Toggle 或 RadioGroup 能少一次点击。',
        en: 'The trigger is a fixed 44px tall and fills its container, so control the width from the layout around it rather than the component. A Select earns its place past five or six options; with two or three, a row of toggles or a radio group saves the user a click.',
      },
      code: basicSource,
      render: () => <SelectBasic />,
    },
    {
      id: 'with-label',
      title: { zh: '标签与禁用项', en: 'Label and disabled options' },
      description: {
        zh: '`label` 渲染为 Base UI 的 `Select.Label`，会自动和 trigger 关联。`placeholder` 只在没有选中值时显示，它不是选项——用户没法「选回」占位文案，所以需要「不选」这个语义时，请显式给一个 `{ value: "", label: "None" }`。',
        en: '`label` renders as Base UI’s `Select.Label` and is associated with the trigger automatically. `placeholder` only shows while nothing is selected; it is not an option, so users cannot select their way back to it. If “none” is a real choice, add an explicit `{ value: "", label: "None" }`.',
      },
      code: withLabelSource,
      render: () => <SelectWithLabel />,
    },
    {
      id: 'searchable',
      title: { zh: '可搜索', en: 'Searchable' },
      description: {
        zh: '`searchable` 在浮层顶部插一个输入框，按 `label` 做大小写不敏感的子串过滤，无结果时显示一行「No results found」。它在打开时自动聚焦，关闭时清空查询——所以每次打开都是完整列表，不会留着上次的过滤条件让人困惑。选项多到需要滚动（大约十几项以上）才值得打开。',
        en: '`searchable` puts an input at the top of the popup and filters `label` by case-insensitive substring, showing a “No results found” row when nothing matches. It focuses on open and clears on close, so every open starts from the full list instead of stranding you inside last time’s filter. Turn it on once the list is long enough to scroll — roughly a dozen options.',
      },
      code: searchableSource,
      render: () => <SelectSearchable />,
    },
    {
      id: 'states',
      title: { zh: '错误与禁用', en: 'Error and disabled' },
      description: {
        zh: '`error` 把 trigger 边框转红并在下方补一行红字。注意它目前只是视觉提示，没有 `aria-describedby` 关联——如果这条信息对完成表单是必需的，请自己给根节点补 `aria-describedby` 指向它。`disabled` 则整块降到 40% 并关掉指针事件。',
        en: '`error` turns the trigger border red and adds a red line beneath it. Be aware that it is currently a visual cue only — there is no `aria-describedby` linking it to the trigger, so if the message is required to complete the form, wire that up yourself. `disabled` drops the whole block to 40% and switches off pointer events.',
      },
      code: statesSource,
      render: () => <SelectStates />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '`onValueChange` 只在选到具体值时触发；Base UI 清空选择时给出的 `null` 会被内部吞掉，所以回调参数一定是 `string`，你不用做空值判断。展开状态由组件自己管，没有对外的 `open` / `onOpenChange`。',
        en: '`onValueChange` only fires for a real selection: the `null` that Base UI emits when a selection is cleared is swallowed internally, so the callback always hands you a `string` and you never have to null-check it. Open state is owned by the component; there is no `open` / `onOpenChange` to hook into.',
      },
      code: controlledSource,
      render: () => <SelectControlled />,
    },
  ],
  api: [
    {
      name: 'Select',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` 外的原生 `<div>` 属性透传到最外层容器。`ref` 也指向该容器，不是 trigger。',
        en: 'Native `<div>` props other than `value`, `defaultValue`, and `onChange` are forwarded to the outer wrapper. `ref` points at that wrapper, not the trigger.',
      },
      props: [
        {
          name: 'options',
          type: 'SelectOption[]',
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
          description: { zh: '选中值变化回调。', en: 'Fires when the selection changes.' },
        },
        {
          name: 'placeholder',
          type: 'string',
          default: `'Select an option'`,
          description: {
            zh: '未选中时 trigger 上的占位文字。',
            en: 'Placeholder shown on the trigger while nothing is selected.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '字段标签，渲染为 Base UI 的 `Select.Label`。',
            en: 'Field label, rendered as Base UI’s `Select.Label`.',
          },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案，同时把 trigger 边框转红。',
            en: 'Error text; also turns the trigger border red.',
          },
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '在浮层顶部显示搜索框，按 `label` 过滤。',
            en: 'Show a search input at the top of the popup and filter on `label`.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用整个控件，降到 40% 不透明度并关掉指针事件。',
            en: 'Disable the control: 40% opacity and no pointer events.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名。',
            en: 'Extra classes on the outer wrapper.',
          },
        },
      ],
    },
    {
      name: 'SelectOption',
      description: {
        zh: '`options` 数组的元素类型。',
        en: 'The element type of the `options` array.',
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
            zh: '显示文字，也是 `searchable` 的过滤依据。',
            en: 'The visible text, and what `searchable` filters on.',
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
      name: 'selectVariants',
      description: {
        zh: '外层容器的 CVA 函数。trigger 与选项分别是 `selectTriggerVariants` / `selectItemVariants`。三者返回的都是 Tailwind 工具类，可以直接和你自己的类名一起交给 `cn()` 合并。',
        en: 'The CVA function for the outer wrapper; the trigger and items have `selectTriggerVariants` and `selectItemVariants`. All three return Tailwind utilities, so you can hand them to `cn()` alongside your own classes.',
      },
      props: [
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
      zh: '底层是 Base UI 的 Select，trigger 的 `role`、`aria-expanded`、`aria-controls` 以及浮层的 `listbox` 语义都由它维护。',
      en: 'Built on Base UI’s Select, which maintains the trigger’s `role`, `aria-expanded`, and `aria-controls`, along with the popup’s listbox semantics.',
    },
    {
      zh: '键盘操作走 Base UI 的标准实现：Enter / Space / 方向键打开，方向键在选项间移动，Enter 选中，Esc 关闭并把焦点还给 trigger。',
      en: 'Keyboard behaviour comes from Base UI: Enter, Space, or an arrow key opens it; arrows move through the options; Enter selects; Esc closes and returns focus to the trigger.',
    },
    {
      zh: 'trigger 固定 44px 高，正好等于最小触达尺寸。',
      en: 'The trigger is a fixed 44px tall, exactly the minimum touch target.',
    },
    {
      zh: '搜索框有自己的 `aria-label="Search options"`，并在浮层打开时自动获得焦点。',
      en: 'The search input carries its own `aria-label="Search options"` and takes focus when the popup opens.',
    },
    {
      zh: '`error` 目前只做视觉呈现，没有 `aria-describedby` 关联，也没有 `aria-invalid`。校验信息若属必读，请自行补上。',
      en: '`error` is currently visual only: there is no `aria-describedby` link and no `aria-invalid`. If the validation message is essential, wire those up yourself.',
    },
    {
      zh: '浮层的入场动画在 `prefers-reduced-motion: reduce` 下被整体关掉。',
      en: 'The popup’s entry animation is switched off entirely under `prefers-reduced-motion: reduce`.',
    },
  ],
}
