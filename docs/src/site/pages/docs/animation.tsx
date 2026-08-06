import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSubSection, DocTable } from './_shared'

const INJECT = `import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'

<ConfigProvider motion={motion}>
  <App />
</ConfigProvider>`

const LITE = `// 体积敏感时用精简版：motion/react-m 只带 <m.*> 组件，
// 需要自己在外层挂一个 <MotionConfig> 之类的 feature bundle。
import * as motion from 'motion/react-m'`

const CONSUME = `import { useMotionComponent } from 'aios-ui-kit/motion-provider'

function Panel() {
  const motion = useMotionComponent() // 没有 provider 时抛错，不静默降级

  return <motion.div animate={{ opacity: 1 }} />
}`

const CSS_TOKENS = `/* 时长与缓动成对使用 */
transition-colors duration-200 ease-aios        /* --duration-micro */
transition-transform duration-[350ms] ease-aios /* --duration-transition */

/* spring 三档：进场用正数时长，退场用更短的那个 */
ease-spring-fast      /* cubic-bezier(0.16, 1, 0.3, 1)  · 80ms 进 / 60ms 出 */
ease-spring-moderate  /* cubic-bezier(0.22, 1, 0.36, 1) · 160ms 进 / 120ms 出 */
ease-spring-slow      /* cubic-bezier(0.33, 1, 0.68, 1) · 240ms 进 / 160ms 出 */`

const REDUCE = `// 每一处过渡都要有 motion-reduce: 兜底
<div className="transition-colors duration-200 ease-aios motion-reduce:transition-none" />

// 位移和缩放要退化成「不动」，而不是「动得慢一点」
<button className="active:scale-[0.97] motion-reduce:active:scale-100" />`

const JS_REDUCE = `import { useReducedMotion } from 'aios-ui-kit/reduced-motion-provider'

function Orb() {
  const reducedMotion = useReducedMotion()
  const motion = useMotionComponent()

  return (
    <motion.div
      animate={reducedMotion ? { opacity: 1 } : { opacity: [0.6, 1, 0.6] }}
      transition={reducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
    />
  )
}`

