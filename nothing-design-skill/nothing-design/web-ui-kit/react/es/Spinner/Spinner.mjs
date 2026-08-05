import { cn, dataAttr } from "../lib/utils.mjs";
import Button from "../Button/Button.mjs";
import { resolveSpinnerVariant, spinnerPointerVariants, spinnerSectorVariants, spinnerSvgVariants, spinnerTextVariants, spinnerVariants, spinnerWheelVariants } from "./spinner-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Spinner/Spinner.tsx
const defaultItems = [
	"YES",
	"NO",
	"MAYBE",
	"LATER",
	"SKIP",
	"TRY"
];
function Spinner({ className, items = defaultItems, spinDuration = 3500, size = "md", variant, ...props }) {
	const [rotation, setRotation] = React.useState(0);
	const [isSpinning, setIsSpinning] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(null);
	const [result, setResult] = React.useState("");
	const rotationRef = React.useRef(0);
	const pendingIndexRef = React.useRef(null);
	const transitionEndedRef = React.useRef(false);
	const resolvedVariant = resolveSpinnerVariant(variant) ?? "soft";
	const n = items.length;
	const sectorAngle = 2 * Math.PI / n;
	const cx = 150;
	const cy = 150;
	const r = 140;
	const sectors = items.map((item, i) => {
		const startAngle = i * sectorAngle - Math.PI / 2;
		const endAngle = startAngle + sectorAngle;
		const isEven = i % 2 === 0;
		const x1 = cx + r * Math.cos(startAngle);
		const y1 = cy + r * Math.sin(startAngle);
		const x2 = cx + r * Math.cos(endAngle);
		const y2 = cy + r * Math.sin(endAngle);
		const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${sectorAngle > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`;
		const midAngle = startAngle + sectorAngle / 2;
		const textR = r * .65;
		return {
			d,
			isEven,
			item,
			tx: cx + textR * Math.cos(midAngle),
			ty: cy + textR * Math.sin(midAngle),
			textRotation: midAngle * 180 / Math.PI + 90,
			index: i
		};
	});
	const handleSpinEnd = React.useCallback(() => {
		if (transitionEndedRef.current) return;
		transitionEndedRef.current = true;
		setIsSpinning(false);
		if (pendingIndexRef.current !== null) {
			setSelectedIndex(pendingIndexRef.current);
			setResult(items[pendingIndexRef.current]);
		}
	}, [items]);
	const handleSpin = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setSelectedIndex(null);
		setResult("");
		transitionEndedRef.current = false;
		const sectorDeg = 360 / n;
		const targetIndex = Math.floor(Math.random() * n);
		const extraSpins = 5 + Math.floor(Math.random() * 3);
		const targetAngle = 360 - (targetIndex * sectorDeg + sectorDeg / 2);
		const totalRotation = extraSpins * 360 + targetAngle;
		rotationRef.current += totalRotation;
		pendingIndexRef.current = targetIndex;
		setRotation(rotationRef.current);
		setTimeout(() => {
			handleSpinEnd();
		}, spinDuration + 500);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(spinnerVariants({
			variant: resolvedVariant,
			size
		}), className),
		"data-slot": "spinner",
		"data-variant": dataAttr(resolveSpinnerVariant(variant) ?? "soft"),
		"data-size": dataAttr(size),
		"data-state": dataAttr(isSpinning ? "spinning" : "idle"),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "spinner-wheel",
				className: spinnerWheelVariants({ size }),
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "spinner-pointer",
					"aria-hidden": "true",
					className: spinnerPointerVariants()
				}), /* @__PURE__ */ jsxs("svg", {
					"data-slot": "spinner-dial",
					className: spinnerSvgVariants(),
					viewBox: "0 0 300 300",
					style: { transform: `rotate(${rotation}deg)` },
					onTransitionEnd: handleSpinEnd,
					children: [
						sectors.map(({ d, isEven, item, tx, ty, textRotation, index }) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("path", {
							"data-slot": "spinner-sector",
							"data-selected": dataAttr(selectedIndex === index),
							className: spinnerSectorVariants({
								isEven,
								selected: selectedIndex === index
							}),
							d
						}), /* @__PURE__ */ jsx("text", {
							"data-slot": "spinner-sector-text",
							className: spinnerTextVariants({
								isEven,
								selected: selectedIndex === index
							}),
							x: tx,
							y: ty,
							transform: `rotate(${textRotation} ${tx} ${ty})`,
							children: item
						})] }, index)),
						/* @__PURE__ */ jsx("circle", {
							"data-slot": "spinner-hub",
							className: "fill-surface stroke-border [stroke-width:2]",
							cx,
							cy,
							r: 24
						}),
						/* @__PURE__ */ jsx("circle", {
							"data-slot": "spinner-hub-dot",
							className: "fill-accent",
							cx,
							cy,
							r: 6
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(Button, {
				variant: "primary",
				size: "lg",
				className: "mb-4",
				onClick: handleSpin,
				loading: isSpinning,
				loadingText: "SPINNING…",
				children: "SPIN"
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "spinner-result",
				className: "min-h-8 text-center font-body text-heading font-bold text-accent",
				children: result
			})
		]
	});
}
Spinner.displayName = "Spinner";
//#endregion
export { Spinner as default };

//# sourceMappingURL=Spinner.mjs.map