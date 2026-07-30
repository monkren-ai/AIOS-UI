import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import Button from '@/Button'
import Input from '@/Input'
import Switch from '@/Switch'
import { CheckboxGroup } from '@/CheckboxGroup'
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

export const askUserQuestionsVariants = cva('nothing-ask-user-questions', {
  variants: {
    size: {
      sm: 'nothing-ask-user-questions--sm',
      md: 'nothing-ask-user-questions--md',
      lg: 'nothing-ask-user-questions--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface AskUserQuestionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'value' | 'defaultValue' | 'onSubmit'>,
    VariantProps<typeof askUserQuestionsVariants> {
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
}

const isAnswerEmpty = (question: AskUserQuestion, answer: AskUserAnswerValue | undefined): boolean => {
  if (answer === undefined) return true
  if (question.type === 'text') return typeof answer !== 'string' || answer.trim() === ''
  if (question.type === 'single') return typeof answer !== 'string' || answer.trim() === ''
  if (question.type === 'multiple') return !Array.isArray(answer) || answer.length === 0
  if (question.type === 'confirm') return answer !== true
  return false
}

export const AskUserQuestions = React.forwardRef<HTMLDivElement, AskUserQuestionsProps>(
  (
    {
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
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalAnswers, setInternalAnswers] = React.useState<Record<string, AskUserAnswerValue>>(defaultValue)
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
            onChange={(value) => updateAnswer(question.id, value)}
            placeholder="Type your answer"
          />
        )
      }

      if (question.type === 'single') {
        const selected = typeof answer === 'string' ? answer : ''
        return (
          <div className="nothing-ask-user-questions__options" role="radiogroup">
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
            on={typeof answer === 'boolean' ? answer : false}
            onChange={(value) => updateAnswer(question.id, value)}
          />
        )
      }

      return null
    }

    return (
      <div
        ref={ref}
        className={cn(askUserQuestionsVariants({ size }), className)}
        data-slot="ask-user-questions"
        data-size={dataAttr(size)}
        {...props}
      >
        <div className="nothing-ask-user-questions__header">
          <span className="nothing-ask-user-questions__title">{title}</span>
          <span className="nothing-ask-user-questions__count">
            {String(currentStep + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
          </span>
        </div>

        <div className="nothing-ask-user-questions__body">
          {currentQuestion && (
            <div
              key={currentQuestion.id}
              className="nothing-ask-user-questions__step"
              data-direction={dataAttr(direction === 1 ? 'forward' : 'back')}
            >
              <div className="nothing-ask-user-questions__question">
                <span className="nothing-ask-user-questions__question-title">
                  {currentQuestion.title}
                  {currentQuestion.required && (
                    <span className="nothing-ask-user-questions__required" aria-hidden="true">
                      *
                    </span>
                  )}
                </span>
                {currentQuestion.description && (
                  <span className="nothing-ask-user-questions__description">
                    {currentQuestion.description}
                  </span>
                )}
                {currentQuestion.required && (
                  <span className="nothing-ask-user-questions__required-hint">{requiredHint}</span>
                )}
              </div>
              <div className="nothing-ask-user-questions__input">{renderInput(currentQuestion)}</div>
            </div>
          )}
        </div>

        <div className="nothing-ask-user-questions__footer">
          <Button variant="secondary" onClick={goBack} disabled={isFirst}>
            {backLabel}
          </Button>
          <Button variant="primary" onClick={goNext} disabled={!canProceed}>
            {isLast ? submitLabel : nextLabel}
          </Button>
        </div>
      </div>
    )
  },
)
AskUserQuestions.displayName = 'AskUserQuestions'

export default AskUserQuestions
