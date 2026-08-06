# 实施计划：完成 Autocomplete、Combobox、Toolbar 三个组件

## 摘要

为 Nothing-UI（`aios-ui-kit`）React 组件库补齐 3 个组件。NumberField 已完整就绪（variants/component/index/test/examples/registry 全部存在），作为本计划的模板参照。Autocomplete 的 component 与 variants 已完成且经核对正确，仅需补 index/test/examples/registry。Combobox 与 Toolbar 从零实现，遵循与 NumberField/Autocomplete/Select 完全一致的约定。

所有组件通过 **subpath 导入**（`aios-ui-kit/autocomplete`）消费，由 `sync:subpaths` 自动生成转发文件；文档页通过 `site/registry/entries/*.tsx` 被 `import.meta.glob` 自动发现加载。**不修改任何共享文件**（`src/index.ts`、`src/site/registry/manifest.ts` 等），与 NumberField 先例一致。

---

## 当前状态分析

### 已完成（核对无误）
- `src/NumberField/` 全套（variants/component/index/test/examples×3/registry）— 模板。
- `src/Autocomplete/Autocomplete.tsx` — 已用 ref-as-prop，复合导出齐全；对照 `@base-ui/react/autocomplete` 的 `index.parts.d.ts` 确认 `Root/InputGroup/Input/Clear/Portal/Positioner/Popup/List/Item/Empty` 全部存在，用法正确。
- `src/Autocomplete/autocomplete-variants.ts` — 11 个 cva + 2 个类型，齐全。

### 缺失
- `src/Autocomplete/`：缺 `index.ts`、`Autocomplete.test.tsx`、`site/examples/autocomplete/*`、`site/registry/entries/autocomplete.tsx`。
- `src/Combobox/`：目录不存在，全套待建。
- `src/Toolbar/`：目录不存在，全套待建。
- `src/subpath/{autocomplete,combobox,toolbar}.ts`：由 `sync:subpaths` 生成（不手写）。

### 关键约定（来自探索）
1. **ref-as-prop**：普通函数组件解构 `ref` 并下传；禁止 `forwardRef`。
2. **CVA 变体**：每个组件一个 `*-variants.ts`，导出多个 `cva` + 联合类型。
3. **data-slot / data-* 属性**：根元素挂 `data-slot="<kebab>"`，按需挂 `data-size`/`data-variant`/`data-disabled`/`data-error`/`data-invalid`/`data-state`（用 `dataAttr`）。
4. **浮层结构**（Select 范式）：`Portal > Positioner(sideOffset,align) > Popup`；浮层用 `bg-popover border-border-visible rounded-sm`，进出动画走 `closed:/open:` + `duration-[var(--duration-spring-moderate)] ease-spring-moderate`，`motion-reduce:transition-none`。
5. **设计 tokens**：颜色用 `bg-surface-raised/bg-popover/border-border-visible/text-foreground/text-foreground-muted/text-foreground-disabled/bg-muted/bg-accent-subtle/text-accent` 等；圆角 `rounded-input/rounded-sm`；字号 `text-sm/text-base/text-label/text-caption/text-micro`；`font-mono`；过渡 `duration-200 ease-nothing`。无阴影、无 blur、无渐变。
6. **错误态**：`role="alert"`，`mt-xs font-mono text-label uppercase tracking-wide text-accent`。
7. **index.ts**：导出组件+类型、所有 variants、`type *Size/*Variant`、`export { default }`。
8. **registry entry**：默认导出一个 `ComponentDoc` 常量（`xxxDoc`），含 slug/name/category/status/baseUi/description(bilingual)/preview/importStatement/usageSnippet/composition/examples(code 用 `?raw`)/api/accessibility。分类用 `actions-inputs`（Autocomplete/Combobox）和 `navigation`（Toolbar）。
9. **示例**：`import { X } from 'aios-ui-kit/<kebab>'`，`export default function XBasic()`，外层 `mx-auto w-full max-w-xs`。
10. **测试**：Vitest + RTL + userEvent；覆盖 data-slot、size、受控/非受控、disabled、error、ref-as-prop、浮层打开/选中（`waitFor` + `baseElement`）。

