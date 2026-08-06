//#region src/DatePicker/date-picker-variants.d.ts
/**
 * DatePicker 的外层容器变体。
 *
 * 主要承载 `data-*` 状态；触发器本身的视觉走 Input 的 `inputControlVariants`，
 * 浮层走 Popover 的 `popoverContentVariants`。
 */
declare const datePickerVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DatePickerSize = 'sm' | 'md' | 'lg';
//#endregion
export { DatePickerSize, datePickerVariants };
//# sourceMappingURL=date-picker-variants.d.mts.map