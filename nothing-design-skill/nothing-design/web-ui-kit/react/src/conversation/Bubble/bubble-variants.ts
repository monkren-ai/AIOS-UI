import { cva } from 'class-variance-authority'

export const bubbleVariants = cva('nothing-bubble', {
  variants: {
    placement: {
      start: 'nothing-bubble--start',
      end: 'nothing-bubble--end',
    },
    variant: {
      filled: 'nothing-bubble--filled',
      outlined: 'nothing-bubble--outlined',
      borderless: 'nothing-bubble--borderless',
    },
    shape: {
      default: '',
      round: 'nothing-bubble--round',
      corner: 'nothing-bubble--corner',
    },
    loading: {
      true: 'nothing-bubble--loading',
      false: '',
    },
  },
  defaultVariants: {
    placement: 'start',
    variant: 'filled',
    shape: 'default',
    loading: false,
  },
})

export type BubbleVariants = typeof bubbleVariants
