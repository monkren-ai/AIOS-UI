import { SystemMonitor } from 'aios-ui-kit/system-monitor'
import type { ComponentDoc } from '../types'

import SystemMonitorDefault from '../../examples/system-monitor/default'
import SystemMonitorWarning from '../../examples/system-monitor/warning'

import defaultSource from '../../examples/system-monitor/default.tsx?raw'
import warningSource from '../../examples/system-monitor/warning.tsx?raw'

export const systemMonitorDoc: ComponentDoc = {
  slug: 'system-monitor',
  name: 'SystemMonitor',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: 'CPU、内存、存储、网络与电量的分段读数面板。',
    en: 'Segmented readouts for CPU, RAM, storage, network, and battery.',
  },
  preview: () => (
    <SystemMonitor
      cpuPercent={38}
      ramPercent={54}
      storagePercent={61}
      className="w-full max-w-sm"
    />
  ),
  importStatement: `import { SystemMonitor } from 'aios-ui-kit/system-monitor'`,
  usageSnippet: `<SystemMonitor cpuPercent={38} ramPercent={54} storagePercent={61} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '健康读数', en: 'Healthy readings' },
      description: {
        zh: '五项指标各占一块：CPU、RAM、Storage 都是「百分比 + 分段条」，RAM 和 Storage 额外配一行 `used / total GB`（由 `ramTotal`/`storageTotal` 与百分比相乘算出，非独立传入）；Network 显示速率与连接状态；Battery 显示百分比与充电状态。全部显式传值时，没有任何一项会去读硬件。',
        en: 'Five metrics, each its own block: CPU, RAM, and Storage all pair a percentage with a segment bar, and RAM/Storage add a “used / total GB” line (computed by multiplying the total by the percentage, not passed independently); Network shows a speed and a connection state; Battery shows a percentage and a charging state. With every value passed explicitly, nothing here touches real hardware.',
      },
      code: defaultSource,
      render: () => <SystemMonitorDefault />,
    },
    {
      id: 'warning',
      title: { zh: '告警与临界值', en: 'Warning & critical thresholds' },
      description: {
        zh: 'CPU / RAM / Storage 各自独立判档：≥90% 是 `critical`，≥75% 是 `warning`，否则 `none`——三者互不关联，各按自己的百分比走。Network 断开时状态变 `disconnected` 且分段条清空；Battery 走另一套判断：正在充电永远是 `charging`，否则 ≤10% 为 `critical`、≤20% 为 `low`。',
        en: 'CPU, RAM, and Storage each threshold independently: `critical` at 90% or above, `warning` at 75%, otherwise `none` — the three never influence each other, each following only its own percentage. Network flips to `disconnected` and clears its bar when unplugged; Battery uses a different rule entirely — always `charging` while plugged in, otherwise `critical` at 10% or below and `low` at 20%.',
      },
      code: warningSource,
      render: () => <SystemMonitorWarning />,
    },
  ],
  api: [
    {
      name: 'SystemMonitor',
      description: {
        zh: '渲染为 `<div>`，透传除 `children` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div>` and forwards every native div prop except `children` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'cpuPercent',
          type: 'number',
          description: {
            zh: 'CPU 占用百分比。不传时组件启动一个演示计时器，在 35–60% 之间随机跳动——这不是真实的 CPU 读数，纯粹是视觉演示。',
            en: 'CPU usage as a percentage. Left unset, the component runs a demo timer that jitters randomly between 35–60% — this is not a real CPU reading, purely a visual demo.',
          },
        },
        {
          name: 'ramPercent',
          type: 'number',
          description: {
            zh: '内存占用百分比。不传同样启用随机演示（45–75%）。',
            en: 'RAM usage as a percentage. Also falls back to a random demo (45–75%) when unset.',
          },
        },
        {
          name: 'ramTotal',
          type: 'number',
          default: '8',
          description: {
            zh: '内存总量（GB），只用于和 `ramPercent` 相乘算出 “used / total” 那行文字，不是独立的已用量输入。',
            en: 'Total RAM in GB, used only to multiply against `ramPercent` for the “used / total” line — it is not an independent used-amount input.',
          },
        },
        {
          name: 'storagePercent',
          type: 'number',
          description: {
            zh: '存储占用百分比。不传则随机演示（60–80%）。',
            en: 'Storage usage as a percentage. Falls back to a random demo (60–80%) when unset.',
          },
        },
        {
          name: 'storageTotal',
          type: 'number',
          default: '256',
          description: {
            zh: '存储总量（GB），同样只用于换算展示文字。',
            en: 'Total storage in GB, again used only to compute the display text.',
          },
        },
        {
          name: 'netConnected',
          type: 'boolean',
          description: {
            zh: '网络是否已连接。不传则随机演示（约 90% 概率为已连接）。',
            en: 'Whether the network is connected. Falls back to a random demo (roughly 90% connected) when unset.',
          },
        },
        {
          name: 'netSpeed',
          type: 'number',
          description: {
            zh: '网速（MB/s）。分段条按 `netSpeed / 50` 换算填充比例，也就是把 50 MB/s 视为「满格」。不传则随机演示（5–25）。',
            en: 'Network speed in MB/s. The bar fills by `netSpeed / 50`, treating 50 MB/s as “full”. Falls back to a random demo (5–25) when unset.',
          },
        },
        {
          name: 'batteryPercent',
          type: 'number',
          description: {
            zh: '电量百分比。和 `batteryCharging` 只要有一个未传，组件就会尝试 `navigator.getBattery()` 读真实电量，读不到则回退到 85%。',
            en: 'Battery level as a percentage. If either this or `batteryCharging` is left unset, the component tries `navigator.getBattery()` and falls back to 85% on failure.',
          },
        },
        {
          name: 'batteryCharging',
          type: 'boolean',
          description: {
            zh: '是否正在充电。读不到真实电池 API 时随机演示。',
            en: 'Whether it is charging. Randomised for the demo when the real Battery API is unavailable.',
          },
        },
        {
          name: 'totalSegments',
          type: 'number',
          default: '12',
          description: {
            zh: '每一条分段条的格子总数，五个指标共用同一个值。',
            en: 'How many segments each bar has; all five metrics share the same count.',
          },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '2000',
          description: {
            zh: '演示随机数据与轮询电池 API 的间隔（毫秒）。任何一项显式传值都不会关掉其余未传项的这套定时器。',
            en: 'How often, in milliseconds, the demo random data updates and the Battery API is polled. Passing one metric explicitly does not stop this timer for the others that are still unset.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'compact' | 'detailed'`,
          default: `'default'`,
          description: {
            zh: '保留自 v1 的 API 形状，会正常出现在 `data-variant` 上，但目前没有任何对应的 CSS——三个取值渲染结果完全一样。',
            en: 'Kept for API-shape compatibility with v1 and does appear on `data-variant`, but currently has no matching CSS — all three values render identically.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '同样是保留的 v1 形状，目前没有对应样式，三档渲染结果相同。',
            en: 'Also a kept-for-compatibility v1 shape with no matching styles yet — all three sizes render the same.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes, merged via `tailwind-merge`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '五个分段条目前都是纯视觉的 `<div>` 序列，没有 `role="meter"` 或对应的 `aria-valuenow`。每项的百分比、用量、连接/充电状态都有独立的文字节点，读屏能拿到数值，但拿不到「这是一个仪表」的语义——如果这对你很重要，需要自己在外层补 `role="meter"` 一类的属性。',
      en: 'All five bars are currently a plain visual sequence of `<div>`s, with no `role="meter"` or matching `aria-valuenow`. Each metric’s percentage, usage, and connection/charging state has its own text node, so the numbers reach a screen reader, but the “this is a gauge” semantics do not — add `role="meter"` (or similar) yourself at the call site if that matters.',
    },
    {
      zh: '告警/临界状态只用颜色区分（`data-state`），标签文字（CPU / RAM / …）本身不会因为进入 `warning`/`critical` 而改变措辞。色觉障碍用户看不到这层信息，重要场景建议在数值旁边补一个文字或图标提示。',
      en: 'Warning/critical states are conveyed by colour alone (`data-state`); the label text (CPU / RAM / …) never changes wording when entering `warning` or `critical`. Colour-blind users miss that signal entirely — add a text or icon cue next to the value for anything that matters.',
    },
    {
      zh: '未显式传值的指标每 `updateInterval` 就随机跳一次，且没有 `aria-live`——这本就是演示态，不建议在生产界面里让用户长期停留在「全靠随机数」的 SystemMonitor 上。',
      en: 'Any metric left unset jitters randomly on every `updateInterval`, with no `aria-live` — this is meant as a demo state, and production surfaces should not leave users looking at a SystemMonitor that is entirely random for long.',
    },
  ],
}
