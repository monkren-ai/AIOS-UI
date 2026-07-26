/**
 * Nothing UI - 基于 Nothing 设计语言的现代 React 组件库
 *
 * @example
 * ```tsx
 * import * as motion from 'motion/react'
 * import { ConfigProvider, Button, Input } from 'nothing-ui'
 *
 * <ConfigProvider motion={motion} defaultTheme="dark">
 *   <Button variant="primary">Click me</Button>
 * </ConfigProvider>
 * ```
 */

// ===== 全局样式（设计令牌）=====
import './styles/tokens.css'

// ===== Providers =====
export { useConfig, useCdnFn, ConfigProvider, type CDNProxy, type CdnApi, type CdnFn, type Config, type ConfigProviderProps } from './ConfigProvider'
export { ThemeProvider, useTheme, type Theme, type ThemeAppearance, type ThemeContextValue, type ThemeProviderProps } from './ThemeProvider'
export { ThemeScript, getThemeScript, type ThemeScriptOptions, type ThemeScriptProps } from './ThemeProvider/ThemeScript'
export { useMotionComponent, MotionProvider, type MotionComponentType, type MotionProviderProps } from './MotionProvider'

// ===== Core Libs =====
export { cn, dataAttr, mergeRefs, themeVariants, sizeVariants, sizeLayoutVariants, stateVariants, stateOnOffVariants, emphasisVariants, statusVariants, orientationVariants, Slot, isSingleReactElement, type SlotProps, type AsChildProps, type AsProp, type PolymorphicProps, type DivProps, type SpanProps, type ButtonPropsBase, type AnchorProps, type InputPropsBase, type TextareaPropsBase, type SelectPropsBase, type ContainerProps } from './lib'

