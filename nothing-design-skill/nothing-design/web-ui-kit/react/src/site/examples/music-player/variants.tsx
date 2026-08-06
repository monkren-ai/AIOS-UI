import { MusicPlayer } from 'aios-ui-kit/music-player'

export default function MusicPlayerVariants() {
  return (
    <div className="flex flex-col gap-6">
      <MusicPlayer variant="default" className="w-full max-w-md" />
      <MusicPlayer variant="compact" className="w-full max-w-md" />
      <MusicPlayer variant="mini" className="w-40" />
    </div>
  )
}
