import { Surfaces } from 'aios-ui-kit/surfaces'
import type { ComponentDoc } from '../types'

import SurfacesElevations from '../../examples/surfaces/elevations'
import elevationsSource from '../../examples/surfaces/elevations.tsx?raw'

export const surfacesDoc: ComponentDoc = {
  slug: 'surfaces',
  name: 'Surfaces',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '层级容器，用背景与边框而不是阴影来表达高度。',
    en: 'An elevation container that reads as depth through background and border, never shadow.',
  },
  preview: () => (
    <Surfaces className="w-full max-w-xs">
      <p className="font-mono text-xs text-foreground-muted">Surface content</p>
    </Surfaces>
  ),
  importStatement: `import { Surfaces } from 'aios-ui-kit/surfaces'`,
  usageSnippet: `<Surfaces elevation={1} padding="md">\n  …\n</Surfaces>`,
  examples: [
    {
      id: 'elevations',
      title: { zh: '层级', en: 'Elevations' },
      description: {
        zh: '`elevation` 从 1 到 8，数值越大背景越靠前、边框越亮。AIOS 系统里层级只靠这两样表达，不用 box-shadow。',
        en: '`elevation` runs from 1 to 8 — higher values bring the background forward and brighten the border. In the AIOS system, depth is expressed only through those two, never box-shadow.',
      },
      code: elevationsSource,
      render: () => <SurfacesElevations />,
    },
  ],
  api: [
    {
      name: 'Surfaces',
      description: {
        zh: '渲染为 `<div>`，透传所有原生 div 属性。',
        en: 'Renders a `<div>` and forwards every native div prop.',
      },
      props: [
        {
          name: 'elevation',
          type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8',
          default: '1',
          description: { zh: '层级，越大越靠前。', en: 'Elevation level; higher reads as closer.' },
        },
        {
          name: 'padding',
          type: `'none' | 'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '内边距。', en: 'Inner padding.' },
        },
        {
          name: 'border',
          type: `'none' | 'default' | 'visible'`,
          default: `'default'`,
          description: { zh: '边框强度。', en: 'Border weight.' },
        },
        {
          name: 'radius',
          type: `'none' | 'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '圆角。', en: 'Corner radius.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Surfaces 本身不带语义角色，只是视觉容器。如果里面是可交互内容，语义由子元素承担。',
      en: 'Surfaces carries no semantic role of its own — it is a visual shell. If the content inside is interactive, the semantics come from the children.',
    },
  ],
}
