import { Taskbar, type TaskbarApp } from 'nothing-ui/taskbar'

const apps: TaskbarApp[] = [{ name: 'Files' }, { name: 'Mail' }]

export default function TaskbarMinimal() {
  return (
    <div className="w-full">
      <Taskbar apps={apps} showSearch={false} showBattery={false} theme="light" />
    </div>
  )
}
