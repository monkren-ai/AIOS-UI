import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Sender, type SenderProps } from '@/conversation/Sender'
import { promptBoxActionVariants, promptBoxVariants } from './prompt-box-variants'

export interface PromptBoxModelSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label: React.ReactNode
}

export function PromptBoxModelSelect({
  icon,
  label,
  className,
  ref,
  ...props
}: PromptBoxModelSelectProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex min-h-9 items-center gap-2 rounded-button px-2 text-sm text-foreground-muted hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive',
        className,
      )}
      data-slot="prompt-box-model-select"
      {...props}
    >
      {icon && <span aria-hidden>{icon}</span>}
      <span>{label}</span>
      <span aria-hidden>⌄</span>
    </button>
  )
}

export interface PromptBoxProps
  extends
    Omit<
      SenderProps,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'onSubmit'
      | 'onStop'
      | 'running'
      | 'prefix'
      | 'suffix'
      | 'footer'
      | 'modelSelect'
    >,
    VariantProps<typeof promptBoxVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  running?: boolean
  onStop?: () => void
  onAttach?: () => void
  onMention?: () => void
  onVoiceToggle?: () => void
  voice?: 'wave' | 'mic'
  voiceStatus?: 'idle' | 'inputting' | 'thinking'
  /** @deprecated Use voiceStatus="inputting" instead. */
  voiceActive?: boolean
  modelSelect?: React.ReactNode
  contextBefore?: React.ReactNode
  contextAfter?: React.ReactNode
  inset?: boolean
}

export function PromptBox({
  value,
  defaultValue,
  onValueChange,
  onSubmit,
  running = false,
  onStop,
  onAttach,
  onMention,
  onVoiceToggle,
  voice = 'mic',
  voiceStatus,
  voiceActive = false,
  modelSelect,
  contextBefore,
  contextAfter,
  inset = false,
  autoSize = true,
  placeholder = '输入提示或按 / 使用命令 / Type a prompt or press / for commands',
  density,
  className,
  ref,
  ...props
}: PromptBoxProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const hasLeadingActions = Boolean(onAttach || onMention)
  const resolvedVoiceStatus = voiceStatus ?? (voiceActive ? 'inputting' : 'idle')
  const voiceBusy = resolvedVoiceStatus === 'thinking'

  return (
    <div
      className={cn(promptBoxVariants({ density, inset }), className)}
      data-slot="prompt-box"
      data-running={running || undefined}
      data-voice-status={resolvedVoiceStatus}
    >
      {contextBefore && (
        <div className="mb-2" data-slot="prompt-box-context-before">
          {contextBefore}
        </div>
      )}
      <Sender
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onChange={onValueChange}
        onSubmit={onSubmit}
        running={running}
        onStop={onStop}
        autoSize={autoSize}
        placeholder={placeholder}
        prefix={
          hasLeadingActions ? (
            <div className="flex items-center gap-1" data-slot="prompt-box-leading-actions">
              {onAttach && (
                <button
                  type="button"
                  className={promptBoxActionVariants()}
                  onClick={onAttach}
                  aria-label="添加附件 / Add attachment"
                >
                  +
                </button>
              )}
              {onMention && (
                <button
                  type="button"
                  className={promptBoxActionVariants()}
                  onClick={onMention}
                  aria-label="提及上下文 / Mention context"
                >
                  @
                </button>
              )}
            </div>
          ) : undefined
        }
        footer={({ components: { SendButton, CancelButton } }) => (
          <div
            className="flex w-full items-center justify-between gap-2"
            data-slot="prompt-box-actions"
          >
            <span>{modelSelect}</span>
            <span className="flex items-center gap-2">
              {onVoiceToggle && (
                <button
                  type="button"
                  className={promptBoxActionVariants()}
                  onClick={onVoiceToggle}
                  disabled={voiceBusy}
                  aria-busy={voiceBusy || undefined}
                  aria-pressed={resolvedVoiceStatus === 'inputting'}
                  aria-label={
                    voiceBusy
                      ? '语音处理中 / Processing voice input'
                      : resolvedVoiceStatus === 'inputting'
                        ? '停止语音输入 / Stop voice input'
                        : '开始语音输入 / Start voice input'
                  }
                  data-slot="prompt-box-voice"
                  data-voice={voice}
                  data-status={resolvedVoiceStatus}
                >
                  {voice === 'wave' ? (
                    <span aria-hidden className="flex h-5 items-center gap-0.5">
                      {[8, 14, 10, 16, 8].map((height, index) => (
                        <span
                          key={index}
                          className={cn(
                            'w-0.5 bg-current',
                            resolvedVoiceStatus === 'inputting' &&
                              'animate-agent-pulse motion-reduce:animate-none',
                          )}
                          style={{
                            height,
                            animationDelay: `${index * 90}ms`,
                          }}
                        />
                      ))}
                    </span>
                  ) : resolvedVoiceStatus === 'inputting' ? (
                    '■'
                  ) : voiceBusy ? (
                    '…'
                  ) : (
                    '◉'
                  )}
                </button>
              )}
              {running ? <CancelButton /> : <SendButton />}
            </span>
          </div>
        )}
        {...props}
      />
      {contextAfter && (
        <div className="mt-2" data-slot="prompt-box-context-after">
          {contextAfter}
        </div>
      )}
    </div>
  )
}
