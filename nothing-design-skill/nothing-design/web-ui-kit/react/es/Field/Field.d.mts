import { fieldVariants } from "./field-variants.mjs";
import * as React$1 from "react";
import { Field } from "@base-ui/react/field";

//#region src/Field/Field.d.ts
interface FieldProps extends React$1.ComponentPropsWithRef<'div'> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** 控件的 id，用于关联 label 与错误/说明。 */
  id?: string;
  children?: React$1.ReactNode;
}
interface FieldLabelProps extends React$1.ComponentPropsWithRef<typeof Field.Label> {
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
}
/** 字段标签，复用 Input 的 `inputLabelVariants` 排版。 */
declare function FieldLabel({
  className,
  hasError,
  disabled,
  required,
  children,
  ...props
}: FieldLabelProps): React$1.JSX.Element;
declare namespace FieldLabel {
  var displayName: string;
}
type FieldDescriptionProps = React$1.ComponentPropsWithRef<typeof Field.Description>;
/** 字段说明，复用 Input 的 `inputHelperVariants` 默认态。 */
declare function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps): React$1.JSX.Element;
declare namespace FieldDescription {
  var displayName: string;
}
type FieldErrorProps = React$1.ComponentPropsWithRef<typeof Field.Error>;
/**
 * 校验错误，由 Base UI 的 Field 校验链驱动渲染。
 *
 * 注意：它读 Field 的 validity 数据而非 children——静态 `error` 字符串请用
 * `Field` 的 `error` prop（内部渲染一个 `role="alert"` 的 div），这里留给
 * 走 `validate` / `invalid` 的场景。
 */
declare function FieldError({
  className,
  ...props
}: FieldErrorProps): React$1.JSX.Element;
declare namespace FieldError {
  var displayName: string;
}
/**
 * 表单字段壳。
 *
 * 用 Base UI 的 Field.Root 包裹 label + 控件 + 说明 + 错误，统一排版。
 * 当 children 是单个元素时，自动给它注入 `id` 与 `aria-describedby`，
 * 让 label、说明、错误三者自动关联到位。
 */
declare function Field$1({
  label,
  description,
  error,
  required,
  disabled,
  id: idProp,
  className,
  children,
  ref,
  ...props
}: FieldProps): React$1.JSX.Element;
declare namespace Field$1 {
  var displayName: string;
  var Label: typeof FieldLabel;
  var Description: typeof FieldDescription;
  var Error: typeof FieldError;
}
//#endregion
export { Field$1 as Field, FieldDescription, FieldDescriptionProps, FieldError, FieldErrorProps, FieldLabel, FieldLabelProps, FieldProps };
//# sourceMappingURL=Field.d.mts.map