import type { ComponentCategory } from './types'

/**
 * 组件分类。
 *
 * 前五类沿用 appica-ui 的分法，后四类是 Nothing 独有的：
 * 时间与系统 widget、桌面小组件、AI OS 的 Agent 流程组件、以及点阵视觉件。
 */
export const CATEGORIES: ComponentCategory[] = [
  {
    id: 'actions-inputs',
    label: { zh: '操作与输入', en: 'Actions & Inputs' },
    description: {
      zh: '按钮、表单控件，以及一切采集用户输入的组件。',
      en: 'Buttons, form controls, and everything that collects user input.',
    },
  },
  {
    id: 'data-display',
    label: { zh: '数据展示与布局', en: 'Data Display & Layout' },
    description: {
      zh: '卡片、表格、头像等承载内容的容器与排版件。',
      en: 'Cards, tables, avatars — the containers and primitives that carry content.',
    },
  },
  {
    id: 'navigation',
    label: { zh: '菜单与导航', en: 'Menus & Navigation' },
    description: {
      zh: '在页面与层级之间移动所需的组件。',
      en: 'Everything for moving between pages and levels.',
    },
  },
  {
    id: 'overlays',
    label: { zh: '浮层', en: 'Overlays' },
    description: {
      zh: '浮在页面之上的对话框、气泡与抽屉。',
      en: 'Dialogs, popups, and drawers that float above the page.',
    },
  },
  {
    id: 'feedback',
    label: { zh: '状态与反馈', en: 'Status & Feedback' },
    description: {
      zh: '告诉用户「发生了什么」以及「进行到哪一步」。',
      en: 'Tell the user what happened and how far along it is.',
    },
  },
  {
    id: 'time-system',
    label: { zh: '时间与系统', en: 'Time & System' },
    description: {
      zh: 'Nothing 特色的时钟、日历与设备状态组件。',
      en: "Nothing's signature clock, calendar, and device-status components.",
    },
  },
  {
    id: 'widgets',
    label: { zh: '桌面小组件', en: 'Desktop Widgets' },
    description: {
      zh: '自成一体的桌面小组件：播放器、剪贴板、对讲机之类，放上去就能用。',
      en: 'Self-contained desktop widgets — a player, a clipboard, a radio — that work as soon as you drop them in.',
    },
  },
  {
    id: 'agent',
    label: { zh: 'AI OS 与对话', en: 'AI OS & Conversation' },
    description: {
      zh: '面向 Agent 流程与对话式界面的组件矩阵。',
      en: 'The component matrix for agent workflows and conversational interfaces.',
    },
  },
  {
    id: 'decoration',
    label: { zh: '装饰与效果', en: 'Decoration & Effects' },
    description: {
      zh: '点阵、字形等构成 Nothing 视觉语言的表现层组件。',
      en: 'Dot matrix, glyphs, and the other pieces that make the visual language read as Nothing.',
    },
  },
]

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((category) => [category.id, category]))
