import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('does not render when open is false', () => {
    render(<Modal open={false}>Content</Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open is true', () => {
    render(<Modal open={true}>Modal content</Modal>)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        Content
      </Modal>
    )
    const closeBtn = screen.getByRole('button', { name: 'Close' })
    await user.click(closeBtn)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        Content
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    const backdrop = dialog.parentElement as HTMLElement
    await user.click(backdrop)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when clicking inside the dialog', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        <div>Inner content</div>
      </Modal>
    )
    await user.click(screen.getByText('Inner content'))
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        Content
      </Modal>
    )
    await user.keyboard('{Escape}')
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('supports custom className', () => {
    render(<Modal open={true} className="my-modal">Content</Modal>)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('my-modal')
    expect(dialog).toHaveClass('nothing-modal')
  })

  it('renders title with correct aria-labelledby', () => {
    render(
      <Modal open={true} title="My Title">
        Body
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    const title = screen.getByText('My Title')
    expect(title).toHaveAttribute('id')
    expect(dialog).toHaveAttribute('aria-labelledby', title.id)
  })

  it('renders alert variant with confirm and cancel buttons', async () => {
    const user = userEvent.setup()
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    render(
      <Modal
        open={true}
        variant="alert"
        description="Are you sure?"
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )
    const dialog = screen.getByRole('alertdialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Yes' }))
    expect(handleConfirm).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'No' }))
    expect(handleCancel).toHaveBeenCalledTimes(1)
  })
})
