import { cn, dataAttr } from "../lib/utils.mjs";
import { codeBlockVariants } from "./code-block-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/CodeBlock/CodeBlock.tsx
function escapeHtml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function CodeBlock({ code, language, filename, showLineNumbers = false, copyable = true, highlight = true, wrap, onCopy, copyLabel = "复制 / Copy", copiedLabel = "已复制 / Copied", className, ref, ...props }) {
	const [copied, setCopied] = React$1.useState(false);
	const [html, setHtml] = React$1.useState(null);
	React$1.useEffect(() => {
		let active = true;
		if (!language || !highlight || showLineNumbers) {
			setHtml(null);
			return () => {
				active = false;
			};
		}
		import("shiki").then(({ codeToHtml }) => codeToHtml(code, {
			lang: language,
			theme: "css-variables"
		})).then((result) => {
			if (active) setHtml(result);
		}).catch(() => {
			if (active) setHtml(null);
		});
		return () => {
			active = false;
		};
	}, [
		code,
		highlight,
		language,
		showLineNumbers
	]);
	const copy = async () => {
		if (onCopy) await onCopy(code);
		else if (typeof navigator !== "undefined") await navigator.clipboard?.writeText(code);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};
	return /* @__PURE__ */ jsxs("figure", {
		ref,
		className: cn(codeBlockVariants({ wrap }), className),
		"data-slot": "code-block",
		"data-wrap": dataAttr(Boolean(wrap)),
		...props,
		children: [/* @__PURE__ */ jsxs("figcaption", {
			className: "flex min-h-11 items-center justify-between gap-3 border-b border-border px-3 font-mono text-label uppercase text-foreground-muted",
			"data-slot": "code-block-header",
			children: [/* @__PURE__ */ jsx("span", {
				className: "truncate",
				children: filename ?? language ?? "代码 / Code"
			}), copyable && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "min-h-9 rounded-button px-2 text-caption text-foreground-muted transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive",
				onClick: copy,
				"aria-live": "polite",
				children: copied ? copiedLabel : copyLabel
			})]
		}), html ? /* @__PURE__ */ jsx("div", {
			className: "overflow-auto p-4 font-mono text-sm [&_.shiki]:m-0 [&_.shiki]:bg-transparent! [&_.shiki]:text-inherit! [&_code]:font-inherit",
			"data-slot": "code-block-body",
			dangerouslySetInnerHTML: { __html: html }
		}) : /* @__PURE__ */ jsx("pre", {
			className: "m-0 overflow-auto p-4 font-mono text-sm leading-6",
			"data-slot": "code-block-body",
			children: /* @__PURE__ */ jsx("code", { children: showLineNumbers ? code.split("\n").map((line, index) => /* @__PURE__ */ jsxs("span", {
				className: "grid grid-cols-[3ch_1fr] gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": true,
					className: "select-none text-end text-foreground-disabled",
					children: index + 1
				}), /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: escapeHtml(line || " ") } })]
			}, index)) : code })
		})]
	});
}
//#endregion
export { CodeBlock };

//# sourceMappingURL=CodeBlock.mjs.map