import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ShowcaseProvider, type ShowcaseContextValue } from './ShowcaseContext'
import { AIPocPage } from './AIPocPage'

const mockContext: ShowcaseContextValue = {
  lang: 'zh',
  t: (zh: string, en: string) => (mockContext.lang === 'zh' ? zh : en),
  toggleLang: vi.fn(),
  preloadProjectIntro: vi.fn(),
  preloadAIPoc: vi.fn(),
  preloadShowcase: vi.fn(),
}

function renderPage() {
  return render(
    <BrowserRouter>
      <ShowcaseProvider value={mockContext}>
        <AIPocPage />
      </ShowcaseProvider>
    </BrowserRouter>,
  )
}

describe('AIPocPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers()
    })
    vi.useRealTimers()
  })

  it('renders initial AI welcome message', () => {
    renderPage()
    expect(screen.getByText('AIOS AI')).toBeInTheDocument()
    expect(screen.getByText(/你好，我是 AIOS AI/)).toBeInTheDocument()
  })

  async function typeAndSubmit(input: HTMLElement, value: string) {
    await userEvent.type(input, value)
    const sendButton = screen.getByRole('button', { name: '发送' })
    await userEvent.click(sendButton)
  }

  it('adds user bubble after submit', async () => {
    renderPage()
    const input = screen.getByPlaceholderText('输入消息，按 Enter 发送…')
    await typeAndSubmit(input, 'hello')
    expect(screen.getByText('YOU')).toBeInTheDocument()
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('does not add AI reply after cancel', async () => {
    renderPage()
    const input = screen.getByPlaceholderText('输入消息，按 Enter 发送…')
    await typeAndSubmit(input, 'hello')

    const stopButton = await screen.findByRole('button', { name: '停止' })
    expect(stopButton).toBeInTheDocument()

    await userEvent.click(stopButton)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    await waitFor(() => {
      expect(screen.queryByText(/你发送了/)).not.toBeInTheDocument()
    })
  })

  it('resets conversation to initial state', async () => {
    renderPage()
    const input = screen.getByPlaceholderText('输入消息，按 Enter 发送…')
    await typeAndSubmit(input, 'hello')

    const resetButton = screen.getByRole('button', { name: '重置当前会话' })
    await userEvent.click(resetButton)

    await waitFor(() => {
      expect(screen.queryByText('YOU')).not.toBeInTheDocument()
      expect(screen.getByText(/对话已重置/)).toBeInTheDocument()
    })
  })

  it('switches conversation and shows independent messages', async () => {
    renderPage()
    const input = screen.getByPlaceholderText('输入消息，按 Enter 发送…')
    await typeAndSubmit(input, 'hello')

    const newChatTab = screen.getByRole('tab', { name: /新会话/ })
    await userEvent.click(newChatTab)

    expect(screen.queryByText('YOU')).not.toBeInTheDocument()
    expect(screen.getByText(/选择一个推荐提示词/)).toBeInTheDocument()

    const defaultTab = screen.getByRole('tab', { name: /默认会话/ })
    await userEvent.click(defaultTab)

    expect(screen.getByText('YOU')).toBeInTheDocument()
  })

  it('fills sender when a prompt is clicked', async () => {
    renderPage()
    const newChatTab = screen.getByRole('tab', { name: /新会话/ })
    await userEvent.click(newChatTab)

    const promptButton = screen.getByRole('button', { name: /介绍一下 AIOS UI/ })
    await userEvent.click(promptButton)

    const input = screen.getByPlaceholderText('输入消息，按 Enter 发送…') as HTMLTextAreaElement
    expect(input.value).toBe('介绍一下 AIOS UI')
  })

  it('shows welcome with prompts on empty conversation', async () => {
    renderPage()
    const newChatTab = screen.getByRole('tab', { name: /新会话/ })
    await userEvent.click(newChatTab)

    expect(screen.getByText(/AIOS AI/)).toBeInTheDocument()
    expect(screen.getByText(/你可以这样问我/)).toBeInTheDocument()
    expect(document.querySelector('[data-slot="prompts"]')).toBeInTheDocument()
  })
})
