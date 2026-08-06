# 修订实施计划：完成 Autocomplete、Combobox、Toolbar 三个组件

> 本计划在 `.trae/documents/实现剩余组件-Autocomplete-Combobox-Toolbar.md` 基础上修订。原计划假设「不修改 `manifest.ts` 也能让测试通过」，经实地核对发现该假设不成立（见下文「关键发现」）。本计划是决策完整的可执行版本。

## 摘要

为 `aios-ui-kit`（Nothing-UI React 组件库，`REACT_ROOT/nothing-design-skill/nothing-design/web-ui-kit/react`）补齐 3 个组件：
- **Autocomplete**：component + variants 已就绪，补 `index.ts` / `test` / 3 个 examples / registry entry / manifest 条目。
- **Combobox**：从零实现（variants / component / index / test / 3 examples / registry entry / manifest 条目），单选，基于 `@base-ui/react/combobox`。
- **Toolbar**：从零实现（variants / component / index / test / 3 examples / registry entry / manifest 条目），复合组件，基于 `@base-ui/react/toolbar`。

外加：**修复 9 个既有 orphan entry 的 manifest 条目**，使 `registry.test.ts` 转绿。

所有组件通过 subpath 导入（`aios-ui-kit/autocomplete` 等）消费，由 `npm run sync:subpaths` 自动生成转发文件。

---

## 当前状态分析（实地核对）

### 包与依赖
- `package.json` name = `aios-ui-kit`，`@base-ui/react@^1.6.0` 已装。
- `@base-ui/react/package.json` 的 `exports` 确认含 `./combobox` 与 `./toolbar`（已逐行核对）。
- `combobox/index.d.mts` 确认 parts：`Root/Label/Trigger/Input/InputGroup/Popup/Positioner/List/Item/ItemIndicator/Value/Icon/Arrow/Backdrop/Portal/Empty/Group/GroupLabel/Row/Chips/Chip/ChipRemove/Clear/Status/Collection`。
- `toolbar/index.d.mts` 确认 parts：`Root/Group/Button/Link/Input/Separator` + `Orientation` 类型。
- `combobox/root/ComboboxRoot.d.mts` 确认 Root props：`items`、`value`/`defaultValue`/`onValueChange`（单选时 `Value | null`）、`onInputValueChange`、`isItemEqualToValue`、`multiple`、`autoHighlight`、`highlightItemOnHover`。
- `toolbar/root/ToolbarRoot.d.mts` 确认 Root props：`disabled`、`orientation`（默认 `'horizontal'`）、`loopFocus`（默认 `true`），渲染 `<div>`，接 `BaseUIComponentProps<'div'>`（即 className/ref 等都可透传）。

### Autocomplete 现状
- `src/Autocomplete/Autocomplete.tsx` ✅（ref-as-prop，复合导出 `Input/Content/List/Item/Empty` 已挂载，底部 `export { autocompleteVariants, autocompleteControlVariants, autocompleteItemVariants, autocompleteContentVariants }` + `export default`）。
- `src/Autocomplete/autocomplete-variants.ts` ✅——**实际导出 12 个 cva**（非原计划所说的 11 个）：`autocompleteVariants`、`autocompleteLabelVariants`、`autocompleteControlVariants`、`autocompleteInputVariants`、`autocompletePositionerVariants`、`autocompleteContentVariants`、`autocompleteListVariants`、`autocompleteItemVariants`、`autocompleteEmptyVariants`、`autocompleteIconVariants`、`autocompleteClearVariants`、`autocompleteErrorVariants`；类型 `AutocompleteSize`、`AutocompleteVariant`。
- ❌ 缺 `index.ts`、`Autocomplete.test.tsx`、`site/examples/autocomplete/*`、`site/registry/entries/autocomplete.tsx`、manifest 条目、subpath。

### Combobox / Toolbar 现状
- ❌ `src/Combobox/`、`src/Toolbar/` 目录均不存在，全套待建。

### ⚠️ 关键发现：registry 测试当前是红的
`src/site/registry/` 由两份强耦合的源组成：
1. `manifest.ts`——手维护的显式清单（`ENTRIES` 数组，侧栏/搜索用，同步加载）。
2. `entries/*.tsx`——完整 `ComponentDoc`，`import.meta.glob` 懒加载。

