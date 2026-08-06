import { DatePicker } from 'aios-ui-kit/date-picker'
import type { ComponentDoc } from '../types'

import DatePickerBasic from '../../examples/date-picker/basic'
import DatePickerWithLabel from '../../examples/date-picker/with-label'
import DatePickerControlled from '../../examples/date-picker/controlled'

import basicSource from '../../examples/date-picker/basic.tsx?raw'
import withLabelSource from '../../examples/date-picker/with-label.tsx?raw'
import controlledSource from '../../examples/date-picker/controlled.tsx?raw'

export const datePickerDoc: ComponentDoc = {
  slug: 'date-picker',
  name: 'DatePicker',
  category: 'overlays',
  status: 'beta',
  baseUi: 'Popover + Calendar',
  description: {
    zh: '日期选择浮层，点击输入框弹出日历。',
    en: 'A date picker that pops a calendar when the field is clicked.',
  },
  preview: () => <DatePicker defaultValue="2026-08-06" />,
  importStatement: `import { DatePicker } from 'aios-ui-kit/date-picker'`,
  usageSnippet: `<DatePicker onValueChange={(value) => console.log(value)} />`,
  composition: {
    zh: '由项目内的 Popover 包一个按钮触发器构成：触发器复用 Input 的 `inputControlVariants` 视觉，浮层内嵌一个可选日历。由于 `Calendar` 本身是只读展示件、没有 `onSelect`，DatePicker 直接复用它的视觉变体（`dayVariants` / `calendarWeekdayVariants` / `calendarNavButtonVariants`）并自己持有选中态与翻页逻辑。`value` / `onValueChange` 始终是 ISO `YYYY-MM-DD`。',
    en: 'A button trigger wrapped in the in-repo Popover, reusing Input’s `inputControlVariants` for the trigger look, with a selectable calendar popped inside. Because `Calendar` is read-only with no `onSelect`, DatePicker reuses its visual variants (`dayVariants` / `calendarWeekdayVariants` / `calendarNavButtonVariants`) and owns the selection and paging state itself. `value` / `onValueChange` are always ISO `YYYY-MM-DD`.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '点击触发器弹出日历，选中某天后浮层关闭并把 ISO 日期回填进触发器。未选中时显示 `placeholder`。',
        en: 'Click the trigger to pop the calendar; picking a day closes the popover and writes the ISO date back into the trigger. When empty, `placeholder` is shown.',
      },
      code: basicSource,
      render: () => <DatePickerBasic />,
    },
    {
      id: 'with-label',
      title: { zh: '标签与默认值', en: 'Label and default value' },
      description: {
        zh: '`label` 渲染在触发器上方；`defaultValue` 给非受控初值。`locale` 决定触发器显示格式：zh=`YYYY-MM-DD`，en=`MM/DD/YYYY`。',
        en: '`label` renders above the trigger; `defaultValue` seeds the uncontrolled value. `locale` sets the trigger display format: zh=`YYYY-MM-DD`, en=`MM/DD/YYYY`.',
      },
      code: withLabelSource,
      render: () => <DatePickerWithLabel />,
    },
    {
      id: 'controlled',
      title: { zh: '受控', en: 'Controlled' },
      description: {
        zh: '传 `value` + `onValueChange` 即受控；选中后回调收到 ISO 字符串。',
        en: 'Pass `value` + `onValueChange` for control; on select the callback receives the ISO string.',
      },
      code: controlledSource,
      render: () => <DatePickerControlled />,
    },
  ],
  api: [
    {
      name: 'DatePicker',
      description: {
        zh: '渲染为 `<div>`，透传其余原生 div 属性。',
        en: 'Renders a `<div>` and forwards the remaining native div props.',
      },
      props: [
        {
          name: 'value',
          type: 'string',
          description: {
            zh: '受控 ISO 日期 `YYYY-MM-DD`。',
            en: 'The controlled ISO date `YYYY-MM-DD`.',
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
            zh: '选中某天后调用，参数是 ISO `YYYY-MM-DD`。',
            en: 'Called after a day is picked, with the ISO `YYYY-MM-DD` string.',
          },
        },
        {
          name: 'locale',
          type: `'zh' | 'en'`,
          default: `'zh'`,
          description: {
            zh: '触发器显示格式：zh=`YYYY-MM-DD`，en=`MM/DD/YYYY`。',
            en: 'Trigger display format: zh=`YYYY-MM-DD`, en=`MM/DD/YYYY`.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '触发器高度：36 / 44 / 52px。', en: 'Trigger height: 36 / 44 / 52px.' },
        },
        {
          name: 'placeholder',
          type: 'string',
          default: `'Select date'`,
          description: { zh: '未选中时触发器显示的占位文本。', en: 'Text shown in the trigger when nothing is selected.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用触发器，浮层无法打开。', en: 'Disable the trigger so the popover cannot open.' },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案；有值时触发器边框转红、置 `aria-invalid` 并在下方播报。',
            en: 'Error text; when set, the trigger border turns red, `aria-invalid` is set, and the message is announced below.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签。', en: 'Field label.' },
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
      zh: '触发器是原生 `<button>`，天然可聚焦、在 tab 序列内，Enter 与 Space 都能打开浮层。日历单元格也是 `<button>`，键盘可逐个聚焦。',
      en: 'The trigger is a native `<button>`, so it is focusable, in the tab order, and opens the popover on Enter and Space. Calendar cells are `<button>`s too, individually focusable by keyboard.',
    },
    {
      zh: '每个日历格带 `aria-label`（完整日期串）与 `aria-pressed`，读屏能播报「哪一天」与是否选中。',
      en: 'Each calendar cell carries an `aria-label` (full date string) and `aria-pressed`, so a screen reader announces which day and whether it is selected.',
    },
    {
      zh: '上/下月按钮各自带明确 `aria-label`，不依赖 `<` `>` 符号传达含义。',
      en: 'The previous/next-month buttons each carry an explicit `aria-label` and do not rely on the `<`/`>` glyphs alone.',
    },
    {
      zh: '`error` 触发时触发器置 `aria-invalid`，下方放一个 `role="alert"` 的文案元素。',
      en: 'When `error` is set, the trigger gets `aria-invalid` and a `role="alert"` message element is rendered below.',
    },
  ],
}
