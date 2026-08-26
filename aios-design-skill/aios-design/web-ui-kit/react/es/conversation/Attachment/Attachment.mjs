import { cn } from "../../lib/utils.mjs";
import { attachmentVariants } from "./attachment-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/conversation/Attachment/Attachment.tsx
function Attachment({ label, type, src, size = "md", loading = false, progress, onRemove, removeLabel, className, ref, ...props }) {
	const kind = type ?? (src ? "image" : "unknown");
	const media = (kind === "image" || kind === "video") && Boolean(src);
	const accessibleRemoveLabel = removeLabel ?? (label ? `移除 ${label} / Remove ${label}` : "移除附件 / Remove attachment");
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(attachmentVariants({
			size,
			media,
			loading
		}), className),
		"data-slot": "attachment",
		"data-type": kind,
		"data-loading": loading || void 0,
		"aria-busy": loading || void 0,
		...props,
		children: [
			media && kind === "video" ? /* @__PURE__ */ jsx("video", {
				src,
				"aria-label": label,
				muted: true,
				preload: "metadata",
				className: "size-10 rounded-xs object-cover"
			}) : media ? /* @__PURE__ */ jsx("img", {
				src,
				alt: label ?? "",
				className: "size-10 rounded-xs object-cover"
			}) : /* @__PURE__ */ jsx("span", {
				"aria-hidden": true,
				className: "grid size-8 place-items-center rounded-xs border border-border font-mono text-micro uppercase",
				children: kind.slice(0, 3)
			}),
			label && /* @__PURE__ */ jsx("span", {
				className: "max-w-48 truncate",
				children: label
			}),
			loading && /* @__PURE__ */ jsx("span", {
				role: "status",
				className: "font-mono text-caption",
				children: "上传中 / Uploading"
			}),
			onRemove && /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onRemove,
				"aria-label": accessibleRemoveLabel,
				className: "grid size-11 place-items-center text-foreground-muted hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-interactive",
				children: "×"
			}),
			progress !== void 0 && /* @__PURE__ */ jsx("span", {
				role: "progressbar",
				"aria-label": label ? `${label} 上传进度 / upload progress` : "上传进度 / Upload progress",
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": Math.max(0, Math.min(100, progress)),
				className: "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground transition-transform",
				style: { transform: `scaleX(${Math.max(0, Math.min(100, progress)) / 100})` }
			})
		]
	});
}
function AttachmentList({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex flex-wrap items-center gap-2", className),
		"data-slot": "attachment-list",
		...props
	});
}
//#endregion
export { Attachment, AttachmentList };

//# sourceMappingURL=Attachment.mjs.map