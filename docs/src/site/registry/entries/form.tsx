import { Form } from 'aios-ui-kit/form'
import { Input } from 'aios-ui-kit/input'
import type { ComponentDoc } from '../types'

import FormBasic from '../../examples/form/basic'
import FormFieldGroup from '../../examples/form/field-group'

import basicSource from '../../examples/form/basic.tsx?raw'
import fieldGroupSource from '../../examples/form/field-group.tsx?raw'

export const formDoc: ComponentDoc = {
  slug: 'form',
  name: 'Form',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '表单容器，拦下浏览器默认提交并统一字段间距。',
    en: 'A form wrapper that swallows the browser submit and sets the spacing between fields.',
  },
  preview: () => (
    <Form className="w-full max-w-xs">
      <Input label="Callsign" placeholder="AIOS-1" />
    </Form>
  ),
  importStatement: `import { Form } from 'aios-ui-kit/form'`,
  usageSnippet: `<Form onSubmit={(e) => console.log(new FormData(e.currentTarget))}>
  <Input name="email" label="Email" />
</Form>`,
  composition: {
    zh: '`Form` 本身只是一个 `<form>` + 16px 的纵向 `gap`，不提供字段、校验或状态管理——它不是一个表单库的接入层，只是最基础的布局与提交拦截。真正的字段分组与错误文案要靠单独导出的 `formGroupVariants` 与 `formErrorVariants` 这两个 CVA 函数手动拼装（见下方“字段分组”示例）。',
    en: '`Form` is just a `<form>` with a 16px vertical `gap` — it has no fields, no validation, no state, and is not an adapter for any form library, only the layout and the submit interception. Field grouping and error text are assembled by hand with two separately exported CVA functions, `formGroupVariants` and `formErrorVariants` (see the “Field group” example below).',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic' },
      description: {
        zh: '`onSubmit` 收到的是已经 `preventDefault()` 之后的 `FormEvent`，你可以放心用 `new FormData(e.currentTarget)` 读取字段，不用自己拦截默认导航。',
        en: '`onSubmit` receives a `FormEvent` that has already had `preventDefault()` called on it, so you can safely read fields with `new FormData(e.currentTarget)` without intercepting the default navigation yourself.',
      },
      code: basicSource,
      render: () => <FormBasic />,
    },
    {
      id: 'field-group',
      title: { zh: '字段分组与错误', en: 'Field grouping and errors' },
      description: {
        zh: '`formGroupVariants({ hasError })` 贴到包住单个字段的 `<div>` 上，出错时把组内文字整体染成 error 色；错误文案本身套一层 `formErrorVariants()`。这两个函数都不渲染任何 DOM，只提供类名，容器与错误元素都由你自己写。',
        en: '`formGroupVariants({ hasError })` goes on the `<div>` wrapping one field, tinting all of its text with the error colour when set; the error text itself is wrapped in `formErrorVariants()`. Neither function renders any DOM — they only hand back class names, and you own the container and the error element.',
      },
      code: fieldGroupSource,
      render: () => <FormFieldGroup />,
    },
  ],
  api: [
    {
      name: 'Form',
      description: {
        zh: '渲染为 `<form>`，除 `onSubmit` 外的原生 form 属性都会透传。',
        en: 'Renders a `<form>` and forwards every native form prop except `onSubmit`.',
      },
      props: [
        {
          name: 'onSubmit',
          type: '(e: React.FormEvent<HTMLFormElement>) => void',
          description: {
            zh: '提交回调。组件先调用 `e.preventDefault()` 阻止浏览器导航，再执行这个回调。',
            en: 'The submit callback. The component calls `e.preventDefault()` first to stop the browser navigation, then runs this.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: {
            zh: '表单内容，通常是若干字段与一个提交按钮。',
            en: 'The form content — typically fields and a submit button.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖默认的 `gap-md`。',
            en: 'Extra classes, merged via `tailwind-merge` so they can override the default `gap-md`.',
          },
        },
      ],
    },
    {
      name: 'formGroupVariants',
      description: {
        zh: '单个字段分组（label + 控件 + 说明文字）的 CVA 函数，不渲染 DOM，贴到你自己的 `<div>` 上。',
        en: 'The CVA function for one field group (label, control, helper text). It renders no DOM — apply it to your own `<div>`.',
      },
      props: [
        {
          name: 'hasError',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '为 `true` 时把组内文字整体切到 error 配色。',
            en: 'When `true`, switches all text in the group to the error colour.',
          },
        },
      ],
    },
    {
      name: 'formErrorVariants',
      description: {
        zh: '字段下方错误文案的 CVA 函数，无可配置项，仅提供固定的错误文字样式。',
        en: 'The CVA function for the error text under a field. It takes no options — just a fixed error-text style.',
      },
      props: [],
    },
  ],
  accessibility: [
    {
      zh: '`Form` 渲染真正的 `<form>` 元素，输入框的默认 Enter-提交行为会照常触发 `onSubmit`，不需要额外绑定回车事件。',
      en: '`Form` renders a real `<form>` element, so the default Enter-to-submit behaviour on inputs still fires `onSubmit` — no extra keydown wiring required.',
    },
    {
      zh: '拦截默认提交意味着浏览器原生的表单校验 UI（如必填项的气泡提示）不会因为整页导航而丢失焦点上下文，但组件本身不接管 `required` 等原生校验属性的展示逻辑，仍按浏览器默认行为运作。',
      en: 'Intercepting the default submit means native validation UI (like the required-field bubble) does not lose focus context to a full-page navigation, though the component itself does not take over how attributes like `required` are surfaced — that stays the browser’s default behaviour.',
    },
    {
      zh: '`formGroupVariants({ hasError: true })` 只改变文字颜色，不会自动加上 `role="alert"` 或 `aria-invalid`——这些无障碍属性需要你在具体控件（如 `Input` 的 `error`）上自己设置。',
      en: '`formGroupVariants({ hasError: true })` only changes the text colour; it does not add `role="alert"` or `aria-invalid` for you — those still need to be set on the actual control, such as `Input`’s own `error` prop.',
    },
    {
      zh: '字段之间的间距是固定的 16px（`gap-md`），保证在触屏上相邻的可点击控件不会因为靠得太近而误触。',
      en: 'Field spacing is a fixed 16px (`gap-md`), keeping adjacent tappable controls far enough apart to avoid mis-taps on touch.',
    },
  ],
}
