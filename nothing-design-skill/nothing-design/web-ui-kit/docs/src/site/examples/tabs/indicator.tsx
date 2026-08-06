import { Tabs, TabPanel } from 'aios-ui-kit/tabs'

const ITEMS = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
]

export default function TabsIndicator() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {/* 默认：一条线随选中项滑动 */}
      <Tabs items={ITEMS} indicator="line" defaultValue="grid">
        <TabPanel value="grid">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;line&quot;
          </p>
        </TabPanel>
        <TabPanel value="list">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;line&quot;
          </p>
        </TabPanel>
      </Tabs>

      {/* pills 自己就有选中底色，不再需要滑动条 */}
      <Tabs items={ITEMS} variant="pills" indicator="background" defaultValue="grid">
        <TabPanel value="grid">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;background&quot;
          </p>
        </TabPanel>
        <TabPanel value="list">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;background&quot;
          </p>
        </TabPanel>
      </Tabs>

      {/* 只剩文字明暗差别 */}
      <Tabs items={ITEMS} variant="subtle" indicator="none" defaultValue="grid">
        <TabPanel value="grid">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;none&quot;
          </p>
        </TabPanel>
        <TabPanel value="list">
          <p className="font-mono text-label uppercase tracking-wider text-foreground-muted">
            indicator=&quot;none&quot;
          </p>
        </TabPanel>
      </Tabs>
    </div>
  )
}
