import { useState } from 'react'
import { Clipboard } from '@/Clipboard'

export default function Demo() {
  const [forced, setForced] = useState<'idle' | 'copied'>('idle')

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          size="sm"
        </div>
        <Clipboard
          size="sm"
          demoItems={[
            { text: 'npm run dev', time: new Date(Date.now() - 60000) },
            { text: 'git status', time: new Date(Date.now() - 120000) },
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
          size="md"
        </div>
        <Clipboard
          size="md"
          demoItems={[
            { text: 'pnpm build', time: new Date(Date.now() - 300000) },
            { text: 'docker compose up', time: new Date(Date.now() - 900000) },
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
          size="lg" · controlled state
        </div>
        <Clipboard
          size="lg"
          state={forced}
          demoItems={[
            { text: 'export TOKEN=...', time: new Date(Date.now() - 2000) },
            { text: 'ssh user@host', time: new Date(Date.now() - 4000) },
          ]}
        />
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button
            className="nothing-btn nothing-btn--secondary"
            onClick={() => setForced('idle')}
          >
            Idle
          </button>
          <button
            className="nothing-btn nothing-btn--primary"
            onClick={() => setForced('copied')}
          >
            Force copied
          </button>
        </div>
      </div>
    </div>
  )
}
