import { NumberField } from 'aios-ui-kit/number-field'
import type { ComponentDoc } from '../types'

import NumberFieldBasic from '../../examples/number-field/basic'
import NumberFieldWithLabel from '../../examples/number-field/with-label'
import NumberFieldBounds from '../../examples/number-field/bounds'

import basicSource from '../../examples/number-field/basic.tsx?raw'
import withLabelSource from '../../examples/number-field/with-label.tsx?raw'
import boundsSource from '../../examples/number-field/bounds.tsx?raw'

export const numberFieldDoc: ComponentDoc = {
  slug: 'number-field',
  name: 'NumberField',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'NumberField',
  description: {
    zh: '数值输入框，带 + / − 步进按钮与上下限。',
    en: 'A numeric input with + / − steppers and optional bounds.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <NumberField defaultValue={1} />
    </div>
  ),
  importStatement: `import { NumberField } from 'aios-ui-kit/number-field'`,
  usageSnippet: `<NumberField defaultValue={1} min={0} max={10} />`,
  composition: {
    zh: '结构是 `[−] [Input] [+]`：Base UI 的 `NumberField.Root` 管理数值状态，`Group` 把步进按钮与输入框拢成一行。输入框居中、用 Space Mono 显示数字；步进按钮是方形，宽度等于控件高度。`min` / `max` / `step` 直接透传给 Base UI，键盘方向键、滚轮与按钮都遵守上下限。',
    en: 'The layout is `[−] [Input] [+]`: Base UI’s `NumberField.Root` owns the numeric state and `Group` gathers the steppers and input into one row. The input is centred and renders digits in Space Mono; the steppers are square, as wide as the control is tall. `min` / `max` / `step` pass straight through to Base UI, so arrow keys, the wheel, and the buttons all respect the bounds.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认尺寸 md（44px 高）。点 + / − 步进，也能直接键入数字、用键盘方向键调整。',
        en: 'The default md size is 44px tall. Step with + / −, type a number directly, or nudge with the arrow keys.',
      },
      code: basicSource,
      render: () => <NumberFieldBasic />,
    },
    {
      id: 'with-label',
      title: { zh: '标签与尺寸', en: 'Label and sizes' },
      description: {
        zh: '`label` 渲染为字段标签，`size` 切换 36 / 44 / 52px 三档高度。`error` 把边框转红并在下方补一行红字。',
        en: '`label` renders the field label; `size` switches between the 36 / 44 / 52px heights. `error` turns the border red and adds a red line beneath.',
      },
      code: withLabelSource,
      render: () => <NumberFieldWithLabel />,
    },
    {
      id: 'bounds',
      title: { zh: '上下限与步长', en: 'Bounds and step' },
      description: {
        zh: '`min` / `max` / `step` 限制取值范围与每次步进的增量。到达上下限后继续步进会被钳制，不会越界。',
        en: '`min` / `max` / `step` constrain the range and the increment of each step. Stepping past either bound is clamped, never overshooting.',
      },
      code: boundsSource,
      render: () => <NumberFieldBounds />,
    },
  ],
  api: [
    {
      name: 'NumberField',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` 外的原生 `<div>` 属性透传到最外层容器，`ref` 也指向它。',
        en: 'Native `<div>` props other than `value`, `defaultValue`, and `onChange` are forwarded to the outer wrapper; `ref` points at it too.',
      },
      props: [
        {
          name: 'value',
          type: 'number | null',
          description: { zh: '受控数值。', en: 'Controlled numeric value.' },
        },
        {
          name: 'defaultValue',
          type: 'number',
          description: { zh: '非受控初始值。', en: 'Initial value when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: number | null) => void',
          description: {
            zh: '数值变化回调，清空时给 `null`。',
            en: 'Fires when the value changes; `null` when cleared.',
          },
        },
        {
          name: 'min',
          type: 'number',
          description: { zh: '最小值。', en: 'Minimum value.' },
        },
        {
          name: 'max',
          type: 'number',
          description: { zh: '最大值。', en: 'Maximum value.' },
        },
        {
          name: 'step',
          type: "number | 'any'",
          description: { zh: '步长。', en: 'Step size.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签。', en: 'Field label.' },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案，同时把边框转红。',
            en: 'Error text; also turns the border red.',
          },
        },
        {
          name: 'placeholder',
          type: 'string',
          description: { zh: '占位文字。', en: 'Placeholder text.' },
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: { zh: '高度阶梯。', en: 'Height step.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用整个控件。', en: 'Disable the whole control.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 NumberField，步进按钮的 `aria-label`（“Increment” / “Decrement”）、输入框的 `aria-roledescription` 都已就位。',
      en: 'Built on Base UI’s NumberField; the steppers carry `aria-label`s (“Increment” / “Decrement”) and the input carries `aria-roledescription`.',
    },
    {
      zh: '键盘操作走 Base UI 标准：方向键 ↑/↓ 步进，Shift+↑/↓ 大步，Alt+↑/↓ 小步，Home/End 跳到上下限。',
      en: 'Keyboard behaviour follows Base UI: ↑/↓ steps, Shift+↑/↓ takes large steps, Alt+↑/↓ takes small steps, Home/End jumps to the bounds.',
    },
    {
      zh: '步进按钮宽度等于控件高度，至少满足 36px 的最小触达尺寸。',
      en: 'Each stepper is as wide as the control is tall, meeting the 36px minimum touch target at minimum.',
    },
    {
      zh: '`error` 目前是视觉提示并带 `role="alert"`，读屏软件会播报。',
      en: '`error` is a visual cue with `role="alert"`, so screen readers announce it.',
    },
    {
      zh: '所有过渡都带 `motion-reduce:` 兜底。',
      en: 'Every transition has a `motion-reduce:` fallback.',
    },
  ],
}
