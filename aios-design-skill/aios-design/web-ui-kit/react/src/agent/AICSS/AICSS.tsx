import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import './AICSS.css'

export type AicssLocale = 'zh' | 'en'
export type AicssStatus = 'idle' | 'running' | 'done' | 'error'

const t = (locale: AicssLocale, zh: string, en: string) => (locale === 'zh' ? zh : en)

function Chevron({ open }: { open: boolean }) {
  return <span aria-hidden="true">{open ? '−' : '+'}</span>
}

export interface AicssThinkingStateProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string
  locale?: AicssLocale
}

export const AicssThinkingState = React.forwardRef<HTMLSpanElement, AicssThinkingStateProps>(
  ({ label, locale = 'zh', className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn('aios-aicss-thinking-state', className)}
      data-slot="aicss-thinking-state"
      {...props}
    >
      <span className="aios-aicss-pulse" aria-hidden="true" />
      {label ?? t(locale, '思考中', 'Thinking')}
    </span>
  ),
)
AicssThinkingState.displayName = 'AicssThinkingState'

export interface AicssThinkingReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
  summary?: React.ReactNode
  children: React.ReactNode
  status?: Extract<AicssStatus, 'running' | 'done'>
  durationSec?: number
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  locale?: AicssLocale
}

export const AicssThinkingReasoning = React.forwardRef<HTMLDivElement, AicssThinkingReasoningProps>(
  (
    {
      summary,
      children,
      status = 'running',
      durationSec,
      defaultOpen = true,
      open: controlledOpen,
      onOpenChange,
      locale = 'zh',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const open = controlledOpen ?? internalOpen
    const toggle = () => {
      if (controlledOpen === undefined) setInternalOpen(!open)
      onOpenChange?.(!open)
    }
    const done = status === 'done'
    const triggerLabel =
      done && durationSec != null
        ? t(locale, `已思考 ${durationSec}s`, `Thought for ${durationSec}s`)
        : t(locale, '思考与推理', 'Thinking + reasoning')

    return (
      <div
        ref={ref}
        className={cn('aios-aicss-disclosure', className)}
        data-slot="aicss-thinking-reasoning"
        data-open={dataAttr(open)}
        data-status={status}
        {...props}
      >
        <button
          type="button"
          className="aios-aicss-disclosure__trigger"
          onClick={toggle}
          aria-expanded={open}
        >
          {done ? (
            <span className="aios-aicss-thinking-state">{triggerLabel}</span>
          ) : (
            <AicssThinkingState label={triggerLabel} locale={locale} />
          )}
          <Chevron open={open} />
        </button>
        {open && (
          <div className="aios-aicss-disclosure__body" data-slot="aicss-thinking-reasoning-body">
            {summary && <div className="aios-aicss-disclosure__summary">{summary}</div>}
            {children}
          </div>
        )}
      </div>
    )
  },
)
AicssThinkingReasoning.displayName = 'AicssThinkingReasoning'

export interface AicssOrbsProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AicssStatus
  label?: string
  size?: 'sm' | 'md' | 'lg'
  locale?: AicssLocale
}

export const AicssOrbs = React.forwardRef<HTMLDivElement, AicssOrbsProps>(
  ({ status = 'running', label, size = 'md', locale = 'zh', className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-busy={status === 'running' || undefined}
      className={cn('aios-aicss-orbs', `aios-aicss-orbs--${size}`, className)}
      data-slot="aicss-orbs"
      data-status={status}
      {...props}
    >
      <span className="aios-aicss-orbs__rail" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>{label ?? t(locale, '处理中', 'Processing')}</span>
    </div>
  ),
)
AicssOrbs.displayName = 'AicssOrbs'

export interface AicssSearchResult {
  title: string
  url: string
  description?: string
}

export interface AicssWebSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  query: string
  results?: AicssSearchResult[]
  status?: AicssStatus
  defaultOpen?: boolean
  locale?: AicssLocale
}

