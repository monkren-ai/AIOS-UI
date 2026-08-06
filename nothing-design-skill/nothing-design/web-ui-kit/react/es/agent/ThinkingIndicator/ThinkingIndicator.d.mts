import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/ThinkingIndicator/ThinkingIndicator.d.ts
type ThinkingState = 'thinking' | 'acting' | 'done' | 'error';
declare const thinkingIndicatorVariants: (props?: ({
  state?: "error" | "done" | "thinking" | "acting" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ThinkingIndicatorProps extends Omit<React$1.HTMLAttributes<HTMLSpanElement>, 'children'>, VariantProps<typeof thinkingIndicatorVariants> {
  state?: ThinkingState;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}
declare const ThinkingIndicator: React$1.ForwardRefExoticComponent<ThinkingIndicatorProps & React$1.RefAttributes<HTMLSpanElement>>;
//#endregion
export { ThinkingIndicator, ThinkingIndicatorProps, ThinkingState, thinkingIndicatorVariants };
//# sourceMappingURL=ThinkingIndicator.d.mts.map