import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocTable } from './_shared'

const FOCUS_TOKENS = `/* tokens.css */
--focus-ring-width: 2px;
--focus-ring-color: var(--interactive);  /* dark: #5B9BF6 · light: #007AFF */
--focus-ring-offset: 2px;
--focus-ring-offset-inset: -2px;         /* 焦点环会被裁掉时用负 offset 画在内侧 */`

const FOCUS_BASE = `/* styles.css 的 base 层：没有阴影可用，焦点态只能靠 outline 说清楚 */
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}`

const FOCUS_UTIL = `// 组件里的等价写法（Button 的 base 类）
'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2'`

const ICON_ONLY = `/* ✗ 读屏软件听到的是一个没有名字的按钮 */
<Button size="icon-md"><IconTrash /></Button>

/* ✓ */
<Button size="icon-md" aria-label="Delete item"><IconTrash /></Button>`

const TOUCH = `size="sm"  → h-9  = 36px   /* 只用在明确的密集场景 */
size="md"  → h-11 = 44px   /* 默认。等于 --touch-target-min */
size="lg"  → h-13 = 52px`

export default function AccessibilityPage() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('Base UI 已经替你做掉的部分', 'What Base UI gives you for free')}>
        <Prose>
          {t(
            '所有涉及交互语义的组件都建立在 [@base-ui/react](https://base-ui.com) 之上。这不是为了省事——焦点陷阱、roving focus、`aria-activedescendant` 这类东西自己写十次会错九次。Base UI 负责的部分包括：',
            'Every component with interaction semantics is built on [@base-ui/react](https://base-ui.com). Not to save effort — focus trapping, roving focus, and `aria-activedescendant` are the kind of thing you get wrong nine times out of ten writing it yourself. Base UI covers:',
          )}
        </Prose>
        <DocList
          items={[
            t(
              '**角色与 aria 关系**。`role`、`aria-expanded`、`aria-controls`、`aria-selected`、`aria-haspopup` 由 primitive 挂好，包括 trigger 与 popup 之间的 id 关联。',
              '**Roles and aria relationships.** `role`, `aria-expanded`, `aria-controls`, `aria-selected`, and `aria-haspopup` are set by the primitive, including the id wiring between a trigger and its popup.',
            ),
            t(
              '**焦点管理**。浮层打开时焦点进入、关闭时归还给触发元素；模态型浮层做焦点陷阱，`Esc` 关闭。',
              '**Focus management.** Focus moves into a popup on open and returns to the trigger on close; modal popups trap focus and close on `Esc`.',
            ),
            t(
              '**列表型的方向键导航**。Menu、Select、Tabs、RadioGroup 走 roving tabindex，方向键在项之间移动、`Home` / `End` 跳到首尾、输入字母做 typeahead。',
              '**Arrow-key navigation for collections.** Menu, Select, Tabs, and RadioGroup use a roving tabindex: arrow keys move between items, `Home` / `End` jump to the ends, and typing letters does typeahead.',
            ),
            t(
              '**方向感知**。方向键的语义会跟着 `DirectionProvider` 翻转，RTL 下 `ArrowRight` 是「上一项」。',
              '**Direction awareness.** Arrow-key semantics follow `DirectionProvider`, so `ArrowRight` means “previous” in RTL.',
            ),
            t(
              '**原生元素优先**。能用 `<button>` / `<input>` 的地方不会做成带 `role` 的 `<div>`，所以表单参与、自动填充、右键菜单这些浏览器行为都还在。',
              '**Native elements first.** Where a `<button>` or `<input>` works, you do not get a `<div role="…">`, so form participation, autofill, and context menus still behave.',
            ),
          ]}
        />
        <Prose>
          {t(
            '本库在这之上加的是外观、`data-slot` 抓手和双语文案。未在文档里列出的属性会原样透传给底层 primitive，所以任何 `aria-*` 你都能直接传。',
            'What this library adds on top is appearance, the `data-slot` hooks, and bilingual copy. Anything not documented is forwarded to the underlying primitive, so any `aria-*` you pass lands where you expect.',
          )}
        </Prose>
      </DocSection>

      <DocSection title={t('焦点环', 'The focus ring')}>
        <Prose>
          {t(
            '这里有一个由设计约束逼出来的结论：Nothing 不用阴影，所以焦点态**没有** `box-shadow` 这条退路。焦点必须靠 `outline` 表达，而且它是整个系统里对比度最高的一个信号。',
            'Here a design constraint forces a technical one: Nothing does not use shadows, so there is **no** `box-shadow` route for focus. Focus has to be expressed with `outline`, and it is the highest-contrast signal in the system.',
          )}
        </Prose>
        <CodeBlock code={FOCUS_TOKENS} />
        <Prose>
          {t(
            '焦点色用的是 `--interactive`（暗色 `#5B9BF6`，亮色 `#007AFF`），刻意**不用** Nothing 红——红色在这套语言里表示「注意/危险」，如果焦点也是红的，用户就无法区分「我现在选中了这个」和「这个操作有破坏性」。',
            'The ring uses `--interactive` (`#5B9BF6` dark, `#007AFF` light), deliberately **not** the Nothing red: red means “attention/danger” here, and if focus were red too, users could not tell “I have selected this” from “this action is destructive”.',
          )}
        </Prose>
        <CodeBlock code={FOCUS_BASE} />
        <CodeBlock code={FOCUS_UTIL} />
        <DocList
          items={[
            t(
              '用 `:focus-visible` 而不是 `:focus`，所以鼠标点击不会留下焦点环，键盘操作一定会。',
              'It keys off `:focus-visible`, not `:focus`, so a mouse click leaves no ring while keyboard navigation always does.',
            ),
            t(
              '要自定义焦点环就改 `--focus-ring-*` 令牌，不要写 `outline-none` 了事——那等于把键盘用户赶出去。',
              'Customise the ring through the `--focus-ring-*` tokens; do not just write `outline-none`, which locks keyboard users out.',
            ),
            t(
              '组件在 `overflow-hidden` 容器里会被裁掉焦点环，这种情况用 `--focus-ring-offset-inset`（`-2px`）把环画在元素内侧。',
              'Inside an `overflow-hidden` container the ring gets clipped; that is what `--focus-ring-offset-inset` (`-2px`) is for — it draws the ring inside the element instead.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('44px 最小点击区域', 'The 44px minimum touch target')}>
        <Prose>
          {t(
            '`--touch-target-min` 是 44px，这正是 `size="md"` 成为默认值的原因——它不是「中号」，它是「合规的那个尺寸」。',
            '`--touch-target-min` is 44px, and that is precisely why `size="md"` is the default: it is not “the medium one”, it is “the compliant one”.',
          )}
        </Prose>
        <CodeBlock code={TOUCH} />
        <DocList
          items={[
            t(
              '`sm`（36px）低于这条线。它存在是为了工具栏、表格行内这类密集场景，用在移动端主操作上就是个 bug。',
              '`sm` (36px) is under the line. It exists for toolbars and table rows; using it for a primary action on mobile is a bug.',
            ),
            t(
              '`icon-md` 是 44×44 的正方形，所以纯图标按钮默认也是合规的。',
              '`icon-md` is a 44×44 square, so icon-only buttons are compliant by default too.',
            ),
            t(
              '尺寸类还带 `min-w-*`（`min-w-11` 等），保证内容很短的按钮也不会缩成一条。',
              'The size classes also carry a `min-w-*` (`min-w-11`, and so on), so a button with very short content cannot collapse into a sliver.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('你自己要负责的部分', 'What is still on you')}>
        <Prose>
          {t(
            '有几件事组件库在原理上做不了，因为它们取决于内容。',
            'A few things a component library cannot do, because they depend on your content.',
          )}
        </Prose>
        <CodeBlock code={ICON_ONLY} />
        <DocList
          items={[
            t(
              '**图标按钮必须有 `aria-label`**。一个只有 `<svg>` 的按钮对读屏软件是空的——它会被念成「按钮」，没有别的。这条对 IconButton、关闭按钮、分页箭头、Toggle 全都适用。',
              '**Icon-only controls need an `aria-label`.** A button containing nothing but an `<svg>` is empty to a screen reader — it announces as “button” and nothing more. This applies to icon buttons, close buttons, pagination arrows, and toggles alike.',
            ),
            t(
              '装饰性图标要标 `aria-hidden="true"`，否则读屏软件会把它当内容念。带 `data-icon` 的图标同样如此——旁边有文字时那个图标是装饰。',
              'Decorative icons need `aria-hidden="true"`, otherwise they get announced as content. That includes icons marked with `data-icon`: when there is a label next to them, the icon is decoration.',
            ),
            t(
              '表单控件要有可见的 `Label`（用 `Label` 组件关联 `htmlFor`），`placeholder` 不是标签——它一输入就消失了。',
              'Form controls need a visible `Label` (use the `Label` component and its `htmlFor` association). A `placeholder` is not a label; it vanishes the moment you type.',
            ),
            t(
              '错误信息要和字段关联（`aria-describedby`），并且不能只靠颜色传达——红色边框对色盲用户等于没有边框。',
              'Error messages must be associated with the field (`aria-describedby`) and must not rely on colour alone: a red border is no border at all to a colour-blind user.',
            ),
            t(
              '异步区域用 `aria-live`。按钮的 `loading` 会置 `aria-busy`，但「保存成功」这类结果需要你自己播报。',
              'Use `aria-live` for async regions. A button’s `loading` sets `aria-busy`, but announcing “saved” is your job.',
            ),
            t(
              '所有面向用户的字符串走 `t(zh, en)`。`aria-label` 也是面向用户的字符串。',
              'Every user-facing string goes through `t(zh, en)` — an `aria-label` is a user-facing string.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('键盘预期', 'Keyboard expectations')}>
        <DocTable
          head={[t('按键', 'Key'), t('应该发生什么', 'Expected behaviour')]}
          rows={[
            [
              '`Tab` / `Shift+Tab`',
              t(
                '在**可交互控件之间**移动。一组列表（菜单项、Tab、单选项）整体只占一个 tab 站点，内部靠方向键走。',
                'Moves **between** interactive controls. A collection (menu items, tabs, radios) occupies a single tab stop; you move inside it with arrow keys.',
              ),
            ],
            [
              '`Enter`',
              t(
                '激活按钮和链接，在输入框里提交表单。',
                'Activates buttons and links; submits a form from a text field.',
              ),
            ],
            [
              '`Space`',
              t(
                '激活按钮，切换 Checkbox / Switch / Toggle。',
                'Activates buttons; toggles checkboxes, switches, and toggles.',
              ),
            ],
            [
              '`Esc`',
              t(
                '关闭最上层的浮层，焦点回到触发元素。',
                'Closes the topmost popup and returns focus to its trigger.',
              ),
            ],
            [
              t('方向键', 'Arrow keys'),
              t(
                '在列表型组件内部移动，方向语义跟着 `dir` 翻转。Slider 上调整数值。',
                'Moves within a collection, with the semantics flipped by `dir`. Adjusts the value on a slider.',
              ),
            ],
            [
              '`Home` / `End`',
              t(
                '跳到列表首/尾项，或 Slider 的最小/最大值。',
                'Jumps to the first/last item, or a slider’s min/max.',
              ),
            ],
            [
              t('字母键', 'Letter keys'),
              t(
                '在 Menu / Select 里做 typeahead，跳到首字母匹配的项。',
                'Typeahead in a menu or select: jumps to the item starting with that letter.',
              ),
            ],
          ]}
        />
        <DocNote label={t('自查', 'Audit')}>
          {t(
            '把鼠标拿开，用键盘走一遍你的关键流程。三个最常见的问题是：焦点环在某处消失了（有人写了 `outline-none`）、浮层关闭后焦点掉回 `<body>`（后续 Tab 从页首重新开始）、以及焦点跑进了视觉上不可见的元素里。',
            'Put the mouse away and drive your critical flow with the keyboard. The three usual failures: the ring disappears somewhere (someone wrote `outline-none`), focus lands on `<body>` after a popup closes (so the next Tab restarts from the top of the page), and focus enters something that is not visible.',
          )}
        </DocNote>
      </DocSection>
    </div>
  )
}
