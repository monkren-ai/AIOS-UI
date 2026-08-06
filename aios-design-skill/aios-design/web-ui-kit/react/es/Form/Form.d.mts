import { formVariants } from "./form-variants.mjs";
import * as React$1 from "react";

//#region src/Form/Form.d.ts
type FormProps = Omit<React$1.ComponentPropsWithRef<'form'>, 'onSubmit'> & {
  onSubmit?: (e: React$1.FormEvent<HTMLFormElement>) => void;
  children?: React$1.ReactNode;
};
declare function Form({
  className,
  onSubmit,
  children,
  ref,
  ...props
}: FormProps): React$1.JSX.Element;
declare namespace Form {
  var displayName: string;
}
//#endregion
export { Form, FormProps };
//# sourceMappingURL=Form.d.mts.map