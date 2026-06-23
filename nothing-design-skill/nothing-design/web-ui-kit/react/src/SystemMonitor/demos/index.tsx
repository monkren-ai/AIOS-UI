import { useState, useEffect } from 'react'
import { SystemMonitor } from '@/SystemMonitor'

export default function Demo() {
  const [cpu, setCpu] = useState(42)
  const [ram, setRam] = useState(67)
  const [storage, setStorage] = useState(54)
  const [netSpeed, setNetSpeed] = useState(12.5)
  const [netConnected, setNetConnected] = useState(true)
  const [battery, setBattery] = useState(85)
  const [charging, setCharging] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(35 + Math.floor(Math.random() * 25))
      setRam(45 + Math.floor(Math.random() * 30))
      setStorage(60 + Math.floor(Math.random() * 20))
      setNetSpeed(parseFloat((5 + Math.random() * 20).toFixed(1)))
      setNetConnected(Math.random() > 0.1)
      setBattery((b) => Math.max(0, Math.min(100, b + (Math.random() > 0.5 ? 1 : -1))))
      setCharging((c) => (Math.random() > 0.85 ? !c : c))
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          default · md
        </div>
        <SystemMonitor
          variant="default"
          size="md"
          cpuPercent={cpu}
          ramPercent={ram}
          storagePercent={storage}
          netConnected={netConnected}
          netSpeed={netSpeed}
          batteryPercent={battery}
          batteryCharging={charging}
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
          compact · sm
        </div>
        <SystemMonitor
          variant="compact"
          size="sm"
          cpuPercent={cpu}
          ramPercent={ram}
          storagePercent={storage}
          netConnected={netConnected}
          netSpeed={netSpeed}
          batteryPercent={battery}
          batteryCharging={charging}
        />
      </div>
    </div>
  )
}
