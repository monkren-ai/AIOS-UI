import { useState } from 'react'
import { Select } from '@/Select'

export default function Demo() {
  const [value, setValue] = useState<string>('sh')
  const [framework, setFramework] = useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 320 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Controlled · onValueChange
        </div>
        <Select
          label="Choose a city"
          placeholder="Select a city"
          options={[
            { value: 'sh', label: 'Shanghai' },
            { value: 'bj', label: 'Beijing' },
            { value: 'gz', label: 'Guangzhou' },
            { value: 'sz', label: 'Shenzhen', disabled: true },
          ]}
          value={value}
          onValueChange={setValue}
        />
        <div
          style={{
            marginTop: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          Current value: {value || '—'}
        </div>
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
          Searchable
        </div>
        <Select
          label="Search a framework"
          placeholder="Type to filter..."
          searchable
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'solid', label: 'Solid' },
            { value: 'angular', label: 'Angular' },
          ]}
          value={framework}
          onValueChange={setFramework}
        />
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
          Disabled
        </div>
        <Select
          label="Disabled select"
          placeholder="Cannot interact"
          disabled
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
          ]}
        />
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
          Error state
        </div>
        <Select
          label="With error"
          placeholder="Select a plan"
          error="Please choose a plan"
          options={[
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
            { value: 'team', label: 'Team' },
          ]}
        />
      </div>
    </div>
  )
}
