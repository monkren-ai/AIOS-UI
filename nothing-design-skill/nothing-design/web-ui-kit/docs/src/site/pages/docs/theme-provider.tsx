import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { PropsTable } from '../../components/PropsTable'
import { useT } from '../../i18n'
import type { ApiSection } from '../../registry/types'
import { DocList, DocNote, DocSection } from './_shared'

const IMPORT = `import {
  ThemeProvider,
  useTheme,
  ThemeScript,
  getThemeScript,
  type Theme,
  type ThemeAppearance,
} from 'aios-ui-kit/theme-provider'`

const USAGE = `<ThemeProvider defaultTheme="dark" enableSystem>
  <App />
</ThemeProvider>`

const HOOK = `const { theme, resolvedTheme, systemTheme, mounted, setTheme, toggleTheme } = useTheme()`

const providerSection: ApiSection = {
  name: 'ThemeProvider',
  description: {
    zh: '管理明暗主题：解析 `system`、写 `<html data-theme>`、持久化到 localStorage。',
    en: 'Owns the light/dark theme: resolves `system`, writes `<html data-theme>`, and persists to localStorage.',
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: { zh: '组件树。', en: 'The tree to provide to.' },
    },
    {
      name: 'defaultTheme',
      type: `'light' | 'dark' | 'system'`,
      default: `'dark'`,
      description: {
        zh: 'localStorage 里没有有效值时使用的主题。',
        en: 'Used when localStorage holds no valid value.',
      },
    },
    {
      name: 'forcedTheme',
      type: `'light' | 'dark'`,
      description: {
        zh: '强制外观，优先级最高。只影响 `resolvedTheme`，不写入存储、也不改变 `theme`。',
        en: 'Forces the appearance; highest priority. Affects `resolvedTheme` only — it is not persisted and does not change `theme`.',
      },
    },
    {
      name: 'enableSystem',
      type: 'boolean',
      default: 'true',
      description: {
        zh: "是否订阅 `prefers-color-scheme` 并允许 `'system'`。同时决定 `toggleTheme` 是三段循环还是二段。",
        en: "Whether `prefers-color-scheme` is subscribed and `'system'` is allowed. Also decides whether `toggleTheme` cycles through three values or two.",
      },
    },
    {
      name: 'disableTransitionOnChange',
      type: 'boolean',
      default: 'true',
      description: {
        zh: '切换瞬间注入一条 `transition: none !important` 并在下一帧撤掉，避免整页颜色一起做过渡。',
        en: 'Injects a `transition: none !important` rule for the swap and removes it on the next tick, so the whole page does not cross-fade its colours.',
      },
    },
    {
      name: 'onThemeChange',
      type: '(theme: Theme) => void',
      description: {
        zh: "主题变化时调用，参数是用户选的值（可能是 `'system'`）。首次挂载也会触发一次。",
        en: "Called when the theme changes, with the user’s choice (possibly `'system'`). Also fires once on mount.",
      },
    },
  ],
}

const hookSection: ApiSection = {
  name: 'useTheme()',
  description: {
    zh: '读取并修改主题状态。没有 provider 时返回一份「暗色、未挂载」的默认值，两个 setter 是空函数。',
    en: 'Reads and updates the theme state. With no provider mounted it returns a “dark, not mounted” default whose setters are no-ops.',
  },
  props: [
    {
      name: 'theme',
      type: `'light' | 'dark' | 'system'`,
      description: {
        zh: '用户选的值。要在 UI 上显示当前选项就读这个。',
        en: 'The user’s choice. Read this to render which option is selected.',
      },
    },
    {
      name: 'resolvedTheme',
      type: `'light' | 'dark'`,
      description: {
        zh: '实际生效的外观，`system` 已被解析。要按主题分支渲染就读这个。',
        en: 'The appearance actually in effect, with `system` resolved. Read this to branch on the theme.',
      },
    },
    {
      name: 'systemTheme',
      type: `'light' | 'dark' | undefined`,
      description: {
        zh: '系统偏好本身。`enableSystem` 为 false 时是 `undefined`。',
        en: 'The system preference itself. `undefined` when `enableSystem` is false.',
      },
    },
    {
      name: 'mounted',
      type: 'boolean',
      description: {
        zh: '首个 effect 跑完后变成 `true`。SSR 下用它推迟渲染依赖主题的内容，避免水合不一致。',
        en: 'Becomes `true` after the first effect. Under SSR, use it to defer theme-dependent output and avoid a hydration mismatch.',
      },
    },
    {
      name: 'setTheme',
      type: '(theme: Theme) => void',
      description: {
        zh: '直接设定主题。三个显式选项的 UI 用这个。',
        en: 'Sets the theme directly. Use this for a UI that shows all three options.',
      },
    },
    {
      name: 'toggleTheme',
      type: '() => void',
      description: {
        zh: '循环切换。`enableSystem` 为真时是 dark → light → system → dark，否则只在 dark / light 之间切。',
        en: 'Cycles. With `enableSystem` it goes dark → light → system → dark; otherwise it flips between dark and light.',
      },
    },
  ],
}

