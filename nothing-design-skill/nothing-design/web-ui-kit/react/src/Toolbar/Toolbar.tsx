import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar'
import {
  toolbarButtonVariants,
  toolbarGroupVariants,
  toolbarLinkVariants,
  toolbarSeparatorVariants,
  toolbarVariants,
  type ToolbarOrientation,
  type ToolbarSize,
} from './toolbar-variants'

interface ToolbarContextValue {
  size: ToolbarSize
  orientation: ToolbarOrientation
  disabled: boolean
}

const ToolbarContext = React.createContext<ToolbarContextValue>({
  size: 'md',
  orientation: 'horizontal',
  disabled: false,
})

export interface ToolbarProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** 排布方向。 */
  orientation?: ToolbarOrientation
  /**
   * 工具条的可达名称（`aria-label`）。工具条必须有一个可达名称，否则读屏软件无法标识。
   */
  label?: string
  /** 子项高度阶梯，会下发给 `Toolbar.Button`。 */
  size?: ToolbarSize
  /** 禁用整个工具条。 */
  disabled?: boolean
  children: React.ReactNode
}

export function Toolbar({
  className,
  orientation = 'horizontal',
  label,
  size = 'md',
  disabled = false,
  children,
  ref,
  ...props
}: ToolbarProps) {
  const context = React.useMemo<ToolbarContextValue>(
    () => ({ size, orientation, disabled }),
    [size, orientation, disabled],
  )

  return (
    <ToolbarContext.Provider value={context}>
      <ToolbarPrimitive.Root
        ref={ref}
        className={cn(toolbarVariants({ orientation }), className)}
        orientation={orientation}
        disabled={disabled}
        aria-label={label}
        data-slot="toolbar"
        data-orientation={dataAttr(orientation)}
        data-size={dataAttr(size)}
        data-disabled={dataAttr(disabled)}
        {...props}
      >
        {children}
      </ToolbarPrimitive.Root>
    </ToolbarContext.Provider>
  )
}

Toolbar.displayName = 'Toolbar'

/* -------------------------------------------------------------------------- */
/* 复合导出                                                                     */
/* -------------------------------------------------------------------------- */

export interface ToolbarButtonProps
  extends Omit<React.ComponentPropsWithRef<typeof ToolbarPrimitive.Button>, 'size'> {
  /** 高度阶梯，缺省时取 `Toolbar` 上的 `size`。 */
  size?: ToolbarSize
  /** 按下态，映射到 `aria-pressed`，用于工具栏开关。 */
  pressed?: boolean
}

export function ToolbarButton({
  className,
  size,
  pressed,
  disabled,
  ref,
  ...props
}: ToolbarButtonProps) {
  const ctx = React.useContext(ToolbarContext)
  const activeSize = size ?? ctx.size
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn(toolbarButtonVariants({ size: activeSize, pressed }), className)}
      disabled={disabled ?? ctx.disabled}
      aria-pressed={pressed || undefined}
      data-slot="toolbar-button"
      data-size={dataAttr(activeSize)}
      data-pressed={dataAttr(pressed)}
      {...props}
    />
  )
}
ToolbarButton.displayName = 'Toolbar.Button'

export type ToolbarSeparatorProps = React.ComponentPropsWithRef<
  typeof ToolbarPrimitive.Separator
>

export function ToolbarSeparator({ className, ref, ...props }: ToolbarSeparatorProps) {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn(toolbarSeparatorVariants(), className)}
      data-slot="toolbar-separator"
      {...props}
    />
  )
}
ToolbarSeparator.displayName = 'Toolbar.Separator'

export type ToolbarGroupProps = React.ComponentPropsWithRef<typeof ToolbarPrimitive.Group>

export function ToolbarGroup({ className, ref, ...props }: ToolbarGroupProps) {
  return (
    <ToolbarPrimitive.Group
      ref={ref}
      className={cn(toolbarGroupVariants(), className)}
      data-slot="toolbar-group"
      {...props}
    />
  )
}
ToolbarGroup.displayName = 'Toolbar.Group'

export type ToolbarLinkProps = React.ComponentPropsWithRef<typeof ToolbarPrimitive.Link>

export function ToolbarLink({ className, ref, ...props }: ToolbarLinkProps) {
  return (
    <ToolbarPrimitive.Link
      ref={ref}
      className={cn(toolbarLinkVariants(), className)}
      data-slot="toolbar-link"
      {...props}
    />
  )
}
ToolbarLink.displayName = 'Toolbar.Link'

Toolbar.Group = ToolbarGroup
Toolbar.Button = ToolbarButton
Toolbar.Separator = ToolbarSeparator
Toolbar.Link = ToolbarLink

export {
  toolbarVariants,
  toolbarButtonVariants,
  toolbarSeparatorVariants,
  toolbarGroupVariants,
  toolbarLinkVariants,
}
export default Toolbar
