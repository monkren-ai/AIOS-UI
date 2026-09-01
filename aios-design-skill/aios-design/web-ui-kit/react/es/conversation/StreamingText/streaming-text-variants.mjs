import { cva } from "class-variance-authority";
//#region src/conversation/StreamingText/streaming-text-variants.ts
const streamingTextVariants = cva("whitespace-pre-wrap", {
	variants: { variant: {
		plain: "",
		fade: "",
		tail: ""
	} },
	defaultVariants: { variant: "fade" }
});
const streamingTextSegmentVariants = cva("aios-streaming-text__segment", {
	variants: { variant: {
		plain: "",
		fade: "aios-streaming-text__segment--fade",
		tail: "aios-streaming-text__segment--tail"
	} },
	defaultVariants: { variant: "fade" }
});
//#endregion
export { streamingTextSegmentVariants, streamingTextVariants };

//# sourceMappingURL=streaming-text-variants.mjs.map