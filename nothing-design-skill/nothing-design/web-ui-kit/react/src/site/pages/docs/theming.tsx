import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSubSection, DocTable } from './_shared'

const LAYERS = `nothing-ui/styles.css
├── tokens.css   // 第一层：原始变量，随 [data-theme] 切换
└── theme.css    // 第二层：映射进 Tailwind namespace`

const TOKENS_SHAPE = `/* tokens.css —— 主题相关的部分挂在选择器上 */
:root,
[data-theme='dark'] {
  --black: #000000;
  --surface: #111111;
  --surface-raised: #1A1A1A;
  --border: #222222;
  --text-primary: #E8E8E8;
  --text-display: #FFFFFF;
  --interactive: #5B9BF6;
}

[data-theme='light'] {
  --black: #FFFFFF;        /* 是的，亮色下 --black 是白的：它表示「页面底色」 */
  --surface: #FFFFFF;
  --surface-raised: #F0F0F0;
  --border: #E8E8E8;
  --text-primary: #1A1A1A;
  --text-display: #000000;
  --interactive: #007AFF;
}`

const THEME_SHAPE = `/* theme.css —— 颜色一律走 @theme inline */
@theme inline {
  --color-background: var(--black);
  --color-surface: var(--surface);
  --color-foreground-muted: var(--text-secondary);
  --color-accent: var(--accent);
}`

const INLINE_WHY = `/* 不加 inline：变量在 :root 上求值一次 */
:root { --color-surface: var(--surface); }        /* → #111111，锁死了 */
.bg-surface { background-color: var(--color-surface); }

/* 加了 inline：值在构建期被代入，var(--surface) 在元素自己的上下文里解析 */
.bg-surface { background-color: var(--surface); } /* → 跟最近的 [data-theme] 祖先走 */`

const NESTED = `<div data-theme="dark">
  <Card>{/* 暗的 */}</Card>

  <div data-theme="light">
    <Card>{/* 亮的，同一个 bg-surface 工具类 */}</Card>
  </div>
</div>`

const OVERRIDE_TOKEN = `@import 'tailwindcss';
@import 'nothing-ui/styles.css';

@source '../node_modules/nothing-ui/es';

/* 换掉强调色。因为 theme.css 是 inline 的，bg-accent / text-accent
   / accent-subtle 以及所有引用 --accent 的遗留 CSS 会一起跟着变。 */
:root,
[data-theme='dark'] {
  --accent: #ff4f00;
  --accent-subtle: rgba(255, 79, 0, 0.15);
}

[data-theme='light'] {
  --accent: #ff4f00;
  --accent-subtle: rgba(255, 79, 0, 0.12);
}`

const ADD_SCALE = `/* 新增一档命名刻度，得到 rounded-panel 这个工具类 */
@theme {
  --radius-panel: 24px;
}

/* 新增一个语义色。要跟着主题切换，就先在 tokens.css 那两个选择器里
   定义原始变量，再用 @theme inline 指向它。 */
@theme inline {
  --color-brand: var(--brand);
}`

