import { Toast } from 'aios-ui-kit/toast'
import type { ComponentDoc } from '../types'

import ToastBasic from '../../examples/toast/basic'
import ToastSeverities from '../../examples/toast/severities'

import basicSource from '../../examples/toast/basic.tsx?raw'
import severitiesSource from '../../examples/toast/severities.tsx?raw'

export const toastDoc: ComponentDoc = {
  slug: 'toast',
  name: 'Toast',
  category: 'feedback',
  status: 'new',
  baseUi: '—（自实现，内联状态条）',
  description: {
    zh: '内联状态条（Nothing 改造，不浮窗不自动消失），[SAVED]/[ERROR] 风格。',
    en: 'An inline status bar (AIOS adaptation, not a floating popup), in the [SAVED]/[ERROR] idiom.',
  },
  preview: () => (
    <Toast severity="success" label="SAVED" className="w-full max-w-xs">
      Preferences updated.
    </Toast>
  ),
  importStatement: `import { Toast } from 'aios-ui-kit/toast'`,
  usageSnippet: `<Toast severity="success" label="SAVED">Saved.</Toast>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '默认 severity 是 info。`label` 渲染成左侧的 `[ LABEL ]` bracket 标记，消息文案跟在后面。它在文档流里，不浮窗、不自动消失——挂载/卸载完全由你控制。',
        en: 'The default severity is info. `label` renders as a `[ LABEL ]` bracket on the left, followed by the message. It lives in the document flow — no popup, no auto-dismiss; mounting and unmounting are entirely up to you.',
      },
      code: basicSource,
      render: () => <ToastBasic />,
    },
    {
      id: 'severities',
      title: { zh: '严重度', en: 'Severities' },
      description: {
        zh: '`severity` 决定左侧 3px 粗边与 bracket 文案的颜色：error 落到 AIOS 红，success/warning 用对应状态色，info 回到中性。`onDismiss` 传入后渲染关闭按钮；`duration>0` 时到点回调 `onDismiss`，但组件不会自己卸载。',
        en: '`severity` sets the colour of the 3px left border and the bracket label: error reaches for the AIOS red, success/warning use the status colours, info stays neutral. Passing `onDismiss` renders a close button; when `duration>0` it fires `onDismiss` on schedule — but the component never unmounts itself.',
      },
      code: severitiesSource,
      render: () => <ToastSeverities />,
    },
  ],
  api: [
    {
      name: 'Toast',
      description: {
        zh: '渲染为文档流内的 `<div>`，`role="status"`。透传所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders an in-flow `<div>` with `role="status"`. Forwards every native div prop (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'severity',
          type: `'info' | 'success' | 'error' | 'warning'`,
          default: `'info'`,
          description: { zh: '语义严重度，决定左侧粗边与 bracket 配色。', en: 'Semantic severity; sets the left border and bracket colour.' },
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: { zh: '消息文案。', en: 'The message body.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: 'bracket 文案（如 `SAVED` / `ERROR`），渲染为 `[ LABEL ]`。', en: 'Bracket text (e.g. `SAVED` / `ERROR`), rendered as `[ LABEL ]`.' },
        },
        {
          name: 'onDismiss',
          type: '() => void',
          description: { zh: '关闭按钮回调；传入后才渲染关闭按钮。', en: 'Close-button callback; the button only renders when this is provided.' },
        },
        {
          name: 'duration',
          type: 'number',
          default: '0',
          description: { zh: '到点回调 `onDismiss` 的毫秒数；`0` = 不自动消失。组件不会自己卸载。', en: 'Milliseconds before `onDismiss` fires; `0` = never. The component never unmounts itself.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名，经 `tailwind-merge` 合并。', en: 'Extra classes, merged via `tailwind-merge`.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`role="status"`，`aria-live` 区域由调用方按需在外层包裹；内联横条本身不抢焦点。',
      en: '`role="status"`; wrap with your own `aria-live` region if needed. The bar itself does not steal focus.',
    },
    {
      zh: '关闭按钮是原生 `<button type="button">`，带 `aria-label`，键盘可达。',
      en: 'The close button is a native `<button type="button">` with an `aria-label`, keyboard-reachable.',
    },
    {
      zh: '不浮窗、不 portal、不 fixed——它在 tab 序列里就是普通文档流元素。',
      en: 'No popup, no portal, no fixed positioning — it is an ordinary in-flow element in the tab order.',
    },
  ],
}
