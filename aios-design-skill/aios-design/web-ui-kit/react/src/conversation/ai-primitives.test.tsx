import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  Attachment,
  AttachmentList,
  BranchPicker,
  ConversationViewport,
  ConversationContent,
  KeywordTag,
  Message,
  MessageContent,
  MessageActions,
  MessageAction,
  MessageCopyAction,
  Response,
  Source,
  Sources,
} from './index'

describe('conversation AI primitives', () => {
  it('renders and removes attachments and tags', async () => {
    const remove = vi.fn()
    render(
      <AttachmentList>
        <Attachment label="brief.pdf" type="pdf" onRemove={remove} />
      </AttachmentList>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Remove brief.pdf/ }))
    expect(remove).toHaveBeenCalled()
    render(<KeywordTag onRemove={remove}>GPT</KeywordTag>)
    expect(screen.getByText('GPT').closest('[data-slot="keyword-tag"]')).toBeInTheDocument()
  })
  it('renders video attachments and exposes upload progress', () => {
    render(<Attachment label="demo.mp4" type="video" src="demo.mp4" loading progress={42} />)
    expect(screen.getByLabelText('demo.mp4')).toHaveAttribute('src', 'demo.mp4')
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42')
    expect(screen.getByRole('status')).toHaveTextContent('Uploading')
  })
  it('keeps branch navigation within boundaries', async () => {
    const previous = vi.fn()
    render(<BranchPicker current={1} total={2} onPrevious={previous} />)
    const button = screen.getByRole('button', { name: /Previous branch/ })
    expect(button).toBeDisabled()
    await userEvent.click(button)
    expect(previous).not.toHaveBeenCalled()
  })
  it('renders message composition and a log viewport', () => {
    render(
      <ConversationViewport>
        <ConversationContent>
          <Message>
            <MessageContent>Hello</MessageContent>
            <MessageActions>
              <MessageAction>Retry</MessageAction>
            </MessageActions>
          </Message>
        </ConversationContent>
      </ConversationViewport>,
    )
    expect(screen.getByRole('log')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })
  it('copies message text and invokes the action callback', async () => {
    const onClick = vi.fn()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    render(
      <Message>
        <MessageActions>
          <MessageCopyAction text="Hello" onClick={onClick} />
        </MessageActions>
      </Message>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Copy/ }))
    expect(writeText).toHaveBeenCalledWith('Hello')
    expect(onClick).toHaveBeenCalled()
  })
  it('renders GFM safely and secures external links', () => {
    render(
      <Response>
        {'|A|\n|-|\n|B|\n\n<script>alert(1)</script>\n\n[Open](https://example.com)'}
      </Response>,
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('<script>alert(1)</script>')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open' })).toHaveAttribute(
      'rel',
      expect.stringContaining('noopener'),
    )
  })
  it('renders controlled source disclosure', async () => {
    render(
      <Sources>
        <Source domain="example.com" title="Example" href="https://example.com" />
      </Sources>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Sources/ }))
    expect(screen.getByRole('link', { name: /Example/ })).toHaveAttribute('target', '_blank')
  })
})
