import { AspectRatio } from '@/AspectRatio'

const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '21:9', value: 21 / 9 },
]

const dotMatrixImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%230a0a0a'/%3E%3Cg fill='%23444'%3E%3Ccircle cx='2' cy='2' r='0.6'/%3E%3Ccircle cx='6' cy='2' r='0.6'/%3E%3Ccircle cx='10' cy='2' r='0.6'/%3E%3Ccircle cx='14' cy='2' r='0.6'/%3E%3Ccircle cx='2' cy='4.5' r='0.6'/%3E%3Ccircle cx='6' cy='4.5' r='0.6'/%3E%3Ccircle cx='10' cy='4.5' r='0.6'/%3E%3Ccircle cx='14' cy='4.5' r='0.6'/%3E%3Ccircle cx='2' cy='7' r='0.6'/%3E%3Ccircle cx='6' cy='7' r='0.6'/%3E%3Ccircle cx='10' cy='7' r='0.6'/%3E%3Ccircle cx='14' cy='7' r='0.6'/%3E%3C/g%3E%3C/svg%3E"

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      {ratios.map((r) => (
        <div key={r.label}>
          <div
            style={{
              marginBottom: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}
          >
            {r.label}
          </div>
          <AspectRatio ratio={r.value}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-visible)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
              }}
            >
              {r.label}
            </div>
          </AspectRatio>
        </div>
      ))}

      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          16:9 · image content
        </div>
        <AspectRatio ratio={16 / 9}>
          <img
            src={dotMatrixImage}
            alt="dot matrix"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </AspectRatio>
      </div>
    </div>
  )
}
