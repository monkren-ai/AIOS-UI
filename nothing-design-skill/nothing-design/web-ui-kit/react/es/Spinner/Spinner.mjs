import { cn, dataAttr } from "../lib/utils.mjs";
import { Button } from "../Button/Button.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Spinner.css";
//#region src/Spinner/Spinner.tsx
const spinnerVariants = cva("nothing-spinner", {
	variants: {
		size: {
			sm: "nothing-spinner--sm",
			md: "nothing-spinner--md",
			lg: "nothing-spinner--lg"
		},
		variant: {
			default: "nothing-spinner--default",
			accent: "nothing-spinner--accent"
		}
	},
	defaultVariants: {
		size: "md",
		variant: "default"
	}
});
const spinnerSectorVariants = cva("nothing-spinner-sector", {
	variants: {
		isEven: {
			true: "nothing-spinner-sector-even",
			false: "nothing-spinner-sector-odd"
		},
		selected: {
			true: "selected",
			false: ""
		}
	},
	defaultVariants: {
		isEven: true,
		selected: false
	}
});
const spinnerTextVariants = cva("nothing-spinner-sector-text", {
	variants: {
		isEven: {
			true: "nothing-spinner-sector-text-even",
			false: "nothing-spinner-sector-text-odd"
		},
		selected: {
			true: "selected",
			false: ""
		}
	},
	defaultVariants: {
		isEven: true,
		selected: false
	}
});
const defaultItems = [
	"YES",
	"NO",
	"MAYBE",
	"LATER",
	"SKIP",
	"TRY"
];
const Spinner = React.forwardRef(({ className, items = defaultItems, spinDuration = 3500, size = "md", variant = "default", style, ...props }, ref) => {
	const [rotation, setRotation] = React.useState(0);
	const [isSpinning, setIsSpinning] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(null);
	const [result, setResult] = React.useState("");
	const rotationRef = React.useRef(0);
	const pendingIndexRef = React.useRef(null);
	const transitionEndedRef = React.useRef(false);
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
		ref,
		className: cn(spinnerVariants({
			size,
			variant
		}), className),
		style,
		"data-state": dataAttr(isSpinning ? "spinning" : "idle"),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-spinner-wheel-container",
				children: [/* @__PURE__ */ jsx("div", { className: "nothing-spinner-pointer" }), /* @__PURE__ */ jsxs("svg", {
					className: "nothing-spinner-svg",
					viewBox: "0 0 300 300",
					style: { transform: `rotate(${rotation}deg)` },
					onTransitionEnd: handleSpinEnd,
					children: [
						sectors.map(({ d, isEven, item, tx, ty, textRotation, index }) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("path", {
							className: cn(spinnerSectorVariants({
								isEven,
								selected: selectedIndex === index
							})),
							d
						}), /* @__PURE__ */ jsx("text", {
							className: cn(spinnerTextVariants({
								isEven,
								selected: selectedIndex === index
							})),
							x: tx,
							y: ty,
							transform: `rotate(${textRotation} ${tx} ${ty})`,
							children: item
						})] }, index)),
						/* @__PURE__ */ jsx("circle", {
							className: "nothing-spinner-center",
							cx,
							cy,
							r: 24
						}),
						/* @__PURE__ */ jsx("circle", {
							className: "nothing-spinner-center-dot",
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
				onClick: handleSpin,
				loading: isSpinning,
				loadingText: "SPINNING…",
				style: { marginBottom: "var(--space-md)" },
				children: "SPIN"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-spinner-result",
				children: result
			})
		]
	});
});
Spinner.displayName = "Spinner";
//#endregion
export { Spinner, Spinner as default, spinnerSectorVariants, spinnerTextVariants, spinnerVariants };

//# sourceMappingURL=Spinner.mjs.map