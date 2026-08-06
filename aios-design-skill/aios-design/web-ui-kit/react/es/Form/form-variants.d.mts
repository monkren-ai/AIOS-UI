//#region src/Form/form-variants.d.ts
/** 表单容器：纵向堆叠，字段之间 16px。 */
declare const formVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 字段分组：label + 控件 + 说明文字一组，间距 4px。
 *
 * 旧 CSS 里的 `.nothing-form__group` / `--error`，现在以 CVA 形式导出，
 * 供调用方直接贴到自己的 `<div>` 上。
 */
declare const formGroupVariants: (props?: ({
  hasError?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 分组下方的错误文案。 */
declare const formErrorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { formErrorVariants, formGroupVariants, formVariants };
//# sourceMappingURL=form-variants.d.mts.map