import { cva } from "class-variance-authority";
//#region src/InputOTP/input-otp-variants.ts
/**
* OTP 输入框。
*
* 槽位顺序完全交给 flex —— 没有任何 `left` / `right`，
* `dir="rtl"` 时整排槽位与方向键导航一起镜像。
*/
const inputOTPVariants = cva(["flex items-center gap-xs"], {
	variants: {
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		disabled: {
			true: "pointer-events-none opacity-40",
			false: ""
		},
		error: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		disabled: false,
		error: false
	}
});
/** 单个数字槽位。 */
const inputOTPSlotVariants = cva([
	"relative flex items-center justify-center",
	"rounded-md border border-border-visible bg-transparent",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none"
], {
	variants: {
		size: {
			sm: "h-9 w-8",
			md: "h-11 w-10",
			lg: "h-13 w-11"
		},
		active: {
			true: "border-interactive",
			false: ""
		},
		filled: {
			true: "text-foreground-display",
			false: ""
		},
		error: {
			true: "border-accent",
			false: ""
		}
	},
	compoundVariants: [{
		error: true,
		active: true,
		class: "border-accent"
	}],
	defaultVariants: {
		size: "md",
		active: false,
		filled: false,
		error: false
	}
});
/** 铺满槽位的透明 input。光标隐藏，靠槽位边框表达聚焦。 */
const inputOTPInputVariants = cva([
	"absolute inset-0 size-full border-0 bg-transparent p-0",
	"text-center font-mono text-foreground-display caret-transparent",
	"outline-none focus-visible:outline-none",
	"disabled:cursor-not-allowed"
], {
	variants: { size: {
		sm: "text-base",
		md: "text-subheading",
		lg: "text-heading"
	} },
	defaultVariants: { size: "md" }
});
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = { default: "md" };
function resolveInputOTPSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
//#endregion
export { inputOTPInputVariants, inputOTPSlotVariants, inputOTPVariants, resolveInputOTPSize };

//# sourceMappingURL=input-otp-variants.mjs.map