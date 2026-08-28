import { Button } from 'aios-ui-kit/button'
import type { ComponentDoc } from '../types'

import SheetBasic from '../../examples/sheet/basic'
import SheetSides from '../../examples/sheet/sides'
import SheetSections from '../../examples/sheet/sections'
import SheetFooter from '../../examples/sheet/footer'

import basicSource from '../../examples/sheet/basic.tsx?raw'
import sidesSource from '../../examples/sheet/sides.tsx?raw'
import sectionsSource from '../../examples/sheet/sections.tsx?raw'
import footerSource from '../../examples/sheet/footer.tsx?raw'

export const sheetDoc: ComponentDoc = {
  slug: 'sheet',
  name: 'Sheet',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Dialog',
  description: {
    zh: '从屏幕边缘滑出的抽屉，四个方向都支持；`side="bottom"` 配 `sections` 时切换成移动端的 quick-settings 版式。',
    en: 'A drawer that slides in from any of the four edges; `side="bottom"` together with `sections` switches it to a mobile quick-settings layout.',
  },
  preview: () => <Button variant="outline">Open settings</Button>,
  importStatement: `import { Sheet } from 'aios-ui-kit/sheet'`,
  usageSnippet: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Settings</Button>
<Sheet open={open} onOpenChange={setOpen} title="Settings">
  …
</Sheet>`,
  composition: {
    zh: '和 Modal 一样，Sheet 不渲染 trigger，也就必须受控——不传 `open` 就永远打不开。面板底座是 Base UI 的 `Dialog`（含遮罩、焦点管理、滚动锁），内部固定三段：header（`title` + 关闭按钮，始终渲染）、正文、可选的 footer。正文有两种互斥形态：给了 `sections` 就按分区渲染并忽略 `children`，没给则把 `children` 放进一个可滚动的 body。当 `side="bottom"` 且 `sections` 存在时会进入 bottom-sheet 模式：顶部多一条装饰性的抓手，右上角的 × 换成「Done」。',
    en: 'Like Modal, Sheet renders no trigger and is therefore controlled in practice — without `open` it can never be opened. The panel sits on Base UI’s `Dialog`, which brings the backdrop, focus management, and scroll lock, and it always has three bands: a header (`title` plus the dismiss control, always rendered), the body, and an optional footer. The body comes in two mutually exclusive shapes: pass `sections` and it renders those while ignoring `children`; leave it off and `children` goes into a scrollable body. When `side="bottom"` and `sections` are combined, it enters bottom-sheet mode — a decorative grab handle appears on top and the × becomes a “Done” button.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认从行末侧滑出，宽 320px 且不超过 90vw。面板是 `flex-col`，header 与 footer 固定，只有中间的 body 滚动——这就是为什么长表单塞进来也不会把标题顶出去。`onOpenChange` 在打开与关闭时都会触发，直接把 setter 传进去就行。',
        en: 'By default it slides in from the inline-end edge at 320px wide, capped at 90vw. The panel is a `flex-col` whose header and footer are pinned while only the middle scrolls, which is why a long form never pushes the title off the top. `onOpenChange` fires in both directions, so handing it a state setter is usually all you need.',
      },
      code: basicSource,
      render: () => <SheetBasic />,
    },
    {
      id: 'sides',
      title: { zh: '四个方向', en: 'Four sides' },
      description: {
        zh: '`left` / `right` 是**逻辑**方向：它们落在 inline-start / inline-end 上，边框与圆角用 `border-s/e`，滑入方向靠 `rtl:` 变体反号——所以 `<html dir="rtl">` 下整块自动镜像，你不用改代码。`top` / `bottom` 高度自适应内容，上限 90vh。选哪一侧取决于内容与主界面的关系：侧边适合辅助面板，底部适合一次性的选择。',
        en: '`left` and `right` are *logical*: they resolve to inline-start and inline-end, the border and radius use `border-s/e`, and the slide direction is negated by an `rtl:` variant — so an RTL document mirrors the whole thing without a code change. `top` and `bottom` size to their content up to 90vh. Which edge you pick follows from how the content relates to the page: an inline edge for a companion panel, the bottom for a one-off choice.',
      },
      code: sidesSource,
      render: () => <SheetSides />,
    },
    {
      id: 'sections',
      title: { zh: '分区与 bottom sheet', en: 'Sections and the bottom sheet' },
      description: {
        zh: '`sections` 是一组 `{ title?, content }`，每段带一个小写的分区标题，段与段之间自动留 16px。它和 `children` 互斥——同时传只有 `sections` 会生效。配上 `side="bottom"` 就进入移动端版式：顶部出现抓手，关闭按钮变成「Done」。要注意抓手只是视觉暗示，它带着 `aria-hidden` 且**不支持拖拽关闭**，真正的关闭只有 Done、Esc 和点遮罩。',
        en: '`sections` is a list of `{ title?, content }`, each with a small caps heading and 16px between them. It is mutually exclusive with `children`: pass both and only `sections` renders. Add `side="bottom"` and you get the mobile layout — a grab handle on top and “Done” instead of the ×. Be aware the handle is a visual hint only: it is `aria-hidden` and **does not support drag-to-dismiss**, so the real exits are Done, Escape, and the backdrop.',
      },
      code: sectionsSource,
      render: () => <SheetSections />,
    },
    {
      id: 'footer',
      title: { zh: '底部操作区', en: 'Footer actions' },
      description: {
        zh: '`footer` 固定在面板底部，行末对齐，并带上 `env(safe-area-inset-bottom)` 的额外内边距——所以在有 home indicator 的手机上按钮不会被压在底部横条下面。和 Modal 一样，按钮不会自动关闭抽屉，关不关由你的 `onClick` 决定。',
        en: '`footer` is pinned to the bottom of the panel, aligned to the inline end, with extra padding from `env(safe-area-inset-bottom)` — so on a phone with a home indicator the buttons do not end up underneath it. As with Modal, a button does not close the drawer for you; whether it closes is decided in your `onClick`.',
      },
      code: footerSource,
      render: () => <SheetFooter />,
    },
  ],
  api: [
    {
      name: 'Sheet',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性（`aria-label`、`id`、`style` …）透传到 `Dialog.Popup`；`ref` 也指向它。',
        en: 'Native `<div>` props other than those below (`aria-label`, `id`, `style`, …) are forwarded to `Dialog.Popup`, and `ref` points at it.',
      },
      props: [
        {
          name: 'open',
          type: 'boolean',
          required: true,
          description: {
            zh: '是否打开。组件不渲染 trigger，开合完全由你掌握，所以这是必填项。',
            en: 'Whether the drawer is open. The component renders no trigger, so opening and closing is entirely yours to drive — hence required.',
          },
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: {
            zh: '开合变化回调。关闭按钮、Esc、点遮罩都会走这里。',
            en: 'Fires on every open/close — the dismiss control, Escape, and a backdrop click all land here.',
          },
        },
        {
          name: 'side',
          type: `'left' | 'right' | 'top' | 'bottom'`,
          default: `'right'`,
          description: {
            zh: '从哪一侧滑出。`left` / `right` 按逻辑方向解析，RTL 下自动镜像。',
            en: 'Which edge it slides from. `left` / `right` resolve logically and mirror under RTL.',
          },
        },
        {
          name: 'title',
          type: 'string',
          description: {
            zh: '头部标题。注意它渲染为普通 `<div>` 而不是 `Dialog.Title`，因此不会成为对话框的可访问名——见下方无障碍说明。',
            en: 'The header title. Note that it renders as a plain `<div>`, not a `Dialog.Title`, so it does not become the dialog’s accessible name — see the accessibility notes.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '正文内容。给了 `sections` 时被忽略。',
            en: 'The body content. Ignored when `sections` is present.',
          },
        },
        {
          name: 'sections',
          type: 'SheetSection[]',
          description: {
            zh: '分区式正文，与 `children` 互斥。配 `side="bottom"` 时启用 bottom-sheet 版式。',
            en: 'A sectioned body, mutually exclusive with `children`. Combined with `side="bottom"` it enables the bottom-sheet layout.',
          },
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: {
            zh: '底部操作区，含安全区内边距。',
            en: 'The action row at the bottom, including safe-area padding.',
          },
        },
        {
          name: 'full',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '铺满可用高度并去掉圆角，做成整屏抽屉。',
            en: 'Fill the available height and drop the corner radius, for a full-bleed drawer.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到面板的类名，经 `tailwind-merge` 合并——想改宽度就在这里改。',
            en: 'Extra classes on the panel, merged with `tailwind-merge` — this is where you change the width.',
          },
        },
      ],
    },
    {
      name: 'SheetSection',
      description: {
        zh: '`sections` 数组的元素类型。',
        en: 'The element type of the `sections` array.',
      },
      props: [
        {
          name: 'title',
          type: 'string',
          description: {
            zh: '分区标题。渲染为普通 `<div>`，不是标题标签，所以它不会进入读屏软件的标题列表。',
            en: 'The section heading. It renders as a plain `<div>` rather than a heading element, so it will not appear in a screen reader’s list of headings.',
          },
        },
        {
          name: 'content',
          type: 'ReactNode',
          description: { zh: '该分区的内容。', en: 'The content of that section.' },
        },
      ],
    },
    {
      name: 'sheetVariants',
      description: {
        zh: '面板的 CVA 函数。遮罩、头部、标题、正文、分区、footer、关闭按钮与抓手各有对应导出（`sheetBackdropVariants`、`sheetHeaderVariants` …）。',
        en: 'The CVA function for the panel. The backdrop, header, title, body, sections, footer, dismiss control, and handle each have their own export (`sheetBackdropVariants`, `sheetHeaderVariants`, …).',
      },
      props: [
        {
          name: 'side',
          type: `'left' | 'right' | 'top' | 'bottom'`,
          default: `'right'`,
          description: {
            zh: '落位、边框、圆角与滑入方向。',
            en: 'Placement, border, radius, and slide direction.',
          },
        },
        {
          name: 'full',
          type: 'boolean',
          default: 'false',
          description: { zh: '整屏形态。', en: 'The full-bleed form.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底座是 Base UI 的 `Dialog`：面板是 `role="dialog"` 且 `aria-modal="true"`，打开时焦点移入、关闭时还原到触发元素，页面滚动被锁住，背后内容不可 tab 到。',
      en: 'Built on Base UI’s `Dialog`: the panel is `role="dialog"` with `aria-modal="true"`, focus moves in on open and returns to the trigger on close, page scrolling is locked, and the content behind is not tabbable.',
    },
    {
      zh: '`title` 走的是 `Dialog.Title`，会自动接上 `aria-labelledby`，所以有标题的抽屉就有可读名字。两者都不传时抽屉会被读成一句无名的「对话框」——这种情况下请自己传 `aria-label`（它会透传到面板上），开发环境下也会有一条控制台警告提醒你。',
      en: '`title` goes through `Dialog.Title` and is wired to `aria-labelledby` automatically, so a titled drawer has an accessible name. With neither, the drawer announces as an unnamed “dialog” — pass your own `aria-label` in that case (it forwards to the panel); a console warning in development will point it out too.',
    },
    {
      zh: 'Esc 关闭，点击遮罩关闭，关闭按钮最小 44×44px。× 没有可读文本，所以带 `aria-label="Close"`；bottom-sheet 模式下按钮上写着「Done」，就不再另加 `aria-label`——屏幕上写什么，读屏就念什么。',
      en: 'Escape closes it, so does a backdrop click, and the dismiss control has a 44×44px minimum. The × carries `aria-label="Close"` because it has no readable text of its own; in bottom-sheet mode the button says “Done” and gets no `aria-label`, so the announced name matches what is on screen.',
    },
    {
      zh: '抓手是纯装饰，带 `aria-hidden="true"`，不参与 tab 序列，也不支持拖拽关闭——它的 `cursor-grab` 只是视觉暗示，别把它当成唯一的关闭方式来设计。',
      en: 'The grab handle is decorative: `aria-hidden="true"`, out of the tab order, and it does not support drag-to-dismiss. Its `cursor-grab` is a hint and nothing more, so never design around it as the way out.',
    },
    {
      zh: '面板 `max-h-screen` 且 body 独立滚动，footer 额外带 `env(safe-area-inset-bottom)` 内边距，在有 home indicator 的设备上按钮不会被遮。',
      en: 'The panel is capped at `max-h-screen` with an independently scrolling body, and the footer adds `env(safe-area-inset-bottom)` padding so buttons stay clear of a home indicator.',
    },
    {
      zh: '滑入用 `--duration-spring-slow` 进慢出快。减弱动效关掉过渡，但**不会**把位移清成 identity——关着的抽屉必须停在屏幕外。',
      en: 'The slide uses `--duration-spring-slow`, slower in than out. Reduced motion drops the transition but **does not** reset translation to identity — a closed drawer has to stay off-screen.',
    },
  ],
}
