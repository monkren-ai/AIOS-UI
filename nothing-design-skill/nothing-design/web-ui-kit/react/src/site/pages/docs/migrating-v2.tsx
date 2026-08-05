import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocNote, DocSection, DocSubSection, DocTable } from './_shared'

const SWITCH_BEFORE = `<Switch on={enabled} onChange={setEnabled} />
<Switch label="Telemetry" on disabled />`

const SWITCH_AFTER = `<Switch checked={enabled} onChange={setEnabled} />
<Switch label="Telemetry" checked disabled />

// 想要「默认打开」但不受控，现在有 defaultChecked 了：
<Switch label="Wi-Fi" defaultChecked />`

const INPUT_BEFORE = `<Input value={name} onChange={setName} />
<Input value={query} onChange={(value) => setQuery(value.trim())} />`

const INPUT_AFTER = `<Input value={name} onValueChange={setName} />
<Input value={query} onValueChange={(value) => setQuery(value.trim())} />

// onChange 现在是原生事件，需要时两个可以一起用：
<Input
  onValueChange={setQuery}
  onChange={(event) => console.log(event.nativeEvent)}
/>`

const OPEN_BEFORE = `// 之前类型上可选，忘了传就静默不渲染
<Modal title="Settings">…</Modal>`

const OPEN_AFTER = `const [open, setOpen] = useState(false)

<Modal open={open} onClose={() => setOpen(false)} title="Settings">…</Modal>`

const SEPARATOR_BEFORE = `<ContextMenu
  items={[
    { label: 'Cut' },
    { label: 'Copy', separator: true },
    { label: 'Delete' },
  ]}
>`

const SEPARATOR_AFTER = `<ContextMenu
  items={[
    { label: 'Cut' },
    { label: 'Copy' },
    { separator: true },
    { label: 'Delete' },
  ]}
>`

