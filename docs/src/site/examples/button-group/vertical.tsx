import { Button } from 'aios-ui-kit/button'
import { ButtonGroup } from 'aios-ui-kit/button-group'

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical" size="sm">
      <Button variant="secondary">新建</Button>
      <Button variant="secondary">编辑</Button>
      <Button variant="secondary">删除</Button>
    </ButtonGroup>
  )
}
