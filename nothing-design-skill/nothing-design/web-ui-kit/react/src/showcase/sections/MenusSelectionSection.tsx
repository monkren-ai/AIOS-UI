import Accordion from '@/Accordion'
import Checkbox from '@/Checkbox'
import RadioGroup from '@/RadioGroup'
import Select from '@/Select'
import ContextMenu from '@/ContextMenu'
import DropdownMenu from '@/DropdownMenu'
import { Toggle, ToggleGroup } from '@/Toggle'
import Collapsible from '@/Collapsible'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface MenusSelectionSectionProps {
  t: T
  radioValue: string
  setRadioValue: (value: string) => void
  selectValue: string | undefined
  setSelectValue: (value: string | undefined) => void
  toggleGroupValue: string[]
  setToggleGroupValue: (value: string[]) => void
}

export function MenusSelectionSection({
  t,
  radioValue,
  setRadioValue,
  selectValue,
  setSelectValue,
  toggleGroupValue,
  setToggleGroupValue,
}: MenusSelectionSectionProps) {
  return (
    <CategorySection id="menus-selection" title={t('菜单与选择', 'Menus & Selection')}>
      <DemoCard title={t('折叠面板', 'Accordion')}>
        <Accordion
          type="single"
          style={{ maxWidth: '500px' }}
          items={[
            {
              id: '1',
              title: t('什么是 Nothing UI？', 'What is Nothing UI?'),
              content: t(
                '一个以克制与精确为核心构建的设计系统。',
                'A design system built with purposeful restraint and technical precision.',
              ),
            },
            {
              id: '2',
              title: t('如何安装？', 'How do I install it?'),
              content: t(
                '通过 npm 安装：npm install nothing-ui-kit',
                'Install via npm: npm install nothing-ui-kit',
              ),
            },
            {
              id: '3',
              title: t('是否具备可访问性？', 'Is it accessible?'),
              content: t(
                '是的，所有组件均遵循 WAI-ARIA 指南并支持完整键盘导航。',
                'Yes, all components follow WAI-ARIA guidelines with full keyboard navigation.',
              ),
            },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('复选框', 'Checkbox')}>
        <Checkbox
          label={t('未选中', 'Unchecked')}
          style={{ display: 'block', marginBottom: 'var(--space-md)' }}
        />
        <Checkbox
          label={t('已选中', 'Checked')}
          defaultChecked
          style={{ display: 'block', marginBottom: 'var(--space-md)' }}
        />
        <Checkbox
          label={t('不确定', 'Indeterminate')}
          checked="indeterminate"
          style={{ display: 'block' }}
        />
      </DemoCard>

      <DemoCard title={t('单选组', 'Radio Group')}>
        <RadioGroup
          value={radioValue}
          onValueChange={setRadioValue}
          orientation="vertical"
          options={[
            { value: 'option1', label: t('选项一', 'Option One') },
            { value: 'option2', label: t('选项二', 'Option Two') },
            { value: 'option3', label: t('选项三', 'Option Three') },
            { value: 'option4', label: t('选项四', 'Option Four') },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('选择', 'Select')}>
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
            { value: 'elderberry', label: t('接骨木莓', 'Elderberry') },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('右键菜单', 'Context Menu')}>
        <ContextMenu
          items={[
            { label: t('后退', 'Back'), shortcut: 'Alt+←' },
            { label: t('前进', 'Forward'), shortcut: 'Alt+→' },
            { label: t('刷新', 'Reload'), shortcut: 'Ctrl+R', separator: true },
            { label: t('另存为…', 'Save as...'), shortcut: 'Ctrl+S' },
            { label: t('打印…', 'Print...'), shortcut: 'Ctrl+P', separator: true },
            { label: t('查看源代码', 'View Source'), shortcut: 'Ctrl+U' },
          ]}
        >
          <div className="showcase-context-area">
            {t('右键点击此区域', 'Right-click this area')}
          </div>
        </ContextMenu>
      </DemoCard>

      <DemoCard title={t('下拉菜单', 'Dropdown Menu')}>
        <DropdownMenu
          trigger={t('菜单', 'Menu')}
          items={[
            { label: t('新建文件', 'New File'), shortcut: 'Ctrl+N' },
            { label: t('打开文件', 'Open File'), shortcut: 'Ctrl+O', separator: true },
            { label: t('保存', 'Save'), shortcut: 'Ctrl+S' },
            { label: t('另存为…', 'Save As...'), shortcut: 'Ctrl+Shift+S', separator: true },
            { label: t('退出', 'Exit') },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('菜单栏', 'Menubar')}>
        <DropdownMenu
          variant="menubar"
          items={[
            {
              label: t('文件', 'File'),
              items: [
                { label: t('新建标签页', 'New Tab'), shortcut: '⌘T', onClick: () => {} },
                { label: t('新窗口', 'New Window'), shortcut: '⌘N', onClick: () => {} },
                { label: t('分享', 'Share'), separator: true },
                { label: t('打印', 'Print'), shortcut: '⌘P', onClick: () => {} },
              ],
            },
            {
              label: t('编辑', 'Edit'),
              items: [
                { label: t('撤销', 'Undo'), shortcut: '⌘Z', onClick: () => {} },
                { label: t('重做', 'Redo'), shortcut: '⌘⇧Z', onClick: () => {} },
                { label: t('剪切', 'Cut'), separator: true, shortcut: '⌘X' },
                { label: t('复制', 'Copy'), shortcut: '⌘C' },
                { label: t('粘贴', 'Paste'), shortcut: '⌘V' },
              ],
            },
            {
              label: t('视图', 'View'),
              items: [
                { label: t('放大', 'Zoom In'), shortcut: '⌘+', onClick: () => {} },
                { label: t('缩小', 'Zoom Out'), shortcut: '⌘-', onClick: () => {} },
              ],
            },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('切换 / 切换组', 'Toggle / Toggle Group')}>
        <div className="showcase-sub-label">{t('单个切换', 'Single Toggle')}</div>
        <Toggle style={{ marginBottom: 'var(--space-lg)' }}>{t('切换', 'Toggle')}</Toggle>
        <div className="showcase-sub-label">{t('切换组', 'Toggle Group')}</div>
        <ToggleGroup value={toggleGroupValue} onValueChange={setToggleGroupValue} variant="outline">
          <Toggle value="bold">{t('粗体', 'Bold')}</Toggle>
          <Toggle value="italic">{t('斜体', 'Italic')}</Toggle>
          <Toggle value="underline">{t('下划线', 'Underline')}</Toggle>
        </ToggleGroup>
      </DemoCard>

      <DemoCard title={t('可折叠', 'Collapsible')} last>
        <Collapsible trigger={t('显示详情', 'Show Details')} style={{ maxWidth: '500px' }}>
          <div className="showcase-collapsible-content">
            {t(
              '这些是点击上方触发器后展开或折叠的隐藏详情。',
              'These are the hidden details that can be expanded or collapsed by clicking the trigger above.',
            )}
          </div>
        </Collapsible>
      </DemoCard>
    </CategorySection>
  )
}

export default MenusSelectionSection
