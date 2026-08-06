import { Toolbar } from 'aios-ui-kit/toolbar'
import type { ComponentDoc } from '../types'

import ToolbarBasic from '../../examples/toolbar/basic'
import ToolbarWithGroups from '../../examples/toolbar/with-groups'

import basicSource from '../../examples/toolbar/basic.tsx?raw'
import withGroupsSource from '../../examples/toolbar/with-groups.tsx?raw'

export const toolbarDoc: ComponentDoc = {
  slug: 'toolbar',
  name: 'Toolbar',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Toolbar',
  description: {
    zh: '工具条，组合按钮、分隔与开关，方向键切换焦点。',
    en: 'A toolbar of buttons, separators, and toggles, navigated with the arrow keys.',
  },
  preview: () => (
    <Toolbar label="Text formatting">
      <Toolbar.Button pressed>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Align</Toolbar.Button>
    </Toolbar>
  ),
  importStatement: `import { Toolbar } from 'aios-ui-kit/toolbar'`,
  usageSnippet: `<Toolbar label="Formatting">
  <Toolbar.Button pressed>Bold</Toolbar.Button>
  <Toolbar.Button>Italic</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Align</Toolbar.Button>
</Toolbar>`,
  composition: {
    zh: '`Toolbar` 是 `role="toolbar"` 容器，方向键在子项间流转焦点（含循环）由 Base UI 处理。子件 `Toolbar.Button` / `Toolbar.Separator` / `Toolbar.Group` / `Toolbar.Link` 是带样式的 Base UI 原语。`size` 与 `disabled` 通过内部 context 下发给按钮，子按钮可用自己的 `size` 覆盖。需要开关语义时，给 `Toolbar.Button` 传 `pressed`，它会映射到 `aria-pressed`。',
    en: '`Toolbar` is a `role="toolbar"` container; arrow-key focus cycling (with wrapping) is handled by Base UI. The children `Toolbar.Button` / `Toolbar.Separator` / `Toolbar.Group` / `Toolbar.Link` are styled Base UI primitives. `size` and `disabled` flow down to buttons through an internal context, and a button can override `size` itself. For on/off semantics, pass `pressed` to `Toolbar.Button`, which maps to `aria-pressed`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '一排按钮中间用 `Toolbar.Separator` 分组。`pressed` 把按钮变成工具栏开关——加粗字重让按下态不只靠颜色表达，色觉障碍用户也能分辨。务必给 `Toolbar` 一个 `label`，否则读屏软件无法标识这组控件。',
        en: 'A row of buttons split by a `Toolbar.Separator`. `pressed` turns a button into a toolbar toggle — the weight change keeps “pressed” legible without relying on colour alone. Always give the `Toolbar` a `label`; otherwise the set has no name for assistive tech.',
      },
      code: basicSource,
      render: () => <ToolbarBasic />,
    },
    {
      id: 'with-groups',
      title: { zh: '分组与链接', en: 'Groups and links' },
      description: {
        zh: '`Toolbar.Group` 把相关动作聚成一组，分隔线把它和其它组分开。`size="sm"` 同时下发给所有子按钮，让工具条更紧凑。`Toolbar.Link` 渲染为 `<a>`，保留链接语义，适合指向文档这类导航目标。',
        en: '`Toolbar.Group` clusters related actions and a separator sets them apart. `size="sm"` propagates to every child button for a denser bar. `Toolbar.Link` renders an `<a>`, keeping link semantics for navigational targets like docs.',
      },
      code: withGroupsSource,
      render: () => <ToolbarWithGroups />,
    },
  ],
  api: [
    {
      name: 'Toolbar',
      description: {
        zh: '渲染为 `role="toolbar"` 的 `<div>`，其余原生 `<div>` 属性照常透传。方向键焦点流转由 Base UI 处理。',
        en: 'Renders a `<div>` with `role="toolbar"`; other native `<div>` props pass through. Arrow-key focus cycling is handled by Base UI.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '工具条的 `aria-label`，工具条必须有一个可达名称。',
            en: 'The toolbar’s `aria-label`; a toolbar must have an accessible name.',
          },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: { zh: '排布方向。', en: 'Layout direction.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '子项高度阶梯，下发给 `Toolbar.Button`。',
            en: 'Item height; pushed down to `Toolbar.Button`.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用整个工具条。', en: 'Disable the whole toolbar.' },
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: {
            zh: '通常是若干 `Toolbar.Button` / `Toolbar.Group` / `Toolbar.Separator` / `Toolbar.Link`。',
            en: 'Typically several `Toolbar.Button` / `Toolbar.Group` / `Toolbar.Separator` / `Toolbar.Link`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名，经 `tailwind-merge` 合并。', en: 'Extra classes, merged via `tailwind-merge`.' },
        },
      ],
    },
    {
      name: 'Toolbar.Button',
      description: {
        zh: '工具条里的按钮，渲染为原生 `<button>`，参与方向键焦点流转。',
        en: 'A button in the toolbar; renders a native `<button>` and joins the arrow-key focus cycle.',
      },
      props: [
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: '继承 `Toolbar` 的 `size`',
          description: { zh: '高度阶梯，覆盖工具条的 `size`。', en: 'Height; overrides the toolbar’s `size`.' },
        },
        {
          name: 'pressed',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '按下态，映射到 `aria-pressed` 与 `data-pressed`，用于工具栏开关。',
            en: 'Pressed state, mapped to `aria-pressed` and `data-pressed`; for toolbar toggles.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用此项；工具条 `disabled` 时所有按钮一并禁用。',
            en: 'Disable this item; the toolbar’s `disabled` disables every button.',
          },
        },
        {
          name: 'onClick',
          type: '() => void',
          description: { zh: '点击回调。', en: 'Click handler.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名。', en: 'Extra classes.' },
        },
      ],
    },
    {
      name: 'Toolbar.Separator',
      description: {
        zh: '分隔线，方向自动取工具条方向的垂直方向。',
        en: 'A separator; its orientation defaults to the opposite of the toolbar’s.',
      },
      props: [
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名。', en: 'Extra classes.' },
        },
      ],
    },
    {
      name: 'Toolbar.Group',
      description: {
        zh: '把若干相关项聚成一组，渲染为 `<div>`。',
        en: 'Clusters related items; renders a `<div>`.',
      },
      props: [
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名。', en: 'Extra classes.' },
        },
      ],
    },
    {
      name: 'Toolbar.Link',
      description: {
        zh: '工具条里的链接，渲染为 `<a>`，保留链接语义。',
        en: 'A link in the toolbar; renders an `<a>` and keeps link semantics.',
      },
      props: [
        {
          name: 'href',
          type: 'string',
          description: { zh: '链接地址。', en: 'The URL.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名。', en: 'Extra classes.' },
        },
      ],
    },
    {
      name: 'toolbarVariants',
      description: {
        zh: '容器类名的 CVA 函数；按钮的是 `toolbarButtonVariants`，分隔线的是 `toolbarSeparatorVariants`。',
        en: 'The CVA function for the container; buttons use `toolbarButtonVariants`, separators `toolbarSeparatorVariants`.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染为 `role="toolbar"`，方向键在子项间移动焦点并循环；Base UI 维护 `aria-orientation` 与 roving tabindex。',
      en: 'Renders `role="toolbar"`; arrows move focus between items with wrapping, and Base UI maintains `aria-orientation` and the roving tabindex.',
    },
    {
      zh: '工具条必须有一个可达名称——请通过 `label` 提供 `aria-label`，否则读屏软件无法标识这组控件。',
      en: 'A toolbar needs an accessible name — supply it through `label` (`aria-label`), or assistive tech cannot identify the group.',
    },
    {
      zh: '`Toolbar.Button` 是原生 `<button>`，天然在 tab 序列内，Enter 与 Space 都能激活。',
      en: '`Toolbar.Button` is a native `<button>`, so it is in the tab order and activated by both Enter and Space.',
    },
    {
      zh: '开关态通过 `pressed` 映射到 `aria-pressed`，同时改变字重，不只靠颜色表达。',
      en: 'The toggle state maps to `aria-pressed` via `pressed` and also changes the font weight, so it is not carried by colour alone.',
    },
    {
      zh: '分隔线渲染为 `role="separator"`，方向自动适配工具条方向。',
      en: 'The separator renders with `role="separator"` and orients itself to the toolbar’s direction.',
    },
    {
      zh: '所有过渡都带 `motion-reduce:` 兜底，用户开了减弱动效就不会动。',
      en: 'Every transition has a `motion-reduce:` fallback, so nothing animates when the user asks for reduced motion.',
    },
  ],
}
