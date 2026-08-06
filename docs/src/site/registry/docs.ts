import type { Bilingual } from './types'

export interface DocPageMeta {
  slug: string
  title: Bilingual
  description: Bilingual
  group: string
}

export interface DocGroupMeta {
  id: string
  label: Bilingual
}

export const DOC_GROUPS: DocGroupMeta[] = [
  { id: 'getting-started', label: { zh: '开始使用', en: 'Getting Started' } },
  { id: 'guides', label: { zh: '指南', en: 'Guides' } },
  { id: 'providers', label: { zh: 'Provider 与 Hook', en: 'Providers & Hooks' } },
]

export const DOC_PAGES: DocPageMeta[] = [
  {
    slug: 'installation',
    group: 'getting-started',
    title: { zh: '安装', en: 'Installation' },
    description: {
      zh: '把 AIOS UI 接进你的 React 项目。',
      en: 'Add AIOS UI to your React project.',
    },
  },
  {
    slug: 'usage',
    group: 'getting-started',
    title: { zh: '用法', en: 'Usage' },
    description: {
      zh: '导入约定、变体词表与组合方式。',
      en: 'Import conventions, the variant vocabulary, and how composition works.',
    },
  },
  {
    slug: 'migrating-v2',
    group: 'getting-started',
    title: { zh: '从 1.x 升级', en: 'Migrating from 1.x' },
    description: {
      zh: '2.0 的四处破坏性变更，以及顺带修好的那些。',
      en: 'The four breaking changes in 2.0, and what got fixed along the way.',
    },
  },
  {
    slug: 'design-principles',
    group: 'getting-started',
    title: { zh: '设计原则', en: 'Design Principles' },
    description: {
      zh: 'Nothing 设计语言的硬约束，以及它们为什么存在。',
      en: "The hard constraints of the AIOS design language, and why they're there.",
    },
  },
  {
    slug: 'theming',
    group: 'guides',
    title: { zh: '主题定制', en: 'Theming' },
    description: {
      zh: '令牌体系的组织方式，以及如何安全地覆盖它。',
      en: 'How the token system is organised, and how to override it safely.',
    },
  },
  {
    slug: 'dark-mode',
    group: 'guides',
    title: { zh: '暗色模式', en: 'Dark Mode' },
    description: {
      zh: '做一个主题切换器，并避免首屏闪烁。',
      en: 'Build a theme toggle, and avoid the flash of wrong theme.',
    },
  },
  {
    slug: 'rtl',
    group: 'guides',
    title: { zh: 'RTL 从右到左', en: 'RTL' },
    description: {
      zh: '让整套组件在阿拉伯语、希伯来语下正确镜像。',
      en: 'Mirror the whole library correctly for Arabic and Hebrew.',
    },
  },
  {
    slug: 'animation',
    group: 'guides',
    title: { zh: '动效', en: 'Animation' },
    description: {
      zh: 'motion 注入、spring 令牌，以及 reduced-motion 的处理。',
      en: 'Motion injection, the spring tokens, and how reduced-motion is handled.',
    },
  },
  {
    slug: 'accessibility',
    group: 'guides',
    title: { zh: '可访问性', en: 'Accessibility' },
    description: {
      zh: '键盘、焦点与屏幕阅读器方面已经替你做掉的部分。',
      en: "What's already handled for keyboard, focus, and screen readers.",
    },
  },
  {
    slug: 'theme-provider',
    group: 'providers',
    title: { zh: 'ThemeProvider', en: 'ThemeProvider' },
    description: {
      zh: '主题状态、持久化与无闪烁脚本。',
      en: 'Theme state, persistence, and the flash-prevention script.',
    },
  },
  {
    slug: 'direction-provider',
    group: 'providers',
    title: { zh: 'DirectionProvider', en: 'DirectionProvider' },
    description: {
      zh: '声明布局方向，同时照顾 CSS 与行为两侧。',
      en: 'Declare layout direction for both the CSS and the behaviour side.',
    },
  },
  {
    slug: 'reduced-motion-provider',
    group: 'providers',
    title: { zh: 'ReducedMotionProvider', en: 'ReducedMotionProvider' },
    description: {
      zh: '把 prefers-reduced-motion 暴露给 JS 驱动的动画。',
      en: 'Expose prefers-reduced-motion to JS-driven animation.',
    },
  },
]

export const DOC_PAGE_BY_SLUG = new Map(DOC_PAGES.map((page) => [page.slug, page]))