`registry.test.ts` 的 **"has no orphan entry file that the manifest forgot to list"** 用例（69-77 行）强制：**每个 `entries/*.tsx` 都必须在 `manifest.ts` 里有同名 slug**。实地运行确认当前失败：
```
× has no orphan entry file that the manifest forgot to list
AssertionError: button-group is missing from the manifest
```
即 9 个既有 entry（`button-group`、`copy-button`、`date-field`、`date-picker`、`field`、`fieldset`、`number-field`、`sparkline`、`time-field`）都是 orphan。`manifest.ts` 第 11 行注释亦写明：「新增组件页：在这里加一条，并在 `entries/` 下建同名文件」。

**结论**：原计划「不修改 `manifest.ts`」的约束与「测试通过」的验证目标互相矛盾。要使 registry 测试转绿，必须给所有 entry 配上 manifest 条目。

### 参照模板
- `src/NumberField/index.ts`：导出 component+类型、所有 variants、`type *Size`、`export { default }`。
- `src/Select/Select.tsx` + `select-variants.ts`：Combobox 的选中态参照（`selectItemVariants` 的 `selected:true` = `bg-muted text-foreground-display` + `before:` 2px 红条；`selectItemIndicatorVariants` = `ms-auto ps-2 text-caption text-interactive opacity-0 selected:opacity-100`）。
- `src/site/registry/entries/date-field.tsx`：registry entry 的字段范式（`ComponentDoc`：slug/name/category/status/baseUi/description(Bilingual)/preview/importStatement(含 `aios-ui-kit/`)/usageSnippet/composition/examples(`?raw`)/api/accessibility）。
- `src/site/registry/types.ts`：`ComponentDoc` 形状。
- `scripts/generate-subpaths.ts`：扫描 `src/` 下带 `index.ts` 的目录生成 `src/subpath/<kebab>.ts`（`export * from '@/<Pascal>'`），无需手写。

### 项目约定（已核对）
1. ref-as-prop：普通函数组件解构 `ref` 下传；禁 `forwardRef`。
2. CVA：每组件一个 `*-variants.ts`，导出多个 `cva` + 联合类型。
3. `data-slot="<kebab>"` + 按需 `data-size`/`data-variant`/`data-disabled`/`data-error`/`data-invalid`/`data-state`（用 `dataAttr`）。
4. 浮层：`Portal > Positioner(sideOffset,align) > Popup`；`bg-popover border-border-visible rounded-sm`；进出动画 `closed:/open:` + `duration-[var(--duration-spring-moderate)] ease-spring-moderate`，`motion-reduce:transition-none`。
5. tokens：`bg-surface-raised/bg-popover/border-border-visible/text-foreground/text-foreground-muted/text-foreground-disabled/bg-muted/bg-accent-subtle/text-accent`；圆角 `rounded-input/rounded-sm`；字号 `text-sm/text-base/text-label/text-caption/text-micro`；`font-mono`；过渡 `duration-200 ease-nothing`。无阴影/blur/渐变。
6. 错误态：`role="alert"`，`mt-xs font-mono text-label uppercase tracking-wide text-accent`（Autocomplete 现状）或 `text-caption text-error`（Select 现状）——Combobox 沿用 Autocomplete 的 `text-accent` 写法以保持输入类一致。
7. `index.ts`：导出 component+类型、所有 variants、`type *Size/*Variant`、`export { default }`。
8. 示例：`import { X } from 'aios-ui-kit/<kebab>'`，`export default function XBasic()`，外层 `mx-auto w-full max-w-xs`。

---

## 假设与决策

