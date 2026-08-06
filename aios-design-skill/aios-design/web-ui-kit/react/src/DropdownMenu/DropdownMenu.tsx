import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import type { OverlaySide } from '@/ui/OverlayPortal'
import {
  dropdownMenuContentVariants,
  dropdownMenuItemIconVariants,
  dropdownMenuItemLabelVariants,
  dropdownMenuItemShortcutVariants,
  dropdownMenuItemVariants,
  dropdownMenuPositionerVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuTriggerVariants,
  dropdownMenuVariants,
  menubarDropdownVariants,
  menubarItemLabelVariants,
  menubarItemShortcutVariants,
  menubarItemVariants,
  menubarSeparatorVariants,
  menubarTriggerVariants,
  menubarVariants,
} from './dropdown-menu-variants'

export interface DropdownMenuItem {
  label?: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

export interface MenubarItem {
  label: string
  items?: DropdownMenuItem[]
}

export interface DropdownMenuProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  trigger?: React.ReactNode
  items: DropdownMenuItem[] | MenubarItem[]
  align?: 'start' | 'center' | 'end'
  side?: OverlaySide
  variant?: 'default' | 'menubar'
}

function DefaultDropdownMenu({
  className,
  trigger,
  items,
  align = 'start',
  side = 'bottom',
  variant: _variant,
  ref,
  ...props
}: DropdownMenuProps) {
  const defaultItems = items as DropdownMenuItem[]

  return (
    <div
      ref={ref}
      className={cn(dropdownMenuVariants(), className)}
      data-slot="dropdown-menu"
      data-variant="default"
      {...props}
    >
      <MenuPrimitive.Root>
        <MenuPrimitive.Trigger
          className={cn(dropdownMenuTriggerVariants())}
          data-slot="dropdown-menu-trigger"
        >
          {trigger}
        </MenuPrimitive.Trigger>
        <MenuPrimitive.Portal>
          <MenuPrimitive.Positioner
            className={cn(dropdownMenuPositionerVariants())}
            data-slot="dropdown-menu-positioner"
            side={side}
            align={align}
            sideOffset={4}
          >
            <MenuPrimitive.Popup
              className={cn(dropdownMenuContentVariants({ align }))}
              data-slot="dropdown-menu-content"
              data-align={dataAttr(align)}
            >
              {defaultItems.map((item, index) =>
                item.separator ? (
                  <MenuPrimitive.Separator
                    key={`sep-${index}`}
                    className={cn(dropdownMenuSeparatorVariants())}
                    data-slot="dropdown-menu-separator"
                  />
                ) : (
                  <MenuPrimitive.Item
                    key={`item-${index}`}
                    disabled={item.disabled}
                    onClick={item.onClick}
                    className={(state) =>
                      cn(
                        dropdownMenuItemVariants({
                          disabled: state.disabled,
                          highlighted: state.highlighted,
                        }),
                      )
                    }
                    data-slot="dropdown-menu-item"
                    data-disabled={dataAttr(item.disabled)}
                  >
                    {item.icon && (
                      <span
                        className={cn(dropdownMenuItemIconVariants())}
                        data-slot="dropdown-menu-item-icon"
                      >
                        {item.icon}
                      </span>
                    )}
                    <span
                      className={cn(dropdownMenuItemLabelVariants())}
                      data-slot="dropdown-menu-item-label"
                    >
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <span
                        className={cn(dropdownMenuItemShortcutVariants())}
                        data-slot="dropdown-menu-item-shortcut"
                      >
                        {item.shortcut}
                      </span>
                    )}
                  </MenuPrimitive.Item>
                ),
              )}
            </MenuPrimitive.Popup>
          </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
      </MenuPrimitive.Root>
    </div>
  )
}

DefaultDropdownMenu.displayName = 'DefaultDropdownMenu'

function MenubarVariant({
  className,
  items,
  trigger: _trigger,
  align: _align,
  side: _side,
  variant: _variant,
  ref,
  ...props
}: DropdownMenuProps) {
  const menubarItems = items as MenubarItem[]

  return (
    <MenubarPrimitive
      ref={ref}
      className={cn(menubarVariants(), className)}
      data-slot="dropdown-menu"
      data-variant="menubar"
      orientation="horizontal"
      {...props}
    >
      {menubarItems.map((item, index) => (
        <MenuPrimitive.Root key={index}>
          <MenuPrimitive.Trigger
            className={(state) => cn(menubarTriggerVariants({ active: state.open }))}
            data-slot="dropdown-menu-menubar-trigger"
          >
            {item.label}
          </MenuPrimitive.Trigger>
          <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
              className={cn(dropdownMenuPositionerVariants())}
              data-slot="dropdown-menu-positioner"
              side="bottom"
              align="start"
              sideOffset={4}
            >
              <MenuPrimitive.Popup
                className={cn(menubarDropdownVariants())}
                data-slot="dropdown-menu-menubar-content"
              >
                {item.items?.map((sub, subIndex) =>
                  sub.separator ? (
                    <MenuPrimitive.Separator
                      key={`sep-${subIndex}`}
                      className={cn(menubarSeparatorVariants())}
                      data-slot="dropdown-menu-menubar-separator"
                    />
                  ) : (
                    <MenuPrimitive.Item
                      key={`item-${subIndex}`}
                      disabled={sub.disabled}
                      onClick={sub.onClick}
                      className={(state) =>
                        cn(
                          menubarItemVariants({
                            disabled: state.disabled,
                            highlighted: state.highlighted,
                          }),
                        )
                      }
                      data-slot="dropdown-menu-menubar-item"
                      data-disabled={dataAttr(sub.disabled)}
                    >
                      <span
                        className={cn(menubarItemLabelVariants())}
                        data-slot="dropdown-menu-menubar-item-label"
                      >
                        {sub.label}
                      </span>
                      {sub.shortcut && (
                        <span
                          className={cn(menubarItemShortcutVariants())}
                          data-slot="dropdown-menu-menubar-item-shortcut"
                        >
                          {sub.shortcut}
                        </span>
                      )}
                    </MenuPrimitive.Item>
                  ),
                )}
              </MenuPrimitive.Popup>
            </MenuPrimitive.Positioner>
          </MenuPrimitive.Portal>
        </MenuPrimitive.Root>
      ))}
    </MenubarPrimitive>
  )
}

MenubarVariant.displayName = 'MenubarVariant'

export function DropdownMenu({ variant = 'default', ...props }: DropdownMenuProps) {
  if (variant === 'menubar') {
    return <MenubarVariant {...props} variant="menubar" />
  }
  return <DefaultDropdownMenu {...props} variant="default" />
}

DropdownMenu.displayName = 'DropdownMenu'

export {
  dropdownMenuContentVariants,
  dropdownMenuItemIconVariants,
  dropdownMenuItemLabelVariants,
  dropdownMenuItemShortcutVariants,
  dropdownMenuItemVariants,
  dropdownMenuPositionerVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuTriggerVariants,
  dropdownMenuVariants,
  menubarDropdownVariants,
  menubarItemLabelVariants,
  menubarItemShortcutVariants,
  menubarItemVariants,
  menubarSeparatorVariants,
  menubarTriggerVariants,
  menubarVariants,
}
export default DropdownMenu
