import { OVERLAY_REDUCED_MOTION, overlayDuration, overlayModalMotion } from "../lib/overlay-motion.mjs";
import { cva } from "class-variance-authority";
//#region src/AlertDialog/alert-dialog-variants.ts
const alertDialogBackdropVariants = cva([
	"fixed inset-0 z-50 bg-background/80",
	"transition-opacity",
	...overlayDuration("slow"),
	OVERLAY_REDUCED_MOTION,
	"open:opacity-100 closed:opacity-0"
]);
const alertDialogViewportVariants = cva(["fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"]);
const alertDialogPopupVariants = cva([
	"relative flex w-full max-w-md flex-col rounded-card border bg-surface-raised p-6 text-foreground",
	"outline-none",
	...overlayModalMotion
], {
	variants: { destructive: {
		true: "border-accent",
		false: "border-border-visible"
	} },
	defaultVariants: { destructive: false }
});
const alertDialogHeaderVariants = cva(["flex flex-col gap-2"]);
const alertDialogTitleVariants = cva(["font-mono text-subheading font-bold uppercase tracking-wider"], {
	variants: { destructive: {
		true: "text-accent",
		false: "text-foreground-display"
	} },
	defaultVariants: { destructive: false }
});
const alertDialogDescriptionVariants = cva(["font-body text-sm text-foreground-muted"]);
const alertDialogBodyVariants = cva(["mt-4 font-body text-sm text-foreground"]);
const alertDialogFooterVariants = cva(["mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"]);
//#endregion
export { alertDialogBackdropVariants, alertDialogBodyVariants, alertDialogDescriptionVariants, alertDialogFooterVariants, alertDialogHeaderVariants, alertDialogPopupVariants, alertDialogTitleVariants, alertDialogViewportVariants };

//# sourceMappingURL=alert-dialog-variants.mjs.map