1. **修改 `manifest.ts`（偏离原「不改共享文件」约束）**：这是本计划与原计划唯一实质差异。原因：registry 测试强制每个 entry 配 manifest 条目，且当前已红。不修改则验证目标无法达成。修改仅限向 `ENTRIES` 数组追加条目（纯元数据，不动导出/逻辑）。
2. **同时修复 9 个既有 orphan**：只给 3 个新组件加 manifest、不修既有 9 个，registry 测试仍会在 `button-group` 处失败。故必须一并补齐 12 条 manifest 条目才能转绿。这些条目是低风险元数据（name/category/description/status），不改任何组件源码。
3. **Combobox 单选**：`multiple` 不实现（避免泛型与 chips 复杂度）。消费方用字符串 `value`；内部 `items.find` 在字符串与对象间映射，`isItemEqualToValue` 按 `value` 字段比较。
4. **Toolbar 复合**：`Toolbar`(=Root) + `Toolbar.Group/Button/Link/Input/Separator`，参照 Autocomplete 复合导出范式。Button 用 Base UI `ToolbarButton`（保留 roving tabindex），不复用独立 Button。
5. **Combobox 视觉=Autocomplete + 选中态**：复用相同 control/input/content/list/empty/icon/clear/error/label 变体结构；item 在 Autocomplete item 基础上加 `selected` 变体（取自 `selectItemVariants` 的 `selected:true`）与 `itemIndicator` 变体（取自 `selectItemIndicatorVariants`）。
6. **Toolbar 视觉**：默认 `solid`（`bg-surface-raised` + `border-border-visible` + `rounded-input` + `p-1`），`ghost`（透明无边框）；button 默认 `default`（hover `bg-muted`），`accent` 变体 `bg-accent text-white` 作为单点红主操作。
7. **不改其它共享文件**：`src/index.ts`（主 barrel）不动——与 NumberField 先例一致（NumberField 也未在主 barrel 出现）。侧栏由 `manifest.ts` 驱动，补齐 manifest 后即自动出现。
8. **subpath 由脚本生成**：`npm run sync:subpaths` 扫描带 `index.ts` 的目录自动生成 `src/subpath/{autocomplete,combobox,toolbar}.ts`，不手写。

> ⚠️ 决策 1、2 需用户确认（见文末「待确认决策」）。

---

## 拟定变更

### A. Autocomplete（补齐）

#### A1. `src/Autocomplete/index.ts`（新建）
镜像 `src/NumberField/index.ts` 与 `src/Select/index.ts`，按 `autocomplete-variants.ts` 实际 12 个 cva 导出：
```ts
export { Autocomplete, type AutocompleteProps, type AutocompleteOption } from './Autocomplete'
export type {
  AutocompleteInputProps, AutocompleteContentProps, AutocompleteListProps,
  AutocompleteItemProps, AutocompleteEmptyProps,
} from './Autocomplete'
export {
  autocompleteVariants, autocompleteLabelVariants, autocompleteControlVariants,
  autocompleteInputVariants, autocompletePositionerVariants, autocompleteContentVariants,
  autocompleteListVariants, autocompleteItemVariants, autocompleteEmptyVariants,
  autocompleteIconVariants, autocompleteClearVariants, autocompleteErrorVariants,
  type AutocompleteSize, type AutocompleteVariant,
} from './autocomplete-variants'
export { default } from './Autocomplete'
```

#### A2. `src/Autocomplete/Autocomplete.test.tsx`（新建）
参照 `src/Select/Select.test.tsx` + `src/NumberField/NumberField.test.tsx`，Vitest + RTL + userEvent：
- 渲染 input 带 `data-slot="autocomplete-input"` 与 placeholder；
- 输入后浮层打开、选项带 `data-slot="autocomplete-item"`（`waitFor` + `baseElement`）；
- 点击选项触发 `onValueChange`，参数为该 item 的 label（Autocomplete 的 value=输入文本，选中即把 label 填入 input）；
- `label`/`error`（`role="alert"`）/`disabled`（整组不可用）/`clearable`（清除按钮 `aria-label="Clear"`）；
- `size` 经 `data-size` 暴露；`ref` 指向根 `div`。

#### A3–A5. 示例（新建）
- `src/site/examples/autocomplete/basic.tsx`：`items=[{value:'utc',label:'UTC'},…]`，placeholder。
- `src/site/examples/autocomplete/with-label.tsx`：`label`/`size`(sm/md/lg)/`error`/`disabled` 三档。
- `src/site/examples/autocomplete/clearable.tsx`：`clearable` + `icon`，`defaultValue` 预填。

