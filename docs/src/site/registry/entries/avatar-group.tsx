import { Avatar, AvatarGroup } from 'aios-ui-kit/avatar'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/avatar-group/basic'
import basicSource from '../../examples/avatar-group/basic.tsx?raw'

export const avatarGroupDoc: ComponentDoc = {
  slug: 'avatar-group', name: 'AvatarGroup', category: 'data-display', status: 'new',
  description: { zh: '统一头像尺寸、重叠顺序，并把超出数量折叠为 +N。', en: 'Normalizes avatar size and overlap, collapsing the remainder into +N.' },
  preview: () => <AvatarGroup max={2} aria-label="Team"><Avatar fallback="AI" /><Avatar fallback="UX" /><Avatar fallback="QA" /></AvatarGroup>,
  importStatement: `import { Avatar, AvatarGroup } from 'aios-ui-kit/avatar'`,
  usageSnippet: `<AvatarGroup max={3} aria-label="Project members">{members}</AvatarGroup>`,
  examples: [{ id: 'basic', title: { zh: '数量折叠', en: 'Overflow count' }, code: basicSource, render: () => <Basic /> }],
  api: [{ name: 'AvatarGroup', props: [
    { name: 'max', type: 'number', description: { zh: '最多展示的头像数。', en: 'Maximum visible avatars.' } },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: { zh: '统一应用到子头像。', en: 'Applied consistently to child avatars.' } },
    { name: 'children', type: 'ReactElement<AvatarProps>[]', required: true, description: { zh: 'Avatar 子项。', en: 'Avatar children.' } },
  ] }],
  accessibility: [{ zh: '用 aria-label 描述这组人员；+N 会作为中性的数量文本暴露。', en: 'Label the people group with aria-label; +N is exposed as a language-neutral count.' }],
}
