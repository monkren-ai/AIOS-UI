import { AskUserQuestionsSize, askUserQuestionsVariants } from "./ask-user-questions-variants.mjs";
import * as React$1 from "react";
//#region src/AskUserQuestions/AskUserQuestions.d.ts
type AskUserQuestionType = 'text' | 'single' | 'multiple' | 'confirm';
interface AskUserQuestion {
  id: string;
  title: string;
  description?: string;
  type: AskUserQuestionType;
  options?: string[];
  required?: boolean;
}
type AskUserAnswerValue = string | string[] | boolean;
interface AskUserQuestionsProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onChange' | 'value' | 'defaultValue' | 'onSubmit'> {
  questions: AskUserQuestion[];
  value?: Record<string, AskUserAnswerValue>;
  defaultValue?: Record<string, AskUserAnswerValue>;
  onChange?: (answers: Record<string, AskUserAnswerValue>) => void;
  onSubmit?: (answers: Record<string, AskUserAnswerValue>) => void;
  title?: string;
  submitLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  requiredHint?: string;
  size?: AskUserQuestionsSize;
}
declare function AskUserQuestions({
  questions,
  value: valueProp,
  defaultValue,
  onChange,
  onSubmit,
  title,
  submitLabel,
  nextLabel,
  backLabel,
  requiredHint,
  size,
  className,
  ...props
}: AskUserQuestionsProps): React$1.JSX.Element;
declare namespace AskUserQuestions {
  var displayName: string;
}
//#endregion
export { AskUserAnswerValue, AskUserQuestion, AskUserQuestionType, AskUserQuestions, AskUserQuestionsProps };
//# sourceMappingURL=AskUserQuestions.d.mts.map