import { NotificationBadge } from 'aios-ui-kit/notification-badge'
import { IconButton } from 'aios-ui-kit/button'
import type { ComponentDoc } from '../types'
import Basic from '../../examples/notification-badge/basic'
import basicSource from '../../examples/notification-badge/basic.tsx?raw'
import { BellIcon } from '../../examples/icons'

export const notificationBadgeDoc: ComponentDoc = {
  slug: 'notification-badge',
  name: 'NotificationBadge',
  category: 'data-display',
  status: 'new',
  description: {
    zh: '锚在触发器右上角的计数或圆点，出现时沿对角线滑入。',
    en: 'A count or dot anchored to the top-end of a trigger, sliding in on a diagonal.',
  },
  preview: () => (
    <NotificationBadge count={3}>
      <IconButton aria-label="Inbox, 3 unread" icon={<BellIcon />} variant="outline" />
    </NotificationBadge>
  ),
  importStatement: `import { NotificationBadge } from 'aios-ui-kit/notification-badge'`,
  usageSnippet: `<NotificationBadge count={3}><IconButton aria-label="Inbox, 3 unread" icon={<BellIcon />} /></NotificationBadge>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '计数与清除', en: 'Count and clear' },
      description: {
        zh: '`count` 从 0 变成正数才播放进入动画。超过 `max` 显示 `99+`。`dot` 在没有计数时只留一个红点。',
        en: 'The enter animation plays when `count` goes from 0 to a positive number. Values above `max` render as `99+`. `dot` leaves a red mark when there is no count.',
      },
      code: basicSource,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: 'NotificationBadge',
      props: [
        {
          name: 'count',
          type: 'number',
          description: {
            zh: '未读计数。`0` 或未传时不渲染数字。',
            en: 'Unread count. `0` or omitted hides the number.',
          },
        },
        {
          name: 'dot',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '没有计数时显示状态圆点。',
            en: 'Show a status dot when there is no count.',
          },
        },
        {
          name: 'max',
          type: 'number',
          default: '99',
          description: { zh: '超过后显示 `{max}+`。', en: 'Values above this render as `{max}+`.' },
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: { zh: '被锚定的触发器，通常是 IconButton。', en: 'The anchored trigger, usually an IconButton.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '计数本身不会自动关联到按钮。请在触发器上写完整 `aria-label`，例如 `Inbox, 3 unread`。',
      en: 'The count is not linked to the control automatically. Put the full name on the trigger, e.g. `Inbox, 3 unread`.',
    },
    {
      zh: '纯圆点带 `aria-hidden`，不能单独传达状态。',
      en: 'A dot-only marker is `aria-hidden` and must not be the only status signal.',
    },
  ],
}
