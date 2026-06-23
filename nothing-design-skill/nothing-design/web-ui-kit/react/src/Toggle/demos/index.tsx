import { Toggle, ToggleGroup } from '../Toggle'

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Toggle defaultPressed>Bold</Toggle>
      <Toggle variant="outline" size="sm">Italic</Toggle>
      <ToggleGroup variant="outline" defaultValue={['b']}>
        <Toggle value="b">B</Toggle>
        <Toggle value="i">I</Toggle>
        <Toggle value="u">U</Toggle>
      </ToggleGroup>
    </div>
  )
}
