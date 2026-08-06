import { Button } from 'aios-ui-kit/button'
import type { ComponentDoc } from '../types'

import ButtonVariants from '../../examples/button/variants'
import ButtonSizes from '../../examples/button/sizes'
import ButtonWithIcon from '../../examples/button/with-icon'
import ButtonLoading from '../../examples/button/loading'
import ButtonAsLink from '../../examples/button/as-link'

import variantsSource from '../../examples/button/variants.tsx?raw'
import sizesSource from '../../examples/button/sizes.tsx?raw'
import withIconSource from '../../examples/button/with-icon.tsx?raw'
import loadingSource from '../../examples/button/loading.tsx?raw'
import asLinkSource from '../../examples/button/as-link.tsx?raw'

export const buttonDoc: ComponentDoc = {
  slug: 'button',
  name: 'Button',
  category: 'actions-inputs',
  status: 'stable',
  baseUi: 'Button',
  description: {
    zh: '触发动作的按钮，提供七种视觉样式与三档尺寸。',
    en: 'A clickable button for actions, in seven styles and three sizes.',
  },
  preview: () => <Button>Click me</Button>,
  importStatement: `import { Button } from 'aios-ui-kit/button'`,
  usageSnippet: `<Button>Click me</Button>`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`variant` 决定视觉样式。primary 是反相实心，destructive 是全库唯一使用 Nothing 红的按钮。',
        en: '`variant` sets the visual style. primary is inverted solid; destructive is the only button that reaches for the Nothing red.',
      },
      code: variantsSource,
      render: () => <ButtonVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档高度分别是 36 / 44 / 52px。md 正好等于 44px 的最小可点击区域，所以它是默认值。',
        en: 'The three heights are 36 / 44 / 52px. md lands exactly on the 44px minimum touch target, which is why it is the default.',
      },
      code: sizesSource,
      render: () => <ButtonSizes />,
    },
    {
      id: 'with-icon',
      title: { zh: '带图标', en: 'With an icon' },
      description: {
        zh: '给图标标上 `data-icon="start"` 或 `data-icon="end"`，按钮就会留出对应一侧的内间距——用的是逻辑属性，RTL 下自动换边。纯图标按钮请用 `icon-*` 尺寸并补 `aria-label`。',
        en: 'Mark an icon with `data-icon="start"` or `data-icon="end"` and the button reserves the inner spacing on that side — via logical properties, so RTL flips it automatically. Use an `icon-*` size for icon-only buttons, and always give them an `aria-label`.',
      },
      code: withIconSource,
      render: () => <ButtonWithIcon />,
    },
    {
      id: 'loading',
      title: { zh: '加载态', en: 'Loading state' },
      description: {
        zh: '`loading` 会插入 spinner、置上 `aria-busy` 并禁用按钮，`loadingText` 可以顺带把文案换掉。',
        en: '`loading` inserts a spinner, sets `aria-busy`, and disables the button; `loadingText` swaps the label at the same time.',
      },
      code: loadingSource,
      render: () => <ButtonLoading />,
    },
    {
      id: 'as-link',
      title: { zh: '做成链接', en: 'As a link' },
      description: {
        zh: '链接就应该还是链接。想让 `<a>` 长得像按钮，把 `buttonVariants()` 的类名贴上去即可，不要把 `<a>` 塞进 `Button` 渲染——那会把按钮语义硬套到链接上，读屏软件会读错。',
        en: "A link should stay a link. To make an `<a>` look like a button, apply the `buttonVariants()` classes to it directly — don't render the `<a>` through `Button`, which would force button semantics onto a link and mislead assistive tech.",
      },
      code: asLinkSource,
      render: () => <ButtonAsLink />,
    },
  ],
  api: [
    {
      name: 'Button',
      description: {
        zh: '透传所有原生 `<button>` 属性（`onClick`、`type`、`aria-*`、`ref` …）到 Base UI 的 Button。',
        en: 'Forwards every native `<button>` prop (`onClick`, `type`, `aria-*`, `ref`, …) through to Base UI’s Button.',
      },
      props: [
        {
          name: 'variant',
          type: `'primary' | 'primary-outline' | 'secondary' | 'soft' | 'outline' | 'ghost' | 'destructive'`,
          default: `'primary'`,
          description: { zh: '视觉样式。', en: 'Visual style.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`,
          default: `'md'`,
          description: {
            zh: '高度与内边距。`icon-*` 是正方形，用于纯图标按钮。',
            en: 'Height and padding. The `icon-*` sizes are square, for icon-only buttons.',
          },
        },
        {
          name: 'fullWidth',
          type: 'boolean',
          default: 'false',
          description: { zh: '撑满父容器宽度。', en: 'Stretch to the container width.' },
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '展示 spinner、禁用交互并置上 `aria-busy`。',
            en: 'Show a spinner, block interaction, and set `aria-busy`.',
          },
        },
        {
          name: 'loadingText',
          type: 'string',
          description: {
            zh: 'loading 期间替换的文案；不传则保留原 children。',
            en: 'Label shown while loading; falls back to the original children.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '按下态，映射到 `aria-pressed` 与 `data-active`。',
            en: 'Pressed state, mapped to `aria-pressed` and `data-active`.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用交互，并置上 `data-disabled` 供样式选择。',
            en: 'Disable interaction and set `data-disabled` for styling.',
          },
        },
        {
          name: 'render',
          type: 'ReactElement | ((props, state) => ReactElement)',
          description: {
            zh: '换成别的元素，或与其它组件组合。',
            en: 'Replace the element, or compose with another component.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，所以能覆盖变体自带的工具类。',
            en: 'Extra classes. Merged via `tailwind-merge`, so they override the variant’s own utilities.',
          },
        },
      ],
    },
    {
      name: 'buttonVariants',
      description: {
        zh: '生成按钮类名的 CVA 函数。适合用在需要保留原生语义的元素上（典型是 `<a>`）。',
        en: 'The CVA function behind the class names. Use it on elements that must keep their own semantics — typically an `<a>`.',
      },
      props: [
        {
          name: 'variant',
          type: 'ButtonVariant',
          default: `'primary'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'ButtonSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染为原生 `<button>`，天然可聚焦、在 tab 序列内，Enter 与 Space 都能激活。',
      en: 'Renders a native `<button>`, so it is focusable, in the tab order, and activated by both Enter and Space.',
    },
    {
      zh: '`disabled` 会移出 tab 序列并置上 `data-disabled`，同时通过 `pointer-events-none` 关掉指针交互。',
      en: '`disabled` removes it from the tab order, sets `data-disabled`, and turns off pointer interaction via `pointer-events-none`.',
    },
    {
      zh: '纯图标按钮没有可读文本，必须自己补 `aria-label`。',
      en: 'Icon-only buttons have no text content, so you must supply an `aria-label`.',
    },
    {
      zh: 'loading 期间置 `aria-busy="true"`，读屏软件会播报忙碌状态。',
      en: '`aria-busy="true"` is set while loading, so screen readers announce the busy state.',
    },
    {
      zh: '所有过渡都带 `motion-reduce:` 兜底，用户开了减弱动效就不会动。',
      en: 'Every transition has a `motion-reduce:` fallback, so nothing animates when the user asks for reduced motion.',
    },
  ],
}