export const AicssWebSearch = React.forwardRef<HTMLDivElement, AicssWebSearchProps>(
  (
    {
      query,
      results = [],
      status = 'done',
      defaultOpen = true,
      locale = 'zh',
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(defaultOpen)
    return (
      <div
        ref={ref}
        className={cn('aios-aicss-tool', className)}
        data-slot="aicss-web-search"
        data-status={status}
        {...props}
      >
        <button
          type="button"
          className="aios-aicss-tool__header"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="aios-aicss-tool__kind">{t(locale, '搜索', 'Searching')}</span>
          <span className="aios-aicss-tool__subject">“{query}”</span>
          <Chevron open={open} />
        </button>
        {open && results.length > 0 && (
          <ul className="aios-aicss-search-results" data-slot="aicss-web-search-results">
            {results.map((result) => (
              <li key={result.url}>
                <a href={result.url} target="_blank" rel="noreferrer">
                  <span>{result.title}</span>
                  <small>{result.url}</small>
                </a>
                {result.description && <p>{result.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
)
AicssWebSearch.displayName = 'AicssWebSearch'

export type AicssDiffLineType = 'context' | 'add' | 'remove'
export interface AicssDiffLine {
  oldLine?: number
  newLine?: number
  type?: AicssDiffLineType
  content: string
}

export interface AicssFileDiffProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string
  lines: AicssDiffLine[]
  locale?: AicssLocale
}

export const AicssFileDiff = React.forwardRef<HTMLDivElement, AicssFileDiffProps>(
  ({ filename, lines, locale = 'zh', className, ...props }, ref) => {
    const additions = lines.filter((line) => line.type === 'add').length
    const removals = lines.filter((line) => line.type === 'remove').length
    return (
      <figure
        ref={ref}
        className={cn('aios-aicss-code-frame', className)}
        data-slot="aicss-file-diff"
        {...props}
      >
        <figcaption className="aios-aicss-code-frame__header">
          <span>{filename}</span>
          <span
            aria-label={t(
              locale,
              `${additions} 行新增，${removals} 行删除`,
              `${additions} additions, ${removals} deletions`,
            )}
          >
            +{additions} / −{removals}
          </span>
        </figcaption>
        <code className="aios-aicss-diff">
          {lines.map((line, index) => (
            <span
              key={`${line.oldLine}-${line.newLine}-${index}`}
              className={`aios-aicss-diff__line aios-aicss-diff__line--${line.type ?? 'context'}`}
            >
              <span>{line.oldLine ?? ''}</span>
              <span>{line.newLine ?? ''}</span>
              <span>{line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '}</span>
              <span>{line.content}</span>
            </span>
          ))}
        </code>
      </figure>
    )
  },
)
AicssFileDiff.displayName = 'AicssFileDiff'

export interface AicssImageGenerationProps extends React.HTMLAttributes<HTMLElement> {
  src?: string
  alt?: string
  prompt: string
  width?: number
  height?: number
  progress?: number
  status?: AicssStatus
  locale?: AicssLocale
}

export const AicssImageGeneration = React.forwardRef<HTMLElement, AicssImageGenerationProps>(
  (
    {
      src,
      alt = '',
      prompt,
      width,
      height,
      progress,
      status = 'running',
      locale = 'zh',
      className,
      ...props
    },
    ref,
  ) => (
    <figure
      ref={ref}
      className={cn('aios-aicss-image', className)}
      data-slot="aicss-image-generation"
      data-status={status}
      {...props}
    >
      <div className="aios-aicss-image__preview">
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <div className="aios-aicss-image__placeholder" aria-hidden="true" />
        )}
        {(width || height) && (
          <span className="aios-aicss-image__dimensions">
            {width ?? '—'} × {height ?? '—'}
          </span>
        )}
        {progress !== undefined && (
          <span
            className="aios-aicss-image__progress"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        )}
      </div>
      <figcaption>
        <strong>
          {status === 'done'
            ? t(locale, '图像已生成', 'Image generated')
            : t(locale, '正在生成图像', 'Generating image')}
        </strong>
        <span>“{prompt}”</span>
      </figcaption>
    </figure>
  ),
)
AicssImageGeneration.displayName = 'AicssImageGeneration'

export interface AicssTextResponseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const AicssTextResponse = React.forwardRef<HTMLDivElement, AicssTextResponseProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('aios-aicss-text-response', className)}
      data-slot="aicss-text-response"
      {...props}
    >
      {children}
    </div>
  ),
)
AicssTextResponse.displayName = 'AicssTextResponse'

export interface AicssStreamingTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string
  streaming?: boolean
}

export const AicssStreamingText = React.forwardRef<HTMLParagraphElement, AicssStreamingTextProps>(
  ({ text, streaming = true, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('aios-aicss-streaming-text', className)}
      data-slot="aicss-streaming-text"
      data-streaming={dataAttr(streaming)}
      aria-live="polite"
      {...props}
    >
      {text}
      {streaming && <span className="aios-aicss-streaming-text__cursor" aria-hidden="true" />}
    </p>
  ),
)
AicssStreamingText.displayName = 'AicssStreamingText'

export interface AicssCitation {
  id: string
  title: string
  url: string
  domain?: string
}

export interface AicssInlineCitationsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  citations: AicssCitation[]
  locale?: AicssLocale
}

export const AicssInlineCitations = React.forwardRef<HTMLDivElement, AicssInlineCitationsProps>(
  ({ children, citations, locale = 'zh', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('aios-aicss-citations', className)}
      data-slot="aicss-inline-citations"
      {...props}
    >
      <div className="aios-aicss-citations__content">{children}</div>
      <ol aria-label={t(locale, '引用来源', 'Sources')}>
        {citations.map((citation, index) => (
          <li key={citation.id}>
            <a href={citation.url} target="_blank" rel="noreferrer">
              <span>{index + 1}</span>
              {citation.title}
              <small>{citation.domain ?? new URL(citation.url).hostname}</small>
            </a>
          </li>
        ))}
      </ol>
    </div>
  ),
)
AicssInlineCitations.displayName = 'AicssInlineCitations'

export interface AicssCodeBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onCopy'> {
  code: string
  filename?: string
  language?: string
  showLineNumbers?: boolean
  onCopy?: (code: string) => void | Promise<void>
  locale?: AicssLocale
}

export const AicssCodeBlock = React.forwardRef<HTMLElement, AicssCodeBlockProps>(
  (
    {
      code,
      filename,
      language,
      showLineNumbers = true,
      onCopy,
      locale = 'zh',
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)
    const copy = async () => {
      if (onCopy) await onCopy(code)
      else if (typeof navigator !== 'undefined') await navigator.clipboard?.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    }
    return (
      <figure
        ref={ref}
        className={cn('aios-aicss-code-frame', className)}
        data-slot="aicss-code-block"
        {...props}
      >
        <figcaption className="aios-aicss-code-frame__header">
          <span>{filename ?? language ?? t(locale, '代码', 'Code')}</span>
          <button type="button" onClick={copy}>
            {copied ? t(locale, '已复制', 'Copied') : t(locale, '复制', 'Copy')}
          </button>
        </figcaption>
        <pre>
          <code>
            {code.split('\n').map((line, index) => (
              <span key={index} className="aios-aicss-code-line">
                {showLineNumbers && <span>{index + 1}</span>}
                <span>{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      </figure>
    )
  },
)
AicssCodeBlock.displayName = 'AicssCodeBlock'

export interface AicssTaskItem {
  id: string
  label: string
  completed?: boolean
  status?: AicssTaskStatus
}
export type AicssTaskStatus = 'pending' | 'in-progress' | 'done'
export interface AicssTaskListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title?: string
  tasks: AicssTaskItem[]
  onChange?: (tasks: AicssTaskItem[]) => void
  defaultOpen?: boolean
  locale?: AicssLocale
}

export const AicssTaskList = React.forwardRef<HTMLDivElement, AicssTaskListProps>(
  ({ title, tasks, onChange, defaultOpen = true, locale = 'zh', className, ...props }, ref) => {
    const [open, setOpen] = React.useState(defaultOpen)
    const resolved = tasks.map((task) => {
      const status: AicssTaskStatus = task.status ?? (task.completed ? 'done' : 'pending')
      return { ...task, status, completed: status === 'done' }
    })
    const done = resolved.filter((task) => task.status === 'done').length
    const inProgress = resolved.some((task) => task.status === 'in-progress')
    const toggle = (id: string) =>
      onChange?.(
        tasks.map((task) => {
          if (task.id !== id) return task
          const nextDone = !((task.status ?? (task.completed ? 'done' : 'pending')) === 'done')
          return { ...task, completed: nextDone, status: nextDone ? 'done' : 'pending' }
        }),
      )
    return (
      <div
        ref={ref}
        className={cn('aios-aicss-task-list', className)}
        data-slot="aicss-task-list"
        data-status={
          inProgress ? 'running' : done === tasks.length && tasks.length > 0 ? 'done' : 'idle'
        }
        {...props}
      >
        <button
          type="button"
          className="aios-aicss-tool__header"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span>{title ?? t(locale, '待办事项', 'To-dos')}</span>
          <span>
            {done}/{tasks.length}
          </span>
          <Chevron open={open} />
        </button>
        {open && (
          <ul>
            {resolved.map((task) => (
              <li key={task.id} data-status={task.status}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    onChange={() => toggle(task.id)}
                    disabled={!onChange}
                  />
                  <span>{task.label}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
)
AicssTaskList.displayName = 'AicssTaskList'

export interface AicssTableColumn<Row> {
  key: keyof Row | string
  header: React.ReactNode
  render?: (row: Row) => React.ReactNode
  align?: 'start' | 'center' | 'end'
}
export interface AicssDataTableProps<Row extends Record<string, unknown>> extends Omit<
  React.TableHTMLAttributes<HTMLTableElement>,
  'children'
> {
  columns: AicssTableColumn<Row>[]
  rows: Row[]
  rowKey?: (row: Row, index: number) => React.Key
  caption?: string
}

function renderCellValue(value: unknown): React.ReactNode {
  return React.isValidElement(value) ? value : String(value ?? '')
}

export function AicssDataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  caption,
  className,
  ...props
}: AicssDataTableProps<Row>) {
  return (
    <div className="aios-aicss-table-wrap" data-slot="aicss-data-table">
      <table className={cn('aios-aicss-table', className)} {...props}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} style={{ textAlign: column.align }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKey?.(row, index) ?? index}>
              {columns.map((column) => (
                <td key={String(column.key)} style={{ textAlign: column.align }}>
                  {column.render ? column.render(row) : renderCellValue(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export interface AicssComparisonFeature {
  feature: React.ReactNode
  values: Record<string, React.ReactNode | boolean | null>
}
export interface AicssComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: string[]
  features: AicssComparisonFeature[]
  caption?: string
  locale?: AicssLocale
}

export const AicssComparisonTable = React.forwardRef<HTMLDivElement, AicssComparisonTableProps>(
  ({ plans, features, caption, locale = 'zh', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('aios-aicss-table-wrap', className)}
      data-slot="aicss-comparison-table"
      {...props}
    >
      <table className="aios-aicss-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th>{t(locale, '功能', 'Feature')}</th>
            {plans.map((plan) => (
              <th key={plan}>{plan}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <th scope="row">{feature.feature}</th>
              {plans.map((plan) => {
                const value = feature.values[plan]
                return (
                  <td
                    key={plan}
                    aria-label={
                      value === true
                        ? t(locale, '支持', 'Included')
                        : value === false || value == null
                          ? t(locale, '不支持', 'Not included')
                          : undefined
                    }
                  >
                    {value === true ? '✓' : value === false || value == null ? '—' : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
)
AicssComparisonTable.displayName = 'AicssComparisonTable'

export interface AicssAgentInputProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'onSubmit' | 'value'
> {
  value?: string
  defaultValue?: string
  loading?: boolean
  enhancing?: boolean
  model?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onAttach?: () => void
  onEnhance?: () => void
  onCancel?: () => void
  locale?: AicssLocale
}

export const AicssAgentInput = React.forwardRef<HTMLTextAreaElement, AicssAgentInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      loading = false,
      enhancing = false,
      model,
      onChange,
      onSubmit,
      onAttach,
      onEnhance,
      onCancel,
      locale = 'zh',
      placeholder,
      disabled,
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue ?? internalValue
    const submit = () => {
      if (!value.trim() || loading || disabled) return
      onSubmit?.(value)
      if (controlledValue === undefined) setInternalValue('')
    }
    return (
      <div
        className={cn('aios-aicss-agent-input', className)}
        data-slot="aicss-agent-input"
        data-loading={dataAttr(loading)}
        data-enhancing={dataAttr(enhancing)}
        data-filled={dataAttr(Boolean(value.trim()))}
      >
        <textarea
          ref={ref}
          value={value}
          placeholder={placeholder ?? t(locale, '询问 AI Agent', 'Ask AI Agent')}
          disabled={disabled}
          readOnly={loading}
          rows={2}
          onChange={(event) => {
            if (controlledValue === undefined) setInternalValue(event.target.value)
            onChange?.(event.target.value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault()
              submit()
            } else onKeyDown?.(event)
          }}
          {...props}
        />
        <div className="aios-aicss-agent-input__actions">
          {onAttach && (
            <button
              type="button"
              onClick={onAttach}
              aria-label={t(locale, '添加附件', 'Add attachment')}
            >
              +
            </button>
          )}
          {onEnhance && (
            <button
              type="button"
              onClick={onEnhance}
              disabled={!value.trim() || loading || enhancing || disabled}
              aria-label={t(locale, '增强提示词', 'Enhance prompt')}
            >
              {enhancing ? t(locale, '增强中', 'Enhancing') : t(locale, '增强', 'Enhance')}
            </button>
          )}
          {model && <span>{model}</span>}
          <button
            type="button"
            onClick={loading ? onCancel : submit}
            disabled={!loading && (!value.trim() || disabled)}
          >
            {loading ? t(locale, '停止', 'Stop') : t(locale, '发送', 'Send')}
          </button>
        </div>
      </div>
    )
  },
)
AicssAgentInput.displayName = 'AicssAgentInput'

export type AicssApprovalVariant = 'questions' | 'command' | 'plan'

export interface AicssApprovalQuestion {
  id: string
  prompt: string
  options: string[]
}

export interface AicssApprovalPlanStep {
  id: string
  title: string
  detail?: string
}

export interface AicssApprovalCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  variant?: AicssApprovalVariant
  questions?: AicssApprovalQuestion[]
  command?: string
  cwd?: string
  plan?: AicssApprovalPlanStep[]
  planTitle?: string
  planSummary?: string
  planPreviewCount?: number
  title?: string
  approveLabel?: string
  rejectLabel?: string
  onApprove?: (payload?: { answers?: Record<string, string> }) => void
  onReject?: () => void
  locale?: AicssLocale
}

export const AicssApprovalCard = React.forwardRef<HTMLDivElement, AicssApprovalCardProps>(
  (
    {
      variant = 'questions',
      questions = [],
      command,
      cwd,
      plan = [],
      planTitle,
      planSummary,
      planPreviewCount = 3,
      title,
      approveLabel,
      rejectLabel,
      onApprove,
      onReject,
      locale = 'zh',
      className,
      ...props
    },
    ref,
  ) => {
    const [answers, setAnswers] = React.useState<Record<string, string>>({})
    const [otherSelected, setOtherSelected] = React.useState<Record<string, boolean>>({})
    const [customDraft, setCustomDraft] = React.useState<Record<string, string>>({})
    const [step, setStep] = React.useState(0)
    const [planExpanded, setPlanExpanded] = React.useState(false)

    const safeStep = Math.min(step, Math.max(questions.length - 1, 0))
    const allAnswered =
      questions.length > 0 && questions.every((question) => Boolean(answers[question.id]?.trim()))
    const previewCount = Math.max(0, planPreviewCount)
    const planPreview = plan.slice(0, previewCount)
    const planRest = plan.slice(previewCount)
    const hasPlanMore = planRest.length > 0

    const resolvedTitle =
      title ??
      (variant === 'questions'
        ? t(locale, '问题', 'Questions')
        : variant === 'command'
          ? t(locale, '运行这条命令？', 'Run this command?')
          : t(locale, '计划概览', 'Plan Overview'))
    const resolvedApprove =
      approveLabel ??
      (variant === 'questions'
        ? t(locale, '继续', 'Continue')
        : variant === 'command'
          ? t(locale, '运行', 'Run')
          : t(locale, '批准', 'Approve'))
    const resolvedReject = rejectLabel ?? t(locale, '跳过', 'Skip')
    const canContinue = variant !== 'questions' || allAnswered

    const isOtherChoice = (question: AicssApprovalQuestion) => {
      if (otherSelected[question.id]) return true
      const answer = answers[question.id]
      return Boolean(answer) && !question.options.includes(answer)
    }

    const handleApprove = (nextAnswers?: Record<string, string>) => {
      if (variant === 'questions') {
        const next = nextAnswers ?? answers
        if (!questions.every((question) => Boolean(next[question.id]?.trim()))) return
        onApprove?.({ answers: next })
        return
      }
      onApprove?.()
    }

    const selectOption = (questionId: string, option: string) => {
      setOtherSelected((prev) => ({ ...prev, [questionId]: false }))
      setAnswers((prev) => ({ ...prev, [questionId]: option }))
      if (safeStep < questions.length - 1)
        setStep((current) => Math.min(current + 1, questions.length - 1))
    }

    const selectOther = (questionId: string) => {
      setOtherSelected((prev) => ({ ...prev, [questionId]: true }))
      const draft = customDraft[questionId]?.trim() ?? ''
      setAnswers((prev) => {
        const next = { ...prev }
        if (draft) next[questionId] = draft
        else delete next[questionId]
        return next
      })
    }

    const updateCustom = (questionId: string, text: string) => {
      setCustomDraft((prev) => ({ ...prev, [questionId]: text }))
      setOtherSelected((prev) => ({ ...prev, [questionId]: true }))
      setAnswers((prev) => {
        const next = { ...prev }
        const trimmed = text.trim()
        if (trimmed) next[questionId] = trimmed
        else delete next[questionId]
        return next
      })
    }

    const activeQuestion = questions[safeStep]
    const visiblePlan = planExpanded || !hasPlanMore ? plan : planPreview

    return (
      <div
        ref={ref}
        className={cn('aios-aicss-approval', className)}
        data-slot="aicss-approval-card"
        data-variant={variant}
        {...props}
      >
        <div className="aios-aicss-approval__head">
          <strong>{resolvedTitle}</strong>
          {variant === 'questions' && questions.length > 0 && (
            <span aria-live="polite">
              {safeStep + 1} / {questions.length}
            </span>
          )}
        </div>

        {variant === 'questions' && activeQuestion && (
          <div className="aios-aicss-approval__body" aria-live="polite">
            <p className="aios-aicss-approval__prompt">{activeQuestion.prompt}</p>
            <div
              role="radiogroup"
              aria-label={activeQuestion.prompt}
              className="aios-aicss-approval__options"
            >
              {activeQuestion.options.map((option, index) => {
                const selected =
                  answers[activeQuestion.id] === option && !isOtherChoice(activeQuestion)
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-selected={dataAttr(selected)}
                    onClick={() => selectOption(activeQuestion.id, option)}
                  >
                    <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                )
              })}
              <label
                className="aios-aicss-approval__other"
                data-selected={dataAttr(isOtherChoice(activeQuestion))}
              >
                <span aria-hidden="true">
                  {String.fromCharCode(65 + activeQuestion.options.length)}
                </span>
                <input
                  type="text"
                  value={
                    customDraft[activeQuestion.id] ??
                    (isOtherChoice(activeQuestion) &&
                    answers[activeQuestion.id] &&
                    !activeQuestion.options.includes(answers[activeQuestion.id])
                      ? answers[activeQuestion.id]
                      : '')
                  }
                  placeholder={t(locale, '其他…', 'Something else…')}
                  aria-label={t(
                    locale,
                    `自定义回答：${activeQuestion.prompt}`,
                    `Custom answer for: ${activeQuestion.prompt}`,
                  )}
                  onFocus={() => selectOther(activeQuestion.id)}
                  onChange={(event) => updateCustom(activeQuestion.id, event.target.value)}
                />
              </label>
            </div>
          </div>
        )}

        {variant === 'command' && (
          <div className="aios-aicss-approval__body">
            {cwd && <div className="aios-aicss-approval__cwd">{cwd}</div>}
            <pre className="aios-aicss-approval__command">{command}</pre>
          </div>
        )}

        {variant === 'plan' && (
          <div className="aios-aicss-approval__body">
            {planTitle && <div className="aios-aicss-approval__plan-title">{planTitle}</div>}
            {planSummary && <p className="aios-aicss-approval__plan-summary">{planSummary}</p>}
            <ul className="aios-aicss-approval__plan">
              {visiblePlan.map((stepItem) => (
                <li key={stepItem.id}>
                  <span>{stepItem.title}</span>
                  {stepItem.detail && <small>{stepItem.detail}</small>}
                </li>
              ))}
            </ul>
            {hasPlanMore && (
              <button
                type="button"
                className="aios-aicss-approval__more"
                aria-expanded={planExpanded}
                onClick={() => setPlanExpanded((open) => !open)}
              >
                {planExpanded
                  ? t(locale, '收起', 'Show less')
                  : t(locale, `还有 ${planRest.length} 步`, `${planRest.length} more`)}
              </button>
            )}
          </div>
        )}

        <div className="aios-aicss-approval__actions">
          {variant === 'questions' && (
            <div
              className="aios-aicss-approval__nav"
              aria-label={t(locale, '问题导航', 'Question navigation')}
            >
              <button
                type="button"
                disabled={safeStep <= 0}
                aria-label={t(locale, '上一题', 'Previous question')}
                onClick={() => setStep((current) => Math.max(current - 1, 0))}
              >
                ↑
              </button>
              <button
                type="button"
                disabled={safeStep >= questions.length - 1}
                aria-label={t(locale, '下一题', 'Next question')}
                onClick={() => setStep((current) => Math.min(current + 1, questions.length - 1))}
              >
                ↓
              </button>
            </div>
          )}
          <button type="button" onClick={onReject}>
            {resolvedReject}
          </button>
          <button type="button" disabled={!canContinue} onClick={() => handleApprove()}>
            {resolvedApprove}
          </button>
        </div>
      </div>
    )
  },
)
AicssApprovalCard.displayName = 'AicssApprovalCard'
