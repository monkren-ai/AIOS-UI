import { cva } from 'class-variance-authority'

export const streamingTextVariants = cva('whitespace-pre-wrap', {
  variants: {
    variant: {
      plain: '',
      fade: '',
      tail: '',
    },
  },
  defaultVariants: { variant: 'fade' },
})

export const streamingTextSegmentVariants = cva('aios-streaming-text__segment', {
  variants: {
    variant: {
      plain: '',
      fade: 'aios-streaming-text__segment--fade',
      tail: 'aios-streaming-text__segment--tail',
    },
  },
  defaultVariants: { variant: 'fade' },
})
