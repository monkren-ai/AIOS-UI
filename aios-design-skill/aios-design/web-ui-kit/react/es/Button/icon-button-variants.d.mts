//#region src/Button/icon-button-variants.d.ts
declare const iconButtonVariants: (props?: ({
  shape?: "circle" | "technical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type IconButtonShape = 'circle' | 'technical';
type IconButtonSize = 'sm' | 'md' | 'lg';
//#endregion
export { IconButtonShape, IconButtonSize, iconButtonVariants };
//# sourceMappingURL=icon-button-variants.d.mts.map