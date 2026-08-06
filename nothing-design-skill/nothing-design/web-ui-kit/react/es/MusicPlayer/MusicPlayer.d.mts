import { MusicPlayerVariant, musicPlayerVariants } from "./music-player-variants.mjs";
import * as React$1 from "react";
//#region src/MusicPlayer/MusicPlayer.d.ts
interface Track {
  title: string;
  artist: string;
  duration: number;
}
interface BlinkingSeparatorProps {
  active?: boolean;
  speed?: number;
  className?: string;
}
declare const BlinkingSeparator: React$1.FC<BlinkingSeparatorProps>;
interface MusicPlayerProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  totalSegments?: number;
  updateInterval?: number;
  tracks?: Track[];
  variant?: MusicPlayerVariant;
  showRecordingIndicator?: boolean;
  sourceIcon?: React$1.ReactNode;
  recording?: boolean;
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
}
declare function MusicPlayer({
  variant,
  theme,
  size,
  className,
  style,
  ...props
}: MusicPlayerProps): React$1.JSX.Element;
declare namespace MusicPlayer {
  var displayName: string;
}
//#endregion
export { BlinkingSeparator, MusicPlayer, MusicPlayerProps };
//# sourceMappingURL=MusicPlayer.d.mts.map