export default function AnimationPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('先说立场', 'The position, first')}>
        <Prose>
          {t(
            '动效在这套设计语言里是功能性的：它解释两个状态之间的关系，让变化可被追踪。它不负责取悦。所以默认时长很短（200ms），缓动很克制，并且**每一处动效都必须有关掉之后仍然可用的形态**。',
            'Motion here is functional: it explains the relationship between two states so a change can be followed. It is not there to delight. Hence the short default duration (200ms), the restrained easing, and the rule that **every animation must have a switched-off form that still works**.',
          )}
        </Prose>
        <Prose>
          {t(
            '绝大多数交互（hover、focus、open/close 的淡入）用 CSS 过渡就够了，根本不需要 motion。只有需要编排、手势、布局动画或者物理弹簧时才值得动用 JS 动画。',
            'The vast majority of interactions — hover, focus, an open/close fade — are CSS transitions and need no motion at all. Reach for JS animation only when you need orchestration, gestures, layout animation, or a real spring.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('motion 是 peer dependency', 'motion is a peer dependency')}>
        <Prose>
          {t(
            '`motion` 声明为 peerDependency（`>=12`，`optional: false`），需要你自己安装。库的源码里**没有一处 import 它**——motion 是通过 `MotionProvider` 用 context 注入的。',
            '`motion` is declared as a peer dependency (`>=12`, `optional: false`) and you install it yourself. The library source **never imports it**: motion is injected through context by `MotionProvider`.',
          )}
        </Prose>
        <DocList
          items={[
            t(
              '你可以选完整版 `motion/react` 或精简版 `motion/react-m`，由你决定为体积付多少钱。',
              'You pick the full `motion/react` or the lean `motion/react-m`, so you decide what to pay in bundle size.',
            ),
            t(
              '同一页面里不会出现两份 motion 运行时——库用的就是你 app 里那一份。',
              'You never end up with two motion runtimes on a page: the library uses the same instance your app does.',
            ),
            t(
              '完全不需要动画的项目可以只用静态组件；只是任何调用 `useMotionComponent()` 的组件会明确抛错，而不是静默地不动。',
              'A project that wants no animation can stick to the static components; anything calling `useMotionComponent()` will throw with a clear message rather than silently not animating.',
            ),
          ]}
        />
        <CodeBlock code={INJECT} />
        <CodeBlock code={LITE} />
        <Prose>
          {t(
            '`ConfigProvider` 内部就是把 `motion` 转交给 `MotionProvider`。不想要主题和方向那几层的话，可以只用 `MotionProvider`。',
            'Internally `ConfigProvider` just hands `motion` to `MotionProvider`. If you do not want the theme and direction layers, use `MotionProvider` on its own.',
          )}
        </Prose>
        <CodeBlock code={CONSUME} />
      </DocSection>

      <DocSection title={t('时长与缓动令牌', 'Duration and easing tokens')}>
        <DocTable
          head={[t('令牌', 'Token'), t('值', 'Value'), t('用在哪', 'Used for')]}
          rows={[
            [
              '`--duration-micro`',
              '200ms',
              t(
                '颜色、边框、透明度——绝大多数过渡。',
                'Colour, border, and opacity — most transitions.',
              ),
            ],
            [
              '`--duration-transition`',
              '350ms',
              t('位移、尺寸变化、抽屉进出。', 'Movement, size changes, drawers coming and going.'),
            ],
            [
              '`ease-aios`',
              '`cubic-bezier(0.25, 0.1, 0.25, 1)`',
              t(
                '默认缓动。没有特别理由就用它。',
                'The default. Use it unless you have a reason not to.',
              ),
            ],
            [
              '`ease-back`',
              '`cubic-bezier(0.34, 1.56, 0.64, 1)`',
              t(
                '轻微过冲。只给「弹出来」的元素，别给颜色。',
                'A slight overshoot. For things that pop in; never for colour.',
              ),
            ],
            [
              '`ease-spring-fast`',
              '`cubic-bezier(0.16, 1, 0.3, 1)`',
              t(
                '80ms 进 / 60ms 出。tooltip、hover 卡片这类轻量浮层。',
                '80ms in / 60ms out. Tooltips and other lightweight popups.',
              ),
            ],
            [
              '`ease-spring-moderate`',
              '`cubic-bezier(0.22, 1, 0.36, 1)`',
              t(
                '160ms 进 / 120ms 出。菜单、popover、下拉。',
                '160ms in / 120ms out. Menus, popovers, dropdowns.',
              ),
            ],
            [
              '`ease-spring-slow`',
              '`cubic-bezier(0.33, 1, 0.68, 1)`',
              t(
                '240ms 进 / 160ms 出。sheet、模态、抽屉。',
                '240ms in / 160ms out. Sheets, modals, drawers.',
              ),
            ],
          ]}
        />
        <CodeBlock code={CSS_TOKENS} />
        <Prose>
          {t(
            '每档 spring 都有一个更短的退出时长（`--duration-spring-*-exit`）。这不是笔误：进场需要被注意到，退场只需要让位——退场比进场慢会让界面显得迟钝。',
            'Each spring step has a shorter exit duration (`--duration-spring-*-exit`). Not a typo: an entrance wants to be noticed, an exit only needs to get out of the way, and an exit slower than its entrance makes an interface feel sluggish.',
          )}
        </Prose>
        <Prose>
          {t(
            '另外还有三条具名 keyframe 动画给 Agent 组件用：`animate-agent-breathe`（2000ms 呼吸）、`animate-agent-pulse`（800ms 脉冲）、`animate-agent-step`（1200ms 单次推进）。',
            'Three named keyframe animations exist for the Agent components: `animate-agent-breathe` (a 2000ms breath), `animate-agent-pulse` (an 800ms pulse), and `animate-agent-step` (a single 1200ms advance).',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('reduced motion：三道防线', 'Reduced motion: three layers')}>
        <DocSubSection title={t('一、全局 CSS 兜底', '1. The global CSS fallback')}>
          <Prose>
            {t(
              '`styles.css` 里有一条 `@media (prefers-reduced-motion: reduce)`，把所有元素的 `animation-duration` 和 `transition-duration` 压到 `0.01ms`、迭代次数压到 1、`scroll-behavior` 改成 `auto`。这是网。它会兜住任何人忘记处理的地方，但不该被当成方案。',
              '`styles.css` carries a `@media (prefers-reduced-motion: reduce)` block that clamps every element’s `animation-duration` and `transition-duration` to `0.01ms`, iteration count to 1, and `scroll-behavior` to `auto`. It is a net. It catches whatever anyone forgot, but it is not the plan.',
            )}
          </Prose>
        </DocSubSection>
        <DocSubSection title={t('二、motion-reduce: 工具类', '2. The motion-reduce: utility')}>
          <Prose>
            {t(
              '这是**约定的做法**。为什么不能只靠全局兜底：把时长压到 0.01ms 只是让动画瞬间完成，而有些动画的中间态并不是你想要的终点——比如 `active:scale-[0.97]` 需要的是「不缩放」，而不是「瞬间缩放」。写清楚退化形态比让 CSS 猜更靠得住。',
              'This is **the convention**. Why the global fallback is not enough: clamping the duration only makes an animation finish instantly, and for some animations the instant result is not the state you want — `active:scale-[0.97]` needs to become “no scaling”, not “instant scaling”. Spelling out the degraded form beats letting CSS guess.',
            )}
          </Prose>
          <CodeBlock code={REDUCE} />
          <DocNote label={t('注意', 'Note')}>
            {t(
              '`motion-reduce:` 是 Tailwind 内建的变体，它匹配的是 `prefers-reduced-motion: reduce` 媒体查询，**不是** `ReducedMotionProvider` 的 `force` prop。也就是说应用内提供的「关闭动效」开关不会影响这些工具类，只影响读 context 的 JS 动画。',
              '`motion-reduce:` is Tailwind’s built-in variant and matches the `prefers-reduced-motion: reduce` media query — **not** `ReducedMotionProvider`’s `force` prop. An in-app “turn off animation” switch therefore has no effect on these utilities, only on JS animation that reads the context.',
            )}
          </DocNote>
        </DocSubSection>
        <DocSubSection
          title={t(
            '三、ReducedMotionProvider（给 JS 动画）',
            '3. ReducedMotionProvider, for JS animation',
          )}
        >
          <Prose>
            {t(
              'JS 驱动的动画读不到媒体查询：motion 的 spring、canvas 上的点阵动效、`requestAnimationFrame` 循环——CSS 那两道防线对它们完全无效。`useReducedMotion()` 把偏好以布尔值给出来，让这些代码自己分支。',
              'JS-driven animation cannot read a media query: motion springs, a dot-matrix effect on a canvas, a `requestAnimationFrame` loop — neither CSS layer touches any of them. `useReducedMotion()` exposes the preference as a boolean so that code can branch on it.',
            )}
          </Prose>
          <CodeBlock code={JS_REDUCE} collapseAfter={20} />
          <DocList
            items={[
              t(
                'Provider 订阅 `matchMedia` 的 `change` 事件，所以用户在系统设置里改了偏好会即时生效，不需要刷新。',
                'The provider subscribes to the `matchMedia` `change` event, so changing the system preference takes effect immediately without a reload.',
              ),
              t(
                '它同时把 `data-reduced-motion` 写到 `<html>` 上。想让 CSS 也响应应用内的开关（而不只是系统偏好），可以选 `[data-reduced-motion] &`。',
                'It also writes `data-reduced-motion` onto `<html>`. If you want CSS to respond to an in-app switch rather than only the system preference, select on `[data-reduced-motion] &`.',
              ),
              t(
                '`force` prop 可以覆盖系统值：`true` 强制关闭动效，`false` 强制开启。`false` 请慎用——那是在替用户否决一项可访问性设置。',
                'The `force` prop overrides the system value: `true` forces motion off, `false` forces it on. Be careful with `false` — it overrules an accessibility setting on the user’s behalf.',
              ),
              t(
                '没有 provider 时 `useReducedMotion()` 返回 `false`，所以在组件里可以无条件调用。',
                'With no provider mounted, `useReducedMotion()` returns `false`, so it is safe to call unconditionally.',
              ),
            ]}
          />
        </DocSubSection>
      </DocSection>
    </div>
  )
}
