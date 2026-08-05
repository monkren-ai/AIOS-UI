import type { ReactNode } from 'react'

/** 双语文案。文档站所有面向用户的字符串都走这个形状。 */
export interface Bilingual {
  zh: string
  en: string
}

export interface PropRow {
  name: string
  type: string
  default?: string
  /** 必填项。和 `default` 互斥——有默认值就说明可以不传。 */
  required?: boolean
  description: Bilingual
}

/** API reference 里的一张表。复合组件的每个 part 各占一张。 */
export interface ApiSection {
  name: string
  description?: Bilingual
  props: PropRow[]
}

export interface ComponentExample {
  id: string
  title: Bilingual
  description?: Bilingual
  /**
   * 示例源码。
   *
   * 一律用 `import source from './examples/xxx.tsx?raw'` 从真实文件读，
   * 别手抄——手抄的代码块迟早和上面渲染出来的东西对不上。
   */
  code: string
  render: () => ReactNode
}

export type ComponentStatus = 'stable' | 'beta' | 'new' | 'deprecated'

export interface ComponentDoc {
  /** URL 片段，kebab-case，例如 `dropdown-menu`。 */
  slug: string
  /** 导出名，例如 `DropdownMenu`。 */
  name: string
  /** 所属分类 id，见 `categories.ts`。 */
  category: string
  description: Bilingual
  status?: ComponentStatus
  /** 顶部 Preview 区渲染的内容。 */
  preview: () => ReactNode
  /** Usage 段落的 import 语句。 */
  importStatement: string
  /** Usage 段落的最小可用片段。 */
  usageSnippet: string
  /** 复合组件在 Usage 之后补充的组成说明。 */
  composition?: Bilingual
  examples: ComponentExample[]
  api: ApiSection[]
  accessibility: Bilingual[]
  /** 底层依赖的 Base UI primitive 名，有则在 API 段落给出出处。 */
  baseUi?: string
}

export interface ComponentCategory {
  id: string
  label: Bilingual
  description: Bilingual
}
