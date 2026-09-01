import { CodeBlock } from '../../components/CodeBlock'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { DocList, DocSection } from './_shared'

export default function MigratingV3Page() {
  const { t } = useT()
  return <div className="flex flex-col gap-12">
    <DocSection title={t('主题家族成为独立状态', 'Theme families are now independent state')}>
      <Prose className="text-foreground-muted">{t('light / dark / system API 保持不变。新的 themeId 控制语义视觉令牌，两个状态可以任意组合。', 'The light / dark / system API is unchanged. The new themeId controls semantic visual tokens, and the two states can be combined freely.')}</Prose>
      <CodeBlock code={`const { theme, setTheme, themeId, setThemeId } = useTheme()\nsetTheme('system')\nsetThemeId('aios-paper')`} />
    </DocSection>
    <DocSection title={t('已删除的 Widget 子系统', 'Removed Widget subsystem')}>
      <DocList items={[
        'Caffeinate, Clipboard, MusicPlayer, PhotoCarousel, Quotes, WalkieTalkie',
        'DateWidget, Taskbar, WidgetCard',
        t('Card.mode="widget" 与 Battery.widgetMode', 'Card.mode="widget" and Battery.widgetMode'),
        t('QuickToggle、AgeMotion、NextEvent、SunDial 的局部 theme prop', 'The local theme prop on QuickToggle, AgeMotion, NextEvent, and SunDial'),
      ]} />
    </DocSection>
    <DocSection title={t('替代方式', 'Replacements')}>
      <Prose className="text-foreground-muted">{t('普通内容容器改用 Card；Battery 直接使用 segmented 或 ring。产品级日期、任务栏和媒体能力应由应用层组合基础组件。升级后运行 tsc --noEmit 定位调用点。', 'Use Card for regular content and Battery with segmented or ring. Product-level date, taskbar, and media features should be composed in the application. Run tsc --noEmit after upgrading to locate call sites.')}</Prose>
    </DocSection>
  </div>
}
