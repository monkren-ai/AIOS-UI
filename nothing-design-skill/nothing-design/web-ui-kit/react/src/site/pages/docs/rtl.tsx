import { ArrowRightIcon } from '../../examples/icons'
import { Button } from 'nothing-ui/button'
import { CodeBlock } from '../../components/CodeBlock'
import { ComponentPreview } from '../../components/ComponentPreview'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSubSection, DocTable } from './_shared'

const SETUP = `import { DirectionProvider } from 'nothing-ui/direction-provider'

<DirectionProvider dir="rtl">
  <App />
</DirectionProvider>`

const VIA_CONFIG = `import * as motion from 'motion/react'
import { ConfigProvider } from 'nothing-ui'

<ConfigProvider motion={motion} dir="rtl">
  <App />
</ConfigProvider>`

const SSR = `// 服务端已经渲染出 <html dir="rtl"> 时，关掉同步以免客户端再改一次
<DirectionProvider dir={locale.dir} syncDocument={false}>
  <App />
</DirectionProvider>`

const HOOK = `import { useDirection } from 'nothing-ui/direction-provider'

function Drawer() {
  const { dir, sign } = useDirection()

  // sign 是 RTL 时为 -1、LTR 时为 1，
  // 用来给 transform 和手势位移取反 —— CSS 逻辑属性帮不上 transform。
  return <motion.div initial={{ x: 320 * sign }} animate={{ x: 0 }} />
}`

const LOGICAL = `/* ✗ 物理属性：RTL 下方向是错的 */
ml-4  mr-2  pl-6  left-0  right-4  text-left  border-l  rounded-l-md

/* ✓ 逻辑属性：跟着 dir 自动镜像 */
ms-4  me-2  ps-6  start-0  end-4   text-start  border-s  rounded-s-md`

const PREVIEW_CODE = `<DirectionProvider dir="rtl">
  <Button>
    متابعة
    <ArrowRightIcon data-icon="end" />
  </Button>
</DirectionProvider>`

