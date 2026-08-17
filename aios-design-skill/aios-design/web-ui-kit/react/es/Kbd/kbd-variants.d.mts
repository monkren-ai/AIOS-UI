//#region src/Kbd/kbd-variants.d.ts
/**
 * Kbd 的视觉变体。
 *
 * 键帽在 AIOS 的语言里就是一块方角的 surface：一条 border 划出边界，
 * 不用阴影去伪造按键的立体感。
 */
declare const kbdVariants: (props?: ({
  variant?: "outline" | "soft" | "ghost" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type KbdVariant = 'soft' | 'outline' | 'ghost';
type KbdSize = 'sm' | 'md' | 'lg';
//#endregion
export { KbdSize, KbdVariant, kbdVariants };
//# sourceMappingURL=kbd-variants.d.mts.map