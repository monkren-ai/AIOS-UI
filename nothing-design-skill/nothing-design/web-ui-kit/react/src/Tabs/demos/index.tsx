import { useState } from 'react'
import { Tabs, TabPanel } from '../Tabs'

export default function Demo() {
  const [value, setValue] = useState('overview')
  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'activity', label: 'Activity' },
    { value: 'settings', label: 'Settings', disabled: true },
  ]
  return (
    <Tabs items={items} value={value} onValueChange={setValue}>
      <TabPanel value="overview">
        <p>Overview content</p>
      </TabPanel>
      <TabPanel value="activity">
        <p>Activity content</p>
      </TabPanel>
      <TabPanel value="settings">
        <p>Settings content</p>
      </TabPanel>
    </Tabs>
  )
}
