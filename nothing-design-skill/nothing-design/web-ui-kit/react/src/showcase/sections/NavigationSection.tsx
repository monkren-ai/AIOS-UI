import Navigation from '@/Navigation'
import DateNav from '@/DateNav'
import { Tabs, TabPanel } from '@/Tabs'
import Breadcrumb from '@/Breadcrumb'
import Pagination from '@/Pagination'
import NavigationMenu from '@/NavigationMenu'
import Sidebar from '@/Sidebar'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface NavigationSectionProps {
  t: T
  dateNavLabel: string
  onDatePrev: () => void
  onDateNext: () => void
  paginationPage: number
  setPaginationPage: (page: number) => void
}

export function NavigationSection({
  t,
  dateNavLabel,
  onDatePrev,
  onDateNext,
  paginationPage,
  setPaginationPage,
}: NavigationSectionProps) {
  return (
    <CategorySection id="navigation" title={t('导航', 'Navigation')}>
      <DemoCard title={t('导航栏', 'Navigation')}>
        <Navigation
          items={[
            { label: t('主页', 'Home') },
            { label: t('设备', 'Devices') },
            { label: t('设置', 'Settings') },
          ]}
          style={{ marginBottom: 'var(--space-md)' }}
        />
        <Navigation
          variant="bracket"
          items={[
            { label: t('主页', 'Home') },
            { label: t('设备', 'Devices') },
            { label: t('设置', 'Settings') },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('日期导航', 'Date Nav')}>
        <DateNav
          label={dateNavLabel}
          onPrev={onDatePrev}
          onNext={onDateNext}
          grotesk
        />
      </DemoCard>

      <DemoCard title={t('标签页', 'Tabs')}>
        <Tabs
          style={{ maxWidth: '500px' }}
          items={[
            { value: 'account', label: t('账号', 'Account') },
            { value: 'password', label: t('密码', 'Password') },
            { value: 'settings', label: t('设置', 'Settings') },
          ]}
        >
          <TabPanel value="account">{t('管理你的账号设置与偏好。', 'Manage your account settings and preferences.')}</TabPanel>
          <TabPanel value="password">{t('修改你的密码与安全选项。', 'Change your password and security options.')}</TabPanel>
          <TabPanel value="settings">{t('配置应用设置与通知。', 'Configure application settings and notifications.')}</TabPanel>
        </Tabs>
      </DemoCard>

      <DemoCard title={t('面包屑', 'Breadcrumb')}>
        <Breadcrumb
          items={[
            { label: t('主页', 'Home'), href: '#' },
            { label: t('产品', 'Products'), href: '#' },
            { label: t('分类', 'Category'), href: '#' },
            { label: t('当前页', 'Current Page') },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('分页', 'Pagination')}>
        <Pagination
          page={paginationPage}
          totalPages={20}
          onPageChange={setPaginationPage}
        />
      </DemoCard>

      <DemoCard title={t('导航菜单', 'Navigation Menu')}>
        <NavigationMenu
          items={[
            {
              label: t('产品', 'Products'),
              children: [
                { label: t('Phone (1)', 'Phone (1)'), onClick: () => {} },
                { label: t('Phone (2)', 'Phone (2)'), onClick: () => {} },
                { label: t('Ear (1)', 'Ear (1)'), onClick: () => {} },
              ],
            },
            {
              label: t('公司', 'Company'),
              children: [
                { label: t('关于', 'About'), onClick: () => {} },
                { label: t('招聘', 'Careers'), onClick: () => {} },
              ],
            },
            { label: t('社区', 'Community'), onClick: () => {} },
          ]}
        />
      </DemoCard>

      <DemoCard title={t('侧边栏', 'Sidebar')} last>
        <Sidebar
          style={{ maxWidth: '240px' }}
          items={[
            { label: t('仪表盘', 'Dashboard'), active: true, icon: <span>◉</span> },
            { label: t('分析', 'Analytics'), icon: <span>◎</span>, badge: 3 },
            { label: t('报告', 'Reports'), icon: <span>◈</span> },
            { label: t('设置', 'Settings'), icon: <span>⚙</span> },
            { label: t('帮助', 'Help'), icon: <span>?⃝</span> },
          ]}
          header={<span className="showcase-sidebar-header">Nothing UI</span>}
        />
      </DemoCard>
    </CategorySection>
  )
}

export default NavigationSection
