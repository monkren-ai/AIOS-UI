//#region src/Sheet/sheet-variants.d.ts
declare const sheetBackdropVariants: (props?: ({
  visible?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 抽屉面板。
 *
 * `side="left" | "right"` 现在按**逻辑**方向落位：left → inline-start，
 * right → inline-end，边框与圆角用 `border-s/e` + `rounded-s/e-*`，
 * 所以 `<html dir="rtl">` 下整块会自动镜像。滑入方向靠 `rtl:` 变体反号。
 *
 * 与 v1 一致：收起态是基线，`open:` 把 transform 归零。
 */
declare const sheetVariants: (props?: ({
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
  full?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const sheetHeaderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetTitleVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetCloseVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** bottom-sheet 模式下的「Done」按钮，绝对定位在标题行的行末。 */
declare const sheetDismissVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetBodyVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetHandleVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetHandleBarVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetSectionVariants: (props?: ({
  spaced?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const sheetSectionTitleVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const sheetFooterVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { sheetBackdropVariants, sheetBodyVariants, sheetCloseVariants, sheetDismissVariants, sheetFooterVariants, sheetHandleBarVariants, sheetHandleVariants, sheetHeaderVariants, sheetSectionTitleVariants, sheetSectionVariants, sheetTitleVariants, sheetVariants };
//# sourceMappingURL=sheet-variants.d.mts.map