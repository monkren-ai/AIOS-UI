import { DropdownMenu } from 'nothing-ui/dropdown-menu'

export default function DropdownMenuBasic() {
  return (
    <DropdownMenu
      trigger="Actions ▾"
      items={[
        { label: 'Rename', onClick: () => console.log('rename') },
        { label: 'Duplicate', onClick: () => console.log('duplicate') },
        { label: 'Move to…', onClick: () => console.log('move') },
      ]}
    />
  )
}