### Base UI API 要点
- **Combobox**（`@base-ui/react/combobox`）：`ComboboxRoot` 接受 `items`（对象数组）、`value`/`defaultValue`/`onValueChange`（选中语义，值是 item 对象）、`onInputValueChange`（输入文本）、`isItemEqualToValue`、`itemToStringLabel`（`{value,label}` 形状自动用 label）。`Combobox.List` 支持 render-prop `(item, index) => ReactNode`。`Combobox.Item` state 含 `selected`/`highlighted`/`disabled`。`Combobox.ItemIndicator`（`keepMounted`）显示选中勾。`Combobox.Empty` 需 `items` prop。
- **Toolbar**（`@base-ui/react/toolbar`）：`Root`（`<div>`，`orientation`/`disabled`/`loopFocus`）、`Group`、`Button`、`Link`、`Input`、`Separator`。Root 管理 roving tabindex（方向键在 item 间移动焦点）。

---

## 假设与决策

1. **不改共享文件**：`src/index.ts`（主 barrel）与 `src/site/registry/manifest.ts`（侧栏清单）不修改。NumberField 同样未出现在这两处，证实其属"共享文件"约束范围。组件通过 subpath + registry entry 注册即可工作；侧栏条目可由用户后续按需添加。`sync:subpaths` 自动扫描 `src/` 下带 `index.ts` 的目录生成转发文件，无需手写。
2. **Combobox 为单选**：实现单选 Combobox（输入即过滤、选中填回 input、ItemIndicator 标记选中项），不实现 `multiple`（避免泛型与 chips 的额外复杂度，超出当前比例）。消费方用字符串 `value` 操作；内部通过 `items.find` 在对象与字符串间映射，用 `isItemEqualToValue` 按 `value` 字段比较。这是与 Select 对应的"可输入版单选"，决策完整。
3. **Toolbar 为复合组件**：`Toolbar`（=Root）+ `Toolbar.Group/Button/Link/Input/Separator`，参照 Autocomplete 复合导出范式。Button 用 Base UI `ToolbarButton`（保留 roving tabindex），不复用独立 Button 组件。
4. **Combobox 视觉与 Autocomplete 一致**：复用相同的 control/input/content/list/empty/icon/clear/error/label 变体结构，仅给 item 增加 `selected` 变体（Select 的 2px 红 `before:` 条 + `bg-muted`）与 `itemIndicator` 变体。
5. **Toolbar 视觉**：默认 `solid`（`bg-surface-raised` + `border-border-visible` + `rounded-input` 容器），`ghost`（透明无边框）；button 默认 ghost（hover `bg-muted`），`accent` 变体用 `bg-accent text-white` 作为单点红主操作。

---

## 拟定变更

### A. Autocomplete（补齐：index/test/examples/registry）

#### A1. `src/Autocomplete/index.ts`（新建）
镜像 `src/Select/index.ts` 与 `src/NumberField/index.ts`：
```ts
export { Autocomplete, type AutocompleteProps, type AutocompleteOption } from './Autocomplete'
export {
  autocompleteVariants, autocompleteLabelVariants, autocompleteControlVariants,
  autocompleteInputVariants, autocompletePositionerVariants, autocompleteContentVariants,
  autocompleteListVariants, autocompleteItemVariants, autocompleteEmptyVariants,
  autocompleteIconVariants, autocompleteClearVariants, autocompleteErrorVariants,
  type AutocompleteSize, type AutocompleteVariant,
} from './autocomplete-variants'
// 复合子组件类型也一并导出
export type {
  AutocompleteInputProps, AutocompleteContentProps, AutocompleteListProps,
  AutocompleteItemProps, AutocompleteEmptyProps,
} from './Autocomplete'
export { default } from './Autocomplete'
```
（最终导出清单以 `autocomplete-variants.ts` 实际导出的 11 个 cva 为准。）

