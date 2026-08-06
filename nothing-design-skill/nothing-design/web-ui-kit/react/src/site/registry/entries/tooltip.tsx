import { Button } from 'aios-ui-kit/button'
import { Tooltip } from 'aios-ui-kit/tooltip'
import type { ComponentDoc } from '../types'

import TooltipBasic from '../../examples/tooltip/basic'
import TooltipSides from '../../examples/tooltip/sides'
import TooltipDelay from '../../examples/tooltip/delay'
import TooltipIconButton from '../../examples/tooltip/icon-button'

import basicSource from '../../examples/tooltip/basic.tsx?raw'
import sidesSource from '../../examples/tooltip/sides.tsx?raw'
import delaySource from '../../examples/tooltip/delay.tsx?raw'
import iconButtonSource from '../../examples/tooltip/icon-button.tsx?raw'

export const tooltipDoc: ComponentDoc = {
  slug: 'tooltip',
  name: 'Tooltip',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Tooltip',
  description: {
    zh: '悬停或聚焦时出现的一行简短说明，只承载已经存在的信息的补充。',
    en: 'A one-line hint shown on hover or focus, for information that supplements what is already on screen.',
  },
  preview: () => (
    <Tooltip content="Syncs every 15 minutes">
      <Button variant="outline">Sync now</Button>
    </Tooltip>
  ),
  importStatement: `import { Tooltip } from 'aios-ui-kit/tooltip'`,
  usageSnippet: `<Tooltip content="Syncs every 15 minutes">
  <Button variant="outline">Sync now</Button>
</Tooltip>`,
  composition: {
    zh: '和 Popover 同一套形状：`children` 是单个元素，组件把 Base UI 的 trigger 属性 `cloneElement` 进去；气泡走 Portal 渲染到 body，`::after` 画的小三角由 `side` 决定朝向。两处不同值得记住：`content` 的类型是 `string` 而不是 `ReactNode`——气泡里放不了结构化内容，这是刻意的约束；气泡本身是 `pointer-events-none`，鼠标穿过它落到底下的元素上，所以里面永远不可能有可点的东西。',
    en: 'Same shape as Popover: `children` is a single element that receives Base UI’s trigger props via `cloneElement`, and the bubble is portalled to the body with a `::after` arrow whose direction follows `side`. Two differences are worth remembering. `content` is typed `string`, not `ReactNode` — you cannot put structured content in the bubble, and that constraint is deliberate. And the bubble is `pointer-events-none`, so the mouse passes straight through it to whatever is underneath, which means nothing inside it can ever be clicked.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '气泡是 `whitespace-nowrap` 的单行，长文案会一路撑宽直到出屏。这不是缺陷而是提醒：tooltip 的容量只有一句话，需要两句就该换 Popover 或 HoverCard。',
        en: 'The bubble is a single `whitespace-nowrap` line, so a long string simply keeps widening until it runs off screen. Treat that as the reminder it is: a tooltip holds one sentence, and the moment you need two, the answer is a Popover or a HoverCard.',
      },
      code: basicSource,
      render: () => <TooltipBasic />,
    },
    {
      id: 'sides',
      title: { zh: '方向', en: 'Sides' },
      description: {
        zh: '`side` 同时决定气泡的落位与小三角的朝向。`left` / `right` 用的是逻辑边框工具类（`border-s-*` / `border-e-*`），所以 RTL 下三角会自动镜像，不用你手动换值。和 Popover 一样，空间不够时 Base UI 会翻面，最终方向以 `data-side` 为准。',
        en: '`side` places both the bubble and its arrow. The `left` / `right` arrows are drawn with logical border utilities (`border-s-*` / `border-e-*`), so they mirror themselves in RTL and you never swap the value by hand. As with Popover, Base UI flips when space runs short — `data-side` is the authority on where it ended up.',
      },
      code: sidesSource,
      render: () => <TooltipSides />,
    },
    {
      id: 'delay',
      title: { zh: '延迟', en: 'Delay' },
      description: {
        zh: '`delay` 是从悬停到出现的毫秒数，默认 300ms——刚好过滤掉「鼠标只是路过」，又不至于让人觉得卡。改成 0 会让光标扫过一排图标时接连炸出气泡，很吵；调到 1s 以上则基本没人等得到。除非有具体理由，保持默认。',
        en: '`delay` is the hover-to-appear time in milliseconds, defaulting to 300 — long enough to filter out a cursor merely passing through, short enough not to feel sticky. Drop it to 0 and sweeping across a toolbar sets off a string of bubbles; push it past a second and nobody waits around long enough to see one. Keep the default unless you have a specific reason.',
      },
      code: delaySource,
      render: () => <TooltipDelay />,
    },
    {
      id: 'icon-button',
      title: { zh: '给图标按钮加说明', en: 'Naming icon buttons' },
      description: {
        zh: 'Tooltip 最站得住脚的用法，但它替代不了 `aria-label`：`content` 挂在 `aria-describedby` 上是**描述**，而纯图标按钮缺的是**名字**——读屏会念「按钮」然后跟一句描述，始终没说清这是哪颗按钮。所以两样都要写，且措辞保持一致；下面每颗按钮的 `aria-label` 和 `content` 都是同一句话。',
        en: 'This is the most defensible use of a tooltip, and it still does not replace `aria-label`: `content` rides on `aria-describedby`, which makes it a *description*, while an icon-only button is missing a *name*. A screen reader would announce “button” followed by the description and never say which button it is. Write both, worded the same way: every button below has an `aria-label` identical to its `content`.',
      },
      code: iconButtonSource,
      render: () => <TooltipIconButton />,
    },
  ],
  api: [
    {
      name: 'Tooltip',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性透传到气泡（`Tooltip.Popup`），`ref` 也指向它。',
        en: 'Native `<div>` props other than those below are forwarded to the bubble (`Tooltip.Popup`), and `ref` points at it.',
      },
      props: [
        {
          name: 'children',
          type: 'ReactElement',
          description: {
            zh: 'trigger。必须是单个能接收 props 与 ref 的元素，且本身应可聚焦——不可聚焦的元素上，键盘用户永远看不到气泡。',
            en: 'The trigger: a single element that takes props and a ref, and one that is focusable. On something a keyboard cannot reach, the bubble never appears.',
          },
        },
        {
          name: 'content',
          type: 'string',
          description: {
            zh: '气泡文案。只收字符串。',
            en: 'The bubble text. Strings only.',
          },
        },
        {
          name: 'side',
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'top'`,
          description: {
            zh: '首选方向，也决定小三角朝向。',
            en: 'Preferred side; also points the arrow.',
          },
        },
        {
          name: 'delay',
          type: 'number',
          default: '300',
          description: {
            zh: '悬停到出现的毫秒数。聚焦触发不受它影响。',
            en: 'Hover-to-open delay in milliseconds. Focus opens it without waiting.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到气泡的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the bubble, merged with `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'tooltipPopupVariants',
      description: {
        zh: '气泡的 CVA 函数，`side` 那一档同时负责 `::after` 三角。另有 `tooltipTriggerVariants`（`cursor-help` 与 focus ring）和 `tooltipPositionerVariants`（z-index）。',
        en: 'The CVA function for the bubble; its `side` variant also draws the `::after` arrow. `tooltipTriggerVariants` (the `cursor-help` and focus ring) and `tooltipPositionerVariants` (z-index) sit alongside it.',
      },
      props: [
        {
          name: 'side',
          type: `'top' | 'right' | 'bottom' | 'left'`,
          default: `'top'`,
          description: {
            zh: '三角的位置与朝向。',
            en: 'Where the arrow sits and which way it points.',
          },
        },
        {
          name: 'visible',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '强制可见。日常显隐由 Base UI 的 `open:` / `closed:` 驱动。',
            en: 'Force the visible state. Normal visibility runs off Base UI’s `open:` / `closed:`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '气泡带 `role="tooltip"`，trigger 则通过 `aria-describedby` 指向一份视觉隐藏的 `content` 副本。之所以不直接指向气泡本身：气泡只在打开时才挂载，而读屏是在焦点落上来的那一刻读描述的，隔着 `delay` 毫秒那会儿它还不存在。你自己在 trigger 上写的 `aria-describedby` 会被保留并接在前面。',
      en: 'The bubble carries `role="tooltip"`, and the trigger points at a visually hidden copy of `content` via `aria-describedby`. It deliberately does not point at the bubble itself: the bubble only mounts while open, whereas a screen reader reads the description the moment focus lands — `delay` milliseconds before the bubble exists. Any `aria-describedby` you set on the trigger yourself is preserved and kept first.',
    },
    {
      zh: '触屏设备上没有 hover，也几乎不会产生 focus，因此这个气泡对手机用户基本不存在。绝不能让它成为某条信息的唯一载体——纯图标按钮必须另配 `aria-label`。',
      en: 'Touch devices have no hover and rarely produce focus, so for a phone user this bubble effectively does not exist. It must never be the only carrier of a piece of information — an icon-only button still needs its own `aria-label`.',
    },
    {
      zh: '键盘聚焦 trigger 会立即显示（不走 `delay`），移开焦点或按 Esc 关闭。',
      en: 'Focusing the trigger from the keyboard shows it immediately, bypassing `delay`; moving focus away or pressing Escape hides it.',
    },
    {
      zh: '气泡是 `pointer-events-none`，鼠标无法进入。这意味着 WCAG 1.4.13 里「内容可悬停」那一条不成立，所以里面不能放需要用户去够的东西——链接、关闭按钮、可选中的文本都不行。要那些就换 HoverCard。',
      en: 'The bubble is `pointer-events-none`, so the pointer cannot enter it. That means the “hoverable content” clause of WCAG 1.4.13 does not hold here, and nothing inside may require reaching for it — no links, no dismiss button, no selectable text. When you need those, use HoverCard.',
    },
    {
      zh: 'trigger 的默认样式是 `cursor-help` 加一圈 `focus-visible` 描边；如果传进来的元素已经有自己的焦点样式（比如 `Button`），两者会由 `tailwind-merge` 合并，以你的为准。',
      en: 'The trigger defaults to `cursor-help` plus a `focus-visible` outline; when the element you pass already styles its own focus — `Button`, for instance — `tailwind-merge` lets yours win.',
    },
    {
      zh: '入场是 0.95→1 的缩放淡入，带 `motion-reduce:transition-none`。',
      en: 'It scales in from 0.95 with a fade, and carries `motion-reduce:transition-none`.',
    },
  ],
}
