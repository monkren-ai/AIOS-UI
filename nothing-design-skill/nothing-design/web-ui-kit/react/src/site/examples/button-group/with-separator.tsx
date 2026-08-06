import { Button } from 'aios-ui-kit/button'
import { ButtonGroup } from 'aios-ui-kit/button-group'

export default function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup
      size="sm"
      separator={<span className="self-stretch w-px bg-border-visible" />}
    >
      <Button variant="secondary">保存</Button>
      <Button variant="secondary">另存为</Button>
      <Button variant="secondary">删除</Button>
    </ButtonGroup>
  )
}