// ===== Components =====
export { Accordion, accordionVariants, accordionItemVariants, type AccordionProps, type AccordionItem } from './Accordion'
export { AgeMotion, ageMotionVariants, type AgeMotionProps, type AgeMotionSize, type AgeMotionTheme } from './AgeMotion'
export { Alert, alertVariants, type AlertProps } from './Alert'
export { AspectRatio, type AspectRatioProps } from './AspectRatio'
export { Avatar, avatarVariants, type AvatarProps } from './Avatar'
export { Badge, badgeVariants, type BadgeProps } from './Badge'
export { Battery, batteryVariants, batteryRingVariants, batteryDeviceVariants, type BatteryProps, type BatteryDevice } from './Battery'
export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps } from './Breadcrumb'
export { Button, buttonVariants, type ButtonProps } from './Button'
export { Caffeinate, caffeinateVariants, type CaffeinateProps, type CaffeinateStatus } from './Caffeinate'
export { Calendar, calendarVariants, dayVariants, type CalendarProps } from './Calendar'
export { Card, WidgetCard, contentCardVariants, widgetCardVariants, type CardProps, type WidgetCardProps } from './Card'
export { Checkbox, checkboxVariants, type CheckboxProps } from './Checkbox'
export { Chrono, chronoVariants, type ChronoProps, type ChronoState, type ChronoSize } from './Chrono'
export { Clipboard, clipboardVariants, type ClipboardProps, type ClipboardState, type ClipboardSize } from './Clipboard'
export { Collapsible, collapsibleVariants, type CollapsibleProps } from './Collapsible'
export { Command, commandItemVariants, type CommandProps, type CommandItem, type CommandGroup } from './Command'
export { ContextMenu, contextMenuContentVariants, contextMenuItemVariants, type ContextMenuProps, type ContextMenuItem } from './ContextMenu'
export { DataTable, dataTableVariants, type DataTableProps, type DataTableVariant, type DataTableColumn, type DataTableGridRow, type DataTableRowsItem, type DataTableCellStatus, type DataCellStatus } from './DataTable'
export { DateWidget, dateSerifVariants, dateRectVariants, dateDualRingVariants, type DateWidgetProps, type DateType } from './Date'
export { DateNav, dateNavVariants, dateNavLabelVariants, dateNavArrowVariants, type DateNavProps } from './DateNav'
export { DotMatrix, dotMatrixVariants, dotVariants, type DotMatrixProps } from './DotMatrix'
export { DropdownMenu, dropdownMenuContentVariants, dropdownMenuItemVariants, menubarTriggerVariants, menubarDropdownVariants, menubarItemVariants, type DropdownMenuProps, type DropdownMenuItem, type MenubarItem } from './DropdownMenu'
export { Form, type FormProps } from './Form'
export { HoverCard, hoverCardContentVariants, type HoverCardProps } from './HoverCard'
export { Input, inputVariants, type InputProps } from './Input'
export { InputOTP, inputOTPVariants, inputOTPSlotVariants, type InputOTPProps } from './InputOTP'
export { Label, labelVariants, type LabelProps } from './Label'
export { Modal, modalVariants, modalBackdropVariants, modalConfirmVariants, type ModalProps } from './Modal'
export { MusicPlayer, BlinkingSeparator, musicPlayerVariants, type MusicPlayerProps, type MusicPlayerVariant } from './MusicPlayer'
export { Navigation, navigationVariants, navItemVariants, type NavItem, type NavigationProps } from './Navigation'
export { NavigationMenu, navigationMenuVariants, type NavigationMenuOrientation, type NavigationMenuProps } from './NavigationMenu'
export { NextEvent, nextEventVariants, type NextEventProps, type EventData } from './NextEvent'
export { OverlayPortal, useOverlayState, useEscapeKey, useScrollLock, useFocusTrap, useTabCycle, useOverlayClickOutside, useDisclosure, type OverlayPortalProps, type OverlaySide, type OverlayAlign, type DisclosureReturn } from './OverlayPortal'
export { Pagination, type PaginationProps } from './Pagination'
export { PhotoCarousel, photoCarouselVariants, type PhotoCarouselProps, type PhotoCarouselOrientation } from './PhotoCarousel'
export { Pomodoro, pomodoroVariants, type PomodoroProps, type PomodoroPhase, type PomodoroRunState } from './Pomodoro'
export { Popover, popoverContentVariants, type PopoverProps } from './Popover'
export { ProgressBar, progressBarVariants, progressBarValueVariants, type ProgressBarProps, type ProgressStatus } from './ProgressBar'
export { QuickToggle, quickToggleVariants, type QuickToggleProps } from './QuickToggle'
export { Quotes, quotesVariants, type QuotesProps, type QuoteData } from './Quotes'
export { RadioGroup, radioGroupVariants, type RadioGroupProps, type RadioOption } from './RadioGroup'
export { Resizable, resizableVariants, type ResizableProps } from './Resizable'
export { ScrollArea, type ScrollAreaProps } from './ScrollArea'
export { SegmentedControl, segmentedVariants, segmentVariants, type SegmentedControlProps } from './SegmentedControl'
export { Select, selectVariants, selectTriggerVariants, selectItemVariants, type SelectProps, type SelectOption } from './Select'
export { Separator, separatorVariants, type SeparatorProps } from './Separator'
export { Sheet, sheetVariants, sheetBackdropVariants, type SheetProps, type SheetSection } from './Sheet'
export { Sidebar, sidebarVariants, sidebarItemVariants, type SidebarItem, type SidebarProps } from './Sidebar'
export { Slider, sliderVariants, type SliderProps } from './Slider'
export { Spinner, spinnerVariants, spinnerSectorVariants, spinnerTextVariants, type SpinnerProps } from './Spinner'
export { LoadingState, ErrorState, EmptyState, DisabledState, loadingSegmentVariants, type LoadingStateProps, type ErrorStateProps, type EmptyStateProps, type DisabledStateProps } from './States'
export { SunDial, sunDialVariants, type SunDialProps, type SunDialTime, type SunDialTheme } from './SunDial'
export { Switch, switchVariants, type SwitchProps } from './Switch'
export { SystemMonitor, systemMonitorVariants, monitorItemVariants, monitorSegmentVariants, type SystemMonitorProps } from './SystemMonitor'
export { Tabs, tabsVariants, tabTriggerVariants, TabPanel, type TabItem, type TabsProps, type TabPanelProps } from './Tabs'
export { Tag, Tags, tagVariants, type TagProps, type TagsProps } from './Tag'
export { Taskbar, taskbarVariants, type TaskbarProps, type TaskbarApp } from './Taskbar'
export { Textarea, textareaVariants, type TextareaProps } from './Textarea'
export { Toggle, ToggleGroup, toggleVariants, toggleGroupVariants, type ToggleProps, type ToggleGroupProps } from './Toggle'
export { Tooltip, tooltipPopupVariants, type TooltipProps } from './Tooltip'
export { WalkieTalkie, walkieTalkieVariants, type WalkieTalkieProps, type WalkieState, type WalkieStatus } from './WalkieTalkie'

// ===== Agent / AI OS =====
export { AgentOrb, agentOrbVariants, ApprovalGate, approvalGateVariants, PlanCard, planCardVariants, ProgressTrace, progressTraceVariants, ToolCallRow, toolCallRowVariants, type AgentOrbProps, type AgentState, type ApprovalGateProps, type ApprovalRisk, type PlanCardProps, type PlanStep, type PlanStepStatus, type ProgressTraceProps, type TraceStep, type TraceStepStatus, type ToolCallRowProps, type ToolCallStatus } from './agent'
export const VERSION = '1.0.0'
