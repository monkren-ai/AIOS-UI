import { cva } from "class-variance-authority";
//#region src/NotificationBadge/notification-badge-variants.ts
const notificationBadgeVariants = cva("relative inline-flex");
const notificationBadgeMarkerVariants = cva(["absolute -top-1 -end-1 z-1", "motion-safe:animate-notification-in motion-reduce:animate-none"], {
	variants: { dot: {
		true: "",
		false: ""
	} },
	defaultVariants: { dot: false }
});
const notificationBadgeDotVariants = cva("block size-2 rounded-full bg-accent ring-2 ring-background");
//#endregion
export { notificationBadgeDotVariants, notificationBadgeMarkerVariants, notificationBadgeVariants };

//# sourceMappingURL=notification-badge-variants.mjs.map