#### A2. `src/Autocomplete/Autocomplete.test.tsx`（新建）
参照 `src/Select/Select.test.tsx` + `src/NumberField/NumberField.test.tsx`：
- 渲染 input 带 `data-slot="autocomplete-input"` 与 placeholder；
- 输入后浮层打开、选项带 `data-slot="autocomplete-item"`（`waitFor` + `baseElement`）；
- 点击选项触发 `onValueChange`（Autocomplete 的 value=输入文本，选中项把 label 填入 input，故 `onValueChange` 收到该 label）；
- `label`/`error`（`role="alert"`）/`disabled`/`clearable`（清除按钮 `aria-label="Clear"`）；
- `size` 经 `data-size` 暴露；`ref` 指向根 `div`。

#### A3. `src/site/examples/autocomplete/basic.tsx`（新建）
```tsx
import { Autocomplete } from 'aios-ui-kit/autocomplete'
const ITEMS = [{value:'utc',label:'UTC'},{value:'lon',label:'Europe / London'},{value:'tyo',label:'Asia / Tokyo'}]
export default function AutocompleteBasic() {
  return <div className="mx-auto w-full max-w-xs"><Autocomplete items={ITEMS} placeholder="Search a timezone" /></div>
}
```

#### A4. `src/site/examples/autocomplete/with-label.tsx`（新建）
展示 `label`/`size`（sm/md/lg）/`error`/`disabled` 三档。

#### A5. `src/site/examples/autocomplete/clearable.tsx`（新建）
展示 `clearable` + `icon`，`defaultValue` 预填。

#### A6. `src/site/registry/entries/autocomplete.tsx`（新建）
`export const autocompleteDoc: ComponentDoc`，slug `autocomplete`，category `actions-inputs`，baseUi `Autocomplete`，3 个 example（`?raw` 导入源码），api 表覆盖 `items/value/defaultValue/onValueChange/placeholder/label/error/disabled/size/variant/clearable/icon`，accessibility 含键盘（↑↓选择、Enter 填入、Esc 关闭）+ `motion-reduce`。

---

### B. Combobox（全新：variants/component/index/test/examples/registry）

#### B1. `src/Combobox/combobox-variants.ts`（新建）
镜像 `autocomplete-variants.ts`，并增加选中态：
- `comboboxVariants`（root：`relative flex w-full flex-col gap-1`，size/disabled/hasError）
- `comboboxLabelVariants`（同 Autocomplete label）
- `comboboxControlVariants`（同 Autocomplete control：variant outline/soft + size + hasError + disabled）
- `comboboxInputVariants`（同 Autocomplete input）
- `comboboxPositionerVariants`（`z-[var(--z-overlay)]`）
- `comboboxContentVariants`（同 Autocomplete content：`bg-popover border-border-visible rounded-sm` + spring 进出）
- `comboboxListVariants`（`max-h-60 overflow-y-auto py-1`）
- `comboboxItemVariants`：在 Autocomplete item 基础上 **加 `selected` 变体**（取自 `selectItemVariants` 的 `selected:true`：`bg-muted text-foreground-display` + `before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-accent before:content-['']`）；保留 `size`/`highlighted`/`disabled`
- `comboboxItemIndicatorVariants`（取自 `selectItemIndicatorVariants`：`ms-auto ps-2 text-caption text-interactive opacity-0 selected:opacity-100` + transition）
- `comboboxEmptyVariants`、`comboboxIconVariants`、`comboboxClearVariants`、`comboboxErrorVariants`（同 Autocomplete）
- 类型：`ComboboxSize = 'sm'|'md'|'lg'`、`ComboboxVariant = 'outline'|'soft'`