#### A6. `src/site/registry/entries/autocomplete.tsx`（新建）
`export const autocompleteDoc: ComponentDoc`，slug `autocomplete`，name `Autocomplete`，category `actions-inputs`，status `beta`，baseUi `Autocomplete`，3 个 example（`?raw` 导入源码），api 覆盖 `items/value/defaultValue/onValueChange/placeholder/label/error/disabled/size/variant/clearable/icon`，accessibility 含键盘（↑↓选择、Enter 填入、Esc 关闭）+ `motion-reduce`。`importStatement` 必须含 `aios-ui-kit/autocomplete`。

#### A7. `manifest.ts` 追加 autocomplete 条目（见 D 节统一处理）。

---

### B. Combobox（全新）

#### B1. `src/Combobox/combobox-variants.ts`（新建）
镜像 `autocomplete-variants.ts`，并增加选中态：
- `comboboxVariants`（root：`relative flex w-full flex-col gap-1`，size/disabled/hasError）
- `comboboxLabelVariants`、`comboboxControlVariants`（variant outline/soft + size + hasError + disabled）、`comboboxInputVariants`、`comboboxPositionerVariants`、`comboboxContentVariants`、`comboboxListVariants`、`comboboxEmptyVariants`、`comboboxIconVariants`、`comboboxClearVariants`、`comboboxErrorVariants`——均同 Autocomplete 对应变体。
- `comboboxItemVariants`：在 Autocomplete item 基础上加 `selected` 变体（取自 `selectItemVariants` 的 `selected:true`：`bg-muted text-foreground-display` + `before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-accent before:content-['']`）；保留 `size`/`highlighted`/`disabled`。
- `comboboxItemIndicatorVariants`（取自 `selectItemIndicatorVariants`：`ms-auto ps-2 text-caption text-interactive opacity-0 selected:opacity-100` + transition）。
- 类型：`ComboboxSize = 'sm'|'md'|'lg'`、`ComboboxVariant = 'outline'|'soft'`。

#### B2. `src/Combobox/Combobox.tsx`（新建）
结构参照 Autocomplete，**关键差异**：选中语义（value=选项 value 字符串）+ ItemIndicator。
- `ComboboxOption { value: string; label: string; disabled?: boolean }`。
- `ComboboxProps`：`items`、`value?: string | null`、`defaultValue?: string | null`、`onValueChange?: (value: string | null) => void`、`onInputValueChange?: (value: string) => void`、`placeholder`/`label`/`error`/`disabled`/`size`/`variant`/`clearable`/`icon`。
- 字符串↔对象映射：`selectedObj = controlled && value != null ? items.find(it => it.value === value) ?? null : null`；`defaultObj` 同理用 `defaultValue`。
- `handleValueChange(next: ComboboxOption | null)` → `onValueChange?.(next ? next.value : null)`。
- Root 传 `items={items}`、`value={controlled ? selectedObj : undefined}`、`defaultValue={controlled ? undefined : defaultObj}`、`onValueChange={handleValueChange}`、`onInputValueChange={handleInputValueChange}`、`isItemEqualToValue={(a,b) => a.value === b.value}`、`disabled`。
- `List` 用 render-prop `(item: ComboboxOption) => <Item value={item} disabled={item.disabled} className={(state) => comboboxItemVariants({size, selected: state.selected, highlighted: state.highlighted, disabled: state.disabled})}>{item.label}<ItemIndicator keepMounted className={comboboxItemIndicatorVariants}>✓</ItemIndicator></Item>`。
- `Empty` 需 `items` prop（按原计划核对 parts 的结论；实现时若类型报错则按实际签名调整）。
- 复合导出：至少 `ComboboxInput`/`ComboboxItem`/`ComboboxEmpty`（displayName `Combobox.Input` 等），参照 Autocomplete ref-as-prop 范式。
- `Combobox.displayName = 'Combobox'`，`export default Combobox`。

