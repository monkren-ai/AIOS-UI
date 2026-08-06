import { Ref, RefCallback } from "react";

//#region src/lib/refs.d.ts
/**
 * 合并多个 refs（用于 forwardRef 场景）。
 *
 * 传入 N 个 ref（函数 ref / 对象 ref / undefined），返回一个 ref 回调。
 * 当 ref 被附加到节点时，会依次调用所有传入的 ref。
 *
 * @example
 * ```tsx
 * const Component = forwardRef<HTMLDivElement, Props>(
 *   ({ ...props }, forwardedRef) => {
 *     const internalRef = useRef<HTMLDivElement>(null)
 *     return <div ref={mergeRefs(forwardedRef, internalRef)} {...props} />
 *   }
 * )
 * ```
 */
declare function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T>;
//#endregion
export { mergeRefs };
//# sourceMappingURL=refs.d.mts.map