import { useState } from 'react'
import { NotificationBadge } from 'aios-ui-kit/notification-badge'
import { IconButton } from 'aios-ui-kit/button'
import { BellIcon } from '../icons'

export default function NotificationBadgeBasic() {
  const [count, setCount] = useState(3)

  return (
    <div className="flex items-center gap-4">
      <NotificationBadge count={count}>
        <IconButton aria-label={`Inbox, ${count} unread`} icon={<BellIcon />} variant="outline" />
      </NotificationBadge>
      <IconButton
        aria-label="Add notification"
        icon={<span aria-hidden>+</span>}
        variant="ghost"
        onClick={() => setCount((value) => value + 1)}
      />
      <IconButton
        aria-label="Clear notifications"
        icon={<span aria-hidden>×</span>}
        variant="ghost"
        onClick={() => setCount(0)}
      />
    </div>
  )
}
