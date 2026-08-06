import { bubbleVariants } from "./bubble-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/conversation/Bubble/Bubble.d.ts
type BubbleSemanticType = 'root' | 'avatar' | 'body' | 'header' | 'content' | 'footer' | 'extra';
type BubblePlacement = 'start' | 'end';
type BubbleVariant = 'filled' | 'outlined' | 'borderless';
type BubbleShape = 'default' | 'round' | 'corner';
interface BubbleProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'content'>, VariantProps<typeof bubbleVariants> {
  content?: React$1.ReactNode;
  placement?: BubblePlacement;
  variant?: BubbleVariant;
  shape?: BubbleShape;
  loading?: boolean;
  typing?: boolean | {
    step?: number;
    interval?: number;
  };
  avatar?: React$1.ReactNode;
  header?: React$1.ReactNode;
  footer?: React$1.ReactNode;
  extra?: React$1.ReactNode;
  classNames?: Partial<Record<BubbleSemanticType, string>>;
  styles?: Partial<Record<BubbleSemanticType, React$1.CSSProperties>>;
}
declare const Bubble: React$1.ForwardRefExoticComponent<BubbleProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { Bubble, BubblePlacement, BubbleProps, BubbleSemanticType, BubbleShape, BubbleVariant };
//# sourceMappingURL=Bubble.d.mts.map