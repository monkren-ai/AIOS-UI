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
import { Card, WidgetCard } from './components/Card'
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
import AnalogClockWidget from './components/widgets/AnalogClockWidget'
import DigitalClockLargeWidget from './components/widgets/DigitalClockLargeWidget'
import PhotoFrameWidget from './components/widgets/PhotoFrameWidget'
import { Home, DarkMode, Remote, Subtitle, Wallet, Location, DarkModeLight, NoSignam, DownArrow, DoNotDisturb, QrCode, Storage, Share, NoConnection, Record, FullNetwork, Shield, Glyphs, Aeroplane, Chart, Video, Temp, AutoRotate, Info, MicOff, NoSim, Watch, RecordAlt, AccessCamera, Dots, Filter, HomeLight, Cast, DoNotDisturbLight, ArrowDownAlt, QrCodeLight, SubtitleLight, Scan, CastAlt, BatteryPlus } from './components/widgets/WidgetIcons'
import { MobileData, BatteryShare, Calculator, BatterySaver, HomeControls, Nfc, Bedtime, DarkModePill, Weather as FigmaWeather, TvRemote, Storage as FigmaStorage, Hotspot, NearbyShare, ExtraDim, DataSaver, Torch, Bluetooth } from './components/widgets/WidgetPills'
import { Record2, LocationAccess, WatchAnalog, Compass as FigmaCompass, TempControl, AutoRotate1, Active, Watch1, Active1, Recording, Glyphs1, LocationAccess1, Glyphs2, Campus, Location1, Flash, Weather1, MicAccess, PairNewDevice, Overlimit, MusicPlayer as FigmaMusicPlayer, TotalTime, StepsCounter, OverLimit1, LoadingBar1, Card as FigmaCard, Dots3, Play, NothingEar, Card2, Date as FigmaDate, Counter, Music, Device, Mode, DoubleDown, SelectDevice, Card3, ActivityTracker, Time as FigmaTime, Weather2, Wedget } from './components/widgets/WidgetSubComponents'
import { Card1 } from './components/widgets/sub/Card'
import { Date1 } from './components/widgets/sub/Date'
import SvgIcon from './components/widgets/SvgIcon'
import WidgetPill from './components/widgets/WidgetPill'
import Glyph from './components/widgets/Glyph'
import Accordion from './components/Accordion'
import Checkbox from './components/Checkbox'
import RadioGroup from './components/RadioGroup'

import { Tabs, TabPanel } from './components/Tabs'
import Tooltip from './components/Tooltip'
import Textarea from './components/Textarea'
import Label from './components/Label'
import Table from './components/Table'
import Badge from './components/Badge'
import Avatar from './components/Avatar'
import Separator from './components/Separator'
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
import Collapsible from './components/Collapsible'
import Resizable from './components/Resizable'

import Form from './components/Form'
import InputOTP from './components/InputOTP'
import NavigationMenu from './components/NavigationMenu'

import Sidebar from './components/Sidebar'
import AspectRatio from './components/AspectRatio'
import Taskbar from './components/Taskbar'
import NextEvent from './components/NextEvent'
import Quotes from './components/Quotes'
import WidgetGrid from './components/WidgetGrid'
import Command from './components/Command'
import Slider from './components/Slider'
import DateWidget from './components/Date'
import './styles/buttons.css'
import './styles/inputs.css'
import './styles/segmented-control.css'
import './styles/navigation.css'
import './styles/card.css'
import './styles/data-rows.css'
import './styles/data-grid.css'
import './styles/progress-bar.css'
import './styles/modal.css'
import './styles/date-nav.css'
import './styles/caffeinate.css'
import './styles/clipboard.css'
import './styles/pomodoro.css'
import './styles/age-motion.css'
import './styles/chrono.css'
import './styles/quick-toggle.css'
import './styles/accordion.css'
import './styles/checkbox.css'
import './styles/radio-group.css'
import './styles/label.css'
import './styles/badge.css'
import './styles/avatar.css'
import './styles/breadcrumb.css'
import './styles/pagination.css'
import './styles/alert.css'
import './styles/scroll-area.css'
import './styles/popover.css'
import './styles/hover-card.css'
import './styles/context-menu.css'
import './styles/dropdown-menu.css'
import './styles/select.css'
import './styles/collapsible.css'
import './styles/resizable.css'
import './styles/form.css'
import './styles/input-otp.css'
import './styles/navigation-menu.css'

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
  alignItems: 'flex-start'
}

