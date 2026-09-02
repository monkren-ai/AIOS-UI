import { useMemo, useRef, useState, type CSSProperties, type DragEvent } from 'react'
import { Alert } from 'aios-ui-kit/alert'
import { Badge } from 'aios-ui-kit/badge'
import { Button, buttonVariants } from 'aios-ui-kit/button'
import { Modal } from 'aios-ui-kit/modal'
import { Surfaces } from 'aios-ui-kit/surfaces'
import {
  AIOS_BUILTIN_THEMES,
  AIOS_DEFAULT_THEME_ID,
  MAX_THEME_FILE_SIZE,
  THEME_TOKEN_CSS_VARIABLES,
  parseDtcgTheme,
  resolveThemeTokens,
  serializeDtcgTheme,
  useTheme,
  type ThemeDefinition,
  type ThemeImportResult,
  type ThemeTokenName,
} from '@/ThemeProvider'
import { cn } from '@/lib/utils'
import { useT } from '@/site/i18n'
import { useThemeCatalog } from '@/site/themes/ThemeCatalogProvider'

type PreviewStyle = CSSProperties & Record<`--${string}`, string>

function previewStyle(theme: ThemeDefinition, mode: 'light' | 'dark'): PreviewStyle {
  const style: PreviewStyle = {}
  for (const [token, value] of Object.entries(resolveThemeTokens(theme, mode))) {
    const property = THEME_TOKEN_CSS_VARIABLES[token as ThemeTokenName]
    if (property && value) style[property] = value
  }
  return style
}

function coverage(theme: ThemeDefinition) {
  const count = Object.values(theme.modes).reduce((sum, values) => sum + Object.keys(values ?? {}).length, 0)
  const total = Object.keys(THEME_TOKEN_CSS_VARIABLES).length * Math.max(1, Object.keys(theme.modes).length)
  return Math.round((count / total) * 100)
}

function download(name: string, body: string) {
  const url = URL.createObjectURL(new Blob([body], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  URL.revokeObjectURL(url)
}

function ThemePreview({
  theme,
  active,
  onEnable,
}: {
  theme: ThemeDefinition
  active: boolean
  onEnable: () => void
}) {
  const { t } = useT()
  const { resolvedTheme } = useTheme()
  const tokens = resolveThemeTokens(theme, resolvedTheme)
  const swatches = [
    tokens['color.background.default'], tokens['color.surface.default'], tokens['color.text.default'],
    tokens['color.accent.default'], tokens['color.interactive.default'],
  ]
  return (
    <article aria-current={active ? 'true' : undefined}>
      <Surfaces
        elevation={active ? 2 : 1}
        padding="md"
        border={active ? 'visible' : 'default'}
        radius="md"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant={active ? 'primary' : 'soft'} size="sm">
              {theme.source === 'builtin' ? t('内置', 'Built-in') : t('本地', 'Local')}
              {' · '}
              {coverage(theme)}%
            </Badge>
            <h3 className="mt-2 text-subheading font-medium text-foreground-display">{theme.name}</h3>
            <p className="mt-1 text-body-sm text-foreground-muted">{theme.description}</p>
          </div>
          <Button
            size="sm"
            variant={active ? 'secondary' : 'primary'}
            disabled={active}
            onClick={onEnable}
          >
            {active ? t('已启用', 'Active') : t('启用', 'Enable')}
          </Button>
        </div>
        <div className="mt-4 flex gap-1" aria-label={t('主题色板', 'Theme palette')}>
          {swatches.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="h-7 flex-1 border border-border"
              style={{ background: color }}
            />
          ))}
        </div>
        <Surfaces
          elevation={1}
          padding="md"
          border="default"
          radius="md"
          className="mt-3 text-foreground"
          style={previewStyle(theme, resolvedTheme)}
          data-theme={resolvedTheme}
        >
          <p className="font-display text-heading text-foreground-display">Aa 24</p>
          <p className="mt-1 text-body-sm text-foreground-muted">Semantic preview / 语义预览</p>
          <div className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
            <span
              className={cn(
                buttonVariants({ variant: 'primary', size: 'sm' }),
                'pointer-events-none cursor-default',
              )}
            >
              Action
            </span>
            <span
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'pointer-events-none cursor-default',
              )}
            >
              Control
            </span>
          </div>
        </Surfaces>
      </Surfaces>
    </article>
  )
}

