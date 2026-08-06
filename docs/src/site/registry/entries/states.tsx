import { LoadingState } from 'aios-ui-kit/states'
import type { ComponentDoc } from '../types'

import StatesAll from '../../examples/states/all'
import allSource from '../../examples/states/all.tsx?raw'

export const statesDoc: ComponentDoc = {
  slug: 'states',
  name: 'States',
  category: 'feedback',
  status: 'stable',
  description: {
    zh: '加载、错误、空、不可用四种整块占位状态。',
    en: 'Four block-level placeholders: loading, error, empty, and unavailable.',
  },
  preview: () => <LoadingState progress={42} label="Loading" className="w-full max-w-xs" />,
  importStatement: `import { LoadingState, ErrorState, EmptyState, DisabledState } from 'aios-ui-kit/states'`,
  usageSnippet: `<LoadingState progress={72} label="Syncing" />`,
  composition: {
    zh: 'States 不是单一组件，而是四个独立导出：`LoadingState`、`ErrorState`、`EmptyState`、`DisabledState`。按场景选一个，不要嵌套。',
    en: 'States is not one component — it is four separate exports: `LoadingState`, `ErrorState`, `EmptyState`, and `DisabledState`. Pick the one that matches the situation; do not nest them.',
  },
  examples: [
    {
      id: 'all',
      title: { zh: '四种状态', en: 'All four states' },
      description: {
        zh: '加载态可以只显示示波器，也可以加上分段进度条和百分比。错误态带 `role="alert"` 和可选的 Retry 按钮。空态和不可用态默认都有标题，空态还能挂一个 action 插槽。',
        en: 'Loading can show just the oscilloscope, or add a segmented bar and percentage. Error uses `role="alert"` with an optional Retry button. Empty and disabled both ship with a headline by default; empty also accepts an action slot.',
      },
      code: allSource,
      render: () => <StatesAll />,
    },
  ],
  api: [
    {
      name: 'LoadingState',
      props: [
        {
          name: 'progress',
          type: 'number',
          description: {
            zh: '0–100 的进度。不传就只显示示波器动画，不显示进度条。',
            en: 'Progress from 0–100. Omit it and only the oscilloscope animation shows, with no bar.',
          },
        },
        {
          name: 'totalSegments',
          type: 'number',
          default: '20',
          description: { zh: '进度条格子数。', en: 'Number of progress-bar segments.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '方括号包裹的状态文案。', en: 'Status text wrapped in brackets.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体尺寸。', en: 'Overall size.' },
        },
      ],
    },
    {
      name: 'ErrorState',
      props: [
        {
          name: 'headline',
          type: 'string',
          required: true,
          description: { zh: '错误标题。', en: 'Error headline.' },
        },
        {
          name: 'message',
          type: 'string',
          description: { zh: '补充说明。', en: 'Supporting message.' },
        },
        {
          name: 'onRetry',
          type: '() => void',
          description: { zh: '传了才出现 Retry 按钮。', en: 'Shows a Retry button when provided.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体尺寸。', en: 'Overall size.' },
        },
      ],
    },
    {
      name: 'EmptyState',
      props: [
        {
          name: 'headline',
          type: 'string',
          default: `'Nothing here'`,
          description: { zh: '空状态标题。', en: 'Empty-state headline.' },
        },
        {
          name: 'description',
          type: 'string',
          description: { zh: '补充说明。', en: 'Supporting description.' },
        },
        {
          name: 'action',
          type: 'ReactNode',
          description: {
            zh: '底部操作区，通常放一个 Button。',
            en: 'Bottom action slot, usually a Button.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体尺寸。', en: 'Overall size.' },
        },
      ],
    },
    {
      name: 'DisabledState',
      props: [
        {
          name: 'headline',
          type: 'string',
          default: `'Unavailable'`,
          description: { zh: '不可用标题。', en: 'Unavailable headline.' },
        },
        {
          name: 'description',
          type: 'string',
          description: { zh: '补充说明。', en: 'Supporting description.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '整体尺寸。', en: 'Overall size.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`LoadingState` 和 `EmptyState` / `DisabledState` 用 `role="status"`；`ErrorState` 用 `role="alert"`。加载态还带 `aria-live="polite"`，进度变化时读屏会播报。',
      en: '`LoadingState`, `EmptyState`, and `DisabledState` use `role="status"`; `ErrorState` uses `role="alert"`. Loading also sets `aria-live="polite"` so progress changes are announced.',
    },
    {
      zh: '`DisabledState` 额外带 `aria-disabled="true"`，表示整块区域当前不可操作。',
      en: '`DisabledState` also sets `aria-disabled="true"` to mark the whole block as currently inoperable.',
    },
  ],
}
