import { cn, dataAttr } from "../lib/utils.mjs";
import { inputHelperVariants, inputLabelVariants } from "../Input/input-variants.mjs";
import { fieldVariants } from "./field-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Field } from "@base-ui/react/field";
//#region src/Field/Field.tsx
/** 字段标签，复用 Input 的 `inputLabelVariants` 排版。 */
function FieldLabel({ className, hasError = false, disabled = false, required = false, children, ...props }) {
	return /* @__PURE__ */ jsxs(Field.Label, {
		className: cn(inputLabelVariants({
			size: "md",
			hasError,
			disabled
		}), className),
		...props,
		children: [children, required && /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "ms-1 text-accent",
			children: "*"
		})]
	});
}
FieldLabel.displayName = "Field.Label";
/** 字段说明，复用 Input 的 `inputHelperVariants` 默认态。 */
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(Field.Description, {
		className: cn(inputHelperVariants({ variant: "default" }), className),
		...props
	});
}
FieldDescription.displayName = "Field.Description";
/**
* 校验错误，由 Base UI 的 Field 校验链驱动渲染。
*
* 注意：它读 Field 的 validity 数据而非 children——静态 `error` 字符串请用
* `Field` 的 `error` prop（内部渲染一个 `role="alert"` 的 div），这里留给
* 走 `validate` / `invalid` 的场景。
*/
function FieldError({ className, ...props }) {
	return /* @__PURE__ */ jsx(Field.Error, {
		className: cn(inputHelperVariants({ variant: "error" }), className),
		...props
	});
}
FieldError.displayName = "Field.Error";
/**
* 表单字段壳。
*
* 用 Base UI 的 Field.Root 包裹 label + 控件 + 说明 + 错误，统一排版。
* 当 children 是单个元素时，自动给它注入 `id` 与 `aria-describedby`，
* 让 label、说明、错误三者自动关联到位。
*/
function Field$1({ label, description, error, required = false, disabled = false, id: idProp, className, children, ref, ...props }) {
	const generatedId = React$1.useId();
	const fieldId = idProp ?? generatedId;
	const descriptionId = `${fieldId}-description`;
	const errorId = `${fieldId}-error`;
	const hasError = Boolean(error);
	const describedBy = [hasError ? errorId : null, description && !hasError ? descriptionId : null].filter(Boolean).join(" ") || void 0;
	const control = React$1.useMemo(() => {
		const childArray = React$1.Children.toArray(children);
		if (childArray.length === 1) {
			const only = childArray[0];
			if (React$1.isValidElement(only)) {
				const typed = only;
				return React$1.cloneElement(typed, {
					id: typed.props.id ?? fieldId,
					"aria-describedby": typed.props["aria-describedby"] ?? describedBy
				});
			}
		}
		return children;
	}, [
		children,
		fieldId,
		describedBy
	]);
	return /* @__PURE__ */ jsxs(Field.Root, {
		ref,
		disabled,
		invalid: hasError || void 0,
		className: cn(fieldVariants(), className),
		"data-slot": "field",
		"data-disabled": dataAttr(disabled),
		"data-invalid": dataAttr(hasError),
		"data-required": dataAttr(required),
		"data-state": hasError ? "error" : disabled ? "disabled" : "default",
		...props,
		children: [
			label && /* @__PURE__ */ jsx(FieldLabel, {
				htmlFor: fieldId,
				hasError,
				disabled,
				required,
				children: label
			}),
			control,
			description && !hasError && /* @__PURE__ */ jsx(FieldDescription, {
				id: descriptionId,
				children: description
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				id: errorId,
				role: "alert",
				className: inputHelperVariants({ variant: "error" }),
				"data-slot": "field-error",
				children: error
			})
		]
	});
}
Field$1.displayName = "Field";
Field$1.Label = FieldLabel;
Field$1.Description = FieldDescription;
Field$1.Error = FieldError;
//#endregion
export { FieldDescription, FieldError, FieldLabel, Field$1 as default };

//# sourceMappingURL=Field.mjs.map