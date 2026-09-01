import { describe, expect, it } from 'vitest'
import { MAX_THEME_FILE_SIZE, parseDtcgTheme, serializeDtcgTheme } from './dtcg'

const required = {
  color: {
    background: { default: { $value: '#ffffff', $type: 'color' } },
    surface: { default: { $value: '#f4f4f4', $type: 'color' } },
    border: { default: { $value: '#777777', $type: 'color' } },
    text: {
      default: { $value: '#111111', $type: 'color' },
      strong: { $value: '{color.text.default}', $type: 'color' },
    },
    accent: { default: { $value: '#b00008', $type: 'color' } },
    interactive: { default: { $value: '#003fb3', $type: 'color' } },
  },
}

describe('DTCG theme exchange', () => {
  it('parses a valid single-mode theme and resolves aliases', () => {
    const result = parseDtcgTheme({ light: required }, { fileName: 'Studio.tokens.json' })
    expect(result.errors).toEqual([])
    expect(result.theme?.id).toBe('studio')
    expect(result.theme?.modes.light?.['color.text.strong']).toBe('#111111')
  })

  it('detects circular aliases', () => {
    const cyclic = structuredClone(required)
    cyclic.color.text.default.$value = '{color.text.strong}'
    const result = parseDtcgTheme({ light: cyclic })
    expect(result.errors.join(' ')).toContain('循环引用')
    expect(result.theme).toBeNull()
  })

  it('rejects non-sRGB colors and oversized files', () => {
    const color = structuredClone(required)
    color.color.accent.default.$value = { colorSpace: 'display-p3', components: [1, 0, 0] } as never
    expect(parseDtcgTheme({ light: color }).errors.join(' ')).toContain('仅支持 sRGB')
    expect(parseDtcgTheme({ light: required }, { fileSize: MAX_THEME_FILE_SIZE + 1 }).theme).toBeNull()
  })

  it('reports unknown tokens and round-trips normalized themes', () => {
    const result = parseDtcgTheme({ light: { ...required, brand: { magic: { $value: '#000000' } } } })
    expect(result.unknown).toContain('light.brand.magic')
    const serialized = serializeDtcgTheme(result.theme!)
    expect(parseDtcgTheme(JSON.parse(serialized)).theme?.modes.light).toEqual(result.theme?.modes.light)
  })
})