const scriptSection: ApiSection = {
  name: 'ThemeScript / getThemeScript()',
  description: {
    zh: '在 `<head>` 里同步执行的内联脚本，早于渲染设好 `data-theme`，消除首屏闪烁。`ThemeScript` 是组件形态，`getThemeScript()` 返回同一段脚本的字符串，供构建期注入。',
    en: 'A synchronous inline script for `<head>` that sets `data-theme` before anything paints, removing the flash. `ThemeScript` is the component form; `getThemeScript()` returns the same script as a string for build-time injection.',
  },
  props: [
    {
      name: 'storageKey',
      type: 'string',
      default: `'nothing-theme'`,
      description: {
        zh: '要读的 localStorage key。改了这里就要同步改 provider 侧——目前 provider 的 key 是写死的。',
        en: 'The localStorage key to read. If you change it, change the provider side too — the provider’s key is currently hard-coded.',
      },
    },
    {
      name: 'defaultTheme',
      type: `'light' | 'dark' | 'system'`,
      default: `'dark'`,
      description: {
        zh: '存储里没有值时用哪个。应与 provider 的 `defaultTheme` 一致。',
        en: 'Used when nothing is stored. Keep it in sync with the provider’s `defaultTheme`.',
      },
    },
    {
      name: 'enableSystem',
      type: 'boolean',
      default: 'true',
      description: {
        zh: "为 true 时，存储值为 `'system'` 会在脚本里用 `matchMedia` 解析。",
        en: "When true, a stored `'system'` is resolved with `matchMedia` inside the script.",
      },
    },
    {
      name: 'nonce',
      type: 'string',
      description: {
        zh: 'CSP nonce。只在服务端渲染时输出。',
        en: 'CSP nonce. Emitted only during server rendering.',
      },
    },
    {
      name: 'scriptProps',
      type: `ScriptHTMLAttributes<HTMLScriptElement>`,
      description: {
        zh: '透传给 `<script>` 的额外属性。',
        en: 'Extra attributes forwarded to the `<script>` element.',
      },
    },
  ],
}

export default function ThemeProviderPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('导入', 'Import')}>
        <CodeBlock code={IMPORT} />
        <Prose>
          {t(
            '`ConfigProvider` 内部已经挂了 `ThemeProvider` 并透传 `defaultTheme` / `enableSystem` / `onThemeChange`。只有在不想要 motion、方向、reduced-motion 那几层时才单独用它。',
            '`ConfigProvider` already mounts `ThemeProvider` and forwards `defaultTheme` / `enableSystem` / `onThemeChange`. Use it standalone only when you do not want the motion, direction, and reduced-motion layers.',
          )}
        </Prose>
        <CodeBlock code={USAGE} />
      </DocSection>

      <DocSection title={t('它具体做了什么', 'What it actually does')}>
        <DocList
          items={[
            t(
              "初始状态从 `localStorage.getItem('nothing-theme')` 读，只接受 `light` / `dark` / `system`，其它值忽略并回落到 `defaultTheme`。",
              "Initial state comes from `localStorage['nothing-theme']`, accepting only `'light'` / `'dark'` / `'system'`; anything else is ignored in favour of `defaultTheme`.",
            ),
            t(
              '把 `resolvedTheme` 写到 `document.documentElement` 的 `data-theme` 上。注意它写的是**解析后的值**——`<html>` 上只会出现 `dark` 或 `light`，不会出现 `system`。',
              'Writes `resolvedTheme` to `data-theme` on `document.documentElement`. Note it writes the **resolved** value: `<html>` only ever shows `dark` or `light`, never `system`.',
            ),
            t(
              '`theme` 变化时写回 localStorage 并调用 `onThemeChange`。',
              'Persists to localStorage and calls `onThemeChange` whenever `theme` changes.',
            ),
            t(
              "`enableSystem` 为真时订阅 `matchMedia('(prefers-color-scheme: dark)')` 的 `change` 事件，所以选了 `system` 的用户改系统设置会立即生效。",
              "With `enableSystem` on, subscribes to the `change` event of `matchMedia('(prefers-color-scheme: dark)')`, so a user on `system` sees the switch immediately.",
            ),
            t(
              '写属性前后临时插一条 `transition: none !important`（可用 `disableTransitionOnChange` 关掉）。',
              'Brackets the attribute write with a temporary `transition: none !important` rule, which `disableTransitionOnChange` turns off.',
            ),
          ]}
        />
        <DocNote label={t('它不做什么', 'What it does not do')}>
          {t(
            '它不在首帧之前设属性——那是 `ThemeScript` 的活。只用 provider 不加脚本的话，服务端渲染或静态 HTML 会先按 `:root`（暗色）画一帧。',
            'It does not set the attribute before the first paint — that is `ThemeScript`’s job. Provider without script means server-rendered or static HTML paints one frame using the `:root` set, which is dark.',
          )}
        </DocNote>
      </DocSection>

      <DocSection title="API">
        <PropsTable section={providerSection} />
        <PropsTable section={hookSection} />
        <CodeBlock code={HOOK} />
        <PropsTable section={scriptSection} />
      </DocSection>

      <DocSection title={t('类型', 'Types')}>
        <CodeBlock
          code={`type Theme = 'light' | 'dark' | 'system'          // 用户可选的
type ThemeAppearance = 'light' | 'dark'          // 实际渲染的`}
        />
        <Prose>
          {t(
            '两个类型分开是刻意的：`forcedTheme` 只接受 `ThemeAppearance`，因为「强制跟随系统」没有意义。',
            'The two types are separate on purpose: `forcedTheme` accepts only `ThemeAppearance`, because “forced to follow the system” is not a meaningful state.',
          )}
        </Prose>
      </DocSection>
    </div>
  )
}
