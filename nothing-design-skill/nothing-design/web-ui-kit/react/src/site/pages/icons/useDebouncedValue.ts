import * as React from 'react'

/** 输入停顿 `delay` 毫秒后才把值放出去，避免每敲一个字就重算 6000 条。 */
export function useDebouncedValue<T>(value: T, delay = 180): T {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])

  return debounced
}

export default useDebouncedValue
