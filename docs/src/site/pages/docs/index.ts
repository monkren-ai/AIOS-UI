import type { ComponentType } from 'react'

import InstallationPage from './installation'
import UsagePage from './usage'
import DesignPrinciplesPage from './design-principles'
import ThemingPage from './theming'
import DarkModePage from './dark-mode'
import RtlPage from './rtl'
import AnimationPage from './animation'
import AccessibilityPage from './accessibility'
import ThemeProviderPage from './theme-provider'
import DirectionProviderPage from './direction-provider'
import ReducedMotionProviderPage from './reduced-motion-provider'
import MigratingV2Page from './migrating-v2'
import MigratingV3Page from './migrating-v3'

/**
 * slug → 正文组件。
 *
 * key 必须和 `registry/docs.ts` 里的 `DOC_PAGES[].slug` 一一对应；
 * 标题、描述、分组由注册表提供，这里只负责正文。
 */
export const DOC_PAGE_COMPONENTS: Record<string, ComponentType> = {
  installation: InstallationPage,
  usage: UsagePage,
  'migrating-v2': MigratingV2Page,
  'migrating-v3': MigratingV3Page,
  'design-principles': DesignPrinciplesPage,
  theming: ThemingPage,
  'dark-mode': DarkModePage,
  rtl: RtlPage,
  animation: AnimationPage,
  accessibility: AccessibilityPage,
  'theme-provider': ThemeProviderPage,
  'direction-provider': DirectionProviderPage,
  'reduced-motion-provider': ReducedMotionProviderPage,
}
