/**
 * Glyph Dot-Matrix 动画帧数据生成器。
 *
 * 6 种动画模式 (模拟 Nothing Phone Glyph Interface):
 *  - pulse   : 中心向外扩散
 *  - scan    : 从左到右扫描线
 *  - wave    : 正弦波横扫
 *  - sparkle : 随机闪烁
 *  - fill    : 顺序填满
 *  - wipe    : 对角擦除
 *
 * 每种模式返回 5×7 activeDots 坐标数组, 适配 DotMatrix cols×rows。
 * 颜色由父组件传入 (currentColor 走 CSS)。
 */
export type GlyphAnim = 'pulse' | 'scan' | 'wave' | 'sparkle' | 'fill' | 'wipe'

export const GLYPH_ANIMS: GlyphAnim[] = ['pulse', 'scan', 'wave', 'sparkle', 'fill', 'wipe']

const ROWS = 5
const COLS = 7

function emptyFrame(): [number, number][] {
  return []
}

/** t ∈ [0, 1), 5×7 网格. */
function pulse(t: number): [number, number][] {
  const cx = (COLS - 1) / 2
  const cy = (ROWS - 1) / 2
  const maxR = Math.hypot(cx, cy)
  const dots: [number, number][] = []
  const r = t * maxR
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const d = Math.hypot(x - cx, y - cy)
      if (Math.abs(d - r) < 0.9) dots.push([y, x])
    }
  }
  return dots
}

/** 单列扫描, 每 1/7 步推一列. */
function scan(t: number): [number, number][] {
  const col = Math.floor(t * COLS) % COLS
  const dots: [number, number][] = []
  for (let y = 0; y < ROWS; y++) dots.push([y, col])
  return dots
}

/** 正弦波, y = sin(2πx/COLS + 2πt). */
function wave(t: number): [number, number][] {
  const dots: [number, number][] = []
  for (let x = 0; x < COLS; x++) {
    const phase = (x / COLS) * Math.PI * 2 + t * Math.PI * 2
    const y = Math.round((ROWS - 1) / 2 + (Math.sin(phase) * (ROWS - 1)) / 2)
    dots.push([y, x])
  }
  return dots
}

/** 约 30% 像素随机亮. */
function sparkle(t: number): [number, number][] {
  // hash-based deterministic "random"
  const seed = Math.floor(t * 30) * 9301 + 49297
  const dots: [number, number][] = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const h = (seed * (y * COLS + x + 1)) % 233280
      if (h / 233280 < 0.3) dots.push([y, x])
    }
  }
  return dots.length > 0 ? dots : emptyFrame()
}

/** 顺序填满, 每像素依次亮起. */
function fill(t: number): [number, number][] {
  const total = ROWS * COLS
  const n = Math.floor(t * total) % total
  const dots: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const y = Math.floor(i / COLS)
    const x = i % COLS
    dots.push([y, x])
  }
  return dots
}

/** 对角擦除, 从右下到左上. */
function wipe(t: number): [number, number][] {
  const dots: [number, number][] = []
  const threshold = t * (ROWS + COLS)
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (x + (ROWS - 1 - y) >= threshold) dots.push([y, x])
    }
  }
  return dots
}

const REGISTRY: Record<GlyphAnim, (t: number) => [number, number][]> = {
  pulse,
  scan,
  wave,
  sparkle,
  fill,
  wipe,
}

/** 给定动画名 + 相位 [0, 1), 返回 activeDots. */
export function glyphFrame(anim: GlyphAnim, t: number): [number, number][] {
  return REGISTRY[anim](t)
}

/** Perlin-like 1D noise (cheap), 输出 [0, 1]. */
export function noise1D(x: number, seed = 0): number {
  const xi = Math.floor(x)
  const xf = x - xi
  const h = (n: number) => {
    let s = n * 374761393 + seed * 668265263
    s = (s ^ (s >> 13)) * 1274126177
    return ((s ^ (s >> 16)) >>> 0) / 4294967296
  }
  const a = h(xi)
  const b = h(xi + 1)
  const u = xf * xf * (3 - 2 * xf) // smoothstep
  return a * (1 - u) + b * u
}

/** 多频率叠加, 用于 seismo. */
export function fbm1D(x: number, octaves = 4, seed = 0): number {
  let v = 0
  let amp = 0.5
  let freq = 1
  for (let i = 0; i < octaves; i++) {
    v += amp * noise1D(x * freq, seed + i * 17)
    amp *= 0.5
    freq *= 2
  }
  return Math.min(1, Math.max(0, v))
}
