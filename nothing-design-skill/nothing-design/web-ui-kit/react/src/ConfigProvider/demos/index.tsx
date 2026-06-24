import { useState } from 'react'
import { ConfigProvider, useConfig, useCdnFn } from '@/ConfigProvider'
import { useTheme } from '@/ThemeProvider'
import type { CDNProxy } from '@/ConfigProvider'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--caption)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-secondary)',
  minWidth: 96,
}

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--body-xs)',
  color: 'var(--text-display)',
  wordBreak: 'break-all',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
}

function ConfigInfo() {
  const config = useConfig()
  const cdnUrl = useCdnFn()
  const { theme, isDarkMode, toggleTheme } = useTheme()
  const url = cdnUrl({ pkg: '@nothing-ui/icons', version: '1.0.0', path: '/svg/logo.svg' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={rowStyle}>
        <span style={labelStyle}>theme</span>
        <code style={valueStyle}>{theme}</code>
        <button
          className="nothing-btn nothing-btn--secondary nothing-btn--sm"
          onClick={toggleTheme}
        >
          Toggle
        </button>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>isDarkMode</span>
        <code style={valueStyle}>{String(isDarkMode)}</code>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>proxy</span>
        <code style={valueStyle}>{config?.proxy ?? 'aliyun (default)'}</code>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>cdn url</span>
        <code style={valueStyle}>{url}</code>
      </div>
    </div>
  )
}

const proxies: CDNProxy[] = ['aliyun', 'unpkg', 'jsdelivr']

export default function Demo() {
  const [proxy, setProxy] = useState<CDNProxy>('aliyun')

  return (
    <ConfigProvider config={{ proxy }} defaultTheme="dark">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {proxies.map((p) => (
            <button
              key={p}
              className={
                proxy === p
                  ? 'nothing-btn nothing-btn--primary nothing-btn--sm'
                  : 'nothing-btn nothing-btn--secondary nothing-btn--sm'
              }
              onClick={() => setProxy(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <ConfigInfo />
      </div>
    </ConfigProvider>
  )
}
