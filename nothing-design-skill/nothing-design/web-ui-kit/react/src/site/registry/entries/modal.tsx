import { Button } from 'nothing-ui/button'
import type { ComponentDoc } from '../types'

import ModalBasic from '../../examples/modal/basic'
import ModalWithFooter from '../../examples/modal/with-footer'
import ModalAlert from '../../examples/modal/alert'
import ModalDestructive from '../../examples/modal/destructive'
import ModalHeadless from '../../examples/modal/headless'

import basicSource from '../../examples/modal/basic.tsx?raw'
import withFooterSource from '../../examples/modal/with-footer.tsx?raw'
import alertSource from '../../examples/modal/alert.tsx?raw'
import destructiveSource from '../../examples/modal/destructive.tsx?raw'
import headlessSource from '../../examples/modal/headless.tsx?raw'

export const modalDoc: ComponentDoc = {
  slug: 'modal',
  name: 'Modal',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Dialog / AlertDialog',
  description: {
    zh: '模态对话框，打开时锁定焦点并接管页面；`variant="alert"` 切换到必须作答的确认框。',
    en: 'A modal dialog that traps focus and takes over the page; `variant="alert"` switches it to a confirmation the user has to answer.',
  },
  preview: () => <Button>Open modal</Button>,
  importStatement: `import { Modal } from 'nothing-ui/modal'`,
  usageSnippet: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Firmware 2.6.1">
  Installs on the next restart.
</Modal>`,
  composition: {
    zh: 'Modal 不渲染 trigger——触发按钮是你自己的，组件只接 `open`。这意味着它实际上必须受控：不传 `open` 时内部状态恒为 `false`，永远没人能把它打开。面板本身由 props 拼装：`title` 出头部，`children` 出正文，`footer` 出底部操作区，三块都带 `data-slot`。`variant="alert"` 会整体换底座——从 Base UI 的 `Dialog` 换成 `AlertDialog`，去掉右上角的 ×，并用 `confirmLabel` / `cancelLabel` 自己渲染两颗按钮。',
    en: 'Modal renders no trigger: the button is yours, the component only takes `open`. That makes it controlled in practice — leave `open` off and the internal state stays `false` forever, so nothing can ever open it. The panel is assembled from props: `title` becomes the header, `children` the body, `footer` the action row, each with its own `data-slot`. `variant="alert"` swaps the foundation underneath — Base UI’s `AlertDialog` instead of `Dialog` — drops the × in the corner, and renders its own pair of buttons from `confirmLabel` / `cancelLabel`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`title` 渲染为 Base UI 的 `Dialog.Title` 并自动接上 `aria-labelledby`，所以只要有标题，对话框就有可读名字。关闭有三条路：右上角的 ×、Esc、点击遮罩——三者最终都走 `onClose`，你只需要在那里把 `open` 置 false。',
        en: '`title` renders as Base UI’s `Dialog.Title` and is wired to `aria-labelledby` automatically, so a titled dialog always has an accessible name. There are three ways out — the × in the corner, Escape, and a click on the backdrop — and all three land in `onClose`, where your only job is to set `open` back to false.',
      },
      code: basicSource,
      render: () => <ModalBasic />,
    },
    {
      id: 'with-footer',
      title: { zh: '底部操作区', en: 'Footer actions' },
      description: {
        zh: '`footer` 是一块自由内容，靠行末对齐。组件不会替你在点击后关闭对话框——按钮的 `onClick` 里既要做业务，也要把 `open` 置 false。这份「不自动关」是刻意的：保存失败时对话框应该留在原地。',
        en: '`footer` is free-form content, aligned to the inline end. The component will not close the dialog for you — each button’s `onClick` does the work *and* sets `open` to false. That is deliberate: when a save fails, the dialog should stay put rather than vanish with the error.',
      },
      code: withFooterSource,
      render: () => <ModalWithFooter />,
    },
    {
      id: 'alert',
      title: { zh: '确认框', en: 'Confirmation' },
      description: {
        zh: '`variant="alert"` 换到 Base UI 的 `AlertDialog`，读屏软件会读成 `alertdialog` 而不是 `dialog`。它刻意不给 ×：确认框的意义就在于逼用户在两个选项里选一个，留个「静默溜走」的出口等于把它退化成普通对话框。`onConfirm` / `onCancel` 触发后组件会自己关闭，所以这里不需要你再置 `open`。',
        en: '`variant="alert"` moves to Base UI’s `AlertDialog`, which screen readers announce as `alertdialog` rather than `dialog`. It deliberately has no ×: the point of a confirmation is to make someone pick one of two answers, and a quiet escape hatch would turn it back into an ordinary dialog. The component closes itself after `onConfirm` / `onCancel`, so you do not set `open` again here.',
      },
      code: alertSource,
      render: () => <ModalAlert />,
    },
    {
      id: 'destructive',
      title: { zh: '危险操作', en: 'Destructive confirmation' },
      description: {
        zh: '`destructive` 只在 `variant="alert"` 下生效，把标题与确认按钮转成 Nothing 红。用它的门槛应该很高——单色系统里红色是唯一的强信号，每多用一次就贬值一分。判断标准很简单：这个动作能不能撤销？不能，才配得上红。另外记得把 `confirmLabel` 写成具体动词（Erase、Delete）而不是 OK，用户按下去的东西应该自己说明后果。',
        en: '`destructive` only applies when `variant="alert"`; it turns the title and the confirm button Nothing red. Reach for it rarely — red is the single loud signal in a monochrome system and every extra use devalues it. The test is simple: can the action be undone? Only if it cannot does it deserve the red. Write `confirmLabel` as the actual verb (Erase, Delete) rather than OK, so the button the user presses states its own consequence.',
      },
      code: destructiveSource,
      render: () => <ModalDestructive />,
    },
    {
      id: 'headless',
      title: { zh: '无标题', en: 'Without a header' },
      description: {
        zh: '省掉 `title` 时头部整块不渲染，× 会贴到更靠边的位置（`top-2 end-2` 而不是 `top-4 end-4`），正文因此能占满面板。代价是对话框失去了可读名字——所以这时请自己传 `aria-label`，它会随其它原生属性一起透传到 `Dialog.Popup` 上。',
        en: 'Drop `title` and the whole header disappears; the × tucks in closer (`top-2 end-2` instead of `top-4 end-4`) so the body can fill the panel. The cost is that the dialog loses its accessible name, so pass your own `aria-label` — it rides through to `Dialog.Popup` with the rest of the native props.',
      },
      code: headlessSource,
      render: () => <ModalHeadless />,
    },
  ],
  api: [
    {
      name: 'Modal',
      description: {
        zh: '除下表列出的属性外，原生 `<div>` 属性（`aria-label`、`id`、`style` …）透传到 `Dialog.Popup`；`ref` 也指向它。',
        en: 'Beyond the props below, native `<div>` attributes (`aria-label`, `id`, `style`, …) are forwarded to `Dialog.Popup`, and `ref` points at that element.',
      },
      props: [
        {
          name: 'open',
          type: 'boolean',
          required: true,
          description: {
            zh: '是否打开。组件不渲染 trigger，开合完全由你掌握，所以这是必填项。',
            en: 'Whether the dialog is open. The component renders no trigger, so opening and closing is entirely yours to drive — hence required.',
          },
        },
        {
          name: 'onClose',
          type: '() => void',
          description: {
            zh: '×、Esc、点击遮罩以及 alert 的两颗按钮都会走到这里。',
            en: 'Called by the ×, Escape, a backdrop click, and both buttons in the alert variant.',
          },
        },
        {
          name: 'title',
          type: 'string',
          description: {
            zh: '标题，渲染为 `Dialog.Title` 并作为可访问名。省略时不渲染头部。',
            en: 'The heading, rendered as `Dialog.Title` and used as the accessible name. Omit it and no header is rendered.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '正文内容。', en: 'The body content.' },
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: {
            zh: '底部操作区，行末对齐。`variant="alert"` 时被忽略。',
            en: 'The action row, aligned to the inline end. Ignored when `variant="alert"`.',
          },
        },
        {
          name: 'variant',
          type: `'default' | 'alert'`,
          default: `'default'`,
          description: {
            zh: '`alert` 换用 Base UI 的 `AlertDialog`，并渲染确认 / 取消两颗按钮。',
            en: '`alert` switches to Base UI’s `AlertDialog` and renders the confirm / cancel pair.',
          },
        },
        {
          name: 'description',
          type: 'string',
          description: {
            zh: '说明文字，渲染为 `Dialog.Description`。只在 `variant="alert"` 下渲染。',
            en: 'Supporting text, rendered as `Dialog.Description`. Only rendered when `variant="alert"`.',
          },
        },
        {
          name: 'confirmLabel',
          type: 'string',
          default: `'Confirm'`,
          description: { zh: '确认按钮文案。', en: 'Label of the confirm button.' },
        },
        {
          name: 'cancelLabel',
          type: 'string',
          default: `'Cancel'`,
          description: { zh: '取消按钮文案。', en: 'Label of the cancel button.' },
        },
        {
          name: 'onConfirm',
          type: '() => void',
          description: {
            zh: '确认回调。执行后组件自动关闭。',
            en: 'Confirm handler. The component closes itself afterwards.',
          },
        },
        {
          name: 'onCancel',
          type: '() => void',
          description: {
            zh: '取消回调。执行后组件自动关闭。',
            en: 'Cancel handler. The component closes itself afterwards.',
          },
        },
        {
          name: 'destructive',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '把标题与确认按钮转红。只在 `variant="alert"` 下生效。',
            en: 'Turns the title and confirm button red. Only effective when `variant="alert"`.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到面板的类名。经 `tailwind-merge` 合并，可以覆盖宽度、圆角这类默认值。',
            en: 'Extra classes on the panel. Merged with `tailwind-merge`, so you can override defaults like width or radius.',
          },
        },
      ],
    },
    {
      name: 'modalVariants',
      description: {
        zh: '面板的 CVA 函数。另有 `modalBackdropVariants`、`modalHeaderVariants`、`modalTitleVariants`、`modalDescriptionVariants`、`modalBodyVariants`、`modalFooterVariants`、`modalCloseVariants`、`modalCancelVariants`、`modalConfirmVariants` 一并导出，适合自行拼装一个结构不同、外观一致的对话框。',
        en: 'The CVA function for the panel. `modalBackdropVariants`, `modalHeaderVariants`, `modalTitleVariants`, `modalDescriptionVariants`, `modalBodyVariants`, `modalFooterVariants`, `modalCloseVariants`, `modalCancelVariants`, and `modalConfirmVariants` are exported alongside it, for assembling a differently-shaped dialog that still looks like this one.',
      },
      props: [
        {
          name: 'alert',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '确认框尺寸：更窄，并改用缩放入场而不是上移入场。',
            en: 'Confirmation sizing: narrower, and scaling in rather than sliding up.',
          },
        },
        {
          name: 'destructive',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '危险态，供 title / confirm 变体消费。',
            en: 'Destructive state, consumed by the title and confirm variants.',
          },
        },
        {
          name: 'noHeader',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '无标题时的排版补偿，主要影响 × 的位置。',
            en: 'Layout compensation when there is no header; mostly moves the ×.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '底座是 Base UI 的 `Dialog`（alert 变体是 `AlertDialog`），焦点陷阱、打开时把焦点移进面板、关闭时还原到触发元素，以及给页面其余部分加 `inert`，都由它负责。',
      en: 'Built on Base UI’s `Dialog` (`AlertDialog` for the alert variant), which owns the focus trap, moving focus into the panel on open, restoring it to the trigger on close, and marking the rest of the page `inert`.',
    },
    {
      zh: '面板上是 `role="dialog"` + `aria-modal="true"`；`variant="alert"` 时是 `role="alertdialog"`，读屏软件会用更强的语气播报。',
      en: 'The panel carries `role="dialog"` with `aria-modal="true"`; the alert variant is `role="alertdialog"`, which screen readers announce more insistently.',
    },
    {
      zh: '传了 `title` 才会有 `aria-labelledby`。没有标题的对话框（比如只放一张图）请自己补 `aria-label`，否则读屏软件只会读出「对话框」。',
      en: '`aria-labelledby` only exists when you pass a `title`. A dialog without one — an image viewer, say — needs your own `aria-label`, or screen readers will announce nothing but “dialog”.',
    },
    {
      zh: 'Esc 关闭，焦点回到打开它的元素；点击遮罩同样关闭。alert 变体沿用 `AlertDialog` 的语义，Esc 仍然可用，但点遮罩不会关。',
      en: 'Escape closes and returns focus to whatever opened it, and a backdrop click closes too. The alert variant keeps `AlertDialog` semantics: Escape still works, but clicking the backdrop does not dismiss it.',
    },
    {
      zh: '× 按钮自带 `aria-label="Close"`，最小触达尺寸 44×44px。',
      en: 'The × button ships with `aria-label="Close"` and a 44×44px minimum touch target.',
    },
    {
      zh: '面板最高 90vh 并自行滚动，所以长内容不会顶出视口；页面滚动锁由 Base UI 处理。',
      en: 'The panel caps at 90vh and scrolls internally, so long content never overflows the viewport; Base UI handles locking the page behind it.',
    },
    {
      zh: '遮罩淡入与面板位移都带 `motion-reduce:transition-none`，开了减弱动效就直接就位。',
      en: 'The backdrop fade and the panel’s travel both carry `motion-reduce:transition-none`, so with reduced motion the dialog simply appears in place.',
    },
  ],
}
