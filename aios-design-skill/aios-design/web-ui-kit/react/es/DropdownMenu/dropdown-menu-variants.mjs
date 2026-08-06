import { cva } from "class-variance-authority";
//#region src/DropdownMenu/dropdown-menu-variants.ts
const dropdownMenuVariants = cva("relative inline-block");
const dropdownMenuTriggerVariants = cva([
	"inline-flex cursor-pointer items-center",
	"rounded-sm border-none bg-transparent px-2 py-1",
	"font-mono text-sm text-foreground",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:bg-muted",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
]);
const dropdownMenuPositionerVariants = cva("z-[var(--z-dropdown)]");
const dropdownMenuContentVariants = cva([
	"min-w-[180px] rounded-sm border border-border-visible bg-popover py-1 text-popover-foreground",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none",
	"closed:scale-95 closed:opacity-0 open:scale-100 open:opacity-100"
], {
	variants: {
		visible: {
			true: "scale-100 opacity-100",
			false: ""
		},
		align: {
			start: "",
			center: "",
			end: ""
		}
	},
	defaultVariants: {
		visible: false,
		align: "start"
	}
});
const dropdownMenuItemVariants = cva([
	"flex cursor-pointer select-none items-center gap-2 whitespace-nowrap px-4 py-1",
	"font-mono text-sm text-foreground",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:bg-muted highlighted:bg-muted",
	"outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
], {
	variants: {
		disabled: {
			true: "pointer-events-none text-foreground-disabled",
			false: ""
		},
		highlighted: {
			true: "bg-muted",
			false: ""
		}
	},
	defaultVariants: {
		disabled: false,
		highlighted: false
	}
});
const dropdownMenuItemIconVariants = cva("inline-flex size-4 shrink-0 items-center justify-center text-foreground-muted");
const dropdownMenuItemLabelVariants = cva("flex-1");
const dropdownMenuItemShortcutVariants = cva("ms-6 font-mono text-caption text-foreground-disabled");
const dropdownMenuSeparatorVariants = cva("my-1 h-px bg-border");
const menubarVariants = cva("flex items-center gap-0 font-mono text-sm");
const menubarTriggerVariants = cva([
	"inline-flex min-h-11 cursor-pointer select-none items-center whitespace-nowrap",
	"border-none bg-transparent px-4 py-2",
	"font-mono text-sm text-foreground-muted",
	"transition-[color,background-color] duration-[var(--duration-micro)] ease-aios",
	"motion-reduce:transition-none",
	"hover:text-foreground",
	"outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
], {
	variants: { active: {
		true: "bg-surface-raised text-foreground",
		false: ""
	} },
	defaultVariants: { active: false }
});
const menubarDropdownVariants = cva([
	"min-w-[200px] rounded-sm border border-border-visible bg-popover py-1",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none",
	"closed:-translate-y-1 closed:opacity-0 open:translate-y-0 open:opacity-100"
], {
	variants: { visible: {
		true: "translate-y-0 opacity-100",
		false: ""
	} },
	defaultVariants: { visible: false }
});
const menubarItemVariants = cva([
	"flex cursor-pointer select-none items-center justify-between gap-6 whitespace-nowrap px-4 py-2",
	"text-popover-foreground",
	"transition-colors duration-[var(--duration-micro)] ease-aios motion-reduce:transition-none",
	"hover:bg-muted highlighted:bg-muted",
	"outline-none focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-interactive focus-visible:-outline-offset-2"
], {
	variants: {
		disabled: {
			true: "pointer-events-none text-foreground-disabled",
			false: ""
		},
		highlighted: {
			true: "bg-muted",
			false: ""
		}
	},
	defaultVariants: {
		disabled: false,
		highlighted: false
	}
});
const menubarItemLabelVariants = cva("font-body text-sm");
const menubarItemShortcutVariants = cva("font-mono text-caption text-foreground-disabled");
const menubarSeparatorVariants = cva("my-1 h-px bg-border");
//#endregion
export { dropdownMenuContentVariants, dropdownMenuItemIconVariants, dropdownMenuItemLabelVariants, dropdownMenuItemShortcutVariants, dropdownMenuItemVariants, dropdownMenuPositionerVariants, dropdownMenuSeparatorVariants, dropdownMenuTriggerVariants, dropdownMenuVariants, menubarDropdownVariants, menubarItemLabelVariants, menubarItemShortcutVariants, menubarItemVariants, menubarSeparatorVariants, menubarTriggerVariants, menubarVariants };

//# sourceMappingURL=dropdown-menu-variants.mjs.map