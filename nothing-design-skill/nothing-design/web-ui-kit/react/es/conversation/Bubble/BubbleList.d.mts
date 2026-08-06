import { BubbleProps, BubbleSemanticType } from "./Bubble.mjs";
import * as React$1 from "react";

//#region src/conversation/Bubble/BubbleList.d.ts
type BubbleListSemanticType = 'root' | 'scroll' | 'bubble';
type BubbleRole = 'ai' | 'system' | 'user' | 'divider';
interface BubbleItemType extends Omit<BubbleProps, 'classNames' | 'styles' | 'content'> {
  key: string | number;
  role?: BubbleRole | string;
  content?: React$1.ReactNode;
  classNames?: Partial<Record<BubbleSemanticType, string>>;
  styles?: Partial<Record<BubbleSemanticType, React$1.CSSProperties>>;
}
type RoleConfig = Pick<BubbleProps, 'placement' | 'variant' | 'shape' | 'avatar' | 'classNames' | 'styles' | 'loading' | 'typing'>;
type RoleType = Partial<Record<BubbleRole | string, RoleConfig | ((item: BubbleItemType) => RoleConfig)>>;
interface BubbleListProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'role'> {
  items: BubbleItemType[];
  role?: RoleType;
  autoScroll?: boolean;
  classNames?: Partial<Record<BubbleListSemanticType, string>>;
  styles?: Partial<Record<BubbleListSemanticType, React$1.CSSProperties>>;
}
declare const BubbleList: React$1.ForwardRefExoticComponent<BubbleListProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { BubbleItemType, BubbleList, BubbleListProps, BubbleListSemanticType, BubbleRole, RoleConfig, RoleType };
//# sourceMappingURL=BubbleList.d.mts.map