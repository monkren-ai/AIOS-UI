import * as React$1 from "react";
import { Components } from "react-markdown";

//#region src/conversation/Response/Response.d.ts
interface ResponseProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: string;
  components?: Components;
  codeCopyable?: boolean;
}
declare function Response({
  children,
  components,
  codeCopyable,
  className,
  ref,
  ...props
}: ResponseProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Response, ResponseProps };
//# sourceMappingURL=Response.d.mts.map