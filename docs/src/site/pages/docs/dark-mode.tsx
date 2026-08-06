import { Button } from 'aios-ui-kit/button'
import { useTheme } from '@/ThemeProvider'
import { CodeBlock } from '../../components/CodeBlock'
import { ComponentPreview } from '../../components/ComponentPreview'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSubSection, DocTable } from './_shared'

const SETUP = `import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'

<ConfigProvider motion={motion} defaultTheme="dark" enableSystem>
  <App />
</ConfigProvider>`

const TOGGLE = `import { useTheme } from 'aios-ui-kit/theme-provider'
import { Button } from 'aios-ui-kit/button'

const GLYPH = { dark: '●', light: '○', system: '◐' }

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {mounted ? GLYPH[theme] : GLYPH.dark}
    </Button>
  )
}`

const EXPLICIT = `const { theme, resolvedTheme, systemTheme, setTheme } = useTheme()

// 三个显式选项，而不是循环切换
<SegmentedControl value={theme} onValueChange={setTheme}>
  <Item value="light">Light</Item>
  <Item value="dark">Dark</Item>
  <Item value="system">System</Item>
</SegmentedControl>

// theme 是用户选的（可能是 'system'）；
// resolvedTheme 是实际渲染出来的 'light' | 'dark'。
// 想画一个跟随系统的图标，读 systemTheme。`

const SCRIPT_VITE = `// vite.config.ts
import { getThemeScript } from 'aios-ui-kit'

export default defineConfig({
  plugins: [
    {
      name: 'nothing:theme-script',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) =>
          html.replace('<head>', \`<head>\\n<script>\${getThemeScript()}</script>\`),
      },
    },
    // …
  ],
})`

const SCRIPT_SSR = `// Next.js app/layout.tsx
import { ThemeScript } from 'aios-ui-kit'

<html lang="en" suppressHydrationWarning>
  <head>
    <ThemeScript defaultTheme="dark" enableSystem />
  </head>
  …
</html>`

const PREVIEW_CODE = `const { theme, resolvedTheme, toggleTheme } = useTheme()

<Button variant="secondary" onClick={toggleTheme}>
  {theme} → {resolvedTheme}
</Button>`

function ThemeToggleDemo() {
  const { t } = useT()
  const { theme, resolvedTheme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="secondary" onClick={toggleTheme}>
        {t('切换主题', 'Toggle theme')}
      </Button>
      <p className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
        theme: {theme} · resolved: {resolvedTheme}
      </p>
    </div>
  )
}

