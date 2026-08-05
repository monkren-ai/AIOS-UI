import { Toggle } from 'nothing-ui/toggle'
import { BoldIcon } from '../icons'

export default function ToggleBasic() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle defaultPressed aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle>Grid</Toggle>
      <Toggle disabled>Locked</Toggle>
    </div>
  )
}
