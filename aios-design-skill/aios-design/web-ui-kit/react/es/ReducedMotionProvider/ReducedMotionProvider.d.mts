import { ReactNode } from "react";

//#region src/ReducedMotionProvider/ReducedMotionProvider.d.ts
interface ReducedMotionContextValue {
  /** 当前是否应该抑制动效。 */
  reducedMotion: boolean;
  /** 系统偏好本身，不受 `force` 影响。 */
  systemReducedMotion: boolean;
}
interface ReducedMotionProviderProps {
  children: ReactNode;
  /**
   * 覆盖系统偏好。
   *
   * `true` 强制关掉动效，`false` 强制开启（谨慎使用），
   * 不传则跟随 `prefers-reduced-motion`。
   */
  force?: boolean;
}
/**
 * 把 `prefers-reduced-motion` 暴露给组件树，并写到 `<html data-reduced-motion>` 上。
 *
 * CSS 层面其实已经有一条全局的 `@media (prefers-reduced-motion: reduce)` 兜底，
 * 但 JS 驱动的动画（motion 的 spring、canvas 里的点阵动效）读不到媒体查询，
 * 得靠 `useReducedMotion()` 自己判断。应用内提供开关时，`force` 也能覆盖系统值。
 */
declare function ReducedMotionProvider({
  children,
  force
}: ReducedMotionProviderProps): import("react").JSX.Element;
declare namespace ReducedMotionProvider {
  var displayName: string;
}
/**
 * 返回当前是否应该抑制动效。
 *
 * 有 provider 就用 provider 的值（这样 `force` 能生效）；没有的话直接订阅系统
 * 媒体查询，所以单独拿来用也是对的。服务端一律按「不降级」渲染，客户端接管后
 * 再纠正——媒体查询在服务端本来就无从得知。
 */
declare function useReducedMotion(): boolean;
//#endregion
export { ReducedMotionContextValue, ReducedMotionProvider, ReducedMotionProviderProps, useReducedMotion };
//# sourceMappingURL=ReducedMotionProvider.d.mts.map