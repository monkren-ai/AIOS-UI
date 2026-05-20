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
import WeatherWidget from './components/widgets/WeatherWidget'
import StepsWidget from './components/widgets/StepsWidget'
import ActivityWidget from './components/widgets/ActivityWidget'
import CompassWidget from './components/widgets/CompassWidget'
import TimeWidget from './components/widgets/TimeWidget'
import { Home, DarkMode, Remote, Subtitle, Wallet, Location, DarkMode1, NoSignam, DownArrow, DoNotDisturb, QrCode, Storage, Share, NoConnection, Record, FullNetwork, Shield, Glyphs, Aeroplane, Chart, Video, Temp, AutoRotate, Info, MicOff, NoSim, Watch, Record1, AccessCamera, Dots, Filter, Home1, Cast, DoNotDisturb1, ArrowDown, QrCode1, Subtitle1, Scan, Cast1, BatteryPlus } from './components/widgets/WidgetIcons'
import { Dim, Dim1, Calculator, BatterySaver, HomeControls, Nfc, Bedtime, DarkMode2, Weather as FigmaWeather, Remote1, Share1, Hotspot, Share2, Dim2, DataSaver, Torch, Share3 } from './components/widgets/WidgetPills'
import { Record2, LocationAccess, WatchAnalog, Compass as FigmaCompass, TempControl, AutoRotate1, Active, Watch1, Active1, Recording, Glyphs1, LocationAccess1, Glyphs2, Campus, Location1, Flash, Weather1, MicAccess, PairNewDevice, Overlimit, MusicPlayer as FigmaMusicPlayer, TotalTime, StepsCounter, OverLimit1, LoadingBar1, Card as FigmaCard, Card1, Dots3, Play, NothingEar, Card2, Date as FigmaDate, Date1, Counter, Music, Device, Mode, DoubleDown, SelectDevice, Card3, ActivityTracker, Time as FigmaTime, Weather2, Wedget } from './components/widgets/WidgetSubComponents'
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
  marginBottom: 'var(--space-md)',
  width: '100%'
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

const flexWrapSectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--space-md)',
  alignItems: 'center'
}

const gridSectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--space-md)'
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
  { id: 'widgets', label: 'Widgets' },
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
          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Buttons</h2>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Inputs</h2>
            <Input variant="underline" label="Underline Input" placeholder="Type something..." style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="bordered" label="Bordered Input" placeholder="Type something..." style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="underline" label="With Error" placeholder="Invalid input" error="This field is required" style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="bordered" label="Disabled" placeholder="Cannot edit" disabled style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Switch</h2>
            <Switch label="Wi-Fi" style={{ marginBottom: 'var(--space-md)' }} />
            <Switch label="Bluetooth" on={true} style={{ marginBottom: 'var(--space-md)' }} />
            <Switch label="Disabled" disabled />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Tags</h2>
            <Tags>
              <Tag variant="pill">Design</Tag>
              <Tag variant="pill" active>Active</Tag>
              <Tag variant="pill" removable>Removable</Tag>
              <Tag variant="pill" disabled>Disabled</Tag>
            </Tags>
            <Tags>
              <Tag variant="technical">v2.1.0</Tag>
              <Tag variant="technical" active>stable</Tag>
              <Tag variant="technical" removable>beta</Tag>
            </Tags>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Segmented Control</h2>
            <SegmentedControl segments={['Day', 'Week', 'Month']} />
          </section>
        </CategorySection>

        <CategorySection id="data-display" title="Data Display">
          <section style={gridSectionStyle}>
            <h2 style={demoTitleStyle}>Cards</h2>
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
            <ProgressBar value={65} size="hero" label="Storage" unit="%" status="default" style={{ marginBottom: 'var(--space-xl)' }} />
            <ProgressBar value={78} size="standard" label="Memory" unit="%" status="warning" style={{ marginBottom: 'var(--space-xl)' }} />
            <ProgressBar value={95} size="compact" label="CPU" unit="%" status="overlimit" />
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
            <Select
              style={{ maxWidth: '300px' }}
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

          <section style={{ ...gridSectionStyle, marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>States</h2>
            <LoadingState progress={65} label="Syncing" />
            <ErrorState headline="Connection Lost" message="Unable to reach the server." onRetry={() => {}} />
            <EmptyState headline="No Devices" description="Pair a device to get started." />
            <DisabledState headline="Feature Locked" description="Requires premium plan." />
          </section>
        </CategorySection>

        <CategorySection id="widgets" title="Widgets">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Clocks</h2>
            <Clock type="digital" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Clock type="gauge" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Battery</h2>
            <Battery />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Calendar</h2>
            <Calendar type="compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Calendar type="full" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>System Monitor</h2>
            <SystemMonitor />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Music Player</h2>
            <MusicPlayer style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Photo Carousel</h2>
            <PhotoCarousel />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Caffeinate</h2>
            <Caffeinate style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Clipboard</h2>
            <Clipboard style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Pomodoro</h2>
            <Pomodoro style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Walkie Talkie</h2>
            <WalkieTalkie style={{ maxWidth: '300px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sun Dial</h2>
            <SunDial style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Age Motion</h2>
            <AgeMotion style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Chrono</h2>
            <Chrono style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Spinner</h2>
            <Spinner items={spinnerItems} style={{ maxWidth: '400px', margin: '0 auto' }} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setSpinnerItems(prev => [...prev.slice(1), prev[0]])}>Rotate Items</Button>
              <Button variant="ghost" size="sm" onClick={() => setSpinnerItems(['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY'])}>Reset</Button>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>World Clock</h2>
            <WorldClock cities={worldClockCities} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setWorldClockCities(prev => [...prev, { name: 'SHANGHAI', offset: 8 }])}>Add Shanghai</Button>
              <Button variant="ghost" size="sm" onClick={() => setWorldClockCities(prev => prev.length > 1 ? prev.slice(0, -1) : prev)}>Remove Last</Button>
            </div>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Quick Toggles</h2>
            <QuickToggle variant="circle" theme="light" label="Active" active style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label="Torch" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>} />
            <QuickToggle variant="circle" theme="accent" label="DND" active style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label="Rotate" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="Hotspot" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="Bluetooth" active style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="pill" theme="light" label="Mobile Data" active style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="NFC" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Widget Icons</h2>
            <WidgetIcon theme="dark" size="sm" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <WidgetIcon theme="light" size="md" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} label="Favorite" />
            <WidgetIcon theme="accent" size="lg" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 1C8.13 1 5 4.13 5 8C5 12.17 8.87 16.24 12 23C15.13 16.24 19 12.17 19 8C19 4.13 15.87 1 12 1Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <WidgetIcon theme="error" size="md" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Widget Pills</h2>
            <WidgetPill theme="light" label="Mobile Data" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <WidgetPill theme="dark" label="Bluetooth" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>} />
            <WidgetPill theme="accent" label="Calculator" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="18" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
            <WidgetPill theme="error" label="Battery Saver" style={{ display: 'inline-flex' }} icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="17" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Glyph Icons</h2>
            <Glyph type="check" theme="light" size="sm" style={{ display: 'inline-flex' }} />
            <Glyph type="heart" theme="dark" size="md" style={{ display: 'inline-flex' }} />
            <Glyph type="play" theme="accent" size="md" style={{ display: 'inline-flex' }} />
            <Glyph type="wifi" theme="light" size="lg" style={{ display: 'inline-flex' }} />
            <Glyph type="sun" theme="dark" size="md" style={{ display: 'inline-flex' }} />
            <Glyph type="moon" theme="light" size="md" style={{ display: 'inline-flex' }} />
            <Glyph type="volume-up" theme="dark" size="sm" style={{ display: 'inline-flex' }} />
            <Glyph type="lock" theme="accent" size="md" style={{ display: 'inline-flex' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Steps Widget</h2>
            <StepsWidget steps={5543} streak={3} streakUnit="DAYS" card style={{ display: 'inline-flex' }} />
            <StepsWidget steps={5543} streak={3} streakUnit="DAYS" card={{ theme: 'light', title: 'Steps', value: '5,543', subtitle: 'GOAL: 10,000', icon: <Glyph type="check" theme="light" size="sm" /> }} style={{ display: 'inline-flex' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Time Widget</h2>
            <TimeWidget variant="over-limit" label="Over Limit" value="40" unit="MIN" card style={{ display: 'inline-flex' }} />
            <TimeWidget variant="date" label="TUESDAY" value="GMT+1" card style={{ display: 'inline-flex' }} />
            <TimeWidget variant="over-limit" label="DND" value="40" unit="MIN" card={{ theme: 'accent', title: 'DND', value: '40', subtitle: 'MIN', icon: <Glyph type="bell" theme="accent" size="sm" />, iconPosition: 'top' }} style={{ display: 'inline-flex' }} />
            <TimeWidget variant="date" label="TIMER" value="16:32" card={{ theme: 'dark', title: 'TIMER', value: '16:32', icon: <Glyph type="clock" theme="dark" size="sm" />, iconPosition: 'bottom' }} style={{ display: 'inline-flex' }} />
            <TimeWidget variant="over-limit-accent" label="Over Limit" value="30m" subtitle="16H 32M" card={{ size: 'wide' }} style={{ display: 'inline-flex' }} />
            <TimeWidget variant="over-limit" label="DND" value="40" unit="MIN" card={{ size: 'wide', theme: 'accent', title: 'DND', value: '40', subtitle: 'MIN', icon: <Glyph type="bell" theme="accent" size="sm" />, iconPosition: 'right' }} style={{ display: 'inline-flex' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Compass Widget</h2>
            <CompassWidget heading={45} card />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Weather Widget</h2>
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card style={{ display: 'inline-flex' }} />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card={{ theme: 'dark', title: 'WEATHER', value: '30°', subtitle: 'PARTLY CLOUDY', icon: <Glyph type="sun" theme="dark" size="sm" />, iconPosition: 'top' }} style={{ display: 'inline-flex' }} />
            <WeatherWidget variant="wide" temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" forecast={[
              { day: 'MON', hi: '32°', lo: '18°' },
              { day: 'TUE', hi: '28°', lo: '15°' },
              { day: 'WED', hi: '33°', lo: '20°' },
              { day: 'THU', hi: '30°', lo: '17°' },
              { day: 'FRI', hi: '27°', lo: '14°' }
            ]} card={{ size: 'wide' }} />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card={{ size: 'wide', theme: 'dark', title: 'WEATHER', value: '30°', subtitle: 'PARTLY CLOUDY', icon: <Glyph type="sun" theme="dark" size="sm" />, iconPosition: 'left' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Activity Widget</h2>
            <ActivityWidget days={[
              { label: 'SUN', value: '9H26', markers: [1, 0, 1] },
              { label: 'MON', value: '9H14', markers: [1, 1, 0] },
              { label: 'TUE', value: '8H52', markers: [0, 1, 1] },
              { label: 'WED', value: '7H30', markers: [1, 0, 0] },
              { label: 'THU', value: '10H05', markers: [1, 1, 1] },
              { label: 'FRI', value: '6H48', markers: [0, 0, 1] },
              { label: 'SAT', value: '5H15', markers: [0, 1, 0] }
            ]} card={{ size: 'wide' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Dot Matrix</h2>
            <DotMatrix rows={5} cols={5} dotSize="md" theme="light" style={{ display: 'inline-flex' }} />
            <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" pattern="glyph" style={{ display: 'inline-flex' }} />
            <DotMatrix rows={10} cols={10} dotSize="sm" theme="dark" style={{ display: 'inline-flex' }} activeDots={[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[0,9],[1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0]]} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Quick Settings Icons</h2>
            <Home style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DarkMode style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Remote style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Subtitle style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Wallet style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Location style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DarkMode1 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Connectivity Icons</h2>
            <NoSignam style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DownArrow style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DoNotDisturb style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><QrCode style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Storage style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Share style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><NoConnection style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — System Icons</h2>
            <Record style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><FullNetwork style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Shield style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Glyphs style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Aeroplane style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Chart style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Video style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Media & Device Icons</h2>
            <Temp style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><AutoRotate style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Info style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><MicOff style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><NoSim style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Watch style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Record1 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Utility Icons</h2>
            <AccessCamera style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Dots style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Filter style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Home1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Cast style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DoNotDisturb1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><ArrowDown style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — More Icons</h2>
            <QrCode1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Subtitle1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Scan style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Cast1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><BatteryPlus style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Light Pills</h2>
            <Dim style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Dim1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Calculator style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><BatterySaver style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Dark Pills</h2>
            <HomeControls style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Nfc style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Bedtime style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DarkMode2 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Accent Pills</h2>
            <FigmaWeather style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Remote1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Share1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Hotspot style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — More Pills</h2>
            <Share2 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Dim2 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DataSaver style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Torch style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Share3 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Circular Widgets</h2>
            <Record2 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><LocationAccess style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><WatchAnalog style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><FigmaCompass style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><TempControl style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><AutoRotate1 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Active Widgets</h2>
            <Active style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Watch1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Active1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Recording style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Glyphs1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><LocationAccess1 style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Glyph Widgets</h2>
            <Glyphs2 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Campus style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Location1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Flash style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Weather1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><MicAccess style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Pair & Limit Widgets</h2>
            <PairNewDevice style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Overlimit style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><FigmaMusicPlayer style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><TotalTime style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Counter Widgets</h2>
            <StepsCounter style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><OverLimit1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><LoadingBar1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><FigmaCard style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Card Widgets</h2>
            <Card1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Dots3 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Play style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><NothingEar style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Date & Music Widgets</h2>
            <Card2 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><FigmaDate style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Date1 style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Counter style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Device Widgets</h2>
            <Music style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Device style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><Mode style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><DoubleDown style={{ display: 'inline-flex', marginRight: 'var(--widget-gap)', marginBottom: 'var(--widget-gap)' }} /><SelectDevice style={{ display: 'inline-flex', marginBottom: 'var(--widget-gap)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Wide Activity Widget</h2>
            <Card3 style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Wide Tracker Widget</h2>
            <ActivityTracker style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Wide Time Widget</h2>
            <FigmaTime style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Wide Weather Widget</h2>
            <Weather2 style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }} />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Wide Wedget</h2>
            <Wedget style={{ background: 'var(--widget-bg)', padding: '24px', borderRadius: '24px', overflow: 'auto' }} />
          </section>
        </CategorySection>

        <CategorySection id="ui-primitives" title="UI Primitives">
          <h3 style={{ ...demoTitleStyle, fontSize: 'var(--caption)', color: 'var(--text-primary)', marginTop: 0 }}>Core Interaction</h3>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Accordion</h2>
            <Accordion
              type="single"
              style={{ maxWidth: '500px' }}
              items={[
                { id: '1', title: 'What is Nothing UI?', content: 'A design system built with purposeful restraint and technical precision.' },
                { id: '2', title: 'How do I install it?', content: 'Install via npm: npm install nothing-ui-kit' },
                { id: '3', title: 'Is it accessible?', content: 'Yes, all components follow WAI-ARIA guidelines with full keyboard navigation.' }
              ]}
            />
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
            <Checkbox label="Unchecked" style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Checkbox label="Checked" defaultChecked style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Checkbox label="Indeterminate" checked="indeterminate" style={{ display: 'block' }} />
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
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              label="Volume"
              showValue
              style={{ maxWidth: '400px' }}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Tabs</h2>
            <Tabs
              style={{ maxWidth: '500px' }}
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
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Tooltip</h2>
            <Tooltip content="This is a tooltip" side="top">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Textarea</h2>
            <Textarea label="Description" placeholder="Type your message..." autoResize minRows={3} style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Label</h2>
            <Label style={{ display: 'block', marginBottom: 'var(--space-md)' }}>Normal Label</Label>
            <Label required style={{ display: 'block', marginBottom: 'var(--space-md)' }}>Required Label</Label>
            <Label disabled style={{ display: 'block' }}>Disabled Label</Label>
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
            <Badge variant="default" style={{ display: 'inline-flex', marginRight: 'var(--space-md)' }}>Default</Badge>
            <Badge variant="secondary" style={{ display: 'inline-flex', marginRight: 'var(--space-md)' }}>Secondary</Badge>
            <Badge variant="destructive" style={{ display: 'inline-flex', marginRight: 'var(--space-md)' }}>Destructive</Badge>
            <Badge variant="outline" style={{ display: 'inline-flex' }}>Outline</Badge>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Avatar</h2>
            <Avatar size="sm" fallback="SM" style={{ display: 'inline-flex', marginRight: 'var(--space-md)' }} />
            <Avatar size="md" fallback="MD" style={{ display: 'inline-flex', marginRight: 'var(--space-md)' }} />
            <Avatar size="lg" fallback="LG" style={{ display: 'inline-flex' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Separator</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', height: '40px' }}>
              <span style={{ fontSize: 'var(--body)' }}>Left</span>
              <Separator orientation="vertical" decorative />
              <span style={{ fontSize: 'var(--body)' }}>Right</span>
            </div>
            <Separator orientation="horizontal" decorative style={{ marginTop: 'var(--space-md)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Skeleton</h2>
            <Skeleton variant="text" width="200px" height="16px" style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Skeleton variant="circular" width="48px" height="48px" style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Skeleton variant="rectangular" width="100%" height="80px" style={{ display: 'block' }} />
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
            <Alert title="Heads up!" variant="default" style={{ maxWidth: '500px', marginBottom: 'var(--space-md)' }}>
              You can add components to your app using the CLI.
            </Alert>
            <Alert title="Error" variant="destructive" style={{ maxWidth: '500px' }}>
              Your session has expired. Please log in again.
            </Alert>
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
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim</div>
            <ProgressBar value={65} variant="slim" style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim — Good</div>
            <ProgressBar value={80} variant="slim" status="good" style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Indeterminate</div>
            <ProgressBar value={0} indeterminate style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Slim Indeterminate</div>
            <ProgressBar value={0} variant="slim" indeterminate />
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
            <Select
              label="Choose a fruit"
              placeholder="Select..."
              searchable
              value={selectValue}
              onValueChange={setSelectValue}
              style={{ maxWidth: '300px' }}
              options={[
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' },
                { value: 'cherry', label: 'Cherry' },
                { value: 'date', label: 'Date' },
                { value: 'elderberry', label: 'Elderberry' }
              ]}
            />
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
              <Switch label="Dark Mode" on={theme === 'dark'} style={{ display: 'block', marginBottom: 'var(--space-lg)' }} />
              <Switch label="Notifications" on={true} style={{ display: 'block', marginBottom: 'var(--space-lg)' }} />
              <Switch label="Auto-update" style={{ display: 'block' }} />
            </Sheet>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Toggle / Toggle Group</h2>
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>Single Toggle</div>
            <Toggle style={{ marginBottom: 'var(--space-lg)' }}>Toggle</Toggle>
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
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Sonner (Toast)</h2>
            <Button variant="secondary" size="sm" onClick={() => addToast('default')} style={{ display: 'inline-flex', marginRight: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>Default</Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('success')} style={{ display: 'inline-flex', marginRight: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>Success</Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('error')} style={{ display: 'inline-flex', marginRight: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>Error</Button>
            <Button variant="secondary" size="sm" onClick={() => addToast('warning')} style={{ display: 'inline-flex', marginBottom: 'var(--space-sm)' }}>Warning</Button>
            <Sonner toasts={toasts} onDismiss={dismissToast} position="top-right" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Collapsible</h2>
            <Collapsible trigger="Show Details" style={{ maxWidth: '500px' }}>
              <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)', color: 'var(--text-secondary)' }}>
                These are the hidden details that can be expanded or collapsed by clicking the trigger above.
              </div>
            </Collapsible>
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
            <Command
              open={commandOpen}
              onOpenChange={setCommandOpen}
              style={{ maxWidth: '500px' }}
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
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Form</h2>
            <Form onSubmit={() => addToast('success')} style={{ maxWidth: '400px' }}>
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
            <Sidebar
              style={{ maxWidth: '240px' }}
              items={[
                  { label: 'Dashboard', active: true, icon: <span>◉</span> },
                  { label: 'Analytics', icon: <span>◎</span>, badge: 3 },
                  { label: 'Reports', icon: <span>◈</span> },
                  { label: 'Settings', icon: <span>⚙</span> },
                  { label: 'Help', icon: <span>?⃝</span> }
                ]}
                header={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--label)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nothing UI</span>}
              />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Aspect Ratio</h2>
            <AspectRatio ratio={16 / 9} style={{ maxWidth: '500px' }}>
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
          </section>
        </CategorySection>
      </div>
    </main>
  )
}

export default App
