import { cn } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import "./Form.css";
//#region src/Form/Form.tsx
const Form = React$1.forwardRef(({ className, onSubmit, children, ...props }, ref) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit?.(e);
	};
	return /* @__PURE__ */ jsx("form", {
		ref,
		className: cn("nothing-form", className),
		onSubmit: handleSubmit,
		...props,
		children
	});
});
Form.displayName = "Form";
//#endregion
export { Form as default };

//# sourceMappingURL=Form.mjs.map