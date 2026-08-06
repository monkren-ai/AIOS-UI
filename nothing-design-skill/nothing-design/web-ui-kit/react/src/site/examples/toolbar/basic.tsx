import { Toolbar } from 'aios-ui-kit/toolbar'

export default function ToolbarBasic() {
  return (
    <Toolbar label="Text formatting">
      <Toolbar.Button pressed>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Button>Underline</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Align left</Toolbar.Button>
      <Toolbar.Button>Align center</Toolbar.Button>
    </Toolbar>
  )
}
