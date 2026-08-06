import { DisclosureReturn, useDisclosure } from "../hooks/useDisclosure.mjs";
import * as React$1 from "react";

//#region src/OverlayPortal/OverlayPortal.d.ts
/**
 * 浮层方向: Popover / HoverCard / DropdownMenu 共有。
 * 包含 'left'/'right' (DropdownMenu 不支持, 留作扩展) + 'top'/'bottom'。
 */
type OverlaySide = 'top' | 'right' | 'bottom' | 'left';
type OverlayAlign = 'start' | 'center' | 'end';
/**
 * OverlayPortal — 6 个 overlay 组件 (Modal / Sheet / HoverCard / Popover /
 * ContextMenu / DropdownMenu) 共享的原语集合。
 *
 * 各组件仍拥有自己的 trigger UI 与 content 布局, 这里只抽取:
 *   - 1. 受控/非受控开关状态 (useOverlayState)
 *   - 2. Escape 键监听 (useEscapeKey)
 *   - 3. body 滚动锁 (useScrollLock)
 *   - 4. 焦点陷阱 (useFocusTrap) — 自动 focus 第一个可聚焦元素, 关闭时还原
 *   - 5. createPortal 包装 (OverlayPortal)
 *   - 6. 容器外部点击 (useOverlayClickOutside) — 复用 useClickOutside
 *
 * 用法示例 (Modal):
 *   const { isOpen, setOpen } = useOverlayState(controlledOpen, onClose)
 *   useEscapeKey(isOpen, () => setOpen(false))
 *   useScrollLock(isOpen)
 *   const trapRef = useFocusTrap<HTMLDivElement>(isOpen)
 *   return (
 *     <OverlayPortal open={isOpen}>
 *       <div ref={trapRef} className="dialog">...</div>
 *     </OverlayPortal>
 *   )
 */
/**
 * 统一受控/非受控开关状态。
 * - controlled 为 undefined: 内部 state (非受控)
 * - controlled 有值: 使用受控值, 但同时通过 onChange 回传
 */
declare function useOverlayState(controlled: boolean | undefined, onChange?: (open: boolean) => void): {
  readonly isOpen: boolean;
  readonly setOpen: (next: boolean) => void;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
};
/**
 * 全局 Escape 键监听。active=true 时挂载, false 时卸载。
 * 注: 不调用 e.preventDefault(), 让上层 focus trap 可继续处理 Tab 等。
 */
declare function useEscapeKey(active: boolean, handler: () => void): void;
declare function useScrollLock(active: boolean): void;
/**
 * 焦点陷阱: active=true 时把焦点拉入 ref 容器, 卸载时还原到打开前元素。
 * 容器内 Tab 循环在外部由消费者 (Modal) 自行实现 (可访问 onKeyDown)。
 *
 * 返回的 ref 应附加到 dialog/panel 根元素。
 */
declare function useFocusTrap<T extends HTMLElement>(active: boolean): React$1.RefObject<T | null>;
/**
 * 在 ref 容器内实现 Tab 循环焦点陷阱。
 * 消费者应把返回的 onKeyDown 挂到 dialog 根元素。
 */
declare function useTabCycle<T extends HTMLElement>(active: boolean): {
  ref: React$1.RefObject<T | null>;
  onKeyDown: (e: React$1.KeyboardEvent<T>) => void;
};
interface OverlayPortalProps {
  /** 是否渲染内容。false 时不挂载 portal, 也不渲染任何节点。 */
  open: boolean;
  children: React$1.ReactNode;
  /** 自定义容器, 默认 document.body。 */
  container?: HTMLElement | null;
  /** SSR 安全守卫: window 未定义时不渲染。 */
  ssrGuard?: boolean;
}
declare const OverlayPortal: React$1.FC<OverlayPortalProps>;
/**
 * 容器外点击关闭。仅在 open=true 时生效。
 * 复用 hooks/useClickOutside (相同签名)。
 */
declare function useOverlayClickOutside(ref: React$1.RefObject<HTMLElement | null>, open: boolean, handler: () => void): void;
//#endregion
export { OverlayAlign, OverlayPortal, OverlayPortalProps, OverlaySide, useEscapeKey, useFocusTrap, useOverlayClickOutside, useOverlayState, useScrollLock, useTabCycle };
//# sourceMappingURL=OverlayPortal.d.mts.map