interface BatteryManager extends EventTarget {
  level: number
  charging: boolean
  addEventListener(type: string, listener: EventListener): void
  removeEventListener(type: string, listener: EventListener): void
}

interface Navigator {
  getBattery(): Promise<BatteryManager>
}
