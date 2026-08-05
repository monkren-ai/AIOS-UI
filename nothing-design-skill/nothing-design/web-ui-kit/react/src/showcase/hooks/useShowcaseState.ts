import { useCallback, useEffect, useState } from 'react'
import type { AgentState, PlanStep, TraceStep, ToolCallRowProps } from '@/agent'

export type { Lang, T } from '@/App'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * 展示页状态管理。
 *
 * 集中持有原 App.tsx 内的所有组件状态，供各 section 与浮动控制组件消费。
 * 主题与语言由 App.tsx 统一管理，跨路由共享。
 */
export function useShowcaseState() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [dateNavLabel, setDateNavLabel] = useState('May 2026')
  const [spinnerItems, setSpinnerItems] = useState<string[]>([
    'YES',
    'NO',
    'MAYBE',
    'LATER',
    'SKIP',
    'TRY',
  ])
  const [worldClockCities, setWorldClockCities] = useState([
    { name: 'NEW YORK', offset: -5 },
    { name: 'LONDON', offset: 0 },
    { name: 'TOKYO', offset: 9 },
    { name: 'SYDNEY', offset: 11 },
  ])
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [paginationPage, setPaginationPage] = useState(5)
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toggleGroupValue, setToggleGroupValue] = useState<string[]>(['bold'])
  const [otpValue, setOtpValue] = useState('')
  const [commandOpen, setCommandOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(65)
  const [forceSim, setForceSim] = useState(false)

  // Agent / AI OS 展示状态
  const [agentOrbState, setAgentOrbState] = useState<AgentState>('thinking')
  const [approvalOpen, setApprovalOpen] = useState(false)
  const [agentPlanSteps, setAgentPlanSteps] = useState<PlanStep[]>([
    { id: '1', description: '搜索项目中的设计系统文档', tool: 'fileSearch', status: 'approved' },
    { id: '2', description: '读取 tokens.css 与现有组件', tool: 'readFile', status: 'approved' },
    { id: '3', description: '生成 AI OS Agent Token 提案', tool: 'writeFile', status: 'pending' },
    {
      id: '4',
      description: '创建 AgentOrb / PlanCard / ToolCallRow 组件',
      tool: 'writeFile',
      status: 'pending',
    },
  ])
  const [agentTraceSteps, setAgentTraceSteps] = useState<TraceStep[]>([
    { id: 't1', label: '初始化 Agent 上下文', status: 'done', timestamp: '09:12:04' },
    { id: 't2', label: '解析设计哲学约束', status: 'done', timestamp: '09:12:05' },
    { id: 't3', label: '生成组件规格', status: 'active', timestamp: '09:12:07' },
    { id: 't4', label: '写入文件系统', status: 'pending' },
  ])
  const [agentToolCalls, setAgentToolCalls] = useState<Omit<ToolCallRowProps, 'ref'>[]>([
    {
      tool: 'readFile',
      args: { path: 'src/styles/tokens.css' },
      status: 'done',
      elapsedMs: 120,
      result: '读取 80+ tokens 完成',
    },
    {
      tool: 'searchCode',
      args: { query: 'border-left.*accent', glob: '*.css' },
      status: 'done',
      elapsedMs: 340,
      result: '3 matches found',
    },
    {
      tool: 'writeFile',
      args: { path: 'src/agent/AgentOrb.tsx' },
      status: 'running',
      elapsedMs: 560,
    },
  ])

  // 同步到 document.documentElement dataset,让 CSS 强制覆盖
  useEffect(() => {
    document.documentElement.setAttribute('data-force-sim', forceSim ? 'true' : 'false')
  }, [forceSim])

  const toggleForceSim = useCallback(() => {
    setForceSim((v) => !v)
  }, [])

  const handleDatePrev = useCallback(() => {
    setDateNavLabel((prev) => {
      const parts = prev.split(' ')
      const month = parts[0]
      const year = parseInt(parts[1])
      let idx = MONTHS.indexOf(month)
      if (idx === 0) {
        idx = 11
        return `${MONTHS[idx]} ${year - 1}`
      }
      return `${MONTHS[idx - 1]} ${year}`
    })
  }, [])

  const handleDateNext = useCallback(() => {
    setDateNavLabel((prev) => {
      const parts = prev.split(' ')
      const month = parts[0]
      const year = parseInt(parts[1])
      let idx = MONTHS.indexOf(month)
      if (idx === 11) {
        idx = 0
        return `${MONTHS[idx]} ${year + 1}`
      }
      return `${MONTHS[idx + 1]} ${year}`
    })
  }, [])

  return {
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
    setAgentTraceSteps,
    agentToolCalls,
    setAgentToolCalls,
  }
}

export type ShowcaseState = ReturnType<typeof useShowcaseState>
