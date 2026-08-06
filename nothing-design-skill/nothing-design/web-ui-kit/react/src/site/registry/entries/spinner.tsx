import { Spinner } from 'aios-ui-kit/spinner'
import type { ComponentDoc } from '../types'

import SpinnerVariants from '../../examples/spinner/variants'
import SpinnerSizes from '../../examples/spinner/sizes'
import SpinnerItems from '../../examples/spinner/items'
import SpinnerInContext from '../../examples/spinner/in-context'

import variantsSource from '../../examples/spinner/variants.tsx?raw'
import sizesSource from '../../examples/spinner/sizes.tsx?raw'
import itemsSource from '../../examples/spinner/items.tsx?raw'
import inContextSource from '../../examples/spinner/in-context.tsx?raw'

export const spinnerDoc: ComponentDoc = {
  slug: 'spinner',
  name: 'Spinner',
  category: 'decoration',
  status: 'stable',
  description: {
    zh: '随机决策转盘：点一下 SPIN，指针停在某个扇区上。注意它不是 loading 指示器——那个在 `Button` 的 `loading` 与 `ProgressBar` 里。',
    en: 'A random-decision wheel: press SPIN and the pointer lands on a sector. Despite the name it is not a loading indicator — those live in `Button`’s `loading` prop and in `ProgressBar`.',
  },
  preview: () => <Spinner size="sm" items={['YES', 'NO', 'MAYBE']} />,
  importStatement: `import { Spinner } from 'aios-ui-kit/spinner'`,
  usageSnippet: `<Spinner items={['YES', 'NO', 'MAYBE']} />`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '`variant` 只作用在外框上——盘面本身的配色是固定的（扇区交替填 display 色与 raised 表面，指针和命中扇区用单点红）。`soft` 有底色，`outline` 只留边框，`destructive` 把整块底换成红色淡底，适合「后果不可逆」的抽选。',
        en: '`variant` only touches the outer frame; the dial’s own palette is fixed, with sectors alternating between the display colour and the raised surface and the red reserved for the pointer and the winning sector. `soft` has a fill, `outline` keeps just the border, and `destructive` tints the whole frame red for draws with consequences.',
      },
      code: variantsSource,
      render: () => <SpinnerVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '盘面直径分别是 192 / 280 / 360px，外加 16 / 32 / 48px 的内边距。这是个占地很大的组件，`sm` 已经是能看清扇区文字的下限——再小就得减少扇区数量，而不是继续缩盘面。',
        en: 'The dial measures 192 / 280 / 360px across, plus 16 / 32 / 48px of padding. This is a large component, and `sm` is already the floor for legible sector labels — below that you should cut the number of sectors rather than shrink the dial further.',
      },
      code: sizesSource,
      render: () => <SpinnerSizes />,
    },
    {
      id: 'items',
      title: { zh: '扇区内容', en: 'Sector labels' },
      description: {
        zh: '`items` 的长度决定扇区数，扇区角度平均分配，所以每个选项的概率是相等的——需要加权抽选就得自己实现。文字沿半径方向排布，字号固定：选项多或字长时会挤在一起，实测 6 个短词是舒适上限。',
        en: 'The length of `items` sets the sector count, and the angles are split evenly, so every option is equally likely — weighted draws are something you would have to build yourself. Labels are laid out along the radius at a fixed type size, so long words or many options start colliding; six short words is the comfortable ceiling.',
      },
      code: itemsSource,
      render: () => <SpinnerItems />,
    },
    {
      id: 'in-context',
      title: { zh: '放进界面里', en: 'In context' },
      description: {
        zh: '转盘自带 SPIN 按钮与结果行，是个完整的小功能块，所以嵌进 `Card` 时通常选 `outline` 变体——否则两层边框和两层底色叠在一起会显得浑浊。结果只存在组件内部状态里，外面拿不到：需要知道抽到了什么，目前得自己实现一个转盘。',
        en: 'The wheel ships with its own SPIN button and result line, so it is a self-contained feature block; inside a `Card`, the `outline` variant usually reads cleaner than stacking two borders and two fills. The result lives in internal state and is not exposed, so if your code needs to know what came up, you currently have to build your own wheel.',
      },
      code: inContextSource,
      render: () => <SpinnerInContext />,
    },
  ],
  api: [
    {
      name: 'Spinner',
      description: {
        zh: '渲染为 `<div>`，透传原生 div 属性。`children` 被移除——内容完全由 `items` 决定。',
        en: 'Renders a `<div>` and forwards native div props. `children` is omitted from the type; the content comes entirely from `items`.',
      },
      props: [
        {
          name: 'items',
          type: 'string[]',
          default: `['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY']`,
          description: {
            zh: '扇区文案。长度即扇区数，每项概率相等。',
            en: 'The sector labels. Their count is the sector count, and each is equally likely.',
          },
        },
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'destructive'`,
          default: `'soft'`,
          description: {
            zh: '外框样式。v1 的 `default` 与 `accent` 仍被接受，分别映射到 `soft` 与 `destructive`。',
            en: 'Frame style. The v1 names `default` and `accent` still work, mapping to `soft` and `destructive`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '盘面直径与内边距。', en: 'Dial diameter and padding.' },
        },
        {
          name: 'spinDuration',
          type: 'number',
          default: '3500',
          description: {
            zh: '兜底计时器的时长（ms）。注意盘面旋转的 CSS 时长是硬编码的 3500ms，这个 prop 只影响 `transitionend` 没触发时的补救时机——设成小于 3500 会让结果在盘还没停时就出现，建议保持默认。',
            en: 'The fallback timer in milliseconds. The dial’s CSS rotation is a hardcoded 3500ms, and this prop only schedules the safety net for when `transitionend` never fires — setting it below 3500 reveals the result while the dial is still moving, so leaving it alone is the safe choice.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，落在外框上。经 `tailwind-merge` 合并。',
            en: 'Extra classes on the frame, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'spinnerVariants',
      description: {
        zh: '生成外框类名的 CVA 函数。盘面、扇区、文字各有自己的 CVA，其中 `spinnerSectorVariants` 与 `spinnerTextVariants` 也从子路径导出，可用于自己画盘面。',
        en: 'The CVA function for the frame. The dial, sectors, and labels have their own CVAs; `spinnerSectorVariants` and `spinnerTextVariants` are exported from the subpath too, for drawing your own dial.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'destructive'`,
          default: `'soft'`,
          description: {
            zh: '同上。不接受 v1 别名，需要先过 `resolveSpinnerVariant`。',
            en: 'Same as above. It does not take the v1 aliases, so run them through `resolveSpinnerVariant` first.',
          },
        },
        {
          name: 'size',
          type: 'SpinnerSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'SPIN 是一个真正的 `Button`，所以启动转盘这件事本身是完全可键盘操作的：tab 过去、Enter 或 Space 即可，转动期间它处于 `loading`，带 `aria-busy` 且不可重复触发。',
      en: 'SPIN is a real `Button`, so starting the wheel is fully keyboard-operable: tab to it and press Enter or Space. While the dial turns it is in its `loading` state, which sets `aria-busy` and blocks a second trigger.',
    },
    {
      zh: '盘面是纯 SVG，没有 `role`、没有 `aria-label`，扇区文字是 `<text>`——读屏用户能读到所有选项，但读不出「哪一个被选中了」，因为命中只由描边颜色表达。',
      en: 'The dial is bare SVG with no `role` and no `aria-label`, and the sector labels are `<text>` nodes. A screen-reader user can read every option but cannot tell which one won, because the outcome is expressed only as a stroke colour.',
    },
    {
      zh: '结果行是普通 `<div>`，不是 live region。也就是说抽签结束时不会有任何播报。真的要让所有人用得上，请在外层包一个 `role="status"` 的容器自己复述结果——组件目前没有暴露结果，这也是它的主要局限。',
      en: 'The result line is a plain `<div>`, not a live region, so nothing is announced when a spin finishes. Making this usable for everyone means restating the outcome yourself inside a `role="status"` region — and since the component does not expose the result, that is its main limitation today.',
    },
    {
      zh: '指针带 `aria-hidden`，位置用 `start-1/2` 与 `rtl:` 兜底，RTL 布局下不会跑偏。',
      en: 'The pointer is `aria-hidden` and positioned with `start-1/2` plus an `rtl:` correction, so it stays put in right-to-left layouts.',
    },
    {
      zh: '3.5 秒的旋转带 `motion-reduce:transition-none`：开启减弱动效后盘面直接跳到结果角度，不会有长时间的转动——对晕动症用户这很关键，因为这是全库转动幅度最大的动效。',
      en: 'The 3.5-second rotation is gated by `motion-reduce:transition-none`, so under reduced motion the dial jumps straight to its final angle. That matters more here than anywhere else in the library, since this is the largest sustained motion it produces.',
    },
    {
      zh: '扇区颜色只有 display 色与 raised 表面两种交替，不承载信息；命中状态额外靠 3px 红描边——单靠颜色区分的信息请务必在别处复述。',
      en: 'Sector fills only alternate between the display colour and the raised surface and carry no information; the winner is marked by a 3px red stroke. Anything conveyed by colour alone needs restating elsewhere.',
    },
  ],
}
