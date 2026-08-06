import { Prose } from '../../components/Prose'
import { CodeBlock } from '../../components/CodeBlock'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocTable } from './_shared'

const ELEVATION = `/* 层级 = 底色 + 边框，没有第三种手段 */
bg-background      /* #000000 页面底 */
bg-surface         /* #111111 卡片、代码块 */
bg-surface-raised  /* #1A1A1A 卡片里的卡片、soft 变体 */
border-border      /* #222222 默认分隔 */
border-border-visible /* #333333 需要被看见的边 */`

const BAD = `/* ✗ 不要 */
<div className="shadow-lg backdrop-blur-md bg-gradient-to-r from-black to-neutral-900" />

/* ✓ 要 */
<div className="rounded-card border border-border bg-surface" />`

export default function DesignPrinciplesPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('一句话概括', 'The short version')}>
        <Prose>
          {t(
            'Nothing 的视觉语言是**单色工业美学**：黑、白、四档灰，加一个红。界面看起来应该像一台仪器的面板，而不是一张海报。这一页列出的约束不是风格偏好，而是这套组件库的编译期规则——默认调色板已经被关掉，很多「不要这么做」在技术上已经做不到了。',
            'Nothing’s visual language is **monochrome industrial**: black, white, four greys, and one red. The interface should read like an instrument panel, not a poster. The constraints on this page are not style preferences but rules of the library — the default palette is switched off, so a good number of the “don’ts” below are already impossible to write.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('单色 + 一个红', 'Monochrome, plus one red')}>
        <Prose>
          {t(
            '`#D71921` 是 Nothing 红，通过 `--accent` 引用，全库只有它一个彩色。它的意思很窄：**这里发生了需要你注意的事**。焦点、告警、当前项、破坏性操作——除此之外都不该出现红色。',
            '`#D71921` is the Nothing red, referenced through `--accent`, and it is the only chromatic colour in the library. Its meaning is narrow: **something here needs your attention**. Focus, alerts, the current item, destructive actions — nothing else should be red.',
          )}
        </Prose>
        <Prose>
          {t(
            '为什么这么紧？因为强调色的价值来自稀缺。一旦有五种颜色可用，颜色就不再传递优先级，只剩装饰。同理，Tailwind 的 22 组默认色板在 `theme.css` 里被 `--color-*: initial` 整体关掉了：写 `bg-blue-500` 不会有任何效果，这是刻意的，不是配置遗漏。',
            'Why so tight? Because an accent colour earns its meaning from scarcity. Once five colours are available, colour stops signalling priority and becomes decoration. For the same reason, `theme.css` turns off all 22 default Tailwind palettes with `--color-*: initial`: `bg-blue-500` does nothing, on purpose, not because someone forgot to configure it.',
          )}
        </Prose>
        <DocNote label={t('唯一的例外', 'The one exception')}>
          {t(
            '`text-white` / `text-black` 是绝对色，不随主题切换。只用在「红底必须白字」这类对比度必须锁死的场合，别拿它们当普通前景色——那会在亮色主题下变成不可读的白字。',
            '`text-white` / `text-black` are absolute and do not switch with the theme. Use them only where contrast must be pinned, such as white text on the red fill. They are not general-purpose foreground colours; used that way they become unreadable white-on-white in the light theme.',
          )}
        </DocNote>
      </DocSection>

      <DocSection
        title={t('层级只用 background 和 border 表达', 'Elevation is background and border only')}
      >
        <Prose>
          {t(
            '没有阴影，没有 blur，没有渐变。这三样都是在模拟光源和景深——模拟一个物理上并不存在的三维空间。Nothing 的界面不假装自己是纸片浮在光下，它就是一块屏幕，所以层级用**这一层比下一层亮一点**和**一条边**说清楚就够了。',
            'No shadows, no blur, no gradients. All three simulate a light source and depth of field — a three-dimensional space that is not actually there. A Nothing interface does not pretend to be paper floating under a lamp; it is a screen, so hierarchy is expressed by **this layer being slightly lighter than the one under it** plus **a line**.',
          )}
        </Prose>
        <CodeBlock code={ELEVATION} />
        <Prose>
          {t(
            '暗色主题下这四档底色是 `#000` → `#111` → `#1A1A1A`，边框是 `#222` / `#333`。差值刻意压得很小：能看出分层，但不会把界面切成一堆盒子。亮色主题是同一套语义的镜像（`#FFF` / `#FFF` / `#F0F0F0`，边框 `#E8E8E8` / `#CCC`），所以按语义名写样式就能同时正确。',
            'In the dark theme those four backgrounds are `#000` → `#111` → `#1A1A1A`, with borders at `#222` / `#333`. The steps are deliberately small: enough to read the layering, not enough to chop the interface into boxes. The light theme mirrors the same semantics (`#FFF` / `#FFF` / `#F0F0F0`, borders `#E8E8E8` / `#CCC`), so styling by semantic name is correct in both.',
          )}
        </Prose>
        <CodeBlock code={BAD} />
      </DocSection>

      <DocSection title={t('圆角的几何诚实', 'Geometric honesty in the radius scale')}>
        <Prose>
          {t(
            '圆角刻度很短，而且是语义化的：你写 `rounded-card` 而不是 `rounded-[16px]`，因为「卡片有多圆」是一个系统决策，不是每个页面各自的决定。',
            'The radius scale is short and semantic: you write `rounded-card`, not `rounded-[16px]`, because “how round is a card” is a system-level decision rather than a per-page one.',
          )}
        </Prose>
        <DocTable
          head={[t('令牌', 'Token'), t('值', 'Value'), t('用途', 'Used for')]}
          rows={[
            [
              '`rounded-2xs` … `rounded-md`',
              '2 / 3 / 4 / 6px',
              t(
                '控件本体、标签、代码内联块。工业风的那一档。',
                'Control bodies, tags, inline code. The industrial end of the scale.',
              ),
            ],
            [
              '`rounded-card-compact` / `rounded-input`',
              '8px',
              t('代码块、输入框、小卡片。', 'Code blocks, inputs, compact cards.'),
            ],
            [
              '`rounded-card`',
              '16px',
              t('内容卡片、widget 容器。', 'Content cards and widget containers.'),
            ],
            [
              '`rounded-button` / `rounded-pill` / `rounded-tag`',
              '999px',
              t(
                '胶囊。按钮、Tag、分段控件——这是 Nothing 的签名形状，不要改成方角「以求统一」。',
                'The pill. Buttons, tags, segmented controls — this is a Nothing signature shape; do not square it off “for consistency”.',
              ),
            ],
          ]}
        />
        <Prose>
          {t(
            '刻度之间没有中间值可选，这正是重点。任何一个 `rounded-[11px]` 都意味着有人在猜，而猜出来的值下一个人不会知道该不该沿用。',
            'There is nothing in between, and that is the point. A `rounded-[11px]` anywhere means somebody guessed, and the next person has no way to know whether to keep guessing the same way.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('等宽大写的标签', 'Mono, uppercase labels')}>
        <Prose>
          {t(
            '控件文案、分组标题、表头、角标一律是 `font-mono` + `uppercase` + `tracking-widest`，字号落在 `text-label`（11px）或 `text-caption`（12px）。正文用 `font-body`（Space Grotesk），大号数字用 `font-display`（Doto）。',
            'Control labels, group headings, table headers, and badges are all `font-mono` + `uppercase` + `tracking-widest`, at `text-label` (11px) or `text-caption` (12px). Body copy uses `font-body` (Space Grotesk); large numerals use `font-display` (Doto).',
          )}
        </Prose>
        <Prose>
          {t(
            '这不是纯粹的装饰。等宽大写把「界面的机械部件」和「人写的内容」在视觉上分开——你不需要读完就知道哪个是按钮、哪个是文章。字号也自带 line-height 和 letter-spacing，所以别再手写 `leading-*` / `tracking-*` 去调，那只会让同一档标签在不同页面上略微不同。',
            'This is not decoration for its own sake. Mono uppercase visually separates “the machinery of the interface” from “content a human wrote” — you know which is a button and which is prose before reading either. The type scale also carries its own line-height and letter-spacing, so do not re-tune it with `leading-*` / `tracking-*`; that only makes the same label class look slightly different from page to page.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('方向中立', 'Direction-neutral by construction')}>
        <Prose>
          {t(
            '间距和定位一律用逻辑属性：`ms-*` / `me-*` / `ps-*` / `pe-*` / `start-*` / `end-*` / `text-start` / `text-end`。原因很简单——`ml-4` 在阿拉伯语界面里是错的，而逻辑属性不需要任何人记得去镜像它。',
            'Spacing and positioning use logical properties throughout: `ms-*` / `me-*` / `ps-*` / `pe-*` / `start-*` / `end-*` / `text-start` / `text-end`. The reason is plain — `ml-4` is wrong in an Arabic interface, and a logical property does not require anyone to remember to mirror it.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('动效是功能性的', 'Motion is functional')}>
        <Prose>
          {t(
            '过渡的作用是解释状态之间的关系，不是表演。默认缓动是 `ease-nothing`，时长落在 200ms（`--duration-micro`）到 350ms（`--duration-transition`）之间。所有动效必须带 `motion-reduce:` 兜底。',
            'A transition exists to explain the relationship between two states, not to perform. The default easing is `ease-nothing` and durations sit between 200ms (`--duration-micro`) and 350ms (`--duration-transition`). Every animation needs a `motion-reduce:` fallback.',
          )}
        </Prose>
      </DocSection>

      <DocSection
        title={t('贡献者：可以加什么，不可以加什么', 'Contributors: what you may and may not add')}
      >
        <Prose className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {t('可以', 'Allowed')}
        </Prose>
        <DocList
          items={[
            t(
              '用现有语义工具类组合出新组件；这是常态路径。',
              'Compose new components out of the existing semantic utilities. This is the normal path.',
            ),
            t(
              '在 `*-variants.ts` 里新增 variant，只要名字与外观落在 §3 的词表里。',
              'Add a variant in a `*-variants.ts`, as long as the name and the look come from the shared vocabulary.',
            ),
            t(
              '加组件私有的 CSS 变量，必须以组件名前缀命名（`--button-*`、`--agent-orb-*`）。',
              'Add component-private CSS variables, prefixed with the component name (`--button-*`, `--agent-orb-*`).',
            ),
            t(
              '在应用层用 `@theme` 扩出新的命名刻度（见[主题定制](/docs/theming)）。',
              'Extend the named scales with `@theme` at the app level (see [Theming](/docs/theming)).',
            ),
          ]}
        />
        <Prose className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {t('不可以', 'Not allowed')}
        </Prose>
        <DocList
          items={[
            t(
              '`shadow-*`、`backdrop-blur-*`、`bg-gradient-*`——一个都不行。',
              '`shadow-*`, `backdrop-blur-*`, `bg-gradient-*` — not one of them.',
            ),
            t(
              '硬编码色值。改颜色只能改 `tokens.css`，并且要在 PR 里说明理由。',
              'Hard-coded colour values. Colour changes happen in `tokens.css`, with a justification in the PR.',
            ),
            t(
              '`prefers-color-scheme` 媒体查询。主题只认 `[data-theme]`，媒体查询会绕过用户的显式选择。',
              '`prefers-color-scheme` media queries. Theming keys off `[data-theme]`; a media query would override the user’s explicit choice.',
            ),
            t(
              '物理方向属性（`ml-*`、`left-*`、`text-left`）。',
              'Physical direction properties (`ml-*`, `left-*`, `text-left`).',
            ),
            t(
              '单语 UI 文案。所有面向用户的字符串都走 `t(zh, en)`。',
              'Monolingual UI strings. Everything user-facing goes through `t(zh, en)`.',
            ),
            t(
              '把 `.css` 文件加回组件目录。v2 的样式载体是 CVA 里的 Tailwind 类。',
              'Reintroducing a `.css` file into a component directory. In v2 the styles live as Tailwind classes inside CVA.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}
