import { cn, dataAttr } from "../lib/utils.mjs";
import { scrollAreaScrollbarVariants, scrollAreaThumbVariants, scrollAreaVariants, scrollAreaViewportVariants } from "./scroll-area-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/ScrollArea/ScrollArea.tsx
function ScrollArea({ className, height, style, children, viewportProps, ...props }) {
	const viewportRef = React$1.useRef(null);
	const thumbRef = React$1.useRef(null);
	const [thumbHeight, setThumbHeight] = React$1.useState(0);
	const [thumbTop, setThumbTop] = React$1.useState(0);
	const [isDragging, setIsDragging] = React$1.useState(false);
	const dragStartY = React$1.useRef(0);
	const dragStartScrollTop = React$1.useRef(0);
	const updateThumb = React$1.useCallback(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const { scrollHeight, clientHeight, scrollTop } = viewport;
		if (scrollHeight <= clientHeight) {
			setThumbHeight(0);
			return;
		}
		const ratio = clientHeight / scrollHeight;
		const newThumbHeight = Math.max(ratio * clientHeight, 20);
		const maxThumbTop = clientHeight - newThumbHeight;
		const newThumbTop = scrollTop / (scrollHeight - clientHeight) * maxThumbTop;
		setThumbHeight(newThumbHeight);
		setThumbTop(newThumbTop);
	}, []);
	React$1.useEffect(() => {
		updateThumb();
		const viewport = viewportRef.current;
		if (!viewport) return;
		const observer = new ResizeObserver(updateThumb);
		observer.observe(viewport);
		return () => observer.disconnect();
	}, [updateThumb, children]);
	const { className: viewportClassName, ref: callerViewportRef, onScroll: callerOnScroll, ...restViewportProps } = viewportProps ?? {};
	const setViewportRef = React$1.useCallback((node) => {
		viewportRef.current = node;
		if (typeof callerViewportRef === "function") callerViewportRef(node);
		else if (callerViewportRef) callerViewportRef.current = node;
	}, [callerViewportRef]);
	const handleScroll = React$1.useCallback((event) => {
		if (!isDragging) updateThumb();
		callerOnScroll?.(event);
	}, [
		updateThumb,
		isDragging,
		callerOnScroll
	]);
	const handleThumbMouseDown = React$1.useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
		dragStartY.current = e.clientY;
		dragStartScrollTop.current = viewportRef.current?.scrollTop ?? 0;
	}, []);
	React$1.useEffect(() => {
		if (!isDragging) return;
		const handleMouseMove = (e) => {
			const viewport = viewportRef.current;
			if (!viewport) return;
			const deltaY = e.clientY - dragStartY.current;
			const { scrollHeight, clientHeight } = viewport;
			const ratio = clientHeight / scrollHeight;
			viewport.scrollTop = dragStartScrollTop.current + deltaY / ratio;
			updateThumb();
		};
		const handleMouseUp = () => setIsDragging(false);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, updateThumb]);
	const handleTrackClick = React$1.useCallback((e) => {
		const viewport = viewportRef.current;
		const scrollbar = e.currentTarget;
		if (!viewport) return;
		const rect = scrollbar.getBoundingClientRect();
		viewport.scrollTop = (e.clientY - rect.top) / rect.height * viewport.scrollHeight;
		updateThumb();
	}, [updateThumb]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn(scrollAreaVariants(), className),
		style: height ? {
			height,
			...style
		} : style,
		"data-slot": "scroll-area",
		"data-dragging": dataAttr(isDragging),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			ref: setViewportRef,
			className: cn(scrollAreaViewportVariants(), viewportClassName),
			"data-slot": "scroll-area-viewport",
			tabIndex: 0,
			role: restViewportProps["aria-label"] || restViewportProps["aria-labelledby"] ? "region" : void 0,
			...restViewportProps,
			onScroll: handleScroll,
			children
		}), /* @__PURE__ */ jsx("div", {
			className: scrollAreaScrollbarVariants(),
			"data-slot": "scroll-area-scrollbar",
			onClick: handleTrackClick,
			children: /* @__PURE__ */ jsx("div", {
				ref: thumbRef,
				className: scrollAreaThumbVariants(),
				"data-slot": "scroll-area-thumb",
				style: {
					height: thumbHeight > 0 ? thumbHeight : 0,
					top: thumbTop
				},
				onMouseDown: handleThumbMouseDown
			})
		})]
	});
}
ScrollArea.displayName = "ScrollArea";
//#endregion
export { ScrollArea as default };

//# sourceMappingURL=ScrollArea.mjs.map