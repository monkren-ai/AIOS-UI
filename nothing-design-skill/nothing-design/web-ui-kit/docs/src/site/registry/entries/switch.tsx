import { Switch } from 'aios-ui-kit/switch'
import type { ComponentDoc } from '../types'

import SwitchBasic from '../../examples/switch/basic'
import SwitchSizes from '../../examples/switch/sizes'
import SwitchControlled from '../../examples/switch/controlled'
import SwitchDisabled from '../../examples/switch/disabled'

import basicSource from '../../examples/switch/basic.tsx?raw'
import sizesSource from '../../examples/switch/sizes.tsx?raw'
import controlledSource from '../../examples/switch/controlled.tsx?raw'
import disabledSource from '../../examples/switch/disabled.tsx?raw'

export const switchDoc: ComponentDoc = {
  slug: 'switch',
  name: 'Switch',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'Switch',
  description: {
    zh: '开关，用于立即生效的二元设置。',
    en: 'A toggle for binary settings that take effect immediately.',
  },
  preview: () => <Switch label="Wi-Fi" />,
  importStatement: `import { Switch } from 'aios-ui-kit/switch'`,
  usageSnippet: `<Switch label="Wi-Fi" />`,
  composition: {
    zh: '外层是 `<label>`，里面是 Base UI 的 `Switch.Root` 与 `Switch.Thumb`，加上可选的文字。滑块位移用逻辑属性 `inset-inline-start`，所以 RTL 下自动镜像，不需要额外样式。',
    en: 'A `<label>` wrapping Base UI’s `Switch.Root` and `Switch.Thumb`, plus optional text. The thumb travels along `inset-inline-start`, a logical property, so RTL mirrors it for free.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '开关表达的是「立刻生效」的设置，所以旁边不该再有保存按钮；如果改动需要确认，那应该是 Checkbox 而不是 Switch。非受控时用 `defaultChecked` 指定初始状态。',
        en: 'A switch means the setting takes effect immediately, so there should be no Save button next to it; if the change needs confirming, that is a Checkbox, not a Switch. Uncontrolled, `defaultChecked` sets the starting state.',
      },
      code: basicSource,
      render: () => <SwitchBasic />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '轨道分别是 36×20 / 44×24 / 56×32px，外层行高仍然是 36 / 44 / 52px，保证 `sm` 在触屏上也够点。三个开关共用一份 state，可以直接对比同一状态下的视觉差异。',
        en: 'The tracks are 36×20 / 44×24 / 56×32px while the row stays at 36 / 44 / 52px, which keeps `sm` reachable on touch. The three switches here share one piece of state so you can compare them in the same position.',
      },
      code: sizesSource,
      render: () => <SwitchSizes />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '受控属性叫 `checked`，回调叫 `onChange` 并直接给你 `boolean`——注意回调名不是 `onCheckedChange`，参数也不是事件对象。',
        en: 'The controlled prop is `checked` and the callback is `onChange`, which hands you a plain `boolean` — note the callback is not named `onCheckedChange`, and it receives no event object.',
      },
      code: controlledSource,
      render: () => <SwitchControlled />,
    },
    {
      id: 'disabled',
      title: { zh: '禁用', en: 'Disabled' },
      description: {
        zh: '`disabled` 把整行降到 40% 不透明度并挡掉交互，但状态照样看得见——这正是重点：告诉用户「这项现在是开着的，只是你改不了」，比直接把开关藏起来诚实得多。',
        en: '`disabled` drops the row to 40% opacity and blocks interaction, but the state stays visible — which is the point. Telling someone “this is on, you just cannot change it” is far more honest than hiding the control.',
      },
      code: disabledSource,
      render: () => <SwitchDisabled />,
    },
  ],
  api: [
    {
      name: 'Switch',
      description: {
        zh: '除 `onChange` 外的原生 `<label>` 属性都透传到最外层 `<label>`。',
        en: 'Every native `<label>` prop except `onChange` is forwarded to the outer `<label>`.',
      },
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: {
            zh: '受控开关状态。不传则组件维护内部状态。',
            en: 'Controlled state. Leave it out and the component keeps its own.',
          },
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '非受控时的初始状态。',
            en: 'The starting state when uncontrolled.',
          },
        },
        {
          name: 'onChange',
          type: '(checked: boolean) => void',
          description: {
            zh: '状态变化回调。参数是新的开关状态，不是事件。',
            en: 'Called with the new state — not with an event.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '轨道右侧的文字，打开时提亮到 `text-foreground`。',
            en: 'Text beside the track; brightens to `text-foreground` when on.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '轨道与行高阶梯：行高 36 / 44 / 52px。',
            en: 'Track and row scale; rows are 36 / 44 / 52px.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用交互，整行降到 40% 不透明度。',
            en: 'Block interaction and drop the row to 40% opacity.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层 `<label>` 的类名。',
            en: 'Extra classes on the outer `<label>`.',
          },
        },
      ],
    },
    {
      name: 'switchVariants',
      description: {
        zh: '最外层行的 CVA 函数。轨道、滑块、文字分别是 `switchTrackVariants` / `switchThumbVariants` / `switchLabelVariants`。',
        en: 'The CVA function for the outer row. The track, thumb, and text map to `switchTrackVariants`, `switchThumbVariants`, and `switchLabelVariants`.',
      },
      props: [
        {
          name: 'size',
          type: 'SwitchSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'checked',
          type: 'boolean',
          default: 'false',
          description: { zh: '打开态。', en: 'The on state.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底层是 Base UI 的 `Switch.Root`，`role="switch"` 与 `aria-checked` 由它维护，Space 与 Enter 都能切换。',
      en: 'Built on Base UI’s `Switch.Root`, which maintains `role="switch"` and `aria-checked`; both Space and Enter toggle it.',
    },
    {
      zh: '整个组件包在 `<label>` 里，点文字与点轨道等效。',
      en: 'The whole component sits inside a `<label>`, so clicking the text is the same as clicking the track.',
    },
    {
      zh: '不传 `label` 就没有可访问名称——读屏软件只会念出「开关，已开启」，必须自己补 `aria-label`。',
      en: 'Without `label` there is no accessible name: a screen reader would only say “switch, on”. Supply an `aria-label`.',
    },
    {
      zh: '开关状态不只靠颜色区分，滑块位置本身就是形状信号，色觉障碍用户也分得清。',
      en: 'State is not carried by colour alone — the thumb’s position is a shape cue, which keeps it legible for colour-vision differences.',
    },
    {
      zh: '滑块位移与轨道变色都带 `motion-reduce:transition-none`，减弱动效下直接跳到位。',
      en: 'The thumb travel and track colour change both carry `motion-reduce:transition-none`, so under reduced motion the switch simply jumps.',
    },
  ],
}
