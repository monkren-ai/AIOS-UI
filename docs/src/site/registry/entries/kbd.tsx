import { Kbd } from 'aios-ui-kit/kbd'
import type { ComponentDoc } from '../types'

import KbdVariants from '../../examples/kbd/variants'
import KbdSizes from '../../examples/kbd/sizes'
import KbdCombinations from '../../examples/kbd/combinations'
import KbdInContext from '../../examples/kbd/in-context'

import variantsSource from '../../examples/kbd/variants.tsx?raw'
import sizesSource from '../../examples/kbd/sizes.tsx?raw'
import combinationsSource from '../../examples/kbd/combinations.tsx?raw'
import inContextSource from '../../examples/kbd/in-context.tsx?raw'

export const kbdDoc: ComponentDoc = {
  slug: 'kbd',
  name: 'Kbd',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '键位标记，用于展示快捷键。',
    en: 'A key cap for rendering keyboard shortcuts.',
  },
  preview: () => <Kbd keys={['⌘', 'K']} />,
  importStatement: `import { Kbd } from 'aios-ui-kit/kbd'`,
  usageSnippet: `<Kbd keys={['⌘', 'K']} />`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '键帽在 AIOS 的语言里只是一块方角的 surface——一条 border 划出边界，不用阴影去伪造按键的立体感。`soft` 有底色，最像实体键；`outline` 只留边，适合已经在 surface 上；`ghost` 连边都去掉，用在正文里不打断阅读节奏。',
        en: 'A key cap here is just a square-cornered surface: one border defines it, and no shadow fakes physical depth. `soft` has a fill and reads most like a real key, `outline` keeps only the hairline for use on an existing surface, and `ghost` drops even that so it does not interrupt running text.',
      },
      code: variantsSource,
      render: () => <KbdVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档高度是 16 / 20 / 24px，每档都带等于高度的 `min-w`，所以 `K` 这种单字符键是正方而不是被压扁的窄条，`Esc` 则自然撑开。放在正文里通常降一档（`sm`），跟周围的字号比才不会显得突出。',
        en: 'The three heights are 16 / 20 / 24px, and each sets a `min-w` equal to its height — so a single character like `K` stays square instead of collapsing into a sliver, while `Esc` widens naturally. Inside body copy, drop one step to `sm` so the cap does not out-shout the surrounding type.',
      },
      code: sizesSource,
      render: () => <KbdSizes />,
    },
    {
      id: 'combinations',
      title: { zh: '组合键', en: 'Key combinations' },
      description: {
        zh: '`keys` 会为每个键各渲染一个 `<kbd>`，外层再套一个 `<kbd>` 把它们串起来——这正是 HTML 规范建议的组合键写法。连接符默认是 `+`，可以换成 `then` 之类的词来表达「依次按下」而不是「同时按下」。传了 `keys` 时 `children` 会被忽略。',
        en: '`keys` renders one `<kbd>` per key inside an outer `<kbd>`, which is exactly how the HTML spec suggests marking up a combination. The joiner defaults to `+`, and swapping it for a word like `then` is how you express a sequence rather than a chord. When `keys` is set, `children` is ignored.',
      },
      code: combinationsSource,
      render: () => <KbdCombinations />,
    },
    {
      id: 'in-context',
      title: { zh: '放进界面里', en: 'In context' },
      description: {
        zh: 'Kbd 最常出现在两个位置：正文里说明「按什么键」，以及菜单项右侧标注快捷键。前者用 `sm` + 默认变体，后者用 `ghost`——菜单项自己已经有背景和边界，再叠一层实心键帽会显得脏。',
        en: 'Two places account for almost every key cap: inline prose explaining which key to press, and the trailing hint on a menu row. The first wants `sm` with the default variant; the second wants `ghost`, because the row already has its own surface and border and a second solid box on top just reads as clutter.',
      },
      code: inContextSource,
      render: () => <KbdInContext />,
    },
  ],
  api: [
    {
      name: 'Kbd',
      description: {
        zh: '渲染为原生 `<kbd>`，透传所有原生属性（`title`、`aria-*`、`ref` …）。',
        en: 'Renders a native `<kbd>` and forwards every native prop (`title`, `aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'keys',
          type: 'string[]',
          description: {
            zh: '一次渲染一串键。传了它就走嵌套 `<kbd>` 结构，并忽略 `children`。',
            en: 'Render a whole combination at once. Passing it switches to the nested `<kbd>` structure and ignores `children`.',
          },
        },
        {
          name: 'separator',
          type: 'string',
          default: `'+'`,
          description: {
            zh: '`keys` 之间的连接符。只在传了 `keys` 时有意义。',
            en: 'The joiner between `keys`. Only meaningful alongside `keys`.',
          },
        },
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'ghost'`,
          default: `'soft'`,
          description: { zh: '视觉样式。', en: 'Visual style.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '键帽高度与字号。', en: 'Cap height and type size.' },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '单个键的内容。与 `keys` 互斥，后者优先。',
            en: 'The content of a single key. Mutually exclusive with `keys`, which wins.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并；注意 `keys` 形态下它落在外层容器上，不是每个键帽上。',
            en: 'Extra classes, merged via `tailwind-merge`. In the `keys` form it lands on the outer wrapper, not on each cap.',
          },
        },
      ],
    },
    {
      name: 'kbdVariants',
      description: {
        zh: '生成键帽类名的 CVA 函数。用于自己拼组合键结构，或者给已经存在的 `<kbd>` 套上样式。',
        en: 'The CVA function behind the cap styling. Use it when assembling your own combination markup, or to style an existing `<kbd>`.',
      },
      props: [
        {
          name: 'variant',
          type: 'KbdVariant',
          default: `'soft'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'KbdSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染的是原生 `<kbd>`，语义就是「用户要输入的内容」。不要用 `<span>` 加样式代替它——`<kbd>` 是少数读屏软件真的会区别对待的元素之一。',
      en: 'It renders a native `<kbd>`, whose meaning is “input the user should type”. Do not fake it with a styled `<span>`: `<kbd>` is one of the few elements screen readers genuinely treat differently.',
    },
    {
      zh: '`keys` 形态下每个键各自是一个 `<kbd>`，外层 `<kbd>` 把整个组合包起来，符合 HTML 规范对组合键的建议写法。',
      en: 'In the `keys` form each key is its own `<kbd>` wrapped in an outer `<kbd>`, matching the markup the HTML spec recommends for combinations.',
    },
    {
      zh: '连接符（`+`、`then`）带 `aria-hidden="true"`。读屏会连续念出各个键名，不会插进一个孤零零的加号——但这也意味着「同时按」还是「依次按」的区别在语音里会丢，需要在正文里说清。',
      en: 'The joiner (`+`, `then`) is `aria-hidden="true"`, so a screen reader reads the key names in sequence without a stray plus sign. The flip side: the chord-versus-sequence distinction is lost in speech, so spell it out in the surrounding prose.',
    },
    {
      zh: '`⌘`、`⌥` 这类符号在读屏里的播报很不一致。面向所有平台的说明文档里，写 `Cmd` / `Ctrl` 这样的词，或者给 Kbd 补一个 `aria-label`，比只放符号可靠。',
      en: 'Symbols like `⌘` and `⌥` are announced inconsistently across screen readers. In cross-platform docs, spelled-out words such as `Cmd` and `Ctrl` — or an explicit `aria-label` on the Kbd — are more reliable than the glyph alone.',
    },
    {
      zh: 'Kbd 只是标记，不会替你绑定快捷键。真正的按键监听在你自己的代码里，两边必须手动保持一致——文档写着 `⌘K` 而实际监听的是 `⌘J`，比不写快捷键更糟。',
      en: 'A Kbd only labels a shortcut; it never binds one. The listener lives in your own code, and the two have to be kept in sync by hand — a cap that says `⌘K` while the handler listens for `⌘J` is worse than no hint at all.',
    },
    {
      zh: '键帽不可聚焦、不在 tab 序列里，也没有任何动效——所以在减弱动效偏好下无需额外处理。',
      en: 'A cap is not focusable, not in the tab order, and has no animation at all, so there is nothing to gate behind a reduced-motion preference.',
    },
  ],
}
