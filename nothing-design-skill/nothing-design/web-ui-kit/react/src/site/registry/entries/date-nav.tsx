import { DateNav } from 'nothing-ui/date-nav'
import type { ComponentDoc } from '../types'

import DateNavBasic from '../../examples/date-nav/basic'
import DateNavControlled from '../../examples/date-nav/controlled'

import basicSource from '../../examples/date-nav/basic.tsx?raw'
import controlledSource from '../../examples/date-nav/controlled.tsx?raw'

export const dateNavDoc: ComponentDoc = {
  slug: 'date-nav',
  name: 'DateNav',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '月份步进器，两侧箭头翻月，中间显示当前月份。',
    en: 'A month stepper — arrows on either side of the month you are looking at.',
  },
  preview: () => <DateNav />,
  importStatement: `import { DateNav } from 'nothing-ui/date-nav'`,
  usageSnippet: `<DateNav />`,
  composition: {
    zh: '不是日历——它不渲染任何日期网格，只是一条「‹  文案  ›」的翻页条，文案默认是当前内部日期格式化成的月份（如 `AUGUST 2026`）。它有两套完全独立的状态模型，混着用是最容易踩的坑：非受控模式下箭头点击既触发 `onPrev`/`onNext`，也会在内部把日期真的移动一个月并调用 `onDateChange`；一旦传了 `currentDate`（受控），箭头点击**只**调用 `onPrev`/`onNext`——组件不会替你计算下个月，也不会调 `onDateChange`，你必须在 `onPrev`/`onNext` 里自己算出新日期再传回 `currentDate`。第二个示例演示的就是这个受控写法。',
    en: 'It is not a calendar — no date grid is ever rendered. It is a “‹ label ›” strip whose label defaults to the current internal date formatted as a month, e.g. `AUGUST 2026`. It runs two entirely separate state models, and mixing them is the easiest mistake: uncontrolled, clicking an arrow both fires `onPrev`/`onNext` and moves the internal date forward or back a month, then calls `onDateChange`. The moment you pass `currentDate` (controlled), an arrow click calls **only** `onPrev`/`onNext` — the component does not compute the next month for you and never calls `onDateChange`; you must work out the new date inside `onPrev`/`onNext` yourself and feed it back through `currentDate`. That is exactly what the second example does.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '不传任何 props 就是最小可用形态：内部状态从 `new Date()`（或 `initialDate`）起步，箭头翻月，文案自动更新。这种非受控用法适合「只是想要个能翻的月份标题，不关心具体翻到哪个月」的场景。',
        en: 'The bare component is already usable: internal state starts at `new Date()` (or `initialDate`), the arrows step the month, and the label follows automatically. This uncontrolled shape suits “I just want a page-able month heading and do not care which month it lands on” situations.',
      },
      code: basicSource,
      render: () => <DateNavBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法与边界', en: 'Controlled, with boundaries' },
      description: {
        zh: '传了 `currentDate` 就必须自己在 `onPrev` / `onNext` 里算出下一个日期——组件在受控模式下不会动它。`prevDisabled` / `nextDisabled` 是纯展示层的开关（置灰、`pointer-events-none`、原生 `disabled`），到了边界日期要不要挡住继续翻页，同样是调用方的职责，组件不会替你比较日期范围。',
        en: 'Passing `currentDate` means you are now responsible for computing the next date inside `onPrev` / `onNext` — the component leaves it alone once controlled. `prevDisabled` / `nextDisabled` are purely cosmetic switches (dimmed, `pointer-events-none`, a native `disabled`); whether a boundary date should actually block further paging is likewise on you, since the component never compares dates on your behalf.',
      },
      code: controlledSource,
      render: () => <DateNavControlled />,
    },
  ],
  api: [
    {
      name: 'DateNav',
      description: {
        zh: '渲染为一个 `<div>`，透传原生 div 属性与 `ref`。',
        en: 'Renders a `<div>`. Native div props and `ref` are forwarded.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '覆盖中间显示的文案。传了它，组件就不再从 `currentDate` 推导文案——但内部日期状态照常存在并随箭头移动，只是不再显示，`data-month`/`data-year` 也仍然反映这个「看不见」的日期。适合把这个组件复用成任意步进器（周、季度……），而不只是月份。',
            en: 'Overrides the centre label. Once given, the component stops deriving the text from `currentDate` — but the internal date still exists and still steps with the arrows, it simply is not shown; `data-month` / `data-year` keep reflecting that invisible date. Handy for repurposing the component as a generic stepper (weeks, quarters, …) rather than strictly months.',
          },
        },
        {
          name: 'initialDate',
          type: 'Date',
          default: 'new Date()',
          description: {
            zh: '非受控模式下的初始日期。只在挂载时读取一次。',
            en: 'The starting date when uncontrolled. Read once, on mount.',
          },
        },
        {
          name: 'currentDate',
          type: 'Date',
          description: {
            zh: '受控日期。传了它，箭头就只触发 `onPrev`/`onNext`，不再自己前进/后退或调用 `onDateChange`。',
            en: 'The controlled date. Once passed, the arrows only fire `onPrev`/`onNext` — the component no longer advances on its own or calls `onDateChange`.',
          },
        },
        {
          name: 'onDateChange',
          type: '(date: Date) => void',
          description: {
            zh: '**仅在非受控模式下**触发，日期是组件替你算出来的下一个月。受控模式下这个回调永远不会被调用。',
            en: 'Fires **only when uncontrolled**, with the next month the component computed for you. In controlled mode this callback never fires.',
          },
        },
        {
          name: 'onPrev',
          type: '() => void',
          description: {
            zh: '点击左箭头时总会调用，无论受控与否。',
            en: 'Always called on a left-arrow click, controlled or not.',
          },
        },
        {
          name: 'onNext',
          type: '() => void',
          description: {
            zh: '点击右箭头时总会调用，无论受控与否。',
            en: 'Always called on a right-arrow click, controlled or not.',
          },
        },
        {
          name: 'prevDisabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '仅置灰左箭头并加原生 `disabled`。是否到达边界由调用方判断。',
            en: 'Dims the left arrow and sets a native `disabled`. Deciding whether a boundary was reached is on the caller.',
          },
        },
        {
          name: 'nextDisabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '同上，右箭头。', en: 'Same, for the right arrow.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '整体禁用：两侧箭头都变灰、`pointer-events-none`，且各自的 `disabled` 与 `prevDisabled`/`nextDisabled` 取或。',
            en: 'Disables the whole thing: both arrows dim and get `pointer-events-none`, each additionally OR-ed with `prevDisabled`/`nextDisabled`.',
          },
        },
        {
          name: 'grotesk',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '中间文案换成正文字体（否则是等宽大写）。',
            en: 'Switches the label to body type instead of the default uppercase monospace.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到根元素的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the root, merged via `tailwind-merge`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '两个箭头都是原生 `<button type="button">`，带 `aria-label`（`"Previous"` / `"Next"`）而不是靠 `‹`/`›` 字符表意——读屏会念出完整的英文单词，不会念出一个孤立符号。',
      en: 'Both arrows are native `<button type="button">` elements labelled `aria-label="Previous"` / `"Next"` rather than relying on the `‹`/`›` glyph — a screen reader announces the full word, not a lone symbol.',
    },
    {
      zh: '禁用态用的是原生 `disabled` 属性（不是 `aria-disabled`），所以被禁用的箭头会从 Tab 序列里彻底移除，键盘用户不会聚焦到一个按下去没反应的按钮上。',
      en: 'The disabled state uses the native `disabled` attribute rather than `aria-disabled`, so a disabled arrow drops out of the tab order entirely — keyboard users never land on a button that does nothing when pressed.',
    },
    {
      zh: '中间文案是一个纯 `<div>`，没有 `aria-live`。月份静默变化对读屏用户不可见，除非文案本身处于其他会被朗读的容器里——多数场景下这是合理的（翻页是用户主动触发的，能立刻在视觉上看到变化），但如果这条月份文案驱动了页面别处的大量内容切换，考虑额外包一层 `aria-live="polite"`。',
      en: 'The label itself is a plain `<div>` with no `aria-live`. The month change is silent to a screen reader unless the label happens to sit inside some other announced container — usually fine, since the user just triggered the change and sees it immediately, but if this label is driving a large content swap elsewhere on the page, wrap it in your own `aria-live="polite"` region.',
    },
    {
      zh: '触达尺寸：两个箭头都是 `size-11`（44px），等于 `--touch-target-min`，触屏上不会出现相邻可点区域打架的问题。',
      en: 'Hit target: both arrows are `size-11` (44px), matching `--touch-target-min`, so adjacent tap targets do not fight each other on a touchscreen.',
    },
  ],
}
