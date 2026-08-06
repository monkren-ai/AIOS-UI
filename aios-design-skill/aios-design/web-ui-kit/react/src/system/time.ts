/**
 * 时间格式化工具集。
 * 替代各组件内联的 pad/stamp/uptime 实现。
 */

/** 数字左侧补 0 到 2 位（不足返回原值）。 */
export function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

/** 当前时间戳字符串，格式 HH:MM:SS。 */
export function stamp(d: Date = new Date(), sep = ':'): string {
  return `${pad2(d.getHours())}${sep}${pad2(d.getMinutes())}${sep}${pad2(d.getSeconds())}`
}

/** 短格式 HH:MM（适用于紧凑时间显示）。 */
export function stampShort(d: Date = new Date(), sep = ':'): string {
  return `${pad2(d.getHours())}${sep}${pad2(d.getMinutes())}`
}

/** 毫秒转换为 "16H 32M" / "45S" / "1D 2H" 形式的简洁上电工时。 */
export function formatUptime(ms: number): string {
  if (ms < 0) ms = 0
  const sec = Math.floor(ms / 1000)
  if (sec < 60) return `${sec}S`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}M`
  const hr = Math.floor(min / 60)
  if (hr < 24) {
    const remMin = min % 60
    return remMin === 0 ? `${hr}H` : `${hr}H ${remMin}M`
  }
  const day = Math.floor(hr / 24)
  const remHr = hr % 24
  return remHr === 0 ? `${day}D` : `${day}D ${remHr}H`
}
