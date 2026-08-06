import { cva } from "class-variance-authority";
//#region src/Autocomplete/autocomplete-variants.ts
/**
* Autocomplete 的视觉变体。
*
* 输入类控件只保留 `outline`（默认）与 `soft`：层级靠 background + border 表达，
* 没有阴影、没有 blur、没有渐变。浮层样式与 `Select` 对齐。
*/
const autocompleteVariants = cva(["relative flex w-full flex-col gap-1"], {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		disabled: {
			true: "opacity-40",
			false: ""
		},
		hasError: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		disabled: false,
		hasError: false
	}
});
/** 字段标签。 */
const autocompleteLabelVariants = cva(["font-mono uppercase tracking-wider text-foreground-muted"], {
	variants: {
		size: {
			sm: "text-micro",
			md: "text-label",
			lg: "text-caption"
		},
		hasError: {
			true: "text-accent",
			false: ""
		},
		disabled: {
			true: "text-foreground-disabled",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		hasError: false,
		disabled: false
	}
});
/** 输入框外壳：边框 / 背景都在这里，Input 本体透明。 */
const autocompleteControlVariants = cva(["relative flex w-full items-center gap-2", "transition-colors duration-200 ease-nothing motion-reduce:transition-none"], {
	variants: {
		variant: {
			outline: "rounded-input border border-border-visible bg-transparent focus-within:border-foreground",
			soft: "rounded-input border border-border bg-surface-raised focus-within:border-border-visible"
		},
		size: {
			sm: "h-9 min-h-9 px-2",
			md: "h-11 min-h-11 px-3",
			lg: "h-13 min-h-13 px-4"
		},
		hasError: {
			true: "border-accent focus-within:border-accent",
			false: ""
		},
		disabled: {
			true: "border-border focus-within:border-border",
			false: ""
		}
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
		hasError: false,
		disabled: false
	}
});
/** Input 本体：无边框、无背景。 */
const autocompleteInputVariants = cva([
	"w-full min-w-0 flex-1 border-0 bg-transparent font-mono text-foreground outline-none",
	"placeholder:text-foreground-disabled",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none",
	"disabled:cursor-not-allowed disabled:text-foreground-disabled"
], {
	variants: { size: {
		sm: "py-1 text-sm",
		md: "py-2 text-base",
		lg: "py-2 text-base"
	} },
	defaultVariants: { size: "md" }
});
const autocompletePositionerVariants = cva(["z-[var(--z-overlay)]"]);
/** 浮层：与 Select 同款，surface-raised 底 + border-visible 框，无阴影。 */
const autocompleteContentVariants = cva([
	"min-w-40 overflow-hidden rounded-sm border border-border-visible bg-popover",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none",
	"closed:-translate-y-1 closed:opacity-0 open:translate-y-0 open:opacity-100"
]);
const autocompleteListVariants = cva(["max-h-60 overflow-y-auto py-1"]);
/** 选项。高亮态垫 `accent-subtle`，焦点环走 `interactive`。 */
const autocompleteItemVariants = cva([
	"relative flex min-h-9 cursor-pointer select-none items-center gap-2 px-4",
	"overflow-hidden whitespace-nowrap text-ellipsis",
	"font-mono text-sm text-foreground [-webkit-tap-highlight-color:transparent]",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none",
	"hover:bg-surface",
	"focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive"
], {
	variants: {
		size: {
			sm: "min-h-9 px-3",
			md: "min-h-11 px-4",
			lg: "min-h-13 px-4"
		},
		highlighted: {
			true: "bg-accent-subtle",
			false: ""
		},
		disabled: {
			true: "pointer-events-none text-foreground-disabled",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		highlighted: false,
		disabled: false
	}
});
/** 无结果占位行。 */
const autocompleteEmptyVariants = cva(["flex min-h-9 items-center px-4 font-mono text-sm text-foreground-disabled"]);
/** 右侧下拉箭头。 */
const autocompleteIconVariants = cva(["shrink-0 select-none text-caption text-foreground-muted", "transition-transform duration-200 ease-nothing motion-reduce:transition-none"]);
/** 清除按钮。 */
const autocompleteClearVariants = cva([
	"inline-flex shrink-0 cursor-pointer items-center justify-center",
	"border-0 bg-transparent text-foreground-muted",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none",
	"hover:text-foreground",
	"focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&svg]:size-[1em] [&svg]:shrink-0"
]);
/** 错误文案。 */
const autocompleteErrorVariants = cva(["mt-xs font-mono text-label uppercase tracking-wide text-accent"]);
//#endregion
export { autocompleteClearVariants, autocompleteContentVariants, autocompleteControlVariants, autocompleteEmptyVariants, autocompleteErrorVariants, autocompleteIconVariants, autocompleteInputVariants, autocompleteItemVariants, autocompleteLabelVariants, autocompleteListVariants, autocompletePositionerVariants, autocompleteVariants };

//# sourceMappingURL=autocomplete-variants.mjs.map