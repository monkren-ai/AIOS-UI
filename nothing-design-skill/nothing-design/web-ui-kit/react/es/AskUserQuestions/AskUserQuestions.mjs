import { cn, dataAttr } from "../lib/utils.mjs";
import Button from "../Button/Button.mjs";
import Input from "../Input/Input.mjs";
import Switch from "../Switch/Switch.mjs";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup.mjs";
import { askBodyVariants, askCountVariants, askDescriptionVariants, askFooterVariants, askHeaderVariants, askInputVariants, askOptionsVariants, askQuestionTitleVariants, askQuestionVariants, askRequiredHintVariants, askRequiredVariants, askStepVariants, askTitleVariants, askUserQuestionsVariants } from "./ask-user-questions-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./AskUserQuestions.css";
//#region src/AskUserQuestions/AskUserQuestions.tsx
const isAnswerEmpty = (question, answer) => {
	if (answer === void 0) return true;
	if (question.type === "text") return typeof answer !== "string" || answer.trim() === "";
	if (question.type === "single") return typeof answer !== "string" || answer.trim() === "";
	if (question.type === "multiple") return !Array.isArray(answer) || answer.length === 0;
	if (question.type === "confirm") return answer !== true;
	return false;
};
function AskUserQuestions({ questions, value: valueProp, defaultValue = {}, onChange, onSubmit, title = "QUESTIONS", submitLabel = "SUBMIT", nextLabel = "NEXT", backLabel = "BACK", requiredHint = "Required", size = "md", className, ...props }) {
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
			onValueChange: (value) => updateAnswer(question.id, value),
			placeholder: "Type your answer"
		});
		if (question.type === "single") {
			const selected = typeof answer === "string" ? answer : "";
			return /* @__PURE__ */ jsx("div", {
				"data-slot": "ask-user-questions-options",
				className: askOptionsVariants(),
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
			checked: typeof answer === "boolean" ? answer : false,
			onChange: (value) => updateAnswer(question.id, value)
		});
		return null;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(askUserQuestionsVariants({ size }), className),
		"data-slot": "ask-user-questions",
		"data-size": dataAttr(size),
		"data-step": dataAttr(currentStep),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "ask-user-questions-header",
				className: askHeaderVariants(),
				children: [/* @__PURE__ */ jsx("span", {
					"data-slot": "ask-user-questions-title",
					className: askTitleVariants({ size }),
					children: title
				}), /* @__PURE__ */ jsxs("span", {
					"data-slot": "ask-user-questions-count",
					className: askCountVariants({ size }),
					children: [
						String(currentStep + 1).padStart(2, "0"),
						"/",
						String(questions.length).padStart(2, "0")
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "ask-user-questions-body",
				className: askBodyVariants(),
				children: currentQuestion && /* @__PURE__ */ jsxs("div", {
					"data-slot": "ask-user-questions-step",
					className: askStepVariants({ direction: direction === 1 ? "forward" : "back" }),
					"data-direction": dataAttr(direction === 1 ? "forward" : "back"),
					children: [/* @__PURE__ */ jsxs("div", {
						"data-slot": "ask-user-questions-question",
						className: askQuestionVariants(),
						children: [
							/* @__PURE__ */ jsxs("span", {
								"data-slot": "ask-user-questions-question-title",
								className: askQuestionTitleVariants({ size }),
								children: [currentQuestion.title, currentQuestion.required && /* @__PURE__ */ jsx("span", {
									"data-slot": "ask-user-questions-required",
									className: askRequiredVariants(),
									"aria-hidden": "true",
									children: "*"
								})]
							}),
							currentQuestion.description && /* @__PURE__ */ jsx("span", {
								"data-slot": "ask-user-questions-description",
								className: askDescriptionVariants({ size }),
								children: currentQuestion.description
							}),
							currentQuestion.required && /* @__PURE__ */ jsx("span", {
								"data-slot": "ask-user-questions-required-hint",
								className: askRequiredHintVariants({ size }),
								children: requiredHint
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						"data-slot": "ask-user-questions-input",
						className: askInputVariants(),
						children: renderInput(currentQuestion)
					})]
				}, currentQuestion.id)
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "ask-user-questions-footer",
				className: askFooterVariants(),
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
}
AskUserQuestions.displayName = "AskUserQuestions";
//#endregion
export { AskUserQuestions as default };

//# sourceMappingURL=AskUserQuestions.mjs.map