import { cn } from "../lib/utils.mjs";
import { formVariants } from "./form-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/Form/Form.tsx
function Form({ className, onSubmit, children, ref, ...props }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit?.(e);
	};
	return /* @__PURE__ */ jsx("form", {
		ref,
		className: cn(formVariants(), className),
		"data-slot": "form",
		onSubmit: handleSubmit,
		...props,
		children
	});
}
Form.displayName = "Form";
//#endregion
export { Form as default };

//# sourceMappingURL=Form.mjs.map