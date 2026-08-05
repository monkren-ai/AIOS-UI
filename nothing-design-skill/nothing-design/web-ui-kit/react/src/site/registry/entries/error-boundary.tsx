import ErrorBoundary from 'nothing-ui/error-boundary'
import type { ComponentDoc } from '../types'

import ErrorBoundaryTrigger from '../../examples/error-boundary/trigger'
import triggerSource from '../../examples/error-boundary/trigger.tsx?raw'

export const errorBoundaryDoc: ComponentDoc = {
  slug: 'error-boundary',
  name: 'ErrorBoundary',
  category: 'feedback',
  status: 'stable',
  description: {
    zh: '接住子树里抛出的渲染错误，换成一屏可重试的错误提示。',
    en: 'Catches render errors from the tree below it and swaps in a retryable error screen.',
  },
  preview: () => (
    <ErrorBoundary>
      <p className="font-mono text-xs text-foreground-muted">Protected content</p>
    </ErrorBoundary>
  ),
  importStatement: `import ErrorBoundary from 'nothing-ui/error-boundary'`,
  usageSnippet: `<ErrorBoundary fallback={<MyFallback />}>\n  <App />\n</ErrorBoundary>`,
  examples: [
    {
      id: 'trigger',
      title: { zh: '自定义 fallback', en: 'Custom fallback' },
      description: {
        zh: '子组件抛出渲染错误时，boundary 会切到 `fallback`。不传 fallback 的话会显示内置的全屏 ERROR 页，带 Reload 按钮。下面的例子用自定义 fallback 演示，Reset 后子树恢复正常。',
        en: 'When a child throws during render, the boundary switches to `fallback`. Without one, you get the built-in full-screen ERROR page with a Reload button. The example below uses a custom fallback; Reset brings the child tree back.',
      },
      code: triggerSource,
      render: () => <ErrorBoundaryTrigger />,
    },
  ],
  api: [
    {
      name: 'ErrorBoundary',
      description: {
        zh: '类组件，只接受 `children` 和 `fallback` 两个 prop。错误详情会打到 `console.error`，不会自动上报。',
        en: 'A class component that accepts only `children` and `fallback`. Error details go to `console.error`; nothing is reported upstream automatically.',
      },
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: { zh: '被保护的子树。', en: 'The subtree to protect.' },
        },
        {
          name: 'fallback',
          type: 'ReactNode',
          description: {
            zh: '出错时替换整棵子树的内容。不传则用内置全屏错误页。',
            en: 'Replaces the entire subtree on error. Omit it for the built-in full-screen page.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '内置 fallback 的 Reload 按钮是可聚焦的原生 `<button>`。自定义 fallback 时请自己保证有可聚焦的重试入口。',
      en: 'The built-in fallback’s Reload control is a focusable native `<button>`. With a custom fallback, provide your own focusable retry action.',
    },
    {
      zh: 'Error boundary 只能捕获渲染阶段的错误，事件处理器和异步代码里的异常接不住——那些需要 try/catch 或全局 handler。',
      en: 'Error boundaries only catch render-phase errors. Exceptions in event handlers or async code pass through — handle those with try/catch or a global handler.',
    },
  ],
}
