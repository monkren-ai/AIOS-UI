import { useState } from 'react'
import { AskUserQuestions, type AskUserQuestion } from 'aios-ui-kit/ask-user-questions'

const questions: AskUserQuestion[] = [
  {
    id: 'name',
    title: 'What should we call this project?',
    type: 'text',
    required: true,
  },
  {
    id: 'stack',
    title: 'Pick a stack',
    type: 'single',
    options: ['React', 'Vue', 'Svelte'],
    required: true,
  },
  {
    id: 'confirm',
    title: 'Ship to production?',
    type: 'confirm',
    required: true,
  },
]

export default function AskUserQuestionsDefault() {
  const [answers, setAnswers] = useState<Record<string, string | string[] | boolean>>({})

  return (
    <AskUserQuestions
      className="w-full max-w-md"
      questions={questions}
      value={answers}
      onChange={setAnswers}
      onSubmit={(next) => setAnswers(next)}
    />
  )
}
