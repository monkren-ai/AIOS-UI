import { thoughtChainVariants } from "./thought-chain-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/conversation/ThoughtChain/ThoughtChain.d.ts
type ThoughtChainSemanticType = 'root' | 'item' | 'itemHeader' | 'itemIcon' | 'itemContent' | 'itemFooter';
type ThoughtChainItemStatus = 'pending' | 'active' | 'success' | 'error';
interface ThoughtChainItem {
  key: string;
  icon?: React$1.ReactNode;
  title?: React$1.ReactNode;
  description?: React$1.ReactNode;
  content?: React$1.ReactNode;
  footer?: React$1.ReactNode;
  status?: ThoughtChainItemStatus;
  collapsible?: boolean;
}
interface ThoughtChainProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof thoughtChainVariants> {
  items: ThoughtChainItem[];
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  onExpand?: (keys: string[]) => void;
  line?: boolean | 'solid' | 'dashed' | 'dotted';
  classNames?: Partial<Record<ThoughtChainSemanticType, string>>;
  styles?: Partial<Record<ThoughtChainSemanticType, React$1.CSSProperties>>;
}
declare const ThoughtChain: React$1.ForwardRefExoticComponent<ThoughtChainProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ThoughtChain, ThoughtChainItem, ThoughtChainItemStatus, ThoughtChainProps, ThoughtChainSemanticType };
//# sourceMappingURL=ThoughtChain.d.mts.map