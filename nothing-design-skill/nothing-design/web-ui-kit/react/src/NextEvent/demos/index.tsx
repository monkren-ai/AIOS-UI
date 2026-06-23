import { useState } from 'react'
import { NextEvent } from '@/NextEvent'

const day = 86_400_000

type DatasetKey = 'work' | 'personal' | 'expired'

const datasets: Record<DatasetKey, { title: string; date: number }[]> = {
  work: [
    { title: 'Design review', date: Date.now() + 2 * 60 * 60 * 1000 },
    { title: 'Sprint planning', date: Date.now() + 3 * day },
    { title: 'Product launch', date: Date.now() + 7 * day },
  ],
  personal: [
    { title: 'Gym session', date: Date.now() + 5 * 60 * 60 * 1000 },
    { title: 'Dinner with friends', date: Date.now() + 2 * day },
  ],
  expired: [{ title: 'Missed standup', date: Date.now() - 3600000 }],
}

export default function Demo() {
  const [key, setKey] = useState<DatasetKey>('work')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {(Object.keys(datasets) as DatasetKey[]).map((k) => (
          <button
            key={k}
            className={`nothing-btn ${key === k ? 'nothing-btn--primary' : 'nothing-btn--secondary'}`}
            onClick={() => setKey(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <NextEvent theme="dark" events={datasets[key]} />

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}
      >
        {key === 'expired'
          ? 'Expired event → countdown shows NOW.'
          : `Showing ${datasets[key].length} upcoming event(s).`}
      </div>
    </div>
  )
}
