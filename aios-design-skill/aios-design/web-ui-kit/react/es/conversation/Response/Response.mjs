import { cn } from "../../lib/utils.mjs";
import { CodeBlock } from "../../CodeBlock/CodeBlock.mjs";
import { responseVariants } from "./response-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//#region src/conversation/Response/Response.tsx
function Response({ children, components, codeCopyable = true, className, ref, ...props }) {
	const defaults = {
		a: ({ href, children: linkChildren, ...anchorProps }) => {
			const external = typeof href === "string" && /^(https?:)?\/\//.test(href);
			return /* @__PURE__ */ jsx("a", {
				href,
				...anchorProps,
				...external ? {
					target: "_blank",
					rel: "noreferrer noopener"
				} : {},
				className: "underline decoration-border-visible underline-offset-4 hover:text-accent",
				children: linkChildren
			});
		},
		code: ({ className: codeClassName, children: codeChildren, ...codeProps }) => {
			const language = /language-([\w-]+)/.exec(codeClassName ?? "")?.[1];
			const value = String(codeChildren).replace(/\n$/, "");
			if (language || value.includes("\n")) return /* @__PURE__ */ jsx(CodeBlock, {
				code: value,
				language,
				copyable: codeCopyable,
				className: "my-4"
			});
			return /* @__PURE__ */ jsx("code", {
				className: "rounded-xs border border-border bg-muted px-1 py-0.5 font-mono text-[0.9em]",
				...codeProps,
				children: codeChildren
			});
		}
	};
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(responseVariants(), className),
		"data-slot": "response",
		...props,
		children: /* @__PURE__ */ jsx(ReactMarkdown, {
			remarkPlugins: [remarkGfm],
			components: {
				...defaults,
				...components
			},
			children
		})
	});
}
//#endregion
export { Response };

//# sourceMappingURL=Response.mjs.map