export default function ThemesPage() {
  const { t } = useT()
  const { themeId, activeTheme, resolvedTheme, setThemeId } = useTheme()
  const { customThemes, persistenceError, saveTheme, deleteTheme } = useThemeCatalog()
  const inputRef = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<ThemeImportResult | null>(null)
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const builtins = useMemo(() => AIOS_BUILTIN_THEMES.filter((theme) => theme.id !== themeId), [themeId])

  async function inspect(file: File) {
    setFileName(file.name)
    if (!/\.(tokens|tokens\.json|json)$/i.test(file.name)) {
      setResult({ theme: null, coverage: 0, errors: [t('仅支持 .tokens、.tokens.json 或 JSON 文件', 'Only .tokens, .tokens.json, or JSON files are supported')], missing: [], unknown: [], contrastWarnings: [] })
      return
    }
    if (file.size > MAX_THEME_FILE_SIZE) {
      setResult({ theme: null, coverage: 0, errors: [t('文件超过 256 KB 限制', 'File exceeds the 256 KB limit')], missing: [], unknown: [], contrastWarnings: [] })
      return
    }
    try { setResult(parseDtcgTheme(JSON.parse(await file.text()), { fileName: file.name, fileSize: file.size })) }
    catch { setResult({ theme: null, coverage: 0, errors: [t('JSON 无法解析', 'Invalid JSON')], missing: [], unknown: [], contrastWarnings: [] }) }
  }

  function activate(theme: ThemeDefinition) {
    const analysis = parseDtcgTheme(JSON.parse(serializeDtcgTheme(theme)), { fileName: `${theme.id}.tokens.json` })
    if (analysis.contrastWarnings.length && !window.confirm(t('该主题存在对比度警告。仍要启用吗？', 'This theme has contrast warnings. Enable it anyway?'))) return
    setThemeId(theme.id)
  }

  async function confirmImport() {
    if (!result?.theme) return
    const duplicate = customThemes.some((theme) => theme.id === result.theme?.id)
    if (duplicate && !window.confirm(t('同 ID 主题已存在，确认替换？', 'A theme with this ID exists. Replace it?'))) return
    await saveTheme(result.theme)
    setResult(null)
  }

  async function remove(theme: ThemeDefinition) {
    if (!window.confirm(t(`删除主题“${theme.name}”？`, `Delete “${theme.name}”?`))) return
    if (theme.id === themeId) setThemeId(AIOS_DEFAULT_THEME_ID)
    await deleteTheme(theme.id)
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault(); setDragging(false)
    const file = event.dataTransfer.files[0]
    if (file) void inspect(file)
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <header className="max-w-3xl">
        <Badge variant="outline" size="lg" dot>
          AIOS UI 3.0
        </Badge>
        <h1 className="mt-3 font-display text-display-sm text-foreground-display md:text-display-md">{t('主题', 'Themes')}</h1>
        <p className="mt-4 text-body text-foreground-muted">{t('主题家族改变全站的语义视觉令牌；明暗模式仍可独立切换。上传文件只在当前浏览器解析和保存。', 'Theme families change semantic visual tokens across the site while color mode stays independent. Uploads are parsed and stored only in this browser.')}</p>
      </header>

      <section className="mt-12" aria-labelledby="current-theme">
        <h2 id="current-theme" className="text-heading font-medium text-foreground-display">{t('当前主题', 'Current theme')}</h2>
        <Surfaces
          elevation={2}
          padding="lg"
          border="visible"
          radius="md"
          className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]"
        >
          <div>
            <Badge variant="primary" size="sm" dot>
              {t('已启用', 'Active')}
            </Badge>
            <h3 className="mt-2 text-heading text-foreground-display">{activeTheme.name}</h3>
            <p className="mt-2 text-body-sm text-foreground-muted">{t('来源', 'Source')}: {activeTheme.source} · {t('模式', 'Mode')}: {resolvedTheme} · {t('覆盖率', 'Coverage')}: {coverage(activeTheme)}%</p>
          </div>
          <div className="flex items-center gap-1" aria-label={t('当前色板', 'Current palette')}>
            {['color.background.default', 'color.surface.default', 'color.accent.default', 'color.interactive.default'].map((token) =>
              <span key={token} className="size-10 border border-border" style={{ background: resolveThemeTokens(activeTheme, resolvedTheme)[token as ThemeTokenName] }} />)}
          </div>
        </Surfaces>
      </section>

      <section className="mt-12" aria-labelledby="other-themes">
        <h2 id="other-themes" className="text-heading font-medium text-foreground-display">{t('其他主题', 'Other themes')}</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">{builtins.map((theme) => <ThemePreview key={theme.id} theme={theme} active={false} onEnable={() => activate(theme)} />)}</div>
      </section>

      <section className="mt-12" aria-labelledby="custom-themes">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><h2 id="custom-themes" className="text-heading font-medium text-foreground-display">{t('自定义主题', 'Custom themes')}</h2><p className="mt-2 text-body-sm text-foreground-muted">DTCG 2025.10 · sRGB · 256 KB max</p></div>
          <Button variant="secondary" size="sm" onClick={() => download('aios-theme-template.tokens.json', serializeDtcgTheme({ ...AIOS_BUILTIN_THEMES[0], id: 'my-theme', name: 'My Theme', source: 'custom' }))}>{t('下载格式模板', 'Download template')}</Button>
        </div>
        {persistenceError && (
          <Alert
            className="mt-4"
            title={t('本地存储不可用', 'Local storage unavailable')}
          >
            {persistenceError}
          </Alert>
        )}
        <Surfaces
          elevation={dragging ? 2 : 1}
          padding="lg"
          border="visible"
          radius="md"
          className={cn('mt-4 grid min-h-40 place-items-center border-dashed text-center', dragging && 'border-accent bg-accent-subtle')}
          onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={onDrop}
        >
          <div><p className="text-body text-foreground">{t('拖放设计令牌文件到这里', 'Drop a design token file here')}</p><p className="mt-1 text-body-sm text-foreground-muted">{t('不接受 CSS、ZIP、URL 或远程字体', 'CSS, ZIP, URLs, and remote fonts are not accepted')}</p><Button className="mt-4" variant="secondary" onClick={() => inputRef.current?.click()}>{t('选择文件', 'Choose file')}</Button></div>
          <input ref={inputRef} className="sr-only" type="file" accept=".tokens,.tokens.json,.json,application/json" onChange={(event) => { const file = event.target.files?.[0]; if (file) void inspect(file) }} />
        </Surfaces>
        <p className="mt-3 font-mono text-label text-foreground-subtle">{t('隐私：文件内容不会被发送到网络。', 'Privacy: file contents never leave your browser.')}</p>

        {customThemes.length > 0 && <div className="mt-6 grid gap-4 lg:grid-cols-2">{customThemes.map((theme) => <div key={theme.id}><ThemePreview theme={theme} active={theme.id === themeId} onEnable={() => activate(theme)} /><div className="mt-2 flex gap-2"><Button size="sm" variant="ghost" onClick={() => download(`${theme.id}.tokens.json`, serializeDtcgTheme(theme))}>{t('导出', 'Export')}</Button><Button size="sm" variant="ghost" onClick={() => void remove(theme)}>{t('删除', 'Delete')}</Button></div></div>)}</div>}
      </section>

      {result && (
        <Modal
          open
          onClose={() => setResult(null)}
          title={t('导入审查', 'Import review')}
          className="max-w-2xl"
          footer={
            <>
              <Button variant="ghost" onClick={() => setResult(null)}>
                {t('取消', 'Cancel')}
              </Button>
              <Button disabled={!result.theme} onClick={() => void confirmImport()}>
                {t('加入主题目录', 'Add theme')}
              </Button>
            </>
          }
        >
          <Badge variant="soft" size="sm">
            {fileName}
          </Badge>
          {result.theme && <p className="mt-3 text-body text-foreground">{result.theme.name} · {Object.keys(result.theme.modes).join(' / ')} · {result.coverage}%</p>}
          {result.errors.length > 0 && (
            <Alert variant="destructive" className="mt-4" title={t('错误', 'Errors')}>
              <ul className="list-disc ps-5">
                {result.errors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Alert>
          )}
          {result.missing.length > 0 && <p className="mt-4 text-body-sm text-foreground-muted">{t('缺失', 'Missing')}: {result.missing.join(', ')}</p>}
          {result.unknown.length > 0 && <p className="mt-4 text-body-sm text-foreground-muted">{t('忽略的未知项', 'Ignored unknown tokens')}: {result.unknown.join(', ')}</p>}
          {result.contrastWarnings.length > 0 && (
            <Alert className="mt-4" title={t('对比度警告', 'Contrast warnings')}>
              {result.contrastWarnings.map((item) => (
                <p className="mt-1" key={item}>{item}</p>
              ))}
            </Alert>
          )}
        </Modal>
      )}
    </main>
  )
}