#### B3. `src/Combobox/index.ts`（新建）
导出 `Combobox`、`ComboboxProps`、`ComboboxOption`、复合子组件类型、所有 variants、`ComboboxSize/ComboboxVariant`、`export { default }`。

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
`comboboxDoc`，slug `combobox`，category `actions-inputs`，status `beta`，baseUi `Combobox`，3 example，api 覆盖 `items/value/defaultValue/onValueChange/onInputValueChange/...`，composition 说明「输入即过滤、选中填回 input、ItemIndicator 标记选中」，accessibility 含键盘导航。`importStatement` 含 `aios-ui-kit/combobox`。

#### B9. manifest 条目见 D 节。

---

### C. Toolbar（全新）

#### C1. `src/Toolbar/toolbar-variants.ts`（新建）
```ts
import { cva } from 'class-variance-authority'

export const toolbarVariants = cva([
  'inline-flex gap-1 rounded-input',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
], {
  variants: {
    orientation: { horizontal: 'flex-row items-center', vertical: 'flex-col' },
    variant: { solid: 'border border-border-visible bg-surface-raised p-1', ghost: 'border-0 bg-transparent p-0' },
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

export const toolbarSeparatorVariants = cva([
  'shrink-0 bg-border-visible',
  'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
], { variants: { orientation: { horizontal: 'h-px w-full', vertical: 'w-px self-stretch' } }, defaultVariants: { orientation: 'vertical' } })

export type ToolbarOrientation = 'horizontal' | 'vertical'
export type ToolbarVariant = 'solid' | 'ghost'
export type ToolbarSize = 'sm' | 'md' | 'lg'
export type ToolbarButtonVariant = 'default' | 'accent'
```

#### C2. `src/Toolbar/Toolbar.tsx`（新建）
复合组件，ref-as-prop。`Toolbar` 默认 = Root：
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

