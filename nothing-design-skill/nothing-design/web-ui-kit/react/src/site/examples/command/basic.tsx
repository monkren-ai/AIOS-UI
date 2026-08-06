import { Command } from 'aios-ui-kit/command'

const GROUPS = [
  {
    heading: 'Actions',
    items: [
      { id: 'new', label: 'New file', shortcut: '⌘N' },
      { id: 'open', label: 'Open file', shortcut: '⌘O' },
      { id: 'save', label: 'Save file', shortcut: '⌘S' },
    ],
  },
  {
    heading: 'Danger',
    items: [{ id: 'delete', label: 'Delete file', disabled: true }],
  },
]

export default function CommandBasic() {
  return (
    <div className="w-full max-w-sm">
      <Command groups={GROUPS} />
    </div>
  )
}
