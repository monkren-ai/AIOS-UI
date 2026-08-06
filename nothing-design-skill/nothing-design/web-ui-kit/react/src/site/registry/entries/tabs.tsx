import { Tabs, TabPanel } from 'aios-ui-kit/tabs'
import type { ComponentDoc } from '../types'

import TabsBasic from '../../examples/tabs/basic'
import TabsVariants from '../../examples/tabs/variants'
import TabsIndicator from '../../examples/tabs/indicator'
import TabsControlled from '../../examples/tabs/controlled'
import TabsStates from '../../examples/tabs/states'

import basicSource from '../../examples/tabs/basic.tsx?raw'
import variantsSource from '../../examples/tabs/variants.tsx?raw'
import indicatorSource from '../../examples/tabs/indicator.tsx?raw'
import controlledSource from '../../examples/tabs/controlled.tsx?raw'
import statesSource from '../../examples/tabs/states.tsx?raw'

const PREVIEW_ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'specs', label: 'Specs' },
]

export const tabsDoc: ComponentDoc = {
  slug: 'tabs',
  name: 'Tabs',
  category: 'navigation',
  status: 'stable',
  baseUi: 'Tabs',
  description: {
    zh: '标签页，在同一区域切换多组内容。',
    en: 'Tabs for swapping between panels in the same space.',
  },
  preview: () => (
    <div className="w-full max-w-sm">
      <Tabs items={PREVIEW_ITEMS} defaultValue="overview">
        <TabPanel value="overview">Overview panel</TabPanel>
        <TabPanel value="specs">Specs panel</TabPanel>
      </Tabs>
    </div>
  ),
  importStatement: `import { Tabs, TabPanel } from 'aios-ui-kit/tabs'`,
  usageSnippet: `<Tabs
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'specs', label: 'Specs' },
  ]}
  defaultValue="overview"
>
  <TabPanel value="overview">Overview panel</TabPanel>
  <TabPanel value="specs">Specs panel</TabPanel>
</Tabs>`,
  composition: {
    zh: '结构是「一半数据驱动、一半组合」：标签条来自 `items` 数组，面板来自 `TabPanel` 子元素，两边靠 `value` 对上号。`TabPanel` 本身不渲染任何东西——它只是个数据载体，`Tabs` 读出它的 `value` 与 `children`，再交给 Base UI 的 `Tabs.Panel` 渲染。所以别给 `TabPanel` 加 `className` 或事件，那些属性会被丢掉；要包一层就在 `children` 里面包。没有对应 `TabPanel` 的 `items` 条目也是合法的，只是切过去会是空白区域。',
    en: 'Half data-driven, half composed: the tab strip comes from the `items` array, the panels come from `TabPanel` children, and `value` is what pairs them up. `TabPanel` renders nothing itself — it is a carrier that `Tabs` reads `value` and `children` off before handing them to Base UI’s `Tabs.Panel`. Anything else you put on it (`className`, handlers) is dropped, so wrap inside `children` instead. An `items` entry with no matching `TabPanel` is legal; selecting it just leaves an empty region.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '`defaultValue` 走非受控，组件自己记住选中项。请务必给一个初始值：不传的话首次渲染没有任何标签被选中，面板区一片空白，直到用户点一下才恢复正常。',
        en: '`defaultValue` keeps it uncontrolled and the component remembers the selection for you. Do supply one: without it nothing is selected on first render and the panel area sits empty until the user clicks something.',
      },
      code: basicSource,
      render: () => <TabsBasic />,
    },
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`default` 是一条底部分隔线，适合页面级的主结构；`pills` 把整条标签条收进一个 surface-raised 容器，选中项反白，视觉重量最大，适合独立成块的筛选器；`subtle` 去掉容器换成正文字体，用在卡片内部这类不该跟主导航抢层级的地方。',
        en: '`default` draws a rule under the strip and suits page-level structure. `pills` wraps the strip in a raised container and inverts the selected item — the heaviest of the three, right for a filter that stands on its own. `subtle` drops the container and switches to body type, for places like the inside of a card where the strip must not compete with the page navigation.',
      },
      code: variantsSource,
      render: () => <TabsVariants />,
    },
    {
      id: 'indicator',
      title: { zh: '选中态的表达', en: 'How selection is shown' },
      description: {
        zh: '`indicator` 与 `variant` 是两个独立维度。`line` 渲染一条会滑动的 indicator；`background` 表示「选中态由 trigger 自己的底色表达」，所以它只在 `pills` 下讲得通，同时它还会顺带关掉 proximity hover 垫层——两块背景叠在一起只会互相打架。`none` 只剩文字明暗，信息量最弱，除非周围已有别的选中线索，否则别用。',
        en: '`indicator` and `variant` are independent axes. `line` renders a sliding bar. `background` means “the trigger’s own fill carries the selected state”, so it only makes sense with `pills` — and it also switches off the proximity hover pad, since two stacked backgrounds just fight each other. `none` leaves nothing but a brightness difference in the label; avoid it unless something else nearby already says which tab is active.',
      },
      code: indicatorSource,
      render: () => <TabsIndicator />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '传了 `value` 就是受控：组件不再自己改选中项，你必须在 `onValueChange` 里把状态写回去。需要从外部驱动（向导的「下一步」、深链接到某个标签、切换时打点）时用它。注意受控与非受控不要中途互换——`value` 从 `undefined` 变成字符串会让 React 抱怨。',
        en: 'Passing `value` makes it controlled: the component stops moving the selection on its own, so you must write the new value back in `onValueChange`. Reach for it when something outside the strip drives it — a wizard’s “next” button, a deep link into one tab, analytics on every switch. Don’t flip between the two modes mid-life; going from `undefined` to a string is exactly what React warns about.',
      },
      code: controlledSource,
      render: () => <TabsControlled />,
    },
    {
      id: 'states',
      title: { zh: '禁用项与 proximity hover', en: 'Disabled tabs and proximity hover' },
      description: {
        zh: '`items` 里单项加 `disabled` 会置上 `aria-disabled` 并挡掉激活，方向键仍然会经过它——这是 Base UI 的取舍：读屏用户至少能知道这个标签存在。`enableProximityHover` 默认开启，指针在标签条上移动时会有一块垫层追着最近的标签跑；标签很多、彼此又窄时它反而显得躁动，那就关掉。',
        en: 'Marking an entry `disabled` sets `aria-disabled` and blocks activation, but the arrow keys still land on it — Base UI’s deliberate call, so screen-reader users at least learn the tab exists. `enableProximityHover` is on by default and slides a pad towards whichever tab the pointer is nearest; with many narrow tabs it reads as restless, and that is when to turn it off.',
      },
      code: statesSource,
      render: () => <TabsStates />,
    },
  ],
  api: [
    {
      name: 'Tabs',
      description: {
        zh: '根元素，渲染为 Base UI 的 `Tabs.Root`（一个 `<div>`）。除 `value` / `defaultValue` / `onChange` 外的原生 div 属性与 `ref` 都透传到它身上。',
        en: 'The root, rendered as Base UI’s `Tabs.Root` (a `<div>`). Native div props other than `value`, `defaultValue`, and `onChange` — plus `ref` — are forwarded to it.',
      },
      props: [
        {
          name: 'items',
          type: 'TabItem[]',
          description: {
            zh: '标签条内容。必填，顺序即 DOM 顺序与方向键顺序。',
            en: 'The tab strip. Required; array order is both DOM order and arrow-key order.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: { zh: '受控选中值。', en: 'Controlled selected value.' },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: {
            zh: '非受控初始选中值。不传则初始无选中。',
            en: 'Initial value when uncontrolled. Without it, nothing starts selected.',
          },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: { zh: '选中值变化回调。', en: 'Fires when the selection changes.' },
        },
        {
          name: 'variant',
          type: `'default' | 'pills' | 'subtle'`,
          default: `'default'`,
          description: { zh: '视觉形态。', en: 'Visual form.' },
        },
        {
          name: 'indicator',
          type: `'line' | 'background' | 'none'`,
          default: `'line'`,
          description: {
            zh: '选中态的表达方式。`background` 会同时关掉 proximity hover 垫层。',
            en: 'How selection is expressed. `background` also disables the proximity hover pad.',
          },
        },
        {
          name: 'enableProximityHover',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '指针靠近时是否显示追随的背景垫层。',
            en: 'Whether a background pad follows the pointer across the strip.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到根元素的类名。经 `tailwind-merge` 合并，能覆盖变体默认值（例如用 `flex-row` 换掉 `flex-col`）。',
            en: 'Extra classes on the root, merged via `tailwind-merge` — enough to override the variant defaults (`flex-row` in place of `flex-col`, say).',
          },
        },
      ],
    },
    {
      name: 'TabItem',
      description: {
        zh: '`items` 数组的元素类型。',
        en: 'The element type of the `items` array.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '标签值，组内唯一，用来和 `TabPanel` 的 `value` 配对。',
            en: 'The tab’s value; unique within the strip and what pairs it with a `TabPanel`.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '标签文字。只接受字符串，放不下图标。',
            en: 'The tab label. Strings only — there is no slot for an icon.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用这一个标签，置 `aria-disabled` 与 `data-disabled`。',
            en: 'Disable just this tab; sets `aria-disabled` and `data-disabled`.',
          },
        },
      ],
    },
    {
      name: 'TabPanel',
      description: {
        zh: '面板的数据载体。它自己返回 `null`，真正渲染的是 Base UI 的 `Tabs.Panel`，所以只有下面两个属性有效。',
        en: 'A carrier for panel content. It returns `null` itself — Base UI’s `Tabs.Panel` does the rendering — so only the two props below have any effect.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '对应的标签值。必须能在 `items` 里找到，否则这块内容永远不会显示。',
            en: 'The tab it belongs to. It must exist in `items`, or the content is never reachable.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '面板内容。', en: 'The panel content.' },
        },
      ],
    },
    {
      name: 'tabsVariants',
      description: {
        zh: '各部件的 CVA 函数：根 `tabsVariants`、标签条 `tabsListVariants`、触发器 `tabTriggerVariants`、indicator `tabsIndicatorVariants`、hover 垫层 `tabsHoverBackgroundVariants`、面板 `tabsPanelVariants`。想在别的结构里复刻同一套外观时用它们。',
        en: 'The CVA functions behind each part: `tabsVariants` for the root, `tabsListVariants` for the strip, `tabTriggerVariants` for a trigger, `tabsIndicatorVariants`, `tabsHoverBackgroundVariants`, and `tabsPanelVariants`. Use them to reproduce the look on a different structure.',
      },
      props: [
        {
          name: 'variant',
          type: 'TabsVariant',
          default: `'default'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `tabTriggerVariants` 接受，表示选中态。',
            en: 'Accepted by `tabTriggerVariants` only; the selected state.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅 `tabTriggerVariants` 接受，表示禁用态。',
            en: 'Accepted by `tabTriggerVariants` only; the disabled state.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '语义由 Base UI 提供：标签条是 `role="tablist"`，每个触发器是 `role="tab"` 且带 `aria-selected`，面板是 `role="tabpanel"` 且 `aria-labelledby` 指回对应的标签——所以读屏软件读面板时会先念出标签名。',
      en: 'Semantics come from Base UI: the strip is a `role="tablist"`, each trigger a `role="tab"` with `aria-selected`, and the panel a `role="tabpanel"` whose `aria-labelledby` points back at its tab — so a screen reader names the panel with its tab’s label.',
    },
    {
      zh: '标签条内部是 roving tabindex：整条只占 tab 序列里的一格，进去以后用左右方向键移动（`Home` / `End` 跳到首尾）。方向键的含义跟随书写方向，RTL 下自动翻面。',
      en: 'The strip uses a roving tabindex: it takes a single stop in the page’s tab order, and you move within it using the left/right arrows (`Home` and `End` jump to the ends). Arrow direction follows the writing direction and mirrors automatically under RTL.',
    },
    {
      zh: '这里是**自动激活**（`activateOnFocus`）：方向键移到哪个标签，哪个面板就立刻显示，不需要再按 Enter。它对轻量内容很顺手，但如果切换标签会触发网络请求，逐个划过去就是逐个发请求——那种情况更适合手动激活，而组件目前没有暴露这个开关。',
      en: 'Activation is **automatic** (`activateOnFocus`): whichever tab the arrows land on becomes the selected one immediately, with no Enter required. That feels direct for lightweight content, but if switching tabs fires a network request, arrowing across the strip fires one per tab. Manual activation would be the right answer there, and the component does not currently expose that switch.',
    },
    {
      zh: '禁用标签用 `aria-disabled` 而不是原生 `disabled`，因此仍然可以被方向键聚焦、被读屏读到——只是激活不了。这比让它凭空消失更好：用户至少知道有这么个东西。',
      en: 'Disabled tabs use `aria-disabled` rather than the native `disabled` attribute, so they can still be reached with the arrows and announced — they simply cannot be activated. That is better than vanishing: the user learns the tab exists.',
    },
    {
      zh: '当前面板的 `tabIndex` 是 0（隐藏的面板是 -1），所以从标签条按一次 Tab 就落在面板上，键盘用户可以直接滚动它；面板自带 `focus-visible` 轮廓，落点看得见。',
      en: 'The open panel has `tabIndex={0}` (hidden ones are -1), so one Tab from the strip lands on the panel itself and keyboard users can scroll it straight away. The panel draws its own `focus-visible` outline, so that stop is visible.',
    },
    {
      zh: 'indicator 与 hover 垫层都是 `aria-hidden` 的纯装饰层，位移走 `inset-inline-start`（RTL 自动镜像），并且都带 `motion-reduce:transition-none`。',
      en: 'The indicator and the hover pad are decorative `aria-hidden` layers positioned with `inset-inline-start` (so RTL mirrors them for free), and both carry `motion-reduce:transition-none`.',
    },
    {
      zh: '一处已知缺陷：触发器上的 `aria-controls` 被组件覆盖成了自己拼的 id，而面板用的是 Base UI 生成的 id，两者对不上——`aria-controls` 目前指向一个不存在的元素。`aria-selected` 与面板的 `aria-labelledby` 不受影响，仍然正确。同理，触发器上的 `data-state` 只在受控模式下准确，非受控时恒为 `inactive`，别拿它写样式。',
      en: 'One known defect: the component overwrites the trigger’s `aria-controls` with an id it builds itself, while the panel keeps the id Base UI generated — so `aria-controls` currently points at an element that does not exist. `aria-selected` and the panel’s `aria-labelledby` are unaffected and remain correct. In the same vein, the trigger’s `data-state` is only accurate when controlled; uncontrolled it is always `inactive`, so do not style off it.',
    },
  ],
}
