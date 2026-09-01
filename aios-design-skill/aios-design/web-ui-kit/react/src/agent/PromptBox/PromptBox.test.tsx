import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PromptBox, PromptBoxModelSelect } from './PromptBox'

describe('PromptBox', () => {
  it('renders the semantic shell and model select', () => {
    render(<PromptBox modelSelect={<PromptBoxModelSelect label="AIOS" />} />)
    expect(document.querySelector('[data-slot="prompt-box"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="prompt-box-model-select"]')).toBeInTheDocument()
  })

  it('submits text and exposes attachment and mention actions', () => {
    const onSubmit = vi.fn()
    const onAttach = vi.fn()
    const onMention = vi.fn()
    render(
      <PromptBox
        defaultValue="Inspect UI"
        onSubmit={onSubmit}
        onAttach={onAttach}
        onMention={onMention}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: '添加附件 / Add attachment' }))
    fireEvent.click(screen.getByRole('button', { name: '提及上下文 / Mention context' }))
    fireEvent.click(screen.getByRole('button', { name: '发送 / Send' }))
    expect(onAttach).toHaveBeenCalledOnce()
    expect(onMention).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledWith('Inspect UI')
  })

  it('switches to stop while running', () => {
    const onStop = vi.fn()
    render(<PromptBox running onStop={onStop} />)
    fireEvent.click(screen.getByRole('button', { name: '停止 / Stop' }))
    expect(onStop).toHaveBeenCalledOnce()
  })

  it('composes context bars and exposes voice lifecycle', () => {
    render(
      <PromptBox
        inset
        contextBefore={<span>Before</span>}
        contextAfter={<span>After</span>}
        voice="wave"
        voiceStatus="thinking"
        onVoiceToggle={() => undefined}
      />,
    )
    const root = document.querySelector('[data-slot="prompt-box"]')
    expect(root).toHaveAttribute('data-voice-status', 'thinking')
    expect(root).toHaveClass('px-3')
    expect(document.querySelector('[data-slot="prompt-box-context-before"]')).toHaveTextContent(
      'Before',
    )
    expect(document.querySelector('[data-slot="prompt-box-context-after"]')).toHaveTextContent(
      'After',
    )
    expect(
      screen.getByRole('button', { name: '语音处理中 / Processing voice input' }),
    ).toBeDisabled()
  })
})
