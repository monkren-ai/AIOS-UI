import { Toolbar } from 'aios-ui-kit/toolbar'

export default function ToolbarWithGroups() {
  return (
    <Toolbar label="Document actions" size="sm">
      <Toolbar.Group>
        <Toolbar.Button>New</Toolbar.Button>
        <Toolbar.Button>Open</Toolbar.Button>
        <Toolbar.Button>Save</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button>Cut</Toolbar.Button>
        <Toolbar.Button>Copy</Toolbar.Button>
        <Toolbar.Button>Paste</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Link href="/docs">Docs</Toolbar.Link>
    </Toolbar>
  )
}
