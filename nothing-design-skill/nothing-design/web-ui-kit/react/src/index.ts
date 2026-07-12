/**
 * Nothing UI - 基于 Nothing 设计语言的现代 React 组件库
 *
 * @example
 * ```tsx
 * import { ConfigProvider, Button, Input } from 'nothing-ui'
 * import { motion } from 'motion/react'
 *
 * <ConfigProvider motion={motion} defaultTheme="dark">
 *   <Button variant="primary">Click me</Button>
 * </ConfigProvider>
 * ```
 */

// ===== 全局样式（设计令牌）=====
import './styles/tokens.css'

// ===== Providers =====
export { default as ConfigProvider, useConfig, useCdnFn } from './ConfigProvider'
export type { Config, CDNProxy, CdnApi, CdnFn, ConfigProviderProps } from './ConfigProvider'

export { default as ThemeProvider, useTheme } from './ThemeProvider'
export type { ThemeAppearance, ThemeContextValue, ThemeProviderProps } from './ThemeProvider'

export { default as MotionProvider, useMotionComponent } from './MotionProvider'
export type { MotionComponentType, MotionProviderProps } from './MotionProvider'

// ===== Core Libs =====
export { cn, dataAttr, mergeRefs } from './lib'
export {
  themeVariants,
  sizeVariants,
  sizeLayoutVariants,
  stateVariants,
  stateOnOffVariants,
  emphasisVariants,
  statusVariants,
  orientationVariants,
} from './lib'
export { Slot } from './lib'
export type { SlotProps } from './lib'
export { isSingleReactElement } from './lib'
export type {
  AsChildProps,
  AsProp,
  PolymorphicProps,
} from './lib'

// ===== Components =====

// 表单类
export { Button, buttonVariants, type ButtonProps } from './Button'
export { Input, inputVariants, type InputProps } from './Input'
export { Switch, switchVariants, type SwitchProps } from './Switch'
export { Slider, sliderVariants, type SliderProps } from './Slider'
export { Checkbox, checkboxVariants, type CheckboxProps } from './Checkbox'
export { RadioGroup, radioGroupVariants, type RadioGroupProps } from './RadioGroup'
export { Textarea, textareaVariants, type TextareaProps } from './Textarea'
export { Label, type LabelProps } from './Label'
export { InputOTP, inputOTPVariants, type InputOTPProps } from './InputOTP'
export { Form, type FormProps } from './Form'
export { Tag, tagVariants, type TagProps } from './Tag'
export { SegmentedControl, segmentedVariants, type SegmentedControlProps } from './SegmentedControl'
export { Toggle, toggleVariants, type ToggleProps } from './Toggle'

// 数据展示类
export { Card, WidgetCard, contentCardVariants, widgetCardVariants } from './Card'
export type { CardProps, WidgetCardProps } from './Card'
export { DataTable, dataTableVariants } from './DataTable'
export type {
  DataTableProps,
  DataTableVariant,
  DataTableColumn,
  DataTableGridRow,
  DataTableRowsItem,
  DataTableCellStatus,
  DataCellStatus,
} from './DataTable'
export { ProgressBar, progressBarVariants, progressBarValueVariants } from './ProgressBar'
export type { ProgressBarProps, ProgressStatus } from './ProgressBar'
export { Badge, badgeVariants, type BadgeProps } from './Badge'
export { Avatar, avatarVariants, type AvatarProps } from './Avatar'
export { Separator, separatorVariants, type SeparatorProps } from './Separator'
export { DotMatrix, dotMatrixVariants, dotVariants, type DotMatrixProps } from './DotMatrix'
export { Quotes, quotesVariants, type QuotesProps, type QuoteData } from './Quotes'

// 反馈类
export { Modal, modalVariants, modalBackdropVariants, modalConfirmVariants, type ModalProps } from './Modal'
export { Sheet, sheetVariants, sheetBackdropVariants, type SheetProps, type SheetSection } from './Sheet'
export { Popover, popoverContentVariants, type PopoverProps } from './Popover'
export { HoverCard, hoverCardContentVariants, type HoverCardProps } from './HoverCard'
export { Tooltip, tooltipPopupVariants, type TooltipProps } from './Tooltip'
export { Alert, alertVariants, type AlertProps } from './Alert'
export {
  LoadingState,
  ErrorState,
  EmptyState,
  DisabledState,
  loadingSegmentVariants,
} from './States'
export type {
  LoadingStateProps,
  ErrorStateProps,
  EmptyStateProps,
  DisabledStateProps,
} from './States'
export {
  Spinner,
  spinnerVariants,
  spinnerSectorVariants,
  spinnerTextVariants,
  type SpinnerProps,
} from './Spinner'
export { default as ErrorBoundary } from './ErrorBoundary'

