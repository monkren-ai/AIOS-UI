import { ContextMenu } from 'nothing-ui/context-menu'

const FILES = ['glyph-composer.wav', 'ear-firmware.bin', 'wallpaper-dot.png']

export default function ContextMenuPerRow() {
  return (
    <ul className="w-64 divide-y divide-border border border-border">
      {FILES.map((file) => (
        <li key={file}>
          <ContextMenu
            className="w-full"
            items={[
              { label: `Open ${file}`, onClick: () => console.log('open', file) },
              { label: 'Duplicate', onClick: () => console.log('duplicate', file) },
              { label: 'Delete', onClick: () => console.log('delete', file) },
            ]}
          >
            <div className="w-full px-4 py-2 font-mono text-sm">{file}</div>
          </ContextMenu>
        </li>
      ))}
    </ul>
  )
}
