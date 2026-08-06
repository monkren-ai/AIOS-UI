import { Tabs, TabPanel } from 'aios-ui-kit/tabs'

const ITEMS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const VARIANTS = ['default', 'pills', 'subtle'] as const

export default function TabsVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {VARIANTS.map((variant) => (
        <Tabs key={variant} items={ITEMS} variant={variant} defaultValue="day">
          <TabPanel value="day">
            <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
              {variant}
            </p>
          </TabPanel>
          <TabPanel value="week">
            <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
              {variant}
            </p>
          </TabPanel>
          <TabPanel value="month">
            <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
              {variant}
            </p>
          </TabPanel>
        </Tabs>
      ))}
    </div>
  )
}
