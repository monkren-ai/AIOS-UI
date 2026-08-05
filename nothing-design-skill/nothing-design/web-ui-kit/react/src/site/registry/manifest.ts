import type { Bilingual, ComponentStatus } from './types'
import { CATEGORIES } from './categories'

/**
 * 组件目录的轻量清单。
 *
 * 侧栏、搜索索引、目录页只需要这几个字段，而完整的 `ComponentDoc` 里挂着
 * 示例组件和 `?raw` 源码字符串 —— 一旦被静态引用，整套示例（连同它们
 * import 的图标库）就会挤进首屏 chunk。所以元数据放这里，正文按 slug 懒加载。
 *
 * 新增组件页：在这里加一条，并在 `entries/` 下建同名文件。
 */
export interface ComponentManifestEntry {
  slug: string
  name: string
  category: string
  description: Bilingual
  status?: ComponentStatus
}

const ENTRIES: ComponentManifestEntry[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '触发动作的按钮，提供七种视觉样式与三档尺寸。',
      en: 'A clickable button for actions, in seven styles and three sizes.',
    },
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '单行文本输入框，支持前后缀、尺寸与错误态。',
      en: 'A single-line text field with addons, sizes, and an error state.',
    },
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '多行文本输入，可随内容自动增高。',
      en: 'A multi-line text field that can grow with its content.',
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '勾选框，支持选中、未选与中间态。',
      en: 'A checkbox with checked, unchecked, and indeterminate states.',
    },
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '一组互斥选项，方向键在组内移动焦点。',
      en: 'A set of mutually exclusive options, navigated with the arrow keys.',
    },
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '开关，用于立即生效的二元设置。',
      en: 'A toggle for binary settings that take effect immediately.',
    },
  },
  {
    slug: 'slider',
    name: 'Slider',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '在连续区间内拖动取值，单滑块。',
      en: 'Drag to pick a value from a continuous range. Single thumb.',
    },
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '可保持按下状态的按钮，适合工具栏开关。',
      en: 'A button that stays pressed — for toolbar-style on/off controls.',
    },
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '从一组选项里挑一个，带可搜索的浮层列表。',
      en: 'Choose one option from a list, in a searchable popup.',
    },
  },
  {
    slug: 'label',
    name: 'Label',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '表单标签，点击时把焦点交给关联控件。',
      en: 'A form label that hands focus to the control it names.',
    },
  },
  {
    slug: 'checkbox-group',
    name: 'CheckboxGroup',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '一组复选项，横竖排列，相邻的选中项会连成一片背景。',
      en: 'A set of checkboxes, in a row or a column, whose selected neighbours merge into one block.',
    },
  },
  {
    slug: 'color-picker',
    name: 'ColorPicker',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '预设色板取色，也可以打开系统取色器或直接敲十六进制。',
      en: 'Pick from swatches, open the native picker, or just type a hex value.',
    },
  },
  {
    slug: 'form',
    name: 'Form',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '表单容器，拦下浏览器默认提交并统一字段间距。',
      en: 'A form wrapper that swallows the browser submit and sets the spacing between fields.',
    },
  },
  {
    slug: 'input-copy',
    name: 'InputCopy',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '只读输入框配复制按钮，复制后短暂显示回执。',
      en: 'A read-only field with a copy button that confirms for a moment afterwards.',
    },
  },
  {
    slug: 'input-message',
    name: 'InputMessage',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '消息输入框，随内容增高，回车发送并统计字数。',
      en: 'A message composer that grows with the text, sends on Enter, and counts characters.',
    },
  },
  {
    slug: 'input-otp',
    name: 'InputOTP',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '验证码输入，一格一位，处理粘贴与退格回退。',
      en: 'A one-time-code field of single-character slots, with paste and backspace handled.',
    },
  },
  {
    slug: 'quick-toggle',
    name: 'QuickToggle',
    category: 'actions-inputs',
    status: 'stable',
    description: {
      zh: '控制中心风格的图标开关，圆形或方形两种外形。',
      en: 'A control-centre style icon toggle, either round or square.',
    },
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '内容容器，提供留白、边框与分区插槽。',
      en: 'A content container with padding, a border, and section slots.',
    },
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '短标记，用于状态、计数与分类。',
      en: 'A compact marker for statuses, counts, and categories.',
    },
  },
  {
    slug: 'tag',
    name: 'Tag',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '可移除的标签，常用于筛选条件与关键词。',
      en: 'A removable chip, typically for filters and keywords.',
    },
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '头像，图片加载失败时回退到首字母。',
      en: 'A user avatar that falls back to initials when the image fails.',
    },
  },
  {
    slug: 'separator',
    name: 'Separator',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '分隔线，可横可竖，支持嵌入标签。',
      en: 'A divider, horizontal or vertical, optionally with a label.',
    },
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '键位标记，用于展示快捷键。',
      en: 'A key cap for rendering keyboard shortcuts.',
    },
  },
  {
    slug: 'aspect-ratio',
    name: 'AspectRatio',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '把容器锁在给定的宽高比上。',
      en: 'Pins a container to a given width-to-height ratio.',
    },
  },
  {
    slug: 'data-table',
    name: 'DataTable',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '表格的统一入口，提供静态表格、可排序网格与标签值行三种形态。',
      en: 'One table component in three shapes: static table, sortable grid, and label/value rows.',
    },
  },
  {
    slug: 'resizable',
    name: 'Resizable',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '分栏容器，拖动中间的把手改变各栏占比，横竖皆可。',
      en: 'Split panes with a draggable divider between them, horizontal or vertical.',
    },
  },
  {
    slug: 'surfaces',
    name: 'Surfaces',
    category: 'data-display',
    status: 'stable',
    description: {
      zh: '层级容器，用背景与边框而不是阴影来表达高度。',
      en: 'An elevation container that reads as depth through background and border, never shadow.',
    },
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '面包屑，展示当前位置在层级中的路径。',
      en: 'A trail showing where the current page sits in the hierarchy.',
    },
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'feedback',
    status: 'stable',
    description: {
      zh: '成块的提示信息，分中性与警示两档。',
      en: 'A block-level message, in a neutral and an alarming tone.',
    },
  },
  {
    slug: 'error-boundary',
    name: 'ErrorBoundary',
    category: 'feedback',
    status: 'stable',
    description: {
      zh: '接住子树里抛出的渲染错误，换成一屏可重试的错误提示。',
      en: 'Catches render errors from the tree below it and swaps in a retryable error screen.',
    },
  },
  {
    slug: 'states',
    name: 'States',
    category: 'feedback',
    status: 'stable',
    description: {
      zh: '加载、错误、空、不可用四种整块占位状态。',
      en: 'Four block-level placeholders: loading, error, empty, and unavailable.',
    },
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'decoration',
    status: 'stable',
    description: {
      zh: '随机决策转盘 —— 不是加载指示器，找加载态请看 Button 的 loading 与 ProgressBar。',
      en: 'A random-decision wheel — not a loading indicator. For those, see Button’s loading state and ProgressBar.',
    },
  },
  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    category: 'feedback',
    status: 'stable',
    description: {
      zh: '进度条，支持确定进度与不确定进度两种模式。',
      en: 'A progress bar, in both determinate and indeterminate modes.',
    },
  },
  {
    slug: 'modal',
    name: 'Modal',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '模态对话框，打开时锁定焦点并接管页面。',
      en: 'A modal dialog that traps focus and takes over the page while open.',
    },
  },
  {
    slug: 'popover',
    name: 'Popover',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '锚定在触发元素上的浮层，可放置任意交互内容。',
      en: 'A panel anchored to its trigger, for any interactive content.',
    },
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '悬停或聚焦时出现的简短说明。',
      en: 'A short hint shown on hover or focus.',
    },
  },
  {
    slug: 'hover-card',
    name: 'HoverCard',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '悬停展开的预览卡片，比 Tooltip 承载更多内容。',
      en: 'A hover-triggered preview card, for more content than a tooltip holds.',
    },
  },
  {
    slug: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '由按钮触发的菜单，支持分组、勾选项与子菜单。',
      en: 'A button-triggered menu with groups, checkable items, and submenus.',
    },
  },
  {
    slug: 'context-menu',
    name: 'ContextMenu',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '右键唤起的菜单，落点跟随指针。',
      en: 'A right-click menu that opens at the pointer.',
    },
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    category: 'overlays',
    status: 'stable',
    description: {
      zh: '从屏幕边缘滑出的抽屉，四个方向都支持。',
      en: 'A drawer that slides in from any of the four screen edges.',
    },
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '标签页，在同一区域切换多组内容。',
      en: 'Tabs for swapping between panels in the same space.',
    },
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '分页控件，用于翻阅长列表。',
      en: 'Page controls for stepping through a long list.',
    },
  },
  {
    slug: 'navigation-menu',
    name: 'NavigationMenu',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '带下拉面板的主导航。',
      en: 'A primary navigation bar with dropdown panels.',
    },
  },
  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '分段控件，在少量互斥选项间切换。',
      en: 'A segmented switch across a small set of mutually exclusive options.',
    },
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '可折叠的分区列表，支持单开与多开。',
      en: 'A list of collapsible sections, single- or multi-open.',
    },
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '单个可展开区域，Accordion 的基础件。',
      en: 'A single expandable region — the primitive behind Accordion.',
    },
  },
  {
    slug: 'scroll-area',
    name: 'ScrollArea',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '自定义滚动条的滚动容器，跨浏览器表现一致。',
      en: 'A scroll container with custom scrollbars that look the same everywhere.',
    },
  },
  {
    slug: 'command',
    name: 'Command',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '命令面板，输入即筛选，方向键选中、回车执行。',
      en: 'A command palette: type to filter, arrow keys to move, Enter to run.',
    },
  },
  {
    slug: 'date-nav',
    name: 'DateNav',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '月份步进器，两侧箭头翻月，中间显示当前月份。',
      en: 'A month stepper — arrows on either side of the month you are looking at.',
    },
  },
  {
    slug: 'navigation',
    name: 'Navigation',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '横向导航条，指示条滑向选中项，并与 URL hash 双向同步。',
      en: 'A horizontal nav bar whose indicator slides to the active item and tracks the URL hash.',
    },
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    category: 'navigation',
    status: 'stable',
    description: {
      zh: '侧边导航，可折叠成一列图标，条目支持角标。',
      en: 'A side nav that collapses down to icons, with badges on its items.',
    },
  },
  {
    slug: 'age-motion',
    name: 'AgeMotion',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '填入出生日期，年月日逐秒累加，并按十年一段标出人生进度。',
      en: 'Enter a birth date and watch the years, months, and days tick up, decade by decade.',
    },
  },
  {
    slug: 'battery',
    name: 'Battery',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '电量读数，分段条或圆环两种画法，可附外设电量列表。',
      en: 'A battery readout as a segment bar or a ring, with an optional list of peripherals.',
    },
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '只读日历，紧凑版突出今天，完整版给出可翻月的整月网格。',
      en: 'A read-only calendar: compact highlights today, full shows a month grid you can page.',
    },
  },
  {
    slug: 'chrono',
    name: 'Chrono',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '秒表，精确到百分之一秒，可记圈并标出最快与最慢的一圈。',
      en: 'A stopwatch down to hundredths, with laps and the fastest and slowest ones marked.',
    },
  },
  {
    slug: 'date',
    name: 'DateWidget',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '日期卡片，三种版型：方块配当日进度环、双环、以及衬线撕页。',
      en: 'A date card in three looks: block with a day-progress ring, dual ring, or serif tear-off.',
    },
  },
  {
    slug: 'next-event',
    name: 'NextEvent',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '单行的下一个日程，给出日期与倒计时，临近时自动升为高优先级。',
      en: 'A one-line next-up event with a countdown that turns urgent as the time closes in.',
    },
  },
  {
    slug: 'pomodoro',
    name: 'Pomodoro',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '番茄钟，工作与休息自动交替，并累计已完成的轮数。',
      en: 'A pomodoro timer that flips between work and break, counting the rounds you finish.',
    },
  },
  {
    slug: 'sun-dial',
    name: 'SunDial',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '日出日落弧线，按经纬度算出太阳位置与剩余日照时长。',
      en: 'A sunrise-to-sunset arc that places the sun by latitude and counts the daylight left.',
    },
  },
  {
    slug: 'system-monitor',
    name: 'SystemMonitor',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: 'CPU、内存、存储、网络与电量的分段读数面板。',
      en: 'Segmented readouts for CPU, RAM, storage, network, and battery.',
    },
  },
  {
    slug: 'taskbar',
    name: 'Taskbar',
    category: 'time-system',
    status: 'stable',
    description: {
      zh: '桌面任务栏：开始、搜索、应用区，右侧是时钟与电量托盘。',
      en: 'A desktop taskbar — start, search, app slots, and a clock-and-battery tray on the end.',
    },
  },
  {
    slug: 'caffeinate',
    name: 'Caffeinate',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '记录每杯饮品，按半衰期推算此刻体内还剩多少咖啡因。',
      en: 'Log each drink and see how much caffeine is left in you, decaying by half-life.',
    },
  },
  {
    slug: 'clipboard',
    name: 'Clipboard',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '剪贴板历史，点条目即可重新复制，也能逐条删除或清空。',
      en: 'Clipboard history — click an entry to copy it again, or drop entries and clear the list.',
    },
  },
  {
    slug: 'music-player',
    name: 'MusicPlayer',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '播放器，分完整卡片、窄条与迷你磁贴三种版型。',
      en: 'A music player in three layouts: full card, compact strip, and mini tile.',
    },
  },
  {
    slug: 'photo-carousel',
    name: 'PhotoCarousel',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '图片轮播，可自动播放；用户偏好降低动效时只保留手动翻页。',
      en: 'An image carousel that autoplays — unless the user asked for reduced motion.',
    },
  },
  {
    slug: 'quotes',
    name: 'Quotes',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '定时轮换的引言卡片，外圈的环表示走到了第几条。',
      en: 'A quote card that rotates on a timer, ringed by how far through the set it is.',
    },
  },
  {
    slug: 'walkie-talkie',
    name: 'WalkieTalkie',
    category: 'widgets',
    status: 'stable',
    description: {
      zh: '对讲机，可切频道，按住发话键期间录制麦克风。',
      en: 'A push-to-talk radio with channel stepping; holding the key records from the mic.',
    },
  },
  {
    slug: 'agent',
    name: 'Agent',
    category: 'agent',
    status: 'stable',
    description: {
      zh: 'AgentOrb、PlanCard、ThinkingSteps 等七件 Agent 流程组件的合集。',
      en: 'Seven pieces for agent workflows — AgentOrb, PlanCard, ThinkingSteps, and the rest.',
    },
  },
  {
    slug: 'ask-user-questions',
    name: 'AskUserQuestions',
    category: 'agent',
    status: 'stable',
    description: {
      zh: '分步问卷，用来向用户追问文本、单选、多选与确认。',
      en: 'A stepped question form for asking the user for text, choices, or a yes/no.',
    },
  },
  {
    slug: 'conversation',
    name: 'Conversation',
    category: 'agent',
    status: 'stable',
    description: {
      zh: 'Bubble、Sender、Prompts 等六件对话式界面组件的合集。',
      en: 'Six pieces for conversational interfaces — Bubble, Sender, Prompts, and the rest.',
    },
  },
  {
    slug: 'dot-matrix',
    name: 'DotMatrix',
    category: 'decoration',
    status: 'stable',
    description: {
      zh: '点阵网格，按坐标点亮或调暗其中的单个点。',
      en: 'A grid of dots, lit or dimmed one coordinate at a time.',
    },
  },
]

export const COMPONENT_MANIFEST = ENTRIES.sort((a, b) => a.name.localeCompare(b.name))

export const COMPONENT_MANIFEST_BY_SLUG = new Map(
  COMPONENT_MANIFEST.map((entry) => [entry.slug, entry]),
)

/** 按分类分组，保持 `CATEGORIES` 的顺序，并丢掉当前为空的分类。 */
export function groupedComponentManifest() {
  return CATEGORIES.map((category) => ({
    category,
    entries: COMPONENT_MANIFEST.filter((entry) => entry.category === category.id),
  })).filter((group) => group.entries.length > 0)
}