export function ToolbarSeparator({ className, orientation, ref, ...props }: React.ComponentPropsWithRef<typeof ToolbarPrimitive.Separator> & { orientation?: 'horizontal'|'vertical' }) {
  return <ToolbarPrimitive.Separator ref={ref} orientation={orientation} className={cn(toolbarSeparatorVariants({orientation: orientation ?? 'vertical'}), className)} data-slot="toolbar-separator" {...props} />
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
> 实现 note：`ToolbarPrimitive.Root` 的 `orientation`/`disabled`/`loopFocus` 透传由 `...props` 完成；Root 的 `Orientation` 类型与本地 `ToolbarOrientation` 一致。`Separator` 的 `orientation` 默认与 toolbar 相反（horizontal toolbar → vertical separator），故默认 `'vertical'`。

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
`toolbarDoc`，slug `toolbar`，category `navigation`，status `beta`，baseUi `Toolbar`，3 example，api 覆盖 `Toolbar`（orientation/variant/size/disabled）+ `Toolbar.Button`（variant/size）+ `Toolbar.Group/Separator/Input/Link`，composition 说明复合结构与 roving tabindex，accessibility 含方向键导航 + `loopFocus`。`importStatement` 含 `aios-ui-kit/toolbar`。

#### C9. manifest 条目见 D 节。

---

### D. 修复 `src/site/registry/manifest.ts`（追加 12 条）

向 `ENTRIES` 数组追加（保持最终按 name 排序——数组本身会被 `COMPONENT_MANIFEST = ENTRIES.sort(...)` 排序，故追加顺序不影响测试）：

**3 个新组件：**
- `autocomplete` / `Autocomplete` / `actions-inputs` / `beta`
- `combobox` / `Combobox` / `actions-inputs` / `beta`
- `toolbar` / `Toolbar` / `navigation` / `beta`

**9 个既有 orphan（仅补 manifest 元数据，不动其源码/entry）：**
- `button-group` / `ButtonGroup` / `actions-inputs`
- `copy-button` / `CopyButton` / `actions-inputs`
- `date-field` / `DateField` / `actions-inputs`
- `date-picker` / `DatePicker` / `actions-inputs`
- `field` / `Field` / `actions-inputs`
- `fieldset` / `Fieldset` / `actions-inputs`
- `number-field` / `NumberField` / `actions-inputs`
- `sparkline` / `Sparkline` / `data-display`
- `time-field` / `TimeField` / `actions-inputs`

每条含 `description: { zh, en }`（简短一句，风格对齐既有条目）与 `status`（新组件 `beta`，既有按其 registry entry 的 status 填；若不确定统一 `beta`，实现时以各自 entry 的 `status` 字段为准对齐——`registry.test.ts` 第 52-54 行只校验 slug/name/category，不校验 status/description 与 entry 一致，故 status 描述性差异不会导致测试失败）。

> category 取值须存在于 `categories.ts`（`actions-inputs`、`data-display`、`navigation` 均已被既有条目使用，已验证）。

---

### E. 生成 subpath 入口

```bash
npm run sync:subpaths
```
自动生成 `src/subpath/autocomplete.ts`、`src/subpath/combobox.ts`、`src/subpath/toolbar.ts`（内容 `export * from '@/Autocomplete'` 等）。`sync:subpaths -- --check` 用于校验。

---

## 验证步骤

1. **回读校验**：逐个 `Read` 新建文件，确认导入路径、`displayName`、复合挂载（`Toolbar.Group = ...` 等）、`export { default }`、`data-slot` 均正确；Combobox 的 `ComboboxPrimitive` 用法与 `combobox/index.d.mts` 一致（`Root/Input/InputGroup/Input/Clear/Portal/Positioner/Popup/List/Item/ItemIndicator/Empty`）。
2. **类型检查**：`npm run type-check`（`tsc --noEmit`）通过。
3. **组件测试**：`npx vitest run src/Autocomplete src/Combobox src/Toolbar` 全部通过。
4. **registry 测试转绿**：`npx vitest run src/site/registry/registry.test.ts`——orphan 用例由红转绿（12 条 manifest 补齐后）。
5. **subpath 校验**：`npm run sync:subpaths -- --check` 输出「已是最新」。
6. **示例导入**：确认示例中 `import { X } from 'aios-ui-kit/<kebab>'` 与生成的 subpath 文件名一致（autocomplete/combobox/toolbar）。

---

## 文件清单总览

**Autocomplete（5 新建）**：`Autocomplete/index.ts`、`Autocomplete/Autocomplete.test.tsx`、`site/examples/autocomplete/{basic,with-label,clearable}.tsx`、`site/registry/entries/autocomplete.tsx`

**Combobox（8 新建）**：`Combobox/combobox-variants.ts`、`Combobox/Combobox.tsx`、`Combobox/index.ts`、`Combobox/Combobox.test.tsx`、`site/examples/combobox/{basic,with-label,controlled}.tsx`、`site/registry/entries/combobox.tsx`

**Toolbar（8 新建）**：`Toolbar/toolbar-variants.ts`、`Toolbar/Toolbar.tsx`、`Toolbar/index.ts`、`Toolbar/Toolbar.test.tsx`、`site/examples/toolbar/{basic,orientation,with-input}.tsx`、`site/registry/entries/toolbar.tsx`

**修改（1）**：`src/site/registry/manifest.ts`——追加 12 条 `ENTRIES`（3 新 + 9 既有 orphan）

**生成（3）**：`src/subpath/{autocomplete,combobox,toolbar}.ts`（由 `sync:subpaths` 生成）

**不修改**：`src/index.ts`（主 barrel）、各组件源码（Autocomplete/Combobox/Toolbar 自身除外）、`lib/`、`styles/`、`categories.ts`、`types.ts`。

---

## ⚠️ 待确认决策（需用户拍板）

原任务指令「不要修改共享文件」与 registry 测试「每个 entry 必须在 manifest」互相冲突，且当前测试已红。两条可选路径：

- **路径 A（推荐，本计划默认）**：修改 `manifest.ts`，补齐 3 新 + 9 既有 orphan 共 12 条。registry 测试转绿，验证目标达成。代价：触碰一个「共享文件」，但仅追加元数据数组元素，零逻辑改动。
- **路径 B**：只补 3 个新组件的 manifest 条目，不动 9 个既有 orphan。则 `registry.test.ts` 仍在 `button-group` 处失败，验证步骤 4 无法通过；3 个新组件本身可用，但侧栏/搜索缺 9 个既有组件入口。

请确认走 A 还是 B。若选 A，是否同意一并修复 9 个既有 orphan（否则测试仍红）。
