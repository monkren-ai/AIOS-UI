import { Tabs, TabPanel } from 'aios-ui-kit/tabs'

const ITEMS = [
  { value: 'live', label: 'Live' },
  { value: 'history', label: 'History' },
  { value: 'export', label: 'Export', disabled: true },
]

export default function TabsStates() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Tabs items={ITEMS} defaultValue="live">
        <TabPanel value="live">
          <p className="font-body text-base text-foreground-muted">
            Proximity hover on: the pad follows the pointer across the whole list.
          </p>
        </TabPanel>
        <TabPanel value="history">
          <p className="font-body text-base text-foreground-muted">AIOS recorded yet.</p>
        </TabPanel>
      </Tabs>

      <Tabs items={ITEMS} defaultValue="live" enableProximityHover={false}>
        <TabPanel value="live">
          <p className="font-body text-base text-foreground-muted">
            Proximity hover off: only the tab under the pointer reacts.
          </p>
        </TabPanel>
        <TabPanel value="history">
          <p className="font-body text-base text-foreground-muted">AIOS recorded yet.</p>
        </TabPanel>
      </Tabs>
    </div>
  )
}
