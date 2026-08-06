import { Slider } from 'aios-ui-kit/slider'
import type { ComponentDoc } from '../types'

import SliderBasic from '../../examples/slider/basic'
import SliderHeader from '../../examples/slider/header'
import SliderSizes from '../../examples/slider/sizes'
import SliderVariants from '../../examples/slider/variants'
import SliderControlled from '../../examples/slider/controlled'

import basicSource from '../../examples/slider/basic.tsx?raw'
import headerSource from '../../examples/slider/header.tsx?raw'
import sizesSource from '../../examples/slider/sizes.tsx?raw'
import variantsSource from '../../examples/slider/variants.tsx?raw'
import controlledSource from '../../examples/slider/controlled.tsx?raw'

export const sliderDoc: ComponentDoc = {
  slug: 'slider',
  name: 'Slider',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'Slider',
  description: {
    zh: '在连续区间内取值，支持单值与区间。',
    en: 'Pick a value from a continuous range, single or as a range.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Slider defaultValue={60} />
    </div>
  ),
  importStatement: `import { Slider } from 'aios-ui-kit/slider'`,
  usageSnippet: `<Slider label="Brightness" showValue defaultValue={72} />`,
  composition: {
    zh: '根节点是 Base UI 的 `Slider.Root`，下面依次是可选的头部（label + 当前值）、轨道容器、轨道、已完成进度和把手。当前封装只渲染一个 `Slider.Thumb`，所以是单值滑块；要做双端区间请直接组合 Base UI 的 primitive。',
    en: 'The root is Base UI’s `Slider.Root`, holding an optional header (label plus current value), the control, the track, the filled indicator, and the thumb. This wrapper renders a single `Slider.Thumb`, so it is a single-value slider — for a two-handle range, compose the Base UI primitives directly.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '不传任何区间参数时是 0–100、步长 1。轨道本身只有 4px 高，但外面套着 44px 的触达容器，所以手指点在轨道上下方一点也能拖得动。',
        en: 'With no range props it is 0–100 in steps of 1. The track itself is only 4px tall, but it sits inside a 44px touch area, so a finger landing slightly above or below the line still grabs it.',
      },
      code: basicSource,
      render: () => <SliderBasic />,
    },
    {
      id: 'header',
      title: { zh: '标签与当前值', en: 'Label and value' },
      description: {
        zh: '`label` 与 `showValue` 只要有一个为真就渲染头部一行，label 在左、数值在右。`label` 走的是 Base UI 的 `Slider.Label`，会自动和滑块建立关联，比你自己在旁边放一段文字要正确。步长较大时（例如 1–5 的五档）尤其建议打开 `showValue`：没有刻度线，用户只能靠数字确认自己拖到了哪一档。',
        en: 'The header row appears as soon as either `label` or `showValue` is set — label on the left, value on the right. `label` renders through Base UI’s `Slider.Label`, which associates it with the slider properly, unlike a stray paragraph next to it. Turn `showValue` on especially for coarse steps (say five stops from 1 to 5): there are no tick marks, so the number is the only confirmation of which stop you landed on.',
      },
      code: headerSource,
      render: () => <SliderHeader />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 同时调轨道粗细（2 / 4 / 6px）、把手直径（12 / 16 / 20px）和触达高度（36 / 44 / 52px）。触屏上不要用 `sm`：把手只有 12px，拖起来会一直脱手。',
        en: '`size` scales the track thickness (2 / 4 / 6px), the thumb diameter (12 / 16 / 20px), and the touch height (36 / 44 / 52px) together. Avoid `sm` on touch: a 12px thumb slips out from under a finger constantly.',
      },
      code: sizesSource,
      render: () => <SliderSizes />,
    },
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`primary` 用 Nothing 红做已完成进度，`soft` 退回中性灰。一屏里有多个滑块时，把真正重要的那个留给 `primary`，其余用 `soft`——全部标红就等于没有重点。',
        en: '`primary` fills the completed portion with the Nothing red; `soft` falls back to neutral grey. When a screen has several sliders, keep `primary` for the one that matters and set the rest to `soft` — if everything is red, nothing is.',
      },
      code: variantsSource,
      render: () => <SliderVariants />,
    },
    {
      id: 'controlled',
      title: { zh: '受控与步长', en: 'Controlled and stepping' },
      description: {
        zh: '`onValueChange` 直接给数字，不是数组也不是事件。`step` 除了限制拖拽落点，也决定方向键每次走多远——步长 10 意味着键盘用户十下就能从 0 拉到 100，这对纯键盘操作是很实在的差别。',
        en: '`onValueChange` hands you a number — not an array, not an event. `step` does more than quantise dragging: it also sets how far each arrow key press moves, so a step of 10 means a keyboard user crosses 0 to 100 in ten presses. That difference is very real if the keyboard is all you have.',
      },
      code: controlledSource,
      render: () => <SliderControlled />,
    },
  ],
  api: [
    {
      name: 'Slider',
      description: {
        zh: '除 `value` / `defaultValue` / `onChange` 外的原生 `<div>` 属性（`id`、`aria-*`、`ref` …）透传到 Base UI 的 `Slider.Root`。',
        en: 'Native `<div>` props other than `value`, `defaultValue`, and `onChange` (`id`, `aria-*`, `ref`, …) are forwarded to Base UI’s `Slider.Root`.',
      },
      props: [
        {
          name: 'value',
          type: 'number',
          description: { zh: '受控值。', en: 'Controlled value.' },
        },
        {
          name: 'defaultValue',
          type: 'number',
          description: { zh: '非受控初始值。', en: 'Initial value when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: number) => void',
          description: { zh: '值变化回调。', en: 'Fires as the value changes.' },
        },
        {
          name: 'min',
          type: 'number',
          default: '0',
          description: { zh: '区间下限。', en: 'Lower bound.' },
        },
        {
          name: 'max',
          type: 'number',
          default: '100',
          description: { zh: '区间上限。', en: 'Upper bound.' },
        },
        {
          name: 'step',
          type: 'number',
          default: '1',
          description: {
            zh: '步长，同时决定方向键的移动幅度。',
            en: 'Step size; also the distance each arrow key press moves.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '字段标签，渲染为 Base UI 的 `Slider.Label`。',
            en: 'Field label, rendered as Base UI’s `Slider.Label`.',
          },
        },
        {
          name: 'showValue',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '在头部右侧显示当前值。',
            en: 'Show the current value on the right of the header.',
          },
        },
        {
          name: 'variant',
          type: `'primary' | 'soft' | 'default' | 'minimal'`,
          default: `'primary'`,
          description: {
            zh: '进度条配色。`default` / `minimal` 是 v1 别名，分别映射到 `primary` / `soft`。',
            en: 'Fill colour. `default` and `minimal` are v1 aliases mapping to `primary` and `soft`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '轨道粗细、把手直径与触达高度。',
            en: 'Track thickness, thumb diameter, and touch height.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用拖拽与键盘操作，整体降到 40% 不透明度。',
            en: 'Block dragging and keyboard input, and drop the whole slider to 40% opacity.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到根节点的类名。', en: 'Extra classes on the root.' },
        },
      ],
    },
    {
      name: 'sliderVariants',
      description: {
        zh: '根节点的 CVA 函数。子部件读根上的 `data-variant` / `data-disabled` 取色，所以单独用某个子函数时记得把这些属性也带上。',
        en: 'The CVA function for the root. The parts pick their colours off the root’s `data-variant` and `data-disabled`, so if you use a part function on its own, carry those attributes over too.',
      },
      props: [
        {
          name: 'variant',
          type: `'primary' | 'soft'`,
          default: `'primary'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'SliderSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 Slider，`role="slider"` 与 `aria-valuemin` / `aria-valuemax` / `aria-valuenow` 全部由它维护。',
      en: 'Built on Base UI’s Slider, which maintains `role="slider"` along with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.',
    },
    {
      zh: '把手在 tab 序列内，方向键按 `step` 增减，Home / End 直接跳到区间两端。',
      en: 'The thumb is in the tab order; arrow keys move by `step`, and Home / End jump to the ends of the range.',
    },
    {
      zh: '`label` 走 `Slider.Label`，会自动成为滑块的可访问名称；不传的话请给根节点补 `aria-label`。',
      en: '`label` goes through `Slider.Label` and becomes the slider’s accessible name. Without it, put an `aria-label` on the root.',
    },
    {
      zh: '轨道很细，但 `Slider.Control` 撑满 36 / 44 / 52px 的高度，指针命中区域远大于视觉上的那条线。',
      en: 'The track is thin, but `Slider.Control` fills the full 36 / 44 / 52px height, so the pointer target is much larger than the visible line.',
    },
    {
      zh: '进度条的宽度过渡带 `motion-reduce:transition-none`，减弱动效下直接跳到目标位置。',
      en: 'The fill’s width transition carries `motion-reduce:transition-none`, so under reduced motion it snaps straight to the new position.',
    },
  ],
}
