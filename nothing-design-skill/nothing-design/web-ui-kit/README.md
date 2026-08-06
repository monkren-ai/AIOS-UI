# AIOS UI Kit Web

**AIOS UI** — 面向 AI OS 的 Web 组件库，视觉基于 Nothing 设计语言。提供时钟、电池、日历、音乐播放器、系统监控、日期、日历事件、名言、任务栏等组件，支持 Vanilla JavaScript 和 React。

## 设计理念

- **Subtract, don't add.** 每一个元素都必须有存在的理由。
- **Structure is ornament.** 结构本身就是装饰。
- **Monochrome is the canvas.** 单色是画布，颜色是事件。
- **Type does the heavy lifting.** 排版做了重要的工作。
- **Both modes are first-class.** 深色和浅色模式同等重要。

## 前置要求

### Google Fonts

在使用任何组件之前，请确保加载以下 Google Fonts：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## 安装

### Vanilla JavaScript

直接复制 `css/` 和 `js/` 目录到你的项目中即可使用。

### React（v2 · AIOS UI · `aios-ui-kit`）

```bash
npm install aios-ui-kit motion
```

```css
@import 'tailwindcss';
@import 'aios-ui-kit/styles.css';
@source '../node_modules/aios-ui-kit/es';
```

```tsx
import * as motion from 'motion/react'
import { ConfigProvider } from 'aios-ui-kit'
import { Button } from 'aios-ui-kit/button'

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider motion={motion} defaultTheme="dark" enableSystem>
      <Button variant="primary">Continue</Button>
      {children}
    </ConfigProvider>
  )
}
```

本地文档站与开发：

```bash
cd react
npm install
npm run dev
```

详情见 [`react/README.md`](./react/README.md)、[`react/CHANGELOG.md`](./react/CHANGELOG.md)。从 1.x 升级见站点 `/docs/migrating-v2`。

## 主题切换

组件支持深色/浅色模式切换，通过 `data-theme` 属性控制：

```html
<html data-theme="dark">
<!-- 或 -->
<html data-theme="light">
```

## 组件文档

### 1. Clock 时钟组件

时钟组件支持数字、仪表盘、圆形双圈和叠加字体四种变体。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/clock.css">

<div id="digitalClock"></div>
<div id="gaugeClock"></div>
<div id="dualRingClock"></div>
<div id="overlayClock"></div>

<script src="js/clock.js"></script>
<script>
  // 数字时钟
  const digitalClock = new NothingClock(document.getElementById('digitalClock'), {
    type: 'digital',
    theme: 'dark',
    updateInterval: 1000
  });

  // 仪表盘时钟
  const gaugeClock = new NothingClock(document.getElementById('gaugeClock'), {
    type: 'gauge',
    theme: 'dark',
    updateInterval: 1000
  });

  // 圆形双圈时钟 — 上方小时/下方分钟（红色）
  const dualRingClock = new NothingClock(document.getElementById('dualRingClock'), {
    type: 'dual-ring',
    theme: 'dark',
    updateInterval: 1000
  });

  // 叠加字体时钟 — 红色底层+深色/白色顶层
  const overlayClock = new NothingClock(document.getElementById('overlayClock'), {
    type: 'overlay',
    theme: 'dark',
    updateInterval: 1000
  });
</script>
```

#### React

```tsx
import Clock from './components/Clock'

<Clock type="digital" theme="dark" updateInterval={1000} />
<Clock type="gauge" theme="dark" updateInterval={1000} />
<Clock type="dual-ring" theme="dark" updateInterval={1000} />
<Clock type="overlay" theme="dark" updateInterval={1000} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'digital' \| 'gauge' \| 'dual-ring' \| 'overlay' | 'digital' | 时钟类型 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| updateInterval | number | 1000 | 更新间隔（毫秒） |

### 2. Battery 电池组件

电池组件支持标准条形和环形进度两种变体。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/battery.css">

<div id="batteryWidget"></div>
<div id="ringBattery"></div>

<script src="js/battery.js"></script>
<script>
  // 标准条形电池
  const battery = new NothingBattery(document.getElementById('batteryWidget'), {
    level: 75,
    isCharging: false,
    theme: 'dark'
  });

  // 环形进度电池 — 圆形双圈+外圈进度条
  const ringBattery = new NothingBattery(document.getElementById('ringBattery'), {
    level: 75,
    isCharging: false,
    variant: 'ring',
    theme: 'dark'
  });
</script>
```

#### React

```tsx
import Battery from './components/Battery'

<Battery level={75} isCharging={false} theme="dark" />
<Battery level={75} isCharging={false} variant="ring" theme="dark" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| level | number | 50 | 电池电量百分比 (0-100) |
| isCharging | boolean | false | 是否正在充电 |
| variant | 'default' \| 'ring' | 'default' | 电池变体 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |

### 3. Calendar 日历组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/calendar.css">

<div id="compactCalendar"></div>
<div id="fullCalendar"></div>

<script src="js/calendar.js"></script>
<script>
  // 紧凑日历
  const compact = new NothingCalendar(document.getElementById('compactCalendar'), {
    type: 'compact'
  });

  // 完整日历
  const full = new NothingCalendar(document.getElementById('fullCalendar'), {
    type: 'full'
  });
</script>
```

#### React

```tsx
import Calendar from './components/Calendar'

<Calendar type="compact" />
<Calendar type="full" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'compact' \| 'full' | 'compact' | 日历类型 |

### 4. SystemMonitor 系统监控组件

综合系统监控面板，显示 CPU、RAM、存储、网络和电池指标。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/system-monitor.css">

<div id="systemMonitor"></div>

<script src="js/system-monitor.js"></script>
<script>
  const monitor = new NothingSystemMonitor(document.getElementById('systemMonitor'), {
    cpuUsage: 38,
    ramUsage: 65,
    storageUsage: 42,
    networkSpeed: 156,
    batteryLevel: 75,
    batteryCharging: false
  });
</script>
```

#### React

```tsx
import SystemMonitor from './components/SystemMonitor'

