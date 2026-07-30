import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import type { OverlaySide } from '@/ui/OverlayPortal'
import './DropdownMenu.css'

const dropdownMenuContentVariants = cva('nothing-dropdown-menu__content', {
  variants: {
    visible: { true: 'nothing-dropdown-menu__content--visible', false: '' },
    align: {
      start: 'nothing-dropdown-menu__content--start',
      center: 'nothing-dropdown-menu__content--center',
      end: 'nothing-dropdown-menu__content--end',
    },
  },
  defaultVariants: { visible: false, align: 'start' },
})

const dropdownMenuItemVariants = cva('nothing-dropdown-menu__item', {
  variants: {
    disabled: { true: 'nothing-dropdown-menu__item--disabled', false: '' },
    highlighted: { true: 'nothing-dropdown-menu__item--highlighted', false: '' },
  },
  defaultVariants: { disabled: false, highlighted: false },
})

const menubarTriggerVariants = cva('nothing-dropdown-menu__menubar-trigger', {
  variants: {
    active: { true: 'nothing-dropdown-menu__menubar-trigger--active', false: '' },
  },
  defaultVariants: { active: false },
})

const menubarDropdownVariants = cva('nothing-dropdown-menu__menubar-dropdown', {
  variants: {
    visible: { true: 'nothing-dropdown-menu__menubar-dropdown--visible', false: '' },
  },
  defaultVariants: { visible: false },
})

const menubarItemVariants = cva('nothing-dropdown-menu__menubar-item', {
  variants: {
    disabled: { true: 'nothing-dropdown-menu__menubar-item--disabled', false: '' },
    highlighted: { true: 'nothing-dropdown-menu__menubar-item--highlighted', false: '' },
  },
  defaultVariants: { disabled: false, highlighted: false },
})

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

export interface DropdownMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof dropdownMenuContentVariants> {
  trigger?: React.ReactNode
  items: DropdownMenuItem[] | MenubarItem[]
  align?: 'start' | 'center' | 'end'
  side?: OverlaySide
  variant?: 'default' | 'menubar'
}

const DefaultDropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, trigger, items, align = 'start', side = 'bottom', ...props }, ref) => {
    const defaultItems = items as DropdownMenuItem[]

    return (
      <div
        ref={ref}
        className={cn('nothing-dropdown-menu', className)}
        data-slot="dropdown-menu"
        data-variant="default"
        {...props}
      >
        <MenuPrimitive.Root>
          <MenuPrimitive.Trigger
            className="nothing-dropdown-menu__trigger"
            data-slot="dropdown-menu-trigger"
          >
            {trigger}
          </MenuPrimitive.Trigger>
          <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
              className="nothing-dropdown-menu__positioner"
              data-slot="dropdown-menu-positioner"
              side={side}
              align={align}
              sideOffset={4}
            >
              <MenuPrimitive.Popup
                className={cn(dropdownMenuContentVariants({ align }))}
                data-slot="dropdown-menu-content"
              >
                {defaultItems.map((item, index) =>
                  item.separator ? (
                    <MenuPrimitive.Separator
                      key={`sep-${index}`}
                      className="nothing-dropdown-menu__separator"
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
                        <span className="nothing-dropdown-menu__item-icon">{item.icon}</span>
                      )}
                      <span className="nothing-dropdown-menu__item-label">{item.label}</span>
                      {item.shortcut && (
                        <span className="nothing-dropdown-menu__item-shortcut">{item.shortcut}</span>
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
  },
)
DefaultDropdownMenu.displayName = 'DefaultDropdownMenu'

const MenubarVariant = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, items, ...props }, ref) => {
    const menubarItems = items as MenubarItem[]

    return (
      <MenubarPrimitive
        ref={ref}
        className={cn('nothing-dropdown-menu--menubar', className)}
        data-slot="dropdown-menu"
        data-variant="menubar"
        orientation="horizontal"
        {...props}
      >
        {menubarItems.map((item, index) => (
          <MenuPrimitive.Root key={index}>
            <MenuPrimitive.Trigger
              className={(state) =>
                cn(menubarTriggerVariants({ active: state.open }))
              }
              data-slot="dropdown-menu-menubar-trigger"
            >
              {item.label}
            </MenuPrimitive.Trigger>
            <MenuPrimitive.Portal>
              <MenuPrimitive.Positioner
                className="nothing-dropdown-menu__positioner"
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
                        className="nothing-dropdown-menu__menubar-separator"
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
                        <span className="nothing-dropdown-menu__menubar-item-label">
                          {sub.label}
                        </span>
                        {sub.shortcut && (
                          <span className="nothing-dropdown-menu__menubar-item-shortcut">
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
  },
)
MenubarVariant.displayName = 'MenubarVariant'

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ variant = 'default', ...props }, ref) => {
    if (variant === 'menubar') {
      return <MenubarVariant ref={ref} {...props} variant="menubar" />
    }
    return <DefaultDropdownMenu ref={ref} {...props} variant="default" />
  },
)
DropdownMenu.displayName = 'DropdownMenu'

export {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  menubarTriggerVariants,
  menubarDropdownVariants,
  menubarItemVariants,
}
export default DropdownMenu
