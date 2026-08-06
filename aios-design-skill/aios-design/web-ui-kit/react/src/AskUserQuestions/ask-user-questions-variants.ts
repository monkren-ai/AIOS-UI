import { cva } from 'class-variance-authority'

/**
 * AskUserQuestions 的视觉变体。
 *
 * 容器色走 agent 专用的间接层（`--surface-agent` / `--border-agent` /
 * `--radius-agent-card`）而不是直接写 `bg-surface`：这几个变量存在的意义
 * 就是让整套 AI OS 组件能被一起重定向，绕过它就把这条口子堵死了。
 */
export const askUserQuestionsVariants = cva(
  [
    'flex max-w-[520px] flex-col',
    'rounded-[var(--radius-agent-card)] border border-[var(--border-agent)] bg-[var(--surface-agent)]',
    'font-body',
  ],
  {
    variants: {
      size: {
        sm: 'gap-2 p-2',
        md: 'gap-4 p-4',
        lg: 'gap-6 p-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 标题行。 */
export const askHeaderVariants = cva(['flex min-h-11 items-center gap-2'])

export const askTitleVariants = cva(['font-mono uppercase tracking-widest text-foreground-muted'], {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-label',
      lg: 'text-label',
    },
  },
  defaultVariants: { size: 'md' },
})

/** `01/04` 计数器。贴到行尾，RTL 下自动换边。 */
export const askCountVariants = cva(
  ['ms-auto font-mono tabular-nums tracking-widest text-foreground-disabled'],
  {
    variants: {
      size: {
        sm: 'text-caption',
        md: 'text-label',
        lg: 'text-label',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

/** 步骤舞台。高度固定住，免得换题时容器抖动。 */
export const askBodyVariants = cva(['relative min-h-[120px] overflow-hidden'])

/**
 * 单个步骤。
 *
 * 进场方向跟着 `direction` 走；keyframes 里的 `translateX` 是物理方向，
 * 所以 RTL 下直接把两条 keyframes 对调，而不是再写两条镜像的。
 */
export const askStepVariants = cva(['flex flex-col gap-4'], {
  variants: {
    direction: {
      forward: [
        'motion-safe:animate-[aios-ask-step-enter_0.35s_var(--ease-spring-moderate)_forwards]',
        'motion-safe:rtl:animate-[aios-ask-step-enter-back_0.35s_var(--ease-spring-moderate)_forwards]',
      ].join(' '),
      back: [
        'motion-safe:animate-[aios-ask-step-enter-back_0.35s_var(--ease-spring-moderate)_forwards]',
        'motion-safe:rtl:animate-[aios-ask-step-enter_0.35s_var(--ease-spring-moderate)_forwards]',
      ].join(' '),
    },
  },
  defaultVariants: { direction: 'forward' },
})

export const askQuestionVariants = cva(['flex flex-col gap-1'])

export const askQuestionTitleVariants = cva(['font-body text-foreground'], {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-subheading',
    },
  },
  defaultVariants: { size: 'md' },
})

/** 必填星号。 */
export const askRequiredVariants = cva(['ms-0.5 text-accent'])

export const askDescriptionVariants = cva(['font-body text-foreground-muted'], {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: { size: 'md' },
})

export const askRequiredHintVariants = cva(['font-mono uppercase tracking-widest text-accent'], {
  variants: {
    size: {
      sm: 'text-caption',
      md: 'text-caption',
      lg: 'text-caption',
    },
  },
  defaultVariants: { size: 'md' },
})

export const askInputVariants = cva(['flex flex-col gap-2'])

/** single 类型的选项排布。 */
export const askOptionsVariants = cva(['flex flex-wrap gap-2'])

export const askFooterVariants = cva([
  'flex items-center justify-between gap-2 border-t border-border pt-2',
])

export type AskUserQuestionsSize = 'sm' | 'md' | 'lg'
