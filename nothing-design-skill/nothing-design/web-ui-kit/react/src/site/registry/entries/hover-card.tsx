import type { ComponentDoc } from '../types'

import HoverCardBasic from '../../examples/hover-card/basic'
import HoverCardSides from '../../examples/hover-card/sides'
import HoverCardInteractive from '../../examples/hover-card/interactive'
import HoverCardDelay from '../../examples/hover-card/delay'

import basicSource from '../../examples/hover-card/basic.tsx?raw'
import sidesSource from '../../examples/hover-card/sides.tsx?raw'
import interactiveSource from '../../examples/hover-card/interactive.tsx?raw'
import delaySource from '../../examples/hover-card/delay.tsx?raw'

export const hoverCardDoc: ComponentDoc = {
  slug: 'hover-card',
  name: 'HoverCard',
  category: 'overlays',
  status: 'stable',
  baseUi: 'Popover',
  description: {
    zh: '悬停展开的预览卡片：比 Tooltip 能装的多，又不必像 Popover 那样先点一下。',
    en: 'A hover-triggered preview card: room for more than a tooltip, without the click a popover costs.',
  },
  preview: () => (
    <button className="border-b border-dashed border-border-visible font-mono text-sm">
      @teenage.engineering
    </button>
  ),
  importStatement: `import { HoverCard } from 'aios-ui-kit/hover-card'`,
  usageSnippet: `<HoverCard content={<p>A short preview of what is behind this link.</p>}>
  <button>@teenage.engineering</button>
</HoverCard>`,
  composition: {
    zh: 'HoverCard 就是打开方式换成悬停的 Popover——底座同样是 Base UI 的 `Popover`，只是在 trigger 上加了 `openOnHover`、`delay` 与 `closeDelay={0}`。它仍然是点击可开的：`Popover.Trigger` 的点击行为并没有被关掉，所以键盘用户按 Enter 一样能打开。和 Tooltip 的关键区别在卡片是 `pointer-events-auto`，鼠标能从触发器滑进卡片里而不触发关闭，里面因此可以放链接和按钮。',
    en: 'A HoverCard is a Popover that opens on hover — literally the same Base UI `Popover` underneath, with `openOnHover`, `delay`, and `closeDelay={0}` on the trigger. Clicking still works: the trigger’s click behaviour was never removed, so a keyboard user pressing Enter opens it too. The decisive difference from Tooltip is that the card is `pointer-events-auto`, so the pointer can travel from the trigger into the card without dismissing it, which is what makes links and buttons inside it viable.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '典型场景是给一个链接或用户名做预览：读者不必离开当前页面就能判断值不值得点进去。前提是卡片里的信息在别处也拿得到——悬停是一种可选的加速手段，不该是唯一入口。',
        en: 'The classic use is previewing what sits behind a link or a username, so a reader can judge whether it is worth following without leaving the page. The premise is that the same information is reachable some other way: hovering is an optional shortcut, never the only door.',
      },
      code: basicSource,
      render: () => <HoverCardBasic />,
    },
    {
      id: 'sides',
      title: { zh: '方向', en: 'Sides' },
      description: {
        zh: '`side` 只有 `top` 和 `bottom`——卡片比 tooltip 宽得多，挂在左右两侧几乎必然要挤开正文或翻面，所以类型层面就不给这个选项。默认 `bottom`，因为向下展开不会遮住读者正在读的那一行。',
        en: '`side` is limited to `top` and `bottom`. A card is far wider than a tooltip, so hanging it off the inline edges almost always means crowding the text or flipping anyway — the type simply does not offer the choice. The default is `bottom`, which opens away from the line the reader is on rather than over it.',
      },
      code: sidesSource,
      render: () => <HoverCardSides />,
    },
    {
      id: 'interactive',
      title: { zh: '卡片里的可交互内容', en: 'Interactive content' },
      description: {
        zh: '`closeDelay={0}` 意味着指针一离开就关，但 Base UI 会把 trigger 与卡片之间的那段间隙算作「仍在范围内」，所以 4px 的偏移不会让卡片在半路消失。即便如此，卡片里的按钮仍然只应该是快捷方式：鼠标操作本来就容易滑出去，触屏更是完全够不着。',
        en: '`closeDelay={0}` means it closes the moment the pointer leaves, but Base UI treats the gap between trigger and card as still “inside”, so the 4px offset will not swallow the card on the way over. Even so, treat a button in there as a shortcut only: pointers slip off easily, and touch cannot reach it at all.',
      },
      code: interactiveSource,
      render: () => <HoverCardInteractive />,
    },
    {
      id: 'delay',
      title: { zh: '延迟', en: 'Delay' },
      description: {
        zh: '默认同样是 300ms。HoverCard 比 Tooltip 更该谨慎调低——卡片面积大，误触发时会盖住一片正文，读者得先把鼠标挪开才能继续读。一段文字里如果有好几个带卡片的链接，把 `delay` 调高反而更舒服。',
        en: 'The default is 300 ms here too, and lowering it deserves more caution than with a tooltip: a card is large, so a stray trigger blankets a paragraph and the reader has to move the mouse away before they can carry on. When several linked names sit in one paragraph, a longer `delay` reads better, not worse.',
      },
      code: delaySource,
      render: () => <HoverCardDelay />,
    },
  ],
  api: [
    {
      name: 'HoverCard',
      description: {
        zh: '除下表属性外，原生 `<div>` 属性透传到卡片（`Popover.Popup`），`ref` 也指向它。',
        en: 'Native `<div>` props other than those below are forwarded to the card (`Popover.Popup`), and `ref` points at it.',
      },
      props: [
        {
          name: 'children',
          type: 'ReactElement',
          description: {
            zh: 'trigger。必须是单个能接收 props 与 ref 的元素；非元素会退化成 `<span>`，键盘就够不到了。',
            en: 'The trigger: a single element that takes props and a ref. Anything else falls back to a `<span>`, which the keyboard cannot reach.',
          },
        },
        {
          name: 'content',
          type: 'ReactNode',
          description: {
            zh: '卡片内容，可以是结构化的。',
            en: 'The card’s contents; structured markup is fine.',
          },
        },
        {
          name: 'side',
          type: `'top' | 'bottom'`,
          default: `'bottom'`,
          description: {
            zh: '首选方向，空间不足时翻面。',
            en: 'Preferred side; flips when space runs out.',
          },
        },
        {
          name: 'delay',
          type: 'number',
          default: '300',
          description: {
            zh: '悬停到打开的毫秒数。关闭延迟固定为 0，不可配置。',
            en: 'Hover-to-open delay in milliseconds. The close delay is hard-coded to 0 and not configurable.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到卡片的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the card, merged with `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'hoverCardContentVariants',
      description: {
        zh: '卡片的 CVA 函数，与 `popoverContentVariants` 几乎同形，只多一个显式的 `pointer-events-auto`。trigger 与定位层是 `hoverCardTriggerVariants` / `hoverCardPositionerVariants`。',
        en: 'The CVA function for the card. It is nearly identical to `popoverContentVariants`, with an explicit `pointer-events-auto` on top. The trigger and positioner are `hoverCardTriggerVariants` and `hoverCardPositionerVariants`.',
      },
      props: [
        {
          name: 'side',
          type: `'top' | 'bottom'`,
          default: `'bottom'`,
          description: {
            zh: '当前不产出样式，只作为 `data-side` 的载体。',
            en: 'Emits no classes today; it exists to carry `data-side`.',
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
      zh: '因为底座是 Popover，trigger 上是 `aria-haspopup="dialog"` 与 `aria-expanded`，卡片按 dialog 而不是 tooltip 对待——里面的交互元素能被读屏软件正常访问。',
      en: 'Because it is a Popover underneath, the trigger carries `aria-haspopup="dialog"` and `aria-expanded`, and the card is treated as a dialog rather than a tooltip — so interactive elements inside it are properly reachable by assistive tech.',
    },
    {
      zh: '键盘用户按 Enter / Space 打开，Esc 关闭，焦点关闭后回到 trigger。所以 `children` 请传真正可聚焦的元素（`<a>`、`<button>`），别传 `<span>`。',
      en: 'Keyboard users open it with Enter or Space and close it with Escape, and focus returns to the trigger. Pass a genuinely focusable element as `children` — an `<a>` or `<button>`, not a `<span>`.',
    },
    {
      zh: '卡片 `pointer-events-auto` 且关闭前指针可以安全穿过间隙，满足 WCAG 1.4.13 对「可悬停」的要求；这也是它能放链接、Tooltip 不能的原因。',
      en: 'The card is `pointer-events-auto` and the pointer can cross the gap safely before it closes, which satisfies the “hoverable” requirement of WCAG 1.4.13 — and is precisely why links belong here and not in a tooltip.',
    },
    {
      zh: '触屏没有 hover，只能靠点击打开。卡片里的信息必须在别处也能拿到，不能只活在悬停里。',
      en: 'Touch has no hover, leaving only the click. Whatever the card says has to be available somewhere else too; it cannot live in the hover alone.',
    },
    {
      zh: '`delay` 只作用于打开。关闭延迟被写死为 0，所以指针一旦真正离开范围，卡片立刻消失——不会有一堆残留卡片叠在页面上。',
      en: '`delay` only governs opening. The close delay is fixed at 0, so once the pointer genuinely leaves, the card goes at once and you never end up with a pile of stale cards on the page.',
    },
    {
      zh: '缩放淡入带 `motion-reduce:transition-none`。',
      en: 'The scale-and-fade entry carries `motion-reduce:transition-none`.',
    },
  ],
}
