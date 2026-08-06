import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSteps, DocTable } from './_shared'

const INSTALL = `npm install aios-ui-kit motion
# 或 / or
pnpm add aios-ui-kit motion`

const CSS_SETUP = `@import 'tailwindcss';
@import 'aios-ui-kit/styles.css';

@source '../node_modules/aios-ui-kit/es';`

const PROVIDER_SETUP = `import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'
import './app.css'

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider motion={motion} defaultTheme="dark" enableSystem>
      {children}
    </ConfigProvider>
  )
}`

const FIRST_COMPONENT = `import { Button } from 'aios-ui-kit/button'

export function Example() {
  return <Button variant="primary">Continue</Button>
}`

const NEXT_SETUP = `// app/providers.tsx
'use client'

import * as motion from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ConfigProvider } from 'aios-ui-kit'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider motion={motion} config={{ aAs: Link, imgAs: Image }}>
      {children}
    </ConfigProvider>
  )
}

// app/layout.tsx
import { ThemeScript } from 'aios-ui-kit'
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="dark" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`

export default function InstallationPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('前置条件', 'Requirements')}>
        <DocList
          items={[
            t(
              '**React 19** 或更高。组件用的是 React 19 的 ref-as-prop，没有 `forwardRef` 包装。',
              '**React 19** or newer. Components use React 19 ref-as-prop and are not wrapped in `forwardRef`.',
            ),
            t(
              '**Tailwind CSS v4**。不是可选项——见下一节。',
              '**Tailwind CSS v4**. Not optional — see the next section.',
            ),
            t(
              '**motion ≥ 12**，声明为 peer dependency 且 `optional: false`。',
              '**motion ≥ 12**, declared as a peer dependency with `optional: false`.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('安装', 'Install')}>
        <CodeBlock code={INSTALL} />
        <Prose>
          {t(
            '`motion` 必须由你安装。库本身不 import 它，而是通过 `ConfigProvider` 的 `motion` prop 注入——这样你可以自己决定用完整版 `motion/react` 还是体积更小的 `motion/react-m`，也避免同一页面里出现两份 motion 运行时。',
            'You install `motion` yourself. The library never imports it; it is injected through `ConfigProvider`’s `motion` prop, so you choose between the full `motion/react` and the smaller `motion/react-m`, and you never end up with two motion runtimes on one page.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('为什么必须有 Tailwind v4', 'Why Tailwind v4 is required')}>
        <Prose>
          {t(
            '这个库不发布「每个组件一份编译好的 CSS」。组件的样式就是 Tailwind 工具类，它们以源码形式躺在发布产物里，**由你的 Tailwind 负责编译**。少了这一步，组件能渲染出正确的 DOM，但一点样式都没有。',
            'This library does not ship one precompiled stylesheet per component. Component styles *are* Tailwind class names, shipped as source inside the published files, and **your** Tailwind is what compiles them. Skip this step and components render the right DOM with no styling at all.',
          )}
        </Prose>
        <Prose>
          {t(
            '换来的好处是：`cn()` 用 `tailwind-merge` 合并类名，所以你传进来的 `className` 能真正覆盖变体自带的工具类，而不是打一场优先级战争。',
            'What you get in return: because `cn()` merges class names with `tailwind-merge`, the `className` you pass genuinely overrides the variant’s own utilities instead of starting a specificity fight.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('接入样式', 'Wire up the stylesheet')}>
        <Prose>
          {t(
            '在你的全局样式文件（Vite 项目一般是 `src/app.css`，Next.js 是 `app/globals.css`）里写三行：',
            'Three lines in your global stylesheet — usually `src/app.css` in a Vite project, `app/globals.css` in Next.js:',
          )}
        </Prose>
        <CodeBlock code={CSS_SETUP} filename="src/app.css" />
        <DocList
          items={[
            t(
              "`@import 'tailwindcss'` 必须在前。`styles.css` 里有 `--color-*: initial`，会整体关掉 Tailwind 默认调色板；顺序反了这条重置就没有意义。",
              "`@import 'tailwindcss'` has to come first. `styles.css` contains `--color-*: initial`, which switches the whole default Tailwind palette off; in the other order that reset has nothing to reset.",
            ),
            t(
              '`aios-ui-kit/styles.css` 带进来两层东西：`tokens.css`（随 `[data-theme]` 切换的原始变量）和 `theme.css`（把它们映射成 `bg-surface`、`rounded-card` 这类工具类），另外还有 base 层的 `:focus-visible` 轮廓和 reduced-motion 兜底。',
              '`aios-ui-kit/styles.css` brings in two layers: `tokens.css` (the raw variables that switch on `[data-theme]`) and `theme.css` (which maps them into utilities like `bg-surface` and `rounded-card`), plus the base-layer `:focus-visible` outline and the reduced-motion fallback.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('@source 那一行到底在干什么', 'What that @source line actually does')}>
        <Prose>
          {t(
            'Tailwind v4 自动扫描你的项目找类名，但**它刻意跳过 `node_modules`**（同时也尊重 `.gitignore`）。也就是说库里 `bg-surface-raised`、`h-11`、`rounded-button` 这些类名，Tailwind 根本看不见，于是不会为它们生成任何 CSS。`@source` 就是显式把这块目录加回扫描范围。',
            'Tailwind v4 discovers class names by scanning your project, but **it deliberately skips `node_modules`** (and respects `.gitignore` while it is at it). Which means the `bg-surface-raised`, `h-11`, and `rounded-button` living inside the package are invisible to it, so no CSS gets generated for them. `@source` explicitly adds that directory back to the scan.',
          )}
        </Prose>
        <DocNote label={t('容易踩的坑', 'Easy to get wrong')}>
          {t(
            "`@source` 的路径是**相对于这个样式表文件**解析的，不是相对于项目根目录，也不接受裸包名。样式表在 `src/app.css` 时要写 `'../node_modules/aios-ui-kit/es'`；在 `app/globals.css` 时同样是 `'../node_modules/…'`；如果样式表在项目根，就去掉 `../`。写成 `@source 'aios-ui-kit'` 是无效的。",
            "`@source` paths resolve **relative to the stylesheet that contains them**, not to the project root, and a bare package name is not accepted. From `src/app.css` you write `'../node_modules/aios-ui-kit/es'`; from `app/globals.css` it is also `'../node_modules/…'`; if the stylesheet sits at the project root, drop the `../`. `@source 'aios-ui-kit'` does nothing.",
          )}
        </DocNote>
        <Prose>
          {t(
            '判断有没有生效很简单：如果按钮有正确的高度和圆角，就通了；如果它是一个没有背景、没有边框的裸文字，就是 `@source` 没指对。',
            'The check is simple: if buttons have the right height and radius, it worked. If a button renders as bare text with no background and no border, your `@source` path is wrong.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('包一层 ConfigProvider', 'Wrap the app in ConfigProvider')}>
        <Prose>
          {t(
            '`ConfigProvider` 是一个组合件，它一次性挂上四个 Provider：`ThemeProvider`（主题状态与持久化）、`DirectionProvider`（LTR/RTL）、`ReducedMotionProvider`（减弱动效偏好）、`MotionProvider`（motion 注入）。`motion` 是**必传** prop。',
            '`ConfigProvider` is a composite: it mounts four providers at once — `ThemeProvider` (theme state and persistence), `DirectionProvider` (LTR/RTL), `ReducedMotionProvider` (the reduced-motion preference), and `MotionProvider` (the motion injection). `motion` is a **required** prop.',
          )}
        </Prose>
        <CodeBlock code={PROVIDER_SETUP} filename="src/Root.tsx" />
        <Prose>
          {t(
            '漏掉 `motion` 的话，静态组件照样能用，但任何调用 `useMotionComponent()` 的组件会抛错并给出明确提示——这是刻意的，比默默不动画好排查。`config` 还能替换渲染 `<a>` 与 `<img>` 的元素（`aAs` / `imgAs`），Next.js 项目通常填 `next/link` 和 `next/image`。',
            'Leave `motion` out and static components still work, but anything calling `useMotionComponent()` throws with an explicit message — deliberately, because that is easier to debug than silently missing animation. `config` also lets you swap the elements used for `<a>` and `<img>` (`aAs` / `imgAs`); in Next.js that is usually `next/link` and `next/image`.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('第一个组件', 'Your first component')}>
        <CodeBlock code={FIRST_COMPONENT} />
        <DocNote label={t('关于导入路径', 'About the import paths')}>
          {t(
            '本站所有示例里的 `aios-ui-kit/button` 就是你在自己项目里该写的那一行——站点把这个包名指回了仓库源码，所以代码块和真实用法不会分叉，复制出去即可运行。',
            'The `aios-ui-kit/button` you see in every example on this site is exactly the line you write in your own project. The site resolves that package name back to the repository source, so the code blocks cannot drift from real usage — copy them as-is.',
          )}
        </DocNote>
      </DocSection>

      <DocSection title={t('各框架的接法', 'Framework setup')}>
        <DocTable
          head={[
            t('框架', 'Framework'),
            t('样式表位置', 'Stylesheet'),
            t('要注意的地方', 'What to watch for'),
          ]}
          rows={[
            [
              'Next.js (App Router)',
              '`app/globals.css`',
              t(
                "装 `@tailwindcss/postcss`。`ConfigProvider` 要放在一个 `'use client'` 组件里，由 `app/layout.tsx` 渲染。`<head>` 里加 `<ThemeScript />` 防首屏闪烁，并给 `<html>` 加 `suppressHydrationWarning`（脚本会在水合前改 `data-theme`）。",
                "Install `@tailwindcss/postcss`. `ConfigProvider` must live in a `'use client'` component rendered from `app/layout.tsx`. Add `<ThemeScript />` in `<head>` to avoid the theme flash, and put `suppressHydrationWarning` on `<html>` (the script mutates `data-theme` before hydration).",
              ),
            ],
            [
              'Vite',
              '`src/app.css`',
              t(
                "在 `vite.config.ts` 里加 `@tailwindcss/vite` 插件，然后在 `main.tsx` 里 `import './app.css'`。无闪烁脚本可以用 `getThemeScript()` 的返回值内联进 `index.html`——本仓库就是用一个小 Vite 插件干这件事的。",
                "Add the `@tailwindcss/vite` plugin in `vite.config.ts`, then `import './app.css'` from `main.tsx`. For the no-flash script, inline the string returned by `getThemeScript()` into `index.html` — this repository does exactly that with a small Vite plugin.",
              ),
            ],
            [
              'Remix / React Router 7',
              '`app/root.css`',
              t(
                '通过 `root.tsx` 的 `links()` 挂样式表，`ConfigProvider` 包住 `<Outlet />`。`ThemeScript` 放在 `root.tsx` 导出的文档 `<head>` 里。',
                'Register the stylesheet from the `links()` export in `root.tsx` and wrap `<Outlet />` in `ConfigProvider`. `ThemeScript` goes in the document `<head>` that `root.tsx` renders.',
              ),
            ],
            [
              'Astro',
              '`src/styles/app.css`',
              t(
                '装 `@astrojs/react`。Astro 的每个 island 是独立的 React 树，所以 Provider 不能只包一个 island——把用到组件的部分收进**一个** `client:load` 的根 island，或者每个 island 各自包一层 `ConfigProvider`。',
                'Install `@astrojs/react`. Each Astro island is its own React tree, so the provider cannot wrap just one of them — either put everything that uses components inside **one** `client:load` root island, or give every island its own `ConfigProvider`.',
              ),
            ],
          ]}
        />
        <CodeBlock code={NEXT_SETUP} filename="Next.js" collapseAfter={12} />
      </DocSection>

      <DocSection title={t('检查清单', 'Checklist')}>
        <DocSteps
          items={[
            t('`npm install aios-ui-kit motion` 完成。', '`npm install aios-ui-kit motion` done.'),
            t(
              "全局样式里有 `@import 'tailwindcss'` + `@import 'aios-ui-kit/styles.css'`，顺序不能反。",
              "The global stylesheet has `@import 'tailwindcss'` followed by `@import 'aios-ui-kit/styles.css'`, in that order.",
            ),
            t(
              '`@source` 指向 `node_modules/aios-ui-kit/es`，路径相对于这个样式表。',
              '`@source` points at `node_modules/aios-ui-kit/es`, relative to that stylesheet.',
            ),
            t(
              '应用最外层是 `<ConfigProvider motion={motion}>`。',
              'The outermost layer of the app is `<ConfigProvider motion={motion}>`.',
            ),
            t(
              '`<html>` 上出现了 `data-theme="dark"`（或 `light`）。',
              '`data-theme="dark"` (or `light`) shows up on `<html>`.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}
