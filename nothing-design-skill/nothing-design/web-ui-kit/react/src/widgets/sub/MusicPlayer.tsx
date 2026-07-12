// Thin re-export: `widgets/sub/MusicPlayer` is now `<MusicPlayer variant="mini" />` from `@/components/MusicPlayer`.
// Kept for backward compatibility with Figma20Section and any external consumers.
// The original Icons/LoadingBar/Info3/Bullet sub-components have been inlined into the main MusicPlayer.tsx.
import * as React from 'react'
import { MusicPlayer as MainMusicPlayer } from '../../MusicPlayer'
import type { MusicPlayerProps } from '../../MusicPlayer'

export const MusicPlayer = React.forwardRef<HTMLDivElement, Omit<MusicPlayerProps, 'variant'>>(
  (props, ref) => <MainMusicPlayer ref={ref} variant="mini" {...props} />
)
MusicPlayer.displayName = 'MusicPlayer'
