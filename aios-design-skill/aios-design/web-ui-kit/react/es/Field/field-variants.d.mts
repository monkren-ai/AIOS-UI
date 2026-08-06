//#region src/Field/field-variants.d.ts
/**
 * Field 容器：纵向堆叠，label / 控件 / 说明 / 错误之间 4px。
 *
 * 间距刻意紧凑（`gap-xs`），与 Input、`formGroupVariants` 保持一致，
 * 让一个字段内的几行文案「成组」而非「散开」。
 */
declare const fieldVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { fieldVariants };
//# sourceMappingURL=field-variants.d.mts.map