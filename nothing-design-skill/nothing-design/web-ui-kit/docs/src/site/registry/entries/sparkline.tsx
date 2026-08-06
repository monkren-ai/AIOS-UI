import { Sparkline } from 'aios-ui-kit/sparkline'
import type { ComponentDoc } from '../types'

import SparklineBasic from '../../examples/sparkline/basic'
import SparklineWithExtremes from '../../examples/sparkline/with-extremes'
import SparklineWithValues from '../../examples/sparkline/with-values'

import basicSource from '../../examples/sparkline/basic.tsx?raw'
import withExtremesSource from '../../examples/sparkline/with-extremes.tsx?raw'
import withValuesSource from '../../examples/sparkline/with-values.tsx?raw'

export const sparklineDoc: ComponentDoc = {
  slug: 'sparkline',
  name: 'Sparkline',
  category: 'data-display',
  status: 'stable',
  baseUi: '—（纯 SVG）',
  description: {
    zh: '迷你趋势线，1.5px 描边、无填充，极值用透明度区分。',
    en: 'A tiny trend line: 1.5px stroke, no fill, extremes marked by opacity.',
  },
  preview: () => <Sparkline data={[3, 7, 2, 9, 5, 8, 4, 6]} />,
  importStatement: `import { Sparkline } from 'aios-ui-kit/sparkline'`,
  usageSnippet: `<Sparkline data={[3, 7, 2, 9, 5, 8, 4, 6]} />`,
  composition: {
    zh: '纯 SVG，无 Base UI。横向用 `preserveAspectRatio="none"` 拉伸填满宽度，描边走 `vectorEffect="non-scaling-stroke"` 保持恒定 1.5px。颜色继承 `currentColor`，靠父级 `text-*` 切换。极值点用 opacity 100% / 60% 区分而非色相。',
    en: 'Pure SVG, no Base UI. Horizontally stretched with `preserveAspectRatio="none"` to fill the width, while the stroke stays a constant 1.5px via `vectorEffect="non-scaling-stroke"`. Colour inherits `currentColor` and is switched via the parent’s `text-*`. Extremes are told apart by opacity 100% / 60% rather than hue.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '只传 `data` 即可：宽度默认 100%，高度 32，描边 1.5px，无填充。`data` 少于 2 个点时不画线；空数组也不报错。',
        en: 'Just pass `data`: width defaults to 100%, height to 32, stroke to 1.5px, no fill. Fewer than 2 points draws no line; an empty array does not throw.',
      },
      code: basicSource,
      render: () => <SparklineBasic />,
    },
    {
      id: 'with-extremes',
      title: { zh: '极值标记', en: 'Extremes' },
      description: {
        zh: '`showExtremes` 打出最高 / 最低两个点。两者同色（`currentColor`），仅靠 opacity 100% / 60% 区分，符合单色优先的原则。',
        en: '`showExtremes` drops in two dots for the high and low. They share one colour (`currentColor`) and differ only by opacity 100% / 60%, honouring the monochrome-first principle.',
      },
      code: withExtremesSource,
      render: () => <SparklineWithExtremes />,
    },
    {
      id: 'with-values',
      title: { zh: '首末数值', en: 'First and last values' },
      description: {
        zh: '`showValues` 在线的两端叠出首末数值，Space Mono。需要更大空间时调高 `height`。',
        en: '`showValues` overlays the first and last values at each end of the line, in Space Mono. Raise `height` when you need more room.',
      },
      code: withValuesSource,
      render: () => <SparklineWithValues />,
    },
  ],
  api: [
    {
      name: 'Sparkline',
      description: {
        zh: '渲染为 `<svg role="img">`，透传其余原生 svg 属性。',
        en: 'Renders an `<svg role="img">` and forwards the remaining native svg props.',
      },
      props: [
        {
          name: 'data',
          type: 'number[]',
          required: true,
          description: { zh: '趋势数据点。', en: 'The trend data points.' },
        },
        {
          name: 'width',
          type: 'number | string',
          default: `'100%'`,
          description: { zh: 'SVG 宽度。', en: 'The SVG width.' },
        },
        {
          name: 'height',
          type: 'number',
          default: '32',
          description: { zh: 'SVG 高度。', en: 'The SVG height.' },
        },
        {
          name: 'strokeWidth',
          type: 'number',
          default: '1.5',
          description: { zh: '描边宽度，恒定像素（非缩放）。', en: 'Stroke width, in constant pixels (non-scaling).' },
        },
        {
          name: 'showExtremes',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '标记最高 / 最低点，opacity 区分。',
            en: 'Mark the high and low points, distinguished by opacity.',
          },
        },
        {
          name: 'showValues',
          type: 'boolean',
          default: 'false',
          description: { zh: '显示首末数值。', en: 'Show the first and last values.' },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到 `<svg>` 的类名，经 `tailwind-merge` 合并；用 `text-*` 切换线条颜色。',
            en: 'Extra classes on the `<svg>`, merged via `tailwind-merge`; use `text-*` to recolour the line.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`<svg>` 带 `role="img"` 与 `aria-label="Sparkline / 趋势线"`。需要更具体的播报时，通过原生 `aria-label` 属性覆盖，例如「过去 7 天访问量」。',
      en: 'The `<svg>` carries `role="img"` and `aria-label="Sparkline / 趋势线"`. Override via the native `aria-label` prop when you need something more specific, e.g. “Visits over the last 7 days”.',
    },
    {
      zh: '极值与数值只靠透明度与位置区分，不依赖单一色相，对色弱友好。',
      en: 'Extremes and values are told apart by opacity and position, not by hue alone, which is friendlier to colour-blind users.',
    },
  ],
}
