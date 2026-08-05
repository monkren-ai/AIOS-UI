import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { welcomeVariants } from './welcome-variants'
import './Welcome.css'

export type WelcomeSemanticType = 'root' | 'icon' | 'title' | 'description' | 'actions' | 'extra'

export interface WelcomeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof welcomeVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  actions?: React.ReactNode
  classNames?: Partial<Record<WelcomeSemanticType, string>>
  styles?: Partial<Record<WelcomeSemanticType, React.CSSProperties>>
}

export const Welcome = React.forwardRef<HTMLDivElement, WelcomeProps>(
  (
    {
      title,
      description,
      icon,
      extra,
      actions,
      className,
      style,
      classNames: userClassNames,
      styles: userStyles,
      variant,
      size,
      ...rest
    },
    ref,
  ) => {
    const { classNames, styles } = mergeSemanticProps<WelcomeSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })

    return (
      <div
        ref={ref}
        className={cn(welcomeVariants({ variant, size }), classNames.root, className)}
        style={{ ...styles.root, ...style }}
        data-slot="welcome"
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        {...rest}
      >
        {icon && (
          <div
            className={cn('nothing-welcome__icon', classNames.icon)}
            style={styles.icon}
            data-slot="welcome-icon"
          >
            {icon}
          </div>
        )}

        {title && (
          <div
            className={cn('nothing-welcome__title', classNames.title)}
            style={styles.title}
            data-slot="welcome-title"
          >
            {title}
          </div>
        )}

        {description && (
          <div
            className={cn('nothing-welcome__description', classNames.description)}
            style={styles.description}
            data-slot="welcome-description"
          >
            {description}
          </div>
        )}

        {actions && (
          <div
            className={cn('nothing-welcome__actions', classNames.actions)}
            style={styles.actions}
            data-slot="welcome-actions"
          >
            {actions}
          </div>
        )}

        {extra && (
          <div
            className={cn('nothing-welcome__extra', classNames.extra)}
            style={styles.extra}
            data-slot="welcome-extra"
          >
            {extra}
          </div>
        )}
      </div>
    )
  },
)

Welcome.displayName = 'Welcome'

export default Welcome
