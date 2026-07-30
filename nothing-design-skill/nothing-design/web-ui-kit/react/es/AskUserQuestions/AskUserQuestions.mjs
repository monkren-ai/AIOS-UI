import { cn, dataAttr } from "../lib/utils.mjs";
import { Button } from "../Button/Button.mjs";
import { Input } from "../Input/Input.mjs";
import { Switch } from "../Switch/Switch.mjs";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./AskUserQuestions.css";
//#region src/AskUserQuestions/AskUserQuestions.tsx
const askUserQuestionsVariants = cva("nothing-ask-user-questions", {
	variants: { size: {
		sm: "nothing-ask-user-questions--sm",
		md: "nothing-ask-user-questions--md",
		lg: "nothing-ask-user-questions--lg"
	} },
	defaultVariants: { size: "md" }
});
const isAnswerEmpty = (question, answer) => {
	if (answer === void 0) return true;
	if (question.type === "text") return typeof answer !== "string" || answer.trim() === "";
	if (question.type === "single") return typeof answer !== "string" || answer.trim() === "";
	if (question.type === "multiple") return !Array.isArray(answer) || answer.length === 0;
	if (question.type === "confirm") return answer !== true;
	return false;
};
const AskUserQuestions = React.forwardRef(({ questions, value: valueProp, defaultValue = {}, onChange, onSubmit, title = "QUESTIONS", submitLabel = "SUBMIT", nextLabel = "NEXT", backLabel = "BACK", requiredHint = "Required", size = "md", className, ...props }, ref) => {
	const isControlled = valueProp !== void 0;
	const [internalAnswers, setInternalAnswers] = React.useState(defaultValue);
	const answers = isControlled ? valueProp : internalAnswers;
	const [currentStep, setCurrentStep] = React.useState(0);
	const [direction, setDirection] = React.useState(1);
	const currentQuestion = questions[currentStep];
	const isFirst = currentStep === 0;
	const isLast = currentStep === questions.length - 1;
	const currentAnswer = currentQuestion ? answers[currentQuestion.id] : void 0;
	const canProceed = !currentQuestion?.required || !isAnswerEmpty(currentQuestion, currentAnswer);
	const updateAnswer = React.useCallback((questionId, value) => {
		const next = {
			...answers,
			[questionId]: value
		};
		if (!isControlled) setInternalAnswers(next);
		onChange?.(next);
	}, [
		answers,
		isControlled,
		onChange
	]);
	const goNext = () => {
		if (!canProceed) return;
		if (isLast) {
			onSubmit?.(answers);
			return;
		}
		setDirection(1);
		setCurrentStep((s) => Math.min(s + 1, questions.length - 1));
	};
	const goBack = () => {
		setDirection(-1);
		setCurrentStep((s) => Math.max(s - 1, 0));
	};
	const renderInput = (question) => {
		const answer = answers[question.id];
		if (question.type === "text") return /* @__PURE__ */ jsx(Input, {
			variant: "bordered",
			value: typeof answer === "string" ? answer : "",
			onChange: (value) => updateAnswer(question.id, value),
			placeholder: "Type your answer"
		});
		if (question.type === "single") {
			const selected = typeof answer === "string" ? answer : "";
			return /* @__PURE__ */ jsx("div", {
				className: "nothing-ask-user-questions__options",
				role: "radiogroup",
				children: question.options?.map((option) => /* @__PURE__ */ jsx(Button, {
					variant: selected === option ? "primary" : "secondary",
					active: selected === option,
					onClick: () => updateAnswer(question.id, option),
					"aria-pressed": selected === option,
					children: option
				}, option))
			});
		}
		if (question.type === "multiple") {
			const selected = Array.isArray(answer) ? answer : [];
			return /* @__PURE__ */ jsx(CheckboxGroup, {
				options: question.options?.map((option) => ({
					value: option,
					label: option
				})) ?? [],
				value: selected,
				onValueChange: (value) => updateAnswer(question.id, value)
			});
		}
		if (question.type === "confirm") return /* @__PURE__ */ jsx(Switch, {
			label: question.title,
			on: typeof answer === "boolean" ? answer : false,
			onChange: (value) => updateAnswer(question.id, value)
		});
		return null;
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(askUserQuestionsVariants({ size }), className),
		"data-slot": "ask-user-questions",
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-ask-user-questions__header",
				children: [/* @__PURE__ */ jsx("span", {
					className: "nothing-ask-user-questions__title",
					children: title
				}), /* @__PURE__ */ jsxs("span", {
					className: "nothing-ask-user-questions__count",
					children: [
						String(currentStep + 1).padStart(2, "0"),
						"/",
						String(questions.length).padStart(2, "0")
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-ask-user-questions__body",
				children: currentQuestion && /* @__PURE__ */ jsxs("div", {
					className: "nothing-ask-user-questions__step",
					"data-direction": dataAttr(direction === 1 ? "forward" : "back"),
					children: [/* @__PURE__ */ jsxs("div", {
						className: "nothing-ask-user-questions__question",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "nothing-ask-user-questions__question-title",
								children: [currentQuestion.title, currentQuestion.required && /* @__PURE__ */ jsx("span", {
									className: "nothing-ask-user-questions__required",
									"aria-hidden": "true",
									children: "*"
								})]
							}),
							currentQuestion.description && /* @__PURE__ */ jsx("span", {
								className: "nothing-ask-user-questions__description",
								children: currentQuestion.description
							}),
							currentQuestion.required && /* @__PURE__ */ jsx("span", {
								className: "nothing-ask-user-questions__required-hint",
								children: requiredHint
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "nothing-ask-user-questions__input",
						children: renderInput(currentQuestion)
					})]
				}, currentQuestion.id)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-ask-user-questions__footer",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "secondary",
					onClick: goBack,
					disabled: isFirst,
					children: backLabel
				}), /* @__PURE__ */ jsx(Button, {
					variant: "primary",
					onClick: goNext,
					disabled: !canProceed,
					children: isLast ? submitLabel : nextLabel
				})]
			})
		]
	});
});
AskUserQuestions.displayName = "AskUserQuestions";
//#endregion
export { AskUserQuestions, AskUserQuestions as default, askUserQuestionsVariants };

//# sourceMappingURL=AskUserQuestions.mjs.map