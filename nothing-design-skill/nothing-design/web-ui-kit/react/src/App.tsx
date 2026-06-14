import { useState, useEffect, lazy, Suspense } from 'react'
import Time from '@/components/widgets/Time'
import Battery from '@/components/Battery'
import Calendar from '@/components/Calendar'
import SystemMonitor from '@/components/SystemMonitor'
import MusicPlayer from '@/components/MusicPlayer'
import PhotoCarousel from '@/components/PhotoCarousel'
import Button from '@/components/Buttons'
import Input from '@/components/Inputs'
import Switch from '@/components/Switch'
import { Tag, Tags } from '@/components/Tags'
import SegmentedControl from '@/components/SegmentedControl'
import Navigation from '@/components/Navigation'
import { Card, WidgetCard } from '@/components/Card'
import { DataTable } from '@/ui/DataTable'
import ProgressBar from '@/components/ProgressBar'
import Modal from '@/components/Modal'
import DateNav from '@/components/DateNav'
import { LoadingState, ErrorState, EmptyState, DisabledState } from '@/components/States'
import Caffeinate from '@/components/Caffeinate'
import Clipboard from '@/components/Clipboard'
import Pomodoro from '@/components/Pomodoro'
import WalkieTalkie from '@/components/WalkieTalkie'
import SunDial from '@/components/SunDial'
import AgeMotion from '@/components/AgeMotion'
import Chrono from '@/components/Chrono'
import Spinner from '@/components/Spinner'
import DotMatrix from '@/components/DotMatrix'
import QuickToggle from '@/components/QuickToggle'
import WeatherWidget from '@/components/widgets/WeatherWidget'
import PhotoFrameWidget from '@/components/widgets/PhotoFrameWidget'
import SvgIcon from '@/components/widgets/SvgIcon'
import WidgetPill from '@/components/widgets/WidgetPill'
import Glyph from '@/components/widgets/Glyph'
import Accordion from '@/components/Accordion'
import Checkbox from '@/components/Checkbox'
import RadioGroup from '@/components/RadioGroup'

import { Tabs, TabPanel } from '@/components/Tabs'
import Tooltip from '@/components/Tooltip'
import Textarea from '@/components/Textarea'
import Label from '@/components/Label'
import Badge from '@/components/Badge'
import Avatar from '@/components/Avatar'
import Separator from '@/components/Separator'
import Breadcrumb from '@/components/Breadcrumb'
import Pagination from '@/components/Pagination'
import Alert from '@/components/Alert'
import ScrollArea from '@/components/ScrollArea'
import Popover from '@/components/Popover'
import HoverCard from '@/components/HoverCard'
import ContextMenu from '@/components/ContextMenu'
import DropdownMenu from '@/components/DropdownMenu'
import Select from '@/components/Select'
import Sheet from '@/components/Sheet'
import { Toggle, ToggleGroup } from '@/components/Toggle'
import Collapsible from '@/components/Collapsible'
import Resizable from '@/components/Resizable'

import Form from '@/components/Form'
import InputOTP from '@/components/InputOTP'
import NavigationMenu from '@/components/NavigationMenu'

import Sidebar from '@/components/Sidebar'
import AspectRatio from '@/components/AspectRatio'
import Taskbar from '@/components/Taskbar'
import NextEvent from '@/components/NextEvent'
import Quotes from '@/components/Quotes'
import WidgetGrid from '@/components/WidgetGrid'
import Command from '@/components/Command'
import Slider from '@/components/Slider'
import DateWidget from '@/components/Date'
import '@/styles/buttons.css'
import '@/styles/inputs.css'
import '@/styles/segmented-control.css'
import '@/styles/navigation.css'
import '@/styles/card.css'
import '@/styles/data-rows.css'
import '@/styles/data-grid.css'
import '@/styles/progress-bar.css'
import '@/styles/modal.css'
import '@/styles/date-nav.css'
import '@/styles/caffeinate.css'
import '@/styles/clipboard.css'
import '@/styles/pomodoro.css'
import '@/styles/age-motion.css'
import '@/styles/chrono.css'
import '@/styles/quick-toggle.css'
import '@/styles/accordion.css'
import '@/styles/checkbox.css'
import '@/styles/radio-group.css'
import '@/styles/label.css'
import '@/styles/badge.css'
import '@/styles/avatar.css'
import '@/styles/breadcrumb.css'
import '@/styles/pagination.css'
import '@/styles/alert.css'
import '@/styles/scroll-area.css'
import '@/styles/popover.css'
import '@/styles/hover-card.css'
import '@/styles/context-menu.css'
import '@/styles/dropdown-menu.css'
import '@/styles/select.css'
import '@/styles/collapsible.css'
import '@/styles/resizable.css'
import '@/styles/form.css'
import '@/styles/input-otp.css'
import '@/styles/navigation-menu.css'

import '@/styles/aspect-ratio.css'
import '@/styles/widgets.css'
import '@/styles/widget-showcase.css'

import { WidgetShowcase } from '@/components/showcase/WidgetShowcase'
import { Figma20Showcase } from '@/components/showcase/Figma20Showcase'

