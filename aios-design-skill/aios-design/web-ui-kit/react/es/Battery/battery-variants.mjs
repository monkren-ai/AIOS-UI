import { cva } from "class-variance-authority";
//#region src/Battery/battery-variants.ts
const batteryVariants = cva("flex w-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors motion-reduce:transition-none", {
	variants: {
		variant: {
			segmented: "",
			ring: "items-center"
		},
		level: {
			critical: "",
			low: "",
			medium: "",
			high: ""
		}
	},
	defaultVariants: {
		variant: "segmented",
		level: "high"
	}
});
const batteryPercentVariants = cva("font-display text-display-lg font-semibold leading-none tabular-nums text-foreground-display");
const batteryStatusVariants = cva("font-mono text-sm uppercase tracking-widest", {
	variants: { charging: {
		true: "text-success",
		false: "text-foreground-muted"
	} },
	defaultVariants: { charging: false }
});
const batteryProgressVariants = cva("flex h-4 w-full gap-0.5");
const batterySegmentVariants = cva("flex-1 transition-colors", {
	variants: {
		filled: {
			true: "",
			false: "bg-border"
		},
		level: {
			critical: "",
			low: "",
			medium: "",
			high: ""
		}
	},
	compoundVariants: [
		{
			filled: true,
			level: "high",
			class: "bg-success"
		},
		{
			filled: true,
			level: "medium",
			class: "bg-foreground-display"
		},
		{
			filled: true,
			level: "low",
			class: "bg-warning"
		},
		{
			filled: true,
			level: "critical",
			class: "bg-error"
		}
	],
	defaultVariants: {
		filled: false,
		level: "high"
	}
});
const batteryRingVariants = cva("relative flex size-40 items-center justify-center rounded-full border border-border bg-surface");
const batteryDeviceVariants = cva("flex min-h-11 items-center gap-2 rounded-sm px-2 transition-colors", {
	variants: { clickable: {
		true: "cursor-pointer hover:bg-muted focus-visible:outline-2 focus-visible:outline-interactive",
		false: ""
	} },
	defaultVariants: { clickable: false }
});
//#endregion
export { batteryDeviceVariants, batteryPercentVariants, batteryProgressVariants, batteryRingVariants, batterySegmentVariants, batteryStatusVariants, batteryVariants };

//# sourceMappingURL=battery-variants.mjs.map