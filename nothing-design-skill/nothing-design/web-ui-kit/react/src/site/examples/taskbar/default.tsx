import { Taskbar, type TaskbarApp } from 'aios-ui-kit/taskbar'

const apps: TaskbarApp[] = [
  { name: 'Files' },
  { name: 'Mail' },
  { name: 'Music' },
  { name: 'Terminal' },
]

export default function TaskbarDefault() {
  return (
    <div className="w-full">
      <Taskbar apps={apps} />
    </div>
  )
}
