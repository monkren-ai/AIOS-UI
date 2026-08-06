import { cva } from "class-variance-authority";
//#region src/TextAnimate/text-animate-variants.ts
/**
* TextAnimate 的视觉变体。
*
* 容器只承担过渡与 mode 钩子；逐段揭示的动画写在 segment 上（见 TextAnimate.css
* 的 `nothing-text-reveal` keyframes + 组件里的 `motion-safe:animate-[...]`）。
* `mode` 决定切分粒度，并在此挂上 `data-mode` 供样式选择。
*/
const textAnimateVariants = cva(["nothing-text-animate", "transition-[opacity,transform] duration-300 ease-nothing motion-reduce:transition-none"], {
	variants: { mode: {
		char: "",
		word: "",
		line: ""
	} },
	defaultVariants: { mode: "word" }
});
//#endregion
export { textAnimateVariants };

//# sourceMappingURL=text-animate-variants.mjs.map