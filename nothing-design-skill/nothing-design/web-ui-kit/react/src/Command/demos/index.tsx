import { Command } from '../Command'

export default function Demo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <Command
        placeholder="Type a command..."
        groups={[
          {
            heading: 'Actions',
            items: [
              { id: 'new', label: 'New File', shortcut: '⌘N', onSelect: () => console.log('New') },
              { id: 'open', label: 'Open File', shortcut: '⌘O', onSelect: () => console.log('Open') },
              { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => console.log('Save') },
            ],
          },
          {
            heading: 'Preferences',
            items: [
              { id: 'settings', label: 'Settings', onSelect: () => console.log('Settings') },
              { id: 'theme', label: 'Change Theme', disabled: true },
            ],
          },
        ]}
      />
    </div>
  )
}
