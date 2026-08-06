import { DateField } from 'aios-ui-kit/date-field'

export default function DateFieldLocales() {
  return (
    <div className="flex flex-col items-start gap-4">
      <DateField locale="zh" label="YMD / 年月日" defaultValue="2026-08-06" />
      <DateField locale="en" label="MDY / 月日年" defaultValue="2026-08-06" />
    </div>
  )
}
