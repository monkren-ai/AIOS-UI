import { Chip, ChipGroup } from 'aios-ui-kit/chip'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/chip/basic'
import basicSource from '../../examples/chip/basic.tsx?raw'

export const chipDoc: ComponentDoc = {
  slug: 'chip', name: 'Chip', category: 'actions-inputs', status: 'new',
  description: { zh: '用于筛选、视图切换和快速选择的紧凑按钮，可在 ChipGroup 中横向滚动。', en: 'Compact buttons for filters and quick choices, with horizontal overflow in ChipGroup.' },
  preview: () => <Chip selected>Agent</Chip>,
  importStatement: `import { Chip, ChipGroup } from 'aios-ui-kit/chip'`,
  usageSnippet: `<ChipGroup aria-label="Filters"><Chip selected>All</Chip><Chip>Agent</Chip></ChipGroup>`,
  examples: [{ id: 'basic', title: { zh: '筛选组', en: 'Filter group' }, code: basicSource, render: () => <Basic /> }],
  api: [
    { name: 'Chip', props: [
      { name: 'selected', type: 'boolean', default: 'false', description: { zh: '选择态，同时写入 aria-pressed。', en: 'Selection state, also exposed as aria-pressed.' } },
      { name: 'size', type: `'sm' | 'md'`, default: `'md'`, description: { zh: '控件高度。', en: 'Control height.' } },
      { name: 'icon', type: 'ReactNode', description: { zh: '前置装饰图标。', en: 'Decorative leading icon.' } },
    ] },
    { name: 'ChipGroup', props: [{ name: 'children', type: 'ReactNode', required: true, description: { zh: '一组 Chip。', en: 'A set of Chip controls.' } }] },
  ],
  accessibility: [{ zh: 'Chip 是原生按钮语义；筛选组应给 ChipGroup 提供 aria-label。', en: 'Chip uses button semantics; label each ChipGroup with aria-label.' }],
  baseUi: 'Button',
}
