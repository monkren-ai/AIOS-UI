import { ScrollArea } from 'nothing-ui/scroll-area'
import type { ComponentDoc } from '../types'

import ScrollAreaBasic from '../../examples/scroll-area/basic'
import ScrollAreaList from '../../examples/scroll-area/list'
import ScrollAreaKeyboard from '../../examples/scroll-area/keyboard'

import basicSource from '../../examples/scroll-area/basic.tsx?raw'
import listSource from '../../examples/scroll-area/list.tsx?raw'
import keyboardSource from '../../examples/scroll-area/keyboard.tsx?raw'

export const scrollAreaDoc: ComponentDoc = {
  slug: 'scroll-area',
  name: 'ScrollArea',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '自定义滚动条的滚动容器，跨浏览器表现一致。',
    en: 'A scroll container with custom scrollbars that look the same everywhere.',
  },
  preview: () => (
    <ScrollArea className="w-full max-w-sm border border-border-visible" height="120px">
      <div className="flex flex-col gap-2 p-4 font-body text-base text-foreground-muted">
        <p>Scroll me. The scrollbar fades in when the pointer is over the box.</p>
        <p>The native bar is hidden and redrawn as a 4px thumb on the end edge.</p>
        <p>Drag the thumb, or click anywhere on the track to jump.</p>
      </div>
    </ScrollArea>
  ),
  importStatement: `import { ScrollArea } from 'nothing-ui/scroll-area'`,
  usageSnippet: `<ScrollArea height="240px">
  <YourLongContent />
</ScrollArea>`,
  composition: {
    zh: '三层：外框（定位上下文 + `overflow-hidden`）、真正滚动的视口、以及贴在行末侧的自绘滚动条（轨道 + 滑块）。原生滚动条被 `scrollbar-width: none` 藏掉，位置改由 JS 算出的滑块表达——所以这个组件的价值只在视觉一致，滚动行为本身还是浏览器的。**注意 `children` 进的是视口，而其余属性（`className`、`style`、`ref`、事件）落在外框上**：想给内容加内边距就在 `children` 里自己包一层，直接写在 `className` 上会把滚动条一起推歪。要够到视口本身（`aria-label`、`onScroll`、视口的 `ref`）走 `viewportProps`。滚动条只有纵向一根，横向溢出能滚但没有任何可见提示。',
    en: 'Three layers: the frame (a positioning context with `overflow-hidden`), the viewport that actually scrolls, and a hand-drawn scrollbar pinned to the end edge (track plus thumb). The native bar is hidden with `scrollbar-width: none` and the position is redrawn as a thumb computed in JS — so what this component buys you is visual consistency; the scrolling itself is still the browser’s. **`children` go into the viewport while everything else (`className`, `style`, `ref`, handlers) lands on the frame**, so add padding by wrapping inside `children`; putting it on `className` shifts the scrollbar along with it. Reach the viewport itself (`aria-label`, `onScroll`, its own `ref`) through `viewportProps`. There is only a vertical bar: horizontal overflow still scrolls but gets no visible affordance at all.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '必须给一个确定的高度，否则外框会被内容撑开，什么也不会滚。`height` 是最直接的方式——它写成内联样式，所以会盖过 `className` 上的 `h-*`。滚动条默认不可见，指针移到框上时才淡入；拖动滑块，或者点轨道任意位置都可以跳转。',
        en: 'It needs a definite height, or the frame grows to fit the content and nothing ever scrolls. `height` is the shortest route — it is written as an inline style, so it beats any `h-*` you put in `className`. The scrollbar is invisible until the pointer enters the box; you can drag the thumb or click anywhere on the track to jump.',
      },
      code: basicSource,
      render: () => <ScrollAreaBasic />,
    },
    {
      id: 'list',
      title: { zh: '用 Tailwind 控制高度', en: 'Sizing with Tailwind' },
      description: {
        zh: '不传 `height` 时高度就交给 `className`，这样才能用响应式类名（`h-40 md:h-80`）或者让它在 flex 布局里自适应。视口是 `h-full`，所以只要外框有确定高度，里面就能滚。列表这类等高行的内容特别适合放进来——滑块高度按内容比例算，一眼能看出还剩多少。',
        en: 'Leave `height` off and sizing falls to `className`, which is what you want for responsive heights (`h-40 md:h-80`) or for letting the box flex inside a layout. The viewport is `h-full`, so any definite height on the frame is enough to make the inside scroll. Uniform rows like a list suit it well: the thumb is sized in proportion to the content, so its length tells you how much is left.',
      },
      code: listSource,
      render: () => <ScrollAreaList />,
    },
    {
      id: 'keyboard',
      title: { zh: '键盘可达性', en: 'Reaching it from the keyboard' },
      description: {
        zh: '视口自带 `tabIndex={0}`，所以**纯文本内容也能用键盘滚**：Tab 停在视口上，再用方向键 / PageUp / PageDown 翻。内容里有可聚焦元素时还有另一条路——Tab 到下一个按钮/链接，浏览器会把它滚进视野，下面这个例子演示的就是这条。两条路并存，不冲突。给了 `viewportProps.aria-label` 之后视口才会变成一块具名的 `role="region"`，读屏才会告诉用户「这里是一块可以滚的区域」。',
        en: 'The viewport carries `tabIndex={0}`, so **plain prose is scrollable from the keyboard too**: Tab lands on the viewport and the arrows, PageUp, and PageDown take it from there. Focusable content gives you a second route — tabbing to the next button or link scrolls it into view, which is what the example below shows. The two coexist. Pass `viewportProps.aria-label` and the viewport also becomes a named `role="region"`, which is what makes a screen reader announce it as a scrollable area.',
      },
      code: keyboardSource,
      render: () => <ScrollAreaKeyboard />,
    },
  ],
  api: [
    {
      name: 'ScrollArea',
      description: {
        zh: '渲染为一个 `<div>`。所有原生 div 属性与 `ref` 都落在外框上，不是滚动的视口——这一点在绑 `onScroll` 时尤其重要：外框不滚，绑上去收不到事件，要监听滚动请用 `viewportProps.onScroll`。',
        en: 'Renders a single `<div>`. Every native div prop and `ref` lands on the frame rather than on the scrolling viewport — which matters most for `onScroll`: the frame never scrolls, so a handler there never fires. Use `viewportProps.onScroll` to listen instead.',
      },
      props: [
        {
          name: 'height',
          type: 'string',
          description: {
            zh: '外框高度，任意 CSS 长度（`"240px"`、`"50vh"`）。以内联样式写入，优先级高于 `className` 里的 `h-*`。不传就自己用 `className` 给高度。',
            en: 'The frame’s height, as any CSS length (`"240px"`, `"50vh"`). Written inline, so it outranks an `h-*` in `className`. Omit it and give the height through `className` instead.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '滚动内容。它进的是视口，不是外框。',
            en: 'The scrollable content. It goes into the viewport, not the frame.',
          },
        },
        {
          name: 'viewportProps',
          type: "ComponentPropsWithRef<'div'>",
          description: {
            zh: '透传给真正滚动的视口。视口默认已有 `tabIndex={0}`；传了 `aria-label` 或 `aria-labelledby` 才会补上 `role="region"`（无名的 region 在读屏里等于不存在）。`className` 经 `tailwind-merge` 合并，`onScroll` 与内部的滑块计算并存，`ref` 也会和内部 ref 一起生效。',
            en: 'Forwarded to the scrolling viewport. It already has `tabIndex={0}`; supplying `aria-label` or `aria-labelledby` additionally gives it `role="region"` (an unnamed region is invisible to screen readers anyway). `className` is merged through `tailwind-merge`, `onScroll` runs alongside the internal thumb maths, and a `ref` here coexists with the internal one.',
          },
        },
        {
          name: 'style',
          type: 'CSSProperties',
          description: {
            zh: '外框内联样式。与 `height` 共存时 `height` 先写、你的样式后写，所以同名字段以你的为准。',
            en: 'Inline styles on the frame. When combined with `height`, yours are applied afterwards and win on any shared key.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到外框的类名，经 `tailwind-merge` 合并。这是给边框、圆角、宽高的地方；内容的内边距请在 `children` 里加。',
            en: 'Extra classes on the frame, merged via `tailwind-merge`. This is where borders, radii, and dimensions go; padding for the content belongs inside `children`.',
          },
        },
      ],
    },
    {
      name: 'scrollAreaVariants',
      description: {
        zh: '各部件的 CVA 函数，都不接受参数：`scrollAreaVariants`（外框）、`scrollAreaViewportVariants`（视口，含隐藏原生滚动条的那两条声明）、`scrollAreaScrollbarVariants`（轨道）、`scrollAreaThumbVariants`（滑块）。滑块的位置与高度由 JS 以内联样式写入，不在类名里。',
        en: 'The CVA function per part, none of which take arguments: `scrollAreaVariants` (frame), `scrollAreaViewportVariants` (viewport, including the two declarations that hide the native bar), `scrollAreaScrollbarVariants` (track), and `scrollAreaThumbVariants` (thumb). The thumb’s offset and height are written inline by JS, not through classes.',
      },
      props: [],
    },
  ],
  accessibility: [
    {
      zh: '**滚动区域本身可聚焦**：视口带 `tabIndex={0}`，键盘用户 Tab 到它之后就能用方向键 / PageUp / PageDown 滚动，内容里一个可聚焦元素都没有也没关系（WCAG 2.1.1）。焦点环画在内侧（`-outline-offset-2`），不会被外框的 `overflow-hidden` 裁掉。想改视口上的属性走 `viewportProps`，根元素上的属性到不了那一层。',
      en: '**The scroll region itself is focusable**: the viewport carries `tabIndex={0}`, so a keyboard user tabs onto it and scrolls with the arrows, PageUp, and PageDown even when the content holds nothing focusable (WCAG 2.1.1). Its focus ring is inset by `-outline-offset-2` so the frame’s `overflow-hidden` cannot clip it. Anything you need to change on the viewport goes through `viewportProps`; props on the root never reach that layer.',
    },
    {
      zh: '内容里有可聚焦元素时问题就消失了：Tab 过去时浏览器会自动把目标滚进视野，滚动位置也跟着焦点走。这也是上面「键盘可达性」示例演示的模式，能用就尽量用。',
      en: 'The problem disappears when the content holds focusable elements: tabbing to one scrolls it into view, and the scroll position follows focus. That is the pattern the keyboard example shows, and the one to prefer whenever the content allows it.',
    },
    {
      zh: '`role="region"` 只在你通过 `viewportProps` 给了 `aria-label` 或 `aria-labelledby` 时才加上——无名的 region 不会进读屏的地标列表，加了也是白加。可聚焦但无名的滚动容器读屏会报「组，可滚动」之类的泛称，所以只要这块内容自成一节，就给它一个名字。',
      en: 'The `role="region"` is added only when you supply an `aria-label` or `aria-labelledby` through `viewportProps` — an unnamed region never enters the landmark list, so adding one blind buys nothing. A focusable but unnamed scroll container is announced only in generic terms, so name it whenever the content is a section in its own right.',
    },
    {
      zh: '自绘滚动条不是 `role="scrollbar"`，滑块与轨道都没有键盘绑定——它们纯粹是鼠标交互（拖滑块、点轨道跳转）。所幸原生滚动能力没被破坏：滚轮、触摸板、触屏拖拽都照常工作。',
      en: 'The custom scrollbar is not a `role="scrollbar"`, and neither the thumb nor the track has any keyboard binding — they are mouse-only affordances (drag the thumb, click the track to jump). Native scrolling is untouched, though: wheel, trackpad, and touch dragging all behave normally.',
    },
    {
      zh: '滚动条默认 `opacity-0`，只在指针悬停在整块区域或正在拖动时淡入。这很克制，但也意味着「这里可以滚」的视觉线索在触摸设备与静止状态下是缺席的——内容的裁切边缘就是唯一提示，所以别把最后一行正好切在容器底边上。',
      en: 'The scrollbar sits at `opacity-0` and fades in only while the pointer is over the region or the thumb is being dragged. That is restrained, but it also means the “this scrolls” cue is absent at rest and on touch devices: the clipped edge of the content is the only hint, so avoid ending the box exactly on a clean line break.',
    },
    {
      zh: '视口是 `scroll-smooth`，并带 `motion-reduce:scroll-auto`：用户开启减弱动效后，程序化滚动会瞬间到位。轨道与滑块的过渡同样有 `motion-reduce:` 兜底。',
      en: 'The viewport is `scroll-smooth` with a `motion-reduce:scroll-auto` fallback, so programmatic scrolling jumps instantly for users who ask for reduced motion. The track and thumb transitions have `motion-reduce:` fallbacks too.',
    },
    {
      zh: '轨道贴在行末侧（`end-0`），RTL 下自动挪到左边；但滑块的位置计算只处理纵向，横向溢出没有任何可见滚动条。',
      en: 'The track is pinned to the end edge (`end-0`) and moves to the left under RTL. The thumb maths only covers the vertical axis, though, so horizontal overflow gets no visible scrollbar at all.',
    },
  ],
}