#### B2. `src/Combobox/Combobox.tsx`（新建）
结构参照 Autocomplete，**关键差异**：选中语义（value=选项 value 字符串）+ ItemIndicator。
```tsx
export interface ComboboxOption { value: string; label: string; disabled?: boolean }

export interface ComboboxProps extends Omit<React.ComponentPropsWithRef<'div'>, 'value'|'defaultValue'|'onChange'> {
  items: ComboboxOption[]
  value?: string | null                 // 受控选中值（字符串）
  defaultValue?: string | null          // 非受控初始选中值
  onValueChange?: (value: string | null) => void
  onInputValueChange?: (value: string) => void
  placeholder?: string; label?: string; error?: string
  disabled?: boolean
  size?: ComboboxSize; variant?: ComboboxVariant
  clearable?: boolean; icon?: boolean
}

export function Combobox({ ..., ref, ...props }) {
  const generatedId = React.useId(); const inputId = props.id || generatedId
  const errorId = `${inputId}-error`; const hasError = Boolean(error)
  const controlled = value !== undefined
  // 字符串 ↔ 对象映射
  const selectedObj = controlled && value != null
    ? items.find(it => it.value === value) ?? null : null
  const defaultObj = !controlled && defaultValue != null
    ? items.find(it => it.value === defaultValue) ?? null : null

  const handleValueChange = React.useCallback((next: ComboboxOption | null) => {
    onValueChange?.(next ? next.value : null)
  }, [onValueChange])
  const handleInputValueChange = React.useCallback((input: string) => {
    onInputValueChange?.(input)
  }, [onInputValueChange])

  return (
    <div ref={ref} className={cn(comboboxVariants({size,disabled,hasError}), className)}
      data-slot="combobox" data-size={dataAttr(size)} data-variant={dataAttr(variant)}
      data-disabled={dataAttr(disabled)} data-error={dataAttr(hasError)} data-invalid={dataAttr(hasError)} {...props}>
      <ComboboxPrimitive.Root
        items={items}
        value={controlled ? selectedObj : undefined}
        defaultValue={controlled ? undefined : defaultObj}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputValueChange}
        isItemEqualToValue={(a, b) => a.value === b.value}
        disabled={disabled}>
        {label && <label className={comboboxLabelVariants({size,hasError,disabled})} data-slot="combobox-label" htmlFor={inputId}>{label}</label>}
        <ComboboxPrimitive.InputGroup className={comboboxControlVariants({variant,size,hasError,disabled})} data-slot="combobox-control" ...>
          <ComboboxPrimitive.Input id={inputId} className={comboboxInputVariants({size})} data-slot="combobox-input" placeholder={placeholder} aria-invalid={hasError||undefined} aria-describedby={hasError?errorId:undefined} />
          {clearable && <ComboboxPrimitive.Clear className={comboboxClearVariants()} data-slot="combobox-clear" aria-label="Clear"><svg .../></ComboboxPrimitive.Clear>}
          {icon && <span className={comboboxIconVariants()} data-slot="combobox-icon" aria-hidden>▾</span>}
        </ComboboxPrimitive.InputGroup>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner className={comboboxPositionerVariants()} data-slot="combobox-positioner" sideOffset={4} align="start">
            <ComboboxPrimitive.Popup className={comboboxContentVariants()} data-slot="combobox-content">
              <ComboboxPrimitive.List className={comboboxListVariants()} data-slot="combobox-list">
                {(item: ComboboxOption) => (
                  <ComboboxPrimitive.Item key={item.value} value={item} disabled={item.disabled}
                    className={(state) => comboboxItemVariants({size, selected: state.selected, highlighted: state.highlighted, disabled: state.disabled})}
                    data-slot="combobox-item">
                    {item.label}
                    <ComboboxPrimitive.ItemIndicator keepMounted className={comboboxItemIndicatorVariants()} data-slot="combobox-item-indicator">✓</ComboboxPrimitive.ItemIndicator>
                  </ComboboxPrimitive.Item>
                )}
              </ComboboxPrimitive.List>
              <ComboboxPrimitive.Empty className={comboboxEmptyVariants()} data-slot="combobox-empty">No results found</ComboboxPrimitive.Empty>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
      {error && <div id={errorId} className={comboboxErrorVariants()} data-slot="combobox-error" role="alert">{error}</div>}
    </div>
  )
}
Combobox.displayName = 'Combobox'
```
复合导出（`Combobox.Input/Content/List/Item/Empty`）参照 Autocomplete 的 ref-as-prop 范式（如需，至少导出 `ComboboxInput`/`ComboboxItem`/`ComboboxEmpty` 三个常用件，displayName 形如 `Combobox.Input`）。

#### B3. `src/Combobox/index.ts`（新建）
导出 `Combobox`、`ComboboxProps`、`ComboboxOption`、所有 variants、`ComboboxSize/ComboboxVariant`、`export { default }`。