// 导航类
export {
  Navigation,
  navigationVariants,
  navItemVariants,
  type NavItem,
  type NavigationProps,
} from './Navigation'
export {
  DateNav,
  dateNavVariants,
  dateNavLabelVariants,
  dateNavArrowVariants,
  type DateNavProps,
} from './DateNav'
export {
  Tabs,
  tabsVariants,
  tabTriggerVariants,
  TabPanel,
  type TabItem,
  type TabsProps,
  type TabPanelProps,
} from './Tabs'
export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps } from './Breadcrumb'
export { Pagination, type PaginationProps } from './Pagination'
export {
  NavigationMenu,
  navigationMenuVariants,
  type NavigationMenuOrientation,
  type NavigationMenuProps,
} from './NavigationMenu'
export {
  Sidebar,
  sidebarVariants,
  sidebarItemVariants,
  type SidebarItem,
  type SidebarProps,
} from './Sidebar'

// 菜单类
export { Taskbar, taskbarVariants, type TaskbarProps, type TaskbarApp } from './Taskbar'
export {
  Accordion,
  accordionVariants,
  accordionItemVariants,
  type AccordionProps,
  type AccordionItem,
} from './Accordion'
export {
  Select,
  selectVariants,
  selectTriggerVariants,
  selectItemVariants,
  type SelectProps,
  type SelectOption,
} from './Select'
export {
  ContextMenu,
  contextMenuContentVariants,
  contextMenuItemVariants,
  type ContextMenuProps,
  type ContextMenuItem,
} from './ContextMenu'
export {
  DropdownMenu,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  menubarTriggerVariants,
  menubarDropdownVariants,
  menubarItemVariants,
  type DropdownMenuProps,
  type DropdownMenuItem,
  type MenubarItem,
} from './DropdownMenu'
export {
  Command,
  commandItemVariants,
  type CommandProps,
  type CommandItem,
  type CommandGroup,
} from './Command'
export { Collapsible, collapsibleVariants, type CollapsibleProps } from './Collapsible'

// 布局类
export { ScrollArea, type ScrollAreaProps } from './ScrollArea'
export { Resizable, resizableVariants, type ResizableProps } from './Resizable'
export { AspectRatio, type AspectRatioProps } from './AspectRatio'
export {
  Clipboard,
  clipboardVariants,
  type ClipboardProps,
  type ClipboardState,
  type ClipboardSize,
} from './Clipboard'
export {
  OverlayPortal,
  type OverlayPortalProps,
  type OverlaySide,
  type OverlayAlign,
  useOverlayState,
  useEscapeKey,
  useScrollLock,
  useFocusTrap,
  useTabCycle,
  useOverlayClickOutside,
  useDisclosure,
  type DisclosureReturn,
} from './OverlayPortal'

// 时钟 / 日期类
export { Calendar, calendarVariants, dayVariants, type CalendarProps } from './Calendar'
export {
  DateWidget,
  dateSerifVariants,
  dateRectVariants,
  dateDualRingVariants,
  type DateWidgetProps,
  type DateType,
} from './Date'
export {
  SunDial,
  sunDialVariants,
  type SunDialProps,
  type SunDialTime,
  type SunDialTheme,
} from './SunDial'
export { Chrono, chronoVariants, type ChronoProps, type ChronoState, type ChronoSize } from './Chrono'
export {
  AgeMotion,
  ageMotionVariants,
  type AgeMotionProps,
  type AgeMotionSize,
  type AgeMotionTheme,
} from './AgeMotion'
export { NextEvent, nextEventVariants, type NextEventProps, type EventData } from './NextEvent'

// 系统监控 / 小部件类
export {
  Battery,
  batteryVariants,
  batteryRingVariants,
  batteryDeviceVariants,
  type BatteryProps,
  type BatteryDevice,
} from './Battery'
export {
  SystemMonitor,
  systemMonitorVariants,
  monitorItemVariants,
  monitorSegmentVariants,
  type SystemMonitorProps,
} from './SystemMonitor'
export { QuickToggle, quickToggleVariants, type QuickToggleProps } from './QuickToggle'
export {
  MusicPlayer,
  BlinkingSeparator,
  musicPlayerVariants,
  type MusicPlayerProps,
  type MusicPlayerVariant,
} from './MusicPlayer'
export {
  PhotoCarousel,
  photoCarouselVariants,
  type PhotoCarouselProps,
  type PhotoCarouselOrientation,
} from './PhotoCarousel'
export {
  Caffeinate,
  caffeinateVariants,
  type CaffeinateProps,
  type CaffeinateStatus,
} from './Caffeinate'
export {
  Pomodoro,
  pomodoroVariants,
  type PomodoroProps,
  type PomodoroPhase,
  type PomodoroRunState,
} from './Pomodoro'
export {
  WalkieTalkie,
  walkieTalkieVariants,
  type WalkieTalkieProps,
  type WalkieState,
  type WalkieStatus,
} from './WalkieTalkie'

export const VERSION = '1.0.0'
