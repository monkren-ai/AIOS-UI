import { Countdown } from 'aios-ui-kit/countdown'

export default function CountdownBasic() {
  // 5 分钟后
  const target = Date.now() + 5 * 60 * 1000
  return (
    <div className="flex w-full justify-center">
      <Countdown target={target} label="DROP IN" />
    </div>
  )
}