#### B4. `src/Combobox/Combobox.test.tsx`（新建）
- 渲染 input 带 `data-slot="combobox-input"`；
- 输入打开浮层，选项带 `data-slot="combobox-item"`（`waitFor`+`baseElement`）；
- 点击选项 → `onValueChange` 收到对应 `value` 字符串（如 `'b'`），且 input 显示其 label；
- 受控 `value="b"` 时该项渲染 `ItemIndicator`/`data-selected`；
- `label`/`error`/`disabled`/`clearable`/`size`（`data-size`）/ref-as-prop。

#### B5–B7. 示例（新建）
- `site/examples/combobox/basic.tsx`：基础（items + placeholder）。
- `site/examples/combobox/with-label.tsx`：label/size/error/disabled。
- `site/examples/combobox/controlled.tsx`：受控 `value` + `onValueChange`（展示选中态指示器）。

#### B8. `src/site/registry/entries/combobox.tsx`（新建）
`comboboxDoc`，slug `combobox`，category `actions-inputs`，baseUi `Combobox`，3 example，api 覆盖 `items/value/defaultValue/onValueChange/onInputValueChange/...`，composition 说明"输入即过滤、选中填回 input、ItemIndicator 标记选中"，accessibility 含键盘导航。

---

### C. Toolbar（全新：variants/component/index/test/examples/registry）

#### C1. `src/Toolbar/toolbar-variants.ts`（新建）
```ts
// root：容器
export const toolbarVariants = cva([
  'inline-flex gap-1 rounded-input',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
], {
  variants: {
    orientation: { horizontal: 'flex-row items-center', vertical: 'flex-col' },
    variant: {
      solid: 'border border-border-visible bg-surface-raised p-1',
      ghost: 'border-0 bg-transparent p-0',
    },
    size: { sm: '', md: '', lg: '' },
    disabled: { true: 'opacity-40 pointer-events-none', false: '' },
  },
  defaultVariants: { orientation: 'horizontal', variant: 'solid', size: 'md', disabled: false },
})

export const toolbarGroupVariants = cva(['flex gap-1'], {
  variants: {
    orientation: { horizontal: 'flex-row items-center', vertical: 'flex-col' },
    variant: { grouped: 'rounded-sm bg-muted/40 p-0.5', plain: '' },
  },
  defaultVariants: { orientation: 'horizontal', variant: 'plain' },
})

// button：ghost 默认，accent 单点红
export const toolbarButtonVariants = cva([
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-sm',
  'font-mono text-foreground whitespace-nowrap select-none',
  '[-webkit-tap-highlight-color:transparent]',
  'transition-[background-color,color,scale] duration-200 ease-nothing motion-reduce:transition-none',
  'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-40',
  'active:not-disabled:scale-[0.97] motion-reduce:active:scale-100',
], {
  variants: {
    variant: {
      default: 'bg-transparent hover:not-disabled:bg-muted hover:not-disabled:text-foreground-display',
      accent: 'bg-accent text-white hover:not-disabled:opacity-90',
    },
    size: { sm: 'h-7 min-h-7 px-2 text-sm', md: 'h-9 min-h-9 px-3 text-sm', lg: 'h-11 min-h-11 px-4 text-base' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export const toolbarLinkVariants = cva([
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-sm',
  'font-mono text-foreground underline-offset-4 hover:not-disabled:text-foreground-display hover:underline',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  'focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
  'disabled:pointer-events-none disabled:opacity-40',
], { variants: { size: { sm: 'h-7 min-h-7 px-2 text-sm', md: 'h-9 min-h-9 px-3 text-sm', lg: 'h-11 min-h-11 px-4 text-base' } }, defaultVariants: { size: 'md' } })

export const toolbarInputVariants = cva([
  'w-full min-w-0 border-0 bg-transparent font-mono text-foreground outline-none',
  'placeholder:text-foreground-disabled',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
  'focus:bg-muted disabled:cursor-not-allowed disabled:opacity-40',
], { variants: { size: { sm: 'h-7 min-h-7 px-2 text-sm', md: 'h-9 min-h-9 px-3 text-sm', lg: 'h-11 min-h-11 px-4 text-base' } }, defaultVariants: { size: 'md' } })

// separator：方向默认与 toolbar 相反
export const toolbarSeparatorVariants = cva([
  'shrink-0 bg-border-visible',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
], {
  variants: {
    orientation: { horizontal: 'h-px w-full', vertical: 'w-px self-stretch' },
  },
  defaultVariants: { orientation: 'vertical' },
})

export type ToolbarOrientation = 'horizontal' | 'vertical'
export type ToolbarVariant = 'solid' | 'ghost'
export type ToolbarSize = 'sm' | 'md' | 'lg'
export type ToolbarButtonVariant = 'default' | 'accent'
```

