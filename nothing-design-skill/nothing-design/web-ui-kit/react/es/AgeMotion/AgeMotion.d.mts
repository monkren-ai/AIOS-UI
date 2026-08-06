import { ageMotionVariants } from "./age-motion-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/AgeMotion/AgeMotion.d.ts
type AgeMotionSize = 'sm' | 'md' | 'lg';
type AgeMotionTheme = 'light' | 'dark';
interface AgeMotionProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof ageMotionVariants>, 'size' | 'theme'> {
  birthDate?: string;
  lifespan?: number;
  updateInterval?: number;
  yearSegments?: number;
  size?: AgeMotionSize;
  theme?: AgeMotionTheme;
}
declare function AgeMotion({
  className,
  birthDate: initialBirthDate,
  lifespan,
  updateInterval,
  yearSegments,
  size,
  theme,
  style,
  ref,
  ...props
}: AgeMotionProps): React$1.JSX.Element;
declare namespace AgeMotion {
  var displayName: string;
}
//#endregion
export { AgeMotion, AgeMotionProps, AgeMotionSize, AgeMotionTheme };
//# sourceMappingURL=AgeMotion.d.mts.map