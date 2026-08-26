import { cva } from 'class-variance-authority'

export const messageVariants = cva('group/message flex w-full gap-3', {
  variants: {
    role: { assistant: 'justify-start', user: 'justify-end', system: 'justify-center' },
    variant: {
      plain: '',
      surface:
        '[&_[data-slot=message-body]]:border [&_[data-slot=message-body]]:border-border [&_[data-slot=message-body]]:bg-surface [&_[data-slot=message-body]]:p-3',
    },
  },
  defaultVariants: { role: 'assistant', variant: 'plain' },
})
