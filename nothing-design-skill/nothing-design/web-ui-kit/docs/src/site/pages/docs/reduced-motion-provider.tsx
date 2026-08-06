import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { PropsTable } from '../../components/PropsTable'
import { useT } from '../../i18n'
import type { ApiSection } from '../../registry/types'
import { DocList, DocNote, DocSection } from './_shared'

const IMPORT = `import {
  ReducedMotionProvider,
  useReducedMotion,
  type ReducedMotionContextValue,
} from 'aios-ui-kit/reduced-motion-provider'`

const USAGE = `// 跟随系统
<ReducedMotionProvider>
  <App />
</ReducedMotionProvider>

// 由应用内的设置开关接管
<ReducedMotionProvider force={settings.reduceMotion}>
  <App />
</ReducedMotionProvider>`

const CONSUME = `import { useReducedMotion } from 'aios-ui-kit/reduced-motion-provider'
import { useMotionComponent } from 'aios-ui-kit/motion-provider'

function Orb() {
  const reducedMotion = useReducedMotion()
  const motion = useMotionComponent()

  // 退化形态是「不动」，不是「动得快一点」
  return (
    <motion.div
      animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1] }}
      transition={reducedMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
    />
  )
}`

const CSS_HOOK = `/* provider 会把属性写到 <html> 上，所以 CSS 也能响应应用内的开关，
   而 motion-reduce: 只响应系统媒体查询。 */
[data-reduced-motion] .my-marquee {
  animation: none;
}`

const providerSection: ApiSection = {
  name: 'ReducedMotionProvider',
  description: {
    zh: '把 `prefers-reduced-motion` 暴露给组件树，并同步到 `<html data-reduced-motion>`。',
    en: 'Exposes `prefers-reduced-motion` to the tree and mirrors it onto `<html data-reduced-motion>`.',
  },
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      description: { zh: '组件树。', en: 'The tree to provide to.' },
    },
    {
      name: 'force',
      type: 'boolean',
      description: {
        zh: '覆盖系统偏好。`true` 强制关闭动效，`false` 强制开启，不传则跟随 `prefers-reduced-motion`。`false` 等于替用户否决一项可访问性设置，请只在用户自己主动打开动效时使用。',
        en: 'Overrides the system preference. `true` forces motion off, `false` forces it on, and omitting it follows `prefers-reduced-motion`. `false` overrules an accessibility setting on the user’s behalf — use it only when the user themselves asked for motion back.',
      },
    },
  ],
}

const hookSection: ApiSection = {
  name: 'useReducedMotion()',
  description: {
    zh: '返回当前是否应该抑制动效——已经算进了 `force`。没有 provider 时返回 `false`。',
    en: 'Returns whether motion should currently be suppressed, with `force` already applied. Returns `false` when no provider is mounted.',
  },
  props: [
    {
      name: '(return)',
      type: 'boolean',
      description: {
        zh: '`force ?? systemReducedMotion`。为 `true` 时你的 JS 动画应该退化成静态终态。',
        en: '`force ?? systemReducedMotion`. When `true`, your JS animation should degrade to its static end state.',
      },
    },
  ],
}

const contextSection: ApiSection = {
  name: 'ReducedMotionContextValue',
  description: {
    zh: '需要同时知道「最终结论」和「系统原始偏好」时（例如在设置面板里显示「跟随系统：开」），可以直接读 context。',
    en: 'Read the context directly when you need both the final answer and the raw system preference — for a settings panel showing “Follow system: on”, say.',
  },
  props: [
    {
      name: 'reducedMotion',
      type: 'boolean',
      description: {
        zh: '当前是否应该抑制动效，`force` 已生效。',
        en: 'Whether motion should be suppressed right now, with `force` applied.',
      },
    },
    {
      name: 'systemReducedMotion',
      type: 'boolean',
      description: {
        zh: '系统偏好本身，不受 `force` 影响。',
        en: 'The system preference itself, unaffected by `force`.',
      },
    },
  ],
}

