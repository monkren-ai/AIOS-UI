import { ColorPicker } from 'aios-ui-kit/color-picker'
import type { ComponentDoc } from '../types'

import ColorPickerBasic from '../../examples/color-picker/basic'
import ColorPickerControlled from '../../examples/color-picker/controlled'
import ColorPickerCustomPresets from '../../examples/color-picker/custom-presets'

import basicSource from '../../examples/color-picker/basic.tsx?raw'
import controlledSource from '../../examples/color-picker/controlled.tsx?raw'
import customPresetsSource from '../../examples/color-picker/custom-presets.tsx?raw'

export const colorPickerDoc: ComponentDoc = {
  slug: 'color-picker',
  name: 'ColorPicker',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '预设色板取色，也可以打开系统取色器或直接敲十六进制。',
    en: 'Pick from swatches, open the native picker, or just type a hex value.',
  },
  preview: () => <ColorPicker defaultValue="#D71921" />,
  importStatement: `import { ColorPicker } from 'aios-ui-kit/color-picker'`,
  usageSnippet: `<ColorPicker defaultValue="#D71921" onChange={(color) => console.log(color)} />`,
  composition: {
    zh: '结构分三层：标题行（`title` + 当前值的十六进制回显）、色板行（预设色块 + 一个打开原生 `<input type="color">` 的自定义色块）、以及可选的十六进制 `Input`（内部复用了 `Input` 组件，前面带一个当前色的小方块预览）。',
    en: 'Three layers: a header row (`title` plus the current hex echoed back), a swatch row (preset chips plus a custom chip that opens a hidden native `<input type="color">`), and an optional hex `Input` — it reuses the `Input` component, with a small preview chip in its leading slot.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '不传 `presets` 时使用内置的 8 色默认色板。`defaultValue` 给非受控的初始颜色，未设置时取默认色板的第一个颜色。',
        en: 'Without `presets`, it falls back to a built-in set of 8 colours. `defaultValue` seeds the uncontrolled starting colour, defaulting to the first preset when omitted.',
      },
      code: basicSource,
      render: () => <ColorPickerBasic />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '`onChange` 在点击预设色块、通过原生取色器选色、或在十六进制输入框里敲出合法颜色时都会触发，参数统一是大写的 `#RRGGBB` 字符串——三种输入路径最终都收敛到同一个值。',
        en: '`onChange` fires whether the colour comes from a preset click, the native picker, or a valid hex typed into the field — all three paths converge on the same uppercase `#RRGGBB` string.',
      },
      code: controlledSource,
      render: () => <ColorPickerControlled />,
    },
    {
      id: 'custom-presets',
      title: { zh: '自定义色板', en: 'Custom presets' },
      description: {
        zh: '`presets` 可以换成任意十六进制数组；`showInput={false}` 去掉底部的手动输入框，适合只想让用户从固定色板里选的场景；`size` 同时控制卡片宽度与色块尺寸。',
        en: '`presets` accepts any array of hex strings; `showInput={false}` drops the manual field for cases where the choice should stay confined to a fixed palette; `size` scales both the card width and the swatch chips.',
      },
      code: customPresetsSource,
      render: () => <ColorPickerCustomPresets />,
    },
  ],
  api: [
    {
      name: 'ColorPicker',
      description: {
        zh: '渲染为 `<div>`，除 `children` / `onChange` / `value` / `defaultValue` 外的原生 div 属性都会透传。',
        en: 'Renders a `<div>` and forwards every native div prop except `children`, `onChange`, `value`, and `defaultValue`.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控的十六进制颜色值，例如 `"#D71921"`。传了它就完全由你控制。',
            en: 'The controlled hex colour, e.g. `"#D71921"`. Once passed, you own the value.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          default: 'presets[0]',
          description: {
            zh: '非受控时的初始颜色，未设置时取 `presets` 的第一个值。',
            en: 'The initial colour when uncontrolled, defaulting to the first entry of `presets`.',
          },
        },
        {
          name: 'onChange',
          type: '(color: string) => void',
          description: {
            zh: '颜色变化回调，参数是大写的十六进制字符串，如 `"#D71921"`。',
            en: 'Called with the new colour as an uppercase hex string, e.g. `"#D71921"`.',
          },
        },
        {
          name: 'presets',
          type: 'string[]',
          default: '8 个内置十六进制色值',
          description: {
            zh: '色板数组，每项是十六进制颜色字符串。',
            en: 'An array of hex colour strings rendered as swatches.',
          },
        },
        {
          name: 'title',
          type: 'string',
          default: `'COLOR'`,
          description: {
            zh: '标题行左侧文案，等宽大写。',
            en: 'The header label, monospaced and uppercase.',
          },
        },
        {
          name: 'showInput',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '是否渲染底部的十六进制手动输入框。',
            en: 'Whether to render the manual hex input at the bottom.',
          },
        },
        {
          name: 'inputLabel',
          type: 'string',
          default: `'HEX'`,
          description: {
            zh: '手动输入框的字段标签。',
            en: 'The field label on the manual hex input.',
          },
        },
        {
          name: 'customLabel',
          type: 'string',
          default: `'Custom'`,
          description: {
            zh: '自定义色块的可访问名称（`aria-label`）与其上的文字。',
            en: 'The accessible name (`aria-label`) and visible text on the custom swatch.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '色块边长（36 / 44 / 52px）与整卡最大宽度。',
            en: 'The swatch side length (36 / 44 / 52px) and the card’s max width.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes on the outer container, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'colorPickerVariants',
      description: {
        zh: '外层卡片的 CVA 函数。标题、色板、单个色块等各自的 CVA（`colorPickerSwatchVariants` 等）也从子路径导出，供自定义结构时取用。',
        en: 'The CVA function for the outer card. The header, swatch grid, and individual swatch each have their own CVA (`colorPickerSwatchVariants`, etc.), also exported from the subpath for custom layouts.',
      },
      props: [
        {
          name: 'size',
          type: 'ColorPickerSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每个预设色块都是真正的 `<button aria-label="Select color #HEX" aria-pressed>`，选中态既能通过 `aria-pressed` 播报，也有一圈实体 `outline` 描边，不单靠颜色区分。',
      en: 'Every preset is a real `<button aria-label="Select color #HEX" aria-pressed>`; the selected state is announced via `aria-pressed` and also drawn as a solid outline, never colour alone.',
    },
    {
      zh: '自定义色块内部藏着一个 `aria-hidden` 且 `tabIndex={-1}` 的原生 `<input type="color">`，靠点击外层按钮触发；键盘用户无法直接 Tab 到它，只能先聚焦按钮再回车/空格打开。',
      en: 'The custom swatch hides a native `<input type="color">` that is `aria-hidden` and `tabIndex={-1}`, triggered by clicking the outer button; keyboard users cannot Tab into it directly, only focus the button and press Enter/Space to open it.',
    },
    {
      zh: '色板容器是 `role="group" aria-label="Color presets"`，把一组色块归为一个可访问单元，读屏软件报数量与边界更准确。',
      en: 'The swatch row is `role="group" aria-label="Color presets"`, grouping the chips into one accessible unit so a screen reader reports the count and boundaries correctly.',
    },
    {
      zh: '手动输入框复用 `Input`，因此继承其 `label` 关联；但它本身不做十六进制合法性以外的校验，也不会在非法输入时给出错误提示，仅仅是「不合法就不提交」。',
      en: 'The manual field reuses `Input` and inherits its `label` association, but it performs no validation beyond checking hex syntax and shows no error state — an invalid value is simply not committed.',
    },
    {
      zh: '色块的 hover 与颜色过渡都带 `motion-reduce:` 前缀，减弱动效下悬停不再放大。',
      en: 'The swatch hover and colour transitions both carry `motion-reduce:` variants, so hovering no longer scales the chip under reduced motion.',
    },
  ],
}
