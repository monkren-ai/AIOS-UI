import { Textarea } from 'aios-ui-kit/textarea'
import type { ComponentDoc } from '../types'

import TextareaVariants from '../../examples/textarea/variants'
import TextareaSizes from '../../examples/textarea/sizes'
import TextareaAutoResize from '../../examples/textarea/auto-resize'
import TextareaValidation from '../../examples/textarea/validation'
import TextareaControlled from '../../examples/textarea/controlled'

import variantsSource from '../../examples/textarea/variants.tsx?raw'
import sizesSource from '../../examples/textarea/sizes.tsx?raw'
import autoResizeSource from '../../examples/textarea/auto-resize.tsx?raw'
import validationSource from '../../examples/textarea/validation.tsx?raw'
import controlledSource from '../../examples/textarea/controlled.tsx?raw'

export const textareaDoc: ComponentDoc = {
  slug: 'textarea',
  name: 'Textarea',
  category: 'actions-inputs',
  status: 'stable',
  description: {
    zh: '多行文本输入，可随内容自动增高。',
    en: 'A multi-line text field that can grow with its content.',
  },
  preview: () => (
    <div className="w-full max-w-xs">
      <Textarea placeholder="Write something" />
    </div>
  ),
  importStatement: `import { Textarea } from 'aios-ui-kit/textarea'`,
  usageSnippet: `<Textarea label="Notes" placeholder="Write something" />`,
  composition: {
    zh: '和 `Input` 同构：外层容器里是 label、原生 `<textarea>`、以及错误或说明文案。区别在于边框长在 `<textarea>` 自己身上，因为这里没有图标行要包。',
    en: 'Structurally the same as `Input`: a wrapper around the label, the native `<textarea>`, and the error or helper text. The difference is that the border lives on the `<textarea>` itself, since there is no icon row to wrap.',
  },
  examples: [
    {
      id: 'variants',
      title: { zh: '变体', en: 'Variants' },
      description: {
        zh: '和 `Input` 一致的两档：`outline` 透明背景加边框，`soft` 垫一层 `surface-raised`。同一张表单里两者别混用，否则字段看起来像分了两个组。',
        en: 'The same two steps as `Input`: `outline` is a border over a transparent background, `soft` sits on a raised surface. Do not mix them within one form — it reads as if the fields belong to two different groups.',
      },
      code: variantsSource,
      render: () => <TextareaVariants />,
    },
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '`size` 调的是内边距、字号和最小高度，不是行数——行数归 `minRows`。想要「小字号但很高」的输入框，就 `size="sm"` 配上更大的 `minRows`。',
        en: '`size` controls padding, type scale, and the minimum height — not the number of rows, which is `minRows`. For a small-type field that is still tall, combine `size="sm"` with a larger `minRows`.',
      },
      code: sizesSource,
      render: () => <TextareaSizes />,
    },
    {
      id: 'auto-resize',
      title: { zh: '自动增高', en: 'Auto-resize' },
      description: {
        zh: '`autoResize` 每次值变化都会重算高度，落在 `minRows` 与 `maxRows` 之间，超出 `maxRows` 才出滚动条。代价是它同时关掉了手动拖拽（`resize: none`）——用户不能再自己调大小，所以只在你确信内容长度可控时才开。不传 `maxRows` 就是无上限增高，长文本会把页面撑得很长。',
        en: '`autoResize` recomputes the height on every change, clamped between `minRows` and `maxRows`, and only scrolls once it hits the ceiling. The trade-off is that it also turns off the drag handle (`resize: none`), so users can no longer size it themselves — reach for it only when you know the content stays short. Leaving `maxRows` unset means unbounded growth, and a long paste will stretch the page.',
      },
      code: autoResizeSource,
      render: () => <TextareaAutoResize />,
    },
    {
      id: 'validation',
      title: { zh: '标签、说明与错误', en: 'Label, helper text, and errors' },
      description: {
        zh: '`error` 优先于 `message`：两者只会显示一个，且 `aria-describedby` 始终指向当前那一个，所以读屏软件读到的说明和眼睛看到的是同一句。',
        en: '`error` takes precedence over `message`: only one is ever rendered, and `aria-describedby` always points at whichever it is — so what a screen reader announces matches what is on screen.',
      },
      code: validationSource,
      render: () => <TextareaValidation />,
    },
    {
      id: 'controlled',
      title: { zh: '受控用法', en: 'Controlled' },
      description: {
        zh: '和 `Input` 一样，两个回调都会触发：`onChange` 是原生 `ChangeEvent` 的透传，`onValueChange` 直接给字符串。想在写回 state 前截断内容，用原生事件那条路会很自然，就像下面这样。',
        en: 'As with `Input`, both callbacks fire: `onChange` passes the native `ChangeEvent` straight through, and `onValueChange` hands you the string. Clamping the value before it reaches state falls out naturally from the event path, as below.',
      },
      code: controlledSource,
      render: () => <TextareaControlled />,
    },
  ],
  api: [
    {
      name: 'Textarea',
      description: {
        zh: '除 `value` / `defaultValue` / `size` 外，原生 `<textarea>` 属性（`name`、`maxLength`、`readOnly`、`aria-*` …）都透传到内部元素。`className` 与 `style` 落在最外层容器；`rows` 由 `minRows` 决定，别再单独传。',
        en: 'Every native `<textarea>` prop except `value`, `defaultValue`, and `size` (`name`, `maxLength`, `readOnly`, `aria-*`, …) is forwarded to the inner element. `className` and `style` land on the outer wrapper; `rows` is derived from `minRows`, so do not pass it separately.',
      },
      props: [
        {
          name: 'variant',
          type: `'outline' | 'soft' | 'underline' | 'bordered'`,
          default: `'outline'`,
          description: {
            zh: '视觉样式。`underline` / `bordered` 是 v1 别名。',
            en: 'Visual style. `underline` and `bordered` are v1 aliases.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '内边距、字号与最小高度阶梯。',
            en: 'Padding, type scale, and minimum height.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '字段标签，`htmlFor` 关联到输入框，聚焦时提亮。',
            en: 'Field label, wired with `htmlFor`, and brightened while the field has focus.',
          },
        },
        {
          name: 'message',
          type: 'string',
          description: {
            zh: '辅助说明。有 `error` 时不渲染。',
            en: 'Helper text. Not rendered while `error` is set.',
          },
        },
        {
          name: 'error',
          type: 'string',
          description: {
            zh: '错误文案，同时开启错误配色与 `aria-invalid`。',
            en: 'Error text; also switches on the error styling and `aria-invalid`.',
          },
        },
        {
          name: 'value',
          type: 'string',
          description: { zh: '受控值。', en: 'Controlled value.' },
        },
        {
          name: 'defaultValue',
          type: 'string',
          description: {
            zh: '非受控初始值。',
            en: 'Initial value when uncontrolled.',
          },
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: {
            zh: '值变化回调，参数是新字符串。',
            en: 'Called with the new string.',
          },
        },
        {
          name: 'onChange',
          type: '(event: ChangeEvent<HTMLTextAreaElement>) => void',
          description: {
            zh: '原生 change 事件透传。',
            en: 'The native change event, passed straight through.',
          },
        },
        {
          name: 'autoResize',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '随内容增高，同时禁用手动拖拽。',
            en: 'Grow with the content, and disable the drag handle.',
          },
        },
        {
          name: 'minRows',
          type: 'number',
          default: '3',
          description: {
            zh: '最少行数，同时作为原生 `rows`。',
            en: 'Minimum number of rows; also passed through as the native `rows`.',
          },
        },
        {
          name: 'maxRows',
          type: 'number',
          description: {
            zh: '`autoResize` 下的高度上限，超过后改为滚动。不传则不封顶。',
            en: 'Height ceiling under `autoResize`; past it the field scrolls. Unset means no ceiling.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用输入，并锁掉拖拽调整。',
            en: 'Disable the field and lock resizing.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到最外层容器的类名。',
            en: 'Extra classes on the outer wrapper.',
          },
        },
      ],
    },
    {
      name: 'textareaVariants',
      description: {
        zh: '外层容器的 CVA 函数。`textareaFieldVariants` / `textareaLabelVariants` / `textareaMessageVariants` 分别对应输入框、标签与说明文字。',
        en: 'The CVA function for the outer wrapper. `textareaFieldVariants`, `textareaLabelVariants`, and `textareaMessageVariants` cover the field, the label, and the helper text.',
      },
      props: [
        {
          name: 'variant',
          type: `'outline' | 'soft'`,
          default: `'outline'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: 'TextareaSize',
          default: `'md'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '渲染的是原生 `<textarea>`，Tab 进入、方向键移动光标、Enter 换行全部是浏览器原生行为。',
      en: 'It renders a native `<textarea>`, so tabbing in, moving the caret with the arrow keys, and Enter for a new line are all browser behaviour.',
    },
    {
      zh: '`label` 通过 `htmlFor` 关联；不传就没有可访问名称，必须自己补 `aria-label`。',
      en: '`label` is associated with `htmlFor`. Without it the field has no accessible name, so supply an `aria-label`.',
    },
    {
      zh: '`aria-describedby` 指向当前渲染的那条文案——有 `error` 时是错误块（`role="alert"`），否则是 `message`。',
      en: '`aria-describedby` points at whichever message is actually rendered — the error block (a `role="alert"`) when `error` is set, otherwise `message`.',
    },
    {
      zh: '`aria-invalid` 始终跟随 `error` 的有无，不需要你手动同步。',
      en: '`aria-invalid` always tracks whether `error` is set; you never have to keep it in sync by hand.',
    },
    {
      zh: '`autoResize` 关闭了手动拖拽。如果用户需要更大的编辑区，请给足 `maxRows`，或者干脆不开这个开关。',
      en: '`autoResize` removes the drag handle. If people need a bigger editing area, give `maxRows` enough room — or leave the flag off.',
    },
  ],
}
