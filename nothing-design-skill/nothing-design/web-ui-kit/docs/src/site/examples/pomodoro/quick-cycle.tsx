import { Pomodoro } from 'aios-ui-kit/pomodoro'

export default function PomodoroQuickCycle() {
  return (
    <div className="w-full max-w-sm">
      <Pomodoro workMinutes={1} breakMinutes={1} totalSegments={12} />
    </div>
  )
}
