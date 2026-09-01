//#region src/Card/card-variants.d.ts
declare const contentCardVariants: (props?: ({
  variant?: "soft" | "secondary" | "outline" | "ghost" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  shape?: "rounded" | "technical" | null | undefined;
  interactive?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const legacyVariants: {
  readonly default: "soft";
  readonly raised: "secondary";
  readonly borderless: "ghost";
  readonly compact: "soft";
  readonly technical: "soft";
};
type CardVariant = 'soft' | 'secondary' | 'outline' | 'ghost' | keyof typeof legacyVariants;
type CardSize = 'sm' | 'md' | 'lg';
type CardShape = 'rounded' | 'technical';
//#endregion
export { CardShape, CardSize, CardVariant, contentCardVariants };
//# sourceMappingURL=card-variants.d.mts.map