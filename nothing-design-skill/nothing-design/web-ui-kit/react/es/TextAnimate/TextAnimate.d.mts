import { TextAnimateMode, textAnimateVariants } from "./text-animate-variants.mjs";
import * as React$1 from "react";
//#region src/TextAnimate/TextAnimate.d.ts
interface TextAnimateProps extends Omit<React$1.ComponentPropsWithRef<'p'>, 'children'> {
  /** 待揭示的纯文本。 */
  children: string;
  /** 切分粒度：char 逐字、word 逐词、line 逐行（按 `\n` 切）。 */
  mode?: TextAnimateMode;
  /** 每段递增延迟，默认 40ms。 */
  delay?: number;
  /** 单段动画时长，默认 300ms。 */
  duration?: number;
  /** 渲染成的元素标签。 */
  as?: 'div' | 'span' | 'p';
  /** 只播一次（默认）；为 false 时循环。 */
  once?: boolean;
}
declare function TextAnimate({
  children,
  mode,
  delay,
  duration,
  as,
  once,
  className,
  style,
  ...props
}: TextAnimateProps): React$1.JSX.Element;
declare namespace TextAnimate {
  var displayName: string;
}
//#endregion
export { TextAnimate, TextAnimateProps };
//# sourceMappingURL=TextAnimate.d.mts.map