const gridSectionStyle: React.CSSProperties = {
  marginBottom: 'var(--space-3xl)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'var(--space-md)'
}

const figmaWidgetWrapStyle: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  flexShrink: 0
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
  { id: 'navigation', label: 'Navigation' },
  { id: 'menus-selection', label: 'Menus & Selection' },
  { id: 'states', label: 'States' },
  { id: 'utility', label: 'Utility' },
  { id: 'clock-calendar', label: 'Clock & Calendar' },
  { id: 'system-monitoring', label: 'System & Monitoring' },
  { id: 'utility-tools', label: 'Utility Tools' },
  { id: 'time-progress', label: 'Time & Progress' },
  { id: 'visual-display', label: 'Visual Display' },
  { id: 'feature-widgets', label: 'Feature Widgets' },
  { id: 'widget-layout', label: 'Widget Layout' },
  { id: 'widget-ui', label: 'Widget UI' },
  { id: 'figma-20-library', label: 'Figma 2.0 Library' }
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
  const [radioValue, setRadioValue] = useState('option1')
  const [paginationPage, setPaginationPage] = useState(5)
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>(['bold'])
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description?: string; variant?: 'default' | 'success' | 'error' | 'warning' }>>([])
  const [otpValue, setOtpValue] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(65)

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

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Slider</h2>
            <Slider value={sliderValue} onValueChange={setSliderValue} label="Volume" showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Slider defaultValue={30} label="Brightness" showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Slider disabled label="Disabled" style={{ maxWidth: '400px' }} />
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

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Badge</h2>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Avatar</h2>
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
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
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--caption)' }}>Component not yet implemented</p>
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

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Sonner (Toast)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--caption)' }}>Component not yet implemented</p>
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

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Command Palette</h2>
            <Button variant="primary" onClick={() => setCommandOpen(true)}>Open Command Palette</Button>
            <Command
              open={commandOpen}
              onOpenChange={setCommandOpen}
              groups={[
                { heading: 'Actions', items: [
                  { id: '1', label: 'New File', shortcut: '⌘N', onSelect: () => {} },
                  { id: '2', label: 'Open File', shortcut: '⌘O', onSelect: () => {} },
                  { id: '3', label: 'Save', shortcut: '⌘S', onSelect: () => {} }
                ]},
                { heading: 'Navigation', items: [
                  { id: '4', label: 'Go to Home', onSelect: () => {} },
                  { id: '5', label: 'Go to Settings', onSelect: () => {} },
                  { id: '6', label: 'Go to Profile', onSelect: () => {} }
                ]}
              ]}
            />
          </section>
        </CategorySection>

        <CategorySection id="navigation" title="Navigation">
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

          <section style={{ marginBottom: 0 }}>
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
        </CategorySection>

        <CategorySection id="menus-selection" title="Menus & Selection">
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

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Collapsible</h2>
            <Collapsible trigger="Show Details" style={{ maxWidth: '500px' }}>
              <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)', color: 'var(--text-secondary)' }}>
                These are the hidden details that can be expanded or collapsed by clicking the trigger above.
              </div>
            </Collapsible>
          </section>
        </CategorySection>

        <CategorySection id="states" title="States">
          <section style={{ ...gridSectionStyle, marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>States</h2>
            <LoadingState progress={65} label="Syncing" />
            <ErrorState headline="Connection Lost" message="Unable to reach the server." onRetry={() => {}} />
            <EmptyState headline="No Devices" description="Pair a device to get started." />
            <DisabledState headline="Feature Locked" description="Requires premium plan." />
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

          <section style={{ marginBottom: 0 }}>
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
        </CategorySection>

        <CategorySection id="utility" title="Utility">
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

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Input OTP</h2>
            <InputOTP length={6} value={otpValue} onValueChange={setOtpValue} />
          </section>
        </CategorySection>

        <CategorySection id="clock-calendar" title="Clock & Calendar">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Clock</h2>
            <Clock type="digital" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Clock type="gauge" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Calendar</h2>
            <Calendar type="compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Calendar type="full" />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>World Clock</h2>
            <WorldClock cities={worldClockCities} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setWorldClockCities(prev => [...prev, { name: 'SHANGHAI', offset: 8 }])}>Add Shanghai</Button>
              <Button variant="ghost" size="sm" onClick={() => setWorldClockCities(prev => prev.length > 1 ? prev.slice(0, -1) : prev)}>Remove Last</Button>
            </div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Date Widget</h2>
            <DateWidget type="rect" theme="light" />
            <DateWidget type="rect" theme="dark" />
            <DateWidget type="dual-ring" theme="light" />
            <DateWidget type="dual-ring" theme="dark" />
          </section>
        </CategorySection>

        <CategorySection id="system-monitoring" title="System & Monitoring">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Battery</h2>
            <Battery />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>System Monitor</h2>
            <SystemMonitor />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Quick Toggle</h2>
            <QuickToggle variant="circle" theme="light" label="Active" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label="Torch" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>} />
            <QuickToggle variant="circle" theme="accent" label="DND" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label="Rotate" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="Hotspot" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="Bluetooth" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="pill" theme="light" label="Mobile Data" active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label="NFC" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
          </section>
        </CategorySection>

        <CategorySection id="utility-tools" title="Utility Tools">
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

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Taskbar</h2>
            <Taskbar />
          </section>
        </CategorySection>

        <CategorySection id="time-progress" title="Time & Progress">
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

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Next Event</h2>
            <NextEvent />
          </section>
        </CategorySection>

        <CategorySection id="visual-display" title="Visual Display">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Dot Matrix</h2>
            <DotMatrix rows={5} cols={5} dotSize="md" theme="light" />
            <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" pattern="glyph" />
            <DotMatrix rows={10} cols={10} dotSize="sm" theme="dark" activeDots={[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[0,9],[1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0]]} />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Quotes</h2>
            <Quotes />
          </section>
        </CategorySection>

        <CategorySection id="feature-widgets" title="Feature Widgets">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Weather Widget</h2>
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="Partly cloudy" card={{ theme: 'dark', title: 'WEATHER', value: '30°', subtitle: 'PARTLY CLOUDY', icon: <Glyph type="sun" theme="dark" size="sm" />, iconPosition: 'top' }} />
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
            <h2 style={demoTitleStyle}>Analog Clock Widget</h2>
            <AnalogClockWidget variant="swiss" card />
            <AnalogClockWidget variant="minimalist" card />
            <AnalogClockWidget variant="swiss" smoothSeconds card={{ theme: 'light' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Digital Clock Large Widget</h2>
            <DigitalClockLargeWidget variant="sharp" card />
            <DigitalClockLargeWidget variant="serif" card />
            <DigitalClockLargeWidget variant="sharp" showSeconds card={{ theme: 'light' }} />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Weather Widget — Circular & Grid</h2>
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="partly_cloudy" variant="circular" card />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="thunderstorm" variant="circular" card={{ theme: 'light' }} />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="snowy" variant="circular" card />
            <WeatherWidget temp="30°" hi="35°" lo="16°" city="Toronto" condition="sunny" variant="grid" forecast={[
              { day: 'MON', hi: '32°', lo: '18°', condition: 'sunny' },
              { day: 'TUE', hi: '28°', lo: '15°', condition: 'cloudy' },
              { day: 'WED', hi: '25°', lo: '12°', condition: 'rainy' }
            ]} card />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Battery Widget Mode</h2>
            <Battery variant="segmented" percent={75} widgetMode="card" devices={[
              { name: 'Nothing Ear', type: 'earbuds', percent: 60 },
              { name: 'MX Master 3', type: 'mouse', percent: 45, isCharging: true }
            ]} />
            <Battery variant="ring" percent={45} widgetMode="ring" />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Date Widget — Serif</h2>
            <DateWidget type="serif" />
            <DateWidget type="serif" showPeel theme="light" />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Music Player — Compact</h2>
            <MusicPlayer variant="compact" showRecordingIndicator />
            <MusicPlayer variant="default" showRecordingIndicator />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Photo Frame Widget</h2>
            <PhotoFrameWidget variant="square" src="https://picsum.photos/300/300" alt="Sample photo" card />
            <PhotoFrameWidget variant="pill" src="https://picsum.photos/200/400" alt="Sample photo" card />
            <PhotoFrameWidget variant="square" images={[
              { src: 'https://picsum.photos/300/300?1', alt: 'Photo 1' },
              { src: 'https://picsum.photos/300/300?2', alt: 'Photo 2' },
              { src: 'https://picsum.photos/300/300?3', alt: 'Photo 3' }
            ]} card />
          </section>

        </CategorySection>

        <CategorySection id="widget-layout" title="Widget Layout">
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>Widget Card</h2>
            <WidgetCard />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Widget Grid</h2>
            <WidgetGrid />
          </section>
        </CategorySection>

        <CategorySection id="widget-ui" title="Widget UI">
          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Widget Icons</h2>
            <SvgIcon theme="dark" size="sm"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></SvgIcon>
            <SvgIcon theme="light" size="md" label="Favorite"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></SvgIcon>
            <SvgIcon theme="accent" size="lg"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 1C8.13 1 5 4.13 5 8C5 12.17 8.87 16.24 12 23C15.13 16.24 19 12.17 19 8C19 4.13 15.87 1 12 1Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></SvgIcon>
            <SvgIcon theme="error" size="md"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></SvgIcon>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Widget Pills</h2>
            <WidgetPill theme="light" label="Mobile Data" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <WidgetPill theme="dark" label="Bluetooth" icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>} />
            <WidgetPill theme="accent" label="Calculator" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="14" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="18" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
            <WidgetPill theme="error" label="Battery Saver" icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="17" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="17" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>} />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>Glyph Icons</h2>
            <Glyph type="check" theme="light" size="sm" />
            <Glyph type="heart" theme="dark" size="md" />
            <Glyph type="play" theme="accent" size="md" />
            <Glyph type="wifi" theme="light" size="lg" />
            <Glyph type="sun" theme="dark" size="md" />
            <Glyph type="moon" theme="light" size="md" />
            <Glyph type="volume-up" theme="dark" size="sm" />
            <Glyph type="lock" theme="accent" size="md" />
          </section>
        </CategorySection>

        <CategorySection id="figma-20-library" title="Figma 2.0 Library">
          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Quick Settings Icons</h2>
            <div style={figmaWidgetWrapStyle}><Home /></div><div style={figmaWidgetWrapStyle}><DarkMode /></div><div style={figmaWidgetWrapStyle}><Remote /></div><div style={figmaWidgetWrapStyle}><Subtitle /></div><div style={figmaWidgetWrapStyle}><Wallet /></div><div style={figmaWidgetWrapStyle}><Location /></div><div style={figmaWidgetWrapStyle}><DarkModeLight /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Connectivity Icons</h2>
            <div style={figmaWidgetWrapStyle}><NoSignam /></div><div style={figmaWidgetWrapStyle}><DownArrow /></div><div style={figmaWidgetWrapStyle}><DoNotDisturb /></div><div style={figmaWidgetWrapStyle}><QrCode /></div><div style={figmaWidgetWrapStyle}><Storage /></div><div style={figmaWidgetWrapStyle}><Share /></div><div style={figmaWidgetWrapStyle}><NoConnection /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — System Icons</h2>
            <div style={figmaWidgetWrapStyle}><Record /></div><div style={figmaWidgetWrapStyle}><FullNetwork /></div><div style={figmaWidgetWrapStyle}><Shield /></div><div style={figmaWidgetWrapStyle}><Glyphs /></div><div style={figmaWidgetWrapStyle}><Aeroplane /></div><div style={figmaWidgetWrapStyle}><Chart /></div><div style={figmaWidgetWrapStyle}><Video /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Media & Device Icons</h2>
            <div style={figmaWidgetWrapStyle}><Temp /></div><div style={figmaWidgetWrapStyle}><AutoRotate /></div><div style={figmaWidgetWrapStyle}><Info /></div><div style={figmaWidgetWrapStyle}><MicOff /></div><div style={figmaWidgetWrapStyle}><NoSim /></div><div style={figmaWidgetWrapStyle}><Watch /></div><div style={figmaWidgetWrapStyle}><RecordAlt /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Utility Icons</h2>
            <div style={figmaWidgetWrapStyle}><AccessCamera /></div><div style={figmaWidgetWrapStyle}><Dots /></div><div style={figmaWidgetWrapStyle}><Filter /></div><div style={figmaWidgetWrapStyle}><HomeLight /></div><div style={figmaWidgetWrapStyle}><Cast /></div><div style={figmaWidgetWrapStyle}><DoNotDisturbLight /></div><div style={figmaWidgetWrapStyle}><ArrowDownAlt /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — More Icons</h2>
            <div style={figmaWidgetWrapStyle}><QrCodeLight /></div><div style={figmaWidgetWrapStyle}><SubtitleLight /></div><div style={figmaWidgetWrapStyle}><Scan /></div><div style={figmaWidgetWrapStyle}><CastAlt /></div><div style={figmaWidgetWrapStyle}><BatteryPlus /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Light Pills</h2>
            <div style={figmaWidgetWrapStyle}><MobileData /></div><div style={figmaWidgetWrapStyle}><BatteryShare /></div><div style={figmaWidgetWrapStyle}><Calculator /></div><div style={figmaWidgetWrapStyle}><BatterySaver /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Dark Pills</h2>
            <div style={figmaWidgetWrapStyle}><HomeControls /></div><div style={figmaWidgetWrapStyle}><Nfc /></div><div style={figmaWidgetWrapStyle}><Bedtime /></div><div style={figmaWidgetWrapStyle}><DarkModePill /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Accent Pills</h2>
            <div style={figmaWidgetWrapStyle}><FigmaWeather /></div><div style={figmaWidgetWrapStyle}><TvRemote /></div><div style={figmaWidgetWrapStyle}><FigmaStorage /></div><div style={figmaWidgetWrapStyle}><Hotspot /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — More Pills</h2>
            <div style={figmaWidgetWrapStyle}><NearbyShare /></div><div style={figmaWidgetWrapStyle}><ExtraDim /></div><div style={figmaWidgetWrapStyle}><DataSaver /></div><div style={figmaWidgetWrapStyle}><Torch /></div><div style={figmaWidgetWrapStyle}><Bluetooth /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Circular Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Record2 /></div><div style={figmaWidgetWrapStyle}><LocationAccess /></div><div style={figmaWidgetWrapStyle}><WatchAnalog /></div><div style={figmaWidgetWrapStyle}><FigmaCompass /></div><div style={figmaWidgetWrapStyle}><TempControl /></div><div style={figmaWidgetWrapStyle}><AutoRotate1 /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Location Widgets</h2>
            <div style={figmaWidgetWrapStyle}><LocationAccess /></div><div style={figmaWidgetWrapStyle}><LocationAccess1 /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Watch Widgets</h2>
            <div style={figmaWidgetWrapStyle}><WatchAnalog /></div><div style={figmaWidgetWrapStyle}><Watch /></div><div style={figmaWidgetWrapStyle}><Watch1 /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Active Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Active /></div><div style={figmaWidgetWrapStyle}><Watch1 /></div><div style={figmaWidgetWrapStyle}><Active1 /></div><div style={figmaWidgetWrapStyle}><Recording /></div><div style={figmaWidgetWrapStyle}><Glyphs1 /></div><div style={figmaWidgetWrapStyle}><LocationAccess1 /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Glyph Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Glyphs2 /></div><div style={figmaWidgetWrapStyle}><Campus /></div><div style={figmaWidgetWrapStyle}><Location1 /></div><div style={figmaWidgetWrapStyle}><Flash /></div><div style={figmaWidgetWrapStyle}><Weather1 /></div><div style={figmaWidgetWrapStyle}><MicAccess /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Pair & Limit Widgets</h2>
            <div style={figmaWidgetWrapStyle}><PairNewDevice /></div><div style={figmaWidgetWrapStyle}><Overlimit /></div><div style={figmaWidgetWrapStyle}><FigmaMusicPlayer /></div><div style={figmaWidgetWrapStyle}><TotalTime /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Counter Widgets</h2>
            <div style={figmaWidgetWrapStyle}><StepsCounter /></div><div style={figmaWidgetWrapStyle}><OverLimit1 /></div><div style={figmaWidgetWrapStyle}><LoadingBar1 /></div><div style={figmaWidgetWrapStyle}><FigmaCard /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Card Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Card1 /></div><div style={figmaWidgetWrapStyle}><Dots3 /></div><div style={figmaWidgetWrapStyle}><Play /></div><div style={figmaWidgetWrapStyle}><NothingEar /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Date & Music Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Card2 /></div><div style={figmaWidgetWrapStyle}><FigmaDate /></div><div style={figmaWidgetWrapStyle}><Date1 /></div><div style={figmaWidgetWrapStyle}><Counter /></div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>Figma 2.0 — Device Widgets</h2>
            <div style={figmaWidgetWrapStyle}><Music /></div><div style={figmaWidgetWrapStyle}><Device /></div><div style={figmaWidgetWrapStyle}><Mode /></div><div style={figmaWidgetWrapStyle}><DoubleDown /></div><div style={figmaWidgetWrapStyle}><SelectDevice /></div>
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
      </div>
    </main>
  )
}

export default App
