import type { Bilingual } from './types'

export type ComponentPageId = 'basic' | 'agent' | 'other'

export interface ComponentPage {
  id: ComponentPageId
  label: Bilingual
  description: Bilingual
  categoryIds: readonly string[]
}

/** 文档站目录分页；不属于组件库公共 API。 */
export const COMPONENT_PAGES: readonly ComponentPage[] = [
  {
    id: 'basic',
    label: { zh: '基础组件', en: 'Basic components' },
    description: {
      zh: '操作、输入、数据展示、布局、导航、浮层与反馈。',
      en: 'Actions, inputs, data display, layout, navigation, overlays, and feedback.',
    },
    categoryIds: ['actions-inputs', 'data-display', 'navigation', 'overlays', 'feedback'],
  },
  {
    id: 'agent',
    label: { zh: 'AI Agent 组件', en: 'AI Agent components' },
    description: {
      zh: 'Agent 工作流、工具调用、审批与对话界面。',
      en: 'Agent workflows, tool calls, approvals, and conversational interfaces.',
    },
    categoryIds: ['agent'],
  },
  {
    id: 'other',
    label: { zh: '其他组件', en: 'Other components' },
    description: {
      zh: '时间与系统，以及装饰与效果。',
      en: 'Time and system, plus decoration and effects.',
    },
    categoryIds: ['time-system', 'decoration'],
  },
]

export function getComponentPage(value: string | null): ComponentPage {
  return COMPONENT_PAGES.find((page) => page.id === value) ?? COMPONENT_PAGES[0]
}

export function getComponentPageByCategory(categoryId: string | undefined): ComponentPage {
  return (
    COMPONENT_PAGES.find((page) => categoryId && page.categoryIds.includes(categoryId)) ??
    COMPONENT_PAGES[0]
  )
}

export function getComponentPageHref(id: ComponentPageId): string {
  return `/components?group=${id}`
}
