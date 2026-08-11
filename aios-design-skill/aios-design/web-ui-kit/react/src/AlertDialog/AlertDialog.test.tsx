import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog'

describe('AlertDialog', () => {
  it('opens with alertdialog semantics and closes from an explicit action', async () => {
    const user = userEvent.setup()
    render(
      <AlertDialog>
        <AlertDialogTrigger>Erase</AlertDialogTrigger>
        <AlertDialogContent destructive>
          <AlertDialogTitle destructive>Erase disk?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogClose>Cancel</AlertDialogClose>
        </AlertDialogContent>
      </AlertDialog>,
    )
    await user.click(screen.getByRole('button', { name: 'Erase' }))
    const dialog = screen.getByRole('alertdialog')
    expect(dialog).toHaveAttribute('data-slot', 'alert-dialog')
    expect(dialog).toHaveAttribute('data-destructive')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })
})
