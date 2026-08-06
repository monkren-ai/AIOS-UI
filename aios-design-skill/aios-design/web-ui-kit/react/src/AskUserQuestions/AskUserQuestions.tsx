import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import Button from '@/Button'
import Input from '@/Input'
import Switch from '@/Switch'
import { CheckboxGroup } from '@/CheckboxGroup'
import {
  askBodyVariants,
  askCountVariants,
  askDescriptionVariants,
  askFooterVariants,
  askHeaderVariants,
  askInputVariants,
  askOptionsVariants,
  askQuestionTitleVariants,
  askQuestionVariants,
  askRequiredHintVariants,
  askRequiredVariants,
  askStepVariants,
  askTitleVariants,
  askUserQuestionsVariants,
  type AskUserQuestionsSize,
} from './ask-user-questions-variants'
import './AskUserQuestions.css'

export type AskUserQuestionType = 'text' | 'single' | 'multiple' | 'confirm'

export interface AskUserQuestion {
  id: string
  title: string
  description?: string
  type: AskUserQuestionType
  options?: string[]
  required?: boolean
}

export type AskUserAnswerValue = string | string[] | boolean

export { askUserQuestionsVariants }

export interface AskUserQuestionsProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'onChange' | 'value' | 'defaultValue' | 'onSubmit'
> {
  questions: AskUserQuestion[]
  value?: Record<string, AskUserAnswerValue>
  defaultValue?: Record<string, AskUserAnswerValue>
  onChange?: (answers: Record<string, AskUserAnswerValue>) => void
  onSubmit?: (answers: Record<string, AskUserAnswerValue>) => void
  title?: string
  submitLabel?: string
  nextLabel?: string
  backLabel?: string
  requiredHint?: string
  size?: AskUserQuestionsSize
}

const isAnswerEmpty = (
  question: AskUserQuestion,
  answer: AskUserAnswerValue | undefined,
): boolean => {
  if (answer === undefined) return true
  if (question.type === 'text') return typeof answer !== 'string' || answer.trim() === ''
  if (question.type === 'single') return typeof answer !== 'string' || answer.trim() === ''
  if (question.type === 'multiple') return !Array.isArray(answer) || answer.length === 0
  if (question.type === 'confirm') return answer !== true
  return false
}

export function AskUserQuestions({
  questions,
  value: valueProp,
  defaultValue = {},
  onChange,
  onSubmit,
  title = 'QUESTIONS',
  submitLabel = 'SUBMIT',
  nextLabel = 'NEXT',
  backLabel = 'BACK',
  requiredHint = 'Required',
  size = 'md',
  className,
  ...props
}: AskUserQuestionsProps) {
  const isControlled = valueProp !== undefined
  const [internalAnswers, setInternalAnswers] =
    React.useState<Record<string, AskUserAnswerValue>>(defaultValue)
  const answers = isControlled ? valueProp : internalAnswers
  const [currentStep, setCurrentStep] = React.useState(0)
  const [direction, setDirection] = React.useState<1 | -1>(1)

  const currentQuestion = questions[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === questions.length - 1
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const canProceed = !currentQuestion?.required || !isAnswerEmpty(currentQuestion, currentAnswer)

  const updateAnswer = React.useCallback(
    (questionId: string, value: AskUserAnswerValue) => {
      const next = { ...answers, [questionId]: value }
      if (!isControlled) {
        setInternalAnswers(next)
      }
      onChange?.(next)
    },
    [answers, isControlled, onChange],
  )

  const goNext = () => {
    if (!canProceed) return
    if (isLast) {
      onSubmit?.(answers)
      return
    }
    setDirection(1)
    setCurrentStep((s) => Math.min(s + 1, questions.length - 1))
  }

  const goBack = () => {
    setDirection(-1)
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  const renderInput = (question: AskUserQuestion) => {
    const answer = answers[question.id]

    if (question.type === 'text') {
      return (
        <Input
          variant="bordered"
          value={typeof answer === 'string' ? answer : ''}
          onValueChange={(value) => updateAnswer(question.id, value)}
          placeholder="Type your answer"
        />
      )
    }

    if (question.type === 'single') {
      const selected = typeof answer === 'string' ? answer : ''
      return (
        <div
          data-slot="ask-user-questions-options"
          className={askOptionsVariants()}
          role="radiogroup"
        >
          {question.options?.map((option) => (
            <Button
              key={option}
              variant={selected === option ? 'primary' : 'secondary'}
              active={selected === option}
              onClick={() => updateAnswer(question.id, option)}
              aria-pressed={selected === option}
            >
              {option}
            </Button>
          ))}
        </div>
      )
    }

    if (question.type === 'multiple') {
      const selected = Array.isArray(answer) ? answer : []
      const options =
        question.options?.map((option) => ({
          value: option,
          label: option,
        })) ?? []
      return (
        <CheckboxGroup
          options={options}
          value={selected}
          onValueChange={(value) => updateAnswer(question.id, value)}
        />
      )
    }

    if (question.type === 'confirm') {
      return (
        <Switch
          label={question.title}
          checked={typeof answer === 'boolean' ? answer : false}
          onChange={(value) => updateAnswer(question.id, value)}
        />
      )
    }

    return null
  }

  return (
    <div
      className={cn(askUserQuestionsVariants({ size }), className)}
      data-slot="ask-user-questions"
      data-size={dataAttr(size)}
      data-step={dataAttr(currentStep)}
      {...props}
    >
      <div data-slot="ask-user-questions-header" className={askHeaderVariants()}>
        <span data-slot="ask-user-questions-title" className={askTitleVariants({ size })}>
          {title}
        </span>
        <span data-slot="ask-user-questions-count" className={askCountVariants({ size })}>
          {String(currentStep + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
        </span>
      </div>

      <div data-slot="ask-user-questions-body" className={askBodyVariants()}>
        {currentQuestion && (
          <div
            key={currentQuestion.id}
            data-slot="ask-user-questions-step"
            className={askStepVariants({ direction: direction === 1 ? 'forward' : 'back' })}
            data-direction={dataAttr(direction === 1 ? 'forward' : 'back')}
          >
            <div data-slot="ask-user-questions-question" className={askQuestionVariants()}>
              <span
                data-slot="ask-user-questions-question-title"
                className={askQuestionTitleVariants({ size })}
              >
                {currentQuestion.title}
                {currentQuestion.required && (
                  <span
                    data-slot="ask-user-questions-required"
                    className={askRequiredVariants()}
                    aria-hidden="true"
                  >
                    *
                  </span>
                )}
              </span>
              {currentQuestion.description && (
                <span
                  data-slot="ask-user-questions-description"
                  className={askDescriptionVariants({ size })}
                >
                  {currentQuestion.description}
                </span>
              )}
              {currentQuestion.required && (
                <span
                  data-slot="ask-user-questions-required-hint"
                  className={askRequiredHintVariants({ size })}
                >
                  {requiredHint}
                </span>
              )}
            </div>
            <div data-slot="ask-user-questions-input" className={askInputVariants()}>
              {renderInput(currentQuestion)}
            </div>
          </div>
        )}
      </div>

      <div data-slot="ask-user-questions-footer" className={askFooterVariants()}>
        <Button variant="secondary" onClick={goBack} disabled={isFirst}>
          {backLabel}
        </Button>
        <Button variant="primary" onClick={goNext} disabled={!canProceed}>
          {isLast ? submitLabel : nextLabel}
        </Button>
      </div>
    </div>
  )
}

AskUserQuestions.displayName = 'AskUserQuestions'

export default AskUserQuestions
