import { Taskbar, type TaskbarApp } from 'nothing-ui/taskbar'

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
