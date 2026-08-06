import { Separator } from 'aios-ui-kit/separator'

export default function SeparatorDecorative() {
  return (
    <ul className="w-full max-w-sm list-none p-0">
      {['Display', 'Sound', 'Haptics'].map((item, index) => (
        <li key={item}>
          {index > 0 && <Separator decorative size="sm" />}
          <span className="text-sm text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}
