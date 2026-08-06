import { QuickToggle } from 'aios-ui-kit/quick-toggle'

export default function QuickToggleThemes() {
  return (
    <div className="flex gap-4">
      <QuickToggle label="Light" theme="light" active />
      <QuickToggle label="Dark" theme="dark" active />
      <QuickToggle label="Accent" theme="accent" active />
    </div>
  )
}
