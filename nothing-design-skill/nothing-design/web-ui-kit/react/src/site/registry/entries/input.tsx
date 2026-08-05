import { Input } from 'nothing-ui/input'
import type { ComponentDoc } from '../types'

import InputVariants from '../../examples/input/variants'
import InputSizes from '../../examples/input/sizes'
import InputAddons from '../../examples/input/addons'
import InputValidation from '../../examples/input/validation'
import InputControlled from '../../examples/input/controlled'

import variantsSource from '../../examples/input/variants.tsx?raw'
import sizesSource from '../../examples/input/sizes.tsx?raw'
import addonsSource from '../../examples/input/addons.tsx?raw'
import validationSource from '../../examples/input/validation.tsx?raw'
import controlledSource from '../../examples/input/controlled.tsx?raw'

export const inputDoc: ComponentDoc = {
  slug: 'input',
  name: 'Input',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '单行文本输入框，支持前后缀、尺寸与错误态。',
    en: 'A single-line text field with addons, sizes, and an error state.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Input placeholder="Type something" />
    </div>
  ),
  importStatement: `import { Input } from 'nothing-ui/input'`,
  usageSnippet: `<Input label="Email" placeholder="you@nothing.tech" />`,
  composition: {
    zh: '`Input` 不是裸的 `<input>`，而是一整块字段：外层容器里依次是 label、控件行（图标 + 原生 input + 清除按钮）、以及错误或说明文案。所以它默认 `width: 100%`，宽度由父容器决定。',
    en: '`Input` is a whole field, not a bare `<input>`: a wrapper holds the label, the control row (icons, the native input, the clear button), and the error or helper text. It is `width: 100%` by design — let the parent decide how wide it should be.',
  },
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '只有两种：`outline` 用边框划出边界、背景透明；`soft` 垫一层 `surface-raised`。选哪个取决于底色——放在已经有背景的卡片里，`outline` 更干净；直接铺在页面背景上，`soft` 能把输入区从周围分出来。',
        en: 'There are only two. `outline` draws a border over a transparent background; `soft` sits on a raised surface. Pick based on what is behind it: inside a card that already has a background, `outline` reads cleaner; directly on the page background, `soft` separates the input from everything around it.',
      },
      code: variantsSource,
      render: () => <InputVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '控件行的最小高度是 36 / 44 / 52px。`md` 落在 44px 的最小触达尺寸上，所以是默认值；`sm` 只适合桌面端信息密集的场景，触屏上别用。',
        en: 'The control row has a minimum height of 36 / 44 / 52px. `md` lands on the 44px minimum touch target, which makes it the default; `sm` is for dense desktop layouts only — do not ship it to touch.',
      },
      code: sizesSource,
      render: () => <InputSizes />,
    },
    {
      id: 'addons',
      title: { zh: '图标与清除', en: 'Icons and clearing' },
      description: {
        zh: '`leadingIcon` / `trailingIcon` 收进 `aria-hidden` 的插槽，纯装饰，不会被读屏软件念出来——真正的说明要靠 `label` 或 `placeholder`。`clearable` 只在有值且未禁用时才渲染清除按钮，且它 `tabIndex={-1}`：键盘用户按住退格更快，没必要在 tab 序列里多插一站。',
        en: '`leadingIcon` and `trailingIcon` go into `aria-hidden` slots — they are decoration, so screen readers skip them and the real description has to come from `label` or `placeholder`. `clearable` only renders the clear button when there is a value and the field is enabled, and that button is `tabIndex={-1}`: keyboard users hold backspace instead, so there is no reason to add a stop to the tab order.',
      },
      code: addonsSource,
      render: () => <InputAddons />,
    },
    {
      id: 'validation',
      title: { zh: '标签、说明与错误', en: 'Label, helper text, and errors' },
      description: {
        zh: '`error` 是一票否决：一旦有值，`message` 就不渲染，边框转红，并挂上 `aria-invalid` 与指向错误文案的 `aria-describedby`，错误块本身是 `role="alert"`。所以校验信息写进 `error` 就够了，不用再自己拼 aria。',
        en: '`error` wins outright: when it has a value, `message` is not rendered, the border turns red, and the field gets `aria-invalid` plus an `aria-describedby` pointing at the message, which is itself a `role="alert"`. Put the validation text in `error` and you are done — no hand-wiring of aria attributes.',
      },
      code: validationSource,
      render: () => <InputValidation />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '两个回调都会触发：`onValueChange` 直接给你字符串，省掉一次 `e.target.value`，形状与 `Select`、`RadioGroup` 这些一致；`onChange` 则是原生 `ChangeEvent` 的透传，需要读 `inputType` 之类的时候用它。非受控时用 `defaultValue` 给初始值。',
        en: 'Both callbacks fire. `onValueChange` hands you the string directly, saving an `e.target.value` and matching the shape of `Select`, `RadioGroup`, and friends; `onChange` is a straight passthrough of the native `ChangeEvent`, which is what you want when you need to read something like `inputType`. Uncontrolled, `defaultValue` seeds the initial value.',
      },
      code: controlledSource,
      render: () => <InputControlled />,
    },
  ],
  api: [
    {
      name: 'Input',
      description: {
        zh: '除 `value` / `size` 外，其余原生 `<input>` 属性（`type`、`name`、`required`、`autoComplete`、`aria-*` …）都透传到内部的 `<input>` 上。`className` 与 `style` 落在最外层容器。',
        en: 'Every native `<input>` prop except `value` and `size` (`type`, `name`, `required`, `autoComplete`, `aria-*`, …) is forwarded to the inner `<input>`. `className` and `style` land on the outer wrapper.',
      },
      props: [
        {
          name: 'variant',
          type: `'outline' | 'soft' | 'underline' | 'bordered'`,
          default: `'outline'`,
          description: {
            zh: '视觉样式。`underline` / `bordered` 是 v1 别名，分别映射到 `outline` / `soft`。',
            en: 'Visual style. `underline` and `bordered` are v1 aliases that map to `outline` and `soft`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '控件高度：36 / 44 / 52px。', en: 'Control height: 36 / 44 / 52px.' },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '字段标签，自动 `htmlFor` 关联到输入框。',
            en: 'Field label, wired to the input with `htmlFor`.',
          },
        },
        {
          name: 'message',
          type: 'string',
          description: {
            zh: '辅助说明。有 `error` 时不渲染。',
            en: 'Helper text. Not rendered while `error` is set.',
          },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案。同时开启错误配色、`aria-invalid` 与 `role="alert"`。',
            en: 'Error text. Also switches on the error styling, `aria-invalid`, and `role="alert"`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控值。不传则组件自己维护内部状态。',
            en: 'Controlled value. Leave it out and the component keeps its own state.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: {
            zh: '非受控时的初始值。',
            en: 'The starting value when uncontrolled.',
          },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '值变化回调，参数是新字符串。清空按钮也会触发。',
            en: 'Called with the new string. The clear button fires it too.',
          },
        },
        {
          name: 'onChange',
          type: 'React.ChangeEventHandler<HTMLInputElement>',
          description: {
            zh: '原生变更事件透传。清空按钮派发的是真实事件，所以这里同样会收到。',
            en: 'The native change event, passed straight through. The clear button dispatches a real event, so this fires for it as well.',
          },
        },
        {
          name: 'leadingIcon',
          type: 'ReactNode',
          description: {
            zh: '输入框前的装饰插槽，`aria-hidden`。',
            en: 'Decorative slot before the input; `aria-hidden`.',
          },
        },
        {
          name: 'trailingIcon',
          type: 'ReactNode',
          description: {
            zh: '输入框后的装饰插槽。`clearable` 且有值时会被清除按钮顶掉。',
            en: 'Decorative slot after the input. The clear button takes its place when `clearable` has something to clear.',
          },
        },
        {
          name: 'clearable',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '有值且未禁用时显示清除按钮，点击后把值清空并把焦点还给输入框。',
            en: 'Show a clear button when there is a value and the field is enabled; clicking it empties the value and returns focus to the input.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用输入，并置上 `data-disabled`。',
            en: 'Disable the input and set `data-disabled`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the outer wrapper, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'Input.Message',
      description: {
        zh: '辅助文案的独立版本。当你不用 `message` / `error`、想自己控制文案位置时用它。',
        en: 'The helper text as a standalone part, for when you skip `message` / `error` and want to place the text yourself.',
      },
      props: [
        {
          name: 'variant',
          type: `'default' | 'error'`,
          default: `'default'`,
          description: { zh: '中性说明还是错误文案。', en: 'Neutral helper text or an error.' },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '文案内容。', en: 'The text.' },
        },
      ],
    },
    {
      name: 'inputVariants',
      description: {
        zh: '生成外层容器类名的 CVA 函数。控件行、输入框本体、标签、说明文字各有对应的 `inputControlVariants` / `inputFieldVariants` / `inputLabelVariants` / `inputHelperVariants`，需要手搓字段时可以直接取用。',
        en: 'The CVA function for the outer wrapper. The control row, the field itself, the label, and the helper text have their own `inputControlVariants` / `inputFieldVariants` / `inputLabelVariants` / `inputHelperVariants`, which you can reach for when hand-rolling a field.',
      },
      props: [
        {
          name: 'variant',
          type: `'outline' | 'soft'`,
          default: `'outline'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'InputSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`label` 通过 `htmlFor` 指向输入框；不传 `label` 时输入框就是裸的，你必须自己补 `aria-label` 或外挂一个 `Label`。',
      en: '`label` is wired to the input with `htmlFor`. Without it the input has no accessible name, so supply an `aria-label` or pair it with a `Label`.',
    },
    {
      zh: '`error` 会置上 `aria-invalid` 与 `aria-describedby`，错误块是 `role="alert"`，出现时读屏软件会立即播报。',
      en: 'Setting `error` adds `aria-invalid` and `aria-describedby`, and the error block is a `role="alert"`, so screen readers announce it as soon as it appears.',
    },
    {
      zh: '前后缀图标槽位都是 `aria-hidden="true"`，纯装饰，不承担语义。',
      en: 'Both icon slots are `aria-hidden="true"` — decoration only, never meaning.',
    },
    {
      zh: '清除按钮带 `aria-label="Clear input"`，但 `tabIndex={-1}`，只在指针交互中出现，不打断键盘的 tab 顺序。',
      en: 'The clear button carries `aria-label="Clear input"` but is `tabIndex={-1}`, so it exists for pointer users without adding a stop to the keyboard tab order.',
    },
    {
      zh: '所有颜色过渡都带 `motion-reduce:transition-none`，用户开了减弱动效就不动。',
      en: 'Every colour transition has `motion-reduce:transition-none`, so nothing animates under reduced motion.',
    },
  ],
}
