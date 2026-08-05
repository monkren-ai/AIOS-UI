import { InputCopy } from 'nothing-ui/input-copy'
import type { ComponentDoc } from '../types'

import InputCopyBasic from '../../examples/input-copy/basic'
import InputCopySizes from '../../examples/input-copy/sizes'
import InputCopyOnCopy from '../../examples/input-copy/on-copy'

import basicSource from '../../examples/input-copy/basic.tsx?raw'
import sizesSource from '../../examples/input-copy/sizes.tsx?raw'
import onCopySource from '../../examples/input-copy/on-copy.tsx?raw'

export const inputCopyDoc: ComponentDoc = {
  slug: 'input-copy',
  name: 'InputCopy',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '只读输入框配复制按钮，复制后短暂显示回执。',
    en: 'A read-only field with a copy button that confirms for a moment afterwards.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <InputCopy label="API Key" defaultValue="ntg_sk_9f2a1c7b3e0d4f56" />
    </div>
  ),
  importStatement: `import { InputCopy } from 'nothing-ui/input-copy'`,
  usageSnippet: `<InputCopy label="API Key" defaultValue="ntg_sk_9f2a1c7b3e0d4f56" />`,
  composition: {
    zh: '结构是「可选 label + 一行控件」，控件行里输入框与复制按钮共享同一圈边框，按钮用 `border-s` 隔开——RTL 下分隔线会自动挪到另一侧。',
    en: 'The layout is an optional label plus one control row; the input and the copy button share a single border, separated by a `border-s` rule that flips sides automatically under RTL.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`readOnly` 默认 `true`，符合大多数用途（API key、邀请链接）——用户不该编辑这类值，只该复制它。点击按钮或对它按 Enter / 空格都会触发复制。',
        en: '`readOnly` defaults to `true`, which fits most uses — an API key or invite link is meant to be copied, not edited. Clicking the button, or pressing Enter / Space on it, triggers the copy.',
      },
      code: basicSource,
      render: () => <InputCopyBasic />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 同时调整控件行高度（36 / 44 / 52px）与内部文字大小，输入框与按钮的尺寸联动，不需要分别设置。',
        en: '`size` scales both the control row height (36 / 44 / 52px) and the type size inside it; the field and the button move together, so there is nothing to set separately.',
      },
      code: sizesSource,
      render: () => <InputCopySizes />,
    },
    {
      id: 'on-copy',
      title: { zh: '复制回调', en: 'Copy callback' },
      description: {
        zh: '`onCopy` 在复制成功后调用，参数是当前值；`copiedDuration`（默认 2000ms）控制按钮上「COPIED」文案与绿色闪光维持多久后自动恢复成「COPY」。',
        en: '`onCopy` fires after a successful copy with the current value; `copiedDuration` (2000ms by default) controls how long the “COPIED” label and its green flash stay before reverting to “COPY”.',
      },
      code: onCopySource,
      render: () => <InputCopyOnCopy />,
    },
  ],
  api: [
    {
      name: 'InputCopy',
      description: {
        zh: '渲染为 `<div>`，除 `children` / `onChange` / `onCopy` 外的原生 div 属性都会透传。',
        en: 'Renders a `<div>` and forwards every native div prop except `children`, `onChange`, and `onCopy`.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控值。传了它就完全由你控制，内部不再维护自己的状态。',
            en: 'The controlled value. Once passed, the component stops tracking its own.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: `''`,
          description: { zh: '非受控时的初始值。', en: 'The initial value when uncontrolled.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签，自动 `htmlFor` 关联到输入框。', en: 'A field label, wired to the input via `htmlFor`.' },
        },
        {
          name: 'placeholder',
          type: 'string',
          description: { zh: '占位文案。', en: 'Placeholder text.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '控件高度：36 / 44 / 52px。', en: 'Control height: 36 / 44 / 52px.' },
        },
        {
          name: 'copyLabel',
          type: 'string',
          default: `'COPY'`,
          description: { zh: '默认状态下按钮的文案与 `aria-label`。', en: 'The button’s text and `aria-label` in the default state.' },
        },
        {
          name: 'copiedLabel',
          type: 'string',
          default: `'COPIED'`,
          description: { zh: '复制成功后按钮短暂显示的文案与 `aria-label`。', en: 'The button’s text and `aria-label` for the brief post-copy state.' },
        },
        {
          name: 'copiedDuration',
          type: 'number',
          default: '2000',
          description: { zh: '「已复制」状态维持的毫秒数，之后自动恢复。', en: 'Milliseconds the “copied” state stays before reverting.' },
        },
        {
          name: 'onCopy',
          type: '(value: string) => void',
          description: { zh: '复制成功后调用，参数是当前值。', en: 'Called after a successful copy, with the current value.' },
        },
        {
          name: 'readOnly',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '是否禁止编辑输入框。设为 `false` 可以让用户先改再复制。',
            en: 'Whether the field blocks editing. Set to `false` to let the user edit before copying.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到最外层容器的类名，经 `tailwind-merge` 合并。', en: 'Extra classes on the outer container, merged via `tailwind-merge`.' },
        },
      ],
    },
    {
      name: 'inputCopyVariants',
      description: {
        zh: '外层容器的 CVA 函数。标签、控件行、输入框本体、复制按钮各有对应的 `inputCopyLabelVariants` / `inputCopyControlVariants` / `inputCopyFieldVariants` / `inputCopyButtonVariants`，均从子路径导出。',
        en: 'The CVA function for the outer wrapper. The label, control row, field, and button each have their own `inputCopyLabelVariants` / `inputCopyControlVariants` / `inputCopyFieldVariants` / `inputCopyButtonVariants`, all exported from the subpath.',
      },
      props: [
        {
          name: 'size',
          type: 'InputCopySize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'copied',
          type: 'boolean',
          default: 'false',
          description: { zh: '同上，控制闪光与文案切换。', en: 'Same as above; drives the flash and label swap.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '复制按钮是真正的 `<button>`，`aria-label` 随状态在 `copyLabel` / `copiedLabel` 之间切换，并带 `aria-live="polite"`，读屏软件会在状态变化后播报出来。',
      en: 'The copy control is a real `<button>` whose `aria-label` swaps between `copyLabel` and `copiedLabel`, and it carries `aria-live="polite"`, so a screen reader announces the state change.',
    },
    {
      zh: '复制失败（例如剪贴板权限被拒）会被静默吞掉，`copied` 状态仍然会切到 `true`——目前没有失败态的视觉或语义反馈，这是已知的取舍。',
      en: 'A failed copy (say, blocked clipboard permission) is silently swallowed, and `copied` still flips to `true` — there is currently no visual or semantic feedback for the failure path, a known trade-off.',
    },
    {
      zh: '默认 `readOnly` 的输入框仍可以被聚焦、全选、用系统快捷键复制，只是不能编辑；这让键盘用户有两条路径都能拿到值，不完全依赖鼠标点按钮。',
      en: 'The default read-only field can still be focused, select-all’d, and copied with the OS shortcut — only editing is blocked — so keyboard users have a second path to the value, not just clicking the button.',
    },
    {
      zh: '复制成功的闪光动画走 `@keyframes`，并带 `motion-reduce:animate-none`，减弱动效下只保留文案变化，不再有背景闪烁。',
      en: 'The success flash uses a `@keyframes` animation with `motion-reduce:animate-none`, so reduced motion keeps only the label change, dropping the background flash.',
    },
  ],
}
