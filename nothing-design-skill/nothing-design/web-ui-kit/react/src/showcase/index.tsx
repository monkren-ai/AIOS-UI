import { useShowcaseState } from './hooks/useShowcaseState'
import { CategoryNav } from './components/CategoryNav'
import { FloatingControls } from './components/FloatingControls'

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
  const {
    theme,
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
    lang,
    forceSim,
    toggleTheme,
    toggleLang,
    toggleForceSim,
    t,
  } = useShowcaseState()

  return (
    <main className="showcase-page">
      <CategoryNav t={t} />

      <FloatingControls
        t={t}
        lang={lang}
        forceSim={forceSim}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
        onToggleForceSim={toggleForceSim}
      />

      <div className="showcase-main">
        <section className="showcase-section">
          <h2 className="showcase-demo-title">{t('排版', 'Typography')}</h2>
          <h1 className="showcase-page-header">Nothing UI</h1>
          <h2 className="showcase-group-title showcase-group-title--tight">
            {t('设计系统', 'Design System')}
          </h2>
          <p className="showcase-intro-text">
            {t(
              '以克制的设计、技术的精准与独特的视觉语言构建界面。',
              'Build interfaces with purposeful restraint, technical precision, and a distinctive visual language.',
            )}
          </p>
        </section>

        <CoreInteractionSection t={t} sliderValue={sliderValue} setSliderValue={setSliderValue} />
        <DataDisplaySection t={t} />
        <OverlaysSection
          t={t}
          theme={theme}
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
        <StatesSection t={t} alertDialogOpen={alertDialogOpen} setAlertDialogOpen={setAlertDialogOpen} />
        <UtilitySection t={t} otpValue={otpValue} setOtpValue={setOtpValue} />
        <ClockCalendarSection t={t} worldClockCities={worldClockCities} setWorldClockCities={setWorldClockCities} />
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