export default function ReducedMotionProviderPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('导入', 'Import')}>
        <CodeBlock code={IMPORT} />
        <CodeBlock code={USAGE} />
        <Prose>
          {t(
            '`ConfigProvider` 已经内置了它，`reducedMotion` prop 会作为 `force` 传下去。',
            '`ConfigProvider` already includes it, and its `reducedMotion` prop is passed down as `force`.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('为什么 CSS 兜底不够', 'Why the CSS fallback is not enough')}>
        <Prose>
          {t(
            'CSS 那边已经有两道防线：`styles.css` 里一条全局的 `@media (prefers-reduced-motion: reduce)`，以及组件里到处写的 `motion-reduce:` 工具类。它们覆盖了所有由 CSS 驱动的动画。',
            'Two CSS layers already exist: a global `@media (prefers-reduced-motion: reduce)` block in `styles.css`, and the `motion-reduce:` utilities written throughout the components. Between them, every CSS-driven animation is covered.',
          )}
        </Prose>
        <Prose>
          {t(
            '**JS 驱动的动画不在其中。** motion 的 spring、canvas 上逐帧画的点阵、`requestAnimationFrame` 循环、`element.animate()`——媒体查询对它们一律无效，因为根本没有 CSS 属性可以被覆盖。这些代码必须自己读到偏好然后分支，这就是这个 provider 存在的全部理由。',
            '**JS-driven animation is not.** motion springs, a dot matrix drawn frame by frame on a canvas, a `requestAnimationFrame` loop, `element.animate()` — a media query does nothing for any of them, because there is no CSS property to override. That code has to read the preference and branch on it, which is the entire reason this provider exists.',
          )}
        </Prose>
        <CodeBlock code={CONSUME} collapseAfter={20} />
      </DocSection>

      <DocSection title="API">
        <PropsTable section={providerSection} />
        <PropsTable section={hookSection} />
        <PropsTable section={contextSection} />
      </DocSection>

      <DocSection title={t('行为细节', 'Behaviour details')}>
        <DocList
          items={[
            t(
              "订阅 `matchMedia('(prefers-reduced-motion: reduce)')` 的 `change` 事件，所以用户在系统设置里改了偏好会立即生效，不必刷新。",
              "Subscribes to the `change` event on `matchMedia('(prefers-reduced-motion: reduce)')`, so changing the OS setting takes effect immediately without a reload.",
            ),
            t(
              '`reducedMotion` 为真时给 `<html>` 加上空值属性 `data-reduced-motion`，为假时移除。',
              'Adds a valueless `data-reduced-motion` attribute to `<html>` while `reducedMotion` is true, and removes it when false.',
            ),
            t(
              '`matchMedia` 不存在时（老环境、部分测试运行器）退化为 `false`，不会抛错。',
              'Where `matchMedia` is unavailable — older environments, some test runners — it degrades to `false` rather than throwing.',
            ),
            t(
              '`force` 覆盖系统值的方式是 `force ?? systemReducedMotion`，所以 `force={false}` 是**真的**会强制开启动效，不是「回到跟随系统」。要回到跟随系统请传 `undefined`。',
              'The override is `force ?? systemReducedMotion`, so `force={false}` genuinely forces motion **on**; it does not mean “go back to following the system”. For that, pass `undefined`.',
            ),
          ]}
        />
        <DocNote label={t('两套开关的边界', 'Where the two switches meet')}>
          {t(
            '`motion-reduce:` 工具类匹配的是媒体查询，**不读这个 context**。也就是说应用内的「关闭动效」开关（`force`）不会影响 CSS 过渡。需要让 CSS 也响应应用内开关时，选 `data-reduced-motion` 属性：',
            'The `motion-reduce:` utilities match the media query and **do not read this context**. An in-app “reduce motion” switch (`force`) therefore leaves CSS transitions alone. To make CSS respond to the in-app switch as well, select on the `data-reduced-motion` attribute:',
          )}
        </DocNote>
        <CodeBlock code={CSS_HOOK} />
      </DocSection>
    </div>
  )
}
