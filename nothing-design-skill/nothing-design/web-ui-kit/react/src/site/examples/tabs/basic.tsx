import { Tabs, TabPanel } from 'nothing-ui/tabs'

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'specs', label: 'Specs' },
  { value: 'support', label: 'Support' },
]

export default function TabsBasic() {
  return (
    <Tabs className="w-full max-w-md" items={ITEMS} defaultValue="overview">
      <TabPanel value="overview">
        <p className="font-body text-base text-foreground-muted">
          Phone (2a). Glyph interface, 50MP dual camera, 5000mAh.
        </p>
      </TabPanel>
      <TabPanel value="specs">
        <p className="font-body text-base text-foreground-muted">
          6.7&quot; flexible AMOLED, 120Hz, 1300 nits peak.
        </p>
      </TabPanel>
      <TabPanel value="support">
        <p className="font-body text-base text-foreground-muted">
          Two-year warranty. Repairs handled in-region.
        </p>
      </TabPanel>
    </Tabs>
  )
}
