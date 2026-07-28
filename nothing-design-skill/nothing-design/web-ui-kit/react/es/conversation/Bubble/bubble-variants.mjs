import { cva } from "class-variance-authority";
//#region src/conversation/Bubble/bubble-variants.ts
const bubbleVariants = cva("nothing-bubble", {
	variants: {
		placement: {
			start: "nothing-bubble--start",
			end: "nothing-bubble--end"
		},
		variant: {
			filled: "nothing-bubble--filled",
			outlined: "nothing-bubble--outlined",
			borderless: "nothing-bubble--borderless"
		},
		shape: {
			default: "",
			round: "nothing-bubble--round",
			corner: "nothing-bubble--corner"
		},
		loading: {
			true: "nothing-bubble--loading",
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