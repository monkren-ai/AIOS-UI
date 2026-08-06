import { promptsVariants } from "./prompts-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/conversation/Prompts/Prompts.d.ts
type PromptsSemanticType = 'root' | 'title' | 'list' | 'item' | 'itemIcon' | 'itemTitle' | 'itemDescription';
interface PromptItem {
  key: string;
  icon?: React$1.ReactNode;
  title?: React$1.ReactNode;
  description?: React$1.ReactNode;
  disabled?: boolean;
}
interface PromptsProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof promptsVariants> {
  items: PromptItem[];
  title?: React$1.ReactNode;
  layout?: 'grid' | 'list' | 'wrap';
  onItemClick?: (item: PromptItem, index: number) => void;
  classNames?: Partial<Record<PromptsSemanticType, string>>;
  styles?: Partial<Record<PromptsSemanticType, React$1.CSSProperties>>;
}
declare const Prompts: React$1.ForwardRefExoticComponent<PromptsProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { PromptItem, Prompts, PromptsProps, PromptsSemanticType };
//# sourceMappingURL=Prompts.d.mts.map