<SystemMonitor
  cpuUsage={38}
  ramUsage={65}
  storageUsage={42}
  networkSpeed={156}
  batteryLevel={75}
  batteryCharging={false}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cpuUsage | number | 0 | CPU 使用百分比 |
| ramUsage | number | 0 | RAM 使用百分比 |
| storageUsage | number | 0 | 存储使用百分比 |
| networkSpeed | number | 0 | 网络速度 (Mbps) |
| batteryLevel | number | 0 | 电池电量百分比 (0-100) |
| batteryCharging | boolean | false | 是否正在充电 |

### 5. MusicPlayer 音乐播放器组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/music-player.css">

<div id="musicPlayer"></div>

<script src="js/music-player.js"></script>
<script>
  const player = new NothingMusicPlayer(document.getElementById('musicPlayer'), {
    title: 'Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    isPlaying: false,
    progress: 35
  });
</script>
```

#### React

```tsx
import MusicPlayer from './components/MusicPlayer'

<MusicPlayer
  title="Song Title"
  artist="Artist Name"
  album="Album Name"
  isPlaying={false}
  progress={35}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 歌曲标题 |
| artist | string | '' | 艺术家 |
| album | string | '' | 专辑 |
| isPlaying | boolean | false | 是否正在播放 |
| progress | number | 0 | 播放进度百分比 |

### 6. PhotoCarousel 照片轮播组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/photo-carousel.css">

<div id="photoCarousel"></div>

<script src="js/photo-carousel.js"></script>
<script>
  const carousel = new NothingPhotoCarousel(document.getElementById('photoCarousel'), {
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg'
    ],
    autoPlay: true,
    interval: 3000
  });
</script>
```

#### React

```tsx
import PhotoCarousel from './components/PhotoCarousel'

<PhotoCarousel
  images={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ]}
  autoPlay={true}
  interval={3000}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| images | string[] | [] | 图片 URL 数组 |
| autoPlay | boolean | true | 是否自动播放 |
| interval | number | 3000 | 轮播间隔（毫秒） |

### 7. Buttons 按钮组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/buttons.css">

<div id="primaryBtn"></div>
<div id="destructiveBtn"></div>

<script src="js/buttons.js"></script>
<script>
  const primaryBtn = new NothingButton(document.getElementById('primaryBtn'), {
    variant: 'primary',
    label: 'Confirm',
    disabled: false
  });

  const destructiveBtn = new NothingButton(document.getElementById('destructiveBtn'), {
    variant: 'destructive',
    label: 'Delete',
    disabled: false
  });

  primaryBtn.onClick(() => console.log('Primary clicked'));
</script>
```

#### React

```tsx
import Button from './components/Button'

<Button variant="primary" label="Confirm" />
<Button variant="secondary" label="Cancel" />
<Button variant="ghost" label="Skip" />
<Button variant="destructive" label="Delete" disabled />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'destructive' | 'primary' | 按钮变体 |
| label | string | '' | 按钮文本 |
| disabled | boolean | false | 是否禁用 |
| onClick | function | noop | 点击回调 |

### 8. Inputs 输入框组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/inputs.css">

<div id="underlineInput"></div>
<div id="borderedInput"></div>

<script src="js/inputs.js"></script>
<script>
  const underlineInput = new NothingInput(document.getElementById('underlineInput'), {
    style: 'underline',
    label: 'USERNAME',
    placeholder: 'Enter username',
    value: '',
    error: '',
    disabled: false
  });

  const borderedInput = new NothingInput(document.getElementById('borderedInput'), {
    style: 'bordered',
    label: 'EMAIL',
    placeholder: 'Enter email',
    value: '',
    error: 'Invalid email format',
    disabled: false
  });

  underlineInput.onChange((value) => console.log(value));
</script>
```

#### React

```tsx
import Input from './components/Input'

<Input style="underline" label="USERNAME" placeholder="Enter username" />
<Input style="bordered" label="EMAIL" error="Invalid email format" />
<Input style="underline" label="CODE" disabled />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| style | 'underline' \| 'bordered' | 'underline' | 输入框风格 |
| label | string | '' | 标签文本 |
| placeholder | string | '' | 占位文本 |
| value | string | '' | 输入值 |
| error | string | '' | 错误提示文本 |
| disabled | boolean | false | 是否禁用 |
| onChange | function | noop | 值变更回调 |

### 9. Toggles 开关组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/toggles.css">

<div id="toggle"></div>

<script src="js/toggles.js"></script>
<script>
  const toggle = new NothingToggle(document.getElementById('toggle'), {
    checked: false,
    disabled: false
  });

  toggle.onChange((checked) => console.log('Toggle:', checked));
</script>
```

#### React

```tsx
import Toggle from './components/Toggle'

<Toggle checked={false} onChange={(v) => console.log(v)} />
<Toggle checked={true} disabled />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| checked | boolean | false | 开关状态 |
| disabled | boolean | false | 是否禁用 |
| onChange | function | noop | 状态变更回调 |

### 10. Tags 标签组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/tags.css">

<div id="pillTag"></div>
<div id="techTag"></div>

<script src="js/tags.js"></script>
<script>
  const pillTag = new NothingTag(document.getElementById('pillTag'), {
    variant: 'pill',
    label: 'Active',
    active: true,
    removable: false
  });

  const techTag = new NothingTag(document.getElementById('techTag'), {
    variant: 'technical',
    label: 'V2.1',
    active: false,
    removable: true
  });

  techTag.onRemove(() => console.log('Tag removed'));
</script>
```

#### React

```tsx
import Tag from './components/Tag'

<Tag variant="pill" label="Active" active />
<Tag variant="technical" label="V2.1" removable onRemove={() => {}} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'pill' \| 'technical' | 'pill' | 标签变体 |
| label | string | '' | 标签文本 |
| active | boolean | false | 是否激活 |
| removable | boolean | false | 是否可移除 |
| onRemove | function | noop | 移除回调 |

