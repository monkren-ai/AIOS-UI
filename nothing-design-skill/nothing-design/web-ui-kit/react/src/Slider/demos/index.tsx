import { useState } from 'react'
import { Slider } from '@/Slider'

export default function Demo() {
  const [volume, setVolume] = useState(40)
  const [brightness, setBrightness] = useState(7)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
      <Slider label="Volume" showValue value={volume} onValueChange={setVolume} />
      <Slider
        label="Brightness"
        min={0}
        max={10}
        step={1}
        showValue
        value={brightness}
        onValueChange={setBrightness}
      />
      <Slider label="Disabled" disabled showValue value={20} />
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        Volume: {volume}% · Brightness: {brightness}/10
      </div>
    </div>
  )
}
