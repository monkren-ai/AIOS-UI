import { AccordionType, AccordionVariant, accordionContentVariants, accordionHeaderVariants, accordionItemVariants, accordionLeadingIconVariants, accordionPanelVariants, accordionTriggerIconVariants, accordionTriggerTextVariants, accordionTriggerVariants, accordionVariants } from "./accordion-variants.mjs";
import * as React$1 from "react";

//#region src/Accordion/Accordion.d.ts
interface AccordionItem {
  id: string;
  title: React$1.ReactNode;
  content: React$1.ReactNode;
  disabled?: boolean;
  leadingIcon?: React$1.ReactNode;
}
interface AccordionProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue' | 'value'> {
  items: AccordionItem[];
  /** 单开还是多开。 */
  type?: AccordionType;
  /** 视觉形态。 */
  variant?: AccordionVariant;
  /**
   * 非受控模式下默认展开的面板 id 列表。
   * @deprecated 请优先使用 `defaultValue`。
   */
  defaultOpen?: string[];
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}
declare function Accordion({
  className,
  items,
  type,
  variant,
  defaultOpen,
  defaultValue,
  value: controlledValue,
  onValueChange,
  ...props
}: AccordionProps): React$1.JSX.Element;
declare namespace Accordion {
  var displayName: string;
}
//#endregion
export { Accordion, AccordionItem, AccordionProps };
//# sourceMappingURL=Accordion.d.mts.map