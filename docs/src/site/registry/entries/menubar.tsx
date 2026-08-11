import { Menubar } from 'aios-ui-kit/menubar'
import type { ComponentDoc } from '../types'

const menus = [
  {
    label: 'File',
    items: [
      { label: 'New', shortcut: '⌘N' },
      { label: 'Open', shortcut: '⌘O' },
    ],
  },
  { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }] },
]

export const menubarDoc: ComponentDoc = {
  slug: 'menubar',
  name: 'Menubar',
  category: 'navigation',
  status: 'new',
  baseUi: 'Menubar / Menu',
  description: {
    zh: '桌面式菜单栏，菜单之间可用方向键切换。',
    en: 'A desktop-style menu bar whose menus are navigated with arrow keys.',
  },
  preview: () => <Menubar items={menus} />,
  importStatement: `import { Menubar } from 'aios-ui-kit/menubar'`,
  usageSnippet: `<Menubar items={[{ label: 'File', items: [{ label: 'Open', onClick: openFile }] }]} />`,
  examples: [],
  api: [
    {
      name: 'Menubar',
      props: [
        {
          name: 'items',
          type: 'MenubarMenu[]',
          required: true,
          description: {
            zh: '顶层菜单及其操作项。',
            en: 'Top-level menus and their actions.',
          },
        },
        {
          name: 'orientation',
          type: `'horizontal' | 'vertical'`,
          default: `'horizontal'`,
          description: { zh: '菜单排列方向。', en: 'Menu orientation.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Base UI 管理 menubar/menuitem 角色、焦点漫游和方向键导航。',
      en: 'Base UI manages menubar/menuitem roles, roving focus, and arrow-key navigation.',
    },
  ],
}
