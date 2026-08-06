import { DateField } from 'aios-ui-kit/date-field'
import type { ComponentDoc } from '../types'

import DateFieldBasic from '../../examples/date-field/basic'
import DateFieldWithLabel from '../../examples/date-field/with-label'
import DateFieldLocales from '../../examples/date-field/locales'

import basicSource from '../../examples/date-field/basic.tsx?raw'
import withLabelSource from '../../examples/date-field/with-label.tsx?raw'
import localesSource from '../../examples/date-field/locales.tsx?raw'

export const dateFieldDoc: ComponentDoc = {
  slug: 'date-field',
  name: 'DateField',
  category: 'actions-inputs',
  status: 'beta',
  baseUi: '—（自实现，参照 OTP 分格）',
  description: {
    zh: '日期分格输入，年月日三段，输满自动跳段。',
    en: 'A date input split into year/month/day segments that auto-advance.',
  },
  preview: () => <DateField defaultValue="2026-08-06" />,
  importStatement: `import { DateField } from 'aios-ui-kit/date-field'`,
  usageSnippet: `<DateField onValueChange={(value) => console.log(value)} />`,
  composition: {
    zh: '没有现成的 date-field 原语，DateField 参照 InputOTP 的分格模式自实现：每段是一个带边框的槽位，里面铺一个完全透明的原生 `<input>`，光标用 `caret-transparent` 隐藏，聚焦改由段边框变色表达。三段共用一套受控状态，`value` / `onValueChange` 都是整段 ISO 字符串。',
    en: 'There is no date-field primitive, so DateField follows InputOTP’s segmented pattern: each segment is a bordered slot with a fully transparent native `<input>` inside, the caret hidden via `caret-transparent`, and focus expressed by the slot border. The three segments share one controlled state; `value` / `onValueChange` deal in the whole ISO string.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '默认 zh 顺序为年-月-日。一段输满后焦点自动跳到下一段，退格在空段上会回退到上一段并清掉一位。月份超过 12、日期超过 31 会被钳制。',
        en: 'The default zh order is year-month-day. Filling a segment advances focus to the next; Backspace on an empty segment steps back and deletes a digit there. Months above 12 and days above 31 are clamped.',
      },
      code: basicSource,
      render: () => <DateFieldBasic />,
    },
    {
      id: 'with-label',
      title: { zh: '标签与默认值', en: 'Label and default value' },
      description: {
        zh: '`label` 渲染在段上方；`defaultValue` 接受 ISO 字符串作为非受控初值，`value` 则用于受控。',
        en: '`label` renders above the segments; `defaultValue` accepts an ISO string as the uncontrolled initial value, while `value` drives it controlled.',
      },
      code: withLabelSource,
      render: () => <DateFieldWithLabel />,
    },
    {
      id: 'locales',
      title: { zh: '段顺序', en: 'Segment order' },
      description: {
        zh: '`locale="zh"`（默认）排成 YMD，`locale="en"` 排成 MDY。两端的 `value` 始终是 ISO `YYYY-MM-DD`，顺序只影响视觉。',
        en: '`locale="zh"` (default) lays out as YMD, `locale="en"` as MDY. The `value` is always ISO `YYYY-MM-DD` either way — the order is purely visual.',
      },
      code: localesSource,
      render: () => <DateFieldLocales />,
    },
  ],
  api: [
    {
      name: 'DateField',
      description: {
        zh: '渲染为 `<div role="group">`，透传其余原生 div 属性。',
        en: 'Renders a `<div role="group">` and forwards the remaining native div props.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控的 ISO 日期 `YYYY-MM-DD`。传了即受控。',
            en: 'The controlled ISO date `YYYY-MM-DD`. Once passed, you own it.',
          },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: {
            zh: '非受控初始值。',
            en: 'The uncontrolled initial value.',
          },
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
          name: 'locale',
          type: `'zh' | 'en'`,
          default: `'zh'`,
          description: {
            zh: '段顺序：zh=年月日，en=月日年。',
            en: 'Segment order: zh=year-month-day, en=month-day-year.',
          },
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
            zh: '各段占位提示，覆盖默认的 YYYY/MM/DD。',
            en: 'Placeholder for each segment, overriding the default YYYY/MM/DD.',
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
      zh: '容器带 `role="group"` 与 `aria-label`，每段是真正的 `<input inputMode="numeric">` 并各自带 `aria-label`（Year / Month / Day），读屏能播报当前段。',
      en: 'The container carries `role="group"` and an `aria-label`; each segment is a real `<input inputMode="numeric">` with its own `aria-label` (Year / Month / Day), so a screen reader announces the focused segment.',
    },
    {
      zh: '方向键在段间移动焦点；退格在空段上回退到上一段并清掉一位，与 OTP 一致。',
      en: 'Arrow keys move focus between segments; Backspace on an empty segment steps back and deletes a digit, matching OTP behaviour.',
    },
    {
      zh: '`error` 触发时段置 `aria-invalid`，并下方放一个 `role="alert"` 的文案元素用于播报。',
      en: 'When `error` is set, segments get `aria-invalid` and a `role="alert"` message element is rendered below for announcement.',
    },
    {
      zh: '所有颜色过渡都带 `motion-reduce:transition-none` 兜底。',
      en: 'Every colour transition carries a `motion-reduce:transition-none` fallback.',
    },
  ],
}
