import { ReactNode } from "react";

//#region src/DirectionProvider/DirectionProvider.d.ts
type Direction = 'ltr' | 'rtl';
interface DirectionContextValue {
  dir: Direction;
  /** RTL 时为 -1，LTR 时为 1。用于给 transform / 手势位移取反。 */
  sign: 1 | -1;
}
interface DirectionProviderProps {
  children: ReactNode;
  /** 文字方向。默认 `'ltr'`。 */
  dir?: Direction;
  /**
   * 把 `dir` 同步写到 `<html>` 上。
   *
   * CSS 逻辑属性（`ms-*`、`pe-*`、`start-*`）只认 DOM 上的 `dir`，
   * 所以文档根节点没标 `dir` 的话，光有 context 是不会镜像布局的。
   * 已经在服务端渲染出 `<html dir>` 的项目应该关掉这个开关。
   */
  syncDocument?: boolean;
}
/**
 * 声明布局方向。
 *
 * 有两件事需要同时做到位：DOM 上的 `dir` 属性让 CSS 逻辑属性正确解析，
 * context 让方向相关的行为（roving focus、浮层落位、滑块拖拽方向）跟着一起翻。
 * 本组件把两者一并处理，并顺带喂给 Base UI 的 DirectionProvider。
 *
 * @example
 * ```tsx
 * <DirectionProvider dir="rtl">
 *   <App />
 * </DirectionProvider>
 * ```
 */
declare function DirectionProvider({
  children,
  dir,
  syncDocument
}: DirectionProviderProps): import("react").JSX.Element;
declare namespace DirectionProvider {
  var displayName: string;
}
/**
 * 读取当前布局方向。
 *
 * 没有 provider 时返回 `'ltr'`，所以在组件里可以无条件调用。
 */
declare function useDirection(): DirectionContextValue;
//#endregion
export { Direction, DirectionContextValue, DirectionProvider, DirectionProviderProps, useDirection };
//# sourceMappingURL=DirectionProvider.d.mts.map