#### C2. `src/Toolbar/Toolbar.tsx`（新建）
复合组件，ref-as-prop。`Toolbar` 默认 = Root。
```tsx
import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar'
import { toolbarVariants, toolbarGroupVariants, toolbarButtonVariants, toolbarLinkVariants, toolbarInputVariants, toolbarSeparatorVariants, type ToolbarOrientation, type ToolbarVariant, type ToolbarSize, type ToolbarButtonVariant } from './toolbar-variants'

export interface ToolbarProps extends React.ComponentPropsWithRef<typeof ToolbarPrimitive.Root> {
  orientation?: ToolbarOrientation
  variant?: ToolbarVariant
  size?: ToolbarSize
}
export function Toolbar({ className, orientation='horizontal', variant='solid', size='md', ref, ...props }: ToolbarProps) {
  return <ToolbarPrimitive.Root ref={ref} className={cn(toolbarVariants({orientation,variant,size}), className)}
    data-slot="toolbar" data-orientation={dataAttr(orientation)} data-variant={dataAttr(variant)} data-size={dataAttr(size)} {...props} />
}
Toolbar.displayName = 'Toolbar'

export interface ToolbarGroupProps extends React.ComponentPropsWithRef<typeof ToolbarPrimitive.Group> {
  orientation?: ToolbarOrientation; variant?: 'grouped'|'plain'
}
export function ToolbarGroup({ className, orientation='horizontal', variant='plain', ref, ...props }: ToolbarGroupProps) {
  return <ToolbarPrimitive.Group ref={ref} className={cn(toolbarGroupVariants({orientation,variant}), className)} data-slot="toolbar-group" {...props} />
}
ToolbarGroup.displayName = 'Toolbar.Group'

export interface ToolbarButtonProps extends React.ComponentPropsWithRef<typeof ToolbarPrimitive.Button> {
  variant?: ToolbarButtonVariant; size?: ToolbarSize
}
export function ToolbarButton({ className, variant='default', size='md', ref, ...props }: ToolbarButtonProps) {
  return <ToolbarPrimitive.Button ref={ref} className={cn(toolbarButtonVariants({variant,size}), className)} data-slot="toolbar-button" {...props} />
}
ToolbarButton.displayName = 'Toolbar.Button'

export function ToolbarLink({ className, size='md', ref, ...props }: React.ComponentPropsWithRef<typeof ToolbarPrimitive.Link> & { size?: ToolbarSize }) {
  return <ToolbarPrimitive.Link ref={ref} className={cn(toolbarLinkVariants({size}), className)} data-slot="toolbar-link" {...props} />
}
ToolbarLink.displayName = 'Toolbar.Link'

export function ToolbarInput({ className, size='md', ref, ...props }: React.ComponentPropsWithRef<typeof ToolbarPrimitive.Input> & { size?: ToolbarSize }) {
  return <ToolbarPrimitive.Input ref={ref} className={cn(toolbarInputVariants({size}), className)} data-slot="toolbar-input" {...props} />
}
ToolbarInput.displayName = 'Toolbar.Input'

export function ToolbarSeparator({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToolbarPrimitive.Separator>) {
  return <ToolbarPrimitive.Separator ref={ref} className={cn(toolbarSeparatorVariants(), className)} data-slot="toolbar-separator" {...props} />
}
ToolbarSeparator.displayName = 'Toolbar.Separator'

Toolbar.Group = ToolbarGroup
Toolbar.Button = ToolbarButton
Toolbar.Link = ToolbarLink
Toolbar.Input = ToolbarInput
Toolbar.Separator = ToolbarSeparator

export { toolbarVariants, toolbarGroupVariants, toolbarButtonVariants, toolbarLinkVariants, toolbarInputVariants, toolbarSeparatorVariants }
export default Toolbar
```

