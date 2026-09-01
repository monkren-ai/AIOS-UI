import type { IconEntry, IconGroup } from './types'

/** AIOS 3.0 no longer ships the former desktop-specific icon registry. */
export const AIOS_GROUPS: IconGroup[] = []
export const AIOS_ICONS: IconEntry[] = []
export const AIOS_GROUP_COUNTS: Record<string, number> = {}

export function toCurrentColorSvg(svg: string): string {
  return svg
    .replace(/(fill|stroke)="(black|white|#000000|#000|#ffffff|#fff)"/gi, '$1="currentColor"')
    .replace(/\s(width|height)="[^"]*"/gi, '')
}

export function aiosImportStatement(icon: IconEntry): string {
  return `// ${icon.name} is no longer distributed by the AIOS icon registry.`
}

export function aiosJsxSnippet(icon: IconEntry): string {
  return `<Icon name="${icon.name}" />`
}
