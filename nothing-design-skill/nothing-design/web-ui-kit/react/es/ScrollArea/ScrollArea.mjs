import { cn } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./ScrollArea.css";
//#region src/ScrollArea/ScrollArea.tsx
const ScrollArea = React$1.forwardRef(({ className, height, style, children, ...props }, ref) => {
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
	const handleScroll = React$1.useCallback(() => {
		if (!isDragging) updateThumb();
	}, [updateThumb, isDragging]);
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
		ref,
		className: cn("nothing-scroll-area", className),
		style: height ? {
			height,
			...style
		} : style,
		"data-dragging": isDragging || void 0,
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			ref: viewportRef,
			className: "nothing-scroll-area__viewport",
			onScroll: handleScroll,
			children
		}), /* @__PURE__ */ jsx("div", {
			className: "nothing-scroll-area__scrollbar",
			onClick: handleTrackClick,
			children: /* @__PURE__ */ jsx("div", {
				ref: thumbRef,
				className: "nothing-scroll-area__thumb",
				style: {
					height: thumbHeight > 0 ? thumbHeight : 0,
					top: thumbTop
				},
				onMouseDown: handleThumbMouseDown
			})
		})]
	});
});
ScrollArea.displayName = "ScrollArea";
//#endregion
export { ScrollArea as default };

//# sourceMappingURL=ScrollArea.mjs.map