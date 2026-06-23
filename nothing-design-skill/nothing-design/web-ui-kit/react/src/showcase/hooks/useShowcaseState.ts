import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
export type Lang = 'zh' | 'en'
export type T = (zh: string, en: string) => string

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * 展示页状态管理。
 *
 * 集中持有原 App.tsx 内的所有组件状态、主题/语言切换逻辑
 * 与翻译函数 `t`，供各 section 与浮动控制组件消费。
 */
export function useShowcaseState() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState<string | undefined>(undefined)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [dateNavLabel, setDateNavLabel] = useState('May 2026')
  const [spinnerItems, setSpinnerItems] = useState<string[]>(['YES', 'NO', 'MAYBE', 'LATER', 'SKIP', 'TRY'])
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
  const [lang, setLang] = useState<Lang>('zh')
  const [forceSim, setForceSim] = useState(false)

  // 同步到 document.documentElement dataset,让 CSS 强制覆盖
  useEffect(() => {
    document.documentElement.setAttribute('data-force-sim', forceSim ? 'true' : 'false')
  }, [forceSim])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }, [])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }, [])

  const toggleForceSim = useCallback(() => {
    setForceSim((v) => !v)
  }, [])

  const t = useCallback<T>((zh, en) => (lang === 'zh' ? zh : en), [lang])

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
    theme,
    setTheme,
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
  }
}

export type ShowcaseState = ReturnType<typeof useShowcaseState>
