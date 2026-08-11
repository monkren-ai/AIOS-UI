import { Card } from 'aios-ui-kit/card'
import type { ComponentDoc } from '../types'

import CardVariants from '../../examples/card/variants'
import CardSizes from '../../examples/card/sizes'
import CardSlots from '../../examples/card/slots'
import CardInteractive from '../../examples/card/interactive'
import CardWidget from '../../examples/card/widget'

import variantsSource from '../../examples/card/variants.tsx?raw'
import sizesSource from '../../examples/card/sizes.tsx?raw'
import slotsSource from '../../examples/card/slots.tsx?raw'
import interactiveSource from '../../examples/card/interactive.tsx?raw'
import widgetSource from '../../examples/card/widget.tsx?raw'

export const cardDoc: ComponentDoc = {
  slug: 'card',
  name: 'Card',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '内容容器，提供留白、边框与分区插槽。',
    en: 'A content container with padding, a border, and section slots.',
  },
  preview: () => (
    <Card className="w-full max-w-sm" title="Storage" action="Manage">
      128 GB of 256 GB used.
    </Card>
  ),
  importStatement: `import { Card, ContentCard, WidgetCard } from 'aios-ui-kit/card'`,
  usageSnippet: `<Card title="Storage">128 GB of 256 GB used.</Card>`,
  composition: {
    zh: '`Card` 是个分发器：默认渲染 `ContentCard`，传 `mode="widget"` 时渲染 `WidgetCard`。两者的 props 几乎不重叠——ContentCard 是普通内容容器，WidgetCard 是固定版型的桌面小组件——所以下面分成两张表。真的知道自己要哪个时，直接导入 `ContentCard` / `WidgetCard` 更清楚，也省掉联合类型带来的类型收窄。内部插槽（`card-header`、`card-media`、`card-footer` …）由 props 驱动生成，不需要你手写子组件，但都带 `data-slot`，需要时可以精确选到。',
    en: '`Card` is a dispatcher: it renders `ContentCard` by default, or `WidgetCard` when you pass `mode="widget"`. Their props barely overlap — one is a general content container, the other a fixed-format desktop widget — so they get separate tables below. When you already know which one you want, importing `ContentCard` or `WidgetCard` directly reads better and skips the union-type narrowing. The inner sections (`card-header`, `card-media`, `card-footer`, …) are generated from props rather than hand-assembled from sub-components, but each carries a `data-slot` so you can still target it precisely.',
  },
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`variant` 只表达强调层级：`soft` 是默认表面，`secondary` 抬高一层，`outline` 去掉填充，`ghost` 连边框一起去掉。密度和形状不在这里——它们是 `size` 与 `shape` 两个独立维度。',
        en: '`variant` carries emphasis only: `soft` is the default surface, `secondary` sits one step raised, `outline` drops the fill, and `ghost` drops the border too. Density and corner shape are deliberately not here — they live on `size` and `shape` as separate axes.',
      },
      code: variantsSource,
      render: () => <CardVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸与形状', en: 'Size and shape' },
      description: {
        zh: '`size` 只改内边距（sm/md/lg = 16/24/32px 横向留白）。`sm` 额外把圆角收紧一档，因为大圆角配窄留白会显得头重脚轻。`shape="technical"` 换成近乎方角，用在偏仪表盘的界面上。',
        en: '`size` changes padding only (sm/md/lg give 16/24/32px inline padding). `sm` also tightens the radius one step, because a large radius on a tight box reads top-heavy. `shape="technical"` swaps in near-square corners for more instrument-panel-like surfaces.',
      },
      code: sizesSource,
      render: () => <CardSizes />,
    },
    {
      id: 'slots',
      title: { zh: '插槽', en: 'Sections' },
      description: {
        zh: '`title`、`feature`、`action`、`media`、`logo`、`footer` 各自对应一个插槽，只在传了值时才渲染——不会留下空的 header 或多出一条分隔线。`title` 和 `action` 只接受字符串，需要富内容就把它放进 `children` 或 `footer`。',
        en: '`title`, `feature`, `action`, `media`, `logo`, and `footer` each map to a section that only renders when you pass it — no empty header, no stray divider. `title` and `action` take plain strings; anything richer belongs in `children` or `footer`.',
      },
      code: slotsSource,
      render: () => <CardSlots />,
    },
    {
      id: 'interactive',
      title: { zh: '整卡可点击', en: 'Interactive cards' },
      description: {
        zh: '`interactive` 会给根元素挂上 `role="button"`、`tabIndex=0` 和 Enter/Space 处理。代价是整张卡变成一个控件，所以卡内不能再放别的可聚焦元素（那会产生嵌套交互）——需要多个动作时，别用 `interactive`，改成在 `footer` 里放按钮。`disabled` 会撤掉 tab 序列与指针事件。',
        en: '`interactive` puts `role="button"`, `tabIndex=0`, and Enter/Space handling on the root. The trade-off is that the whole card becomes one control, so it must not contain other focusable elements — that nests interactive content. When a card needs several actions, drop `interactive` and put buttons in `footer` instead. `disabled` removes it from the tab order and turns off pointer events.',
      },
      code: interactiveSource,
      render: () => <CardInteractive />,
    },
    {
      id: 'widget',
      title: { zh: 'Widget 卡片', en: 'Widget cards' },
      description: {
        zh: '`WidgetCard` 是桌面小组件的版型：`size` 描述的是方 / 宽 / 高，不是控件高度阶梯。它的 `theme` 是组件自带的配色，与全局 `[data-theme]` 无关——小组件在浅色桌面上也常常是深色的。传了 `children` 会接管内容区（`p-0` + 子元素撑满），适合塞图片或图表。',
        en: '`WidgetCard` follows desktop-widget formats: its `size` means square / wide / tall, not a control height ramp. Its `theme` is a self-contained palette independent of the global `[data-theme]` — widgets are often dark even on a light desktop. Passing `children` takes over the content area (padding is dropped and the child fills the box), which is how you host an image or a chart.',
      },
      code: widgetSource,
      render: () => <CardWidget />,
    },
  ],
  api: [
    {
      name: 'Card',
      description: {
        zh: '分发器。`mode="content"`（默认）走 `ContentCard`，`mode="widget"` 走 `WidgetCard`，其余 props 原样透传。',
        en: 'The dispatcher. `mode="content"` (the default) renders `ContentCard`, `mode="widget"` renders `WidgetCard`; everything else is forwarded as-is.',
      },
      props: [
        {
          name: 'mode',
          type: `'content' | 'widget'`,
          default: `'content'`,
          description: {
            zh: '选择底层实现。决定其余 props 按哪张表校验。',
            en: 'Picks the underlying implementation, and therefore which prop table applies.',
          },
        },
      ],
    },
    {
      name: 'ContentCard',
      description: {
        zh: '透传所有原生 `<div>` 属性到根元素。',
        en: 'Forwards every native `<div>` prop to the root element.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'secondary' | 'outline' | 'ghost'`,
          default: `'soft'`,
          description: {
            zh: '强调层级。v1 的 `default` / `raised` / `borderless` / `compact` / `technical` 仍被接受并映射到新名字。',
            en: 'Emphasis level. The v1 names `default`, `raised`, `borderless`, `compact`, and `technical` are still accepted and mapped onto the new ones.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '内边距密度。', en: 'Padding density.' },
        },
        {
          name: 'shape',
          type: `'rounded' | 'technical'`,
          default: `'rounded'`,
          description: {
            zh: '圆角或工业风方角。',
            en: 'Rounded, or industrial near-square corners.',
          },
        },
        {
          name: 'interactive',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '整卡可点击：加上 `role="button"`、`tabIndex` 与 Enter/Space 激活。',
            en: 'Make the whole card a control: adds `role="button"`, `tabIndex`, and Enter/Space activation.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '压暗并关掉指针事件；同时阻止 `onClick`。',
            en: 'Dim the card, turn off pointer events, and swallow `onClick`.',
          },
        },
        {
          name: 'title',
          type: 'string',
          description: {
            zh: 'header 里的等宽小标题。只接受字符串。',
            en: 'The monospaced eyebrow title in the header. Strings only.',
          },
        },
        {
          name: 'feature',
          type: 'ReactNode',
          description: {
            zh: '紧跟标题的胶囊标记，适合放 `beta`、`new` 之类的短词。',
            en: 'A pill next to the title, for short words like `beta` or `new`.',
          },
        },
        {
          name: 'action',
          type: 'string',
          description: {
            zh: 'header 右侧的文字按钮标签。传了才渲染按钮。',
            en: 'Label for the text button at the end of the header. The button only exists if this is set.',
          },
        },
        {
          name: 'onAction',
          type: '(event: React.MouseEvent<HTMLElement>) => void',
          description: {
            zh: 'header 按钮的点击回调。它不会阻止冒泡，所以在 `interactive` 卡里要自己 `stopPropagation`。',
            en: 'Click handler for the header button. It does not stop propagation, so mind the bubble inside an `interactive` card.',
          },
        },
        {
          name: 'media',
          type: 'ReactNode',
          description: {
            zh: '标题下方的媒体区。内部的 `img` / `video` 会被拉满宽度并裁圆角。',
            en: 'A media block below the header; nested `img` / `video` are stretched to full width and clipped.',
          },
        },
        {
          name: 'logo',
          type: 'ReactNode',
          description: {
            zh: '卡片最顶部的图标位，SVG 会被规范到 24px。',
            en: 'An icon slot above everything else; an SVG is normalised to 24px.',
          },
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: {
            zh: '底部区域，自带上分隔线与间距。',
            en: 'The footer area, which brings its own top divider and spacing.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖变体自带的工具类。',
            en: 'Extra classes, merged via `tailwind-merge` so they override the variant’s own utilities.',
          },
        },
      ],
    },
    {
      name: 'WidgetCard',
      description: {
        zh: '桌面小组件版型。透传原生 `<div>` 属性，但 `onClick` 与 `title` 被重新定义。',
        en: 'The desktop-widget format. Native `<div>` props pass through, except that `onClick` and `title` are redefined.',
      },
      props: [
        {
          name: 'size',
          type: `'square' | 'wide' | 'tall' | 'auto'`,
          default: `'square'`,
          description: {
            zh: '版型。也接受 `sm` / `md` / `lg` 作为 `tall` / `square` / `wide` 的别名。`auto` 交给内容决定尺寸。',
            en: 'Format. Also accepts `sm` / `md` / `lg` as aliases for `tall` / `square` / `wide`. `auto` lets the content size the box.',
          },
        },
        {
          name: 'shape',
          type: `'rounded' | 'pill' | 'circle'`,
          default: `'rounded'`,
          description: { zh: '外轮廓。', en: 'Outer silhouette.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark' | 'accent'`,
          default: `'dark'`,
          description: {
            zh: 'Widget 自己的配色，与全局 `[data-theme]` 独立。',
            en: 'The widget’s own palette, independent of the global `[data-theme]`.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'compact'`,
          default: `'default'`,
          description: {
            zh: '内边距密度。这里的 `variant` 是历史命名，语义上等于 density。',
            en: 'Padding density. The name `variant` is historical; it really means density.',
          },
        },
        {
          name: 'align',
          type: `'left' | 'center' | 'right'`,
          default: `'center'`,
          description: { zh: '文本与图标的对齐方向。', en: 'Text and icon alignment.' },
        },
        {
          name: 'title',
          type: 'string',
          description: { zh: '顶部的等宽小标题。', en: 'The monospaced label at the top.' },
        },
        {
          name: 'value',
          type: 'string | number',
          description: {
            zh: '主数值，用 Dot Matrix 字体放大显示。',
            en: 'The headline value, rendered large in the Dot Matrix face.',
          },
        },
        {
          name: 'subtitle',
          type: 'string',
          description: { zh: '底部的等宽注脚。', en: 'The monospaced footnote at the bottom.' },
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: { zh: '与主数值同排的图标。', en: 'An icon laid out with the value.' },
        },
        {
          name: 'iconPosition',
          type: `'top' | 'left' | 'right' | 'bottom'`,
          default: `'top'`,
          description: {
            zh: '图标相对主数值的位置。仅在同时传了 `icon` 与 `value` 时有意义。',
            en: 'Where the icon sits relative to the value. Only meaningful when both `icon` and `value` are set.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: {
            zh: '传了就变成可点击：加上 `role="button"`、`tabIndex` 与 Enter/Space。注意签名不带事件参数。',
            en: 'Passing it makes the widget a control, with `role="button"`, `tabIndex`, and Enter/Space. Note the signature takes no event argument.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '接管内容区：去掉内边距，让子元素撑满并继承圆角。',
            en: 'Takes over the content area: padding is dropped and the child fills the box, inheriting the radius.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '默认渲染的是一个普通 `<div>`，不带 role——卡片只是版式容器，语义应该由里面的标题层级和链接承担。',
      en: 'By default it is a plain `<div>` with no role. A card is a layout container; the semantics should come from the headings and links inside it.',
    },
    {
      zh: '`interactive`（以及 WidgetCard 传了 `onClick`）时才加上 `role="button"` 与 `tabIndex=0`，并自己处理 Enter 与 Space——原生 `<div>` 不会替你做这件事。',
      en: '`role="button"` and `tabIndex=0` appear only with `interactive` (or when `WidgetCard` gets an `onClick`), and Enter plus Space are handled explicitly, because a `<div>` will not do that for you.',
    },
    {
      zh: '可点击的卡片没有自动的可读名称。卡内如果只有图形，请补 `aria-label`；表示选中状态时用 `aria-pressed`。',
      en: 'An interactive card has no automatic accessible name. Add an `aria-label` when the content is purely graphical, and use `aria-pressed` to expose a selected state.',
    },
    {
      zh: '可点击的卡片里不要再放按钮或链接。嵌套交互对键盘和读屏用户都是陷阱——`action` 按钮就是为此存在的例外，它只在非 `interactive` 的卡里用得安心。',
      en: 'Do not nest buttons or links inside an interactive card; nested interactive content traps both keyboard and screen-reader users. The `action` button is the intended exception, and it is only safe on a card that is not `interactive`.',
    },
    {
      zh: '`disabled` 只做视觉压暗与 `pointer-events-none`，不会移出 tab 序列以外的语义标记，所以它上面还会带 `data-disabled` 与 `data-state="disabled"` 供样式和测试选择。',
      en: '`disabled` only dims the card and applies `pointer-events-none`; it also sets `data-disabled` and `data-state="disabled"` so styling and tests have something to hook onto.',
    },
    {
      zh: '所有过渡都带 `motion-reduce:` 兜底；`WidgetCard` 的 hover 只换 border 与 background，没有位移。',
      en: 'Every transition has a `motion-reduce:` fallback, and `WidgetCard` hover changes only border and background — nothing moves.',
    },
  ],
}
