import { cva } from "class-variance-authority";
//#region src/conversation/Bubble/bubble-variants.ts
const bubbleVariants = cva("aios-bubble", {
	variants: {
		placement: {
			start: "aios-bubble--start",
			end: "aios-bubble--end"
		},
		variant: {
			filled: "aios-bubble--filled",
			outlined: "aios-bubble--outlined",
			borderless: "aios-bubble--borderless"
		},
		shape: {
			default: "",
			round: "aios-bubble--round",
			corner: "aios-bubble--corner"
		},
		loading: {
			true: "aios-bubble--loading",
			false: ""
		}
	},
	defaultVariants: {
		placement: "start",
		variant: "filled",
		shape: "default",
		loading: false
	}
});
//#endregion
export { bubbleVariants };

//# sourceMappingURL=bubble-variants.mjs.map