const NullframeSection = lazy(() => import('./sections/NullframeSection'))

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
  { id: 'core-interaction', zh: '核心交互', en: 'Core Interaction' },
  { id: 'data-display', zh: '数据展示', en: 'Data Display' },
  { id: 'overlays', zh: '弹窗与层', en: 'Overlays' },
  { id: 'navigation', zh: '导航', en: 'Navigation' },
  { id: 'menus-selection', zh: '菜单与选择', en: 'Menus & Selection' },
  { id: 'states', zh: '状态', en: 'States' },
  { id: 'utility', zh: '工具', en: 'Utility' },
  { id: 'clock-calendar', zh: '时钟与日历', en: 'Clock & Calendar' },
  { id: 'system-monitoring', zh: '系统与监控', en: 'System & Monitoring' },
  { id: 'utility-tools', zh: '实用工具', en: 'Utility Tools' },
  { id: 'time-progress', zh: '时间与进度', en: 'Time & Progress' },
  { id: 'visual-display', zh: '视觉展示', en: 'Visual Display' },
  { id: 'feature-widgets', zh: '特色组件', en: 'Feature Widgets' },
  { id: 'widget-layout', zh: '组件布局', en: 'Widget Layout' },
  { id: 'figma-20-library', zh: 'Figma 2.0 库', en: 'Figma 2.0 Library' },
  { id: 'nullframe', zh: 'Nullframe 仪表盘', en: 'Nullframe Dashboard' }
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
  const [otpValue, setOtpValue] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(65)
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [forceSim, setForceSim] = useState(false)

  // 同步到 document.documentElement dataset,让 CSS 强制覆盖
  useEffect(() => {
    document.documentElement.setAttribute('data-force-sim', forceSim ? 'true' : 'false')
  }, [forceSim])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }

  const t = (zh: string, en: string): string => (lang === 'zh' ? zh : en)

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

  return (
    <main className="App" style={{
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--black)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      display: 'flex',
      transition: 'background-color var(--duration-transition) var(--easing), color var(--duration-transition) var(--easing)'
    }}>
      <aside
        aria-label="Category navigation"
        style={{
          position: 'sticky',
          top: 0,
          flex: '0 0 220px',
          height: '100vh',
          padding: 'var(--space-lg) var(--space-md)',
          borderRight: '1px solid var(--border-visible)',
          backgroundColor: 'var(--black)',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--caption)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-md)'
        }}>
          {t('分类', 'Categories')}
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {categories.map(cat => (
            <a
              href={`#${cat.id}`}
              key={cat.id}
              style={{
                ...navLinkStyle,
                textAlign: 'left',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {t(cat.zh, cat.en)}
            </a>
          ))}
        </nav>
      </aside>

      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        style={{
          position: 'fixed',
          top: 'var(--space-md)',
          right: 'calc(var(--space-md) + 150px)',
          padding: 'var(--space-sm) var(--space-md)',
          background: 'var(--surface)',
          border: '1px solid var(--border-visible)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--label)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all var(--duration-micro) var(--easing)'
        }}
      >
        {lang === 'zh' ? 'EN' : '中'}
      </button>

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
          zIndex: 10,
          transition: 'all var(--duration-micro) var(--easing)'
        }}
      >
        {t('切换主题', 'Toggle Theme')}
      </button>

      <button
        onClick={() => setForceSim((v) => !v)}
        aria-label={forceSim ? 'Switch to real data' : 'Force simulated data'}
        data-active={forceSim}
        style={{
          position: 'fixed',
          top: 'var(--space-md)',
          right: 'calc(var(--space-md) + 220px)',
          padding: 'var(--space-sm) var(--space-md)',
          background: forceSim ? 'var(--text-display)' : 'var(--surface)',
          color: forceSim ? 'var(--black)' : 'var(--text-primary)',
          border: '1px solid var(--border-visible)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--label)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all var(--duration-micro) var(--easing)'
        }}
      >
        {forceSim ? 'FORCE SIM' : 'REAL'}
      </button>

      <div style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        <section style={sectionStyle}>
          <h2 style={demoTitleStyle}>{t('排版', 'Typography')}</h2>
          <h1 style={{ ...pageHeaderStyle, marginBottom: 'var(--space-lg)' }}>
            Nothing UI
          </h1>
          <h2 style={{ ...groupTitleStyle, marginBottom: 'var(--space-md)' }}>
            {t('设计系统', 'Design System')}
          </h2>
          <p style={{ fontSize: 'var(--body)', marginBottom: 'var(--space-2xl)' }}>
            {t('以克制的设计、技术的精准与独特的视觉语言构建界面。', 'Build interfaces with purposeful restraint, technical precision, and a distinctive visual language.')}
          </p>
        </section>

        <CategorySection id="core-interaction" title={t('核心交互', 'Core Interaction')}>
          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('按钮', 'Buttons')}</h2>
            <Button variant="primary">{t('主要', 'Primary')}</Button>
            <Button variant="secondary">{t('次要', 'Secondary')}</Button>
            <Button variant="ghost">{t('幽灵', 'Ghost')}</Button>
            <Button variant="destructive">{t('危险', 'Destructive')}</Button>
            <Button variant="primary" size="sm">{t('小号', 'Small')}</Button>
            <Button variant="primary" size="lg">{t('大号', 'Large')}</Button>
            <Button variant="primary" disabled>{t('已禁用', 'Disabled')}</Button>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('输入框', 'Inputs')}</h2>
            <Input variant="underline" label={t('下划线输入', 'Underline Input')} placeholder={t('请输入内容…', 'Type something...')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="bordered" label={t('带边框输入', 'Bordered Input')} placeholder={t('请输入内容…', 'Type something...')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="underline" label={t('错误提示', 'With Error')} placeholder={t('输入无效', 'Invalid input')} error={t('该字段为必填项', 'This field is required')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Input variant="bordered" label={t('已禁用', 'Disabled')} placeholder={t('无法编辑', 'Cannot edit')} disabled style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('开关', 'Switch')}</h2>
            <Switch label={t('Wi-Fi', 'Wi-Fi')} style={{ marginBottom: 'var(--space-md)' }} />
            <Switch label={t('蓝牙', 'Bluetooth')} on={true} style={{ marginBottom: 'var(--space-md)' }} />
            <Switch label={t('已禁用', 'Disabled')} disabled />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('滑块', 'Slider')}</h2>
            <Slider value={sliderValue} onValueChange={setSliderValue} label={t('音量', 'Volume')} showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Slider defaultValue={30} label={t('亮度', 'Brightness')} showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
            <Slider disabled label={t('已禁用', 'Disabled')} style={{ maxWidth: '400px' }} />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('标签', 'Tags')}</h2>
            <Tags>
              <Tag variant="pill">{t('设计', 'Design')}</Tag>
              <Tag variant="pill" active>{t('激活', 'Active')}</Tag>
              <Tag variant="pill" removable>{t('可移除', 'Removable')}</Tag>
              <Tag variant="pill" disabled>{t('已禁用', 'Disabled')}</Tag>
            </Tags>
            <Tags>
              <Tag variant="technical">v2.1.0</Tag>
              <Tag variant="technical" active>{t('稳定', 'stable')}</Tag>
              <Tag variant="technical" removable>{t('测试', 'beta')}</Tag>
            </Tags>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('分段控件', 'Segmented Control')}</h2>
            <SegmentedControl segments={[t('日', 'Day'), t('周', 'Week'), t('月', 'Month')]} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('提示', 'Tooltip')}</h2>
            <Tooltip content={t('这是一个提示', 'This is a tooltip')} side="top">
              <Button variant="secondary">{t('悬停我', 'Hover me')}</Button>
            </Tooltip>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('文本域', 'Textarea')}</h2>
            <Textarea label={t('描述', 'Description')} placeholder={t('请输入你的消息…', 'Type your message...')} autoResize minRows={3} style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('标签', 'Label')}</h2>
            <Label style={{ display: 'block', marginBottom: 'var(--space-md)' }}>{t('普通标签', 'Normal Label')}</Label>
            <Label required style={{ display: 'block', marginBottom: 'var(--space-md)' }}>{t('必填标签', 'Required Label')}</Label>
            <Label disabled style={{ display: 'block' }}>{t('已禁用标签', 'Disabled Label')}</Label>
          </section>
        </CategorySection>

        <CategorySection id="data-display" title={t('数据展示', 'Data Display')}>
          <section style={gridSectionStyle}>
            <h2 style={demoTitleStyle}>{t('卡片', 'Cards')}</h2>
            <Card variant="default" title={t('默认卡片', 'Default Card')} action={t('更多', 'More')}>
              <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('带标题和操作的标准卡片。', 'Standard card with header and action.')}</p>
            </Card>
            <Card variant="raised" title={t('突出卡片', 'Raised Card')}>
              <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('具有明显背景的浮动界面。', 'Elevated surface with background distinction.')}</p>
            </Card>
            <Card variant="compact" title={t('紧凑', 'Compact')}>
              <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('为密集布局减少内边距。', 'Reduced padding for dense layouts.')}</p>
            </Card>
            <Card variant="technical" title="[ Technical ]">
              <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('等宽技术风格变体。', 'Monospace technical variant.')}</p>
            </Card>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('数据行', 'Data Rows')}</h2>
            <DataTable
              variant="rows"
              items={[
                { label: t('CPU 使用率', 'CPU Usage'), value: '42', unit: '%', status: 'good' },
                { label: t('内存', 'Memory'), value: '78', unit: '%', status: 'warning' },
                { label: t('磁盘 I/O', 'Disk I/O'), value: '95', unit: '%', status: 'error' },
                { label: t('网络', 'Network'), value: '1.2', unit: 'GB/s', status: 'info' },
                { label: t('运行时长', 'Uptime'), value: '14', unit: t('天', 'days'), trend: '↑' }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('数据网格', 'Data Grid')}</h2>
            <DataTable
              variant="grid"
              columns={[
                { key: 'name', label: t('名称', 'Name') },
                { key: 'status', label: t('状态', 'Status') },
                { key: 'value', label: t('数值', 'Value'), type: 'numeric' }
              ]}
              rows={[
                { cells: { name: t('传感器 A', 'Sensor A'), status: t('在线', 'Online'), value: 42 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'good' }] },
                { cells: { name: t('传感器 B', 'Sensor B'), status: t('警告', 'Warning'), value: 78 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'warning' }] },
                { cells: { name: t('传感器 C', 'Sensor C'), status: t('离线', 'Offline'), value: 0 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'error' }] }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('进度条', 'Progress Bar')}</h2>
            <ProgressBar value={65} size="hero" label={t('存储', 'Storage')} unit="%" status="default" style={{ marginBottom: 'var(--space-xl)' }} />
            <ProgressBar value={78} size="standard" label={t('内存', 'Memory')} unit="%" status="warning" style={{ marginBottom: 'var(--space-xl)' }} />
            <ProgressBar value={95} size="compact" label={t('CPU', 'CPU')} unit="%" status="overlimit" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('表格', 'Table')}</h2>
            <DataTable
              variant="table"
              columns={[
                { key: 'name', label: t('姓名', 'Name') },
                { key: 'role', label: t('角色', 'Role') },
                { key: 'status', label: t('状态', 'Status') },
                { key: 'score', label: t('分数', 'Score'), align: 'right' as const }
              ]}
              rows={[
                { cells: { name: t('爱丽丝', 'Alice'), role: t('工程师', 'Engineer'), status: t('活跃', 'Active'), score: '92' } },
                { cells: { name: t('鲍勃', 'Bob'), role: t('设计师', 'Designer'), status: t('离开', 'Away'), score: '87' } },
                { cells: { name: t('卡罗尔', 'Carol'), role: t('经理', 'Manager'), status: t('活跃', 'Active'), score: '95' } }
              ]}
              striped
              hoverable
            />
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('徽章', 'Badge')}</h2>
            <Badge variant="default">{t('默认', 'Default')}</Badge>
            <Badge variant="secondary">{t('次要', 'Secondary')}</Badge>
            <Badge variant="destructive">{t('危险', 'Destructive')}</Badge>
            <Badge variant="outline">{t('描边', 'Outline')}</Badge>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('头像', 'Avatar')}</h2>
            <Avatar size="sm" fallback="SM" />
            <Avatar size="md" fallback="MD" />
            <Avatar size="lg" fallback="LG" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('分隔线', 'Separator')}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', height: '40px' }}>
              <span style={{ fontSize: 'var(--body)' }}>{t('左', 'Left')}</span>
              <Separator orientation="vertical" decorative />
              <span style={{ fontSize: 'var(--body)' }}>{t('右', 'Right')}</span>
            </div>
            <Separator orientation="horizontal" decorative style={{ marginTop: 'var(--space-md)' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('骨架屏', 'Skeleton')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--caption)' }}>{t('组件尚未实现', 'Component not yet implemented')}</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('进度条 — 紧凑 & 不确定', 'ProgressBar — Slim & Indeterminate')}</h2>
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('紧凑', 'Slim')}</div>
            <ProgressBar value={65} variant="slim" style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('紧凑 — 良好', 'Slim — Good')}</div>
            <ProgressBar value={80} variant="slim" status="good" style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('不确定', 'Indeterminate')}</div>
            <ProgressBar value={0} indeterminate style={{ marginBottom: 'var(--space-xl)' }} />
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('紧凑不确定', 'Slim Indeterminate')}</div>
            <ProgressBar value={0} variant="slim" indeterminate />
          </section>
        </CategorySection>

        <CategorySection id="overlays" title={t('弹窗与层', 'Overlays')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('模态框', 'Modal')}</h2>
            <Button variant="primary" onClick={() => setModalOpen(true)}>{t('打开模态框', 'Open Modal')}</Button>
            <Modal
              open={modalOpen}
              title={t('确认操作', 'Confirm Action')}
              onClose={() => setModalOpen(false)}
              footer={<Button variant="primary" onClick={() => setModalOpen(false)}>{t('确认', 'Confirm')}</Button>}
            >
              <p style={{ fontSize: 'var(--body)' }}>{t('你确定要继续吗？此操作无法撤销。', 'Are you sure you want to proceed? This action cannot be undone.')}</p>
            </Modal>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('弹出框', 'Popover')}</h2>
            <Popover
              side="bottom"
              content={
                <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{t('弹出标题', 'Popover Title')}</div>
                  <div>{t('弹出框内的一些内容。', 'Some content inside the popover.')}</div>
                </div>
              }
            >
              <Button variant="secondary">{t('打开弹出框', 'Open Popover')}</Button>
            </Popover>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('悬停卡片', 'Hover Card')}</h2>
            <HoverCard
              side="bottom"
              content={
                <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>@nothingdesign</div>
                  <div>{t('Nothing 生态系统的设计系统。', 'Design system for the Nothing ecosystem.')}</div>
                </div>
              }
            >
              <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontSize: 'var(--body)' }} onClick={e => e.preventDefault()}>@nothingdesign</a>
            </HoverCard>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('轻提示（Toast）', 'Sonner (Toast)')}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--caption)' }}>{t('组件尚未实现', 'Component not yet implemented')}</p>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('下拉', 'Dropdown')}</h2>
            <Select
              style={{ maxWidth: '300px' }}
              options={[
                  { label: t('选项 A', 'Option A'), value: 'a' },
                  { label: t('选项 B', 'Option B'), value: 'b' },
                  { label: t('选项 C', 'Option C'), value: 'c' },
                  { label: t('已禁用', 'Disabled'), value: 'd', disabled: true }
                ]}
                value={dropdownValue}
                onValueChange={setDropdownValue}
                placeholder={t('请选择', 'Choose one')}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('抽屉', 'Sheet')}</h2>
            <Button variant="secondary" onClick={() => setSheetOpen(true)}>{t('打开抽屉', 'Open Sheet')}</Button>
            <Sheet
              open={sheetOpen}
              onOpenChange={setSheetOpen}
              side="right"
              title={t('设置面板', 'Settings Panel')}
            >
              <Switch label={t('深色模式', 'Dark Mode')} on={theme === 'dark'} style={{ display: 'block', marginBottom: 'var(--space-lg)' }} />
              <Switch label={t('通知', 'Notifications')} on={true} style={{ display: 'block', marginBottom: 'var(--space-lg)' }} />
              <Switch label={t('自动更新', 'Auto-update')} style={{ display: 'block' }} />
            </Sheet>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('底部抽屉', 'Bottom Sheet')}</h2>
            <Button variant="primary" onClick={() => setBottomSheetOpen(true)}>{t('打开底部抽屉', 'Open Bottom Sheet')}</Button>
            <Sheet
              open={bottomSheetOpen}
              onOpenChange={setBottomSheetOpen}
              side="bottom"
              title={t('设置', 'Settings')}
              sections={[
                { title: t('显示', 'Display'), content: <Switch label={t('深色模式', 'Dark Mode')} on={theme === 'dark'} /> },
                { title: t('连接', 'Connectivity'), content: <Switch label={t('Wi-Fi', 'Wi-Fi')} on={true} /> }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('命令面板', 'Command Palette')}</h2>
            <Button variant="primary" onClick={() => setCommandOpen(true)}>{t('打开命令面板', 'Open Command Palette')}</Button>
            <Command
              open={commandOpen}
              onOpenChange={setCommandOpen}
              groups={[
                { heading: t('操作', 'Actions'), items: [
                  { id: '1', label: t('新建文件', 'New File'), shortcut: '⌘N', onSelect: () => {} },
                  { id: '2', label: t('打开文件', 'Open File'), shortcut: '⌘O', onSelect: () => {} },
                  { id: '3', label: t('保存', 'Save'), shortcut: '⌘S', onSelect: () => {} }
                ]},
                { heading: t('导航', 'Navigation'), items: [
                  { id: '4', label: t('回到主页', 'Go to Home'), onSelect: () => {} },
                  { id: '5', label: t('打开设置', 'Go to Settings'), onSelect: () => {} },
                  { id: '6', label: t('打开个人主页', 'Go to Profile'), onSelect: () => {} }
                ]}
              ]}
            />
          </section>
        </CategorySection>

        <CategorySection id="navigation" title={t('导航', 'Navigation')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('导航栏', 'Navigation')}</h2>
            <Navigation
              variant="bracket"
              items={[
                { label: t('主页', 'Home') },
                { label: t('设备', 'Devices') },
                { label: t('设置', 'Settings') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('日期导航', 'Date Nav')}</h2>
            <DateNav
              label={dateNavLabel}
              onPrev={handleDatePrev}
              onNext={handleDateNext}
              grotesk
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('标签页', 'Tabs')}</h2>
            <Tabs
              style={{ maxWidth: '500px' }}
              items={[
                { value: 'account', label: t('账号', 'Account') },
                { value: 'password', label: t('密码', 'Password') },
                { value: 'settings', label: t('设置', 'Settings') }
              ]}
            >
              <TabPanel value="account">{t('管理你的账号设置与偏好。', 'Manage your account settings and preferences.')}</TabPanel>
              <TabPanel value="password">{t('修改你的密码与安全选项。', 'Change your password and security options.')}</TabPanel>
              <TabPanel value="settings">{t('配置应用设置与通知。', 'Configure application settings and notifications.')}</TabPanel>
            </Tabs>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('面包屑', 'Breadcrumb')}</h2>
            <Breadcrumb
              items={[
                { label: t('主页', 'Home'), href: '#' },
                { label: t('产品', 'Products'), href: '#' },
                { label: t('分类', 'Category'), href: '#' },
                { label: t('当前页', 'Current Page') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('分页', 'Pagination')}</h2>
            <Pagination
              page={paginationPage}
              totalPages={20}
              onPageChange={setPaginationPage}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('导航菜单', 'Navigation Menu')}</h2>
            <NavigationMenu
              items={[
                {
                  label: t('产品', 'Products'),
                  children: [
                    { label: t('Phone (1)', 'Phone (1)'), onClick: () => {} },
                    { label: t('Phone (2)', 'Phone (2)'), onClick: () => {} },
                    { label: t('Ear (1)', 'Ear (1)'), onClick: () => {} }
                  ]
                },
                {
                  label: t('公司', 'Company'),
                  children: [
                    { label: t('关于', 'About'), onClick: () => {} },
                    { label: t('招聘', 'Careers'), onClick: () => {} }
                  ]
                },
                { label: t('社区', 'Community'), onClick: () => {} }
              ]}
            />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('侧边栏', 'Sidebar')}</h2>
            <Sidebar
              style={{ maxWidth: '240px' }}
              items={[
                  { label: t('仪表盘', 'Dashboard'), active: true, icon: <span>◉</span> },
                  { label: t('分析', 'Analytics'), icon: <span>◎</span>, badge: 3 },
                  { label: t('报告', 'Reports'), icon: <span>◈</span> },
                  { label: t('设置', 'Settings'), icon: <span>⚙</span> },
                  { label: t('帮助', 'Help'), icon: <span>?⃝</span> }
              ]}
              header={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--label)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Nothing UI</span>}
            />
          </section>
        </CategorySection>

        <CategorySection id="menus-selection" title={t('菜单与选择', 'Menus & Selection')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('折叠面板', 'Accordion')}</h2>
            <Accordion
              type="single"
              style={{ maxWidth: '500px' }}
              items={[
                { id: '1', title: t('什么是 Nothing UI？', 'What is Nothing UI?'), content: t('一个以克制与精确为核心构建的设计系统。', 'A design system built with purposeful restraint and technical precision.') },
                { id: '2', title: t('如何安装？', 'How do I install it?'), content: t('通过 npm 安装：npm install nothing-ui-kit', 'Install via npm: npm install nothing-ui-kit') },
                { id: '3', title: t('是否具备可访问性？', 'Is it accessible?'), content: t('是的，所有组件均遵循 WAI-ARIA 指南并支持完整键盘导航。', 'Yes, all components follow WAI-ARIA guidelines with full keyboard navigation.') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('复选框', 'Checkbox')}</h2>
            <Checkbox label={t('未选中', 'Unchecked')} style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Checkbox label={t('已选中', 'Checked')} defaultChecked style={{ display: 'block', marginBottom: 'var(--space-md)' }} />
            <Checkbox label={t('不确定', 'Indeterminate')} checked="indeterminate" style={{ display: 'block' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('单选组', 'Radio Group')}</h2>
            <RadioGroup
              value={radioValue}
              onValueChange={setRadioValue}
              orientation="vertical"
              options={[
                { value: 'option1', label: t('选项一', 'Option One') },
                { value: 'option2', label: t('选项二', 'Option Two') },
                { value: 'option3', label: t('选项三', 'Option Three') },
                { value: 'option4', label: t('选项四', 'Option Four') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('选择', 'Select')}</h2>
            <Select
              label={t('选择一种水果', 'Choose a fruit')}
              placeholder={t('请选择…', 'Select...')}
              searchable
              value={selectValue}
              onValueChange={setSelectValue}
              style={{ maxWidth: '300px' }}
              options={[
                { value: 'apple', label: t('苹果', 'Apple') },
                { value: 'banana', label: t('香蕉', 'Banana') },
                { value: 'cherry', label: t('樱桃', 'Cherry') },
                { value: 'date', label: t('椰枣', 'Date') },
                { value: 'elderberry', label: t('接骨木莓', 'Elderberry') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('右键菜单', 'Context Menu')}</h2>
            <ContextMenu
              items={[
                { label: t('后退', 'Back'), shortcut: 'Alt+←' },
                { label: t('前进', 'Forward'), shortcut: 'Alt+→' },
                { label: t('刷新', 'Reload'), shortcut: 'Ctrl+R', separator: true },
                { label: t('另存为…', 'Save as...'), shortcut: 'Ctrl+S' },
                { label: t('打印…', 'Print...'), shortcut: 'Ctrl+P', separator: true },
                { label: t('查看源代码', 'View Source'), shortcut: 'Ctrl+U' }
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
                {t('右键点击此区域', 'Right-click this area')}
              </div>
            </ContextMenu>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('下拉菜单', 'Dropdown Menu')}</h2>
            <DropdownMenu
              trigger={t('菜单', 'Menu')}
              items={[
                { label: t('新建文件', 'New File'), shortcut: 'Ctrl+N' },
                { label: t('打开文件', 'Open File'), shortcut: 'Ctrl+O', separator: true },
                { label: t('保存', 'Save'), shortcut: 'Ctrl+S' },
                { label: t('另存为…', 'Save As...'), shortcut: 'Ctrl+Shift+S', separator: true },
                { label: t('退出', 'Exit') }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('菜单栏', 'Menubar')}</h2>
            <DropdownMenu
              variant="menubar"
              items={[
                {
                  label: t('文件', 'File'),
                  items: [
                    { label: t('新建标签页', 'New Tab'), shortcut: '⌘T', onClick: () => {} },
                    { label: t('新窗口', 'New Window'), shortcut: '⌘N', onClick: () => {} },
                    { label: t('分享', 'Share'), separator: true },
                    { label: t('打印', 'Print'), shortcut: '⌘P', onClick: () => {} }
                  ]
                },
                {
                  label: t('编辑', 'Edit'),
                  items: [
                    { label: t('撤销', 'Undo'), shortcut: '⌘Z', onClick: () => {} },
                    { label: t('重做', 'Redo'), shortcut: '⌘⇧Z', onClick: () => {} },
                    { label: t('剪切', 'Cut'), separator: true, shortcut: '⌘X' },
                    { label: t('复制', 'Copy'), shortcut: '⌘C' },
                    { label: t('粘贴', 'Paste'), shortcut: '⌘V' }
                  ]
                },
                {
                  label: t('视图', 'View'),
                  items: [
                    { label: t('放大', 'Zoom In'), shortcut: '⌘+', onClick: () => {} },
                    { label: t('缩小', 'Zoom Out'), shortcut: '⌘-', onClick: () => {} }
                  ]
                }
              ]}
            />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('切换 / 切换组', 'Toggle / Toggle Group')}</h2>
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('单个切换', 'Single Toggle')}</div>
            <Toggle style={{ marginBottom: 'var(--space-lg)' }}>{t('切换', 'Toggle')}</Toggle>
            <div style={{ ...demoTitleStyle, fontSize: 'var(--caption)', marginBottom: 'var(--space-xs)' }}>{t('切换组', 'Toggle Group')}</div>
            <ToggleGroup
              value={toggleGroupValue}
              onValueChange={setToggleGroupValue}
              variant="outline"
            >
              <Toggle value="bold">{t('粗体', 'Bold')}</Toggle>
              <Toggle value="italic">{t('斜体', 'Italic')}</Toggle>
              <Toggle value="underline">{t('下划线', 'Underline')}</Toggle>
            </ToggleGroup>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('可折叠', 'Collapsible')}</h2>
            <Collapsible trigger={t('显示详情', 'Show Details')} style={{ maxWidth: '500px' }}>
              <div style={{ padding: 'var(--space-md)', fontSize: 'var(--body)', color: 'var(--text-secondary)' }}>
                {t('这些是点击上方触发器后展开或折叠的隐藏详情。', 'These are the hidden details that can be expanded or collapsed by clicking the trigger above.')}
              </div>
            </Collapsible>
          </section>
        </CategorySection>

        <CategorySection id="states" title={t('状态', 'States')}>
          <section style={{ ...gridSectionStyle, marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('状态', 'States')}</h2>
            <LoadingState progress={65} label={t('同步中', 'Syncing')} />
            <ErrorState headline={t('连接丢失', 'Connection Lost')} message={t('无法连接到服务器。', 'Unable to reach the server.')} onRetry={() => {}} />
            <EmptyState headline={t('暂无设备', 'No Devices')} description={t('配对设备以开始。', 'Pair a device to get started.')} />
            <DisabledState headline={t('功能锁定', 'Feature Locked')} description={t('需要高级套餐。', 'Requires premium plan.')} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('提示', 'Alert')}</h2>
            <Alert title={t('注意！', 'Heads up!')} variant="default" style={{ maxWidth: '500px', marginBottom: 'var(--space-md)' }}>
              {t('你可以通过 CLI 将组件添加到应用中。', 'You can add components to your app using the CLI.')}
            </Alert>
            <Alert title={t('错误', 'Error')} variant="destructive" style={{ maxWidth: '500px' }}>
              {t('你的会话已过期。请重新登录。', 'Your session has expired. Please log in again.')}
            </Alert>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('确认对话框', 'Alert Dialog')}</h2>
            <Button variant="destructive" onClick={() => setAlertDialogOpen(true)}>{t('删除账号', 'Delete Account')}</Button>
            <Modal
              open={alertDialogOpen}
              onClose={() => setAlertDialogOpen(false)}
              title={t('你确定吗？', 'Are you absolutely sure?')}
              variant="alert"
              description={t('此操作无法撤销。它将永久删除你的账号以及服务器上的数据。', 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.')}
              confirmLabel={t('删除', 'Delete')}
              cancelLabel={t('取消', 'Cancel')}
              destructive
              onConfirm={() => setAlertDialogOpen(false)}
              onCancel={() => setAlertDialogOpen(false)}
            />
          </section>
        </CategorySection>

        <CategorySection id="utility" title={t('工具', 'Utility')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('滚动区域', 'Scroll Area')}</h2>
            <ScrollArea height="200px">
              <div style={{ padding: 'var(--space-sm)' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{ padding: 'var(--space-sm)', borderBottom: '1px solid var(--border)', fontSize: 'var(--body)' }}>
                    {t('条目', 'Item')} {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('可调整大小', 'Resizable')}</h2>
            <Resizable
              direction="horizontal"
              initialSizes={[50, 50]}
              minSizes={[20, 20]}
            >
              <div style={{ padding: 'var(--space-md)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-visible)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--body)' }}>
                {t('面板 A', 'Panel A')}
              </div>
              <div style={{ padding: 'var(--space-md)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-visible)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--body)' }}>
                {t('面板 B', 'Panel B')}
              </div>
            </Resizable>
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('宽高比', 'Aspect Ratio')}</h2>
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
            <h2 style={demoTitleStyle}>{t('表单', 'Form')}</h2>
            <Form onSubmit={() => {}} style={{ maxWidth: '400px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <Input variant="underline" label={t('姓名', 'Name')} placeholder={t('你的姓名', 'Your name')} />
                  <Input variant="underline" label={t('邮箱', 'Email')} placeholder={t('you@example.com', 'you@example.com')} />
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
                  }}>{t('提交', 'Submit')}</button>
                </div>
              </Form>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('一次性密码输入', 'Input OTP')}</h2>
            <InputOTP length={6} value={otpValue} onValueChange={setOtpValue} />
          </section>
        </CategorySection>

        <CategorySection id="clock-calendar" title={t('时钟与日历', 'Clock & Calendar')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('时钟', 'Clock')}</h2>
            <Time variant="digital-compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Time variant="dial" />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('日历', 'Calendar')}</h2>
            <Calendar type="compact" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }} />
            <Calendar type="full" />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('世界时钟', 'World Clock')}</h2>
            <Time variant="world" cities={worldClockCities} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setWorldClockCities(prev => [...prev, { name: t('上海', 'SHANGHAI'), offset: 8 }])}>{t('添加上海', 'Add Shanghai')}</Button>
              <Button variant="ghost" size="sm" onClick={() => setWorldClockCities(prev => prev.length > 1 ? prev.slice(0, -1) : prev)}>{t('移除最后', 'Remove Last')}</Button>
            </div>
          </section>

          <section style={flexWrapSectionStyle}>
            <h2 style={demoTitleStyle}>{t('日期小组件', 'Date Widget')}</h2>
            <DateWidget type="rect" theme="light" />
            <DateWidget type="rect" theme="dark" />
            <DateWidget type="dual-ring" theme="light" />
            <DateWidget type="dual-ring" theme="dark" />
          </section>
        </CategorySection>

        <CategorySection id="system-monitoring" title={t('系统与监控', 'System & Monitoring')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('电量', 'Battery')}</h2>
            <Battery />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('系统监控', 'System Monitor')}</h2>
            <SystemMonitor />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('快速切换', 'Quick Toggle')}</h2>
            <QuickToggle variant="circle" theme="light" label={t('激活', 'Active')} active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label={t('手电筒', 'Torch')} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>} />
            <QuickToggle variant="circle" theme="accent" label={t('勿扰', 'DND')} active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="circle" theme="light" label={t('旋转', 'Rotate')} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label={t('热点', 'Hotspot')} icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label={t('蓝牙', 'Bluetooth')} active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6.5 6.5h11v11h-11z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>} />
            <QuickToggle variant="pill" theme="light" label={t('移动数据', 'Mobile Data')} active icon={<svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
            <QuickToggle variant="pill" theme="dark" label={t('NFC', 'NFC')} icon={<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>} />
          </section>
        </CategorySection>

        <CategorySection id="utility-tools" title={t('实用工具', 'Utility Tools')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('音乐播放器', 'Music Player')}</h2>
            <MusicPlayer style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('图片轮播', 'Photo Carousel')}</h2>
            <PhotoCarousel />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('防睡眠', 'Caffeinate')}</h2>
            <Caffeinate style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('剪贴板', 'Clipboard')}</h2>
            <Clipboard style={{ maxWidth: '400px' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('番茄钟', 'Pomodoro')}</h2>
            <Pomodoro style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('对讲机', 'Walkie Talkie')}</h2>
            <WalkieTalkie style={{ maxWidth: '300px', margin: '0 auto' }} />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('任务栏', 'Taskbar')}</h2>
            <Taskbar />
          </section>
        </CategorySection>

        <CategorySection id="time-progress" title={t('时间与进度', 'Time & Progress')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('日晷', 'Sun Dial')}</h2>
            <SunDial style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('年龄动态', 'Age Motion')}</h2>
            <AgeMotion style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('计时', 'Chrono')}</h2>
            <Chrono style={{ maxWidth: '400px', margin: '0 auto' }} />
          </section>

          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('旋转器', 'Spinner')}</h2>
            <Spinner items={spinnerItems} style={{ maxWidth: '400px', margin: '0 auto' }} />
            <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="secondary" size="sm" onClick={() => setSpinnerItems(prev => [...prev.slice(1), prev[0]])}>{t('旋转条目', 'Rotate Items')}</Button>
              <Button variant="ghost" size="sm" onClick={() => setSpinnerItems([t('是', 'YES'), t('否', 'NO'), t('可能', 'MAYBE'), t('稍后', 'LATER'), t('跳过', 'SKIP'), t('尝试', 'TRY')])}>{t('重置', 'Reset')}</Button>
            </div>
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('下一个事件', 'Next Event')}</h2>
            <NextEvent />
          </section>
        </CategorySection>

        <CategorySection id="visual-display" title={t('视觉展示', 'Visual Display')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('点阵', 'Dot Matrix')}</h2>
            <DotMatrix rows={5} cols={5} dotSize="md" theme="light" />
            <DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" pattern="glyph" />
            <DotMatrix rows={10} cols={10} dotSize="sm" theme="dark" activeDots={[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[0,9],[1,8],[2,7],[3,6],[4,5],[5,4],[6,3],[7,2],[8,1],[9,0]]} />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('引用', 'Quotes')}</h2>
            <Quotes />
          </section>
        </CategorySection>

        <CategorySection id="feature-widgets" title={t('特色组件', 'Feature Widgets')}>
          <WidgetShowcase />
        </CategorySection>

        <CategorySection id="widget-layout" title={t('组件布局', 'Widget Layout')}>
          <section style={sectionStyle}>
            <h2 style={demoTitleStyle}>{t('组件卡片', 'Widget Card')}</h2>
            <WidgetCard />
          </section>

          <section style={{ marginBottom: 0 }}>
            <h2 style={demoTitleStyle}>{t('组件网格', 'Widget Grid')}</h2>
            <WidgetGrid />
          </section>
        </CategorySection>

        <CategorySection id="figma-20-library" title={t('Figma 2.0 库', 'Figma 2.0 Library')}>
          <Figma20Showcase />
        </CategorySection>

        <CategorySection id="nullframe" title={t('Nullframe 仪表盘', 'Nullframe Dashboard')}>
          <Suspense fallback={<div style={{ color: 'var(--text-secondary)', padding: '24px' }}>{t('加载中…', 'Loading...')}</div>}>
            <NullframeSection />
          </Suspense>
        </CategorySection>
      </div>
    </main>
  )
}

export default App
