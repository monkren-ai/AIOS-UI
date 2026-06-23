import { MusicPlayer } from '../MusicPlayer'

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <MusicPlayer variant="default" />
      <MusicPlayer variant="compact" />
    </div>
  )
}
