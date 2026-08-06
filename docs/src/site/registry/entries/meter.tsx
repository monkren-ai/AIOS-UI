import { Meter } from 'aios-ui-kit/meter'
import type { ComponentDoc } from '../types'

import MeterBasic from '../../examples/meter/basic'
import MeterThresholds from '../../examples/meter/thresholds'

import basicSource from '../../examples/meter/basic.tsx?raw'
import thresholdsSource from '../../examples/meter/thresholds.tsx?raw'

export const meterDoc: ComponentDoc = {
  slug: 'meter',
  name: 'Meter',
  category: 'feedback',
  status: 'stable',
  baseUi: 'Meter',
  description: {
    zh: '量规，用于有界数值（如配额、电量），临界区用状态色标在值上。',
    en: 'A meter for bounded values (quotas, battery), with threshold regions colored on the value itself.',
  },
  preview: () => (
    <Meter value={72} min={0} max={100} low={60} high={85} optimum={30} label="Load" className="w-full max-w-sm" aria-label="System load" />
  ),
  importStatement: `import { Meter } from 'aios-ui-kit/meter'`,
  usageSnippet: `<Meter value={72} min={0} max={100} low={60} high={85} optimum={30} aria-label="System load" />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '与 ProgressBar 不同，meter 表达的是「当前状态」而非「过程」：分段轨保持中性，`value` 映射到填充格数。`size` 控制轨高与数值字号（sm / md / lg）。`label` 只是读数行末端的视觉文字，不是无障碍名称——给每个 meter 传 `aria-label`。',
        en: 'Unlike a ProgressBar, a meter expresses a current state rather than a process: the segmented track stays neutral and `value` maps to the filled tick count. `size` sets the track height and value type size (sm / md / lg). `label` is only visual caption text, not the accessible name — give each meter an `aria-label`.',
      },
      code: basicSource,
      render: () => <MeterBasic />,
    },
    {
      id: 'thresholds',
      title: { zh: '临界区', en: 'Thresholds' },
      description: {
        zh: '`low` / `high` 把区间切成 low / mid / high 三段，`optimum` 决定哪段是 good。value 离 optimum 段越远，数值越警示：相邻一段变 warning（黄），两段之隔变 critical（红）。注意状态色只落在数值上——分段轨永远是中性灰，`--warning` / `--accent` 不染整条背景。`low` / `high` 的位置还会在轨上画一条 1px 竖标。',
        en: '`low` / `high` split the range into low / mid / high zones, and `optimum` picks which zone is good. The further `value` sits from the optimum zone, the more the number warns: one zone away turns it warning (yellow), two away turns it critical (red). The status colour lands only on the value — the track itself stays neutral, `--warning` / `--accent` never tint the whole bar. The `low` / `high` positions also draw a 1px marker on the track.',
      },
      code: thresholdsSource,
      render: () => <MeterThresholds />,
    },
  ],
  api: [
    {
      name: 'Meter',
      description: {
        zh: '基于 Base UI 的 Meter 原语，渲染带 `role="meter"` 的 `<div>`，透传原生 div 属性。`children` 被移除。',
        en: 'Built on Base UI’s Meter primitive; renders a `<div>` with `role="meter"` and forwards native div props. `children` is omitted from the type.',
      },
      props: [
        {
          name: 'value',
          type: 'number',
          required: true,
          description: { zh: '当前值。', en: 'The current value.' },
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: { zh: '下限。', en: 'The minimum.' },
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: { zh: '上限。', en: 'The maximum.' },
        },
        {
          name: 'low',
          type: 'number',
          description: {
            zh: '临界下界，低于它进入 low 区。',
            en: 'The lower threshold; below it is the low zone.',
          },
        },
        {
          name: 'high',
          type: 'number',
          description: {
            zh: '临界上界，高于它进入 high 区。',
            en: 'The upper threshold; above it is the high zone.',
          },
        },
        {
          name: 'optimum',
          type: 'number',
          description: {
            zh: '期望值。它所在区为 good，决定状态色映射。',
            en: 'The optimum. Its zone is good, which drives the status colour.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '读数行末端的说明文字，不是无障碍名称。',
            en: 'Caption at the end of the readout; not the accessible name.',
          },
        },
        {
          name: 'showValue',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否显示数值。', en: 'Whether to show the value.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '轨高与数值字号。',
            en: 'Track height and value type size.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在最外层。宽度就靠它给。',
            en: 'Extra classes on the outer element. Width comes from here.',
          },
        },
      ],
    },
    {
      name: 'meterValueVariants',
      description: {
        zh: '数值颜色的 CVA 函数，`zone` 维度产出 good / warning / critical 三档。',
        en: 'The CVA function for the value colour; the `zone` axis yields good / warning / critical.',
      },
      props: [
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'zone',
          type: `'good' | 'warning' | 'critical'`,
          default: `'good'`,
          description: { zh: '状态区。', en: 'The status zone.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '基于 Base UI Meter 原语，根元素带 `role="meter"`，并自动写入 `aria-valuemin` / `aria-valuemax` / `aria-valuenow`。',
      en: 'Built on the Base UI Meter primitive, so the root carries `role="meter"` and automatically writes `aria-valuemin` / `aria-valuemax` / `aria-valuenow`.',
    },
    {
      zh: '组件不替你生成无障碍名称。`label` 只是读数行里的视觉文字，所以每个 Meter 都要自己传 `aria-label`，或用 `aria-labelledby` 指向已有标题。',
      en: 'The component generates no accessible name. `label` is only visual text in the readout, so every Meter needs its own `aria-label` — or an `aria-labelledby` pointing at a heading.',
    },
    {
      zh: '`low` / `high` / `optimum` 的语义只通过数值颜色表达，不写进 aria。临界含义必须同时出现在文字里，否则只有能分辨颜色的用户看得到。',
      en: 'The `low` / `high` / `optimum` semantics show up only through the value colour and write no ARIA. Threshold meanings must also appear in text, or only users who can distinguish colours will get them.',
    },
    {
      zh: '临界竖标是纯装饰，`aria-hidden`，读屏不会念出它们。',
      en: 'The threshold markers are decorative and `aria-hidden`, so screen readers skip them.',
    },
  ],
}
