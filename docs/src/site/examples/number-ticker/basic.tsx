import { useState } from 'react'
import { NumberTicker } from 'aios-ui-kit/number-ticker'
import { Button } from 'aios-ui-kit/button'

export default function NumberTickerBasic() {
  const [value, setValue] = useState(1280)

  return (
    <div className="flex flex-col items-start gap-4">
      <NumberTicker value={value} prefix="$" />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue((n) => n + 12)}>
          +12
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setValue((n) => n - 12)}>
          −12
        </Button>
      </div>
    </div>
  )
}
