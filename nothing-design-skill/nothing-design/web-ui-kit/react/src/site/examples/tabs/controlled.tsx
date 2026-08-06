import { useState } from 'react'
import { Button } from 'aios-ui-kit/button'
import { Tabs, TabPanel } from 'aios-ui-kit/tabs'

const STEPS = [
  { value: 'address', label: 'Address' },
  { value: 'payment', label: 'Payment' },
  { value: 'review', label: 'Review' },
]

export default function TabsControlled() {
  const [step, setStep] = useState('address')
  const index = STEPS.findIndex((item) => item.value === step)

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Tabs items={STEPS} value={step} onValueChange={setStep}>
        <TabPanel value="address">
          <p className="font-body text-base text-foreground-muted">Where should it ship?</p>
        </TabPanel>
        <TabPanel value="payment">
          <p className="font-body text-base text-foreground-muted">How would you like to pay?</p>
        </TabPanel>
        <TabPanel value="review">
          <p className="font-body text-base text-foreground-muted">
            One last look before you order.
          </p>
        </TabPanel>
      </Tabs>

      <Button
        size="sm"
        variant="outline"
        disabled={index === STEPS.length - 1}
        onClick={() => setStep(STEPS[index + 1]!.value)}
      >
        Next step
      </Button>
    </div>
  )
}
