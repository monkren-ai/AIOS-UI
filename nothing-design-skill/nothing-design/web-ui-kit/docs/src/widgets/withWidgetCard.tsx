import * as React from 'react'
import { WidgetCard, WidgetCardProps } from '@/Card'

export type CardProp = boolean | Omit<WidgetCardProps, 'children'>

export interface WithCardProps {
  card?: CardProp
}

type AnyComponent = React.ComponentType<Record<string, unknown>>

/**
 * 为 widget 子组件包一层 WidgetCard 容器。
 *
 * 接受 forwardRef 组件或普通函数组件，返回一个 forwardRef 组件，
 * 自动把 ref 透传给原始组件。
 */
export function withWidgetCard<P extends object>(
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<unknown>>,
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<unknown>>

export function withWidgetCard<P extends object>(
  Component: React.FC<P>,
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<unknown>>

export function withWidgetCard<P extends object>(Component: AnyComponent) {
  const displayName = Component.displayName || Component.name || 'Component'
  type Props = P & WithCardProps

  const WithCard = React.forwardRef<unknown, Props>((props, ref) => {
    const { card, ...rest } = props

    const element = React.createElement(Component, {
      ...(rest as P),
      ...(ref !== undefined ? { ref } : {}),
    })

    if (card) {
      const cardProps = typeof card === 'object' ? card : {}
      return <WidgetCard {...cardProps}>{element}</WidgetCard>
    }

    return element
  })

  WithCard.displayName = `withWidgetCard(${displayName})`

  return WithCard
}
