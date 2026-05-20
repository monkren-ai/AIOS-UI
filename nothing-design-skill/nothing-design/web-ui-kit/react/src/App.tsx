import { useState } from 'react'
import Clock from './components/Clock'
import Battery from './components/Battery'
import Calendar from './components/Calendar'
import SystemMonitor from './components/SystemMonitor'
import MusicPlayer from './components/MusicPlayer'
import PhotoCarousel from './components/PhotoCarousel'
import Button from './components/Buttons'
import Input from './components/Inputs'
import Switch from './components/Switch'
import { Tag, Tags } from './components/Tags'
import SegmentedControl from './components/SegmentedControl'
import Navigation from './components/Navigation'
import Card from './components/Cards'
import DataRows from './components/DataRows'
import DataGrid from './components/DataGrid'
import ProgressBar from './components/ProgressBar'
import Modal from './components/Modal'
import DateNav from './components/DateNav'
import { LoadingState, ErrorState, EmptyState, DisabledState } from './components/States'
import Caffeinate from './components/Caffeinate'
import Clipboard from './components/Clipboard'
import Pomodoro from './components/Pomodoro'
import WalkieTalkie from './components/WalkieTalkie'
import SunDial from './components/SunDial'
import AgeMotion from './components/AgeMotion'
import Chrono from './components/Chrono'
import Spinner from './components/Spinner'
import WorldClock from './components/WorldClock'
import DotMatrix from './components/DotMatrix'
import QuickToggle from './components/QuickToggle'
import WidgetCard from './components/WidgetCard'
import WidgetGrid from './components/WidgetGrid'
import WeatherWidget from './components/widgets/WeatherWidget'
import StepsWidget from './components/widgets/StepsWidget'
import ActivityWidget from './components/widgets/ActivityWidget'
import CompassWidget from './components/widgets/CompassWidget'
import TimeWidget from './components/widgets/TimeWidget'
import NothingWidgets from './components/widgets/NothingWidgets20'
import WidgetIcon from './components/widgets/WidgetIcon'
import WidgetPill from './components/widgets/WidgetPill'
import Glyph from './components/widgets/Glyph'
import Accordion from './components/Accordion'
import Checkbox from './components/Checkbox'
import RadioGroup from './components/RadioGroup'
import Slider from './components/Slider'
import { Tabs, TabPanel } from './components/Tabs'
import Tooltip from './components/Tooltip'
import Textarea from './components/Textarea'
import Label from './components/Label'
import Table from './components/Table'
import Badge from './components/Badge'
import Avatar from './components/Avatar'
import Separator from './components/Separator'
import Skeleton from './components/Skeleton'
import Breadcrumb from './components/Breadcrumb'
import Pagination from './components/Pagination'
import Alert from './components/Alert'
import ScrollArea from './components/ScrollArea'
import Popover from './components/Popover'
import HoverCard from './components/HoverCard'
import ContextMenu from './components/ContextMenu'
import DropdownMenu from './components/DropdownMenu'
import Select from './components/Select'
import Sheet from './components/Sheet'
import { Toggle, ToggleGroup } from './components/Toggle'
import Sonner from './components/Sonner'
import Collapsible from './components/Collapsible'
import Resizable from './components/Resizable'
import Command from './components/Command'
import Form from './components/Form'
import InputOTP from './components/InputOTP'
import NavigationMenu from './components/NavigationMenu'

import Sidebar from './components/Sidebar'
import AspectRatio from './components/AspectRatio'
import './styles/buttons.css'
import './styles/inputs.css'
import './styles/switch.css'
import './styles/tags.css'
import './styles/segmented-control.css'
import './styles/navigation.css'
import './styles/cards.css'
import './styles/data-rows.css'
import './styles/data-grid.css'
import './styles/progress-bar.css'
import './styles/modal.css'
import './styles/date-nav.css'
import './styles/states.css'
import './styles/caffeinate.css'
import './styles/clipboard.css'
import './styles/pomodoro.css'
import './styles/walkie-talkie.css'
import './styles/sun-dial.css'
import './styles/age-motion.css'
import './styles/chrono.css'
import './styles/spinner.css'
import './styles/world-clock.css'
import './styles/dot-matrix.css'
import './styles/quick-toggle.css'
import './styles/widget-card.css'
import './styles/widget-grid.css'
import './styles/weather-widget.css'
import './styles/steps-widget.css'
import './styles/activity-widget.css'
import './styles/compass-widget.css'
import './styles/time-widget.css'
import './styles/widget-icon.css'
import './styles/widget-pill.css'
import './styles/glyph.css'
import './styles/accordion.css'
import './styles/checkbox.css'
import './styles/radio-group.css'
import './styles/slider.css'
import './styles/tabs.css'
import './styles/tooltip.css'
import './styles/textarea.css'
import './styles/label.css'
import './styles/table.css'
import './styles/badge.css'
import './styles/avatar.css'
import './styles/separator.css'
import './styles/skeleton.css'
import './styles/breadcrumb.css'
import './styles/pagination.css'
import './styles/alert.css'
import './styles/scroll-area.css'
import './styles/popover.css'
import './styles/hover-card.css'
import './styles/context-menu.css'
import './styles/dropdown-menu.css'
import './styles/select.css'
import './styles/sheet.css'
import './styles/toggle.css'
import './styles/sonner.css'
import './styles/collapsible.css'
import './styles/resizable.css'
import './styles/command.css'
import './styles/form.css'
import './styles/input-otp.css'
import './styles/navigation-menu.css'

