import { Battery } from 'aios-ui-kit/battery'
import type { ComponentDoc } from '../types'

import BatteryVariants from '../../examples/battery/variants'
import BatteryDevices from '../../examples/battery/devices'

import variantsSource from '../../examples/battery/variants.tsx?raw'
import devicesSource from '../../examples/battery/devices.tsx?raw'

export const batteryDoc: ComponentDoc = {
  slug: 'battery',
  name: 'Battery',
  category: 'time-system',
  status: 'stable',
  description: {
    zh: '电量读数，分段条或圆环两种画法，可附外设电量列表。',
    en: 'A battery readout as a segment bar or a ring, with an optional list of peripherals.',
  },
  preview: () => <Battery percent={68} isCharging={false} className="w-full max-w-xs" />,
  importStatement: `import { Battery } from 'aios-ui-kit/battery'`,
  usageSnippet: `<Battery percent={68} isCharging={false} />`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`segmented`（默认）画一排色块，`ring` 画一个进度圆环，颜色都会跟着电量档位走：≤10% 是 `critical`，≤20% 是 `low`，≤50% 是 `medium`，充电中一律按 `high` 处理。这两个示例都显式传了 `percent` 和 `isCharging`——不传的话组件会尝试调用浏览器的 `navigator.getBattery()` 读真实电量,大多数浏览器已经不支持这个 API,会静默回退到 75% 的演示值。',
        en: '`segmented` (the default) draws a row of blocks, `ring` draws a progress ring; both colour themselves by battery level — `critical` at 10% or below, `low` at 20%, `medium` at 50%, and always `high` while charging. Both examples pass `percent` and `isCharging` explicitly: leave them out and the component calls the browser’s `navigator.getBattery()`, which most browsers no longer support, silently falling back to a 75% demo value.',
      },
      code: variantsSource,
      render: () => <BatteryVariants />,
    },
    {
      id: 'devices',
      title: { zh: '外设列表', en: 'Device list' },
      description: {
        zh: '`widgetMode="card"` 切到桌面小组件版式：大号百分比 + 状态字样 + 一条更细的进度条。传 `devices` 会在下方追加一份外设电量清单，每种 `type`（mouse / keyboard / earbuds / phone / watch）配一个对应图标；给了 `onDeviceClick` 后每一行会变成可点击、可键盘操作的按钮。',
        en: '`widgetMode="card"` switches to the desktop-widget layout: a large percentage, a status word, and a slimmer progress bar. Passing `devices` appends a peripheral battery list below it, one icon per `type` (mouse / keyboard / earbuds / phone / watch); adding `onDeviceClick` turns each row into a clickable, keyboard-operable button.',
      },
      code: devicesSource,
      render: () => <BatteryDevices />,
    },
  ],
  api: [
    {
      name: 'Battery',
      description: {
        zh: '渲染为 `<div role="meter">`，透传除 `children`、`onClick` 外的所有原生 div 属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<div role="meter">` and forwards every native div prop except `children` and `onClick` (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'percent',
          type: 'number',
          description: {
            zh: '电量百分比（0–100）。不传时组件会尝试读浏览器电池 API，失败则回退到 75。',
            en: 'Battery level as 0–100. If omitted, the component tries the browser Battery API and falls back to 75 on failure.',
          },
        },
        {
          name: 'isCharging',
          type: 'boolean',
          description: {
            zh: '是否正在充电。同样在缺省时走浏览器电池 API，读不到则随机演示。',
            en: 'Whether it is charging. Also falls back to the browser Battery API when omitted, and to a random demo value if that fails.',
          },
        },
        {
          name: 'variant',
          type: `'segmented' | 'ring'`,
          default: `'segmented'`,
          description: {
            zh: '独立使用（非 `widgetMode`）时的画法。',
            en: 'The drawing style when used standalone (outside `widgetMode`).',
          },
        },
        {
          name: 'widgetMode',
          type: `'none' | 'card' | 'ring'`,
          default: `'none'`,
          description: {
            zh: '切到桌面小组件版式：`card` 是分段条 + 大号百分比，`ring` 是圆环 + 百分比，两者都会在有 `devices` 时渲染外设列表。设为 `none` 时改用 `variant` 决定画法。',
            en: 'Switches to a desktop-widget layout: `card` is a segment bar with a large percentage, `ring` is a progress ring with a percentage; both render the device list when `devices` is set. Leave it at `none` and `variant` decides the drawing style instead.',
          },
        },
        {
          name: 'totalSegments',
          type: 'number',
          default: '10',
          description: {
            zh: '`segmented` 画法下的色块总数。',
            en: 'How many blocks the `segmented` style draws.',
          },
        },
        {
          name: 'devices',
          type: 'BatteryDevice[]',
          description: {
            zh: '外设电量列表。每项形如 `{ name, type, percent, isCharging? }`，`type` 取值 `mouse | keyboard | earbuds | phone | watch`。',
            en: 'A list of peripheral batteries. Each entry looks like `{ name, type, percent, isCharging? }`, with `type` one of `mouse | keyboard | earbuds | phone | watch`.',
          },
        },
        {
          name: 'onDeviceClick',
          type: '(device: BatteryDevice) => void',
          description: {
            zh: '点击（或 Enter/空格激活）某一行外设时触发。传了它，该行才会带 `role="button"` 与 `tabIndex`。',
            en: 'Fires when a device row is clicked or activated with Enter/Space. Only rows get `role="button"` and a `tabIndex` when this is set.',
          },
        },
        {
          name: 'updateInterval',
          type: 'number',
          default: '5000',
          description: {
            zh: '轮询浏览器电池 API 的间隔（毫秒）。仅在 `percent`/`isCharging` 都未传时生效。',
            en: 'How often, in milliseconds, the browser Battery API is polled. Only takes effect when neither `percent` nor `isCharging` is passed.',
          },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'dark'`,
          description: { zh: '组件自身的配色。', en: 'This widget’s own palette.' },
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
      zh: '独立模式（非 `widgetMode`）下根节点是 `role="meter"`，带 `aria-valuenow`/`aria-valuemin`/`aria-valuemax` 与一句完整的 `aria-label`（例如「Battery at 68%, discharging」），读屏一次就能拿到完整读数。`widgetMode="card"` 与 `"ring"` 也保留了同一组 `meter` 属性。',
      en: 'In the standalone modes the root is `role="meter"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` and a full `aria-label` (e.g. “Battery at 68%, discharging”), so a screen reader gets the complete reading in one pass. `widgetMode="card"` and `"ring"` keep the same set of meter attributes.',
    },
    {
      zh: '分段条与圆环的 SVG 都带 `aria-hidden="true"`——它们是电量的视觉重复，真正的数值由 `meter` 属性和可见文字（百分比、Charging/Discharging）承担。',
      en: 'Both the segment bar and the ring SVG are `aria-hidden="true"` — they visually repeat the level, while the actual value is carried by the meter attributes and the visible text (the percentage, Charging/Discharging).',
    },
    {
      zh: '外设列表里的充电小图标只是视觉提示，真正的状态用 `data-state`（charging / low / normal）与旁边的百分比数字表达，不单靠图标颜色。',
      en: 'The small charging glyph in the device list is a visual hint only; the actual status is carried by `data-state` (charging / low / normal) and the adjoining percentage text, not by icon colour alone.',
    },
    {
      zh: '给了 `onDeviceClick` 的行会拿到 `role="button"`、`tabIndex={0}` 以及 Enter/空格的键盘处理，可以直接用键盘操作，不需要额外接线。',
      en: 'Rows with `onDeviceClick` get `role="button"`, `tabIndex={0}`, and Enter/Space handling wired in — they are keyboard-operable out of the box, no extra plumbing required.',
    },
  ],
}
