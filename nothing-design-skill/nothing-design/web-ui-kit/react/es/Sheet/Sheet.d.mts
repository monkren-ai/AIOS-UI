import { sheetBackdropVariants, sheetBodyVariants, sheetCloseVariants, sheetDismissVariants, sheetFooterVariants, sheetHandleBarVariants, sheetHandleVariants, sheetHeaderVariants, sheetSectionTitleVariants, sheetSectionVariants, sheetTitleVariants, sheetVariants } from "./sheet-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Sheet/Sheet.d.ts
interface SheetSection {
  title?: string;
  content: React$1.ReactNode;
}
interface SheetProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, VariantProps<typeof sheetVariants> {
  /**
   * 必填。Sheet 自己不渲染触发器，也没有任何内部路径能把它从关闭翻成打开——
   * 开合完全由调用方掌握。类型上做成可选的话，忘了传就是「静默不渲染」，最难查。
   */
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
  full?: boolean;
  sections?: SheetSection[];
  footer?: React$1.ReactNode;
  children?: React$1.ReactNode;
}
declare function Sheet({
  className,
  open: isOpen,
  onOpenChange,
  side,
  title,
  full,
  sections,
  footer,
  children,
  ref,
  ...props
}: SheetProps): React$1.JSX.Element;
declare namespace Sheet {
  var displayName: string;
}
//#endregion
export { Sheet, SheetProps, SheetSection };
//# sourceMappingURL=Sheet.d.mts.map