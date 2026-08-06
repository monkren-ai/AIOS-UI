import { Field } from 'aios-ui-kit/field'
import type { ComponentDoc } from '../types'

import FieldBasic from '../../examples/field/basic'
import FieldWithError from '../../examples/field/with-error'
import FieldWithInput from '../../examples/field/with-input'

import basicSource from '../../examples/field/basic.tsx?raw'
import withErrorSource from '../../examples/field/with-error.tsx?raw'
import withInputSource from '../../examples/field/with-input.tsx?raw'

export const fieldDoc: ComponentDoc = {
  slug: 'field',
  name: 'Field',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Field',
  description: {
    zh: '表单字段壳，统一 label、说明与错误文案的排版。',
    en: 'A form field shell that keeps labels, hints, and errors in lockstep.',
  },
  preview: () => (
    <Field label="邮箱" description="用于登录">
      <input className="h-11 min-w-0 rounded-input border border-border-visible bg-transparent px-3 font-mono text-foreground outline-none focus:border-foreground" />
    </Field>
  ),
  importStatement: `import { Field } from 'aios-ui-kit/field'`,
  usageSnippet: `<Field label="邮箱" description="用于登录">
  <input className="..." />
</Field>`,
  composition: {
    zh: 'Field 自带 label / description / error / required / disabled。也可拆开用 Field.Label、Field.Description、Field.Error 自行组合，Field.Error 走 Base UI 的校验链（配合 validate / invalid）。',
    en: 'Field ships label / description / error / required / disabled out of the box. Or compose manually with Field.Label, Field.Description, Field.Error — Field.Error rides Base UI’s validation chain (paired with validate / invalid).',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: 'Field 能裹任意控件。当 children 是单个元素时，自动注入 id 与 aria-describedby，把 label、说明关联到位。',
        en: 'Field wraps any control. When children is a single element, it injects id and aria-describedby so the label and hint wire up automatically.',
      },
      code: basicSource,
      render: () => <FieldBasic />,
    },
    {
      id: 'with-error',
      title: { zh: '错误态', en: 'With error' },
      description: {
        zh: '传 `error` 即渲染一条 `role="alert"` 的错误文案并接管 aria-describedby；`required` 会在标签后补一个红色 `*`。',
        en: 'Passing `error` renders a `role="alert"` message and takes over aria-describedby; `required` appends a red `*` to the label.',
      },
      code: withErrorSource,
      render: () => <FieldWithError />,
    },
    {
      id: 'with-input',
      title: { zh: '裹 Input', en: 'Wrapping Input' },
      description: {
        zh: '把 Input 当 children：label / 说明 / 错误都交给 Field，Input 只当控件，避免重复造一套字段排版。',
        en: 'Put Input inside: Field owns the label, hint, and error while Input stays just the control — no duplicate field scaffolding.',
      },
      code: withInputSource,
      render: () => <FieldWithInput />,
    },
  ],
  api: [
    {
      name: 'Field',
      description: {
        zh: '渲染 Base UI Field.Root，包裹 label + 控件 + 说明 + 错误。',
        en: 'Renders Base UI Field.Root, wrapping label + control + description + error.',
      },
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '字段标签。', en: 'The field label.' },
        },
        {
          name: 'description',
          type: 'string',
          description: {
            zh: '辅助说明。有 error 时不渲染。',
            en: 'Helper text. Hidden when there is an error.',
          },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案，渲染为 `role="alert"` 并关联到控件。',
            en: 'Error text, rendered as `role="alert"` and linked to the control.',
          },
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: { zh: '在标签后补 `*` 标记。', en: 'Appends a `*` to the label.' },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: { zh: '禁用整字段，透传给 Field.Root。', en: 'Disables the whole field; passed to Field.Root.' },
        },
        {
          name: 'id',
          type: 'string',
          description: {
            zh: '控件 id，用于关联 label。不传则自动生成。',
            en: 'Control id used to associate the label. Auto-generated if omitted.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '控件。单个元素时自动注入 id 与 aria-describedby。',
            en: 'The control. A single element gets id and aria-describedby injected automatically.',
          },
        },
      ],
    },
    {
      name: 'Field.Label',
      description: {
        zh: '独立标签，复用 Input 的 `inputLabelVariants` 排版。',
        en: 'Standalone label, reusing Input’s `inputLabelVariants`.',
      },
      props: [
        { name: 'htmlFor', type: 'string', description: { zh: '关联控件 id。', en: 'The control id to associate.' } },
        { name: 'hasError', type: 'boolean', default: 'false', description: { zh: '错误态配色。', en: 'Error-tone color.' } },
        { name: 'required', type: 'boolean', default: 'false', description: { zh: '追加 `*` 标记。', en: 'Appends a `*`.' } },
      ],
    },
    {
      name: 'Field.Description',
      description: {
        zh: '说明段落，复用 `inputHelperVariants` 默认态。',
        en: 'Description paragraph, reusing `inputHelperVariants` default.',
      },
      props: [],
    },
    {
      name: 'Field.Error',
      description: {
        zh: '走 Base UI 校验链的错误，读 validity 数据而非 children。静态错误文案请用 Field 的 `error` prop。',
        en: 'Validation-driven error that reads validity data, not children. For a static error string, use Field’s `error` prop.',
      },
      props: [{ name: 'match', type: 'boolean | keyof ValidityState', description: { zh: '控制何时展示。', en: 'When to show the error.' } }],
    },
  ],
  accessibility: [
    {
      zh: 'label 通过 `htmlFor` 与控件 id 关联；单控件时 id 由 Field 自动注入。',
      en: 'The label associates with the control via `htmlFor`; the control id is injected automatically when there is a single child.',
    },
    {
      zh: '错误渲染为 `role="alert"`，并通过 `aria-describedby` 关联到控件，出现时读屏软件会播报。',
      en: 'The error is a `role="alert"` linked to the control via `aria-describedby`, announced by screen readers when it appears.',
    },
    {
      zh: '`required` 的 `*` 标记对读屏软件隐藏（`aria-hidden`），必填语义应由控件自身的 `required` 表达。',
      en: 'The `required` `*` marker is `aria-hidden` — required semantics should come from the control’s own `required`.',
    },
    {
      zh: '`disabled` 透传给 Base UI Field.Root，整字段进入禁用态。',
      en: '`disabled` is passed to Base UI Field.Root, putting the whole field into a disabled state.',
    },
  ],
}
