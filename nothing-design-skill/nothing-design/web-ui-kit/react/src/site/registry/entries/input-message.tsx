import { InputMessage } from 'nothing-ui/input-message'
import type { ComponentDoc } from '../types'

import InputMessageBasic from '../../examples/input-message/basic'
import InputMessageCharacterLimit from '../../examples/input-message/character-limit'
import InputMessageNoSubmitOnEnter from '../../examples/input-message/no-submit-on-enter'

import basicSource from '../../examples/input-message/basic.tsx?raw'
import characterLimitSource from '../../examples/input-message/character-limit.tsx?raw'
import noSubmitOnEnterSource from '../../examples/input-message/no-submit-on-enter.tsx?raw'

export const inputMessageDoc: ComponentDoc = {
  slug: 'input-message',
  name: 'InputMessage',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '消息输入框，随内容增高，回车发送并统计字数。',
    en: 'A message composer that grows with the text, sends on Enter, and counts characters.',
  },
  preview: () => (
    <div className="w-full max-w-sm">
      <InputMessage placeholder="Message the crew..." />
    </div>
  ),
  importStatement: `import { InputMessage } from 'nothing-ui/input-message'`,
  usageSnippet: `<InputMessage placeholder="Message the crew..." onSend={(value) => console.log(value)} />`,
  composition: {
    zh: '控件行是一个 `<textarea>` 加一个反相实心的发送按钮，高度由 JS 在 `useLayoutEffect` 里按 `scrollHeight` 手动写到 `style.height`，在 `minRows` 与 `maxRows` 之间夹紧；行下方是可选的一行元信息（快捷键提示 + 字数）。',
    en: 'The control row is a `<textarea>` plus an inverted solid send button; height is written manually to `style.height` inside a `useLayoutEffect` based on `scrollHeight`, clamped between `minRows` and `maxRows`. Below it sits an optional meta row with a shortcut hint and a character count.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`onSend` 在按 Enter（`submitOnEnter` 默认开启）或点击发送按钮时触发，参数是发送时的文本；非受控模式下发送后会自动清空输入框。空白或纯空格不会触发发送，按钮也会保持禁用。',
        en: '`onSend` fires on Enter (with `submitOnEnter` on by default) or a click on the send button, passing the sent text; uncontrolled, the field clears itself afterwards. Blank or whitespace-only text never sends, and the button stays disabled.',
      },
      code: basicSource,
      render: () => <InputMessageBasic />,
    },
    {
      id: 'character-limit',
      title: { zh: '字数限制', en: 'Character limit' },
      description: {
        zh: '`maxLength` 透传给原生 `textarea`，同时驱动底部计数显示成 `n/maxLength`；`countLabel` 给计数加一个单位后缀，`maxRows` 限制自动增高的上限，超出后出现内部滚动条。',
        en: '`maxLength` is forwarded to the native textarea and also drives the bottom count into `n/maxLength`; `countLabel` appends a unit suffix to the count, and `maxRows` caps how tall the field can auto-grow before it scrolls internally.',
      },
      code: characterLimitSource,
      render: () => <InputMessageCharacterLimit />,
    },
    {
      id: 'no-submit-on-enter',
      title: { zh: '关闭回车发送', en: 'Disabling Enter-to-send' },
      description: {
        zh: '`submitOnEnter={false}` 后 Enter 单纯是换行，必须点发送按钮才会触发 `onSend`——适合内容以长文本为主、误触发送成本高的场景。`hideCount` 可以整行隐藏提示与计数。',
        en: 'With `submitOnEnter={false}`, Enter is just a newline and only the button fires `onSend` — a fit for longer-form content where an accidental send is costly. `hideCount` drops the hint-and-count row entirely.',
      },
      code: noSubmitOnEnterSource,
      render: () => <InputMessageNoSubmitOnEnter />,
    },
  ],
  api: [
    {
      name: 'InputMessage',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` / `children` 外，其余原生 `<textarea>` 属性都透传到内部的 `<textarea>` 上。',
        en: 'Every native `<textarea>` prop except `value`, `defaultValue`, `onChange`, and `children` is forwarded to the inner `<textarea>`.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: { zh: '受控值。传了它就完全由你控制。', en: 'The controlled value. Once passed, you own it.' },
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: `''`,
          description: { zh: '非受控时的初始值。', en: 'The initial value when uncontrolled.' },
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          description: { zh: '值变化回调，参数是新字符串（不是原生事件）。', en: 'Called with the new string, not a native event.' },
        },
        {
          name: 'onSend',
          type: '(value: string) => void',
          description: {
            zh: '发送时调用，参数是发送的文本。文本为空或纯空白时不会触发。',
            en: 'Called with the sent text. Never fires when the text is empty or whitespace-only.',
          },
        },
        {
          name: 'placeholder',
          type: 'string',
          description: { zh: '占位文案。', en: 'Placeholder text.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用输入与发送。', en: 'Disable both typing and sending.' },
        },
        {
          name: 'minRows',
          type: 'number',
          default: '1',
          description: { zh: '最小可视行数。', en: 'The minimum visible row count.' },
        },
        {
          name: 'maxRows',
          type: 'number',
          default: '6',
          description: { zh: '自动增高的行数上限，超出后出现内部滚动。', en: 'The row cap before the field auto-grows into internal scrolling.' },
        },
        {
          name: 'maxLength',
          type: 'number',
          description: { zh: '透传给原生 `maxLength`，同时驱动计数显示。', en: 'Forwarded to the native `maxLength` and used to drive the count display.' },
        },
        {
          name: 'submitOnEnter',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否让 Enter（不含 Shift）触发发送；关闭后 Enter 只换行。', en: 'Whether Enter (without Shift) triggers a send; when off, Enter only inserts a newline.' },
        },
        {
          name: 'sendLabel',
          type: 'string',
          default: `'SEND'`,
          description: { zh: '发送按钮的文案与 `aria-label`。', en: 'The send button’s text and `aria-label`.' },
        },
        {
          name: 'countLabel',
          type: 'string',
          description: { zh: '追加在字数后面的单位文案，例如 `"CHARS"`。', en: 'A unit suffix appended after the count, e.g. `"CHARS"`.' },
        },
        {
          name: 'hideCount',
          type: 'boolean',
          default: 'false',
          description: { zh: '隐藏底部的提示与字数行。', en: 'Hide the bottom hint-and-count row entirely.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '控件内边距与字号阶梯。', en: 'The control’s padding and type-size step.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到最外层容器的类名，经 `tailwind-merge` 合并。', en: 'Extra classes on the outer container, merged via `tailwind-merge`.' },
        },
      ],
    },
    {
      name: 'inputMessageVariants',
      description: {
        zh: '外层容器的 CVA 函数。控件行、`textarea` 本体、发送按钮、提示与计数各有对应的 CVA（`inputMessageControlVariants` 等），均从子路径导出。',
        en: 'The CVA function for the outer wrapper. The control row, the textarea itself, the send button, and the hint/count each have their own CVA (`inputMessageControlVariants`, etc.), all exported from the subpath.',
      },
      props: [
        {
          name: 'size',
          type: 'InputMessageSize',
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
      zh: '`<textarea>` 带 `aria-multiline="true"`；发送按钮是真正的 `<button aria-label>`，内容为空时通过原生 `disabled` 关闭交互，而不是仅靠样式假装不可点。',
      en: 'The `<textarea>` carries `aria-multiline="true"`; the send button is a real `<button aria-label>` and is turned off with native `disabled` when there is nothing to send, rather than merely looking inert.',
    },
    {
      zh: '发送图标是 `aria-hidden`，语义全部由按钮的 `aria-label`（即 `sendLabel`）承担，替换 `sendLabel` 时注意保持含义清晰。',
      en: 'The send icon is `aria-hidden`; all meaning comes from the button’s `aria-label` (`sendLabel`), so keep it descriptive if you override it.',
    },
    {
      zh: '`submitOnEnter` 开启时，Shift+Enter 仍然可以换行——这是读屏与键盘用户都依赖的常见约定，关闭这个开关前要确认换行方式在文案里有说明。',
      en: 'With `submitOnEnter` on, Shift+Enter still inserts a newline — a convention both screen-reader and keyboard users rely on, so make sure the alternate line-break method is documented if you turn this off.',
    },
    {
      zh: '字数计数是纯文本节点，不是 `aria-live` 区域，因此每次按键都会更新但不会持续打断读屏播报；如果字数逼近上限需要主动提醒，建议自己在到达阈值时切换成 `role="status"` 的提示。',
      en: 'The character count is plain text, not an `aria-live` region — it updates on every keystroke without constantly interrupting the screen reader. If you need an active warning near the limit, switch in a `role="status"` message yourself once the threshold is hit.',
    },
    {
      zh: '禁用状态下 `textarea` 会有 `disabled:cursor-not-allowed` 与降低的透明度，同时容器带 `data-disabled`，可用于测试或额外样式钩子。',
      en: 'When disabled, the textarea gets `disabled:cursor-not-allowed` and reduced opacity, and the container carries `data-disabled` for tests or extra styling hooks.',
    },
  ],
}
