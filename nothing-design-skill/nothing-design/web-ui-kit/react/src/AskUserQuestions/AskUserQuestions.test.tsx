import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AskUserQuestions } from './AskUserQuestions'

const questions = [
  { id: 'name', title: 'What is your name?', type: 'text' as const, required: true },
  { id: 'role', title: 'Select a role', type: 'single' as const, options: ['Design', 'Engineering'], required: true },
  { id: 'tools', title: 'Pick tools', type: 'multiple' as const, options: ['Figma', 'React'] },
  { id: 'terms', title: 'Accept terms', type: 'confirm' as const, required: true },
]

describe('AskUserQuestions', () => {
  it('renders with data-slot', () => {
    render(<AskUserQuestions questions={questions} />)
    expect(screen.getByText('QUESTIONS').closest('[data-slot]')).toHaveAttribute('data-slot', 'ask-user-questions')
  })

  it('renders first question and progress', () => {
    render(<AskUserQuestions questions={questions} title="Survey" />)
    expect(screen.getByText('Survey')).toBeInTheDocument()
    expect(screen.getByText('01/04')).toBeInTheDocument()
    expect(screen.getByText('What is your name?')).toBeInTheDocument()
  })

  it('disables next when required answer is empty', () => {
    render(<AskUserQuestions questions={questions} />)
    expect(screen.getByRole('button', { name: 'NEXT' })).toBeDisabled()
  })

  it('navigates forward after answering required text question', () => {
    const onChange = vi.fn()
    render(<AskUserQuestions questions={questions} onChange={onChange} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Alice' } })
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'Alice' }))

    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    expect(screen.getByText('Select a role')).toBeInTheDocument()
    expect(screen.getByText('02/04')).toBeInTheDocument()
  })

  it('navigates back', () => {
    render(<AskUserQuestions questions={questions} defaultValue={{ name: 'Alice' }} />)
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    expect(screen.getByText('Select a role')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'BACK' }))
    expect(screen.getByText('What is your name?')).toBeInTheDocument()
  })

  it('selects single option', () => {
    const onChange = vi.fn()
    render(<AskUserQuestions questions={questions} defaultValue={{ name: 'Alice' }} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))

    fireEvent.click(screen.getByRole('button', { name: 'Design' }))
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ role: 'Design' }))
    expect(screen.getByRole('button', { name: 'Design' })).toHaveAttribute('data-active')
  })

  it('selects multiple options via CheckboxGroup', () => {
    render(
      <AskUserQuestions
        questions={questions}
        defaultValue={{ name: 'Alice', role: 'Design' }}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))

    const checkbox = screen.getByRole('checkbox', { name: 'Figma' })
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('toggles confirm answer', () => {
    const onChange = vi.fn()
    render(
      <AskUserQuestions
        questions={questions}
        defaultValue={{ name: 'Alice', role: 'Design', tools: ['Figma'] }}
        onChange={onChange}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))

    const switchControl = screen.getByRole('switch')
    fireEvent.click(switchControl)
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ terms: true }))
  })

  it('submits on last step', async () => {
    const onSubmit = vi.fn()
    render(
      <AskUserQuestions
        questions={questions}
        defaultValue={{ name: 'Alice', role: 'Design', tools: ['Figma'], terms: true }}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))
    fireEvent.click(screen.getByRole('button', { name: 'NEXT' }))

    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }))
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Alice',
        role: 'Design',
        tools: ['Figma'],
        terms: true,
      }),
    )
  })

  it('supports controlled value', () => {
    const { rerender } = render(<AskUserQuestions questions={questions} value={{ name: 'Bob' }} />)
    expect(screen.getByRole('textbox')).toHaveValue('Bob')

    rerender(<AskUserQuestions questions={questions} value={{ name: 'Charlie' }} />)
    expect(screen.getByRole('textbox')).toHaveValue('Charlie')
  })

  it('supports custom labels', () => {
    render(
      <AskUserQuestions
        questions={questions}
        defaultValue={{ name: 'Alice' }}
        title="Q&A"
        submitLabel="Done"
        nextLabel="Continue"
        backLabel="Prev"
      />,
    )
    expect(screen.getByText('Q&A')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument()
  })

  it('supports sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { unmount } = render(<AskUserQuestions questions={questions} size={size} />)
      const root = screen.getByText('QUESTIONS').closest('[data-slot]')
      expect(root).toHaveClass(`nothing-ask-user-questions--${size}`)
      expect(root).toHaveAttribute('data-size', size)
      unmount()
    }
  })

  it('supports custom className', () => {
    render(<AskUserQuestions questions={questions} className="custom-questions" />)
    const root = screen.getByText('QUESTIONS').closest('[data-slot]')
    expect(root).toHaveClass('custom-questions')
    expect(root).toHaveClass('nothing-ask-user-questions')
  })

  it('forwards ref to the div element', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<AskUserQuestions questions={questions} ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.tagName).toBe('DIV')
  })
})
