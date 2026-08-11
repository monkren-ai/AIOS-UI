//#region src/Radio/radio-variants.d.ts
declare const radioVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const radioIndicatorVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type RadioSize = 'sm' | 'md' | 'lg';
//#endregion
export { RadioSize, radioIndicatorVariants, radioVariants };
//# sourceMappingURL=radio-variants.d.mts.map