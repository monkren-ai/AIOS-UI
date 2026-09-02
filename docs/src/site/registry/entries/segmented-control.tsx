import { SegmentedControl } from 'aios-ui-kit/segmented-control'
import type { ComponentDoc } from '../types'

import SegmentedControlBasic from '../../examples/segmented-control/basic'
import SegmentedControlControlled from '../../examples/segmented-control/controlled'
import SegmentedControlVariants from '../../examples/segmented-control/variants'
import SegmentedControlStates from '../../examples/segmented-control/states'

import basicSource from '../../examples/segmented-control/basic.tsx?raw'
import controlledSource from '../../examples/segmented-control/controlled.tsx?raw'
import variantsSource from '../../examples/segmented-control/variants.tsx?raw'
import statesSource from '../../examples/segmented-control/states.tsx?raw'

export const segmentedControlDoc: ComponentDoc = {
  slug: 'segmented-control',
  name: 'SegmentedControl',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '分段控件，在少量互斥选项间切换。',
    en: 'A segmented switch across a small set of mutually exclusive options.',
  },
  preview: () => <SegmentedControl segments={['Day', 'Week', 'Month']} />,
  importStatement: `import { SegmentedControl } from 'aios-ui-kit/segmented-control'`,
  usageSnippet: `<SegmentedControl segments={['Day', 'Week', 'Month']} onChange={setIndex} />`,
  composition: {
    zh: '没有子组件，也没有 `value`：选项是一个 `string[]`，选中态用**下标**表达。这让接入变得很短，代价是选项顺序一旦变化，存下来的下标就失去意义——需要持久化选中项时，请自己在下标和业务 id 之间做映射。结构上是一个 `role="radiogroup"` 的容器 + 每段一个 `<button role="radio">`，外加两块绝对定位的装饰层：选中态 slider 和 proximity hover 垫层。它是一组互斥的值选择器，不切换任何面板，所以走的是单选组语义而不是 tabs。整条控件是 `overflow-hidden` 的定位上下文，slider 靠 `inset-inline-start` 定位，所以 RTL 下自动镜像。',
    en: 'No sub-components and no `value`: the options are a `string[]` and the selection is an **index**. That keeps the call site short, at the cost of the index losing its meaning the moment the option order changes — so map between index and a stable id yourself if you persist the selection. Structurally it is a `role="radiogroup"` container plus one `<button role="radio">` per segment, over two decorative absolute layers: the selection slider and the proximity hover pad. It picks a value among mutually exclusive options and swaps no panels, so it carries radio-group semantics rather than tab semantics. The container is an `overflow-hidden` positioning context and the slider is placed with `inset-inline-start`, so RTL mirrors for free.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '不传 `activeIndex` 就是非受控，组件自己记住下标，初始选中第 0 段。分段数量建议控制在 2–4 个：slider 的宽度会随分段变化，段太多、文字长短又差得远时，滑动会显得很跳。超过四项请改用 Select 或 Tabs。',
        en: 'Leave `activeIndex` off and it runs uncontrolled, remembering the index itself and starting on segment 0. Keep it to two to four segments: the slider resizes to whichever segment is selected, and with many segments of wildly different label lengths that resize reads as a lurch. Past four options, reach for a Select or Tabs instead.',
      },
      code: basicSource,
      render: () => <SegmentedControlBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '传了 `activeIndex` 就完全受控：组件不再自己改下标，你必须在 `onChange` 里写回状态，否则点击看起来毫无反应。注意 `onChange` 在两种模式下都会触发，所以非受控时也能顺带做副作用（打点、同步 URL），不必为此改成受控。',
        en: 'Pass `activeIndex` and it is fully controlled: the component stops moving the selection, so you must write it back in `onChange` or clicks will appear to do nothing. `onChange` fires in both modes, though, so you can hang a side effect (analytics, a URL sync) off an uncontrolled control without converting it.',
      },
      code: controlledSource,
      render: () => <SegmentedControlControlled />,
    },
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`pill` 是全圆角，`rounded` 是 6px 圆角；`md` 是默认尺寸，`sm` 适合页面分组等紧凑导航。圆角与尺寸可独立组合：周围是圆角卡片和输入框就用 `rounded`，作为独立的浮动切换器时 `pill` 更利落。',
        en: '`pill` is fully rounded and `rounded` uses the 6px radius; `md` is the default size, while `sm` suits compact navigation such as page groups. Radius and size compose independently: use `rounded` among cards and inputs, and `pill` for a standalone floating switcher.',
      },
      code: variantsSource,
      render: () => <SegmentedControlVariants />,
    },
    {
      id: 'states',
      title: { zh: 'Proximity hover 与禁用', en: 'Proximity hover and disabled' },
      description: {
        zh: '`proximity` 会在选中 slider 更下面一层再加一块垫层，指针在控件上移动时它滑向最近的分段中心——注意它响应的是整条控件的 `mousemove`，而不是逐段的 hover，所以指针在段与段之间的缝隙上也有反馈。`disabled` 是整条控件级别的（降到 40% 不透明度并关掉指针事件），没有单段禁用；需要屏蔽某一项时，把它从 `segments` 里去掉更诚实。',
        en: '`proximity` adds a pad one layer beneath the selection slider that slides towards whichever segment centre the pointer is nearest. It listens to `mousemove` on the whole control rather than per-segment hover, so you still get feedback in the gaps between segments. `disabled` applies to the entire control — 40% opacity and no pointer events — and there is no per-segment disable. If one option must be unavailable, dropping it from `segments` is the more honest answer.',
      },
      code: statesSource,
      render: () => <SegmentedControlStates />,
    },
  ],
  api: [
    {
      name: 'SegmentedControl',
      description: {
        zh: '渲染为一个 `<div role="radiogroup">`。除 `onChange` 外的原生 div 属性与 `ref` 都透传到它身上——`aria-label` 也从这里进，单选组需要一个名字。',
        en: 'Renders a single `<div role="radiogroup">`. Native div props other than `onChange`, plus `ref`, are forwarded to it — including the `aria-label` that a radio group needs as its name.',
      },
      props: [
        {
          name: 'segments',
          type: 'string[]',
          description: {
            zh: '分段文字。必填。数组下标就是选中值。',
            en: 'The segment labels. Required. The array index is the value.',
          },
        },
        {
          name: 'activeIndex',
          type: 'number',
          description: {
            zh: '受控选中下标。不传则非受控，初始为 0。',
            en: 'Controlled selected index. Omit it to run uncontrolled, starting at 0.',
          },
        },
        {
          name: 'onChange',
          type: '(index: number) => void',
          description: {
            zh: '选中变化回调。受控与非受控下都会触发。',
            en: 'Fires on selection change, in both controlled and uncontrolled mode.',
          },
        },
        {
          name: 'variant',
          type: `'pill' | 'rounded'`,
          default: `'pill'`,
          description: {
            zh: '外框与 slider 的圆角。',
            en: 'Corner radius of the frame and slider.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md'`,
          default: `'md'`,
          description: {
            zh: '分段高度与水平内边距；紧凑导航使用 `sm`。',
            en: 'Segment height and horizontal padding; use `sm` for compact navigation.',
          },
        },
        {
          name: 'proximity',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '启用跟随指针的 hover 垫层。',
            en: 'Enable the hover pad that follows the pointer.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用整条控件：所有分段置 `disabled`，整体降到 40% 并关掉指针事件。',
            en: 'Disable the whole control: every segment gets `disabled`, and the frame drops to 40% with pointer events off.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到外框的类名，经 `tailwind-merge` 合并（例如用 `rounded-none` 覆盖掉 `rounded-pill`）。',
            en: 'Extra classes on the frame, merged via `tailwind-merge` — `rounded-none` will beat `rounded-pill`, for instance.',
          },
        },
      ],
    },
    {
      name: 'segmentedVariants',
      description: {
        zh: '各部件的 CVA 函数：外框 `segmentedVariants`、分段 `segmentVariants`、选中 slider `segmentedSliderVariants`、hover 垫层 `segmentedHoverSliderVariants`。',
        en: 'The CVA function per part: `segmentedVariants` for the frame, `segmentVariants` for a segment, `segmentedSliderVariants` for the selection slider, and `segmentedHoverSliderVariants` for the hover pad.',
      },
      props: [
        {
          name: 'variant',
          type: `'pill' | 'rounded'`,
          default: `'pill'`,
          description: {
            zh: '外框与两块 slider 都接受。',
            en: 'Accepted by the frame and by both sliders.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `segmentVariants` 接受：文字反相成 `text-background`，因为它压在深色 slider 上。',
            en: 'Accepted by `segmentVariants` only: inverts the label to `text-background`, since it sits on the dark slider.',
          },
        },
        {
          name: 'hovered',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `segmentVariants` 接受。声明顺序上排在 `active` 之前，所以选中态会压过它。',
            en: 'Accepted by `segmentVariants` only. It is declared before `active`, so the selected style wins when both apply.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每个分段是原生 `<button type="button">`，带 `role="radio"` 与 `aria-checked`，容器是 `role="radiogroup"`。Enter 与 Space 都能激活，焦点有 `focus-visible` 轮廓（`-outline-offset-2`，画在内侧，不会被外框裁掉）。容器本身没有名字，请自己传 `aria-label` 或 `aria-labelledby`。',
      en: 'Each segment is a native `<button type="button">` with `role="radio"` and `aria-checked`, inside a `role="radiogroup"`. Enter and Space both activate, and focus draws a `focus-visible` outline inset by `-outline-offset-2` so the overflow-hidden frame cannot clip it. The group has no name of its own, so pass an `aria-label` or `aria-labelledby`.',
    },
    {
      zh: '键盘按 WAI-ARIA 的单选组模式实现：整条控件只占一个 Tab 停靠点（roving tabindex，停在当前选中段），进去之后用方向键在段间移动。左右键在 RTL 下自动对调，上下键始终按 DOM 顺序，Home / End 直接跳到首尾，两端会绕回。方向键在移动焦点的同时改选中态并触发 `onChange`，这是单选组的标准行为。',
      en: 'The keyboard follows the WAI-ARIA radio-group pattern: the whole control is a single tab stop (a roving tabindex parked on the selected segment), and the arrows move between segments once you are inside. Left and right swap under RTL, up and down always follow DOM order, Home and End jump to either end, and both ends wrap. Arrow keys move the selection along with focus and fire `onChange`, as a radio group should.',
    },
    {
      zh: '这里没有 `aria-controls`，也不需要：单选组选的是一个值，不负责切换面板。如果你确实用它来切换一块内容，请自己给那块内容加 `role="tabpanel"` 与 `aria-labelledby`——不过那种场景本来就更适合 `Tabs`。',
      en: 'There is no `aria-controls`, and none is needed: a radio group picks a value, it does not own a panel. If you do use it to swap a region of content, label that region yourself with `role="tabpanel"` and `aria-labelledby` — though that case is really what `Tabs` is for.',
    },
    {
      zh: '选中态不只有颜色：slider 的位置本身就是位置线索，但两者都是视觉的。真正被读屏读出来的是 `aria-checked`，所以别把 slider 当成唯一的状态表达去改。',
      en: 'Selection is carried by more than colour — the slider’s position is itself a positional cue — but both are visual. The thing assistive tech actually reads is `aria-checked`, so do not restyle the slider as if it were the only signal.',
    },
    {
      zh: '`disabled` 用的是原生 `disabled` 属性，所有分段会一并移出 tab 序列。也就是说禁用后键盘用户既到不了它，也听不到任何解释——如果禁用是暂时的，旁边补一句说明为什么。',
      en: '`disabled` uses the native attribute, which pulls every segment out of the tab order. A keyboard user can then neither reach it nor hear why it is unavailable, so if the state is temporary, say why in text next to it.',
    },
    {
      zh: '分段高 40px，`pointer-coarse:` 下抬到 44px 以满足触摸的最小触达尺寸。slider 与 hover 垫层都是 `aria-hidden` 的装饰层，位移过渡带 `motion-reduce:transition-none`。',
      en: 'Segments are 40px tall and rise to 44px under `pointer-coarse:` to meet the touch-target minimum. Both the slider and the hover pad are decorative `aria-hidden` layers, and their transitions carry `motion-reduce:transition-none`.',
    },
  ],
}
