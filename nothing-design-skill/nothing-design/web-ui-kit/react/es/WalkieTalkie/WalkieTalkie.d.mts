import { WalkieStatus, walkieTalkieVariants } from "./walkie-talkie-variants.mjs";
import * as React$1 from "react";
//#region src/WalkieTalkie/WalkieTalkie.d.ts
type WalkieState = 'READY' | 'TRANSMITTING' | 'SENT';
interface WalkieTalkieProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  channel?: number;
  minChannel?: number;
  maxChannel?: number;
  volumeSegments?: number;
  volumeLevel?: number;
  status?: WalkieStatus;
}
declare function WalkieTalkie({
  className,
  channel: initialChannel,
  minChannel,
  maxChannel,
  volumeSegments,
  volumeLevel,
  status: statusProp,
  style,
  ...props
}: WalkieTalkieProps): React$1.JSX.Element;
declare namespace WalkieTalkie {
  var displayName: string;
}
//#endregion
export { WalkieState, WalkieTalkie, WalkieTalkieProps };
//# sourceMappingURL=WalkieTalkie.d.mts.map