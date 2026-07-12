import Button from '@/Button'
import Modal from '@/Modal'
import { LoadingState, ErrorState, EmptyState, DisabledState } from '@/States'
import Alert from '@/Alert'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface StatesSectionProps {
  t: T
  alertDialogOpen: boolean
  setAlertDialogOpen: (open: boolean) => void
}

export function StatesSection({ t, alertDialogOpen, setAlertDialogOpen }: StatesSectionProps) {
  return (
    <CategorySection id="states" title={t('状态', 'States')}>
      <DemoCard title={t('状态', 'States')} variant="grid" last>
        <LoadingState progress={65} label={t('同步中', 'Syncing')} />
        <ErrorState headline={t('连接丢失', 'Connection Lost')} message={t('无法连接到服务器。', 'Unable to reach the server.')} onRetry={() => {}} />
        <EmptyState headline={t('暂无设备', 'No Devices')} description={t('配对设备以开始。', 'Pair a device to get started.')} />
        <DisabledState headline={t('功能锁定', 'Feature Locked')} description={t('需要高级套餐。', 'Requires premium plan.')} />
      </DemoCard>

      <DemoCard title={t('提示', 'Alert')}>
        <Alert title={t('注意！', 'Heads up!')} variant="default" style={{ maxWidth: '500px', marginBottom: 'var(--space-md)' }}>
          {t('你可以通过 CLI 将组件添加到应用中。', 'You can add components to your app using the CLI.')}
        </Alert>
        <Alert title={t('错误', 'Error')} variant="destructive" style={{ maxWidth: '500px' }}>
          {t('你的会话已过期。请重新登录。', 'Your session has expired. Please log in again.')}
        </Alert>
      </DemoCard>

      <DemoCard title={t('确认对话框', 'Alert Dialog')} last>
        <Button variant="destructive" onClick={() => setAlertDialogOpen(true)}>{t('删除账号', 'Delete Account')}</Button>
        <Modal
          open={alertDialogOpen}
          onClose={() => setAlertDialogOpen(false)}
          title={t('你确定吗？', 'Are you absolutely sure?')}
          variant="alert"
          description={t('此操作无法撤销。它将永久删除你的账号以及服务器上的数据。', 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.')}
          confirmLabel={t('删除', 'Delete')}
          cancelLabel={t('取消', 'Cancel')}
          destructive
          onConfirm={() => setAlertDialogOpen(false)}
          onCancel={() => setAlertDialogOpen(false)}
        />
      </DemoCard>
    </CategorySection>
  )
}

export default StatesSection
