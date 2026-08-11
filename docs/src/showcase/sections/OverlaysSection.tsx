import Button from '@/Button'
import Modal from '@/Modal'
import Popover from '@/Popover'
import HoverCard from '@/HoverCard'
import Select from '@/Select'
import Sheet from '@/Sheet'
import Switch from '@/Switch'
import Command from '@/Command'
import { useTheme } from '@/ThemeProvider'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface OverlaysSectionProps {
  t: T
  modalOpen: boolean
  setModalOpen: (open: boolean) => void
  dropdownValue: string | undefined
  setDropdownValue: (value: string | undefined) => void
  sheetOpen: boolean
  setSheetOpen: (open: boolean) => void
  bottomSheetOpen: boolean
  setBottomSheetOpen: (open: boolean) => void
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
}

export function OverlaysSection({
  t,
  modalOpen,
  setModalOpen,
  dropdownValue,
  setDropdownValue,
  sheetOpen,
  setSheetOpen,
  bottomSheetOpen,
  setBottomSheetOpen,
  commandOpen,
  setCommandOpen,
}: OverlaysSectionProps) {
  const { resolvedTheme } = useTheme()
  return (
    <CategorySection id="overlays" title={t('弹窗与层', 'Overlays')}>
      <DemoCard title={t('模态框', 'Modal')}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          {t('打开模态框', 'Open Modal')}
        </Button>
        <Modal
          open={modalOpen}
          title={t('确认操作', 'Confirm Action')}
          onClose={() => setModalOpen(false)}
          footer={
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              {t('确认', 'Confirm')}
            </Button>
          }
        >
          <p style={{ fontSize: 'var(--body)' }}>
            {t(
              '你确定要继续吗？此操作无法撤销。',
              'Are you sure you want to proceed? This action cannot be undone.',
            )}
          </p>
        </Modal>
      </DemoCard>

      <DemoCard title={t('弹出框', 'Popover')}>
        <Popover
          side="bottom"
          content={
            <div className="showcase-popover-content">
              <div className="showcase-popover-title">{t('弹出标题', 'Popover Title')}</div>
              <div>{t('弹出框内的一些内容。', 'Some content inside the popover.')}</div>
            </div>
          }
        >
          <Button variant="secondary">{t('打开弹出框', 'Open Popover')}</Button>
        </Popover>
      </DemoCard>

      <DemoCard title={t('悬停卡片', 'Hover Card')}>
        <HoverCard
          side="bottom"
          content={
            <div className="showcase-popover-content">
              <div className="showcase-popover-title">@aiosui</div>
              <div>
                {t('AIOS 生态系统的设计系统。', 'Design system for the AIOS ecosystem.')}
              </div>
            </div>
          }
        >
          <a href="#" className="showcase-inline-link" onClick={(e) => e.preventDefault()}>
            @aiosui
          </a>
        </HoverCard>
      </DemoCard>

      <DemoCard title={t('轻提示（Toast）', 'Sonner (Toast)')} variant="flex-wrap">
        <p className="showcase-not-implemented">
          {t('组件尚未实现', 'Component not yet implemented')}
        </p>
      </DemoCard>

      <DemoCard title={t('下拉', 'Dropdown')}>
        <Select
          style={{ maxWidth: '300px' }}
          options={[
            { label: t('选项 A', 'Option A'), value: 'a' },
            { label: t('选项 B', 'Option B'), value: 'b' },
            { label: t('选项 C', 'Option C'), value: 'c' },
            { label: t('已禁用', 'Disabled'), value: 'd', disabled: true },
          ]}
          value={dropdownValue}
          onValueChange={setDropdownValue}
          placeholder={t('请选择', 'Choose one')}
        />
      </DemoCard>

      <DemoCard title={t('抽屉', 'Sheet')}>
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          {t('打开抽屉', 'Open Sheet')}
        </Button>
        <Sheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          side="right"
          title={t('设置面板', 'Settings Panel')}
        >
          <Switch
            label={t('深色模式', 'Dark Mode')}
            checked={resolvedTheme === 'dark'}
            style={{ display: 'block', marginBottom: 'var(--space-lg)' }}
          />
          <Switch
            label={t('通知', 'Notifications')}
            checked={true}
            style={{ display: 'block', marginBottom: 'var(--space-lg)' }}
          />
          <Switch label={t('自动更新', 'Auto-update')} style={{ display: 'block' }} />
        </Sheet>
      </DemoCard>

      <DemoCard title={t('底部抽屉', 'Bottom Sheet')}>
        <Button variant="primary" onClick={() => setBottomSheetOpen(true)}>
          {t('打开底部抽屉', 'Open Bottom Sheet')}
        </Button>
        <Sheet
          open={bottomSheetOpen}
          onOpenChange={setBottomSheetOpen}
          side="bottom"
          title={t('设置', 'Settings')}
          sections={[
            {
              title: t('显示', 'Display'),
              content: (
                <Switch label={t('深色模式', 'Dark Mode')} checked={resolvedTheme === 'dark'} />
              ),
            },
            {
              title: t('连接', 'Connectivity'),
              content: <Switch label={t('Wi-Fi', 'Wi-Fi')} checked={true} />,
            },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('命令面板', 'Command Palette')} last>
        <Button variant="primary" onClick={() => setCommandOpen(true)}>
          {t('打开命令面板', 'Open Command Palette')}
        </Button>
        <Command
          open={commandOpen}
          onOpenChange={setCommandOpen}
          groups={[
            {
              heading: t('操作', 'Actions'),
              items: [
                { id: '1', label: t('新建文件', 'New File'), shortcut: '⌘N', onSelect: () => {} },
                { id: '2', label: t('打开文件', 'Open File'), shortcut: '⌘O', onSelect: () => {} },
                { id: '3', label: t('保存', 'Save'), shortcut: '⌘S', onSelect: () => {} },
              ],
            },
            {
              heading: t('导航', 'Navigation'),
              items: [
                { id: '4', label: t('回到主页', 'Go to Home'), onSelect: () => {} },
                { id: '5', label: t('打开设置', 'Go to Settings'), onSelect: () => {} },
                { id: '6', label: t('打开个人主页', 'Go to Profile'), onSelect: () => {} },
              ],
            },
          ]}
        />
      </DemoCard>
    </CategorySection>
  )
}

export default OverlaysSection
