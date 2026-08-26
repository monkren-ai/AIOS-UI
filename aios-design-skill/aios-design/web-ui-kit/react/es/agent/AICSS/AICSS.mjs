import { cn, dataAttr } from "../../lib/utils.mjs";
import { CodeBlock } from "../../CodeBlock/CodeBlock.mjs";
import { CodeDiff } from "../../CodeDiff/CodeDiff.mjs";
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
const AicssThinkingReasoning = React$1.forwardRef(({ summary, children, status = "running", durationSec, defaultOpen = true, open: controlledOpen, onOpenChange, locale = "zh", className, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React$1.useState(defaultOpen);
	const open = controlledOpen ?? internalOpen;
	const toggle = () => {
		if (controlledOpen === void 0) setInternalOpen(!open);
		onOpenChange?.(!open);
	};
	const done = status === "done";
	const triggerLabel = done && durationSec != null ? t(locale, `已思考 ${durationSec}s`, `Thought for ${durationSec}s`) : t(locale, "思考与推理", "Thinking + reasoning");
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-disclosure", className),
		"data-slot": "aicss-thinking-reasoning",
		"data-open": dataAttr(open),
		"data-status": status,
		...props,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "aios-aicss-disclosure__trigger",
			onClick: toggle,
			"aria-expanded": open,
			children: [done ? /* @__PURE__ */ jsx("span", {
				className: "aios-aicss-thinking-state",
				children: triggerLabel
			}) : /* @__PURE__ */ jsx(AicssThinkingState, {
				label: triggerLabel,
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
const AicssFileDiff = React$1.forwardRef(({ filename, lines, locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsx(CodeDiff, {
	ref,
	filename,
	lines,
	summaryLabel: t(locale, "代码差异摘要", "Code diff summary"),
	className,
	"data-slot": "aicss-file-diff",
	...props
}));
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
const AicssCodeBlock = React$1.forwardRef(({ code, filename, language, showLineNumbers = true, onCopy, locale = "zh", className, ...props }, ref) => /* @__PURE__ */ jsx(CodeBlock, {
	ref,
	code,
	filename,
	language,
	showLineNumbers,
	onCopy,
	copyLabel: t(locale, "复制", "Copy"),
	copiedLabel: t(locale, "已复制", "Copied"),
	className,
	"data-slot": "aicss-code-block",
	...props
}));
AicssCodeBlock.displayName = "AicssCodeBlock";
const AicssTaskList = React$1.forwardRef(({ title, tasks, onChange, defaultOpen = true, locale = "zh", className, ...props }, ref) => {
	const [open, setOpen] = React$1.useState(defaultOpen);
	const resolved = tasks.map((task) => {
		const status = task.status ?? (task.completed ? "done" : "pending");
		return {
			...task,
			status,
			completed: status === "done"
		};
	});
	const done = resolved.filter((task) => task.status === "done").length;
	const inProgress = resolved.some((task) => task.status === "in-progress");
	const toggle = (id) => onChange?.(tasks.map((task) => {
		if (task.id !== id) return task;
		const nextDone = !((task.status ?? (task.completed ? "done" : "pending")) === "done");
		return {
			...task,
			completed: nextDone,
			status: nextDone ? "done" : "pending"
		};
	}));
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-task-list", className),
		"data-slot": "aicss-task-list",
		"data-status": inProgress ? "running" : done === tasks.length && tasks.length > 0 ? "done" : "idle",
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
		}), open && /* @__PURE__ */ jsx("ul", { children: resolved.map((task) => /* @__PURE__ */ jsx("li", {
			"data-status": task.status,
			children: /* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: task.status === "done",
				onChange: () => toggle(task.id),
				disabled: !onChange
			}), /* @__PURE__ */ jsx("span", { children: task.label })] })
		}, task.id)) })]
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
const AicssAgentInput = React$1.forwardRef(({ value: controlledValue, defaultValue = "", loading = false, enhancing = false, model, onChange, onSubmit, onAttach, onEnhance, onCancel, locale = "zh", placeholder, disabled, className, onKeyDown, ...props }, ref) => {
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
		"data-enhancing": dataAttr(enhancing),
		"data-filled": dataAttr(Boolean(value.trim())),
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
				onEnhance && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onEnhance,
					disabled: !value.trim() || loading || enhancing || disabled,
					"aria-label": t(locale, "增强提示词", "Enhance prompt"),
					children: enhancing ? t(locale, "增强中", "Enhancing") : t(locale, "增强", "Enhance")
				}),
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
const AicssApprovalCard = React$1.forwardRef(({ variant = "questions", questions = [], command, cwd, plan = [], planTitle, planSummary, planPreviewCount = 3, title, approveLabel, rejectLabel, onApprove, onReject, locale = "zh", className, ...props }, ref) => {
	const [answers, setAnswers] = React$1.useState({});
	const [otherSelected, setOtherSelected] = React$1.useState({});
	const [customDraft, setCustomDraft] = React$1.useState({});
	const [step, setStep] = React$1.useState(0);
	const [planExpanded, setPlanExpanded] = React$1.useState(false);
	const safeStep = Math.min(step, Math.max(questions.length - 1, 0));
	const allAnswered = questions.length > 0 && questions.every((question) => Boolean(answers[question.id]?.trim()));
	const previewCount = Math.max(0, planPreviewCount);
	const planPreview = plan.slice(0, previewCount);
	const planRest = plan.slice(previewCount);
	const hasPlanMore = planRest.length > 0;
	const resolvedTitle = title ?? (variant === "questions" ? t(locale, "问题", "Questions") : variant === "command" ? t(locale, "运行这条命令？", "Run this command?") : t(locale, "计划概览", "Plan Overview"));
	const resolvedApprove = approveLabel ?? (variant === "questions" ? t(locale, "继续", "Continue") : variant === "command" ? t(locale, "运行", "Run") : t(locale, "批准", "Approve"));
	const resolvedReject = rejectLabel ?? t(locale, "跳过", "Skip");
	const canContinue = variant !== "questions" || allAnswered;
	const isOtherChoice = (question) => {
		if (otherSelected[question.id]) return true;
		const answer = answers[question.id];
		return Boolean(answer) && !question.options.includes(answer);
	};
	const handleApprove = (nextAnswers) => {
		if (variant === "questions") {
			const next = nextAnswers ?? answers;
			if (!questions.every((question) => Boolean(next[question.id]?.trim()))) return;
			onApprove?.({ answers: next });
			return;
		}
		onApprove?.();
	};
	const selectOption = (questionId, option) => {
		setOtherSelected((prev) => ({
			...prev,
			[questionId]: false
		}));
		setAnswers((prev) => ({
			...prev,
			[questionId]: option
		}));
		if (safeStep < questions.length - 1) setStep((current) => Math.min(current + 1, questions.length - 1));
	};
	const selectOther = (questionId) => {
		setOtherSelected((prev) => ({
			...prev,
			[questionId]: true
		}));
		const draft = customDraft[questionId]?.trim() ?? "";
		setAnswers((prev) => {
			const next = { ...prev };
			if (draft) next[questionId] = draft;
			else delete next[questionId];
			return next;
		});
	};
	const updateCustom = (questionId, text) => {
		setCustomDraft((prev) => ({
			...prev,
			[questionId]: text
		}));
		setOtherSelected((prev) => ({
			...prev,
			[questionId]: true
		}));
		setAnswers((prev) => {
			const next = { ...prev };
			const trimmed = text.trim();
			if (trimmed) next[questionId] = trimmed;
			else delete next[questionId];
			return next;
		});
	};
	const activeQuestion = questions[safeStep];
	const visiblePlan = planExpanded || !hasPlanMore ? plan : planPreview;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("aios-aicss-approval", className),
		"data-slot": "aicss-approval-card",
		"data-variant": variant,
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "aios-aicss-approval__head",
				children: [/* @__PURE__ */ jsx("strong", { children: resolvedTitle }), variant === "questions" && questions.length > 0 && /* @__PURE__ */ jsxs("span", {
					"aria-live": "polite",
					children: [
						safeStep + 1,
						" / ",
						questions.length
					]
				})]
			}),
			variant === "questions" && activeQuestion && /* @__PURE__ */ jsxs("div", {
				className: "aios-aicss-approval__body",
				"aria-live": "polite",
				children: [/* @__PURE__ */ jsx("p", {
					className: "aios-aicss-approval__prompt",
					children: activeQuestion.prompt
				}), /* @__PURE__ */ jsxs("div", {
					role: "radiogroup",
					"aria-label": activeQuestion.prompt,
					className: "aios-aicss-approval__options",
					children: [activeQuestion.options.map((option, index) => {
						const selected = answers[activeQuestion.id] === option && !isOtherChoice(activeQuestion);
						return /* @__PURE__ */ jsxs("button", {
							type: "button",
							role: "radio",
							"aria-checked": selected,
							"data-selected": dataAttr(selected),
							onClick: () => selectOption(activeQuestion.id, option),
							children: [/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								children: String.fromCharCode(65 + index)
							}), option]
						}, option);
					}), /* @__PURE__ */ jsxs("label", {
						className: "aios-aicss-approval__other",
						"data-selected": dataAttr(isOtherChoice(activeQuestion)),
						children: [/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: String.fromCharCode(65 + activeQuestion.options.length)
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							value: customDraft[activeQuestion.id] ?? (isOtherChoice(activeQuestion) && answers[activeQuestion.id] && !activeQuestion.options.includes(answers[activeQuestion.id]) ? answers[activeQuestion.id] : ""),
							placeholder: t(locale, "其他…", "Something else…"),
							"aria-label": t(locale, `自定义回答：${activeQuestion.prompt}`, `Custom answer for: ${activeQuestion.prompt}`),
							onFocus: () => selectOther(activeQuestion.id),
							onChange: (event) => updateCustom(activeQuestion.id, event.target.value)
						})]
					})]
				})]
			}),
			variant === "command" && /* @__PURE__ */ jsxs("div", {
				className: "aios-aicss-approval__body",
				children: [cwd && /* @__PURE__ */ jsx("div", {
					className: "aios-aicss-approval__cwd",
					children: cwd
				}), /* @__PURE__ */ jsx("pre", {
					className: "aios-aicss-approval__command",
					children: command
				})]
			}),
			variant === "plan" && /* @__PURE__ */ jsxs("div", {
				className: "aios-aicss-approval__body",
				children: [
					planTitle && /* @__PURE__ */ jsx("div", {
						className: "aios-aicss-approval__plan-title",
						children: planTitle
					}),
					planSummary && /* @__PURE__ */ jsx("p", {
						className: "aios-aicss-approval__plan-summary",
						children: planSummary
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "aios-aicss-approval__plan",
						children: visiblePlan.map((stepItem) => /* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", { children: stepItem.title }), stepItem.detail && /* @__PURE__ */ jsx("small", { children: stepItem.detail })] }, stepItem.id))
					}),
					hasPlanMore && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "aios-aicss-approval__more",
						"aria-expanded": planExpanded,
						onClick: () => setPlanExpanded((open) => !open),
						children: planExpanded ? t(locale, "收起", "Show less") : t(locale, `还有 ${planRest.length} 步`, `${planRest.length} more`)
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "aios-aicss-approval__actions",
				children: [
					variant === "questions" && /* @__PURE__ */ jsxs("div", {
						className: "aios-aicss-approval__nav",
						"aria-label": t(locale, "问题导航", "Question navigation"),
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: safeStep <= 0,
							"aria-label": t(locale, "上一题", "Previous question"),
							onClick: () => setStep((current) => Math.max(current - 1, 0)),
							children: "↑"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: safeStep >= questions.length - 1,
							"aria-label": t(locale, "下一题", "Next question"),
							onClick: () => setStep((current) => Math.min(current + 1, questions.length - 1)),
							children: "↓"
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onReject,
						children: resolvedReject
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: !canContinue,
						onClick: () => handleApprove(),
						children: resolvedApprove
					})
				]
			})
		]
	});
});
AicssApprovalCard.displayName = "AicssApprovalCard";
//#endregion
export { AicssAgentInput, AicssApprovalCard, AicssCodeBlock, AicssComparisonTable, AicssDataTable, AicssFileDiff, AicssImageGeneration, AicssInlineCitations, AicssOrbs, AicssStreamingText, AicssTaskList, AicssTextResponse, AicssThinkingReasoning, AicssThinkingState, AicssWebSearch };

//# sourceMappingURL=AICSS.mjs.map