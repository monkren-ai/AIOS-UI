import { DotMatrix } from '../DotMatrix'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <DotMatrix rows={5} cols={5} theme="dark" />
      <DotMatrix
        rows={5}
        cols={5}
        theme="dark"
        pattern="pulse"
        activeDots={[[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]}
      />
    </div>
  )
}
