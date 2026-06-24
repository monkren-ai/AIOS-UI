import { useState } from 'react'
import { Toggle, ToggleGroup } from '@/Toggle'

export default function Demo() {
  const [bold, setBold] = useState(true)
  const [formats, setFormats] = useState<string[]>(['b'])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Controlled · onPressedChange
        </div>
        <Toggle pressed={bold} onPressedChange={setBold}>
          {bold ? 'Bold ✓' : 'Bold'}
        </Toggle>
      </div>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          ToggleGroup · multi-select
        </div>
        <ToggleGroup variant="outline" value={formats} onValueChange={setFormats}>
          <Toggle value="b">B</Toggle>
          <Toggle value="i">I</Toggle>
          <Toggle value="u">U</Toggle>
        </ToggleGroup>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Bold: {bold ? 'on' : 'off'} · Formats: {formats.join(', ') || 'none'}
      </div>
    </div>
  )
}
