import { TimeField } from 'aios-ui-kit/time-field'
import type { ComponentDoc } from '../types'

import TimeFieldBasic from '../../examples/time-field/basic'
import TimeFieldWithSeconds from '../../examples/time-field/with-seconds'
import TimeFieldWithLabel from '../../examples/time-field/with-label'

import basicSource from '../../examples/time-field/basic.tsx?raw'
import withSecondsSource from '../../examples/time-field/with-seconds.tsx?raw'
import withLabelSource from '../../examples/time-field/with-label.tsx?raw'

export const timeFieldDoc: ComponentDoc = {
  slug: 'time-field',
  name: 'TimeField',
  category: 'actions-inputs',
  status: 'beta',
  baseUi: '—（自实现，参照 OTP 分格）',
  description: {
    zh: '时分秒分格输入，可选秒段。',
    en: 'A time input split into hour/minute/second segments, seconds optional.',
  },
  preview: () => <TimeField showSeconds defaultValue="13:08:06" />,
  importStatement: `import { TimeField } from 'aios-ui-kit/time-field'`,
  usageSnippet: `<TimeField showSeconds onValueChange={(value) => console.log(value)} />`,
  composition: {
    zh: '没有现成的 time-field 原语，TimeField 参照 InputOTP 的分格模式自实现：每段是一个带边框的槽位加一个铺满、完全透明的原生 `<input>`。24 小时制，小时超过 23、分秒超过 59 会被钳制。`showSeconds` 控制是否渲染秒段。',
    en: 'There is no time-field primitive, so TimeField follows InputOTP’s segmented pattern: each segment is a bordered slot with a fully transparent native `<input>` inside. It is 24-hour; hours above 23 and minutes/seconds above 59 are clamped. `showSeconds` toggles the seconds segment.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认只有时与分两段。一段输满后焦点自动跳到下一段，退格在空段上会回退到上一段并清掉一位。',
        en: 'By default only hour and minute are shown. Filling a segment advances focus; Backspace on an empty segment steps back and deletes a digit.',
      },
      code: basicSource,
      render: () => <TimeFieldBasic />,
    },
    {
      id: 'with-seconds',
      title: { zh: '秒段', en: 'With seconds' },
      description: {
        zh: '`showSeconds` 打开后多出秒段，`value` / `onValueChange` 随之变成 `HH:mm:ss`。',
        en: 'With `showSeconds` on, a seconds segment appears, and `value` / `onValueChange` become `HH:mm:ss`.',
      },
      code: withSecondsSource,
      render: () => <TimeFieldWithSeconds />,
    },
    {
      id: 'with-label',
      title: { zh: '标签', en: 'Label' },
      description: {
        zh: '`label` 渲染在段上方；24 小时制下小时上限是 23。',
        en: '`label` renders above the segments; under the 24-hour clock the hour ceiling is 23.',
      },
      code: withLabelSource,
      render: () => <TimeFieldWithLabel />,
    },
  ],
  api: [
    {
      name: 'TimeField',
      description: {
        zh: '渲染为 `<div role="group">`，透传其余原生 div 属性。',
        en: 'Renders a `<div role="group">` and forwards the remaining native div props.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控时间 `HH:mm` 或 `HH:mm:ss`。传了即受控。',
            en: 'The controlled time `HH:mm` or `HH:mm:ss`. Once passed, you own it.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: { zh: '非受控初始值。', en: 'The uncontrolled initial value.' },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '任意段变化后调用，参数是拼接后的字符串。',
            en: 'Called after any change with the joined string.',
          },
        },
        {
          name: 'showSeconds',
          type: 'boolean',
          default: 'false',
          description: { zh: '是否渲染秒段。', en: 'Whether to render the seconds segment.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '段高度：36 / 44 / 52px。', en: 'Segment height: 36 / 44 / 52px.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用全部段。', en: 'Disable every segment.' },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案；有值时段边框转红、置 `aria-invalid` 并在下方播报。',
            en: 'Error text; when set, segment borders turn red, `aria-invalid` is set, and the message is announced below.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签。', en: 'Field label.' },
        },
        {
          name: 'placeholder',
          type: 'string',
          description: {
            zh: '各段占位提示，覆盖默认的 HH/mm/ss。',
            en: 'Placeholder for each segment, overriding the default HH/mm/ss.',
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
  ],
  accessibility: [
    {
      zh: '容器带 `role="group"` 与 `aria-label`，每段是真正的 `<input inputMode="numeric">` 并各自带 `aria-label`（Hour / Minute / Second）。',
      en: 'The container carries `role="group"` and an `aria-label`; each segment is a real `<input inputMode="numeric">` with its own `aria-label` (Hour / Minute / Second).',
    },
    {
      zh: '方向键在段间移动焦点；退格在空段上回退到上一段并清掉一位。',
      en: 'Arrow keys move focus between segments; Backspace on an empty segment steps back and deletes a digit.',
    },
    {
      zh: '`error` 触发时段置 `aria-invalid`，并下方放一个 `role="alert"` 的文案元素用于播报。',
      en: 'When `error` is set, segments get `aria-invalid` and a `role="alert"` message element is rendered below.',
    },
    {
      zh: '所有颜色过渡都带 `motion-reduce:transition-none` 兜底。',
      en: 'Every colour transition carries a `motion-reduce:transition-none` fallback.',
    },
  ],
}
