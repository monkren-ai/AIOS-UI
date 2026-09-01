import { ageMotionVariants } from "./age-motion-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/AgeMotion/AgeMotion.d.ts
type AgeMotionSize = 'sm' | 'md' | 'lg';
interface AgeMotionProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof ageMotionVariants>, 'size'> {
  birthDate?: string;
  lifespan?: number;
  updateInterval?: number;
  yearSegments?: number;
  size?: AgeMotionSize;
}
declare function AgeMotion({
  className,
  birthDate: initialBirthDate,
  lifespan,
  updateInterval,
  yearSegments,
  size,
  style,
  ref,
  ...props
}: AgeMotionProps): React$1.JSX.Element;
declare namespace AgeMotion {
  var displayName: string;
}
//#endregion
export { AgeMotion, AgeMotionProps, AgeMotionSize };
//# sourceMappingURL=AgeMotion.d.mts.map