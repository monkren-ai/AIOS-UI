//#region src/Chip/chip-variants.d.ts
declare const chipVariants: (props?: ({
  size?: "sm" | "md" | null | undefined;
  selected?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const chipGroupVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type ChipSize = 'sm' | 'md';
//#endregion
export { ChipSize, chipGroupVariants, chipVariants };
//# sourceMappingURL=chip-variants.d.mts.map