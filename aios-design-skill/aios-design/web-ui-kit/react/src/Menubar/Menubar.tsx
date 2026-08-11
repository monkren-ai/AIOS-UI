import * as React from 'react'
import { Menubar as BaseMenubar } from '@base-ui/react/menubar'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cn, dataAttr } from '@/lib/utils'
import {
  dropdownMenuPositionerVariants,
  menubarDropdownVariants,
  menubarItemLabelVariants,
  menubarItemShortcutVariants,
  menubarItemVariants,
  menubarSeparatorVariants,
  menubarTriggerVariants,
} from '@/DropdownMenu/dropdown-menu-variants'
import { menubarRootVariants } from './menubar-variants'

export interface MenubarAction {
  label?: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
}

export interface MenubarMenu {
  label: string
  items: MenubarAction[]
}

export interface MenubarProps extends Omit<React.ComponentProps<typeof BaseMenubar>, 'children'> {
  items: MenubarMenu[]
  orientation?: 'horizontal' | 'vertical'
}

export function Menubar({ items, orientation = 'horizontal', className, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      className={cn(menubarRootVariants({ orientation }), className)}
      data-slot="menubar"
      data-orientation={dataAttr(orientation)}
      orientation={orientation}
      {...props}
    >
      {items.map((menu) => (
        <BaseMenu.Root key={menu.label}>
          <BaseMenu.Trigger
            className={(state) => cn(menubarTriggerVariants({ active: state.open }))}
            data-slot="menubar-trigger"
          >
            {menu.label}
          </BaseMenu.Trigger>
          <BaseMenu.Portal>
            <BaseMenu.Positioner
              className={cn(dropdownMenuPositionerVariants())}
              side={orientation === 'vertical' ? 'inline-end' : 'bottom'}
              align="start"
              sideOffset={4}
            >
              <BaseMenu.Popup className={cn(menubarDropdownVariants())} data-slot="menubar-content">
                {menu.items.map((item, index) =>
                  item.separator ? (
                    <BaseMenu.Separator
                      key={`separator-${index}`}
                      className={cn(menubarSeparatorVariants())}
                      data-slot="menubar-separator"
                    />
                  ) : (
                    <BaseMenu.Item
                      key={`${item.label}-${index}`}
                      className={(state) =>
                        cn(
                          menubarItemVariants({
                            disabled: state.disabled,
                            highlighted: state.highlighted,
                          }),
                        )
                      }
                      data-slot="menubar-item"
                      data-disabled={dataAttr(item.disabled)}
                      disabled={item.disabled}
                      onClick={item.onClick}
                    >
                      <span className={cn(menubarItemLabelVariants())}>{item.label}</span>
                      {item.shortcut && (
                        <span className={cn(menubarItemShortcutVariants())}>{item.shortcut}</span>
                      )}
                    </BaseMenu.Item>
                  ),
                )}
              </BaseMenu.Popup>
            </BaseMenu.Positioner>
          </BaseMenu.Portal>
        </BaseMenu.Root>
      ))}
    </BaseMenubar>
  )
}

Menubar.displayName = 'Menubar'
export { menubarRootVariants }
export default Menubar
