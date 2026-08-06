import { ThinkingState } from "../ThinkingIndicator/ThinkingIndicator.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/ThinkingSteps/ThinkingSteps.d.ts
interface ThinkingStep {
  id: string;
  title: string;
  content?: string;
}
type ThinkingStepStatus = Exclude<ThinkingState, 'acting'> | 'pending';
declare const thinkingStepsVariants: (props?: ({
  compact?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ThinkingStepsProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof thinkingStepsVariants> {
  steps: ThinkingStep[];
  title?: string;
  activeIndex?: number;
  defaultActiveIndex?: number;
  autoAdvance?: boolean;
  interval?: number;
  loop?: boolean;
  onStepChange?: (index: number) => void;
  compact?: boolean;
}
declare const ThinkingSteps: React$1.ForwardRefExoticComponent<ThinkingStepsProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ThinkingStep, ThinkingStepStatus, ThinkingSteps, ThinkingStepsProps, thinkingStepsVariants };
//# sourceMappingURL=ThinkingSteps.d.mts.map