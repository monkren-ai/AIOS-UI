import { Alert } from 'aios-ui-kit/alert'
import type { ComponentDoc } from '../types'

import AlertVariants from '../../examples/alert/variants'
import AlertSizes from '../../examples/alert/sizes'
import AlertWithIcon from '../../examples/alert/with-icon'
import AlertDismissible from '../../examples/alert/dismissible'

import variantsSource from '../../examples/alert/variants.tsx?raw'
import sizesSource from '../../examples/alert/sizes.tsx?raw'
import withIconSource from '../../examples/alert/with-icon.tsx?raw'
import dismissibleSource from '../../examples/alert/dismissible.tsx?raw'

export const alertDoc: ComponentDoc = {
  slug: 'alert',
  name: 'Alert',
  category: 'feedback',
  status: 'stable',
  description: {
    zh: '成块的提示信息，顶部有一条状态色粗边；`destructive` 是唯一用 Nothing 红的一档。',
    en: 'A block-level message with a status rule across the top; `destructive` is the only tone that uses the Nothing red.',
  },
  preview: () => (
    <Alert className="w-full max-w-md" title="Firmware 2.6.1">
      Installs on the next restart.
    </Alert>
  ),
  importStatement: `import { Alert } from 'aios-ui-kit/alert'`,
  usageSnippet: `<Alert title="Firmware 2.6.1">Installs on the next restart.</Alert>`,
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '只有两档，这是刻意的：单色系统里 info / success / warning 三种颜色互相区分度很低，用颜色编码状态反而不可靠。所以 Alert 靠文案说清严重程度，只在真的出错时切到 `destructive`——顶边和标题一起变红。这也意味着 `variant` 同时决定了 role（见下方无障碍说明）。',
        en: 'There are only two tones, deliberately. In a monochrome system, info / success / warning would be nearly indistinguishable, so colour-coding severity is not something you can rely on. Alert leaves severity to the wording and switches to `destructive` only when something is actually wrong, turning the top rule and the title red. That choice also decides the role — see the accessibility notes below.',
      },
      code: variantsSource,
      render: () => <AlertVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 同时改内边距与字号。顶边固定 3px，所以上方内边距要比其它三边多一点，才能看起来对齐——这个补偿已经写进变体里，不用你自己调。',
        en: '`size` changes padding and type size together. The top rule is a fixed 3px, so the block-start padding runs slightly larger than the other three sides to look optically even; that compensation is baked into the variant.',
      },
      code: sizesSource,
      render: () => <AlertSizes />,
    },
    {
      id: 'with-icon',
      title: { zh: '图标与标题', en: 'Icon and title' },
      description: {
        zh: '`icon` 挂在起始侧，`title` 是可选的等宽粗体行。图标槽带 `aria-hidden`，所以它只能重复文案已经表达的意思，不能是唯一的信息来源。图标尺寸由你控制——组件不会缩放它，示例里手写了 `size-4`。',
        en: '`icon` sits on the inline-start side and `title` is an optional bold monospaced line. The icon slot is `aria-hidden`, so it may only restate what the text already says and can never be the sole carrier of meaning. Sizing is yours: the component does not scale the glyph, which is why the examples pass `size-4`.',
      },
      code: withIconSource,
      render: () => <AlertWithIcon />,
    },
    {
      id: 'dismissible',
      title: { zh: '可关闭', en: 'Dismissible' },
      description: {
        zh: '传 `onClose` 才会出现关闭按钮。组件不会自己卸载——它先播 220ms 的退场（只有 opacity 与位移，没有阴影或缩放），结束后才回调，由你把它从树里移除。这样退场动画能真正播完；如果你在 `onClose` 里立刻卸载，看到的就是完整动画后的自然消失。',
        en: 'The close button appears only when you pass `onClose`. The component never unmounts itself: it plays a 220ms exit first — opacity and a small translate, nothing else — and calls back afterwards, leaving the removal to you. That ordering is what lets the exit actually finish, so unmounting inside `onClose` looks correct rather than abrupt.',
      },
      code: dismissibleSource,
      render: () => <AlertDismissible />,
    },
  ],
  api: [
    {
      name: 'Alert',
      description: {
        zh: '渲染为 `<div>`，透传所有原生 div 属性。`role` 由 `variant` 决定，但可以被你传入的 `role` 覆盖。',
        en: 'Renders a `<div>` and forwards every native div prop. The `role` is derived from `variant`, but a `role` you pass wins.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'destructive'`,
          default: `'soft'`,
          description: {
            zh: '视觉样式，同时决定 role。v1 的 `default` 仍被接受，映射到 `soft`。',
            en: 'Visual style, and the source of the role. The v1 name `default` still works and maps to `soft`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '内边距与字号。', en: 'Padding and type size.' },
        },
        {
          name: 'title',
          type: 'string',
          description: {
            zh: '标题行，等宽粗体。只接受字符串。',
            en: 'The bold monospaced title line. Strings only.',
          },
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: {
            zh: '起始侧的图标。槽位带 `aria-hidden`，尺寸由你自己给。',
            en: 'An icon on the inline-start side. The slot is `aria-hidden`, and you size the glyph yourself.',
          },
        },
        {
          name: 'onClose',
          type: '() => void',
          description: {
            zh: '传入后渲染关闭按钮。点击先播 220ms 退场，动画结束才回调。',
            en: 'Passing it renders the close button. A click plays the 220ms exit first and calls back when it ends.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '正文内容。', en: 'The message body.' },
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
      name: 'alertVariants',
      description: {
        zh: '生成外层容器类名的 CVA 函数。图标、标题、正文各有自己的 CVA，但没有从子路径导出——需要完全自定义结构时，直接照 `data-slot` 写样式更省事。',
        en: 'The CVA function for the outer container. The icon, title, and message have their own CVAs, but those are not exported from the subpath — when you need a fully custom structure, styling by `data-slot` is the easier path.',
      },
      props: [
        {
          name: 'variant',
          type: `'soft' | 'destructive'`,
          default: `'soft'`,
          description: {
            zh: '同上。注意这里不接受 v1 别名，需要先过 `resolveAlertVariant`。',
            en: 'Same as above. It does not take the v1 alias, so run it through `resolveAlertVariant` first.',
          },
        },
        {
          name: 'size',
          type: 'AlertSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '`variant` 直接决定 role：`destructive` 用 `role="alert"`，其余用 `role="status"`。前者是 assertive 的，会打断读屏当前的播报；后者是 polite 的，等用户手上的事说完再插入。',
      en: 'The `variant` picks the role: `destructive` gets `role="alert"`, everything else gets `role="status"`. The first is assertive and interrupts whatever the screen reader is saying; the second is polite and waits its turn.',
    },
    {
      zh: '这个映射是这个组件最容易踩的地方：把一条普通提示写成 `destructive` 只为了「显眼一点」，代价是每次渲染都会打断读屏用户。反过来，真正的失败信息如果用了 `soft`，可能就被完全错过。',
      en: 'That mapping is the easiest thing to get wrong here. Reaching for `destructive` just to make a routine notice louder means interrupting screen-reader users on every render; conversely, a genuine failure left on `soft` can be missed entirely.',
    },
    {
      zh: '两个 role 都是 live region，所以 Alert 要在页面已经渲染之后才插入才会被播报。首屏就存在的静态提示不会触发播报——那种情况下它其实是普通内容，用 `Card` 更诚实。',
      en: 'Both roles are live regions, which means the alert has to be inserted after the page has rendered to be announced at all. A notice that is present on first paint says nothing; at that point it is ordinary content, and a `Card` would be the honest choice.',
    },
    {
      zh: '关闭按钮是真正的 `<button>`，带 `aria-label="Close alert"`。一屏里出现多条可关闭 Alert 时这个标签不够具体，建议自己覆盖成能区分的文案。',
      en: 'The close control is a real `<button>` labelled `aria-label="Close alert"`. With several dismissible alerts on screen that label stops being distinguishable, so override it with something specific.',
    },
    {
      zh: '关闭按钮上的焦点会在 220ms 后随元素一起消失。如果 Alert 是用户操作的结果，记得在 `onClose` 里把焦点交回触发它的控件，否则焦点会掉回 `<body>`。',
      en: 'Focus sitting on the close button vanishes with the element 220ms later. When the alert was the result of a user action, move focus back to the triggering control inside `onClose`, or it falls to `<body>`.',
    },
    {
      zh: '图标槽是 `aria-hidden="true"`，所以「用一个警告三角表示严重程度」在这里完全传达不到读屏用户。严重程度必须写在 `title` 或正文里。',
      en: 'The icon slot is `aria-hidden="true"`, so a warning triangle conveys nothing to a screen-reader user. Severity has to be stated in the `title` or the body text.',
    },
    {
      zh: '退场只用 opacity 与 1.5px 的位移，并带 `motion-reduce:transition-none`——开启减弱动效后直接消失，不会有位移。',
      en: 'The exit is opacity plus a 1.5px translate, with `motion-reduce:transition-none`, so under reduced motion it simply disappears without moving.',
    },
  ],
}
