import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

//#region src/lib/component-types.d.ts
/**
 * 共享 HTML 元素属性基类。
 *
 * 集中定义"标准容器元素"属性类型，让组件 props 复用统一的基类，
 * 避免每个组件重复 omit / extend 同一组 HTML 属性。
 *
 * 用法：
 * ```ts
 * type MyProps = DivProps & { variant?: 'primary' }
 * ```
 */
type DivProps = HTMLAttributes<HTMLDivElement>;
type SpanProps = HTMLAttributes<HTMLSpanElement>;
type ButtonPropsBase = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = HTMLAttributes<HTMLAnchorElement>;
type InputPropsBase = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> & {
  onChange?: (value: string) => void;
  value?: string;
};
type TextareaPropsBase = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> & {
  onChange?: (value: string) => void;
  value?: string;
};
type SelectPropsBase = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> & {
  onChange?: (value: string) => void;
  value?: string;
};
/**
 * 通用 children-only 容器 props。
 */
type ContainerProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
//#endregion
export { AnchorProps, ButtonPropsBase, ContainerProps, DivProps, InputPropsBase, SelectPropsBase, SpanProps, TextareaPropsBase };
//# sourceMappingURL=component-types.d.mts.map