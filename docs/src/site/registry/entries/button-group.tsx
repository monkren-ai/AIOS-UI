import { Button } from 'aios-ui-kit/button'
import { ButtonGroup } from 'aios-ui-kit/button-group'
import type { ComponentDoc } from '../types'

import ButtonGroupBasic from '../../examples/button-group/basic'
import ButtonGroupVertical from '../../examples/button-group/vertical'
import ButtonGroupWithSeparator from '../../examples/button-group/with-separator'

import basicSource from '../../examples/button-group/basic.tsx?raw'
import verticalSource from '../../examples/button-group/vertical.tsx?raw'
import withSeparatorSource from '../../examples/button-group/with-separator.tsx?raw'

export const buttonGroupDoc: ComponentDoc = {
  slug: 'button-group',
  name: 'ButtonGroup',
  category: 'actions-inputs',
  status: 'new',
  baseUi: 'Group (native)',
  description: {
    zh: '按钮组，相邻按钮共享边框，横竖两种排列。',
    en: 'A group of buttons that share borders, horizontal or vertical.',
  },
  preview: () => (
    <ButtonGroup>
      <Button variant="secondary">A</Button>
      <Button variant="secondary">B</Button>
      <Button variant="secondary">C</Button>
    </ButtonGroup>
  ),
  importStatement: `import { ButtonGroup } from 'aios-ui-kit/button-group'`,
  usageSnippet: `<ButtonGroup>
  <Button variant="secondary">A</Button>
  <Button variant="secondary">B</Button>
</ButtonGroup>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '水平排列，相邻按钮用负 margin 合并 1px 边框，圆角只留在首尾。',
        en: 'Horizontal layout; adjacent buttons merge their 1px borders via negative margin, with rounding only on the ends.',
      },
      code: basicSource,
      render: () => <ButtonGroupBasic />,
    },
    {
      id: 'vertical',
      title: { zh: '纵向', en: 'Vertical' },
      description: {
        zh: '`orientation="vertical"` 改为纵向堆叠，圆角留在上下两端。',
        en: '`orientation="vertical"` stacks the buttons, with rounding on the top and bottom only.',
      },
      code: verticalSource,
      render: () => <ButtonGroupVertical />,
    },
    {
      id: 'with-separator',
      title: { zh: '带分隔', en: 'With separator' },
      description: {
        zh: '传入 `separator`，会在相邻按钮之间各插入一份分隔节点。',
        en: 'Pass `separator` to insert a divider node between each adjacent pair of buttons.',
      },
      code: withSeparatorSource,
      render: () => <ButtonGroupWithSeparator />,
    },
  ],
  api: [
    {
      name: 'ButtonGroup',
      description: {
        zh: '渲染 `role="group"` 的容器，包裹 Button 子项。',
        en: 'Renders a `role="group"` container wrapping Button children.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: {
            zh: '排列方向，同时映射到 `aria-orientation` 与 `data-orientation`。',
            en: 'Layout direction; also drives `aria-orientation` and `data-orientation`.',
          },
        },
        {
          name: 'size',
          type: 'ButtonSize',
          description: {
            zh: '透传给每个 Button 子项；子项自带的 size 优先。',
            en: 'Passed to every Button child; a child’s own size wins.',
          },
        },
        {
          name: 'separator',
          type: 'ReactNode',
          description: {
            zh: '相邻按钮之间插入的分隔节点。',
            en: 'Node inserted between adjacent buttons.',
          },
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: {
            zh: '通常是多个 Button。非 Button 子项原样渲染，不注入 size。',
            en: 'Typically several Buttons. Non-Button children render as-is, without size injection.',
          },
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
      name: 'buttonGroupVariants',
      description: {
        zh: '生成容器类名的 CVA 函数。',
        en: 'The CVA factory behind the container classes.',
      },
      props: [
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '容器带 `role="group"` 与 `aria-orientation`，读屏软件能识别为一组关联控件。',
      en: 'The container carries `role="group"` and `aria-orientation`, so assistive tech treats the buttons as one related set.',
    },
    {
      zh: '聚焦或悬停的按钮会被抬到顶层（z-10），焦点环与边框不会被相邻按钮盖住。',
      en: 'The focused or hovered button is lifted (z-10) so its focus ring and border are never covered by a neighbor.',
    },
    {
      zh: '`size` 只是视觉透传，不会改变无障碍语义。',
      en: '`size` is purely visual and never changes accessibility semantics.',
    },
  ],
}