import './styles/sidebar.css'
import './styles/aspect-ratio.css'
import './styles/widgets.css'

const demoTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--label)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  marginBottom: 'var(--space-md)'
}

const groupTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--subheading)',
  letterSpacing: '-0.01em',
  color: 'var(--text-primary)',
  marginBottom: 'var(--space-lg)',
  marginTop: 'var(--space-2xl)'
}

const pageHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--display-xl)',
  lineHeight: 1,
  letterSpacing: '-0.03em',
  color: 'var(--text-display)',
  marginBottom: 'var(--space-lg)'
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)'
}

const categoryTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--heading)',
  letterSpacing: '-0.02em',
  color: 'var(--text-display)',
  paddingBottom: 'var(--space-sm)',
  borderBottom: '1px solid var(--border-visible)',
  marginBottom: 'var(--space-2xl)',
  marginTop: 0
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--caption)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  padding: 'var(--space-xs) var(--space-sm)',
  border: '1px solid var(--border)',
  transition: 'all var(--duration-micro) var(--easing)'
}

const categories = [
  { id: 'core-interaction', label: 'Core Interaction' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'navigation-status', label: 'Navigation & Status' },
  { id: 'functional-widgets', label: 'Functional Widgets' },
  { id: 'utility-widgets', label: 'Utility Widgets' },
  { id: 'nothing-widgets-2', label: 'Nothing Widgets 2.0' },
  { id: 'ui-primitives', label: 'UI Primitives' }
]

function CategorySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 'var(--space-4xl)', scrollMarginTop: 'var(--space-3xl)' }}>
      <h2 style={categoryTitleStyle}>{title}</h2>
      {children}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [dateNavLabel, setDateNavLabel] = useState('May 2026')
  const [spinnerItems, setSpinnerItems] = useState<string[]>(['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY'])
  const [worldClockCities, setWorldClockCities] = useState([
    { name: 'NEW YORK', offset: -5 },
    { name: 'LONDON', offset: 0 },
    { name: 'TOKYO', offset: 9 },
    { name: 'SYDNEY', offset: 11 }
  ])
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [radioValue, setRadioValue] = useState('option1')
  const [paginationPage, setPaginationPage] = useState(5)
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>(['bold'])
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description?: string; variant?: 'default' | 'success' | 'error' | 'warning' }>>([])
  const [otpValue, setOtpValue] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleDatePrev = () => {
    setDateNavLabel(prev => {
      const parts = prev.split(' ')
      const month = parts[0]
      const year = parseInt(parts[1])
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
      let idx = months.indexOf(month)
      if (idx === 0) { idx = 11; return `${months[idx]} ${year - 1}` }
      return `${months[idx - 1]} ${year}`
    })
  }

  const handleDateNext = () => {
    setDateNavLabel(prev => {
      const parts = prev.split(' ')
      const month = parts[0]
      const year = parseInt(parts[1])
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
      let idx = months.indexOf(month)
      if (idx === 11) { idx = 0; return `${months[idx]} ${year + 1}` }
      return `${months[idx + 1]} ${year}`
    })
  }

  const addToast = (variant: 'default' | 'success' | 'error' | 'warning' = 'default') => {
    const id = Date.now().toString()
    const titles: Record<string, string> = {
      default: 'Notification',
      success: 'Success',
      error: 'Error',
      warning: 'Warning'
    }
    setToasts(prev => [...prev, { id, title: titles[variant], description: 'This is a toast message.', variant }])
  }

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <main className="App" style={{
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--black)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      padding: 'var(--space-xl)',
      transition: 'background-color var(--duration-transition) var(--easing), color var(--duration-transition) var(--easing)'
    }}>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          position: 'fixed',
          top: 'var(--space-md)',
          right: 'var(--space-md)',
          padding: 'var(--space-sm) var(--space-md)',
          background: 'var(--surface)',
          border: '1px solid var(--border-visible)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--label)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all var(--duration-micro) var(--easing)'
        }}
      >
        Toggle Theme
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={sectionStyle}>
          <h2 style={demoTitleStyle}>Typography</h2>
          <h1 style={{ ...pageHeaderStyle, marginBottom: 'var(--space-lg)' }}>
            Nothing UI
          </h1>
          <h2 style={{ ...groupTitleStyle, marginBottom: 'var(--space-md)' }}>
            Design System
          </h2>
          <p style={{ fontSize: 'var(--body)', marginBottom: 'var(--space-2xl)' }}>
            Build interfaces with purposeful restraint, technical precision, and a distinctive visual language.
          </p>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {categories.map(cat => (
              <a href={`#${cat.id}`} key={cat.id} style={navLinkStyle}>{cat.label}</a>
            ))}
          </nav>
        </section>

        <CategorySection id="core-interaction" title="Core Interaction">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Buttons</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center', marginTop: 'var(--space-md)' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', maxWidth: '400px' }}>
              <Input variant="underline" label="Underline Input" placeholder="Type something..." />
              <Input variant="bordered" label="Bordered Input" placeholder="Type something..." />
              <Input variant="underline" label="With Error" placeholder="Invalid input" error="This field is required" />
              <Input variant="bordered" label="Disabled" placeholder="Cannot edit" disabled />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Switch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Switch label="Wi-Fi" />
              <Switch label="Bluetooth" on={true} />
              <Switch label="Disabled" disabled />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Tags</h2>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <Tags>
                <Tag variant="pill">Design</Tag>
                <Tag variant="pill" active>Active</Tag>
                <Tag variant="pill" removable>Removable</Tag>
                <Tag variant="pill" disabled>Disabled</Tag>
              </Tags>
            </div>
            <div>
              <Tags>
                <Tag variant="technical">v2.1.0</Tag>
                <Tag variant="technical" active>stable</Tag>
                <Tag variant="technical" removable>beta</Tag>
              </Tags>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Segmented Control</h2>
            <SegmentedControl segments={['Day', 'Week', 'Month']} />
          </section>
        </CategorySection>

        <CategorySection id="data-display" title="Data Display">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Cards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
              <Card variant="default" title="Default Card" action="More">
                <p style={{ fontSize: 'var(--body)', margin: 0 }}>Standard card with header and action.</p>
              </Card>
              <Card variant="raised" title="Raised Card">
                <p style={{ fontSize: 'var(--body)', margin: 0 }}>Elevated surface with background distinction.</p>
              </Card>
              <Card variant="compact" title="Compact">
                <p style={{ fontSize: 'var(--body)', margin: 0 }}>Reduced padding for dense layouts.</p>
              </Card>
              <Card variant="technical" title="[ Technical ]">
                <p style={{ fontSize: 'var(--body)', margin: 0 }}>Monospace technical variant.</p>
              </Card>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Data Rows</h2>
            <DataRows
              rows={[
                { label: 'CPU Usage', value: '42', unit: '%', status: 'good' },
                { label: 'Memory', value: '78', unit: '%', status: 'warning' },
                { label: 'Disk I/O', value: '95', unit: '%', status: 'error' },
                { label: 'Network', value: '1.2', unit: 'GB/s', status: 'info' },
                { label: 'Uptime', value: '14', unit: 'days', trend: '↑' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Data Grid</h2>
            <DataGrid
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'status', label: 'Status' },
                { key: 'value', label: 'Value', type: 'numeric' }
              ]}
              rows={[
                { cells: { name: 'Sensor A', status: 'Online', value: 42 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'good' }] },
                { cells: { name: 'Sensor B', status: 'Warning', value: 78 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'warning' }] },
                { cells: { name: 'Sensor C', status: 'Offline', value: 0 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'error' }] }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Progress Bar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <ProgressBar value={65} size="hero" label="Storage" unit="%" status="default" />
              <ProgressBar value={78} size="standard" label="Memory" unit="%" status="warning" />
              <ProgressBar value={95} size="compact" label="CPU" unit="%" status="overlimit" />
            </div>
          </section>
        </CategorySection>

        <CategorySection id="overlays" title="Overlays">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Modal</h2>
            <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal
              open={modalOpen}
              title="Confirm Action"
              onClose={() => setModalOpen(false)}
              footer={<Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>}
            >
              <p style={{ fontSize: 'var(--body)' }}>Are you sure you want to proceed? This action cannot be undone.</p>
            </Modal>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Dropdown</h2>
            <div style={{ maxWidth: '300px' }}>
              <Select
                options={[
                  { label: 'Option A', value: 'a' },
                  { label: 'Option B', value: 'b' },
                  { label: 'Option C', value: 'c' },
                  { label: 'Disabled', value: 'd', disabled: true }
                ]}
                value={dropdownValue}
                onValueChange={setDropdownValue}
                placeholder="Choose one"
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Bottom Sheet</h2>
            <Button variant="primary" onClick={() => setBottomSheetOpen(true)}>Open Bottom Sheet</Button>
            <Sheet
              open={bottomSheetOpen}
              onOpenChange={setBottomSheetOpen}
              side="bottom"
              title="Settings"
              sections={[
                { title: 'Display', content: <Switch label="Dark Mode" on={theme === 'dark'} /> },
                { title: 'Connectivity', content: <Switch label="Wi-Fi" on={true} /> }
              ]}
            />
          </section>
        </CategorySection>

        <CategorySection id="navigation-status" title="Navigation & Status">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Navigation</h2>
            <Navigation
              variant="bracket"
              items={[
                { label: 'Home' },
                { label: 'Devices' },
                { label: 'Settings' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Date Nav</h2>
            <DateNav
              label={dateNavLabel}
              onPrev={handleDatePrev}
              onNext={handleDateNext}
              grotesk
            />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>States</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
              <LoadingState progress={65} label="Syncing" />
              <ErrorState headline="Connection Lost" message="Unable to reach the server." onRetry={() => {}} />
              <EmptyState headline="No Devices" description="Pair a device to get started." />
              <DisabledState headline="Feature Locked" description="Requires premium plan." />
            </div>
          </section>
        </CategorySection>

        <CategorySection id="functional-widgets" title="Functional Widgets">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Clocks</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-lg)'
            }}>
              <Clock type="digital" />
              <Clock type="gauge" />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Battery</h2>
            <Battery />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Calendar</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-lg)'
            }}>
              <Calendar type="compact" />
              <Calendar type="full" />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>System Monitor</h2>
            <SystemMonitor />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Music Player</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <MusicPlayer />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Photo Carousel</h2>
            <PhotoCarousel />
          </section>
        </CategorySection>

        <CategorySection id="utility-widgets" title="Utility Widgets">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Caffeinate</h2>
            <div style={{ maxWidth: '400px' }}>
              <Caffeinate />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Clipboard</h2>
            <div style={{ maxWidth: '400px' }}>
              <Clipboard />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Pomodoro</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Pomodoro />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Walkie Talkie</h2>
            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <WalkieTalkie />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sun Dial</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <SunDial />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Age Motion</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <AgeMotion />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Chrono</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Chrono />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Spinner</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Spinner items={spinnerItems} />
              <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
                <Button variant="secondary" size="sm" onClick={() => setSpinnerItems(prev => [...prev.slice(1), prev[0]])}>Rotate Items</Button>
                <Button variant="ghost" size="sm" onClick={() => setSpinnerItems(['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY'])}>Reset</Button>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>World Clock</h2>
            <WorldClock cities={worldClockCities} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setWorldClockCities(prev => [...prev, { name: 'SHANGHAI', offset: 8 }])}>Add Shanghai</Button>
              <Button variant="ghost" size="sm" onClick={() => setWorldClockCities(prev => prev.length > 1 ? prev.slice(0, -1) : prev)}>Remove Last</Button>
            </div>
          </section>
        </CategorySection>

        <CategorySection id="nothing-widgets-2" title="Nothing Widgets 2.0">
          <section style={sectionStyle}>
            <div style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px' }}>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Quick Toggles</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }}>
                  <QuickToggle variant="circle" theme="light" label="Active" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <QuickToggle variant="circle" theme="light" label="Torch" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>} />
                  <QuickToggle variant="circle" theme="accent" label="DND" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                  <QuickToggle variant="circle" theme="light" label="Rotate" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)' }}>
                  <QuickToggle variant="pill" theme="dark" label="Hotspot" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <QuickToggle variant="pill" theme="dark" label="Bluetooth" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>} />
                  <QuickToggle variant="pill" theme="light" label="Mobile Data" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <QuickToggle variant="pill" theme="dark" label="NFC" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Widget Icons</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', alignItems: 'center' }}>
                  <WidgetIcon theme="dark" size="sm" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <WidgetIcon theme="light" size="md" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} label="Favorite" />
                  <WidgetIcon theme="accent" size="lg" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 1C8.13 1 5 4.13 5 8C5 12.17 8.87 16.24 12 23C15.13 16.24 19 12.17 19 8C19 4.13 15.87 1 12 1Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <WidgetIcon theme="error" size="md" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Widget Pills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', alignItems: 'center' }}>
                  <WidgetPill theme="light" label="Mobile Data" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
                  <WidgetPill theme="dark" label="Bluetooth" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>} />
                  <WidgetPill theme="accent" label="Calculator" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="18" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
                  <WidgetPill theme="error" label="Battery Saver" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="17" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Glyph Icons (Dot Matrix)</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', alignItems: 'center' }}>
                  <Glyph type="check" theme="light" size="sm" />
                  <Glyph type="heart" theme="dark" size="md" />
                  <Glyph type="play" theme="accent" size="md" />
                  <Glyph type="wifi" theme="light" size="lg" />
                  <Glyph type="sun" theme="dark" size="md" />
                  <Glyph type="moon" theme="light" size="md" />
                  <Glyph type="volume-up" theme="dark" size="sm" />
                  <Glyph type="lock" theme="accent" size="md" />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Widget Cards</h3>
                <WidgetGrid>
                  <WidgetCard>
                    <StepsWidget steps={5543} streak={3} streakUnit="DAYS" />
                  </WidgetCard>
                  <WidgetCard>
                    <TimeWidget variant="over-limit" label="Over Limit" value="40" unit="MIN" />
                  </WidgetCard>
                  <WidgetCard>
                    <TimeWidget variant="date" label="TUESDAY" value="GMT+1" />
                  </WidgetCard>
                  <WidgetCard>
                    <CompassWidget heading={45} />
                  </WidgetCard>
                  <WidgetCard>
                    <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" />
                  </WidgetCard>
                  <WidgetCard>
                    <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" />
                  </WidgetCard>
                </WidgetGrid>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Enhanced Widget Cards</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', alignItems: 'flex-start' }}>
                  <WidgetCard 
                    theme="light" 
                    title="Steps" 
                    value="5,543" 
                    subtitle="GOAL: 10,000"
                    icon={<Glyph type="check" theme="light" size="sm" />}
                  />
                  <WidgetCard 
                    theme="dark" 
                    title="WEATHER" 
                    value="30°" 
                    subtitle="PARTLY CLOUDY"
                    icon={<Glyph type="sun" theme="dark" size="sm" />}
                    iconPosition="top"
                  />
                  <WidgetCard 
                    theme="accent" 
                    title="DND" 
                    value="40" 
                    subtitle="MIN"
                    icon={<Glyph type="bell" theme="accent" size="sm" />}
                    iconPosition="top"
                  />
                  <WidgetCard 
                    theme="dark" 
                    title="TIMER" 
                    value="16:32" 
                    icon={<Glyph type="clock" theme="dark" size="sm" />}
                    iconPosition="bottom"
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', marginTop: 'var(--widget-gap)', alignItems: 'flex-start' }}>
                  <WidgetCard 
                    size="wide"
                    theme="dark" 
                    title="WEATHER" 
                    value="30°" 
                    subtitle="PARTLY CLOUDY"
                    icon={<Glyph type="sun" theme="dark" size="sm" />}
                    iconPosition="left"
                  />
                  <WidgetCard 
                    size="wide"
                    theme="accent" 
                    title="DND" 
                    value="40" 
                    subtitle="MIN"
                    icon={<Glyph type="bell" theme="accent" size="sm" />}
                    iconPosition="right"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Wide Widgets</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--widget-gap)' }}>
                  <WidgetCard size="wide">
                    <ActivityWidget days={[
                      { label: 'SUN', value: '9H26', markers: [1, 0, 1] },
                      { label: 'MON', value: '9H14', markers: [1, 1, 0] },
                      { label: 'TUE', value: '8H52', markers: [0, 1, 1] },
                      { label: 'WED', value: '7H30', markers: [1, 0, 0] },
                      { label: 'THU', value: '10H05', markers: [1, 1, 1] },
                      { label: 'FRI', value: '6H48', markers: [0, 0, 1] },
                      { label: 'SAT', value: '5H15', markers: [0, 1, 0] }
                    ]} />
                  </WidgetCard>
                  <WidgetCard size="wide">
                    <WeatherWidget variant="wide" temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" forecast={[
                      { day: 'MON', hi: '32°', lo: '18°' },
                      { day: 'TUE', hi: '28°', lo: '15°' },
                      { day: 'WED', hi: '33°', lo: '20°' },
                      { day: 'THU', hi: '30°', lo: '17°' },
                      { day: 'FRI', hi: '27°', lo: '14°' }
                    ]} />
                  </WidgetCard>
                  <WidgetCard size="wide">
                    <TimeWidget variant="over-limit-accent" label="Over Limit" value="30m" subtitle="16H 32M" />
                  </WidgetCard>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-sm)' }}>Dot Matrix Showcase</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--widget-gap)', alignItems: 'center' }}>
                  <DotMatrix rows={5} cols={5} dotSize="md" theme="light" />
                  <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" pattern="glyph" />
                  <DotMatrix rows={10} cols={10} dotSize="sm" theme="dark" activeDots={[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[0,9],[1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0]]} />
                </div>
              </div>

              <div>
                <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-md)' }}>
                  Figma 2.0 完整展示
                </h3>
                <div style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }}>
                  <NothingWidgets />
                </div>
              </div>
            </div>
          </section>
        </CategorySection>

        <CategorySection id="ui-primitives" title="UI Primitives">
          <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', color: 'var(--text-primary)', marginTop: 0 }}>Core Interaction</h3>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Accordion</h2>
            <div style={{ maxWidth: '500px' }}>
              <Accordion
                type="single"
                items={[
                  { id: '1', title: 'What is Nothing UI?', content: 'A design system built with purposeful restraint and technical precision.' },
                  { id: '2', title: 'How do I install it?', content: 'Install via npm: npm install nothing-ui-kit' },
                  { id: '3', title: 'Is it accessible?', content: 'Yes, all components follow WAI-ARIA guidelines with full keyboard navigation.' }
                ]}
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Alert Dialog</h2>
            <Button variant="destructive" onClick={() => setAlertDialogOpen(true)}>Delete Account</Button>
            <Modal
              open={alertDialogOpen}
              onClose={() => setAlertDialogOpen(false)}
              title="Are you absolutely sure?"
              variant="alert"
              description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              confirmLabel="Delete"
              cancelLabel="Cancel"
              destructive
              onConfirm={() => setAlertDialogOpen(false)}
              onCancel={() => setAlertDialogOpen(false)}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Checkbox</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Indeterminate" checked="indeterminate" />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Radio Group</h2>
            <RadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
              orientation="vertical"
              options={[
                { value: 'option1', label: 'Option One' },
                { value: 'option2', label: 'Option Two' },
                { value: 'option3', label: 'Option Three' },
                { value: 'option4', label: 'Option Four' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Slider</h2>
            <div style={{ maxWidth: '400px' }}>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                label="Volume"
                showValue
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Tabs</h2>
            <div style={{ maxWidth: '500px' }}>
              <Tabs
                items={[
                  { value: 'account', label: 'Account' },
                  { value: 'password', label: 'Password' },
                  { value: 'settings', label: 'Settings' }
                ]}
              >
                <TabPanel value="account">Manage your account settings and preferences.</TabPanel>
                <TabPanel value="password">Change your password and security options.</TabPanel>
                <TabPanel value="settings">Configure application settings and notifications.</TabPanel>
              </Tabs>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Tooltip</h2>
            <Tooltip content="This is a tooltip" side="top">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Textarea</h2>
            <div style={{ maxWidth: '400px' }}>
              <Textarea label="Description" placeholder="Type your message..." autoResize minRows={3} />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Label</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Label>Normal Label</Label>
              <Label required>Required Label</Label>
              <Label disabled>Disabled Label</Label>
            </div>
          </section>

          <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', color: 'var(--text-primary)' }}>Data Display</h3>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Table</h2>
            <Table
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'status', label: 'Status' },
                { key: 'score', label: 'Score', align: 'right' as const }
              ]}
              rows={[
                { cells: { name: 'Alice', role: 'Engineer', status: 'Active', score: '92' } },
                { cells: { name: 'Bob', role: 'Designer', status: 'Away', score: '87' } },
                { cells: { name: 'Carol', role: 'Manager', status: 'Active', score: '95' } }
              ]}
              striped
              hoverable
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Badge</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Avatar</h2>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Separator</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', height: '40px' }}>
              <span style={{ fontSize: 'var(--body)' }}>Left</span>
              <Separator orientation="vertical" decorative />
              <span style={{ fontSize: 'var(--body)' }}>Right</span>
            </div>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <Separator orientation="horizontal" decorative />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Skeleton</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <Skeleton variant="text" width="200px" height="16px" />
              <Skeleton variant="circular" width="48px" height="48px" />
              <Skeleton variant="rectangular" width="100%" height="80px" />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Breadcrumb</h2>
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Products', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Current Page' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Pagination</h2>
            <Pagination
              page={paginationPage}
              totalPages={20}
              onPageChange={setPaginationPage}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Alert</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: '500px' }}>
              <Alert title="Heads up!" variant="default">
                You can add components to your app using the CLI.
              </Alert>
              <Alert title="Error" variant="destructive">
                Your session has expired. Please log in again.
              </Alert>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Scroll Area</h2>
            <ScrollArea height="200px">
              <div style={{ padding: 'var(--space-sm)' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ padding: 'var(--space-sm)', borderBottom: '1px solid var(--border)', fontSize: 'var(--body)' }}>
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>ProgressBar — Slim & Indeterminate</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim</div>
                <ProgressBar value={65} variant="slim" />
              </div>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim — Good</div>
                <ProgressBar value={80} variant="slim" status="good" />
              </div>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Indeterminate</div>
                <ProgressBar value={0} indeterminate />
              </div>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim Indeterminate</div>
                <ProgressBar value={0} variant="slim" indeterminate />
              </div>
            </div>
          </section>

          <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', color: 'var(--text-primary)' }}>Advanced Interaction</h3>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Popover</h2>
            <Popover
              side="bottom"
              content={
                <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Popover Title</div>
                  <div>Some content inside the popover.</div>
                </div>
              }
            >
              <Button variant="secondary">Open Popover</Button>
            </Popover>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Hover Card</h2>
            <HoverCard
              side="bottom"
              content={
                <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>@nothingdesign</div>
                  <div>Design system for the Nothing ecosystem.</div>
                </div>
              }
            >
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontSize: 'var(--body)' }} onClick={e => e.preventDefault()}>@nothingdesign</a>
            </HoverCard>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Context Menu</h2>
            <ContextMenu
              items={[
                { label: 'Back', shortcut: 'Alt+←' },
                { label: 'Forward', shortcut: 'Alt+→' },
                { label: 'Reload', shortcut: 'Ctrl+R', separator: true },
                { label: 'Save as...', shortcut: 'Ctrl+S' },
                { label: 'Print...', shortcut: 'Ctrl+P', separator: true },
                { label: 'View Source', shortcut: 'Ctrl+U' }
              ]}
            >
              <div style={{
                padding: 'var(--space-xl)',
                border: '1px dashed var(--border-visible)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                fontSize: 'var(--body)',
                color: 'var(--text-secondary)'
              }}>
                Right-click this area
              </div>
            </ContextMenu>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Dropdown Menu</h2>
            <DropdownMenu
              trigger="Menu"
              items={[
                { label: 'New File', shortcut: 'Ctrl+N' },
                { label: 'Open File', shortcut: 'Ctrl+O', separator: true },
                { label: 'Save', shortcut: 'Ctrl+S' },
                { label: 'Save As...', shortcut: 'Ctrl+Shift+S', separator: true },
                { label: 'Exit' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Select</h2>
            <div style={{ maxWidth: '300px' }}>
              <Select
                label="Choose a fruit"
                placeholder="Select..."
                searchable
                value={selectValue}
                onValueChange={setSelectValue}
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'banana', label: 'Banana' },
                  { value: 'cherry', label: 'Cherry' },
                  { value: 'date', label: 'Date' },
                  { value: 'elderberry', label: 'Elderberry' }
                ]}
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sheet</h2>
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>Open Sheet</Button>
            <Sheet
              open={sheetOpen}
              onOpenChange={setSheetOpen}
              side="right"
              title="Settings Panel"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <Switch label="Dark Mode" on={theme === 'dark'} />
                <Switch label="Notifications" on={true} />
                <Switch label="Auto-update" />
              </div>
            </Sheet>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Toggle / Toggle Group</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Single Toggle</div>
                <Toggle>Toggle</Toggle>
              </div>
              <div>
                <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Toggle Group</div>
                <ToggleGroup
                  value={toggleGroupValue}
                  onValueChange={setToggleGroupValue}
                  variant="outline"
                >
                  <Toggle value="bold">Bold</Toggle>
                  <Toggle value="italic">Italic</Toggle>
                  <Toggle value="underline">Underline</Toggle>
                </ToggleGroup>
              </div>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sonner (Toast)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => addToast('default')}>Default</Button>
              <Button variant="secondary" size="sm" onClick={() => addToast('success')}>Success</Button>
              <Button variant="secondary" size="sm" onClick={() => addToast('error')}>Error</Button>
              <Button variant="secondary" size="sm" onClick={() => addToast('warning')}>Warning</Button>
            </div>
            <Sonner toasts={toasts} onDismiss={dismissToast} position="top-right" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Collapsible</h2>
            <div style={{ maxWidth: '500px' }}>
              <Collapsible trigger="Show Details">
                <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)', color: 'var(--text-secondary)' }}>
                  These are the hidden details that can be expanded or collapsed by clicking the trigger above.
                </div>
              </Collapsible>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Resizable</h2>
            <Resizable
              direction="horizontal"
              initialSizes={[50, 50]}
              minSizes={[20, 20]}
            >
              <div style={{ padding: 'var(--space-md)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-visible)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--body)' }}>
                Panel A
              </div>
              <div style={{ padding: 'var(--space-md)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-visible)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--body)' }}>
                Panel B
              </div>
            </Resizable>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Command</h2>
            <div style={{ maxWidth: '500px' }}>
              <Command
                open={commandOpen}
                onOpenChange={setCommandOpen}
                groups={[
                  {
                    heading: 'Suggestions',
                    items: [
                      { id: '1', label: 'Calendar', shortcut: '⌘C', onSelect: () => {} },
                      { id: '2', label: 'Search Emoji', shortcut: '⌘E', onSelect: () => {} },
                      { id: '3', label: 'Calculator', shortcut: '⌘K', onSelect: () => {} }
                    ]
                  },
                  {
                    heading: 'Settings',
                    items: [
                      { id: '4', label: 'Profile', onSelect: () => {} },
                      { id: '5', label: 'Billing', onSelect: () => {} },
                      { id: '6', label: 'Settings', onSelect: () => {} }
                    ]
                  }
                ]}
              />
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Form</h2>
            <div style={{ maxWidth: '400px' }}>
              <Form onSubmit={() => addToast('success')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <Input variant="underline" label="Name" placeholder="Your name" />
                  <Input variant="underline" label="Email" placeholder="you@example.com" />
                  <button type="submit" style={{
                    padding: 'var(--space-sm) var(--space-lg)',
                    background: 'var(--text-display)',
                    color: 'var(--black)',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--label)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}>Submit</button>
                </div>
              </Form>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Input OTP</h2>
            <InputOTP length={6} value={otpValue} onValueChange={setOtpValue} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Navigation Menu</h2>
            <NavigationMenu
              items={[
                {
                  label: 'Products',
                  children: [
                    { label: 'Phone (1)', onClick: () => {} },
                    { label: 'Phone (2)', onClick: () => {} },
                    { label: 'Ear (1)', onClick: () => {} }
                  ]
                },
                {
                  label: 'Company',
                  children: [
                    { label: 'About', onClick: () => {} },
                    { label: 'Careers', onClick: () => {} }
                  ]
                },
                { label: 'Community', onClick: () => {} }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Menubar</h2>
            <DropdownMenu
              variant="menubar"
              items={[
                {
                  label: 'File',
                  items: [
                    { label: 'New Tab', shortcut: '⌘T', onClick: () => {} },
                    { label: 'New Window', shortcut: '⌘N', onClick: () => {} },
                    { label: 'Share', separator: true },
                    { label: 'Print', shortcut: '⌘P', onClick: () => {} }
                  ]
                },
                {
                  label: 'Edit',
                  items: [
                    { label: 'Undo', shortcut: '⌘Z', onClick: () => {} },
                    { label: 'Redo', shortcut: '⌘⇧Z', onClick: () => {} },
                    { label: 'Cut', separator: true, shortcut: '⌘X' },
                    { label: 'Copy', shortcut: '⌘C' },
                    { label: 'Paste', shortcut: '⌘V' }
                  ]
                },
                {
                  label: 'View',
                  items: [
                    { label: 'Zoom In', shortcut: '⌘+', onClick: () => {} },
                    { label: 'Zoom Out', shortcut: '⌘-', onClick: () => {} }
                  ]
                }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sidebar</h2>
            <div style={{ maxWidth: '240px' }}>
              <Sidebar
                items={[
                  { label: 'Dashboard', active: true, icon: <span>◉</span> },
                  { label: 'Analytics', icon: <span>◎</span>, badge: 3 },
                  { label: 'Reports', icon: <span>◈</span> },
                  { label: 'Settings', icon: <span>⚙</span> },
                  { label: 'Help', icon: <span>?⃝</span> }
                ]}
                header={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--label)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nothing UI</span>}
              />
            </div>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Aspect Ratio</h2>
            <div style={{ maxWidth: '500px' }}>
              <AspectRatio ratio={16 / 9}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--surface)',
                  border: '1px solid var(--border-visible)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--body)',
                  color: 'var(--text-secondary)'
                }}>
                  16:9
                </div>
              </AspectRatio>
            </div>
          </section>
        </CategorySection>
      </div>
    </main>
  )
}

export default App
