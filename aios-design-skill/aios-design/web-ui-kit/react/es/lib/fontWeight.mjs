//#region src/lib/fontWeight.ts
/**
* font-variation-settings 值，适用于支持可变字重的字体。
*/
const fontVariationWeights = {
	normal: "'wght' 400",
	medium: "'wght' 500",
	semibold: "'wght' 600",
	bold: "'wght' 700"
};
/**
* 标准 font-weight 值，作为降级方案。
*/
const fontWeightValues = {
	normal: "400",
	medium: "500",
	semibold: "600",
	bold: "700"
};
/**
* 组件 CSS 中建议使用 `.nothing-font-weight-transition` 类：
*
* ```css
* .nothing-font-weight-transition {
*   transition: font-weight var(--duration-micro) var(--easing),
*               font-variation-settings var(--duration-micro) var(--easing);
* }
* ```
*
* 这样当父元素 hover 时子元素的字重会平滑过渡。
*/
const FONT_WEIGHT_TRANSITION_CSS = `
.nothing-font-weight-transition {
  transition:
    font-weight var(--duration-micro) var(--easing),
    font-variation-settings var(--duration-micro) var(--easing);
}
`;
//#endregion
export { FONT_WEIGHT_TRANSITION_CSS, fontVariationWeights, fontWeightValues };

//# sourceMappingURL=fontWeight.mjs.map