import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { PropsTable } from '../../components/PropsTable'
import { useT } from '../../i18n'
import type { ApiSection } from '../../registry/types'
import { DocList, DocNote, DocSection } from './_shared'

const IMPORT = `import {
  DirectionProvider,
  useDirection,
  type Direction,
  type DirectionContextValue,
} from 'nothing-ui/direction-provider'`

const USAGE = `<DirectionProvider dir="rtl">
  <App />
</DirectionProvider>`

const SIGN = `function Sheet() {
  const { sign } = useDirection()
  const motion = useMotionComponent()

  // transform 没有逻辑属性版本，位移必须自己按方向取反
  return <motion.div initial={{ x: 320 * sign }} animate={{ x: 0 }} />
}`

const providerSection: ApiSection = {
  name: 'DirectionProvider',
  description: {
    zh: '声明布局方向。同时照顾 CSS（写 `<html dir>`）和行为（context + Base UI 的 DirectionProvider）两侧。',
    en: 'Declares the layout direction, covering both the CSS side (writing `<html dir>`) and the behaviour side (its context plus Base UI’s DirectionProvider).',
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: { zh: '组件树。', en: 'The tree to provide to.' },
    },
    {
      name: 'dir',
      type: `'ltr' | 'rtl'`,
      default: `'ltr'`,
      description: {
        zh: '文字方向。',
        en: 'The writing direction.',
      },
    },
    {
      name: 'syncDocument',
      type: 'boolean',
      default: 'true',
      description: {
        zh: '是否在 effect 里把 `dir` 写到 `document.documentElement`，并在卸载时还原原值。服务端已经渲染出 `<html dir>` 的项目应该传 `false`。',
        en: 'Whether an effect writes `dir` onto `document.documentElement` and restores the previous value on unmount. Pass `false` if the server already renders `<html dir>`.',
      },
    },
  ],
}

const hookSection: ApiSection = {
  name: 'useDirection()',
  description: {
    zh: "读取当前方向。没有 provider 时返回 `{ dir: 'ltr', sign: 1 }`，所以可以无条件调用。",
    en: "Reads the current direction. With no provider it returns `{ dir: 'ltr', sign: 1 }`, so it is safe to call unconditionally.",
  },
  props: [
    {
      name: 'dir',
      type: `'ltr' | 'rtl'`,
      description: { zh: '当前方向。', en: 'The current direction.' },
    },
    {
      name: 'sign',
      type: '1 | -1',
      description: {
        zh: 'RTL 时为 `-1`，LTR 时为 `1`。乘到 transform 位移或手势 delta 上，把物理方向的值转成方向感知的值。',
        en: '`-1` in RTL, `1` in LTR. Multiply a transform offset or a gesture delta by it to turn a physical value into a direction-aware one.',
      },
    },
  ],
}

export default function DirectionProviderPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('导入', 'Import')}>
        <CodeBlock code={IMPORT} />
        <CodeBlock code={USAGE} />
        <Prose>
          {t(
            '`ConfigProvider` 已经内置了它，传 `dir` 即可。想完整了解 RTL 的做法，看[RTL 指南](/docs/rtl)。',
            '`ConfigProvider` already includes it — just pass `dir`. For the full picture, see the [RTL guide](/docs/rtl).',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('为什么需要它', 'Why it exists')}>
        <Prose>
          {t(
            '因为「方向」在浏览器里分裂成两个互不相通的机制，而它们必须同时正确。',
            'Because “direction” is two disconnected mechanisms in a browser, and both have to be right.',
          )}
        </Prose>
        <DocList
          items={[
            t(
              '**CSS 只认 DOM 上的 `dir` 属性**。`ms-4`、`pe-6`、`start-0`、`text-start` 全都由浏览器按元素继承到的 `dir` 决定映射到哪一侧。React context 对 CSS 不可见——只挂 context 不写属性，布局根本不会镜像。',
              '**CSS only sees the DOM `dir` attribute.** `ms-4`, `pe-6`, `start-0`, and `text-start` are all mapped by the browser according to the `dir` an element inherits. A React context is invisible to CSS: context without the attribute means the layout does not mirror at all.',
            ),
            t(
              '**行为只认 context**。方向键该往哪走、浮层往哪一侧翻、滑块拖动的正方向——这些是 JS 在算，而 JS 拿不到 CSS 的解析结果，必须被显式告知。',
              '**Behaviour only sees the context.** Which way an arrow key moves, which side a popup flips to, which direction increases a slider — that is JS arithmetic, and JS cannot read CSS’s resolution, so it has to be told.',
            ),
          ]}
        />
        <Prose>
          {t(
            '这个组件三件事一起做：写 `<html dir>`、提供自己的 context（多给一个 `sign`）、把方向转交给 `@base-ui/react` 的 `DirectionProvider`——组件内部的键盘与落位逻辑就是从那里读的。',
            'The component does all three at once: it writes `<html dir>`, provides its own context (with the extra `sign`), and hands the direction to `@base-ui/react`’s `DirectionProvider`, which is where the components read their keyboard and placement logic from.',
          )}
        </Prose>
      </DocSection>

      <DocSection title="API">
        <PropsTable section={providerSection} />
        <PropsTable section={hookSection} />
      </DocSection>

      <DocSection title={t('sign 用在哪', 'What sign is for')}>
        <Prose>
          {t(
            '逻辑属性覆盖不到 `transform`：`translate-x-4` 永远推向视觉右侧。抽屉、轮播、拖拽手势这类基于位移的动画必须自己取反。',
            'Logical properties do not cover `transform`: `translate-x-4` always pushes to the visual right. Offset-based animation — drawers, carousels, drag gestures — has to negate itself.',
          )}
        </Prose>
        <CodeBlock code={SIGN} />
      </DocSection>

      <DocSection title={t('注意事项', 'Notes')}>
        <DocNote label={t('嵌套使用', 'Nesting')}>
          {t(
            '这个 provider 可以嵌套，用来在 LTR 页面里放一小块 RTL 内容。但内层务必传 `syncDocument={false}`——否则内层的 effect 会把 `<html dir>` 也改掉，整页跟着翻。',
            'The provider nests, which is how you put a chunk of RTL content inside an LTR page. The inner one must pass `syncDocument={false}`, though: otherwise its effect rewrites `<html dir>` and flips the entire page.',
          )}
        </DocNote>
        <DocList
          items={[
            t(
              '`syncDocument` 走 effect，所以它在挂载**之后**才生效。首帧就要正确的场景（SSR、静态导出）必须把 `dir` 直接写在服务端产出的 `<html>` 上。',
              '`syncDocument` runs in an effect, so it takes effect **after** mount. If the first frame has to be correct — SSR, static export — put `dir` on the server-rendered `<html>` yourself.',
            ),
            t(
              '卸载时会还原之前的 `dir`（原本没有则移除属性），所以在路由之间切换语言不会留下脏状态。',
              'On unmount it restores the previous `dir`, or removes the attribute if there was none, so switching locales across routes leaves no stale state.',
            ),
            t(
              '方向性图标（箭头、返回）需要视觉翻转，用 `rtl:-scale-x-100`；纯符号图标不要翻。',
              'Directional glyphs (arrows, back) need a visual flip via `rtl:-scale-x-100`; non-directional ones must not be flipped.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}
