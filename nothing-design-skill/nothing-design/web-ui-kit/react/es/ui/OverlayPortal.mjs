import "../hooks/useDisclosure.mjs";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
//#region src/ui/OverlayPortal.tsx
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
function useOverlayState(controlled, onChange) {
	const [internal, setInternal] = useState(false);
	const isOpen = controlled !== void 0 ? controlled : internal;
	const setOpen = useCallback((next) => {
		if (controlled === void 0) setInternal(next);
		onChange?.(next);
	}, [controlled, onChange]);
	return {
		isOpen,
		setOpen,
		open: () => setOpen(true),
		close: () => setOpen(false),
		toggle: () => setOpen(!isOpen)
	};
}
/**
* 全局 Escape 键监听。active=true 时挂载, false 时卸载。
* 注: 不调用 e.preventDefault(), 让上层 focus trap 可继续处理 Tab 等。
*/
function useEscapeKey(active, handler) {
	useEffect(() => {
		if (!active) return;
		const fn = (e) => {
			if (e.key === "Escape") handler();
		};
		document.addEventListener("keydown", fn);
		return () => document.removeEventListener("keydown", fn);
	}, [active, handler]);
}
const OverlayPortal = ({ open, children, container, ssrGuard = true }) => {
	if (!open) return null;
	if (ssrGuard && typeof document === "undefined") return null;
	return createPortal(children, container ?? document.body);
};
//#endregion
export { OverlayPortal, useEscapeKey, useOverlayState };

//# sourceMappingURL=OverlayPortal.mjs.map