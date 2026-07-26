import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/ErrorBoundary/ErrorBoundary.tsx
const getTokens = () => {
	try {
		const s = getComputedStyle(document.documentElement);
		return {
			surfaceRaised: s.getPropertyValue("--surface-raised").trim() || "#1a1a1a",
			textDisplay: s.getPropertyValue("--text-display").trim() || "#ffffff",
			textSecondary: s.getPropertyValue("--text-secondary").trim() || "#999999",
			borderVisible: s.getPropertyValue("--border-visible").trim() || "#333333",
			fontMono: s.getPropertyValue("--font-mono").trim() || "'Space Mono', monospace",
			spaceMd: s.getPropertyValue("--space-md").trim() || "16px",
			spaceXl: s.getPropertyValue("--space-xl").trim() || "32px",
			displayLg: s.getPropertyValue("--display-lg").trim() || "48px",
			bodySm: s.getPropertyValue("--body-sm").trim() || "14px",
			caption: s.getPropertyValue("--caption").trim() || "12px",
			durationMicro: s.getPropertyValue("--duration-micro").trim() || "200ms"
		};
	} catch {
		return {
			surfaceRaised: "#1a1a1a",
			textDisplay: "#ffffff",
			textSecondary: "#999999",
			borderVisible: "#333333",
			fontMono: "'Space Mono', monospace",
			spaceMd: "16px",
			spaceXl: "32px",
			displayLg: "48px",
			bodySm: "14px",
			caption: "12px",
			durationMicro: "200ms"
		};
	}
};
var ErrorBoundary = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("[ErrorBoundary]", error, errorInfo);
	}
	handleReload = () => {
		this.setState({
			hasError: false,
			error: null
		});
	};
	render() {
		if (this.state.hasError) {
			if (this.props.fallback) return this.props.fallback;
			const t = getTokens();
			return /* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
					backgroundColor: t.surfaceRaised,
					color: t.textDisplay,
					fontFamily: t.fontMono,
					padding: t.spaceXl,
					textAlign: "center"
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						style: {
							fontSize: t.displayLg,
							marginBottom: t.spaceMd,
							letterSpacing: "0.15em",
							opacity: .9
						},
						children: "ERROR"
					}),
					/* @__PURE__ */ jsx("div", {
						style: {
							fontSize: t.bodySm,
							color: t.textSecondary,
							marginBottom: t.spaceXl,
							maxWidth: "480px",
							lineHeight: 1.6,
							wordBreak: "break-word"
						},
						children: this.state.error?.message || "Something went wrong."
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: this.handleReload,
						style: {
							fontFamily: "inherit",
							fontSize: t.caption,
							letterSpacing: "0.15em",
							textTransform: "uppercase",
							backgroundColor: "transparent",
							color: t.textDisplay,
							border: `1px solid ${t.borderVisible}`,
							padding: `0.625rem ${t.spaceXl}`,
							cursor: "pointer",
							transition: `border-color ${t.durationMicro}, color ${t.durationMicro}`
						},
						onMouseEnter: (e) => {
							e.currentTarget.style.borderColor = t.textDisplay;
							e.currentTarget.style.color = t.textDisplay;
						},
						onMouseLeave: (e) => {
							e.currentTarget.style.borderColor = t.borderVisible;
							e.currentTarget.style.color = t.textDisplay;
						},
						children: "Reload"
					})
				]
			});
		}
		return this.props.children;
	}
};
//#endregion
export { ErrorBoundary as default };

//# sourceMappingURL=ErrorBoundary.mjs.map