#### C3. `src/Toolbar/index.ts`（新建）
导出 `Toolbar`、各复合子组件、所有 variants、类型、`default`。

#### C4. `src/Toolbar/Toolbar.test.tsx`（新建）
- 根元素 `role="toolbar"` 且 `data-slot="toolbar"`、`data-orientation`/`data-variant`/`data-size`；
- `Toolbar.Button` 渲染为 `<button>` 带 `data-slot="toolbar-button"`；
- `Toolbar.Separator` 带 `data-slot="toolbar-separator"`；
- 方向键在 button 间移动焦点（Base UI roving tabindex）：聚焦第一个 button 后按 → 焦点移到第二个；
- `disabled` 整组禁用；`accent` button 含 `bg-accent`；ref-as-prop。

#### C5–C7. 示例（新建）
- `site/examples/toolbar/basic.tsx`：水平 toolbar + 3 个 button + separator + accent button。
- `site/examples/toolbar/orientation.tsx`：垂直 toolbar + size 三档。
- `site/examples/toolbar/with-input.tsx`：含 `Toolbar.Input` + `Toolbar.Link` + `Group`。

#### C8. `src/site/registry/entries/toolbar.tsx`（新建）
`toolbarDoc`，slug `toolbar`，category `navigation`，baseUi `Toolbar`，3 example，api 覆盖 `Toolbar`（orientation/variant/size/disabled）+ `Toolbar.Button`（variant/size）+ `Toolbar.Group/Separator/Input/Link`，composition 说明复合结构与 roving tabindex，accessibility 含方向键导航 + `loopFocus`。

---

### D. 生成 subpath 入口

```bash
npm run sync:subpaths
```
自动生成 `src/subpath/autocomplete.ts`、`src/subpath/combobox.ts`、`src/subpath/toolbar.ts`（内容 `export * from '@/Autocomplete'` 等），使 `import { Autocomplete } from 'aios-ui-kit/autocomplete'` 可用。

---

## 验证步骤

1. **回读校验**：逐个 `Read` 新建的 `index.ts`/`*.tsx`，确认导入路径、`displayName`、复合挂载（`Toolbar.Group = ...`）、`export { default }` 均正确；确认 Autocomplete/Combobox 的 `AutocompletePrimitive`/`ComboboxPrimitive` 用法与 `index.parts.d.ts` 一致。
2. **类型检查**：`npm run type-check`（`tsc --noEmit`）通过，无 TS 报错。
3. **测试**：`npx vitest run src/Autocomplete src/Combobox src/Toolbar` 全部通过。
4. **subpath 校验**：`npm run sync:subpaths -- --check` 输出"已是最新"。
5. **示例导入**：确认示例中 `import { X } from 'aios-ui-kit/<kebab>'` 与生成的 subpath 文件名一致（autocomplete/combobox/toolbar）。

---

## 文件清单总览（新建）

**Autocomplete（4）**：`Autocomplete/index.ts`、`Autocomplete/Autocomplete.test.tsx`、`site/examples/autocomplete/{basic,with-label,clearable}.tsx`、`site/registry/entries/autocomplete.tsx`

**Combobox（8）**：`Combobox/combobox-variants.ts`、`Combobox/Combobox.tsx`、`Combobox/index.ts`、`Combobox/Combobox.test.tsx`、`site/examples/combobox/{basic,with-label,controlled}.tsx`、`site/registry/entries/combobox.tsx`

**Toolbar（8）**：`Toolbar/toolbar-variants.ts`、`Toolbar/Toolbar.tsx`、`Toolbar/index.ts`、`Toolbar/Toolbar.test.tsx`、`site/examples/toolbar/{basic,orientation,with-input}.tsx`、`site/registry/entries/toolbar.tsx`

**生成（3）**：`src/subpath/{autocomplete,combobox,toolbar}.ts`（由 `sync:subpaths` 生成）

**不修改**：`src/index.ts`、`src/site/registry/manifest.ts`、其他组件、`lib/`、`styles/`。
