import { Tag, Tags } from '../Tag'

export default function Demo() {
  return (
    <Tags>
      <Tag>Default</Tag>
      <Tag active>Active</Tag>
      <Tag variant="technical">Technical</Tag>
      <Tag removable>Removable</Tag>
      <Tag disabled>Disabled</Tag>
    </Tags>
  )
}
