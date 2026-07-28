import { cva } from 'class-variance-authority'

export const thoughtChainVariants = cva('nothing-thought-chain', {
  variants: {
    line: {
      true: 'nothing-thought-chain--line',
      false: '',
      solid: 'nothing-thought-chain--line nothing-thought-chain--line-solid',
      dashed: 'nothing-thought-chain--line nothing-thought-chain--line-dashed',
      dotted: 'nothing-thought-chain--line nothing-thought-chain--line-dotted',
    },
  },
  defaultVariants: {
    line: true,
  },
})

export const thoughtChainItemVariants = cva('nothing-thought-chain__item', {
  variants: {
    status: {
      pending: 'nothing-thought-chain__item--pending',
      active: 'nothing-thought-chain__item--active',
      success: 'nothing-thought-chain__item--success',
      error: 'nothing-thought-chain__item--error',
    },
    collapsible: {
      true: 'nothing-thought-chain__item--collapsible',
      false: '',
    },
    expanded: {
      true: 'nothing-thought-chain__item--expanded',
      false: '',
    },
  },
  defaultVariants: {
    status: 'pending',
    collapsible: false,
    expanded: false,
  },
})

export type ThoughtChainVariants = typeof thoughtChainVariants
