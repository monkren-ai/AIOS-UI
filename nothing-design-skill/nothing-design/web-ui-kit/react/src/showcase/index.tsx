import { Link } from 'react-router-dom'
import { useShowcaseState } from './hooks/useShowcaseState'
import { CategoryNav } from './components/CategoryNav'
import { FloatingControls } from './components/FloatingControls'
import { useShowcaseContext } from './ShowcaseContext'

import { AgentOSSection } from './sections/AgentOSSection'
import { CoreInteractionSection } from './sections/CoreInteractionSection'
import { DataDisplaySection } from './sections/DataDisplaySection'
import { OverlaysSection } from './sections/OverlaysSection'
import { NavigationSection } from './sections/NavigationSection'
import { MenusSelectionSection } from './sections/MenusSelectionSection'
import { StatesSection } from './sections/StatesSection'
import { UtilitySection } from './sections/UtilitySection'
import { ClockCalendarSection } from './sections/ClockCalendarSection'
import { SystemMonitoringSection } from './sections/SystemMonitoringSection'
import { UtilityToolsSection } from './sections/UtilityToolsSection'
import { TimeProgressSection } from './sections/TimeProgressSection'
import { VisualDisplaySection } from './sections/VisualDisplaySection'
import { FeatureWidgetsSection } from './sections/FeatureWidgetsSection'
import { WidgetLayoutSection } from './sections/WidgetLayoutSection'
import { Figma20LibrarySection } from './sections/Figma20LibrarySection'
import { NullframeSection } from './sections/NullframeSection'

// 组件样式（原 App.tsx 集中导入）
// 已迁移组件的 CSS 由各组件自行导入，此处仅保留 WidgetShowcase 所需的全局样式
import '@/styles/widgets.css'
import '@/styles/widget-showcase.css'

// 展示页样式
import './styles/showcase.css'

/**
 * Nothing UI 展示页入口。
 *
 * 替代原 src/App.tsx，将 1263 行的巨型展示页拆分为
 * showcase/ 下的模块化结构，并以内联样式提取的 CSS 类替代硬编码。
 */
