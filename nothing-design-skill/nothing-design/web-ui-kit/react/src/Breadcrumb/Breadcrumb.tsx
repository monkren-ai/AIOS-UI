import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  breadcrumbLinkVariants,
  breadcrumbVariants,
  type BreadcrumbSize,
} from './breadcrumb-variants'

export type BreadcrumbItem = {
  label: string
  href?: string
  onClick?: () => void
}

export type BreadcrumbProps = React.ComponentPropsWithRef<'nav'> & {
  items: BreadcrumbItem[]
  /** 字号。 */
  size?: BreadcrumbSize
  /** 层级之间的分隔符。 */
  separator?: string
}

export function Breadcrumb({
  className,
  items,
  size = 'md',
  separator = '/',
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      className={cn(breadcrumbVariants({ size }), className)}
      data-slot="breadcrumb"
      data-size={dataAttr(size)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol
        data-slot="breadcrumb-list"
        className="m-0 flex list-none flex-wrap items-center gap-0 p-0"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={index}
              data-slot="breadcrumb-item"
              data-current={dataAttr(isLast)}
              className="inline-flex items-center gap-1"
              aria-current={isLast ? 'page' : undefined}
            >
              {!isLast && item.href && (
                <a
                  data-slot="breadcrumb-link"
                  className={breadcrumbLinkVariants({ current: false })}
                  href={item.href}
                  onClick={
                    item.onClick
                      ? (e) => {
                          e.preventDefault()
                          item.onClick?.()
                        }
                      : undefined
                  }
                >
                  {item.label}
                </a>
              )}
              {!isLast && !item.href && item.onClick && (
                <button
                  data-slot="breadcrumb-link"
                  className={breadcrumbLinkVariants({ current: false })}
                  onClick={item.onClick}
                  type="button"
                >
                  {item.label}
                </button>
              )}
              {!isLast && !item.href && !item.onClick && (
                <span
                  data-slot="breadcrumb-link"
                  className={breadcrumbLinkVariants({ current: false })}
                >
                  {item.label}
                </span>
              )}
              {isLast && (
                <span
                  data-slot="breadcrumb-link"
                  className={breadcrumbLinkVariants({ current: true })}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  data-slot="breadcrumb-separator"
                  className="mx-1 select-none text-foreground-disabled"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'

export { breadcrumbVariants }
export default Breadcrumb
