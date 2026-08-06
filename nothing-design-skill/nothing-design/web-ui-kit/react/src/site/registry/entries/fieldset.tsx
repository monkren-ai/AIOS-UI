import { Fieldset } from 'aios-ui-kit/fieldset'
import type { ComponentDoc } from '../types'

import FieldsetBasic from '../../examples/fieldset/basic'
import FieldsetWithFields from '../../examples/fieldset/with-fields'

import basicSource from '../../examples/fieldset/basic.tsx?raw'
import withFieldsSource from '../../examples/fieldset/with-fields.tsx?raw'

export const fieldsetDoc: ComponentDoc = {
  slug: 'fieldset',
  name: 'Fieldset',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Fieldset',
  description: {
    zh: '字段分组，带 legend 标题与 1px 边框。',
    en: 'A field group with a legend and a 1px border.',
  },
  preview: () => (
    <Fieldset legend="通知">
      <label className="flex items-center gap-2 font-mono text-sm text-foreground">
        <input type="checkbox" />
        接收邮件
      </label>
    </Fieldset>
  ),
  importStatement: `import { Fieldset } from 'aios-ui-kit/fieldset'`,
  usageSnippet: `<Fieldset legend="通知">
  <input type="checkbox" />
</Fieldset>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '渲染原生 `<fieldset>` + `<legend>`，1px 边框、`rounded-card` 圆角。',
        en: 'Renders a native `<fieldset>` + `<legend>`, with a 1px border and `rounded-card` rounding.',
      },
      code: basicSource,
      render: () => <FieldsetBasic />,
    },
    {
      id: 'with-fields',
      title: { zh: '裹多个 Field', en: 'With Fields' },
      description: {
        zh: '把多个 Field 放进 Fieldset；`disabled` 透传给 Base UI，会连带禁用内部的 Field 与控件。',
        en: 'Drop several Fields into a Fieldset; `disabled` propagates through Base UI, disabling the inner Fields and controls too.',
      },
      code: withFieldsSource,
      render: () => <FieldsetWithFields />,
    },
  ],
  api: [
    {
      name: 'Fieldset',
      description: {
        zh: '渲染 Base UI Fieldset.Root（`<fieldset>`），隐式 `role="group"`。',
        en: 'Renders Base UI Fieldset.Root (`<fieldset>`), implicitly `role="group"`.',
      },
      props: [
        {
          name: 'legend',
          type: 'string',
          description: { zh: '分组标题，渲染为 `<legend>`。', en: 'Group title, rendered as a `<legend>`.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用整组，透传给 Base UI，连带禁用内部 Field。',
            en: 'Disables the whole group; propagates through Base UI to inner Fields.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: { zh: '分组内容，通常是若干 Field。', en: 'Group content, typically several Fields.' },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名，经 `tailwind-merge` 合并。',
            en: 'Extra classes, merged via `tailwind-merge`.',
          },
        },
      ],
    },
    {
      name: 'fieldsetVariants',
      description: { zh: '容器类名的 CVA 函数。', en: 'The CVA factory behind the container classes.' },
      props: [],
    },
  ],
  accessibility: [
    {
      zh: '渲染原生 `<fieldset>`，隐式 `role="group"`；`<legend>` 自动成为分组的无障碍名。',
      en: 'Renders a native `<fieldset>`, implicitly `role="group"`; the `<legend>` becomes the group’s accessible name.',
    },
    {
      zh: 'Base UI 还会给 `<fieldset>` 补 `aria-labelledby` 指向 legend，双保险。',
      en: 'Base UI additionally sets `aria-labelledby` on the `<fieldset>` pointing at the legend, as a belt-and-braces measure.',
    },
    {
      zh: '`disabled` 透传到 `<fieldset disabled>`，原生行为会禁用内部所有表单控件。',
      en: '`disabled` reaches `<fieldset disabled>`, whose native behavior disables every form control inside.',
    },
  ],
}
