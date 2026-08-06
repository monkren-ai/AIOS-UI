import * as React$1 from "react";

//#region src/lib/slot.d.ts
/**
 * Slot 多态原语。
 *
 * shadcn 风格的 `asChild` 模式实现：当组件设 `asChild=true` 时，
 * 把 className / style / data 属性 / 事件处理 合并到唯一子元素上。
 *
 * 为什么不直接用 @radix-ui/react-slot？避免引入大型依赖。
 * 此实现约 50 行，覆盖 99 ％ 使用场景。
 *
 * @example
 * ```tsx
 * <Button asChild>
 *   <a href="/home">Go Home</a>
 * </Button>
 * // 渲染: <a className="nothing-btn nothing-btn--primary" href="/home">Go Home</a>
 * ```
 */
interface SlotProps extends React$1.HTMLAttributes<HTMLElement> {
  children?: React$1.ReactNode;
}
declare const Slot: React$1.ForwardRefExoticComponent<SlotProps & React$1.RefAttributes<HTMLElement>>;
//#endregion
export { Slot, SlotProps };
//# sourceMappingURL=slot.d.mts.map