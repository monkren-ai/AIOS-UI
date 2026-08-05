import { CheckboxGroup } from 'nothing-ui/checkbox-group'
import type { ComponentDoc } from '../types'

import CheckboxGroupBasic from '../../examples/checkbox-group/basic'
import CheckboxGroupOrientation from '../../examples/checkbox-group/orientation'
import CheckboxGroupControlled from '../../examples/checkbox-group/controlled'

import basicSource from '../../examples/checkbox-group/basic.tsx?raw'
import orientationSource from '../../examples/checkbox-group/orientation.tsx?raw'
import controlledSource from '../../examples/checkbox-group/controlled.tsx?raw'

export const checkboxGroupDoc: ComponentDoc = {
  slug: 'checkbox-group',
  name: 'CheckboxGroup',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '一组复选项，横竖排列，相邻的选中项会连成一片背景。',
    en: 'A set of checkboxes, in a row or a column, whose selected neighbours merge into one block.',
  },
  preview: () => (
    <CheckboxGroup
      options={[
        { value: 'a', label: 'Wi-Fi' },
        { value: 'b', label: 'Bluetooth' },
        { value: 'c', label: 'NFC' },
      ]}
      defaultValue={['a', 'b']}
    />
  ),
  importStatement: `import { CheckboxGroup } from 'nothing-ui/checkbox-group'`,
  usageSnippet: `<CheckboxGroup
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  defaultValue={['a']}
/>`,
  composition: {
    zh: '每个选项内部就是一个 `Checkbox`；组件只额外渲染一层绝对定位的背景层，用来在相邻选中项之间画出连成一片的高亮块，靠 `useMergeSplit` 量算每个选项的位置算出这层的位置与尺寸。',
    en: 'Each option is rendered as a `Checkbox`; the group only adds one absolutely-positioned background layer that merges into a single highlighted block across adjacent selected items, sized and placed via `useMergeSplit` measuring each option.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`options` 是唯一必填项，每项是 `{ value, label, disabled? }`。默认纵向排列，`defaultValue` 给出非受控的初始选中集合。禁用单个选项只需在对应 option 上设 `disabled`，不影响其余选项。',
        en: '`options` is the only required prop, each entry shaped as `{ value, label, disabled? }`. It stacks vertically by default, and `defaultValue` seeds the initial uncontrolled selection. Disabling one option is just `disabled` on that entry — it does not affect the others.',
      },
      code: basicSource,
      render: () => <CheckboxGroupBasic />,
    },
    {
      id: 'orientation',
      title: { zh: '方向', en: 'Orientation' },
      description: {
        zh: '`orientation` 在 `horizontal` 与 `vertical`（默认）之间切换，同时决定合并背景层沿哪根轴计算——横排时相邻选中项左右相连，竖排时上下相连。',
        en: '`orientation` switches between `horizontal` and `vertical` (the default), and also decides which axis the merged background is measured along — adjacent selections join side-by-side in a row, or top-to-bottom in a column.',
      },
      code: orientationSource,
      render: () => <CheckboxGroupOrientation />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '`value` 是选中值的字符串数组，`onValueChange` 收到切换后的完整数组，而不是单个变化项——这样你不需要自己维护 toggle 逻辑，直接 `setValue(next)` 即可。',
        en: '`value` is an array of selected strings, and `onValueChange` receives the whole array after the toggle, not just the item that changed — so you never hand-roll the toggle logic, just `setValue(next)`.',
      },
      code: controlledSource,
      render: () => <CheckboxGroupControlled />,
    },
  ],
  api: [
    {
      name: 'CheckboxGroup',
      description: {
        zh: '渲染为 `<div role="group">`，除 `onChange` 外的原生 div 属性都会透传。',
        en: 'Renders a `<div role="group">` and forwards every native div prop except `onChange`.',
      },
      props: [
        {
          name: 'options',
          type: 'CheckboxGroupOption[]',
          required: true,
          description: {
            zh: '选项列表，每项为 `{ value: string, label: string, disabled?: boolean }`。',
            en: 'The list of options, each `{ value: string, label: string, disabled?: boolean }`.',
          },
        },
        {
          name: 'value',
          type: 'string[]',
          description: {
            zh: '受控的选中值集合。传了它就完全由你控制。',
            en: 'The controlled set of selected values. Once passed, you own the selection.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          default: '[]',
          description: { zh: '非受控时的初始选中集合。', en: 'The initial selection when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: {
            zh: '选中集合变化时调用，参数是切换后的完整数组。',
            en: 'Called with the full array after any toggle.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用整组。单个选项的 `disabled` 与这个是「或」的关系。',
            en: 'Disable the whole group. It is OR-ed with each option’s own `disabled`.',
          },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'vertical'`,
          description: {
            zh: '排列方向，同时决定合并背景层沿哪根轴计算位置。',
            en: 'Layout direction; also the axis the merged background is measured along.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '透传给每个 `Checkbox` 的尺寸，行高 36 / 44 / 52px。',
            en: 'Forwarded to every `Checkbox`; rows are 36 / 44 / 52px.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the outer container, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'checkboxGroupVariants',
      description: {
        zh: '容器自身的 CVA 函数。合并背景层与单个选项分别对应 `checkboxGroupMergeBgVariants` 与 `checkboxGroupItemVariants`，均从子路径导出。',
        en: 'The CVA function for the container itself. The merged background and each option map to `checkboxGroupMergeBgVariants` and `checkboxGroupItemVariants`, both exported from the subpath.',
      },
      props: [
        {
          name: 'orientation',
          type: 'CheckboxGroupOrientation',
          default: `'vertical'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '容器是 `role="group"`，每个选项内部仍是 Base UI 的 `Checkbox.Root`，`role="checkbox"` 与 `aria-checked` 各自独立维护。',
      en: 'The container is `role="group"`, and each option is still a Base UI `Checkbox.Root` maintaining its own `role="checkbox"` and `aria-checked`.',
    },
    {
      zh: '合并背景层是 `aria-hidden="true"` 的纯装饰 `<span>`，选中状态必须靠每个选项自身的 `aria-checked` 传达，不依赖这层视觉效果。',
      en: 'The merged background is a purely decorative `<span aria-hidden="true">`; selection state must be conveyed by each option’s own `aria-checked`, never by that visual effect alone.',
    },
    {
      zh: 'Tab 依次落在每个 Checkbox 上，组内没有方向键导航——这是刻意的，因为复选组的每一项都是独立开关，不是互斥选择。',
      en: 'Tab moves through each checkbox in order; there is no arrow-key roaming within the group, which is deliberate — every item is an independent switch, not a mutually exclusive choice.',
    },
    {
      zh: '禁用整组或单个选项时，对应 `Checkbox` 会失去可交互性并降低不透明度，同时置上 `data-disabled` 供样式或测试挂钩。',
      en: 'Disabling the whole group or a single option removes interactivity from the affected `Checkbox` and dims it, while setting `data-disabled` for styling or test hooks.',
    },
    {
      zh: '背景层的合并/分裂动画走 spring 过渡，并带 `motion-reduce:transition-none`，减弱动效下直接跳变到目标位置。',
      en: 'The background merge/split animation uses a spring transition with `motion-reduce:transition-none`, snapping straight to the target under reduced motion.',
    },
  ],
}