export default function RtlPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('两件事，都得做', 'Two things, both required')}>
        <Prose>
          {t(
            '把界面翻成从右到左需要同时满足两个互不相干的机制，只做一个就会得到「布局翻了但键盘方向没翻」或者反过来的半成品。',
            'Mirroring an interface requires two unrelated mechanisms to agree. Do only one and you get a half-mirrored result: the layout flips but the arrow keys do not, or the other way round.',
          )}
        </Prose>
        <DocTable
          head={[t('机制', 'Mechanism'), t('谁需要它', 'Who needs it')]}
          rows={[
            [
              t('DOM 上的 `dir` 属性', 'The DOM `dir` attribute'),
              t(
                '**CSS**。`ms-*`、`pe-*`、`start-*`、`text-start` 这些逻辑属性是由浏览器根据元素继承到的 `dir` 来决定映射成左还是右的。React context 对 CSS 完全不可见——没有 `dir` 属性，逻辑属性就一律按 LTR 解析。',
                '**CSS.** Logical properties like `ms-*`, `pe-*`, `start-*`, and `text-start` are mapped to left or right by the browser, based on the `dir` the element inherits. A React context is invisible to CSS; without the attribute, logical properties resolve as LTR.',
              ),
            ],
            [
              t('React context', 'The React context'),
              t(
                '**行为**。方向相关的逻辑是 JS 在跑：roving focus 里 `ArrowRight` 该往前还是往后、浮层往哪一侧翻转、Slider 拖动的正方向、Carousel 的下一页是哪一页。JS 读不到 CSS 的解析结果，需要显式知道方向。',
                '**Behaviour.** Direction-aware logic runs in JS: whether `ArrowRight` moves forward or backward in a roving-focus group, which side a popup flips to, which way a slider drag increases, which slide is “next” in a carousel. JS cannot read CSS’s resolution and has to be told.',
              ),
            ],
          ]}
        />
        <Prose>
          {t(
            '`DirectionProvider` 一次把两边都办了：它把 `dir` 写到 `<html>` 上，同时提供自己的 context，并把方向喂给 Base UI 的 `DirectionProvider`（组件内部的行为就是从那里读的）。',
            '`DirectionProvider` handles both: it writes `dir` onto `<html>`, provides its own context, and feeds the direction to Base UI’s `DirectionProvider`, which is where the components read their behaviour from.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('配置', 'Setup')}>
        <CodeBlock code={SETUP} />
        <Prose>
          {t(
            '已经在用 `ConfigProvider` 的话，直接传 `dir` 就行：',
            'If you already use `ConfigProvider`, just pass `dir`:',
          )}
        </Prose>
        <CodeBlock code={VIA_CONFIG} />
        <DocNote label={t('关于 syncDocument', 'About syncDocument')}>
          {t(
            '`syncDocument` 默认为 `true`，它在 effect 里把 `dir` 写到 `document.documentElement`，卸载时还原原值。这对 SPA 很方便，但它发生在挂载之后——服务端渲染的项目应该直接在 `<html dir="rtl">` 上标好，然后传 `syncDocument={false}`，避免首帧按 LTR 布局。',
            '`syncDocument` defaults to `true`: an effect writes `dir` onto `document.documentElement` and restores the previous value on unmount. Convenient in an SPA, but it happens after mount — server-rendered apps should put `dir` on `<html>` themselves and pass `syncDocument={false}`, so the first frame is not laid out LTR.',
          )}
        </DocNote>
        <CodeBlock code={SSR} />
      </DocSection>

      <DocSection title={t('优先用这些工具类', 'Prefer these utilities')}>
        <CodeBlock code={LOGICAL} />
        <DocList
          items={[
            t(
              '外边距 / 内边距：`ms-*` `me-*` `ps-*` `pe-*`（start / end 取代 left / right）。',
              'Margin and padding: `ms-*` `me-*` `ps-*` `pe-*` — start/end instead of left/right.',
            ),
            t(
              '定位：`start-*` `end-*` 取代 `left-*` `right-*`。',
              'Positioning: `start-*` and `end-*` instead of `left-*` and `right-*`.',
            ),
            t(
              '文本对齐：`text-start` `text-end`。',
              'Text alignment: `text-start` and `text-end`.',
            ),
            t(
              '边框与圆角：`border-s` `border-e` `rounded-s-*` `rounded-e-*`。',
              'Borders and radii: `border-s` `border-e` `rounded-s-*` `rounded-e-*`.',
            ),
            t(
              'flex / grid 本来就是方向感知的，`flex-row` 在 RTL 下自动从右排起，不需要 `flex-row-reverse`。',
              'Flex and grid are already direction-aware: `flex-row` starts from the right in RTL, so you do not need `flex-row-reverse`.',
            ),
          ]}
        />
        <Prose>
          {t(
            '库内部只用逻辑属性，图标间距也是——`data-icon="start"` 对应的是 `me-2`，所以 RTL 下图标自己就换到了右边，没有任何镜像代码在跑。',
            'The library uses logical properties throughout, icon spacing included: `data-icon="start"` maps to `me-2`, so in RTL the icon moves to the right side on its own, with no mirroring code involved.',
          )}
        </Prose>
        <DocSubSection title={t('逻辑属性帮不上的地方', 'Where logical properties cannot help')}>
          <Prose>
            {t(
              '`transform` 没有逻辑版本：`translate-x-4` 永远是往视觉右边推。抽屉滑入、轮播位移、拖拽手势这些必须自己取反，用 `useDirection()` 拿到的 `sign`。',
              'There is no logical `transform`: `translate-x-4` always pushes to the visual right. Drawer slide-ins, carousel offsets, and drag gestures have to negate themselves, which is what the `sign` from `useDirection()` is for.',
            )}
          </Prose>
          <CodeBlock code={HOOK} />
          <Prose>
            {t(
              '同理，方向性的图标（箭头、返回、下一步）在 RTL 下需要视觉上翻转，用 `rtl:-scale-x-100` 或换一个图标。纯符号类图标（设置、搜索、播放）不要翻。',
              'Likewise, directional glyphs — arrows, back, next — need to flip visually in RTL, via `rtl:-scale-x-100` or a different icon. Non-directional glyphs (settings, search, play) must not be flipped.',
            )}
          </Prose>
        </DocSubSection>
      </DocSection>

      <DocSection title={t('实际效果', 'Live')}>
        <Prose>
          {t(
            '下面的预览区被局部设成了 `dir="rtl"`。注意箭头图标跑到了文字的左侧——那一侧才是 RTL 下的「末尾」——而按钮的内间距也跟着换了边。',
            'The preview below is locally set to `dir="rtl"`. Note the arrow moved to the left of the label, which is the “end” side in RTL, and the button’s inner spacing followed it.',
          )}
        </Prose>
        <ComponentPreview dir="rtl" code={PREVIEW_CODE} minHeight={140}>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              متابعة
              <ArrowRightIcon data-icon="end" className="rtl:-scale-x-100" />
            </Button>
            <Button variant="secondary">إلغاء</Button>
          </div>
        </ComponentPreview>
        <DocNote label={t('局部方向', 'Scoped direction')}>
          {t(
            '`dir` 可以挂在任意元素上，不必是 `<html>`。所以一个 LTR 页面里可以嵌一段 RTL 内容（比如显示一条阿拉伯语引用），这个预览用的就是这个办法。要让行为也跟着翻，那一小块外面同样得包一层 `<DirectionProvider dir="rtl" syncDocument={false}>`。',
            '`dir` can sit on any element, not just `<html>`, so an LTR page can embed a chunk of RTL content — an Arabic quotation, say — which is how this preview works. To flip the behaviour for that chunk too, wrap it in its own `<DirectionProvider dir="rtl" syncDocument={false}>`.',
          )}
        </DocNote>
      </DocSection>

      <DocSection title={t('自查', 'Checking your work')}>
        <DocList
          items={[
            t(
              '在 devtools 里给 `<html>` 加上 `dir="rtl"`，整页扫一遍。任何**没有**镜像的间距都是一处物理属性。',
              'Add `dir="rtl"` to `<html>` in devtools and scan the page. Any spacing that did **not** mirror is a physical property.',
            ),
            t(
              '用键盘走一遍菜单、Tabs、Slider：`ArrowRight` 应该是「往上一项」而不是「往下一项」。',
              'Walk a menu, a set of tabs, and a slider with the keyboard: `ArrowRight` should mean “previous”, not “next”.',
            ),
            t(
              '打开一个 Popover 或 Tooltip，确认它是朝 start 侧对齐的。',
              'Open a popover or tooltip and confirm it aligns to the start side.',
            ),
            t(
              '`rg "\\bml-|\\bmr-|\\bpl-|\\bpr-|left-|right-|text-left|text-right"` 是一条很好用的体检命令。',
              '`rg "\\bml-|\\bmr-|\\bpl-|\\bpr-|left-|right-|text-left|text-right"` makes a decent audit command.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}
