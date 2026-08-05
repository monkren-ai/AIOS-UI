import { Accordion } from 'nothing-ui/accordion'
import type { ComponentDoc } from '../types'

import AccordionBasic from '../../examples/accordion/basic'
import AccordionMultiple from '../../examples/accordion/multiple'
import AccordionFlush from '../../examples/accordion/flush'
import AccordionControlled from '../../examples/accordion/controlled'

import basicSource from '../../examples/accordion/basic.tsx?raw'
import multipleSource from '../../examples/accordion/multiple.tsx?raw'
import flushSource from '../../examples/accordion/flush.tsx?raw'
import controlledSource from '../../examples/accordion/controlled.tsx?raw'

const PREVIEW_ITEMS = [
  { id: 'shipping', title: 'Shipping', content: 'Dispatched within two working days.' },
  { id: 'returns', title: 'Returns', content: 'Fourteen days from delivery.' },
]

export const accordionDoc: ComponentDoc = {
  slug: 'accordion',
  name: 'Accordion',
  category: 'navigation',
  status: 'stable',
  baseUi: 'Accordion',
  description: {
    zh: '可折叠的分区列表，支持单开与多开。',
    en: 'A list of collapsible sections, single- or multi-open.',
  },
  preview: () => (
    <div className="w-full max-w-sm">
      <Accordion items={PREVIEW_ITEMS} defaultValue={['shipping']} />
    </div>
  ),
  importStatement: `import { Accordion } from 'nothing-ui/accordion'`,
  usageSnippet: `<Accordion
  items={[
    { id: 'shipping', title: 'Shipping', content: 'Dispatched within two days.' },
    { id: 'returns', title: 'Returns', content: 'Fourteen days from delivery.' },
  ]}
  defaultValue={['shipping']}
/>`,
  composition: {
    zh: '数据驱动：`items` 里的每一项都会展开成 Base UI 的完整结构——`Accordion.Item` 包 `Accordion.Header`（一个 `<h3>`）包 `Accordion.Trigger`（`<button>`），下面挂 `Accordion.Panel`（`role="region"`）。展开状态用 id 数组表达，单开模式下这个数组最多一个元素，所以 `value` / `defaultValue` 两种模式共用同一个形状，从 `single` 切到 `multiple` 时不用改数据。面板收起时会从 DOM 里移除，展开高度靠 Base UI 写在元素上的 `--accordion-panel-height` 做过渡。',
    en: 'Data-driven: every entry in `items` expands into Base UI’s full structure — an `Accordion.Item` wrapping an `Accordion.Header` (an `<h3>`) wrapping an `Accordion.Trigger` (a `<button>`), with an `Accordion.Panel` (`role="region"`) beneath. Open state is an array of ids, and in single mode that array simply never holds more than one, so `value` and `defaultValue` keep the same shape and switching `single` → `multiple` needs no data change. Closed panels leave the DOM entirely; the height transition runs off the `--accordion-panel-height` variable Base UI writes onto the element.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '默认 `type="single"`：打开一个就会关掉上一个。这适合内容彼此排斥、或者列表长到需要控制页面高度的场景（FAQ 是典型）。`defaultValue` 接受 id 数组，非受控模式下用它决定首屏哪几项是开的——首屏至少开一项通常是好事，能让人一眼看出这里是可以展开的。',
        en: 'The default is `type="single"`: opening one section closes the previous one. That suits content where the sections genuinely compete, or where the list is long enough that page height matters — an FAQ being the classic case. `defaultValue` takes an array of ids and decides what starts open. Leaving one section open on first paint is usually worth it: it shows at a glance that these rows expand.',
      },
      code: basicSource,
      render: () => <AccordionBasic />,
    },
    {
      id: 'multiple',
      title: { zh: '多开', en: 'Multiple open' },
      description: {
        zh: '`type="multiple"` 允许同时展开任意多项。当用户可能需要对照两段内容时选它——强制单开会逼着人来回点。代价是页面高度不可预测，所以别在多开模式里放很长的内容。',
        en: 'With `type="multiple"` any number of sections can be open at once. Choose it when someone might reasonably want to compare two sections; forcing single-open makes them click back and forth. The cost is that the page height becomes unpredictable, so keep the bodies short in this mode.',
      },
      code: multipleSource,
      render: () => <AccordionMultiple />,
    },
    {
      id: 'flush',
      title: { zh: 'flush 变体与图标', en: 'Flush variant and icons' },
      description: {
        zh: '`default` 是一个带外框的整体，条目之间用下边框分隔；`flush` 去掉外框、改用上边框分隔，直接贴在页面或卡片上——已经身处一个有边框的容器里时用它，避免两层框套在一起。`leadingIcon` 放在标题前，它是 `aria-hidden` 的装饰位，所以图标本身不要承载信息。单项加 `disabled` 会挡掉展开并降到 40%。',
        en: '`default` draws a frame around the whole group and separates entries with a bottom border; `flush` drops the frame and separates with a top border instead, sitting directly on the page or inside a card. Use it when you are already inside a bordered container, so you do not end up with a box in a box. `leadingIcon` goes before the title in an `aria-hidden` slot, so never let the icon carry information on its own. Marking an entry `disabled` blocks expansion and drops it to 40%.',
      },
      code: flushSource,
      render: () => <AccordionFlush />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '传了 `value` 就是受控，展开状态归你管——「全部展开 / 全部收起」这类操作只能这么做。`onValueChange` 给的是变化后的完整 id 数组，不是增量，直接 `setState` 即可。搜索命中时自动展开对应分区也是这个模式。',
        en: 'Passing `value` makes it controlled and hands you the open set — which is the only way to build “expand all” and “collapse all”. `onValueChange` gives you the complete array after the change, not a delta, so you can hand it straight to `setState`. Auto-expanding whichever section matches a search query works the same way.',
      },
      code: controlledSource,
      render: () => <AccordionControlled />,
    },
  ],
  api: [
    {
      name: 'Accordion',
      description: {
        zh: '根元素，渲染为 Base UI 的 `Accordion.Root`（一个 `<div>`）。除 `value` / `defaultValue` / `onChange` 外的原生 div 属性与 `ref` 都透传。',
        en: 'The root, rendered as Base UI’s `Accordion.Root` (a `<div>`). Native div props other than `value`, `defaultValue`, and `onChange` — plus `ref` — are forwarded.',
      },
      props: [
        {
          name: 'items',
          type: 'AccordionItem[]',
          description: { zh: '分区列表。必填。', en: 'The sections. Required.' },
        },
        {
          name: 'type',
          type: `'single' | 'multiple'`,
          default: `'single'`,
          description: {
            zh: '同时最多展开一项，还是任意多项。',
            en: 'At most one section open, or any number.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'flush'`,
          default: `'default'`,
          description: {
            zh: '有外框（条目间下边框）还是无外框（条目间上边框）。',
            en: 'Framed with bottom-border separators, or unframed with top-border separators.',
          },
        },
        {
          name: 'value',
          type: 'string[]',
          description: {
            zh: '受控的展开 id 集合。',
            en: 'The controlled set of open ids.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string[]',
          description: {
            zh: '非受控模式下初始展开的 id。',
            en: 'Which ids start open when uncontrolled.',
          },
        },
        {
          name: 'defaultOpen',
          type: 'string[]',
          description: {
            zh: '`defaultValue` 的旧名，已废弃。两者都给时 `defaultValue` 优先。',
            en: 'The former name for `defaultValue`, deprecated. If both are given, `defaultValue` wins.',
          },
        },
        {
          name: 'onValueChange',
          type: '(value: string[]) => void',
          description: {
            zh: '展开集合变化回调，参数是变化后的完整数组。',
            en: 'Fires when the open set changes, with the complete array afterwards.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到根元素的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the root, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'AccordionItem',
      description: {
        zh: '`items` 数组的元素类型。',
        en: 'The element type of the `items` array.',
      },
      props: [
        {
          name: 'id',
          type: 'string',
          description: {
            zh: '分区标识，列表内唯一。它同时是 React key 与 `value` / `defaultValue` 里用的值。',
            en: 'The section’s identity, unique in the list. It doubles as the React key and as the value used in `value` and `defaultValue`.',
          },
        },
        {
          name: 'title',
          type: 'ReactNode',
          description: {
            zh: '标题内容。接受任意节点，但它落在 `<button>` 里面——别放链接或别的按钮。',
            en: 'The heading content. Any node is accepted, but it lands inside a `<button>`, so no links or nested buttons.',
          },
        },
        {
          name: 'content',
          type: 'ReactNode',
          description: { zh: '展开后的内容。', en: 'What the section reveals.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用这一项：置 `aria-disabled`、挡掉展开、降到 40%。',
            en: 'Disable this section: `aria-disabled`, no expansion, 40% opacity.',
          },
        },
        {
          name: 'leadingIcon',
          type: 'ReactNode',
          description: {
            zh: '标题前的图标槽位，`aria-hidden`。',
            en: 'An icon slot before the title, marked `aria-hidden`.',
          },
        },
      ],
    },
    {
      name: 'accordionVariants',
      description: {
        zh: '各部件的 CVA 函数：`accordionVariants`（根）、`accordionItemVariants`、`accordionHeaderVariants`、`accordionTriggerVariants`、`accordionTriggerTextVariants`、`accordionTriggerIconVariants`、`accordionLeadingIconVariants`、`accordionPanelVariants`、`accordionContentVariants`。',
        en: 'The CVA function per part: `accordionVariants` (root), `accordionItemVariants`, `accordionHeaderVariants`, `accordionTriggerVariants`, `accordionTriggerTextVariants`, `accordionTriggerIconVariants`, `accordionLeadingIconVariants`, `accordionPanelVariants`, and `accordionContentVariants`.',
      },
      props: [
        {
          name: 'variant',
          type: `'default' | 'flush'`,
          default: `'default'`,
          description: {
            zh: '根与条目接受，决定边框走向。',
            en: 'Accepted by the root and the item; decides where the borders go.',
          },
        },
        {
          name: 'type',
          type: `'single' | 'multiple'`,
          default: `'single'`,
          description: {
            zh: '只有根接受，目前不产生任何类名，纯粹为了对齐 API。',
            en: 'Accepted by the root only. It emits no classes today and exists to mirror the component API.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每个标题是一个 `<h3>` 包着 `<button>`——标题层级参与页面大纲，读屏用户可以用「按标题跳转」在分区之间移动。如果这套 accordion 嵌在别的标题层级下，`<h3>` 可能不合适，这一点组件目前没开放调整。',
      en: 'Each heading is an `<h3>` wrapping a `<button>`, so the sections take part in the document outline and screen-reader users can jump between them by heading. If your accordion sits under a different heading level, `<h3>` may be wrong — and the component does not currently let you change it.',
    },
    {
      zh: '触发器带 `aria-expanded`，展开时还会带指向面板的 `aria-controls`；面板是 `role="region"` 且 `aria-labelledby` 指回触发器，所以进入面板时读屏会先念出这一节的标题。',
      en: 'The trigger carries `aria-expanded`, plus an `aria-controls` pointing at the panel while it is open. The panel is a `role="region"` whose `aria-labelledby` points back at the trigger, so entering it announces the section’s title first.',
    },
    {
      zh: '这里**没有**方向键在分区间移动：Base UI 跟随 APG 的更新移除了 accordion 的 roving focus，每个触发器都是独立的 tab 停靠点，用 Tab 逐个走。`loopFocus` 与 `orientation` 在上游已废弃，本组件也没有透出。',
      en: 'There is **no** arrow-key movement between sections: Base UI removed roving focus from the accordion following the APG update, so each trigger is its own tab stop and you move with Tab. The upstream `loopFocus` and `orientation` props are deprecated and this component does not surface them.',
    },
    {
      zh: '收起的面板会从 DOM 中移除，所以里面的内容既不会被读屏读到，也不会出现在 tab 序列里——不会有「Tab 键掉进看不见的内容」这种问题。代价是浏览器的页内查找（Ctrl+F）也搜不到收起的内容。',
      en: 'A closed panel is unmounted, so its content is neither announced nor reachable by Tab — there is no way to tab into something invisible. The trade-off is that the browser’s find-in-page cannot reach collapsed content either.',
    },
    {
      zh: '禁用项用 `aria-disabled` 而非原生 `disabled`，因此仍然可聚焦、可被读屏读到，只是按不动。',
      en: 'Disabled sections use `aria-disabled` rather than the native attribute, so they stay focusable and announced — they just refuse to open.',
    },
    {
      zh: '触发器最小高度 44px，满足触摸最小触达尺寸；`focus-visible` 轮廓画在内侧（`-outline-offset-2`），不会被根容器的 `overflow-hidden` 裁掉。',
      en: 'Triggers are at least 44px tall, meeting the touch-target minimum, and the `focus-visible` outline is inset (`-outline-offset-2`) so the root’s `overflow-hidden` cannot clip it.',
    },
    {
      zh: '高度过渡与三角的旋转都带 `motion-reduce:transition-none`，开启减弱动效后是瞬时展开。',
      en: 'Both the height transition and the caret rotation carry `motion-reduce:transition-none`, so with reduced motion the section snaps open.',
    },
  ],
}
