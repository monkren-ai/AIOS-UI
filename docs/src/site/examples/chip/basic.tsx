import { Chip, ChipGroup } from 'aios-ui-kit/chip'

export default function ChipBasic() {
  return (
    <ChipGroup aria-label="Component filters">
      <Chip selected>All</Chip>
      <Chip>Basic</Chip>
      <Chip>Agent</Chip>
      <Chip>System</Chip>
    </ChipGroup>
  )
}
