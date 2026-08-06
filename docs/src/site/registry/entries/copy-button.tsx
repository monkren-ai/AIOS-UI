import { CopyButton } from 'aios-ui-kit/copy-button'
import type { ComponentDoc } from '../types'

import CopyButtonBasic from '../../examples/copy-button/basic'
import CopyButtonWithText from '../../examples/copy-button/with-text'

import basicSource from '../../examples/copy-button/basic.tsx?raw'
import withTextSource from '../../examples/copy-button/with-text.tsx?raw'

export const copyButtonDoc: ComponentDoc = {
  slug: 'copy-button',
  name: 'CopyButton',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Button + clipboard API',
  description: {
    zh: '独立复制按钮，复制后短暂显示 [COPIED] 回执，不弹 toast。',
    en: 'A standalone copy button that flashes [COPIED] for a moment instead of firing a toast.',
  },
  preview: () => <CopyButton value="npm i aios-ui" />,
  importStatement: `import { CopyButton } from 'aios-ui-kit/copy-button'`,
  usageSnippet: `<CopyButton value="npm i aios-ui" />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '不传 children 时渲染一个剪贴板图标，并自带中英双语 `aria-label`。',
        en: 'Without children a clipboard icon is rendered, with a bilingual `aria-label` baked in.',
      },
      code: basicSource,
      render: () => <CopyButtonBasic />,
    },
    {
      id: 'with-text',
      title: { zh: '带文案', en: 'With text' },
      description: {
        zh: '传入 children 作为按钮文案；复制成功后短暂替换为 `[COPIED]`，失败替换为 `[ERROR]`，1.5 秒后回退。',
        en: 'Pass children as the label; on success it briefly swaps to `[COPIED]`, on failure to `[ERROR]`, reverting after 1.5s.',
      },
      code: withTextSource,
      render: () => <CopyButtonWithText />,
    },
  ],
  api: [
    {
      name: 'CopyButton',
      description: {
        zh: '透传所有 Button 的 props（`variant`、`size`、`disabled`、`onClick`、`ref` …）。',
        en: 'Forwards every Button prop (`variant`, `size`, `disabled`, `onClick`, `ref`, …).',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          required: true,
          description: { zh: '要复制到剪贴板的文本。', en: 'The text copied to the clipboard.' },
        },
        {
          name: 'copiedText',
          type: 'string',
          default: `'[COPIED]'`,
          description: { zh: '复制成功后短暂展示的回执文案。', en: 'Label flashed on success.' },
        },
        {
          name: 'errorText',
          type: 'string',
          default: `'[ERROR]'`,
          description: { zh: '复制失败时展示的文案。', en: 'Label shown on failure.' },
        },
        {
          name: 'onCopy',
          type: '(ok: boolean) => void',
          description: {
            zh: '复制结果回调，`true` 表示成功。',
            en: 'Result callback, `true` on success.',
          },
        },
        {
          name: 'variant',
          type: 'ButtonVariant',
          default: `'secondary'`,
          description: { zh: '同 Button 的视觉样式。', en: 'Same visual styles as Button.' },
        },
        {
          name: 'size',
          type: 'ButtonSize',
          default: `'sm'`,
          description: { zh: '同 Button 的尺寸。', en: 'Same sizes as Button.' },
        },
        {
          name: 'aria-label',
          type: 'string',
          description: {
            zh: '不传时按状态自动给出中英双语无障碍名。',
            en: 'Defaults to a bilingual, state-aware accessible name.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '默认 `aria-label` 随状态切换为「复制 Copy」「已复制 Copied」「复制失败 Copy failed」，读屏软件能播报复制结果。',
      en: 'The default `aria-label` tracks state — 「复制 Copy」/「已复制 Copied」/「复制失败 Copy failed」 — so screen readers announce the outcome.',
    },
    {
      zh: '`disabled` 时按钮不响应点击，也不会调用剪贴板 API。',
      en: 'When `disabled`, the button ignores clicks and never touches the clipboard API.',
    },
    {
      zh: '回执是内联文案，不弹 toast，避免打断当前上下文。',
      en: 'Feedback is inline text, not a toast, so the current context is never interrupted.',
    },
    {
      zh: '卸载时清理回执计时器，不会对已卸载组件 setState。',
      en: 'The reset timer is cleared on unmount, so no setState ever hits an unmounted component.',
    },
  ],
}
