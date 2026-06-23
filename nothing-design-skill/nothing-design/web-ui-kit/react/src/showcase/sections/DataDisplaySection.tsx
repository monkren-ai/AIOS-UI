import { Card } from '@/Card'
import { DataTable } from '@/DataTable'
import ProgressBar from '@/ProgressBar'
import Badge from '@/Badge'
import Avatar from '@/Avatar'
import Separator from '@/Separator'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface DataDisplaySectionProps {
  t: T
}

export function DataDisplaySection({ t }: DataDisplaySectionProps) {
  return (
    <CategorySection id="data-display" title={t('数据展示', 'Data Display')}>
      <DemoCard title={t('卡片', 'Cards')} variant="grid">
        <Card variant="default" title={t('默认卡片', 'Default Card')} action={t('更多', 'More')}>
          <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('带标题和操作的标准卡片。', 'Standard card with header and action.')}</p>
        </Card>
        <Card variant="raised" title={t('突出卡片', 'Raised Card')}>
          <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('具有明显背景的浮动界面。', 'Elevated surface with background distinction.')}</p>
        </Card>
        <Card variant="compact" title={t('紧凑', 'Compact')}>
          <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('为密集布局减少内边距。', 'Reduced padding for dense layouts.')}</p>
        </Card>
        <Card variant="technical" title="[ Technical ]">
          <p style={{ fontSize: 'var(--body)', margin: 0 }}>{t('等宽技术风格变体。', 'Monospace technical variant.')}</p>
        </Card>
      </DemoCard>

      <DemoCard title={t('数据行', 'Data Rows')}>
        <DataTable
          variant="rows"
          items={[
            { label: t('CPU 使用率', 'CPU Usage'), value: '42', unit: '%', status: 'good' },
            { label: t('内存', 'Memory'), value: '78', unit: '%', status: 'warning' },
            { label: t('磁盘 I/O', 'Disk I/O'), value: '95', unit: '%', status: 'error' },
            { label: t('网络', 'Network'), value: '1.2', unit: 'GB/s', status: 'info' },
            { label: t('运行时长', 'Uptime'), value: '14', unit: t('天', 'days'), trend: '↑' },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('数据网格', 'Data Grid')}>
        <DataTable
          variant="grid"
          columns={[
            { key: 'name', label: t('名称', 'Name') },
            { key: 'status', label: t('状态', 'Status') },
            { key: 'value', label: t('数值', 'Value'), type: 'numeric' },
          ]}
          rows={[
            { cells: { name: t('传感器 A', 'Sensor A'), status: t('在线', 'Online'), value: 42 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'good' }] },
            { cells: { name: t('传感器 B', 'Sensor B'), status: t('警告', 'Warning'), value: 78 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'warning' }] },
            { cells: { name: t('传感器 C', 'Sensor C'), status: t('离线', 'Offline'), value: 0 }, interactive: true, cellStatuses: [{ columnKey: 'status', status: 'error' }] },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('进度条', 'Progress Bar')}>
        <ProgressBar value={65} size="hero" label={t('存储', 'Storage')} unit="%" status="default" style={{ marginBottom: 'var(--space-xl)' }} />
        <ProgressBar value={78} size="standard" label={t('内存', 'Memory')} unit="%" status="warning" style={{ marginBottom: 'var(--space-xl)' }} />
        <ProgressBar value={95} size="compact" label={t('CPU', 'CPU')} unit="%" status="overlimit" />
      </DemoCard>

      <DemoCard title={t('表格', 'Table')}>
        <DataTable
          variant="table"
          columns={[
            { key: 'name', label: t('姓名', 'Name') },
            { key: 'role', label: t('角色', 'Role') },
            { key: 'status', label: t('状态', 'Status') },
            { key: 'score', label: t('分数', 'Score'), align: 'right' as const },
          ]}
          rows={[
            { cells: { name: t('爱丽丝', 'Alice'), role: t('工程师', 'Engineer'), status: t('活跃', 'Active'), score: '92' } },
            { cells: { name: t('鲍勃', 'Bob'), role: t('设计师', 'Designer'), status: t('离开', 'Away'), score: '87' } },
            { cells: { name: t('卡罗尔', 'Carol'), role: t('经理', 'Manager'), status: t('活跃', 'Active'), score: '95' } },
          ]}
          striped
          hoverable
        />
      </DemoCard>

      <DemoCard title={t('徽章', 'Badge')} variant="flex-wrap">
        <Badge variant="default">{t('默认', 'Default')}</Badge>
        <Badge variant="secondary">{t('次要', 'Secondary')}</Badge>
        <Badge variant="destructive">{t('危险', 'Destructive')}</Badge>
        <Badge variant="outline">{t('描边', 'Outline')}</Badge>
      </DemoCard>

      <DemoCard title={t('头像', 'Avatar')} variant="flex-wrap">
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
      </DemoCard>

      <DemoCard title={t('分隔线', 'Separator')}>
        <div className="showcase-separator-row">
          <span style={{ fontSize: 'var(--body)' }}>{t('左', 'Left')}</span>
          <Separator orientation="vertical" decorative />
          <span style={{ fontSize: 'var(--body)' }}>{t('右', 'Right')}</span>
        </div>
        <Separator orientation="horizontal" decorative style={{ marginTop: 'var(--space-md)' }} />
      </DemoCard>

      <DemoCard title={t('骨架屏', 'Skeleton')}>
        <p className="showcase-not-implemented">{t('组件尚未实现', 'Component not yet implemented')}</p>
      </DemoCard>

      <DemoCard title={t('进度条 — 紧凑 & 不确定', 'ProgressBar — Slim & Indeterminate')} last>
        <div className="showcase-sub-label">{t('紧凑', 'Slim')}</div>
        <ProgressBar value={65} variant="slim" style={{ marginBottom: 'var(--space-xl)' }} />
        <div className="showcase-sub-label">{t('紧凑 — 良好', 'Slim — Good')}</div>
        <ProgressBar value={80} variant="slim" status="good" style={{ marginBottom: 'var(--space-xl)' }} />
        <div className="showcase-sub-label">{t('不确定', 'Indeterminate')}</div>
        <ProgressBar value={0} indeterminate style={{ marginBottom: 'var(--space-xl)' }} />
        <div className="showcase-sub-label">{t('紧凑不确定', 'Slim Indeterminate')}</div>
        <ProgressBar value={0} variant="slim" indeterminate />
      </DemoCard>
    </CategorySection>
  )
}

export default DataDisplaySection
