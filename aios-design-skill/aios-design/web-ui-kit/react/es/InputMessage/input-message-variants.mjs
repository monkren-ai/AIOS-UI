import { cva } from "class-variance-authority";
//#region src/InputMessage/input-message-variants.ts
/** 聊天输入器外层：输入行 + 下方的提示/计数。 */
const inputMessageVariants = cva(["flex flex-col gap-xs font-body"], {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		disabled: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		disabled: false
	}
});
/** textarea + 发送按钮的一行。 */
const inputMessageControlVariants = cva([
	"flex items-end gap-2",
	"rounded-input border border-border-visible bg-surface",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none",
	"focus-within:border-foreground-muted"
], {
	variants: { size: {
		sm: "px-2 py-1",
		md: "p-2",
		lg: "p-4"
	} },
	defaultVariants: { size: "md" }
});
/** 自动增高的 textarea。高度由 JS 写在 style 上。 */
const inputMessageFieldVariants = cva([
	"max-h-50 min-w-0 flex-1 resize-none border-0 bg-transparent p-0",
	"text-start font-body text-foreground outline-none",
	"placeholder:text-foreground-subtle",
	"disabled:cursor-not-allowed disabled:opacity-60"
], {
	variants: { size: {
		sm: "text-caption",
		md: "text-sm",
		lg: "text-base"
	} },
	defaultVariants: { size: "md" }
});
/** 发送按钮：实心反相。 */
const inputMessageSendVariants = cva([
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-1",
	"rounded-sm border border-transparent bg-foreground text-surface",
	"font-mono uppercase tracking-widest",
	"transition-[background-color,color,opacity,transform] duration-200 ease-aios",
	"motion-reduce:transition-none",
	"hover:not-disabled:bg-foreground-display",
	"active:not-disabled:scale-[0.97] motion-reduce:active:scale-100",
	"disabled:cursor-not-allowed disabled:opacity-40",
	"focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: { size: {
		sm: "min-h-7 px-2 py-1 text-micro",
		md: "min-h-9 px-2 py-1 text-micro",
		lg: "min-h-11 px-4 py-2 text-caption"
	} },
	defaultVariants: { size: "md" }
});
const inputMessageSendLabelVariants = cva([]);
const inputMessageSendIconVariants = cva(["shrink-0"], {
	variants: { size: {
		sm: "size-2.5",
		md: "size-3",
		lg: "size-3.5"
	} },
	defaultVariants: { size: "md" }
});
/** 提示 + 计数一行，两端对齐。 */
const inputMessageMetaVariants = cva(["flex items-center justify-between px-1"]);
const inputMessageHintVariants = cva(["font-mono text-micro uppercase tracking-widest text-foreground-disabled"]);
const inputMessageCountVariants = cva(["font-mono text-micro uppercase tracking-widest text-foreground-disabled"]);
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = { default: "md" };
function resolveInputMessageSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
//#endregion
export { inputMessageControlVariants, inputMessageCountVariants, inputMessageFieldVariants, inputMessageHintVariants, inputMessageMetaVariants, inputMessageSendIconVariants, inputMessageSendLabelVariants, inputMessageSendVariants, inputMessageVariants, resolveInputMessageSize };

//# sourceMappingURL=input-message-variants.mjs.map