### 11. SegmentedControl 分段控制器组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/segmented-control.css">

<div id="segmented"></div>

<script src="js/segmented-control.js"></script>
<script>
  const segmented = new NothingSegmentedControl(document.getElementById('segmented'), {
    segments: ['Day', 'Week', 'Month'],
    activeIndex: 0
  });

  segmented.onChange((index) => console.log('Selected:', index));
</script>
```

#### React

```tsx
import SegmentedControl from './components/SegmentedControl'

<SegmentedControl
  segments={['Day', 'Week', 'Month', 'Year']}
  activeIndex={1}
  onChange={(i) => console.log(i)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| segments | string[] | [] | 分段标签数组 (2-4 项) |
| activeIndex | number | 0 | 当前激活索引 |
| onChange | function | noop | 选中变更回调 |

### 12. Navigation 导航组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/navigation.css">

<div id="desktopNav"></div>
<div id="mobileNav"></div>

<script src="js/navigation.js"></script>
<script>
  const desktopNav = new NothingNavigation(document.getElementById('desktopNav'), {
    layout: 'desktop',
    style: 'bracket',
    items: [
      { label: 'HOME', href: '#home' },
      { label: 'ABOUT', href: '#about' },
      { label: 'WORK', href: '#work' }
    ],
    activeIndex: 0
  });

  const mobileNav = new NothingNavigation(document.getElementById('mobileNav'), {
    layout: 'mobile',
    style: 'pipe',
    items: [
      { label: 'HOME', href: '#home' },
      { label: 'ABOUT', href: '#about' },
      { label: 'WORK', href: '#work' }
    ],
    activeIndex: 0
  });
</script>
```

#### React

```tsx
import Navigation from './components/Navigation'

<Navigation
  layout="desktop"
  style="bracket"
  items={[{ label: 'HOME', href: '#home' }, { label: 'ABOUT', href: '#about' }]}
  activeIndex={0}
/>
<Navigation layout="mobile" style="pipe" items={items} activeIndex={1} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| layout | 'desktop' \| 'mobile' | 'desktop' | 布局模式 |
| style | 'bracket' \| 'pipe' | 'bracket' | 指示器风格 |
| items | Array<{label, href}> | [] | 导航项 |
| activeIndex | number | 0 | 当前激活索引 |
| onChange | function | noop | 选中变更回调 |

### 13. Cards 卡片组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/cards.css">

<div id="defaultCard"></div>
<div id="techCard"></div>

<script src="js/cards.js"></script>
<script>
  const defaultCard = new NothingCard(document.getElementById('defaultCard'), {
    variant: 'default',
    title: 'SYSTEM STATUS',
    subtitle: 'All services operational'
  });

  const techCard = new NothingCard(document.getElementById('techCard'), {
    variant: 'technical',
    title: 'LATENCY',
    subtitle: '12ms avg'
  });
</script>
```

#### React

```tsx
import Card from './components/Card'

<Card variant="default" title="SYSTEM STATUS" subtitle="All services operational" />
<Card variant="raised" title="ALERT" subtitle="High CPU usage" />
<Card variant="compact" title="MEM" subtitle="4.2 GB" />
<Card variant="technical" title="LATENCY" subtitle="12ms avg" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'default' \| 'raised' \| 'compact' \| 'technical' | 'default' | 卡片变体 |
| title | string | '' | 卡片标题 |
| subtitle | string | '' | 卡片副标题 |

### 14. DataRows 数据行组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/data-rows.css">

<div id="dataRow"></div>

<script src="js/data-rows.js"></script>
<script>
  const dataRow = new NothingDataRow(document.getElementById('dataRow'), {
    label: 'CPU USAGE',
    value: '67%',
    status: 'warning'
  });
</script>
```

#### React

```tsx
import DataRow from './components/DataRow'

<DataRow label="CPU USAGE" value="67%" status="warning" />
<DataRow label="MEMORY" value="4.2 GB" status="success" />
<DataRow label="DISK" value="92%" status="error" />
<DataRow label="UPTIME" value="14d 6h" status="default" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '' | 行标签 |
| value | string | '' | 行值 |
| status | 'default' \| 'success' \| 'warning' \| 'error' | 'default' | 状态颜色 |

### 15. DataGrid 数据表格组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/data-grid.css">

<div id="dataGrid"></div>

<script src="js/data-grid.js"></script>
<script>
  const dataGrid = new NothingDataGrid(document.getElementById('dataGrid'), {
    headers: ['NAME', 'STATUS', 'VALUE'],
    rows: [
      ['Process A', 'Running', '128'],
      ['Process B', 'Idle', '0'],
      ['Process C', 'Running', '256']
    ],
    activeRowIndex: 0
  });

  dataGrid.onRowClick((index) => console.log('Row:', index));
</script>
```

#### React

```tsx
import DataGrid from './components/DataGrid'

<DataGrid
  headers={['NAME', 'STATUS', 'VALUE']}
  rows={[['Process A', 'Running', '128'], ['Process B', 'Idle', '0']]}
  activeRowIndex={0}
  onRowClick={(i) => console.log(i)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| headers | string[] | [] | 表头数组 |
| rows | string[][] | [] | 行数据数组 |
| activeRowIndex | number | -1 | 激活行索引 (-1 表示无) |
| onRowClick | function | noop | 行点击回调 |

### 16. ProgressBar 进度条组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/progress-bar.css">

<div id="heroProgress"></div>
<div id="standardProgress"></div>

<script src="js/progress-bar.js"></script>
<script>
  const heroProgress = new NothingProgressBar(document.getElementById('heroProgress'), {
    size: 'hero',
    segments: 10,
    filled: 7,
    label: 'COMPLETION'
  });

  const standardProgress = new NothingProgressBar(document.getElementById('standardProgress'), {
    size: 'standard',
    segments: 5,
    filled: 3,
    label: 'STEPS'
  });
</script>
```

#### React

```tsx
import ProgressBar from './components/ProgressBar'

<ProgressBar size="hero" segments={10} filled={7} label="COMPLETION" />
<ProgressBar size="standard" segments={5} filled={3} label="STEPS" />
<ProgressBar size="compact" segments={4} filled={2} label="PHASE" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | 'hero' \| 'standard' \| 'compact' | 'standard' | 进度条尺寸 |
| segments | number | 5 | 总分段数 |
| filled | number | 0 | 已填充段数 |
| label | string | '' | 标签文本 |

### 17. Modal 模态框组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/modal.css">

<div id="modal"></div>

<script src="js/modal.js"></script>
<script>
  const modal = new NothingModal(document.getElementById('modal'), {
    title: 'CONFIRM ACTION',
    body: 'This operation cannot be undone.',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    visible: false
  });

  modal.onConfirm(() => console.log('Confirmed'));
  modal.onCancel(() => console.log('Cancelled'));

  modal.open();
</script>
```

#### React

```tsx
import Modal from './components/Modal'

<Modal
  title="CONFIRM ACTION"
  body="This operation cannot be undone."
  confirmLabel="Confirm"
  cancelLabel="Cancel"
  visible={showModal}
  onConfirm={() => {}}
  onCancel={() => {}}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 模态框标题 |
| body | string | '' | 模态框内容 |
| confirmLabel | string | 'Confirm' | 确认按钮文本 |
| cancelLabel | string | 'Cancel' | 取消按钮文本 |
| visible | boolean | false | 是否可见 |
| onConfirm | function | noop | 确认回调 |
| onCancel | function | noop | 取消回调 |

### 18. Dropdown 下拉选择组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/dropdown.css">

<div id="dropdown"></div>

<script src="js/dropdown.js"></script>
<script>
  const dropdown = new NothingDropdown(document.getElementById('dropdown'), {
    label: 'SELECT OPTION',
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' }
    ],
    selectedValue: 'opt1',
    disabled: false
  });

  dropdown.onChange((value) => console.log('Selected:', value));
</script>
```

#### React

```tsx
import Dropdown from './components/Dropdown'

<Dropdown
  label="SELECT OPTION"
  options={[{ value: 'opt1', label: 'Option 1' }, { value: 'opt2', label: 'Option 2' }]}
  selectedValue="opt1"
  onChange={(v) => console.log(v)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '' | 标签文本 |
| options | Array<{value, label}> | [] | 选项数组 |
| selectedValue | string | '' | 当前选中值 |
| disabled | boolean | false | 是否禁用 |
| onChange | function | noop | 选中变更回调 |

### 19. BottomSheet 底部抽屉组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/bottom-sheet.css">

<div id="bottomSheet"></div>

<script src="js/bottom-sheet.js"></script>
<script>
  const sheet = new NothingBottomSheet(document.getElementById('bottomSheet'), {
    title: 'OPTIONS',
    visible: false
  });

  sheet.open();
  sheet.onClose(() => console.log('Sheet closed'));
</script>
```

#### React

```tsx
import BottomSheet from './components/BottomSheet'

<BottomSheet
  title="OPTIONS"
  visible={showSheet}
  onClose={() => setShowSheet(false)}
>
  <p>Sheet content goes here</p>
</BottomSheet>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 抽屉标题 |
| visible | boolean | false | 是否可见 |
| onClose | function | noop | 关闭回调 |
| children | ReactNode | null | 抽屉内容 (React only) |

### 20. DateNav 日期导航组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/date-nav.css">

<div id="dateNav"></div>

<script src="js/date-nav.js"></script>
<script>
  const dateNav = new NothingDateNav(document.getElementById('dateNav'), {
    label: 'MAY 2026',
    onPrev: () => console.log('Previous'),
    onNext: () => console.log('Next')
  });
</script>
```

#### React

```tsx
import DateNav from './components/DateNav'

<DateNav label="MAY 2026" onPrev={() => {}} onNext={() => {}} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '' | 当前日期/周期标签 |
| onPrev | function | noop | 前一个回调 |
| onNext | function | noop | 后一个回调 |

### 21. States 状态组件

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/states.css">

<div id="loadingState"></div>
<div id="errorState"></div>

<script src="js/states.js"></script>
<script>
  const loadingState = new NothingState(document.getElementById('loadingState'), {
    type: 'loading',
    message: 'Loading data...'
  });

  const errorState = new NothingState(document.getElementById('errorState'), {
    type: 'error',
    message: 'Failed to load data.',
    actionLabel: 'Retry'
  });

  errorState.onAction(() => console.log('Retry clicked'));
</script>
```

#### React

```tsx
import State from './components/State'

<State type="loading" message="Loading data..." />
<State type="error" message="Failed to load data." actionLabel="Retry" onAction={() => {}} />
<State type="empty" message="No items found." />
<State type="disabled" message="Feature unavailable." />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'loading' \| 'error' \| 'empty' \| 'disabled' | 'loading' | 状态类型 |
| message | string | '' | 状态消息文本 |
| actionLabel | string | '' | 操作按钮文本 |
| onAction | function | noop | 操作按钮回调 |

### 22. Caffeinate 咖啡因追踪器组件

追踪咖啡因摄入水平，支持添加饮品记录和半衰期衰减可视化。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/caffeinate.css">

<div id="caffeinate"></div>

<script src="js/caffeinate.js"></script>
<script>
  const caffeinate = new NothingCaffeinate(document.getElementById('caffeinate'), {
    level: 120,
    maxLevel: 400,
    halfLifeHours: 5,
    drinks: [
      { name: 'Espresso', mg: 63, time: '08:30' },
      { name: 'Latte', mg: 95, time: '11:00' }
    ]
  });

  caffeinate.onAddDrink((drink) => console.log('Drink added:', drink));
</script>
```

#### React

```tsx
import Caffeinate from './components/Caffeinate'

<Caffeinate
  level={120}
  maxLevel={400}
  halfLifeHours={5}
  drinks={[
    { name: 'Espresso', mg: 63, time: '08:30' },
    { name: 'Latte', mg: 95, time: '11:00' }
  ]}
  onAddDrink={(drink) => console.log(drink)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| level | number | 0 | 当前咖啡因水平 (mg) |
| maxLevel | number | 400 | 每日建议上限 (mg) |
| halfLifeHours | number | 5 | 半衰期（小时） |
| drinks | Array<{name, mg, time}> | [] | 饮品记录数组 |
| onAddDrink | function | noop | 添加饮品回调 |

### 23. Clipboard 剪贴板管理器组件

显示最近复制记录，支持点击复制和删除操作。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/clipboard.css">

<div id="clipboard"></div>

<script src="js/clipboard.js"></script>
<script>
  const clipboard = new NothingClipboard(document.getElementById('clipboard'), {
    entries: [
      { id: '1', text: 'Hello World', copiedAt: '14:32' },
      { id: '2', text: 'npm install', copiedAt: '14:28' },
      { id: '3', text: 'https://example.com', copiedAt: '14:15' }
    ],
    maxEntries: 10
  });

  clipboard.onCopy((entry) => console.log('Copied:', entry));
  clipboard.onDelete((id) => console.log('Deleted:', id));
</script>
```

#### React

```tsx
import Clipboard from './components/Clipboard'

<Clipboard
  entries={[
    { id: '1', text: 'Hello World', copiedAt: '14:32' },
    { id: '2', text: 'npm install', copiedAt: '14:28' }
  ]}
  maxEntries={10}
  onCopy={(entry) => console.log(entry)}
  onDelete={(id) => console.log(id)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| entries | Array<{id, text, copiedAt}> | [] | 剪贴板记录数组 |
| maxEntries | number | 10 | 最大记录数 |
| onCopy | function | noop | 点击复制回调 |
| onDelete | function | noop | 删除记录回调 |

### 24. Pomodoro 番茄钟组件

25 分钟工作 / 5 分钟休息循环计时器，带分段进度条显示。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/pomodoro.css">

<div id="pomodoro"></div>

<script src="js/pomodoro.js"></script>
<script>
  const pomodoro = new NothingPomodoro(document.getElementById('pomodoro'), {
    workMinutes: 25,
    breakMinutes: 5,
    totalRounds: 4,
    currentRound: 1,
    isRunning: false,
    isBreak: false,
    remainingSeconds: 1500
  });

  pomodoro.onStart(() => console.log('Timer started'));
  pomodoro.onPause(() => console.log('Timer paused'));
  pomodoro.onRoundComplete((round) => console.log('Round complete:', round));
  pomodoro.onAllComplete(() => console.log('All rounds complete'));
</script>
```

#### React

```tsx
import Pomodoro from './components/Pomodoro'

<Pomodoro
  workMinutes={25}
  breakMinutes={5}
  totalRounds={4}
  currentRound={1}
  isRunning={false}
  isBreak={false}
  remainingSeconds={1500}
  onStart={() => {}}
  onPause={() => {}}
  onRoundComplete={(round) => console.log(round)}
  onAllComplete={() => {}}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| workMinutes | number | 25 | 工作时长（分钟） |
| breakMinutes | number | 5 | 休息时长（分钟） |
| totalRounds | number | 4 | 总轮数 |
| currentRound | number | 1 | 当前轮数 |
| isRunning | boolean | false | 是否正在运行 |
| isBreak | boolean | false | 是否处于休息阶段 |
| remainingSeconds | number | 1500 | 剩余秒数 |
| onStart | function | noop | 开始回调 |
| onPause | function | noop | 暂停回调 |
| onRoundComplete | function | noop | 单轮完成回调 |
| onAllComplete | function | noop | 全部完成回调 |

### 25. WalkieTalkie 对讲机组件

对讲机风格 PTT（Push-To-Talk）按钮，带脉冲动画反馈。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/walkie-talkie.css">

<div id="walkieTalkie"></div>

<script src="js/walkie-talkie.js"></script>
<script>
  const walkieTalkie = new NothingWalkieTalkie(document.getElementById('walkieTalkie'), {
    channel: 'CHANNEL 1',
    isTransmitting: false,
    status: 'standby'
  });

  walkieTalkie.onPressStart(() => console.log('PTT pressed'));
  walkieTalkie.onPressEnd(() => console.log('PTT released'));
</script>
```

#### React

```tsx
import WalkieTalkie from './components/WalkieTalkie'

<WalkieTalkie
  channel="CHANNEL 1"
  isTransmitting={false}
  status="standby"
  onPressStart={() => console.log('PTT pressed')}
  onPressEnd={() => console.log('PTT released')}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| channel | string | 'CHANNEL 1' | 当前频道名称 |
| isTransmitting | boolean | false | 是否正在发送 |
| status | 'standby' \| 'transmitting' \| 'receiving' | 'standby' | 当前状态 |
| onPressStart | function | noop | PTT 按下回调 |
| onPressEnd | function | noop | PTT 释放回调 |

### 26. SunDial 日出日落追踪器组件

弧形 SVG 日照轨迹，显示太阳当前位置和日出日落时间。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/sun-dial.css">

<div id="sunDial"></div>

<script src="js/sun-dial.js"></script>
<script>
  const sunDial = new NothingSunDial(document.getElementById('sunDial'), {
    sunrise: '06:12',
    sunset: '19:48',
    currentTime: '12:30',
    latitude: 39.9,
    longitude: 116.4
  });
</script>
```

#### React

```tsx
import SunDial from './components/SunDial'

<SunDial
  sunrise="06:12"
  sunset="19:48"
  currentTime="12:30"
  latitude={39.9}
  longitude={116.4}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| sunrise | string | '06:00' | 日出时间 (HH:mm) |
| sunset | string | '18:00' | 日落时间 (HH:mm) |
| currentTime | string | '' | 当前时间 (HH:mm) |
| latitude | number | 0 | 纬度 |
| longitude | number | 0 | 经度 |

### 27. AgeMotion 生命进度可视化组件

输入出生日期，以分段进度条显示生命各阶段进度。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/age-motion.css">

<div id="ageMotion"></div>

<script src="js/age-motion.js"></script>
<script>
  const ageMotion = new NothingAgeMotion(document.getElementById('ageMotion'), {
    birthDate: '1995-06-15',
    lifeExpectancy: 80,
    segments: [
      { label: 'CHILDHOOD', start: 0, end: 12 },
      { label: 'ADOLESCENCE', start: 12, end: 18 },
      { label: 'YOUNG ADULT', start: 18, end: 30 },
      { label: 'ADULT', start: 30, end: 50 },
      { label: 'MIDDLE AGE', start: 50, end: 65 },
      { label: 'SENIOR', start: 65, end: 80 }
    ]
  });
</script>
```

#### React

```tsx
import AgeMotion from './components/AgeMotion'

<AgeMotion
  birthDate="1995-06-15"
  lifeExpectancy={80}
  segments={[
    { label: 'CHILDHOOD', start: 0, end: 12 },
    { label: 'ADOLESCENCE', start: 12, end: 18 },
    { label: 'YOUNG ADULT', start: 18, end: 30 },
    { label: 'ADULT', start: 30, end: 50 },
    { label: 'MIDDLE AGE', start: 50, end: 65 },
    { label: 'SENIOR', start: 65, end: 80 }
  ]}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| birthDate | string | '' | 出生日期 (YYYY-MM-DD) |
| lifeExpectancy | number | 80 | 预期寿命（年） |
| segments | Array<{label, start, end}> | [] | 生命阶段分段数组 |

### 28. Chrono 秒表组件

秒表/计时器，支持 LAP 圈数记录。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/chrono.css">

<div id="chrono"></div>

<script src="js/chrono.js"></script>
<script>
  const chrono = new NothingChrono(document.getElementById('chrono'), {
    elapsedMs: 0,
    isRunning: false,
    laps: []
  });

  chrono.onStart(() => console.log('Started'));
  chrono.onPause(() => console.log('Paused'));
  chrono.onLap((lap) => console.log('Lap:', lap));
  chrono.onReset(() => console.log('Reset'));
</script>
```

#### React

```tsx
import Chrono from './components/Chrono'

<Chrono
  elapsedMs={0}
  isRunning={false}
  laps={[]}
  onStart={() => {}}
  onPause={() => {}}
  onLap={(lap) => console.log(lap)}
  onReset={() => {}}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| elapsedMs | number | 0 | 已过毫秒数 |
| isRunning | boolean | false | 是否正在运行 |
| laps | Array<{number, time, delta}> | [] | 圈数记录数组 |
| onStart | function | noop | 开始回调 |
| onPause | function | noop | 暂停回调 |
| onLap | function | noop | 记圈回调 |
| onReset | function | noop | 重置回调 |

### 29. Spinner 决策转盘组件

决策转盘，带旋转动画和随机选中效果。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/spinner.css">

<div id="spinner"></div>

<script src="js/spinner.js"></script>
<script>
  const spinner = new NothingSpinner(document.getElementById('spinner'), {
    options: ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F'],
    isSpinning: false,
    selectedIndex: -1
  });

  spinner.onSpinStart(() => console.log('Spinning...'));
  spinner.onSpinEnd((index) => console.log('Selected:', index));
</script>
```

#### React

```tsx
import Spinner from './components/Spinner'

<Spinner
  options={['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F']}
  isSpinning={false}
  selectedIndex={-1}
  onSpinStart={() => {}}
  onSpinEnd={(index) => console.log(index)}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| options | string[] | [] | 选项数组 (3-12 项) |
| isSpinning | boolean | false | 是否正在旋转 |
| selectedIndex | number | -1 | 当前选中索引 (-1 表示无) |
| onSpinStart | function | noop | 旋转开始回调 |
| onSpinEnd | function | noop | 旋转结束回调，参数为选中索引 |

### 30. WorldClock 世界时钟组件

多时区世界时钟，带日/夜指示。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/world-clock.css">

<div id="worldClock"></div>

<script src="js/world-clock.js"></script>
<script>
  const worldClock = new NothingWorldClock(document.getElementById('worldClock'), {
    timezones: [
      { city: 'BEIJING', offset: 8 },
      { city: 'TOKYO', offset: 9 },
      { city: 'LONDON', offset: 0 },
      { city: 'NEW YORK', offset: -5 }
    ],
    showSeconds: true
  });
</script>
```

#### React

```tsx
import WorldClock from './components/WorldClock'

<WorldClock
  timezones={[
    { city: 'BEIJING', offset: 8 },
    { city: 'TOKYO', offset: 9 },
    { city: 'LONDON', offset: 0 },
    { city: 'NEW YORK', offset: -5 }
  ]}
  showSeconds={true}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timezones | Array<{city, offset}> | [] | 时区数组（城市名和 UTC 偏移量） |
| showSeconds | boolean | false | 是否显示秒数 |

### 31. Date 日期组件

日期显示组件，支持矩形卡片和圆形双圈两种变体。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/date.css">

<div id="dateWidget"></div>

<script src="js/date.js"></script>
<script>
  const dateWidget = new NothingDate(document.getElementById('dateWidget'), {
    type: 'rect',
    theme: 'dark'
  });
</script>
```

#### React

```tsx
import DateWidget from './components/Date'

<DateWidget type="rect" theme="dark" />
<DateWidget type="dual-ring" theme="light" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'rect' \| 'dual-ring' | 'rect' | 日期组件变体 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| updateInterval | number | 60000 | 更新间隔（毫秒） |

### 32. NextEvent 日历事件组件

日历事件组件，显示下一个日历事件。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/next-event.css">

<div id="nextEventWidget"></div>

<script src="js/next-event.js"></script>
<script>
  const nextEventWidget = new NothingNextEvent(document.getElementById('nextEventWidget'), {
    theme: 'dark',
    event: { title: 'Team Meeting', date: 19, month: 'MAY' }
  });
</script>
```

#### React

```tsx
import NextEvent from './components/NextEvent'

<NextEvent theme="dark" event={{ title: 'Team Meeting', date: 19, month: 'MAY' }} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| event | { title: string; date: number; month: string } | - | 事件数据 |

### 33. Quotes 名言组件

名言显示组件，圆形双圈布局，支持自动轮播。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/quotes.css">

<div id="quotesWidget"></div>

<script src="js/quotes.js"></script>
<script>
  const quotesWidget = new NothingQuotes(document.getElementById('quotesWidget'), {
    theme: 'dark',
    quotes: [{ text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' }],
    interval: 300000
  });
</script>
```

#### React

```tsx
import Quotes from './components/Quotes'

<Quotes theme="dark" quotes={[{ text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' }]} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| quotes | { text: string; author: string }[] | [] | 名言列表 |
| interval | number | 300000 | 轮播间隔（毫秒） |

### 34. Taskbar 任务栏组件

水平任务栏组件，包含搜索栏、应用快捷方式和时间显示。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/taskbar.css">

<div id="taskbarWidget"></div>

<script src="js/taskbar.js"></script>
<script>
  const taskbarWidget = new NothingTaskbar(document.getElementById('taskbarWidget'), {
    theme: 'dark',
    apps: [{ name: 'Explorer', icon: 'path/to/icon.svg' }]
  });
</script>
```

#### React

```tsx
import Taskbar from './components/Taskbar'

<Taskbar theme="dark" apps={[{ name: 'Explorer', icon: 'path/to/icon.svg' }]} />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| apps | { name: string; icon?: string; onClick?: () => void }[] | [] | 应用列表 |
| showSearch | boolean | true | 显示搜索栏 |
| showTime | boolean | true | 显示时间 |
| showBattery | boolean | true | 显示电池 |
| fixed | boolean | false | 固定定位 |

## Nothing Widgets 2.0

新一代 Nothing 风格小组件，提供点阵可视化、快捷开关、信息卡片、网格布局及多种功能型 Widget。

### 1. DotMatrix 点阵组件

点阵可视化组件，支持网格、字形和自定义图案模式。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/dot-matrix.css">

<div id="dotMatrix"></div>

<script src="js/dot-matrix.js"></script>
<script>
  const dotMatrix = new NothingDotMatrix(document.getElementById('dotMatrix'), {
    rows: 8,
    cols: 8,
    dotSize: 'sm',
    theme: 'dark'
  });
</script>
```

#### React

```tsx
import DotMatrix from './components/DotMatrix'

<DotMatrix rows={8} cols={8} dotSize="sm" theme="dark" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| rows | number | 8 | 行数 |
| cols | number | 8 | 列数 |
| dotSize | 'sm' \| 'md' \| 'lg' | 'sm' | 点阵尺寸 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| pattern | 'grid' \| 'glyph' \| 'custom' | 'grid' | 图案模式 |
| activeDots | number[] | [] | 激活点索引数组 |
| dimDots | number[] | [] | 暗淡点索引数组 |

### 2. QuickToggle 快捷开关组件

快捷设置开关，支持圆形和药丸形变体。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/quick-toggle.css">

<div id="quickToggle"></div>

<script src="js/quick-toggle.js"></script>
<script>
  const quickToggle = new NothingQuickToggle(document.getElementById('quickToggle'), {
    variant: 'circle',
    theme: 'light',
    label: 'Active'
  });

  quickToggle.onClick((active) => console.log('Toggle:', active));
</script>
```

#### React

```tsx
import QuickToggle from './components/QuickToggle'

<QuickToggle variant="circle" theme="light" label="Active" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'circle' \| 'pill' | 'circle' | 开关变体 |
| theme | 'light' \| 'dark' \| 'accent' | 'light' | 主题模式 |
| icon | string | '' | 图标标识 |
| label | string | '' | 标签文本 |
| active | boolean | false | 是否激活 |
| onClick | function | noop | 点击回调 |

### 3. WidgetCard 信息卡片组件

信息卡片容器，支持方形和宽幅尺寸。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/widget-card.css">

<div id="widgetCard"></div>

<script src="js/widget-card.js"></script>
<script>
  const widgetCard = new NothingWidgetCard(document.getElementById('widgetCard'), {
    size: 'square',
    theme: 'dark',
    title: 'Total Steps',
    value: '5,543'
  });
</script>
```

#### React

```tsx
import WidgetCard from './components/WidgetCard'

<WidgetCard size="square" theme="dark" title="Total Steps" value="5,543" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | 'square' \| 'wide' | 'square' | 卡片尺寸 |
| theme | 'light' \| 'dark' \| 'accent' | 'dark' | 主题模式 |
| title | string | '' | 卡片标题 |
| value | string | '' | 主要数值 |
| subtitle | string | '' | 副标题 |
| children | ReactNode | null | 卡片内容 (React only) |

### 4. WidgetGrid 网格布局组件

Widget 网格布局容器，支持密集和紧凑模式。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/widget-grid.css">

<div id="widgetGrid"></div>

<script src="js/widget-grid.js"></script>
<script>
  const widgetGrid = new NothingWidgetGrid(document.getElementById('widgetGrid'), {
    dense: true
  });
</script>
```

#### React

```tsx
import WidgetGrid from './components/WidgetGrid'
import WidgetCard from './components/WidgetCard'

<WidgetGrid dense>
  <WidgetCard size="square" theme="dark" title="Total Steps" value="5,543" />
</WidgetGrid>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dense | boolean | false | 是否使用密集布局 |
| compact | boolean | false | 是否使用紧凑布局 |
| className | string | '' | 自定义类名 |
| children | ReactNode | null | 网格子元素 (React only) |

### 5. WeatherWidget 天气组件

天气信息展示，支持方形和宽幅变体。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/weather-widget.css">

<div id="weatherWidget"></div>

<script src="js/weather-widget.js"></script>
<script>
  const weatherWidget = new NothingWeatherWidget(document.getElementById('weatherWidget'), {
    temp: 22,
    hi: 26,
    lo: 18,
    city: 'Shanghai',
    condition: 'Partly Cloudy',
    forecast: [
      { day: 'Mon', hi: 25, lo: 17 },
      { day: 'Tue', hi: 23, lo: 16 },
      { day: 'Wed', hi: 27, lo: 19 }
    ],
    variant: 'square'
  });
</script>
```

#### React

```tsx
import WeatherWidget from './components/WeatherWidget'

<WeatherWidget
  temp={22}
  hi={26}
  lo={18}
  city="Shanghai"
  condition="Partly Cloudy"
  forecast={[
    { day: 'Mon', hi: 25, lo: 17 },
    { day: 'Tue', hi: 23, lo: 16 },
    { day: 'Wed', hi: 27, lo: 19 }
  ]}
  variant="square"
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| temp | number | 0 | 当前温度 |
| hi | number | 0 | 最高温度 |
| lo | number | 0 | 最低温度 |
| city | string | '' | 城市名称 |
| condition | string | '' | 天气状况描述 |
| forecast | Array<{day, hi, lo}> | [] | 未来天气预报数组 |
| variant | 'square' \| 'wide' | 'square' | 组件变体 |

### 6. StepsWidget 步数组件

步数计数器，支持连续天数显示。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/steps-widget.css">

<div id="stepsWidget"></div>

<script src="js/steps-widget.js"></script>
<script>
  const stepsWidget = new NothingStepsWidget(document.getElementById('stepsWidget'), {
    steps: 5543,
    streak: 5,
    streakUnit: 'days'
  });
</script>
```

#### React

```tsx
import StepsWidget from './components/StepsWidget'

<StepsWidget steps={5543} streak={5} streakUnit="days" />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| steps | number | 0 | 当前步数 |
| streak | number | 0 | 连续天数 |
| streakUnit | string | 'days' | 连续单位文本 |

### 7. ActivityWidget 活动追踪组件

活动追踪器，显示每日活动值和标记点。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/activity-widget.css">

<div id="activityWidget"></div>

<script src="js/activity-widget.js"></script>
<script>
  const activityWidget = new NothingActivityWidget(document.getElementById('activityWidget'), {
    days: [
      { label: 'Mon', value: 45, markers: [1, 3] },
      { label: 'Tue', value: 72, markers: [2] },
      { label: 'Wed', value: 30, markers: [] },
      { label: 'Thu', value: 88, markers: [1, 2, 4] },
      { label: 'Fri', value: 55, markers: [3] }
    ]
  });
</script>
```

#### React

```tsx
import ActivityWidget from './components/ActivityWidget'

<ActivityWidget
  days={[
    { label: 'Mon', value: 45, markers: [1, 3] },
    { label: 'Tue', value: 72, markers: [2] },
    { label: 'Wed', value: 30, markers: [] },
    { label: 'Thu', value: 88, markers: [1, 2, 4] },
    { label: 'Fri', value: 55, markers: [3] }
  ]}
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| days | Array<{label, value, markers: number[]}> | [] | 每日活动数据数组 |

### 8. CompassWidget 指南针组件

指南针组件，显示方向和角度。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/compass-widget.css">

<div id="compassWidget"></div>

<script src="js/compass-widget.js"></script>
<script>
  const compassWidget = new NothingCompassWidget(document.getElementById('compassWidget'), {
    heading: 135,
    showDots: true
  });
</script>
```

#### React

```tsx
import CompassWidget from './components/CompassWidget'

<CompassWidget heading={135} showDots />
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| heading | number | 0 | 朝向角度（度） |
| showDots | boolean | false | 是否显示点阵装饰 |

### 9. TimeWidget 时间组件

时间显示变体组件，支持多种展示模式。

#### Vanilla JavaScript

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/time-widget.css">

<div id="timeWidget"></div>

<script src="js/time-widget.js"></script>
<script>
  const timeWidget = new NothingTimeWidget(document.getElementById('timeWidget'), {
    variant: 'over-limit',
    label: 'SCREEN TIME',
    value: '8h 32m',
    unit: 'today',
    subtitle: '2h over average'
  });
</script>
```

#### React

```tsx
import TimeWidget from './components/TimeWidget'

<TimeWidget
  variant="over-limit"
  label="SCREEN TIME"
  value="8h 32m"
  unit="today"
  subtitle="2h over average"
/>
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'over-limit' \| 'over-limit-accent' \| 'total-time' \| 'recording' \| 'date' | 'total-time' | 显示变体 |
| label | string | '' | 标签文本 |
| value | string | '' | 主要数值 |
| unit | string | '' | 单位文本 |
| subtitle | string | '' | 副标题 |

## 演示

### Vanilla JavaScript 演示

打开 `vanilla/index.html` 查看所有组件的演示。

### React 演示

```bash
cd react
npm install
npm run dev
```

访问 http://localhost:5173 查看演示。

## 设计 Tokens

所有组件使用统一的设计 tokens，定义在 `css/tokens.css` 中。

### 颜色

| 变量名 | 说明 |
|--------|------|
| --black | 背景色 |
| --surface | 表面色 |
| --surface-raised | 凸起表面色 |
| --border | 边框色 |
| --text-display | 显示文本色 |
| --text-primary | 主文本色 |
| --text-secondary | 次要文本色 |
| --text-disabled | 禁用文本色 |
| --accent | 强调色 |
| --success | 成功色 |
| --warning | 警告色 |
| --error | 错误色 |

### 字体大小

| 变量名 | 大小 |
|--------|------|
| --display-xl | 72px |
| --display-lg | 48px |
| --display-md | 36px |
| --heading | 24px |
| --subheading | 18px |
| --body | 16px |
| --caption | 12px |

### 间距

| 变量名 | 大小 |
|--------|------|
| --space-2xs | 2px |
| --space-xs | 4px |
| --space-sm | 8px |
| --space-md | 16px |
| --space-lg | 24px |
| --space-xl | 32px |
| --space-2xl | 48px |
| --space-3xl | 64px |

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT License
