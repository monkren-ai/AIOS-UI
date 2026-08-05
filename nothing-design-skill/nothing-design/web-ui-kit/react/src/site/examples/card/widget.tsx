import { WidgetCard } from 'nothing-ui/card'

export default function CardWidget() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <WidgetCard title="Steps" value="8,412" subtitle="Today" />
      <WidgetCard size="wide" theme="light" title="Battery" value="72%" subtitle="4h left" />
      <WidgetCard
        size="tall"
        theme="accent"
        title="Unread"
        value={12}
        subtitle="Inbox"
        onClick={() => console.log('open inbox')}
      />
    </div>
  )
}
