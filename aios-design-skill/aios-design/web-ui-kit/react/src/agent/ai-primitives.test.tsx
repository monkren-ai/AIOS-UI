import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  ActivityLabel,
  AssistantModal,
  AssistantPanel,
  ContextBar,
  ContextBarLabel,
  ContextBarTasks,
  Subagent,
  SubagentList,
  Terminal,
  TerminalLine,
} from './index'

describe('agent AI primitives', () => {
  it('announces activity and terminal status', () => {
    render(
      <>
        <ActivityLabel active />
        <Terminal command="npm test" running>
          <TerminalLine>running</TerminalLine>
        </Terminal>
      </>,
    )
    expect(
      screen.getByText('处理中 / Working').closest('[data-slot="activity-label"]'),
    ).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('运行中 / Running')).toBeInTheDocument()
  })
  it('opens and closes the assistant with Escape', async () => {
    render(<AssistantPanel>hello</AssistantPanel>)
    await userEvent.click(screen.getByRole('button', { name: /Open AI assistant/ }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Close AI assistant/ })[0]).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('exposes the assistant modal compatibility entry without forking behavior', async () => {
    render(<AssistantModal inline>modal content</AssistantModal>)
    await userEvent.click(screen.getByRole('button', { name: /Open AI assistant/ }))
    expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'assistant-panel')
    expect(screen.getByText('modal content')).toBeInTheDocument()
  })
  it('reports terminal failures and subagent errors', () => {
    render(
      <>
        <Terminal command="npm test" exitCode={1} />
        <Subagent name="review" status="error" error="Timed out" />
      </>,
    )
    expect(screen.getByText('exit 1')).toBeInTheDocument()
    expect(screen.getByText('Timed out')).toBeInTheDocument()
  })
  it('renders context tasks and subagents', async () => {
    const onSteer = vi.fn()
    render(
      <>
        <ContextBar>
          <ContextBarLabel status="loading" onSteer={onSteer}>
            Search
          </ContextBarLabel>
          <ContextBarTasks summary="1/2">Task</ContextBarTasks>
        </ContextBar>
        <SubagentList>
          <Subagent name="research" progress={50} />
        </SubagentList>
      </>,
    )
    await userEvent.click(screen.getByRole('button', { name: /Steer/ }))
    expect(onSteer).toHaveBeenCalled()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50')
  })
})
