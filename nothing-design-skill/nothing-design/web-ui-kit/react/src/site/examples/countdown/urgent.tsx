import { Countdown } from 'aios-ui-kit/countdown'

export default function CountdownUrgent() {
  // 8 秒后，threshold 10 → 一上来就在临近区间，读数为红
  const target = Date.now() + 8 * 1000
  return (
    <div className="flex w-full justify-center">
      <Countdown target={target} threshold={10} label="FINAL CALL" />
    </div>
  )
}
