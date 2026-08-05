import { Toggle } from 'nothing-ui/toggle'
import type { ComponentDoc } from '../types'

import ToggleBasic from '../../examples/toggle/basic'
import ToggleVariants from '../../examples/toggle/variants'
import ToggleSizes from '../../examples/toggle/sizes'
import ToggleGroupExample from '../../examples/toggle/group'
import ToggleControlled from '../../examples/toggle/controlled'

import basicSource from '../../examples/toggle/basic.tsx?raw'
import variantsSource from '../../examples/toggle/variants.tsx?raw'
import sizesSource from '../../examples/toggle/sizes.tsx?raw'
import groupSource from '../../examples/toggle/group.tsx?raw'
import controlledSource from '../../examples/toggle/controlled.tsx?raw'

export const toggleDoc: ComponentDoc = {
  slug: 'toggle',
  name: 'Toggle',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '可保持按下状态的按钮，适合工具栏开关。',
    en: 'A button that stays pressed — for toolbar-style on/off controls.',
  },
  preview: () => <Toggle defaultPressed>Bold</Toggle>,
  importStatement: `import { Toggle, ToggleGroup } from 'nothing-ui/toggle'`,
  usageSnippet: `<Toggle defaultPressed>Bold</Toggle>`,
  composition: {
    zh: '`Toggle` 是一个带 `aria-pressed` 的原生 `<button>`。`ToggleGroup` 通过 context 把 `variant` 与 `size` 下发给所有子项（子项自己传的会被覆盖），并接管选中状态——所以组内的 `Toggle` 必须有 `value`，`pressed` 那一套此时不再生效。',
    en: '`Toggle` is a native `<button>` carrying `aria-pressed`. `ToggleGroup` pushes `variant` and `size` down through context (overriding whatever a child sets) and takes over the pressed state — so a `Toggle` inside a group must have a `value`, and its own `pressed` props stop applying.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '和 Switch 的分工是：Switch 表达「设置的开关」，Toggle 表达「工具的当前模式」，后者通常成排出现在工具栏里。纯图标的 Toggle 没有可读文本，必须补 `aria-label`。',
        en: 'The split against Switch: a Switch is a setting being turned on, a Toggle is the current mode of a tool — which is why toggles usually appear in a row in a toolbar. An icon-only Toggle has no text content, so it needs an `aria-label`.',
      },
      code: basicSource,
      render: () => <ToggleBasic />,
    },
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '三档的按下态各有侧重：`soft` 加深背景并加粗字重，`outline` 换成红边加淡红底，`ghost` 平时完全透明、只在按下时垫一层。字重变化是刻意的——它让「按下」不只靠颜色表达。',
        en: 'Each variant expresses pressed differently: `soft` deepens the background and bolds the label, `outline` switches to a red border over a tinted background, and `ghost` is fully transparent until pressed. The weight change is deliberate — it keeps “pressed” from being carried by colour alone.',
      },
      code: variantsSource,
      render: () => <ToggleVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '高度是 36 / 44 / 52px，和 Button 完全一致——两者经常并排出现在工具栏里，尺寸对不上会立刻看出来。',
        en: 'Heights are 36 / 44 / 52px, exactly matching Button. The two often sit side by side in a toolbar, and a mismatch shows immediately.',
      },
      code: sizesSource,
      render: () => <ToggleSizes />,
    },
    {
      id: 'group',
      title: { zh: '成组', en: 'Grouping' },
      description: {
        zh: '`ToggleGroup` 是多选的：`value` 是数组，点击在数组里增删，不存在「至少选一个」的约束。所以它适合「粗体 / 斜体 / 下划线」这种可以同时开的开关；如果你要的是互斥的单选，请用 RadioGroup 或 SegmentedControl。`variant="outline"` 时子项会连成一排——圆角只留在首尾，相邻边框用负外边距合并成一条。',
        en: '`ToggleGroup` is multi-select: `value` is an array and clicking adds or removes an entry, with no “at least one” constraint. That suits bold / italic / underline, which can all be on at once; if you need mutually exclusive options, reach for RadioGroup or SegmentedControl. Under `variant="outline"` the children fuse into one strip — corners survive only at the ends, and adjacent borders collapse into a single line via a negative margin.',
      },
      code: groupSource,
      render: () => <ToggleGroupExample />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '单个 Toggle 受控用 `pressed` + `onPressedChange`，成组受控用组上的 `value` + `onValueChange`。两套不要混：组存在时子项的 `pressed` 会被忽略，改了也不会有反应。',
        en: 'A lone Toggle is controlled with `pressed` and `onPressedChange`; a group is controlled with `value` and `onValueChange` on the group. Do not mix them — inside a group a child’s `pressed` is ignored, and changing it does nothing.',
      },
      code: controlledSource,
      render: () => <ToggleControlled />,
    },
  ],
  api: [
    {
      name: 'Toggle',
      description: {
        zh: '除 `value` / `onChange` 外的原生 `<button>` 属性（`onClick`、`aria-label`、`ref` …）都透传。`type` 固定为 `button`，不会误触发表单提交。',
        en: 'Every native `<button>` prop except `value` and `onChange` (`onClick`, `aria-label`, `ref`, …) is forwarded. `type` is pinned to `button`, so it never submits a form by accident.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'ghost' | 'default'`,
          default: `'soft'`,
          description: {
            zh: '视觉样式。`default` 是 `soft` 的 v1 别名。在组内会被组的 `variant` 覆盖。',
            en: 'Visual style. `default` is a v1 alias for `soft`. Inside a group, the group’s `variant` wins.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '高度：36 / 44 / 52px。在组内会被组的 `size` 覆盖。',
            en: 'Height: 36 / 44 / 52px. Inside a group, the group’s `size` wins.',
          },
        },
        {
          name: 'pressed',
          type: 'boolean',
          description: {
            zh: '受控按下态。组内无效。',
            en: 'Controlled pressed state. Ignored inside a group.',
          },
        },
        {
          name: 'defaultPressed',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '非受控初始按下态。',
            en: 'Initial pressed state when uncontrolled.',
          },
        },
        {
          name: 'onPressedChange',
          type: '(pressed: boolean) => void',
          description: {
            zh: '按下态变化回调。组内不触发，改用组的 `onValueChange`。',
            en: 'Fires when the pressed state changes. Not called inside a group — use the group’s `onValueChange`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '在 `ToggleGroup` 中的标识。组内必填，否则这一项永远不会被选中。',
            en: 'This item’s identity inside a `ToggleGroup`. Required there, or the item can never be selected.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用交互，降到 40% 不透明度。',
            en: 'Block interaction and drop to 40% opacity.',
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
    {
      name: 'ToggleGroup',
      description: {
        zh: '渲染为 `role="group"` 的 `<div>`，其余原生 `<div>` 属性照常透传。多选语义，没有单选模式。',
        en: 'Renders a `<div>` with `role="group"`; other native `<div>` props pass through. Multi-select only — there is no single-select mode.',
      },
      props: [
        {
          name: 'value',
          type: 'string[]',
          description: {
            zh: '受控的已按下项列表。',
            en: 'The controlled list of pressed items.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          default: '[]',
          description: { zh: '非受控初始列表。', en: 'Initial list when uncontrolled.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: { zh: '列表变化回调。', en: 'Fires when the list changes.' },
        },
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'ghost' | 'default'`,
          default: `'soft'`,
          description: {
            zh: '下发给所有子项，并决定容器间距。`outline` 会把子项连成一排。',
            en: 'Pushed down to every child and also sets the container spacing. `outline` fuses the children into one strip.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '下发给所有子项。', en: 'Pushed down to every child.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加到容器的类名。', en: 'Extra classes on the container.' },
        },
      ],
    },
    {
      name: 'toggleVariants',
      description: {
        zh: '按钮类名的 CVA 函数；容器的是 `toggleGroupVariants`。按下态选择器是 `data-pressed`。',
        en: 'The CVA function behind the button classes; the container’s is `toggleGroupVariants`. The pressed selector is `data-pressed`.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'ghost'`,
          default: `'soft'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'ToggleSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染为原生 `<button type="button">`，天然在 tab 序列内，Enter 与 Space 都能激活。',
      en: 'It renders a native `<button type="button">`, so it is in the tab order and responds to both Enter and Space.',
    },
    {
      zh: '按下状态通过 `aria-pressed` 播报，这也是它和普通按钮的区别——读屏软件会念出「已按下」而不是只念标签。',
      en: 'The pressed state is announced via `aria-pressed`, which is exactly what separates it from a plain button: a screen reader says “pressed”, not just the label.',
    },
    {
      zh: '按下态同时改变字重（`pressed:font-bold`），不是只换颜色，色觉障碍用户也能分辨。',
      en: 'Pressed also changes the font weight (`pressed:font-bold`) rather than only the colour, so it stays legible with colour-vision differences.',
    },
    {
      zh: '纯图标的 Toggle 必须自己补 `aria-label`；成组时建议给 `ToggleGroup` 也加一个 `aria-label` 说明这组是干什么的。',
      en: 'Icon-only toggles need their own `aria-label`, and it is worth giving the `ToggleGroup` one too so the set has a name.',
    },
    {
      zh: '组内每个 Toggle 都是独立的 tab 停靠点。这是多选组的正确行为——不像单选组那样只占一站，因为用户需要逐个开关。',
      en: 'Every Toggle in a group is its own tab stop. That is correct for a multi-select group: unlike a radio group it is not a single stop, because each item is switched independently.',
    },
    {
      zh: '按下时的缩放反馈带 `motion-reduce:active:scale-100`，减弱动效下不缩放。',
      en: 'The press-down scale has a `motion-reduce:active:scale-100` fallback, so it stays still under reduced motion.',
    },
  ],
}
