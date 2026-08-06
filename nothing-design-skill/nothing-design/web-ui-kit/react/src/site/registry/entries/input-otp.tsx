import { InputOTP } from 'aios-ui-kit/input-otp'
import type { ComponentDoc } from '../types'

import InputOTPBasic from '../../examples/input-otp/basic'
import InputOTPControlled from '../../examples/input-otp/controlled'
import InputOTPSizes from '../../examples/input-otp/sizes'

import basicSource from '../../examples/input-otp/basic.tsx?raw'
import controlledSource from '../../examples/input-otp/controlled.tsx?raw'
import sizesSource from '../../examples/input-otp/sizes.tsx?raw'

export const inputOTPDoc: ComponentDoc = {
  slug: 'input-otp',
  name: 'InputOTP',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '验证码输入，一格一位，处理粘贴与退格回退。',
    en: 'A one-time-code field of single-character slots, with paste and backspace handled.',
  },
  preview: () => <InputOTP length={6} />,
  importStatement: `import { InputOTP } from 'aios-ui-kit/input-otp'`,
  usageSnippet: `<InputOTP length={6} onValueChange={(value) => console.log(value)} />`,
  composition: {
    zh: '每个槽位是一个 `<div>` 边框加一个铺满、完全透明的原生 `<input>`；光标用 `caret-transparent` 隐藏，聚焦态改用槽位边框变色来表达，视觉上看不出「其实是一堆独立的 input」。',
    en: 'Each slot is a bordered `<div>` with a fully transparent native `<input>` filling it; the caret is hidden via `caret-transparent`, and focus is expressed by the slot border changing colour instead — visually it never reads as “a row of separate inputs”.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`length` 决定槽位数量，默认 6。只接受数字：非数字字符输入会被直接丢弃，`inputMode="numeric"` 也会在移动端唤起数字键盘。填满一格后焦点自动前移，退格清空当前格后再退一格。',
        en: '`length` sets the slot count, 6 by default. Only digits are accepted — anything else is dropped outright, and `inputMode="numeric"` brings up the numeric keypad on mobile. Filling a slot advances focus automatically, and Backspace clears the current slot before stepping back.',
      },
      code: basicSource,
      render: () => <InputOTPBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控与错误态', en: 'Controlled and the error state' },
      description: {
        zh: '`value` / `onValueChange` 是完整字符串，不是逐格状态；`error` 只负责视觉——把边框切成 Nothing 红，聚焦时红色优先于常规的 `interactive` 高亮——校验逻辑（比如判断是否等于服务端下发的验证码）完全交给你自己写。',
        en: '`value` / `onValueChange` deal in the whole string, not per-slot state; `error` is purely visual — the border switches to Nothing red, winning out over the usual `interactive` focus colour — and the actual validation (matching against a server-issued code, say) is entirely up to you.',
      },
      code: controlledSource,
      render: () => <InputOTPControlled />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档槽位高度是 36 / 44 / 52px，字号也一并调整（`text-base` / `text-subheading` / `text-heading`），保证数字在槽位里始终视觉居中且不显小。',
        en: 'The three slot heights are 36 / 44 / 52px, with the type size stepping alongside them (`text-base` / `text-subheading` / `text-heading`), so the digit always sits centred and never looks undersized.',
      },
      code: sizesSource,
      render: () => <InputOTPSizes />,
    },
  ],
  api: [
    {
      name: 'InputOTP',
      description: {
        zh: '渲染为 `<div>`，除 `onChange` 外的原生 div 属性都会透传。',
        en: 'Renders a `<div>` and forwards every native div prop except `onChange`.',
      },
      props: [
        {
          name: 'length',
          type: 'number',
          default: '6',
          description: { zh: '槽位数量。', en: 'The number of slots.' },
        },
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控的完整验证码字符串。传了它就完全由你控制。',
            en: 'The controlled full-code string. Once passed, you own it.',
          },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '任意一格变化（输入、退格、粘贴）后调用，参数是拼接后的完整字符串。',
            en: 'Called after any change — typing, backspace, or paste — with the joined full string.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用所有槽位，容器整体降到 40% 不透明度并阻断指针事件。',
            en: 'Disable every slot; the whole container drops to 40% opacity and blocks pointer events.',
          },
        },
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '错误态，槽位边框切为 Nothing 红，同时置上 `aria-invalid`。',
            en: 'The error state — slot borders turn Nothing red, and `aria-invalid` is set.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '槽位高度：36 / 44 / 52px。', en: 'Slot height: 36 / 44 / 52px.' },
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
      name: 'inputOTPVariants / inputOTPSlotVariants',
      description: {
        zh: '容器与单个槽位各自的 CVA 函数，均从主路径导出；铺满槽位的透明 `<input>` 对应 `inputOTPInputVariants`，从子路径 `input-otp-variants` 导出。',
        en: 'CVA functions for the container and a single slot, both exported from the main path; the transparent `<input>` filling each slot maps to `inputOTPInputVariants`, exported from the `input-otp-variants` subpath.',
      },
      props: [
        {
          name: 'size',
          type: 'InputOTPSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'active / filled / error',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `inputOTPSlotVariants` 接受，分别表示当前聚焦、已填入数字、错误态。',
            en: 'Accepted only by `inputOTPSlotVariants`, marking the currently focused slot, a filled slot, and the error state respectively.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每格是一个真正的 `<input inputMode="numeric" maxLength={1}>`，各自带 `aria-label="Digit n of length"`，读屏软件能清楚播报当前在第几格，而不是整体报「一个模糊的验证码框」。',
      en: 'Each cell is a real `<input inputMode="numeric" maxLength={1}>` with its own `aria-label="Digit n of length"`, so a screen reader announces exactly which slot has focus instead of one vague blob.',
    },
    {
      zh: '粘贴一整段验证码时，`onPaste` 会拦下事件、过滤掉非数字字符、按 `length` 截断，并把焦点移到粘贴后应该续填的下一格——这一整套行为对键盘与读屏用户都免费生效，不需要额外配置。',
      en: 'Pasting a whole code is intercepted in `onPaste`: non-digits are stripped, the result is truncated to `length`, and focus lands on the slot that should continue from there — all of this works for keyboard and screen-reader users alike with no extra setup.',
    },
    {
      zh: '方向键在槽位间移动焦点，并会根据 `dir="rtl"` 自动镜像左右；`error` 触发时同时置上 `aria-invalid`，但没有关联的错误文案元素——需要播报具体错误信息时请自己在旁边加一个 `role="alert"` 的提示。',
      en: 'Arrow keys move focus between slots and mirror left/right automatically under `dir="rtl"`; setting `error` also adds `aria-invalid`, but there is no associated error-text element — add your own `role="alert"` message nearby if you need the specific reason announced.',
    },
    {
      zh: '容器本身带 `aria-label="OTP input"` 作为一个整体的兜底名称，可以通过原生 `aria-label` 属性覆盖成更具体的文案，比如「Enter the 6-digit code sent to your phone」。',
      en: 'The container itself carries a fallback `aria-label="OTP input"`, which you can override via the native `aria-label` prop with something more specific, like “Enter the 6-digit code sent to your phone”.',
    },
  ],
}