export function MigratingV2Page() {
  const { t } = useT()

  return (
    <div className="flex flex-col gap-12">
      <DocSection title={t('这一版改了什么', 'What changed')}>
        <Prose className="text-foreground-muted">
          {t(
            '2.0 是一次样式层的整体重写：所有组件从纯 CSS + BEM 迁到了 Tailwind v4 + CVA。**绝大多数使用方式没有变化**——同样的组件、同样的 prop、同样的视觉。下面列出的是少数几处必须改代码的地方，每一处都能靠 TypeScript 报错定位，不会静默失效。',
            'Version 2.0 is a rewrite of the styling layer: every component moved from hand-written CSS and BEM to Tailwind v4 and CVA. **Almost nothing about using the library changed** — same components, same props, same look. What follows is the short list of places you do have to edit, and every one of them surfaces as a TypeScript error rather than failing silently.',
          )}
        </Prose>
        <DocNote label={t('先做这一步', 'Do this first')}>
          {t(
            '升级后先跑一次 `tsc --noEmit`。下面四处改动全都是类型层面的破坏性变更，编译器会把每个调用点指给你。',
            'Run `tsc --noEmit` right after upgrading. All four changes below are type-level breaking changes, so the compiler will point at every call site for you.',
          )}
        </DocNote>
      </DocSection>

      <DocSection title={t('速查表', 'At a glance')}>
        <DocTable
          head={[t('组件', 'Component'), t('改动', 'Change'), t('迁移方式', 'How to migrate')]}
          rows={[
            [
              'Switch',
              t('`on` 已移除', '`on` removed'),
              t(
                '改用 `checked`；新增了 `defaultChecked`',
                'Use `checked`; `defaultChecked` is new',
              ),
            ],
            [
              'Input',
              t('`onChange` 改为原生事件', '`onChange` is now the native event'),
              t('取值回调改名为 `onValueChange`', 'Rename the value callback to `onValueChange`'),
            ],
            [
              'Modal / Sheet',
              t('`open` 变为必填', '`open` is now required'),
              t('显式传入，不能再省略', 'Pass it explicitly; it can no longer be omitted'),
            ],
            [
              'ContextMenu',
              t('`separator` 变成独立条目', '`separator` is now its own entry'),
              t('从条目上的标志改为单独一项', 'Move it off the item into an entry of its own'),
            ],
          ]}
        />
      </DocSection>

      <DocSection title={t('Switch：on 改为 checked', 'Switch: on becomes checked')}>
        <Prose className="text-foreground-muted">
          {t(
            '此前 `on` 和 `checked` 同时存在、语义重复，`on` 优先。现在只保留 `checked`，和原生表单元素以及库里其它组件一致。同时补上了 `defaultChecked`——过去想让开关「默认打开」只能整个改成受控。',
            'Previously `on` and `checked` both existed with overlapping meaning, and `on` won. Only `checked` remains, matching native form elements and the rest of the library. `defaultChecked` is also new: making a switch start on used to force you into controlled mode.',
          )}
        </Prose>
        <DocSubSection title={t('之前', 'Before')}>
          <CodeBlock code={SWITCH_BEFORE} />
        </DocSubSection>
        <DocSubSection title={t('之后', 'After')}>
          <CodeBlock code={SWITCH_AFTER} />
        </DocSubSection>
      </DocSection>

      <DocSection title={t('Input：两个回调各司其职', 'Input: two callbacks, two jobs')}>
        <Prose className="text-foreground-muted">
          {t(
            '`Input` 的 `onChange` 过去给的是字符串而不是事件，这和它包着的原生 `<input>` 对不上，也和 `Textarea` 对不上。现在 `onChange` 回归原生事件透传，取值回调改名 `onValueChange`——和 `Select`、`RadioGroup`、`Slider` 这些的形状一致。两个回调都会触发，可以各取所需。',
            'The `onChange` on `Input` used to hand you a string instead of an event, which matched neither the native `<input>` it wraps nor `Textarea`. Now `onChange` is a straight passthrough of the native event and the value callback is named `onValueChange`, matching the shape of `Select`, `RadioGroup`, and `Slider`. Both fire, so take whichever you need.',
          )}
        </Prose>
        <DocSubSection title={t('之前', 'Before')}>
          <CodeBlock code={INPUT_BEFORE} />
        </DocSubSection>
        <DocSubSection title={t('之后', 'After')}>
          <CodeBlock code={INPUT_AFTER} />
        </DocSubSection>
        <DocList
          items={[
            t(
              '`Textarea` 同步新增了 `onValueChange`，它原本的 `onChange` 行为不变。',
              '`Textarea` gains the same `onValueChange`; its existing `onChange` behaviour is unchanged.',
            ),
            t(
              '`Input` 现在支持非受控的 `defaultValue`，此前传了不生效。',
              '`Input` now honours an uncontrolled `defaultValue`, which previously did nothing.',
            ),
            t(
              '`clearable` 的清空按钮会派发一次真实的 input 事件，所以 `onChange` 和 `onValueChange` 都收得到。',
              'The `clearable` button dispatches a real input event, so both `onChange` and `onValueChange` see the clear.',
            ),
          ]}
        />
      </DocSection>

      <DocSection title={t('Modal 与 Sheet：open 必填', 'Modal and Sheet: open is required')}>
        <Prose className="text-foreground-muted">
          {t(
            '这两个组件都不渲染触发器，内部也没有任何路径能把自己从关闭翻成打开——开合完全由调用方掌握。此前 `open` 在类型上是可选的，忘了传的结果是「什么都不显示、也不报错」，属于最难查的一类问题。现在类型说实话了。',
            "Neither component renders a trigger, and neither has any internal path that can flip itself from closed to open — that is entirely the caller's job. `open` used to be typed optional, so forgetting it meant nothing rendered and nothing complained, which is the worst kind of bug to chase. The type now tells the truth.",
          )}
        </Prose>
        <DocSubSection title={t('之前', 'Before')}>
          <CodeBlock code={OPEN_BEFORE} />
        </DocSubSection>
        <DocSubSection title={t('之后', 'After')}>
          <CodeBlock code={OPEN_AFTER} />
        </DocSubSection>
      </DocSection>

      <DocSection title={t('ContextMenu：分隔线写法统一', 'ContextMenu: separators are entries')}>
        <Prose className="text-foreground-muted">
          {t(
            '`DropdownMenu` 里分隔线一直是数组中的独立一项，而 `ContextMenu` 里它是挂在条目上的标志，含义是「在我下面画一条线」。同一个字段两种意思，把前者的写法照搬到后者会得到一个空菜单行。现在统一成独立条目。旧的标志写法仍然可用但已废弃，会在下一个大版本移除。',
            'In `DropdownMenu` a separator has always been its own entry in the array, while in `ContextMenu` it was a flag on an item meaning "draw a rule below me". One field, two meanings — and copying the first idiom into the second produced an empty menu row. They are now unified on the standalone entry. The old flag still works but is deprecated and will go in the next major.',
          )}
        </Prose>
        <DocSubSection title={t('之前', 'Before')}>
          <CodeBlock code={SEPARATOR_BEFORE} />
        </DocSubSection>
        <DocSubSection title={t('之后', 'After')}>
          <CodeBlock code={SEPARATOR_AFTER} />
        </DocSubSection>
      </DocSection>

      <DocSection title={t('顺带修好的东西', 'Fixed along the way')}>
        <Prose className="text-foreground-muted">
          {t(
            '这些不需要你改代码，但值得知道——它们此前都是静默失效的：',
            'None of these need action from you, but they are worth knowing about: each was silently broken before.',
          )}
        </Prose>
        <DocList
          items={[
            t(
              '`Tooltip` 现在会用 `aria-describedby` 把提示关联到触发元素，此前读屏软件读不到提示内容。',
              '`Tooltip` now links its bubble to the trigger with `aria-describedby`; screen readers previously never announced the hint.',
            ),
            t(
              '`Sheet` 的标题走 `Dialog.Title`，抽屉终于有了可访问名称，不再被读成一句无名的「对话框」。',
              '`Sheet` routes its title through `Dialog.Title`, so a drawer finally has an accessible name instead of announcing as an unnamed "dialog".',
            ),
            t(
              '`Tabs` 的 `aria-controls` 此前指向一个不存在的元素，`data-state` 在非受控用法下恒为 `inactive`。',
              '`Tabs` had an `aria-controls` pointing at an element that did not exist, and its `data-state` was stuck on `inactive` whenever it was uncontrolled.',
            ),
            t(
              '`ContextMenu` 补齐了焦点管理、焦点陷阱、`aria-haspopup` 与 Shift+F10 开启，此前完全无法用键盘操作。',
              '`ContextMenu` gained focus management, a focus trap, `aria-haspopup`, and Shift+F10 to open — it was previously pointer-only.',
            ),
            t(
              '`Tag` 只在传了 `onClick` 时才带按钮语义，此前所有标签都会被读成按钮。',
              '`Tag` only takes on button semantics when given an `onClick`; every tag used to announce as a button.',
            ),
            t(
              '`useReducedMotion()` 在没有 provider 时会直接读系统媒体查询，此前一律返回 `false`。',
              '`useReducedMotion()` reads the system media query directly when there is no provider; it used to always return `false`.',
            ),
            t(
              '`SegmentedControl` 改用 radio group 语义（`role="radiogroup"` + `role="radio"`）并补上方向键与 roving tabindex。此前它自称 tablist 却没有方向键，读屏会念「tab 1 of 3」然后按键毫无反应。',
              '`SegmentedControl` moved to radio-group semantics (`role="radiogroup"` and `role="radio"`) and gained arrow keys plus a roving tabindex. It used to claim to be a tablist while implementing no arrow keys, so a screen reader announced "tab 1 of 3" and then nothing responded.',
            ),
            t(
              '`Collapsible` 折叠后的内容不再留在 Tab 顺序里，触发器与内容区之间也接上了 `aria-controls` / `aria-labelledby`。',
              '`Collapsible` no longer leaves collapsed content in the tab order, and the trigger and content region are now linked by `aria-controls` and `aria-labelledby`.',
            ),
            t(
              '`ScrollArea` 的视口可以聚焦了，纯文本内容终于能用键盘滚动；新增 `viewportProps`，传入 `aria-label` 后视口才会成为具名 region。',
              "`ScrollArea`'s viewport is focusable, so prose content can finally be scrolled from the keyboard. A new `viewportProps` lets you pass an `aria-label`, which is what promotes the viewport to a named region.",
            ),
            t(
              'Pomodoro、Caffeinate、NextEvent、Taskbar、Quotes 有若干状态配色的 CSS 选择器从未匹配成功，这些颜色现在会真的显示出来。',
              'Several state colours in Pomodoro, Caffeinate, NextEvent, Taskbar, and Quotes had CSS selectors that never matched. Those colours now actually render.',
            ),
          ]}
        />
      </DocSection>
    </div>
  )
}

export default MigratingV2Page
