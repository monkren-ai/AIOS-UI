/**
 * useDeviceOrientation - 设备方向 → 罗盘 heading (0-360°, 0=北).
 *
 * - iOS 13+ 需要 DeviceOrientationEvent.requestPermission() 用户授权
 * - 部分浏览器 / 桌面不支持, 此时返回 { heading: null, real: false }
 * - 'webkit' / 'moz' / 标准的 absolute/webkitCompassHeading 都能 fallback
 */
import { useEffect, useState } from 'react'

export interface DeviceOrientationState {
  /** 0-360°, null = 不可用 */
  heading: number | null
  /** true = 来自真实 API, false = 不可用/已拒绝/桌面 */
  real: boolean
}

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  webkitCompassHeading?: number
}

function isSupported(): boolean {
  return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window
}

function readHeading(e: DeviceOrientationEventWithPermission): number | null {
  // iOS Safari: webkitCompassHeading
  if (typeof e.webkitCompassHeading === 'number' && !Number.isNaN(e.webkitCompassHeading)) {
    return e.webkitCompassHeading
  }
  // 标准: alpha (0-360, 0=北, 但需要 device flat)
  if (typeof e.alpha === 'number' && !Number.isNaN(e.alpha)) {
    return (360 - e.alpha) % 360
  }
  return null
}

export function useDeviceOrientation(autoStart = true): DeviceOrientationState {
  const [state, setState] = useState<DeviceOrientationState>({ heading: null, real: false })

  useEffect(() => {
    if (!autoStart) return
    if (!isSupported()) {
      setState({ heading: null, real: false })
      return
    }

    const cls = (
      window as unknown as {
        DeviceOrientationEvent?: { requestPermission?: () => Promise<'granted' | 'denied'> }
      }
    ).DeviceOrientationEvent

    const start = () => {
      const handler = (e: Event) => {
        const de = e as DeviceOrientationEventWithPermission
        const h = readHeading(de)
        if (h !== null) setState({ heading: h, real: true })
      }
      window.addEventListener('deviceorientation', handler, true)
      return () => window.removeEventListener('deviceorientation', handler, true)
    }

    let cleanup: (() => void) | null = null
    if (cls?.requestPermission) {
      cls
        .requestPermission()
        .then((res) => {
          if (res === 'granted') {
            cleanup = start()
          } else {
            setState({ heading: null, real: false })
          }
        })
        .catch(() => setState({ heading: null, real: false }))
    } else {
      cleanup = start()
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [autoStart])

  return state
}