export default function DarkModePage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('工作原理', 'How it works')}>
        <Prose>
          {t(
            '主题就是 `<html>` 上的一个属性：`data-theme="dark"` 或 `data-theme="light"`。`tokens.css` 在这两个选择器下各写一套原始变量，`theme.css` 用 `@theme inline` 把它们映射成工具类，所以切换属性的那一刻整棵树的配色就变了——没有 class 遍历，没有重新挂载。',
            'A theme is one attribute on `<html>`: `data-theme="dark"` or `data-theme="light"`. `tokens.css` declares one set of raw variables per selector and `theme.css` maps them into utilities with `@theme inline`, so flipping the attribute recolours the entire tree — no class walking, no remounting.',
          )}
        </Prose>
        <Prose>
          {t(
            '刻意**不用** `prefers-color-scheme` 媒体查询来切样式：媒体查询没法表达「用户明确选了亮色，即使系统是暗的」。系统偏好会被读取，但读完之后是被解析成 `data-theme`，而不是直接驱动 CSS。',
            'Styling deliberately does **not** key off a `prefers-color-scheme` media query: a media query cannot express “the user explicitly chose light even though the OS is dark”. The system preference is read, but it is resolved into `data-theme` rather than driving CSS directly.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('配置', 'Setup')}>
        <CodeBlock code={SETUP} />
        <Prose>
          {t(
            '`ConfigProvider` 会把这几个 prop 透传给内部的 `ThemeProvider`。只需要主题、不想要其它 provider 时，也可以直接用 `ThemeProvider`。',
            '`ConfigProvider` forwards these props to the `ThemeProvider` inside it. If you want theming and none of the other providers, use `ThemeProvider` directly.',
          )}
        </Prose>
        <DocTable
          head={[t('属性', 'Prop'), t('默认值', 'Default'), t('作用', 'What it does')]}
          rows={[
            [
              '`defaultTheme`',
              `'dark'`,
              t(
                "localStorage 里还没有值时用哪个。可以是 `'light'` / `'dark'` / `'system'`。",
                "Used when localStorage has nothing stored yet. One of `'light'` / `'dark'` / `'system'`.",
              ),
            ],
            [
              '`enableSystem`',
              'true',
              t(
                "是否允许 `'system'` 这个选项，以及是否订阅 `prefers-color-scheme` 的变化。它同时决定 `toggleTheme` 的循环长度。",
                "Whether `'system'` is an available choice and whether the `prefers-color-scheme` change event is subscribed. It also decides how long the `toggleTheme` cycle is.",
              ),
            ],
            [
              '`forcedTheme`',
              '—',
              t(
                '优先级最高，无视用户选择。适合「这个页面永远是暗的」这类需求（打印页、嵌入式预览）。注意它只影响 `resolvedTheme`，不会改写存储的 `theme`。',
                'Highest priority; ignores the user’s choice. For “this page is always dark” cases (print views, embedded previews). Note it only affects `resolvedTheme`; the stored `theme` is left alone.',
              ),
            ],
            [
              '`disableTransitionOnChange`',
              'true',
              t(
                '切换瞬间注入一条 `transition: none !important` 的样式再撤掉，避免几十个元素同时做颜色过渡时的糊状动画。',
                'Injects a `transition: none !important` rule for the duration of the swap, so dozens of elements do not cross-fade their colours into mush.',
              ),
            ],
            [
              '`onThemeChange`',
              '—',
              t(
                '主题变化回调，用来同步到服务端或埋点。',
                'Called when the theme changes; useful for syncing to a server or analytics.',
              ),
            ],
          ]}
        />
      </DocSection>

      <DocSection title={t('切换的循环顺序', 'The toggle cycle')}>
        <Prose>
          {t(
            '`toggleTheme()` 在 `enableSystem` 为真时走三段循环：**dark → light → system → dark**。关掉 `enableSystem` 就只在 dark 和 light 之间来回。',
            'With `enableSystem` on, `toggleTheme()` runs a three-step cycle: **dark → light → system → dark**. With it off, it just flips between dark and light.',
          )}
        </Prose>
        <Prose>
          {t(
            '三段循环适合顶栏上那个只有一个图标位的按钮。如果界面里有空间摊开三个选项，用 `setTheme` 更好——循环按钮的问题是用户看不出下一次点会去哪。',
            'The three-step cycle suits a single-icon button in a top bar. If you have room to lay all three options out, prefer `setTheme` — the weakness of a cycling button is that you cannot see where the next press will take you.',
          )}
        </Prose>
        <CodeBlock code={EXPLICIT} />
      </DocSection>

      <DocSection title={t('持久化', 'Persistence')}>
        <DocList
          items={[
            t(
              "localStorage 的 key 是 `nothing-theme`，存的是用户选的那个值（可能是字符串 `'system'`），不是解析后的结果。",
              "The localStorage key is `nothing-theme` and it stores the user’s choice — possibly the literal string `'system'` — not the resolved appearance.",
            ),
            t(
              "`getInitialTheme()` 只接受 `'light'` / `'dark'` / `'system'` 三个值，其它内容一律忽略并回落到 `defaultTheme`，所以手改 localStorage 弄不出坏状态。",
              "`getInitialTheme()` accepts only `'light'` / `'dark'` / `'system'` and ignores anything else, falling back to `defaultTheme`; hand-editing localStorage cannot wedge it into a bad state.",
            ),
            t(
              '读写都包在能容忍失败的路径里（Safari 隐私模式下 localStorage 会抛错），拿不到存储时行为退化成「每次都用 defaultTheme」。',
              'Reads and writes tolerate failure — localStorage throws in Safari private mode — and degrade to “always use `defaultTheme`”.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('避免首屏闪烁', 'Avoiding the flash')}>
        <Prose>
          {t(
            '问题是这样的：HTML 到达浏览器时 `<html>` 上还没有 `data-theme`，于是 `:root` 那一套（暗色）先画出来；React 水合之后 `ThemeProvider` 才把属性改成用户真正选的 `light`。用户看到的是一帧黑闪。',
            'The problem: when the HTML arrives there is no `data-theme` on `<html>` yet, so the `:root` set — dark — paints first; only after hydration does `ThemeProvider` set the attribute to the `light` the user actually chose. The user sees one black frame.',
          )}
        </Prose>
        <Prose>
          {t(
            '解决办法是在 `<head>` 里放一段同步的内联脚本，早于任何渲染执行：它读 localStorage，必要时读 `matchMedia`，然后直接设好 `data-theme`。这段脚本由 `getThemeScript()` 生成，所以它和 `ThemeProvider` 的判定逻辑是同一份来源，不会各自漂移。',
            'The fix is a synchronous inline script in `<head>` that runs before anything paints: it reads localStorage, consults `matchMedia` if needed, and sets `data-theme` itself. The script is produced by `getThemeScript()`, so it and `ThemeProvider` derive from one source and cannot drift apart.',
          )}
        </Prose>
        <DocSubSection title={t('Vite / SPA', 'Vite / SPA')}>
          <Prose>
            {t(
              '本仓库就是这么做的——`scripts/vite-theme-script-plugin.ts` 在 `transformIndexHtml` 阶段把脚本插到 `<head>` 最前面，这样 `index.html` 里不会出现一份手抄的副本。',
              'This is exactly what this repository does: `scripts/vite-theme-script-plugin.ts` injects the script at the very start of `<head>` during `transformIndexHtml`, so no hand-copied duplicate lives in `index.html`.',
            )}
          </Prose>
          <CodeBlock code={SCRIPT_VITE} collapseAfter={16} />
        </DocSubSection>
        <DocSubSection title={t('SSR / Next.js', 'SSR / Next.js')}>
          <CodeBlock code={SCRIPT_SSR} />
          <DocNote label={t('别忘了', 'Don’t forget')}>
            {t(
              '`<html>` 要加 `suppressHydrationWarning`。脚本在水合前就改了 `data-theme`，服务端渲染出来的 HTML 与客户端首次比对必然不一致，不加这个属性 React 会报警告。`ThemeScript` 支持 `nonce`，用于严格 CSP 的站点。',
              'Put `suppressHydrationWarning` on `<html>`. The script mutates `data-theme` before hydration, so the server-rendered markup necessarily differs from what the client first sees, and React warns about it otherwise. `ThemeScript` accepts a `nonce` for sites with a strict CSP.',
            )}
          </DocNote>
        </DocSubSection>
      </DocSection>

      <DocSection title={t('做一个切换器', 'Building a toggle')}>
        <CodeBlock code={TOGGLE} collapseAfter={24} />
        <Prose>
          {t(
            '`mounted` 是为 SSR 准备的：首次渲染时服务端不知道用户选了什么，直接渲染图标会导致水合不一致。`mounted` 为 false 时先渲染一个稳定的占位（或者干脆按 `defaultTheme` 渲染），挂载后再显示真实状态。图标按钮必须有 `aria-label`，因为它没有可读文本。',
            '`mounted` exists for SSR: on the first render the server does not know what the user chose, so rendering the glyph immediately causes a hydration mismatch. While `mounted` is false, render a stable placeholder — or just the `defaultTheme` glyph — and show the real state afterwards. The icon button needs an `aria-label`, since it has no text content.',
          )}
        </Prose>
        <ComponentPreview code={PREVIEW_CODE} minHeight={140}>
          <ThemeToggleDemo />
        </ComponentPreview>
        <Prose>
          {t(
            '上面这个预览用的就是本站顶栏在用的那个 provider，所以点它会把整个文档站的主题切掉——这也顺便证明了属性挂在 `<html>` 上是全局生效的。',
            'That preview uses the same provider as this site’s top bar, so pressing it retints the whole documentation site — which incidentally demonstrates that the attribute on `<html>` is global.',
          )}
        </Prose>
      </DocSection>
    </div>
  )
}
