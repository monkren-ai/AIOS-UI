import { QuickToggle } from 'aios-ui-kit/quick-toggle'
import type { ComponentDoc } from '../types'

import QuickToggleBasic from '../../examples/quick-toggle/basic'
import QuickToggleVariantPill from '../../examples/quick-toggle/pill'
import QuickToggleThemes from '../../examples/quick-toggle/themes'

import basicSource from '../../examples/quick-toggle/basic.tsx?raw'
import pillSource from '../../examples/quick-toggle/pill.tsx?raw'
import themesSource from '../../examples/quick-toggle/themes.tsx?raw'

export const quickToggleDoc: ComponentDoc = {
  slug: 'quick-toggle',
  name: 'QuickToggle',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '控制中心风格的图标开关，圆形或方形两种外形。',
    en: 'A control-centre style icon toggle, either round or square.',
  },
  preview: () => <QuickToggle label="Wi-Fi" active theme="accent" />,
  importStatement: `import { QuickToggle } from 'aios-ui-kit/quick-toggle'`,
  usageSnippet: `<QuickToggle icon={<WifiIcon />} label="Wi-Fi" active={on} onClick={() => setOn((v) => !v)} />`,
  composition: {
    zh: '渲染为一个原生 `<button>`，`icon` 与 `label` 都是可选插槽——只给图标就是纯图标块，只给文字就是纯文字块。组件本身不维护开关状态，`active` 完全由外部传入，点击只触发 `onClick`。',
    en: 'It renders as a plain `<button>`; `icon` and `label` are both optional slots — icon only gives an icon-only tile, label only gives a text-only one. The component holds no toggle state itself: `active` is entirely externally driven, and a click only fires `onClick`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认 `variant="circle"`。示例里颜色随 `active` 手动在 `light` 与 `accent` 之间切换——这不是组件自带的行为，`theme` 只是一个静态外观 prop，「开启时变成强调色」是调用方自己接的一层逻辑。',
        en: 'The default `variant` is `circle`. In this example, colour is manually switched between `light` and `accent` based on `active` — that is not built into the component; `theme` is just a static appearance prop, and “turn accent when on” is wiring the caller adds.',
      },
      code: basicSource,
      render: () => <QuickToggleBasic />,
    },
    {
      id: 'pill',
      title: { zh: '方形/胶囊变体', en: 'Pill variant' },
      description: {
        zh: '`variant="pill"` 换成横向的胶囊形状，图标与文字并排，适合文案比图标更重要的开关，比如「Do Not Disturb」这种需要读出完整语义的场景。',
        en: '`variant="pill"` switches to a horizontal capsule with the icon and label side by side — a better fit when the wording matters more than the glyph, like “Do Not Disturb”, where the full phrase needs to be legible.',
      },
      code: pillSource,
      render: () => <QuickToggleVariantPill />,
    },
    {
      id: 'themes',
      title: { zh: '配色', en: 'Themes' },
      description: {
        zh: '`theme` 有三档：`light` 是控制中心默认的浅卡片；`dark` 用于深色磁贴场景；`accent` 是唯一使用 AIOS 红底的一档，通常用来表示「已开启」的强调状态。',
        en: 'There are three themes: `light` is the default light control-centre tile; `dark` fits a dark-tile context; `accent` is the only one filled with AIOS red, typically standing in for an emphasised “on” state.',
      },
      code: themesSource,
      render: () => <QuickToggleThemes />,
    },
  ],
  api: [
    {
      name: 'QuickToggle',
      description: {
        zh: '渲染为 `<button type="button">`，除组件自身消费的选项外，其余原生 button 属性（`onClick`、`disabled`、`aria-*` …）都会透传。',
        en: 'Renders a `<button type="button">` and forwards every native button prop (`onClick`, `disabled`, `aria-*`, …) besides the options the component consumes itself.',
      },
      props: [
        {
          name: 'variant',
          type: `'circle' | 'pill'`,
          default: `'circle'`,
          description: {
            zh: '外形：圆形磁贴还是横向胶囊。',
            en: 'Shape: a round tile or a horizontal pill.',
          },
        },
        {
          name: 'theme',
          type: `'light' | 'dark' | 'accent'`,
          default: `'light'`,
          description: {
            zh: '底色与文字/图标配色的组合。',
            en: 'The background paired with matching icon/label colours.',
          },
        },
        {
          name: 'active',
          type: 'boolean',
          description: {
            zh: '不改变任何默认外观，只驱动 `aria-pressed` 与 `data-state="on" | "off"`。视觉上的「开启态」由你通过 `theme` 或额外的 `className` 自己表达。',
            en: 'Does not change the default appearance at all — it only drives `aria-pressed` and `data-state="on" | "off"`. Any visual “on” state has to be expressed yourself, typically via `theme` or an extra `className`.',
          },
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description: {
            zh: '图标插槽，`24px` 见方，`fill-current` 跟随文字颜色。',
            en: 'The icon slot, 24px square, filled with `fill-current` to follow the text colour.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '文字插槽，超长时 `truncate` 省略。',
            en: 'The label slot; overly long text is truncated.',
          },
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
      name: 'quickToggleVariants',
      description: {
        zh: '生成按钮类名的 CVA 函数。图标与文字槽位分别对应 `quickToggleIconVariants` 与 `quickToggleLabelVariants`，均从主路径导出。',
        en: 'The CVA function behind the button’s classes. The icon and label slots map to `quickToggleIconVariants` and `quickToggleLabelVariants`, both exported from the main path.',
      },
      props: [
        {
          name: 'variant',
          type: `'circle' | 'pill'`,
          default: `'circle'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark' | 'accent'`,
          default: `'light'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '组件是真正的 `<button aria-pressed>`，`aria-pressed` 直接取自 `active`（未传时为 `false`），读屏软件会把它播报成一个 toggle button 而不是普通按钮。',
      en: 'The component is a genuine `<button aria-pressed>`, with `aria-pressed` taken straight from `active` (defaulting to `false`), so a screen reader announces it as a toggle button rather than a plain one.',
    },
    {
      zh: '`icon` 没有内置的 `aria-hidden`，也没有为纯图标按钮自动生成可访问名称——只传 `icon` 不传 `label` 时，必须自己补一个 `aria-label`，否则读屏用户只会听到「按钮」两个字。',
      en: 'There is no built-in `aria-hidden` on `icon`, and no auto-generated accessible name for an icon-only button — pass `icon` without `label` and you must add your own `aria-label`, or a screen-reader user hears nothing but “button”.',
    },
    {
      zh: '`active` 不影响任何视觉样式，这意味着「开启」状态如果只靠 `aria-pressed` 表达，视力正常的用户完全看不出区别——必须像示例那样，自己用 `theme` 或 `className` 做出可见的开/关差异。',
      en: 'Because `active` changes no visual styling by itself, relying on `aria-pressed` alone leaves sighted users with no visible cue that anything toggled — you have to add a visible on/off difference yourself, via `theme` or `className`, as the examples do.',
    },
    {
      zh: '点击时的按下反馈是 `active:scale-95`，并带 `motion-reduce:active:scale-100`，减弱动效下不再有缩放。',
      en: 'The press feedback is `active:scale-95`, with `motion-reduce:active:scale-100`, so reduced motion drops the scale entirely.',
    },
  ],
}
