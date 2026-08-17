import { cn, dataAttr } from "../../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./AICSS.css";
//#region src/agent/AICSS/AICSS.tsx
const t = (locale, zh, en) => locale === "zh" ? zh : en;
function Chevron({ open }) {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		children: open ? "−" : "+"
	});
}
const AicssThinkingState = React$1.forwardRef(({ label, locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsxs("span", {
	ref,
	role: "status",
	"aria-live": "polite",
	"aria-busy": "true",
	className: cn("aios-aicss-thinking-state", className),
	"data-slot": "aicss-thinking-state",
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "aios-aicss-pulse",
		"aria-hidden": "true"
	}), label ?? t(locale, "思考中", "Thinking")]
}));
AicssThinkingState.displayName = "AicssThinkingState";
const AicssThinkingReasoning = React$1.forwardRef(({ summary, children, defaultOpen = true, open: controlledOpen, onOpenChange, locale = "zh", className, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React$1.useState(defaultOpen);
	const open = controlledOpen ?? internalOpen;
	const toggle = () => {
		if (controlledOpen === void 0) setInternalOpen(!open);
		onOpenChange?.(!open);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-disclosure", className),
		"data-slot": "aicss-thinking-reasoning",
		"data-open": dataAttr(open),
		...props,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "aios-aicss-disclosure__trigger",
			onClick: toggle,
			"aria-expanded": open,
			children: [/* @__PURE__ */ jsx(AicssThinkingState, {
				label: t(locale, "思考与推理", "Thinking + reasoning"),
				locale
			}), /* @__PURE__ */ jsx(Chevron, { open })]
		}), open && /* @__PURE__ */ jsxs("div", {
			className: "aios-aicss-disclosure__body",
			"data-slot": "aicss-thinking-reasoning-body",
			children: [summary && /* @__PURE__ */ jsx("div", {
				className: "aios-aicss-disclosure__summary",
				children: summary
			}), children]
		})]
	});
});
AicssThinkingReasoning.displayName = "AicssThinkingReasoning";
const AicssOrbs = React$1.forwardRef(({ status = "running", label, size = "md", locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	role: "status",
	"aria-live": "polite",
	"aria-busy": status === "running" || void 0,
	className: cn("aios-aicss-orbs", `aios-aicss-orbs--${size}`, className),
	"data-slot": "aicss-orbs",
	"data-status": status,
	...props,
	children: [/* @__PURE__ */ jsxs("span", {
		className: "aios-aicss-orbs__rail",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("span", {}),
			/* @__PURE__ */ jsx("span", {}),
			/* @__PURE__ */ jsx("span", {})
		]
	}), /* @__PURE__ */ jsx("span", { children: label ?? t(locale, "处理中", "Processing") })]
}));
AicssOrbs.displayName = "AicssOrbs";
const AicssWebSearch = React$1.forwardRef(({ query, results = [], status = "done", defaultOpen = true, locale = "zh", className, ...props }, ref) => {
	const [open, setOpen] = React$1.useState(defaultOpen);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-tool", className),
		"data-slot": "aicss-web-search",
		"data-status": status,
		...props,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "aios-aicss-tool__header",
			onClick: () => setOpen(!open),
			"aria-expanded": open,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "aios-aicss-tool__kind",
					children: t(locale, "搜索", "Searching")
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "aios-aicss-tool__subject",
					children: [
						"“",
						query,
						"”"
					]
				}),
				/* @__PURE__ */ jsx(Chevron, { open })
			]
		}), open && results.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "aios-aicss-search-results",
			"data-slot": "aicss-web-search-results",
			children: results.map((result) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("a", {
				href: result.url,
				target: "_blank",
				rel: "noreferrer",
				children: [/* @__PURE__ */ jsx("span", { children: result.title }), /* @__PURE__ */ jsx("small", { children: result.url })]
			}), result.description && /* @__PURE__ */ jsx("p", { children: result.description })] }, result.url))
		})]
	});
});
AicssWebSearch.displayName = "AicssWebSearch";
const AicssFileDiff = React$1.forwardRef(({ filename, lines, locale = "zh", className, ...props }, ref) => {
	const additions = lines.filter((line) => line.type === "add").length;
	const removals = lines.filter((line) => line.type === "remove").length;
	return /* @__PURE__ */ jsxs("figure", {
		ref,
		className: cn("aios-aicss-code-frame", className),
		"data-slot": "aicss-file-diff",
		...props,
		children: [/* @__PURE__ */ jsxs("figcaption", {
			className: "aios-aicss-code-frame__header",
			children: [/* @__PURE__ */ jsx("span", { children: filename }), /* @__PURE__ */ jsxs("span", {
				"aria-label": t(locale, `${additions} 行新增，${removals} 行删除`, `${additions} additions, ${removals} deletions`),
				children: [
					"+",
					additions,
					" / −",
					removals
				]
			})]
		}), /* @__PURE__ */ jsx("code", {
			className: "aios-aicss-diff",
			children: lines.map((line, index) => /* @__PURE__ */ jsxs("span", {
				className: `aios-aicss-diff__line aios-aicss-diff__line--${line.type ?? "context"}`,
				children: [
					/* @__PURE__ */ jsx("span", { children: line.oldLine ?? "" }),
					/* @__PURE__ */ jsx("span", { children: line.newLine ?? "" }),
					/* @__PURE__ */ jsx("span", { children: line.type === "add" ? "+" : line.type === "remove" ? "−" : " " }),
					/* @__PURE__ */ jsx("span", { children: line.content })
				]
			}, `${line.oldLine}-${line.newLine}-${index}`))
		})]
	});
});
AicssFileDiff.displayName = "AicssFileDiff";
const AicssImageGeneration = React$1.forwardRef(({ src, alt = "", prompt, width, height, progress, status = "running", locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsxs("figure", {
	ref,
	className: cn("aios-aicss-image", className),
	"data-slot": "aicss-image-generation",
	"data-status": status,
	...props,
	children: [/* @__PURE__ */ jsxs("div", {
		className: "aios-aicss-image__preview",
		children: [
			src ? /* @__PURE__ */ jsx("img", {
				src,
				alt
			}) : /* @__PURE__ */ jsx("div", {
				className: "aios-aicss-image__placeholder",
				"aria-hidden": "true"
			}),
			(width || height) && /* @__PURE__ */ jsxs("span", {
				className: "aios-aicss-image__dimensions",
				children: [
					width ?? "—",
					" × ",
					height ?? "—"
				]
			}),
			progress !== void 0 && /* @__PURE__ */ jsx("span", {
				className: "aios-aicss-image__progress",
				style: { width: `${Math.max(0, Math.min(100, progress))}%` }
			})
		]
	}), /* @__PURE__ */ jsxs("figcaption", { children: [/* @__PURE__ */ jsx("strong", { children: status === "done" ? t(locale, "图像已生成", "Image generated") : t(locale, "正在生成图像", "Generating image") }), /* @__PURE__ */ jsxs("span", { children: [
		"“",
		prompt,
		"”"
	] })] })]
}));
AicssImageGeneration.displayName = "AicssImageGeneration";
const AicssTextResponse = React$1.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("aios-aicss-text-response", className),
	"data-slot": "aicss-text-response",
	...props,
	children
}));
AicssTextResponse.displayName = "AicssTextResponse";
const AicssStreamingText = React$1.forwardRef(({ text, streaming = true, className, ...props }, ref) => /* @__PURE__ */ jsxs("p", {
	ref,
	className: cn("aios-aicss-streaming-text", className),
	"data-slot": "aicss-streaming-text",
	"data-streaming": dataAttr(streaming),
	"aria-live": "polite",
	...props,
	children: [text, streaming && /* @__PURE__ */ jsx("span", {
		className: "aios-aicss-streaming-text__cursor",
		"aria-hidden": "true"
	})]
}));
AicssStreamingText.displayName = "AicssStreamingText";
const AicssInlineCitations = React$1.forwardRef(({ children, citations, locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	className: cn("aios-aicss-citations", className),
	"data-slot": "aicss-inline-citations",
	...props,
	children: [/* @__PURE__ */ jsx("div", {
		className: "aios-aicss-citations__content",
		children
	}), /* @__PURE__ */ jsx("ol", {
		"aria-label": t(locale, "引用来源", "Sources"),
		children: citations.map((citation, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
			href: citation.url,
			target: "_blank",
			rel: "noreferrer",
			children: [
				/* @__PURE__ */ jsx("span", { children: index + 1 }),
				citation.title,
				/* @__PURE__ */ jsx("small", { children: citation.domain ?? new URL(citation.url).hostname })
			]
		}) }, citation.id))
	})]
}));
AicssInlineCitations.displayName = "AicssInlineCitations";
const AicssCodeBlock = React$1.forwardRef(({ code, filename, language, showLineNumbers = true, onCopy, locale = "zh", className, ...props }, ref) => {
	const [copied, setCopied] = React$1.useState(false);
	const copy = async () => {
		if (onCopy) await onCopy(code);
		else if (typeof navigator !== "undefined") await navigator.clipboard?.writeText(code);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1500);
	};
	return /* @__PURE__ */ jsxs("figure", {
		ref,
		className: cn("aios-aicss-code-frame", className),
		"data-slot": "aicss-code-block",
		...props,
		children: [/* @__PURE__ */ jsxs("figcaption", {
			className: "aios-aicss-code-frame__header",
			children: [/* @__PURE__ */ jsx("span", { children: filename ?? language ?? t(locale, "代码", "Code") }), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: copy,
				children: copied ? t(locale, "已复制", "Copied") : t(locale, "复制", "Copy")
			})]
		}), /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: code.split("\n").map((line, index) => /* @__PURE__ */ jsxs("span", {
			className: "aios-aicss-code-line",
			children: [showLineNumbers && /* @__PURE__ */ jsx("span", { children: index + 1 }), /* @__PURE__ */ jsx("span", { children: line || " " })]
		}, index)) }) })]
	});
});
AicssCodeBlock.displayName = "AicssCodeBlock";
const AicssTaskList = React$1.forwardRef(({ title, tasks, onChange, defaultOpen = true, locale = "zh", className, ...props }, ref) => {
	const [open, setOpen] = React$1.useState(defaultOpen);
	const done = tasks.filter((task) => task.completed).length;
	const toggle = (id) => onChange?.(tasks.map((task) => task.id === id ? {
		...task,
		completed: !task.completed
	} : task));
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-task-list", className),
		"data-slot": "aicss-task-list",
		...props,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "aios-aicss-tool__header",
			onClick: () => setOpen(!open),
			"aria-expanded": open,
			children: [
				/* @__PURE__ */ jsx("span", { children: title ?? t(locale, "待办事项", "To-dos") }),
				/* @__PURE__ */ jsxs("span", { children: [
					done,
					"/",
					tasks.length
				] }),
				/* @__PURE__ */ jsx(Chevron, { open })
			]
		}), open && /* @__PURE__ */ jsx("ul", { children: tasks.map((task) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			checked: Boolean(task.completed),
			onChange: () => toggle(task.id),
			disabled: !onChange
		}), /* @__PURE__ */ jsx("span", { children: task.label })] }) }, task.id)) })]
	});
});
AicssTaskList.displayName = "AicssTaskList";
function renderCellValue(value) {
	return React$1.isValidElement(value) ? value : String(value ?? "");
}
function AicssDataTable({ columns, rows, rowKey, caption, className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: "aios-aicss-table-wrap",
		"data-slot": "aicss-data-table",
		children: /* @__PURE__ */ jsxs("table", {
			className: cn("aios-aicss-table", className),
			...props,
			children: [
				caption && /* @__PURE__ */ jsx("caption", { children: caption }),
				/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", {
					style: { textAlign: column.align },
					children: column.header
				}, String(column.key))) }) }),
				/* @__PURE__ */ jsx("tbody", { children: rows.map((row, index) => /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("td", {
					style: { textAlign: column.align },
					children: column.render ? column.render(row) : renderCellValue(row[column.key])
				}, String(column.key))) }, rowKey?.(row, index) ?? index)) })
			]
		})
	});
}
const AicssComparisonTable = React$1.forwardRef(({ plans, features, caption, locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("aios-aicss-table-wrap", className),
	"data-slot": "aicss-comparison-table",
	...props,
	children: /* @__PURE__ */ jsxs("table", {
		className: "aios-aicss-table",
		children: [
			caption && /* @__PURE__ */ jsx("caption", { children: caption }),
			/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", { children: t(locale, "功能", "Feature") }), plans.map((plan) => /* @__PURE__ */ jsx("th", { children: plan }, plan))] }) }),
			/* @__PURE__ */ jsx("tbody", { children: features.map((feature, index) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("th", {
				scope: "row",
				children: feature.feature
			}), plans.map((plan) => {
				const value = feature.values[plan];
				return /* @__PURE__ */ jsx("td", {
					"aria-label": value === true ? t(locale, "支持", "Included") : value === false || value == null ? t(locale, "不支持", "Not included") : void 0,
					children: value === true ? "✓" : value === false || value == null ? "—" : value
				}, plan);
			})] }, index)) })
		]
	})
}));
AicssComparisonTable.displayName = "AicssComparisonTable";
const AicssAgentInput = React$1.forwardRef(({ value: controlledValue, defaultValue = "", loading = false, model, onChange, onSubmit, onAttach, onCancel, locale = "zh", placeholder, disabled, className, onKeyDown, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const value = controlledValue ?? internalValue;
	const submit = () => {
		if (!value.trim() || loading || disabled) return;
		onSubmit?.(value);
		if (controlledValue === void 0) setInternalValue("");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn("aios-aicss-agent-input", className),
		"data-slot": "aicss-agent-input",
		"data-loading": dataAttr(loading),
		children: [/* @__PURE__ */ jsx("textarea", {
			ref,
			value,
			placeholder: placeholder ?? t(locale, "询问 AI Agent", "Ask AI Agent"),
			disabled,
			readOnly: loading,
			rows: 2,
			onChange: (event) => {
				if (controlledValue === void 0) setInternalValue(event.target.value);
				onChange?.(event.target.value);
			},
			onKeyDown: (event) => {
				if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
					event.preventDefault();
					submit();
				} else onKeyDown?.(event);
			},
			...props
		}), /* @__PURE__ */ jsxs("div", {
			className: "aios-aicss-agent-input__actions",
			children: [
				onAttach && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onAttach,
					"aria-label": t(locale, "添加附件", "Add attachment"),
					children: "+"
				}),
				" ",
				model && /* @__PURE__ */ jsx("span", { children: model }),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: loading ? onCancel : submit,
					disabled: !loading && (!value.trim() || disabled),
					children: loading ? t(locale, "停止", "Stop") : t(locale, "发送", "Send")
				})
			]
		})]
	});
});
AicssAgentInput.displayName = "AicssAgentInput";
//#endregion
export { AicssAgentInput, AicssCodeBlock, AicssComparisonTable, AicssDataTable, AicssFileDiff, AicssImageGeneration, AicssInlineCitations, AicssOrbs, AicssStreamingText, AicssTaskList, AicssTextResponse, AicssThinkingReasoning, AicssThinkingState, AicssWebSearch };

//# sourceMappingURL=AICSS.mjs.map