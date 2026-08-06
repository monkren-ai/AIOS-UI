/**
 * AIOS UI - 基于 Nothing 设计语言的现代 React 组件库
 *
 * @example
 * ```tsx
 * import * as motion from 'motion/react'
 * import { ConfigProvider, Button, Input } from 'aios-ui-kit'
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
export { DEFAULT_STORAGE_KEY, ThemeProvider, useTheme, type Theme, type ThemeAppearance, type ThemeContextValue, type ThemeProviderProps } from './ThemeProvider'
export { ThemeScript, getThemeScript, type ThemeScriptOptions, type ThemeScriptProps } from './ThemeProvider/ThemeScript'
export { useMotionComponent, MotionProvider, type MotionComponentType, type MotionProviderProps } from './MotionProvider'

// ===== Core Libs =====
export { cn, dataAttr, mergeSemanticProps, mergeRefs, Slot, isSingleReactElement, spring, exitFallbackMs, enterTransition, exitTransition, fontVariationWeights, fontWeightValues, FONT_WEIGHT_TRANSITION_CSS, type SemanticClassNames, type SemanticStyles, type WithSemanticProps, type ComponentConfig, type SlotProps, type AsChildProps, type AsProp, type PolymorphicProps, type DivProps, type SpanProps, type ButtonPropsBase, type AnchorProps, type InputPropsBase, type TextareaPropsBase, type SelectPropsBase, type ContainerProps, type SpringToken } from './lib'

// ===== Components =====
export { Accordion, accordionVariants, accordionItemVariants, accordionHeaderVariants, accordionTriggerVariants, accordionTriggerTextVariants, accordionTriggerIconVariants, accordionLeadingIconVariants, accordionPanelVariants, accordionContentVariants, type AccordionProps, type AccordionItem, type AccordionType, type AccordionVariant } from './Accordion'
export { AgeMotion, ageMotionVariants, type AgeMotionProps, type AgeMotionSize, type AgeMotionTheme } from './AgeMotion'
export { Alert, alertVariants, alertIconVariants, alertTitleVariants, alertMessageVariants, type AlertProps, type AlertVariant, type AlertSize } from './Alert'
export { AskUserQuestions, askUserQuestionsVariants, type AskUserQuestionsProps, type AskUserQuestion, type AskUserQuestionType, type AskUserAnswerValue, type AskUserQuestionsSize } from './AskUserQuestions'
export { AspectRatio, aspectRatioVariants, aspectRatioInnerVariants, type AspectRatioProps } from './AspectRatio'
export { Avatar, avatarVariants, avatarFallbackVariants, type AvatarProps, type AvatarVariant, type AvatarSize, type AvatarShape } from './Avatar'
export { Badge, badgeVariants, badgeDotVariants, type BadgeProps, type BadgeVariant, type BadgeSize } from './Badge'
export { Battery, batteryVariants, batteryRingVariants, batteryDeviceVariants, type BatteryProps, type BatteryDevice } from './Battery'
export { Breadcrumb, breadcrumbVariants, breadcrumbLinkVariants, type BreadcrumbItem, type BreadcrumbProps, type BreadcrumbSize } from './Breadcrumb'
export { Button, buttonVariants, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button'
export { Caffeinate, caffeinateVariants, type CaffeinateProps, type CaffeinateStatus } from './Caffeinate'
export { Calendar, calendarVariants, dayVariants, type CalendarProps } from './Calendar'
export { Card, ContentCard, WidgetCard, contentCardVariants, widgetCardVariants, widgetCardTitleVariants, widgetCardValueVariants, widgetCardSubtitleVariants, type CardProps, type ContentCardProps, type WidgetCardProps, type CardVariant, type CardSize, type CardShape, type WidgetCardSize, type WidgetCardShape, type WidgetCardTheme, type WidgetCardDensity, type WidgetCardAlign, type WidgetCardIconPosition } from './Card'
export { Checkbox, checkboxVariants, checkboxBoxVariants, checkboxIndicatorVariants, checkboxCheckVariants, checkboxDashVariants, checkboxLabelVariants, type CheckboxProps, type CheckboxSize } from './Checkbox'
export { CheckboxGroup, checkboxGroupVariants, checkboxGroupMergeBgVariants, checkboxGroupItemVariants, type CheckboxGroupProps, type CheckboxGroupOption, type CheckboxGroupOrientation } from './CheckboxGroup'
export { Chrono, chronoVariants, type ChronoProps, type ChronoState, type ChronoSize } from './Chrono'
export { Clipboard, clipboardVariants, clipboardHeaderVariants, clipboardTitleVariants, clipboardCountVariants, clipboardListVariants, clipboardItemVariants, clipboardItemContentVariants, clipboardTextVariants, clipboardTimeVariants, clipboardCopiedVariants, clipboardDeleteVariants, clipboardClearVariants, type ClipboardProps, type ClipboardState, type ClipboardSize } from './Clipboard'
export { Collapsible, collapsibleVariants, collapsibleTriggerVariants, collapsibleContentVariants, collapsibleContentInnerVariants, type CollapsibleProps } from './Collapsible'
export { ColorPicker, colorPickerVariants, colorPickerHeaderVariants, colorPickerTitleVariants, colorPickerValueVariants, colorPickerSwatchesVariants, colorPickerSwatchVariants, colorPickerCustomLabelVariants, colorPickerNativeVariants, colorPickerPreviewVariants, type ColorPickerProps, type ColorPickerSize } from './ColorPicker'
export { Command, commandItemVariants, commandVariants, commandInputVariants, commandListVariants, commandGroupVariants, commandGroupHeadingVariants, commandItemIconVariants, commandItemLabelVariants, commandItemShortcutVariants, commandEmptyVariants, type CommandProps, type CommandItem, type CommandGroup, type CommandSize } from './Command'
export { ContextMenu, contextMenuContentVariants, contextMenuItemLabelVariants, contextMenuItemShortcutVariants, contextMenuItemVariants, contextMenuSeparatorVariants, contextMenuTriggerVariants, contextMenuVariants, type ContextMenuProps, type ContextMenuItem } from './ContextMenu'
export { Sender, senderVariants, Bubble, BubbleList, bubbleVariants, ThoughtChain, thoughtChainVariants, thoughtChainItemVariants, Prompts, promptsVariants, promptsItemVariants, Welcome, welcomeVariants, Conversations, conversationsVariants, conversationsItemVariants, type SenderProps, type SenderSemanticType, type SenderComponents, type BubbleProps, type BubbleSemanticType, type BubblePlacement, type BubbleVariant, type BubbleShape, type BubbleListProps, type BubbleItemType, type BubbleRole, type RoleConfig, type RoleType, type BubbleListSemanticType, type ThoughtChainProps, type ThoughtChainItem, type ThoughtChainItemStatus, type ThoughtChainSemanticType, type PromptsProps, type PromptItem, type PromptsSemanticType, type WelcomeProps, type WelcomeSemanticType, type ConversationsProps, type ConversationItem, type ConversationsSemanticType } from './conversation'
export { DataTable, dataTableVariants, type DataTableProps, type DataTableVariant, type DataTableColumn, type DataTableGridRow, type DataTableRowsItem, type DataTableCellStatus, type DataCellStatus } from './DataTable'
export { DateWidget, dateSerifVariants, dateRectVariants, dateDualRingVariants, type DateWidgetProps, type DateType } from './Date'
export { DateNav, dateNavVariants, dateNavLabelVariants, dateNavArrowVariants, type DateNavProps } from './DateNav'
export { DirectionProvider, useDirection, type Direction, type DirectionContextValue, type DirectionProviderProps } from './DirectionProvider'
export { DotMatrix, dotMatrixVariants, dotMatrixRowVariants, dotVariants, type DotMatrixProps, type DotMatrixPattern, type DotMatrixSize, type DotMatrixTheme, type DotState } from './DotMatrix'
export { DropdownMenu, dropdownMenuContentVariants, dropdownMenuItemIconVariants, dropdownMenuItemLabelVariants, dropdownMenuItemShortcutVariants, dropdownMenuItemVariants, dropdownMenuPositionerVariants, dropdownMenuSeparatorVariants, dropdownMenuTriggerVariants, dropdownMenuVariants, menubarDropdownVariants, menubarItemLabelVariants, menubarItemShortcutVariants, menubarItemVariants, menubarSeparatorVariants, menubarTriggerVariants, menubarVariants, type DropdownMenuProps, type DropdownMenuItem, type MenubarItem } from './DropdownMenu'
export { Form, formVariants, formGroupVariants, formErrorVariants, type FormProps } from './Form'
export { HoverCard, hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants, type HoverCardProps } from './HoverCard'
export { Input, inputVariants, inputControlVariants, inputFieldVariants, inputLabelVariants, inputHelperVariants, inputIconVariants, inputClearVariants, resolveInputVariant, type InputProps, type InputHelperProps, type InputVariant, type InputSize } from './Input'
export { InputCopy, inputCopyVariants, inputCopyLabelVariants, inputCopyControlVariants, inputCopyFieldVariants, inputCopyButtonVariants, inputCopyButtonTextVariants, type InputCopyProps, type InputCopySize } from './InputCopy'
export { InputMessage, inputMessageVariants, inputMessageControlVariants, inputMessageFieldVariants, inputMessageSendVariants, inputMessageSendIconVariants, inputMessageMetaVariants, inputMessageHintVariants, inputMessageCountVariants, type InputMessageProps, type InputMessageSize } from './InputMessage'
export { InputOTP, inputOTPVariants, inputOTPSlotVariants, inputOTPInputVariants, type InputOTPProps, type InputOTPSize } from './InputOTP'
export { Kbd, kbdVariants, type KbdProps, type KbdVariant, type KbdSize } from './Kbd'
export { Label, labelVariants, labelTextVariants, labelRequiredVariants, type LabelProps, type LabelSize } from './Label'
export { Modal, modalBackdropVariants, modalBodyVariants, modalCancelVariants, modalCloseVariants, modalConfirmVariants, modalDescriptionVariants, modalFooterVariants, modalHeaderVariants, modalTitleVariants, modalVariants, type ModalProps } from './Modal'
export { MusicPlayer, BlinkingSeparator, musicPlayerVariants, type MusicPlayerProps, type MusicPlayerVariant } from './MusicPlayer'
export { Navigation, navigationVariants, navItemVariants, type NavItem, type NavigationProps, type NavigationVariant } from './Navigation'
export { NavigationMenu, navigationMenuVariants, navigationMenuListVariants, navigationMenuItemVariants, navigationMenuLinkVariants, navigationMenuCaretVariants, navigationMenuSubmenuVariants, navigationMenuSubmenuItemVariants, navigationMenuSubmenuLinkVariants, type NavMenuItem, type NavigationMenuOrientation, type NavigationMenuProps } from './NavigationMenu'
export { NextEvent, nextEventVariants, type NextEventProps, type EventData } from './NextEvent'
export { OverlayPortal, useOverlayState, useEscapeKey, useScrollLock, useFocusTrap, useTabCycle, useOverlayClickOutside, useDisclosure, type OverlayPortalProps, type OverlaySide, type OverlayAlign, type DisclosureReturn } from './OverlayPortal'
export { Pagination, paginationVariants, paginationListVariants, paginationItemVariants, paginationButtonVariants, paginationEllipsisVariants, paginationArrowVariants, type PaginationProps } from './Pagination'
export { PhotoCarousel, photoCarouselVariants, type PhotoCarouselProps, type PhotoCarouselOrientation } from './PhotoCarousel'
export { Pomodoro, pomodoroVariants, type PomodoroProps, type PomodoroPhase, type PomodoroRunState } from './Pomodoro'
export { Popover, popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants, type PopoverProps } from './Popover'
export { ProgressBar, progressBarVariants, progressTrackVariants, progressSegmentVariants, progressIndeterminateVariants, progressValueVariants, progressBarValueVariants, type ProgressBarProps, type ProgressBarVariant, type ProgressBarSize, type ProgressStatus } from './ProgressBar'
export { QuickToggle, quickToggleVariants, type QuickToggleProps } from './QuickToggle'
export { Quotes, quotesVariants, type QuotesProps, type QuoteData, type QuotesSize, type QuotesTheme } from './Quotes'
export { RadioGroup, radioGroupVariants, radioGroupItemVariants, radioGroupCircleVariants, radioGroupDotVariants, radioGroupLabelVariants, type RadioGroupProps, type RadioOption, type RadioGroupSize } from './RadioGroup'
export { ReducedMotionProvider, useReducedMotion, type ReducedMotionContextValue, type ReducedMotionProviderProps } from './ReducedMotionProvider'
export { Resizable, resizableVariants, resizablePanelVariants, resizableHandleVariants, type ResizableProps, type ResizableDirection } from './Resizable'
export { ScrollArea, scrollAreaVariants, scrollAreaViewportVariants, scrollAreaScrollbarVariants, scrollAreaThumbVariants, type ScrollAreaProps } from './ScrollArea'
export { SegmentedControl, segmentedVariants, segmentVariants, segmentedSliderVariants, segmentedHoverSliderVariants, type SegmentedControlProps, type SegmentedControlVariant } from './SegmentedControl'
export { Select, selectVariants, selectLabelVariants, selectTriggerVariants, selectTriggerIconVariants, selectValueVariants, selectPlaceholderVariants, selectPositionerVariants, selectContentVariants, selectSearchVariants, selectSearchInputVariants, selectListVariants, selectItemVariants, selectItemIndicatorVariants, selectErrorVariants, type SelectProps, type SelectOption, type SelectSize } from './Select'
export { Separator, separatorVariants, separatorLineVariants, separatorLabelVariants, type SeparatorProps, type SeparatorOrientation, type SeparatorSize } from './Separator'
export { Sheet, sheetBackdropVariants, sheetBodyVariants, sheetCloseVariants, sheetDismissVariants, sheetFooterVariants, sheetHandleBarVariants, sheetHandleVariants, sheetHeaderVariants, sheetSectionTitleVariants, sheetSectionVariants, sheetTitleVariants, sheetVariants, type SheetProps, type SheetSection } from './Sheet'
export { Sidebar, sidebarVariants, sidebarItemVariants, type SidebarItem, type SidebarProps } from './Sidebar'
export { Slider, sliderVariants, sliderHeaderVariants, sliderLabelVariants, sliderValueVariants, sliderControlVariants, sliderTrackVariants, sliderFillVariants, sliderThumbVariants, resolveSliderVariant, type SliderProps, type SliderVariant, type SliderSize } from './Slider'
export { Spinner, spinnerVariants, spinnerWheelVariants, spinnerPointerVariants, spinnerSvgVariants, spinnerSectorVariants, spinnerTextVariants, type SpinnerProps, type SpinnerVariant, type SpinnerSize } from './Spinner'
export { LoadingState, ErrorState, EmptyState, DisabledState, stateVariants, loadingSegmentVariants, type LoadingStateProps, type ErrorStateProps, type EmptyStateProps, type DisabledStateProps, type StateSize, type StateVariant } from './States'
export { SunDial, sunDialVariants, type SunDialProps, type SunDialTime, type SunDialTheme } from './SunDial'
export { Surfaces, surfaceVariants, type SurfacesProps, type SurfaceBorder, type SurfaceElevation, type SurfacePadding, type SurfaceRadius } from './Surfaces'
export { Switch, switchVariants, switchTrackVariants, switchThumbVariants, switchLabelVariants, type SwitchProps, type SwitchSize } from './Switch'
export { SystemMonitor, systemMonitorVariants, monitorItemVariants, monitorSegmentVariants, type SystemMonitorProps } from './SystemMonitor'
export { Tabs, tabsVariants, tabsListVariants, tabsIndicatorVariants, tabsHoverBackgroundVariants, tabsPanelVariants, tabTriggerVariants, TabPanel, type TabItem, type TabsProps, type TabPanelProps, type TabsVariant, type TabsIndicator } from './Tabs'
export { Tag, Tags, tagVariants, tagsVariants, type TagProps, type TagsProps, type TagVariant, type TagSize, type TagShape } from './Tag'
export { Taskbar, taskbarVariants, type TaskbarProps, type TaskbarApp } from './Taskbar'
export { Textarea, textareaVariants, textareaFieldVariants, textareaLabelVariants, textareaMessageVariants, resolveTextareaVariant, type TextareaProps, type TextareaVariant, type TextareaSize } from './Textarea'
export { Toggle, ToggleGroup, toggleVariants, toggleGroupVariants, resolveToggleVariant, type ToggleProps, type ToggleGroupProps, type ToggleVariant, type ToggleSize } from './Toggle'
export { Tooltip, tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants, type TooltipProps } from './Tooltip'
export { WalkieTalkie, walkieTalkieVariants, type WalkieTalkieProps, type WalkieState, type WalkieStatus } from './WalkieTalkie'

// ===== Agent / AI OS =====
export { AgentOrb, agentOrbVariants, ApprovalGate, approvalGateVariants, PlanCard, planCardVariants, ProgressTrace, progressTraceVariants, ThinkingIndicator, thinkingIndicatorVariants, ThinkingSteps, thinkingStepsVariants, ToolCallRow, toolCallRowVariants, type AgentOrbProps, type AgentState, type ApprovalGateProps, type ApprovalRisk, type PlanCardProps, type PlanStep, type PlanStepStatus, type ProgressTraceProps, type TraceStep, type TraceStepStatus, type ThinkingIndicatorProps, type ThinkingState, type ThinkingStepsProps, type ThinkingStep, type ThinkingStepStatus, type ToolCallRowProps, type ToolCallStatus } from './agent'
export const VERSION = '1.0.0'