export function Showcase() {
  const { t, preloadProjectIntro } = useShowcaseContext()
  const {
    modalOpen,
    setModalOpen,
    dropdownValue,
    setDropdownValue,
    bottomSheetOpen,
    setBottomSheetOpen,
    dateNavLabel,
    handleDatePrev,
    handleDateNext,
    spinnerItems,
    setSpinnerItems,
    worldClockCities,
    setWorldClockCities,
    alertDialogOpen,
    setAlertDialogOpen,
    radioValue,
    setRadioValue,
    paginationPage,
    setPaginationPage,
    selectValue,
    setSelectValue,
    sheetOpen,
    setSheetOpen,
    toggleGroupValue,
    setToggleGroupValue,
    otpValue,
    setOtpValue,
    commandOpen,
    setCommandOpen,
    sliderValue,
    setSliderValue,
    forceSim,
    toggleForceSim,
    agentOrbState,
    setAgentOrbState,
    approvalOpen,
    setApprovalOpen,
    agentPlanSteps,
    setAgentPlanSteps,
    agentTraceSteps,
    agentToolCalls,
  } = useShowcaseState()

  return (
    <main className="showcase-page">
      <CategoryNav />

      <FloatingControls forceSim={forceSim} onToggleForceSim={toggleForceSim} />

      <div className="showcase-main">
        <section className="showcase-section">
          <div className="showcase-intro-card">
            <div className="showcase-intro-card__visual">
              <svg
                viewBox="0 0 320 180"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="320" height="180" fill="var(--surface)" />
                <rect
                  x="16"
                  y="16"
                  width="24"
                  height="148"
                  rx="4"
                  fill="var(--surface-raised)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect x="22" y="28" width="12" height="2" rx="1" fill="var(--text-primary)" />
                <rect x="22" y="36" width="8" height="2" rx="1" fill="var(--text-secondary)" />
                <rect x="22" y="44" width="10" height="2" rx="1" fill="var(--text-secondary)" />
                <circle cx="28" cy="148" r="4" fill="var(--accent)" />

                <rect
                  x="48"
                  y="16"
                  width="256"
                  height="32"
                  rx="4"
                  fill="var(--surface-raised)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect x="64" y="30" width="60" height="4" rx="2" fill="var(--text-display)" />
                <rect x="264" y="28" width="28" height="8" rx="4" fill="var(--text-primary)" />

                <rect
                  x="48"
                  y="56"
                  width="160"
                  height="108"
                  rx="4"
                  fill="var(--surface-raised)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect x="64" y="70" width="48" height="4" rx="2" fill="var(--text-display)" />
                <rect x="64" y="82" width="128" height="1" fill="var(--border-visible)" />
                <rect
                  x="64"
                  y="94"
                  width="60"
                  height="40"
                  rx="2"
                  fill="var(--surface)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect
                  x="132"
                  y="94"
                  width="60"
                  height="40"
                  rx="2"
                  fill="var(--surface)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <circle cx="76" cy="106" r="3" fill="var(--accent)" />
                <rect x="86" y="104" width="28" height="2" rx="1" fill="var(--text-primary)" />
                <rect x="86" y="110" width="20" height="2" rx="1" fill="var(--text-secondary)" />
                <rect x="64" y="144" width="128" height="8" rx="4" fill="var(--surface)" />

                <rect
                  x="220"
                  y="56"
                  width="84"
                  height="50"
                  rx="4"
                  fill="var(--surface-raised)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect x="232" y="70" width="36" height="4" rx="2" fill="var(--text-display)" />
                <rect x="232" y="80" width="60" height="1" fill="var(--border-visible)" />
                <rect x="232" y="88" width="60" height="4" rx="2" fill="var(--text-primary)" />

                <rect
                  x="220"
                  y="114"
                  width="84"
                  height="50"
                  rx="4"
                  fill="var(--surface-raised)"
                  stroke="var(--border-visible)"
                  strokeWidth="1"
                />
                <rect x="232" y="128" width="48" height="4" rx="2" fill="var(--text-display)" />
                <circle cx="240" cy="144" r="3" fill="var(--text-tertiary)" />
                <circle cx="252" cy="144" r="3" fill="var(--text-secondary)" />
                <circle cx="264" cy="144" r="3" fill="var(--accent)" />
              </svg>
            </div>
            <div className="showcase-intro-card__content">
              <span className="showcase-intro-card__eyebrow">{t('项目介绍', 'Project Intro')}</span>
              <h1 className="showcase-intro-card__title">Nothing UI</h1>
              <p className="showcase-intro-card__text">
                {t(
                  '为 AI OS 构建的单色设计系统。查看完整项目介绍、设计哲学、字体与色彩系统、组件矩阵以及 AI OS Agent 扩展。',
                  'A monochrome design system built for AI OS. Explore the full project intro, philosophy, typography, color system, component matrix, and AI OS Agent extensions.',
                )}
              </p>
              <Link
                className="showcase-intro-card__link"
                to="/project-intro"
                onMouseEnter={preloadProjectIntro}
              >
                {t('查看项目介绍', 'View Project Intro')}
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </section>

        <AgentOSSection
          t={t}
          agentOrbState={agentOrbState}
          setAgentOrbState={setAgentOrbState}
          agentPlanSteps={agentPlanSteps}
          setAgentPlanSteps={setAgentPlanSteps}
          agentTraceSteps={agentTraceSteps}
          agentToolCalls={agentToolCalls}
          approvalOpen={approvalOpen}
          setApprovalOpen={setApprovalOpen}
        />
        <CoreInteractionSection t={t} sliderValue={sliderValue} setSliderValue={setSliderValue} />
        <DataDisplaySection t={t} />
        <OverlaysSection
          t={t}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          bottomSheetOpen={bottomSheetOpen}
          setBottomSheetOpen={setBottomSheetOpen}
          commandOpen={commandOpen}
          setCommandOpen={setCommandOpen}
        />
        <NavigationSection
          t={t}
          dateNavLabel={dateNavLabel}
          onDatePrev={handleDatePrev}
          onDateNext={handleDateNext}
          paginationPage={paginationPage}
          setPaginationPage={setPaginationPage}
        />
        <MenusSelectionSection
          t={t}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          toggleGroupValue={toggleGroupValue}
          setToggleGroupValue={setToggleGroupValue}
        />
        <StatesSection
          t={t}
          alertDialogOpen={alertDialogOpen}
          setAlertDialogOpen={setAlertDialogOpen}
        />
        <UtilitySection t={t} otpValue={otpValue} setOtpValue={setOtpValue} />
        <ClockCalendarSection
          t={t}
          worldClockCities={worldClockCities}
          setWorldClockCities={setWorldClockCities}
        />
        <SystemMonitoringSection t={t} />
        <UtilityToolsSection t={t} />
        <TimeProgressSection t={t} spinnerItems={spinnerItems} setSpinnerItems={setSpinnerItems} />
        <VisualDisplaySection t={t} />
        <FeatureWidgetsSection t={t} />
        <WidgetLayoutSection t={t} />
        <Figma20LibrarySection t={t} />
        <NullframeSection t={t} />
      </div>
    </main>
  )
}

export default Showcase
