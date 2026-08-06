import { buttonVariants } from 'aios-ui-kit/button'
import { ArrowUpRightIcon } from '../icons'

export default function ButtonAsLink() {
  return (
    <a
      href="https://base-ui.com"
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({ variant: 'soft', size: 'md' })}
    >
      Visit Base UI
      <ArrowUpRightIcon data-icon="end" />
    </a>
  )
}
