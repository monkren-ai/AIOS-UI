//#region src/Caffeinate/caffeinate-variants.d.ts
/**
 * Caffeinate 的视觉变体。
 *
 * status 的配色落在大数字与进度格上，容器本身不换色；
 * disabled 没有容器级视觉，只由按钮的 `disabled:` 与 data-* 表达。
 */
declare const caffeinateVariants: (props?: ({
  status?: "low" | "medium" | "high" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { caffeinateVariants };
//# sourceMappingURL=caffeinate-variants.d.mts.map