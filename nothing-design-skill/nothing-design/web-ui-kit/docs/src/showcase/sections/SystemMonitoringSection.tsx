import Battery from '@/Battery'
import SystemMonitor from '@/SystemMonitor'
import QuickToggle from '@/QuickToggle'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface SystemMonitoringSectionProps {
  t: T
}

export function SystemMonitoringSection({ t }: SystemMonitoringSectionProps) {
  return (
    <CategorySection id="system-monitoring" title={t('系统与监控', 'System & Monitoring')}>
      <DemoCard title={t('电量', 'Battery')}>
        <Battery />
      </DemoCard>

      <DemoCard title={t('系统监控', 'System Monitor')}>
        <SystemMonitor />
      </DemoCard>

      <DemoCard title={t('快速切换', 'Quick Toggle')} last>
        <QuickToggle
          variant="circle"
          theme="light"
          label={t('激活', 'Active')}
          active
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="circle"
          theme="light"
          label={t('手电筒', 'Torch')}
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M18 6L17 7M6 18l1-1M6 6l1 1M18 18l-1-1"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          }
        />
        <QuickToggle
          variant="circle"
          theme="accent"
          label={t('勿扰', 'DND')}
          active
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="2"
                y1="2"
                x2="22"
                y2="22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="circle"
          theme="light"
          label={t('旋转', 'Rotate')}
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="pill"
          theme="dark"
          label={t('热点', 'Hotspot')}
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M12 12h.01M8.5 8.5a5 5 0 017 0M5 5a10 10 0 0114 0M19 5a10 10 0 010 14M5 5a10 10 0 000 14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="pill"
          theme="dark"
          label={t('蓝牙', 'Bluetooth')}
          active
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M6.5 6.5h11v11h-11z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="pill"
          theme="light"
          label={t('移动数据', 'Mobile Data')}
          active
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <QuickToggle
          variant="pill"
          theme="dark"
          label={t('NFC', 'NFC')}
          icon={
            <svg viewBox="0 0 24 24" width="20" height="20">
              <rect
                x="6"
                y="2"
                width="12"
                height="20"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <line
                x1="10"
                y1="18"
                x2="14"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </DemoCard>
    </CategorySection>
  )
}

export default SystemMonitoringSection
