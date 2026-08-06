import { chronoVariants } from "./chrono-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Chrono/Chrono.d.ts
type ChronoState = 'idle' | 'running' | 'paused';
type ChronoSize = 'sm' | 'md' | 'lg';
interface ChronoProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof chronoVariants>, 'state' | 'size'> {
  maxLaps?: number;
  state?: ChronoState;
  size?: ChronoSize;
}
declare function Chrono({
  className,
  maxLaps,
  state: stateProp,
  size,
  style,
  ref,
  ...props
}: ChronoProps): React$1.JSX.Element;
declare namespace Chrono {
  var displayName: string;
}
//#endregion
export { Chrono, ChronoProps, ChronoSize, ChronoState };
//# sourceMappingURL=Chrono.d.mts.map