import React from 'react'
import { WidgetCard, WidgetCardProps } from '../Card'

export type CardProp = boolean | Omit<WidgetCardProps, 'children'>

export interface WithCardProps {
  card?: CardProp
}

export function withWidgetCard<P extends object>(
  Component: React.ForwardRefExoticComponent<P & React.RefAttributes<any>>
): React.ForwardRefExoticComponent<P & WithCardProps & React.RefAttributes<any>>

export function withWidgetCard<P extends object>(
  Component: React.FC<P>
): React.FC<P & WithCardProps>

export function withWidgetCard<P extends object>(
  Component: React.FC<P> | React.ForwardRefExoticComponent<P & React.RefAttributes<any>>
) {
  const displayName = Component.displayName || Component.name || 'Component'

  const WithCard = React.forwardRef<any, P & WithCardProps>((props, ref) => {
    const { card, ...rest } = props

    const element = React.createElement(
      Component as React.ComponentType<P>,
      { ...(rest as P), ...(ref !== undefined ? { ref } : {}) } as P & { ref?: any }
    )

    if (card) {
      const cardProps = typeof card === 'object' ? card : {}
      return <WidgetCard {...cardProps}>{element}</WidgetCard>
    }

    return element
  })

  WithCard.displayName = `withWidgetCard(${displayName})`

  return WithCard
}