export default function ThemingPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('两层令牌', 'Two layers of tokens')}>
        <Prose>
          {t(
            '设计令牌被刻意拆成两层，各自解决一个问题。',
            'The design tokens are deliberately split in two, each layer solving one problem.',
          )}
        </Prose>
        <CodeBlock code={LAYERS} />
        <DocTable
          head={[t('文件', 'File'), t('负责什么', 'Responsibility')]}
          rows={[
            [
              '`tokens.css`',
              t(
                '唯一真源。持有随 `[data-theme]` 切换的原始变量（`--surface`、`--text-primary`、`--accent`…），以及仍有 109 个组件 CSS 依赖的历史命名（`--space-md`、`--duration-micro`、`--radius-pill`…）。这些老名字不能删，删了那批还没迁到 Tailwind 的组件会直接失去样式。',
                'The single source of truth. Holds the raw variables that switch on `[data-theme]` (`--surface`, `--text-primary`, `--accent`, …) plus the legacy names that 109 component stylesheets still depend on (`--space-md`, `--duration-micro`, `--radius-pill`, …). Those legacy names cannot be deleted: the components not yet migrated to Tailwind would lose their styling outright.',
              ),
            ],
            [
              '`theme.css`',
              t(
                '只做映射。把原始变量放进 Tailwind 的 theme namespace（`--color-*`、`--text-*`、`--radius-*`、`--spacing-*`、`--ease-*`），从而生成 `bg-surface`、`text-heading`、`rounded-card` 这些工具类。它不定义任何新颜色。',
                'Mapping only. Puts the raw variables into Tailwind’s theme namespaces (`--color-*`, `--text-*`, `--radius-*`, `--spacing-*`, `--ease-*`), which is what produces `bg-surface`, `text-heading`, and `rounded-card`. It defines no new colours of its own.',
              ),
            ],
          ]}
        />
        <Prose>
          {t(
            '这么分层的实际好处：Tailwind 工具类和遗留 BEM 类可以指向同一批变量，所以一个页面里混用「已迁移」和「未迁移」的组件不会出现两套配色。',
            'The practical payoff: Tailwind utilities and the legacy BEM classes point at the same variables, so a page that mixes migrated and un-migrated components does not end up with two colour schemes.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('原始变量长什么样', 'What the raw layer looks like')}>
        <CodeBlock code={TOKENS_SHAPE} filename="tokens.css" collapseAfter={24} />
        <DocNote label={t('命名上的一个历史包袱', 'One historical wart')}>
          {t(
            '`--black` 表示的是「页面底色」，不是黑色，所以在亮色主题下它的值是 `#FFFFFF`。Tailwind 侧的名字 `bg-background` 才是语义正确的那个——写样式时用它。',
            '`--black` means “page background”, not the colour black, which is why it evaluates to `#FFFFFF` in the light theme. The Tailwind-side name, `bg-background`, is the semantically correct one — use that when styling.',
          )}
        </DocNote>
      </DocSection>

      <DocSection title={t('为什么是 @theme inline', 'Why @theme inline matters')}>
        <CodeBlock code={THEME_SHAPE} filename="theme.css" />
        <Prose>
          {t(
            '`inline` 不是可选的写法差异，它决定了主题能挂在哪。普通 `@theme` 会在 `:root` 上声明 `--color-surface: var(--surface)`，工具类再引用 `var(--color-surface)`；由于那次求值发生在 `:root` 的上下文里，`--surface` 的值就在那一刻被定住了。',
            '`inline` is not a stylistic choice; it decides where a theme is allowed to live. A plain `@theme` declares `--color-surface: var(--surface)` on `:root` and the utility references `var(--color-surface)`. Because that resolution happens in `:root`’s context, the value of `--surface` is fixed right there.',
          )}
        </Prose>
        <CodeBlock code={INLINE_WHY} />
        <Prose>
          {t(
            '加了 `inline`，Tailwind 会在生成工具类时把值代进去，于是 `.bg-surface` 直接引用 `var(--surface)`，在**元素自己**的上下文里解析——也就是跟着最近的 `[data-theme]` 祖先走。结果就是 `data-theme` 可以放在任意嵌套节点上，而不是只能放 `:root`：',
            'With `inline`, Tailwind substitutes the value while generating the utility, so `.bg-surface` references `var(--surface)` directly and resolves it in the **element’s own** context — that is, against the nearest `[data-theme]` ancestor. Which means `data-theme` can sit on any nested node instead of only on `:root`:',
          )}
        </Prose>
        <CodeBlock code={NESTED} />
        <Prose>
          {t(
            "这一点是文档站的暗色代码示例、设置面板里的主题预览、以及邮件模板预览之类场景能工作的前提。配套地，`dark:` / `light:` 变体也写成 `&:where([data-theme='dark'], [data-theme='dark'] *)`，同样支持挂在嵌套节点上。",
            "This is what makes dark-on-light examples in these docs, theme previews inside a settings panel, and email-template previews possible at all. To match, the `dark:` / `light:` variants are defined as `&:where([data-theme='dark'], [data-theme='dark'] *)`, so they work on nested nodes too.",
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('默认调色板是关掉的', 'The default palette is switched off')}>
        <CodeBlock
          code={`@theme {
  --color-*: initial;
  --font-*: initial;
  --radius-*: initial;
}`}
          filename="theme.css"
        />
        <Prose>
          {t(
            '这三行把 Tailwind 自带的颜色、字体族和圆角刻度全部清空，然后由本库重新填。后果是：`bg-blue-500`、`rounded-3xl`、`font-serif` 都不会生成任何 CSS——不报错，就是没效果。看到某个类「没生效」时，先确认它在 `theme.css` 里存在。',
            'Those three lines empty Tailwind’s built-in colours, font families, and radius scale, and the library refills them. The consequence: `bg-blue-500`, `rounded-3xl`, and `font-serif` generate no CSS at all — no error, just no effect. When a class “does nothing”, first check that it exists in `theme.css`.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('怎么覆盖', 'Overriding tokens')}>
        <DocSubSection title={t('改一个已有令牌', 'Change an existing token')}>
          <Prose>
            {t(
              '改**原始变量**，不要改 `--color-*`。原始变量是两个主题各写一次，因为它们的值本来就不同。',
              'Override the **raw variable**, not the `--color-*` one. Raw variables are written once per theme, because that is where the two themes actually differ.',
            )}
          </Prose>
          <CodeBlock code={OVERRIDE_TOKEN} filename="src/app.css" collapseAfter={20} />
          <DocList
            items={[
              t(
                '覆盖要写在 `@import` 之后，否则会被库里的定义盖掉。',
                'Put your overrides after the `@import`s, or the library’s own declarations win.',
              ),
              t(
                '因为映射是 `inline` 的，改原始变量会同时影响 Tailwind 工具类和所有引用它的遗留 CSS。反过来，如果你去改 `--color-accent`，只有工具类会变，遗留 CSS 不会——那就分叉了。',
                'Because the mapping is `inline`, changing a raw variable moves the Tailwind utilities and every legacy stylesheet that references it at the same time. Change `--color-accent` instead and only the utilities move, leaving the legacy CSS behind — now you have a fork.',
              ),
              t(
                '`--accent-subtle` 是独立的 rgba 值，不是从 `--accent` 算出来的，所以换红的时候记得一起换。',
                '`--accent-subtle` is its own rgba value, not derived from `--accent`, so change it in the same pass.',
              ),
            ]}
          />
        </DocSubSection>

        <DocSubSection title={t('加一档新刻度', 'Add a new scale')}>
          <CodeBlock code={ADD_SCALE} />
          <Prose>
            {t(
              '还有一件事要记得：`cn()` 用的 `tailwind-merge` 需要知道你新增的具名刻度，否则它会把 `rounded-panel` 当未知类名——原样保留，但不会和 `rounded-card` 互相替换。库内部通过 `extendTailwindMerge` 登记了 `theme.css` 里的刻度，你在应用层自定义的需要自己登记一次。',
              'One more thing: the `tailwind-merge` instance behind `cn()` has to know about your new named scale, otherwise it treats `rounded-panel` as an unknown class — kept verbatim, but never swapped against `rounded-card`. The library registers the scales from `theme.css` through `extendTailwindMerge`; anything you add at the app level you register yourself.',
            )}
          </Prose>
        </DocSubSection>

        <DocSubSection title={t('只改一小块区域', 'Retheme one region only')}>
          <Prose>
            {t(
              '因为工具类最终引用的是原始变量，在任意容器上重新定义它们就能只影响那一块，不需要新的类名，也不需要 `!important`。',
              'Because the utilities end up referencing the raw variables, redefining them on any container retints just that subtree — no new class names, no `!important`.',
            )}
          </Prose>
          <CodeBlock
            code={`<section style={{ ['--surface' as string]: '#0d0d0d' }}>
  {/* 这里面所有 bg-surface 都变了 */}
</section>`}
          />
        </DocSubSection>
      </DocSection>

      <DocSection title={t('不要做的事', 'What not to do')}>
        <DocList
          items={[
            t(
              '不要在组件 CSS 里重新定义全局令牌（`--surface`、`--text-*`、`--border*`）。组件私有变量必须带前缀：`--button-height`、`--agent-orb-pulse-duration`。',
              'Do not redefine global tokens (`--surface`, `--text-*`, `--border*`) inside a component stylesheet. Component-private variables must be prefixed: `--button-height`, `--agent-orb-pulse-duration`.',
            ),
            t(
              '不要为了加一个颜色而绕过令牌层直接写 `bg-[#3b82f6]`。任意值语法能用，但它绕过了整个主题机制——亮色主题下不会跟着变。',
              'Do not smuggle a colour in with `bg-[#3b82f6]`. Arbitrary values do work, but they step around the whole theming mechanism and will not follow the light theme.',
            ),
            t(
              '不要用 `prefers-color-scheme` 媒体查询直接改样式。要跟随系统就走 `ThemeProvider` 的 `enableSystem`，它会把结果解析成 `data-theme`。',
              'Do not style off a `prefers-color-scheme` media query. To follow the system, use `ThemeProvider`’s `enableSystem`, which resolves the preference into `data-theme`.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}
