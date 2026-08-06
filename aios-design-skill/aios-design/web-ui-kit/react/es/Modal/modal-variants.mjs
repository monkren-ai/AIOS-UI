import { cva } from "class-variance-authority";
//#region src/Modal/modal-variants.ts
/**
* Modal 的视觉变体。
*
* 居中不再用 `top/left: 50%` + `translate(-50%, -50%)`：那套写法在 RTL 下
* 需要额外镜像。改用 `fixed inset-0 m-auto`（inset 对称，天然 RTL 安全），
* 把 translate 完整让给进场动画。
*/
const modalBackdropVariants = cva([
	"fixed inset-0 z-[var(--z-modal)] bg-overlay",
	"flex items-center justify-center",
	"transition-[opacity,visibility] duration-[var(--duration-transition)] ease-aios",
	"motion-reduce:transition-none"
], {
	variants: {
		alert: {
			true: "",
			false: ""
		},
		visible: {
			true: "visible opacity-100",
			false: "invisible opacity-0"
		}
	},
	defaultVariants: {
		alert: false,
		visible: false
	}
});
const modalVariants = cva([
	"fixed inset-0 z-[calc(var(--z-modal)+1)] m-auto h-fit",
	"w-[calc(100%-var(--spacing-lg))] max-w-[var(--modal-max-width)] max-h-[90vh] overflow-y-auto",
	"rounded-lg border border-border-visible bg-surface",
	"transition-[transform,opacity] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none",
	"translate-y-4 open:translate-y-0"
], {
	variants: {
		alert: {
			true: "max-w-[var(--modal-max-width-sm)] max-h-none overflow-y-visible translate-y-0 scale-95 open:scale-100",
			false: ""
		},
		destructive: {
			true: "",
			false: ""
		},
		noHeader: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		alert: false,
		destructive: false,
		noHeader: false
	}
});
/** 关闭按钮（右上角的 ×）。无标题时贴得更靠边。 */
const modalCloseVariants = cva([
	"absolute z-1 flex min-h-11 min-w-11 items-center justify-center p-1",
	"cursor-pointer border-none bg-transparent",
	"font-mono text-sm text-foreground-muted",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:text-foreground-display",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: { noHeader: {
		true: "top-2 end-2",
		false: "top-4 end-4"
	} },
	defaultVariants: { noHeader: false }
});
/** 头部。默认给 × 留出 60px 的行末空间；alert 没有 × 就不用留。 */
const modalHeaderVariants = cva("border-b border-border p-6", {
	variants: { alert: {
		true: "pe-6",
		false: "pe-[60px]"
	} },
	defaultVariants: { alert: false }
});
const modalTitleVariants = cva("font-mono text-subheading uppercase tracking-wide", {
	variants: {
		alert: {
			true: "mb-1",
			false: ""
		},
		destructive: {
			true: "text-accent",
			false: "text-foreground"
		}
	},
	defaultVariants: {
		alert: false,
		destructive: false
	}
});
const modalDescriptionVariants = cva("font-body text-base text-foreground-muted");
const modalBodyVariants = cva("p-6 font-body text-base text-foreground");
const modalFooterVariants = cva("flex items-center justify-end gap-2 border-t border-border px-6 py-4");
/** alert 的两颗按钮共享的形状；配色由各自的变体接上。 */
const MODAL_ACTION_BASE = [
	"inline-flex min-h-11 cursor-pointer select-none items-center justify-center",
	"rounded-pill border px-6 py-3",
	"font-mono text-xs font-bold uppercase tracking-wider",
	"transition-[background-color,border-color,color,opacity] duration-[var(--duration-micro)] ease-aios",
	"motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
];
const modalCancelVariants = cva([
	...MODAL_ACTION_BASE,
	"border-border-visible bg-transparent text-foreground",
	"hover:border-foreground-muted hover:text-foreground-display"
]);
const modalConfirmVariants = cva(MODAL_ACTION_BASE, {
	variants: { destructive: {
		true: "border-accent bg-transparent text-accent hover:bg-accent-subtle hover:opacity-100 active:bg-accent active:text-black",
		false: "border-foreground-display bg-foreground-display text-black hover:opacity-85"
	} },
	defaultVariants: { destructive: false }
});
//#endregion
export { modalBackdropVariants, modalBodyVariants, modalCancelVariants, modalCloseVariants, modalConfirmVariants, modalDescriptionVariants, modalFooterVariants, modalHeaderVariants, modalTitleVariants, modalVariants };

//# sourceMappingURL=modal-variants.mjs.map