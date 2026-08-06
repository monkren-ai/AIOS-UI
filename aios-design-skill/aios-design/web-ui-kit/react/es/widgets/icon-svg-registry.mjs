import widget_svg_paths_default from "./widget-svg-paths.mjs";
//#region src/widgets/icon-svg-registry.ts
/**
* Central SVG string registry for DotMatrixIcon integration.
*
* Provides full <svg>...</svg> markup strings for every icon set in the project:
* - widgetIconSvg: 40 WidgetIcons (from widget-svg-paths.ts)
* - quickToggleSvg: 8 QuickToggle inline SVGs (from App.tsx)
* - weatherSvg: 7 weather SVG files (via Vite ?raw imports)
* - componentIconSvg: key icons from Battery.tsx / Taskbar.tsx
*
* Used by SvgIcon (variant="dot"), DotMatrixWeatherIcon, and showcase demos.
*/
/** Wrap a path d-string into a full <svg> markup for DotMatrixIcon rasterization. */
function wrapPath(d, viewBox = "0 0 68 68", fill = "black") {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><path d="${d}" fill="${fill}"/></svg>`;
}
/** Wrap multiple paths into a single <svg> markup. */
function wrapPaths(paths, viewBox = "0 0 68 68", fill = "black") {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${paths.map((d) => `<path d="${d}" fill="${fill}"/>`).join("")}</svg>`;
}
wrapPath(widget_svg_paths_default.p2f639780), wrapPath(widget_svg_paths_default.p3dac5000), wrapPath(widget_svg_paths_default.p20de0900), wrapPath(widget_svg_paths_default.p362aab00), wrapPath(widget_svg_paths_default.p325eb300), wrapPath(widget_svg_paths_default.p687b0f0), wrapPath(widget_svg_paths_default.p1832e580), wrapPath(widget_svg_paths_default.p6242870), wrapPath(widget_svg_paths_default.pf1d8400), wrapPath(widget_svg_paths_default.p3ff6ad40), wrapPath(widget_svg_paths_default.p367a9ef0), wrapPath(widget_svg_paths_default.p10ce0080), wrapPath(widget_svg_paths_default.p346526f2), wrapPath(widget_svg_paths_default.p37508c00), wrapPath(widget_svg_paths_default.p28e78780), wrapPath(widget_svg_paths_default.p99ce600), wrapPath(widget_svg_paths_default.p3358de80), wrapPath(widget_svg_paths_default.p399f00), wrapPath(widget_svg_paths_default.p113bc980), wrapPath(widget_svg_paths_default.p7b40400), wrapPath(widget_svg_paths_default.p1f6d8d00), wrapPath(widget_svg_paths_default.p2f639780), wrapPath(widget_svg_paths_default.p3ff6ad40), wrapPath(widget_svg_paths_default.p399f00), wrapPath(widget_svg_paths_default.p1aaafdc0), wrapPath(widget_svg_paths_default.p11360480), wrapPath(widget_svg_paths_default.p2a214d00), wrapPath(widget_svg_paths_default.p1f6d8d00), wrapPath(widget_svg_paths_default.p14c47600), wrapPath(widget_svg_paths_default.p1aaafdc0), wrapPaths([widget_svg_paths_default.p90a7c00, widget_svg_paths_default.p2aa04480]), `${widget_svg_paths_default.p1ff37100}`, `${widget_svg_paths_default.p1229a080}`, `${widget_svg_paths_default.p38a80e80}`, (() => {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68">${[
		[28.6665, 25.3333],
		[31.3333, 25.3333],
		[34.0001, 25.3333],
		[36.6665, 25.3333],
		[39.3333, 25.3333],
		[31.3333, 34.2221],
		[34.0001, 34.2221],
		[36.6665, 34.2221],
		[26.0001, 27.9996],
		[28.6665, 27.9996],
		[31.3333, 27.9996],
		[34.0001, 27.9996],
		[36.6665, 27.9996],
		[39.3333, 27.9996],
		[42.0001, 27.9996],
		[28.6665, 36.8884],
		[31.3333, 36.8884],
		[34.0001, 36.8884],
		[36.6665, 36.8884],
		[39.3333, 36.8884],
		[34.0001, 43.1108],
		[23.3333, 30.6665],
		[42.0001, 30.6665],
		[26.0001, 30.6665],
		[44.6665, 30.6665]
	].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="1.8" fill="black"/>`).join("")}</svg>`;
})(), (() => {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><path d="${widget_svg_paths_default.p29036d00}" fill="black"/><circle cx="1.5" cy="1.5" r="1.5" fill="black"/><circle cx="13.5" cy="1.5" r="1.5" fill="black"/><circle cx="7.5" cy="19.5" r="1.5" fill="black"/></svg>`;
})(), (() => {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><rect x="15.2106" y="27.2254" width="8" height="24" rx="4" fill="black" transform="rotate(-60 15.2106 27.2254)"/><rect x="56.5391" y="18.8007" width="2" height="28" rx="1" fill="black" transform="rotate(60 56.5391 18.8007)"/><circle cx="18.9999" cy="59.7108" r="2.5" fill="black"/></svg>`;
})();
const componentIconSvg = {
	batteryCharging: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2L4 14h6l-1 8 9-12h-6l1-8z\"/></svg>",
	batteryLow: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2.5\"><rect x=\"2\" y=\"6\" width=\"18\" height=\"14\" rx=\"2\" ry=\"2\"/><rect x=\"20\" y=\"10\" width=\"2\" height=\"6\" rx=\"1\" fill=\"black\"/><rect x=\"6\" y=\"12\" width=\"4\" height=\"4\" rx=\"1\" fill=\"black\"/></svg>",
	batteryNormal: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2.5\"><rect x=\"2\" y=\"6\" width=\"18\" height=\"14\" rx=\"2\" ry=\"2\"/><rect x=\"20\" y=\"10\" width=\"2\" height=\"6\" rx=\"1\" fill=\"black\"/><rect x=\"6\" y=\"10\" width=\"8\" height=\"6\" rx=\"1\" fill=\"black\"/></svg>",
	deviceMouse: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"><rect x=\"6\" y=\"2\" width=\"12\" height=\"20\" rx=\"6\"/><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"10\"/></svg>",
	deviceKeyboard: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"><rect x=\"1\" y=\"6\" width=\"22\" height=\"12\" rx=\"2\"/><line x1=\"5\" y1=\"10\" x2=\"7\" y2=\"10\" stroke-linecap=\"round\"/><line x1=\"9\" y1=\"10\" x2=\"11\" y2=\"10\" stroke-linecap=\"round\"/><line x1=\"13\" y1=\"10\" x2=\"15\" y2=\"10\" stroke-linecap=\"round\"/><line x1=\"17\" y1=\"10\" x2=\"19\" y2=\"10\" stroke-linecap=\"round\"/><line x1=\"7\" y1=\"14\" x2=\"17\" y2=\"14\" stroke-linecap=\"round\"/></svg>",
	deviceEarbuds: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"><circle cx=\"7\" cy=\"7\" r=\"4\"/><circle cx=\"17\" cy=\"7\" r=\"4\"/><path d=\"M7 11v5a4 4 0 0 0 4 4\" stroke-linecap=\"round\"/><path d=\"M17 11v5a4 4 0 0 1-4 4\" stroke-linecap=\"round\"/></svg>",
	devicePhone: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><line x1=\"10\" y1=\"18\" x2=\"14\" y2=\"18\" stroke-linecap=\"round\"/></svg>",
	deviceWatch: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"6\"/><path d=\"M9 2h6l-1 4H10L9 2z\" stroke-linejoin=\"round\"/><path d=\"M9 22h6l-1-4H10L9 22z\" stroke-linejoin=\"round\"/></svg>",
	startIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\"><rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"1\"/><rect x=\"13\" y=\"3\" width=\"8\" height=\"8\" rx=\"1\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"1\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"1\"/></svg>",
	searchIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"black\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\" stroke-linecap=\"round\"/></svg>",
	volumeIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"black\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"/><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14\" fill=\"none\" stroke=\"black\" stroke-width=\"2\"/></svg>"
};
//#endregion
export { componentIconSvg };

//# sourceMappingURL=icon-svg-registry.mjs.map