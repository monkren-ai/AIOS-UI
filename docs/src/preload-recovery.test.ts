import { describe, expect, it, vi } from 'vitest'
import { createPreloadErrorHandler } from './preload-recovery'

function createStorage() {
  const values = new Map<string, string>()
  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
  }
}

function createPreloadError(message: string) {
  const event = new Event('vite:preloadError', { cancelable: true }) as Event & {
    payload: Error
  }
  event.payload = new Error(message)
  return event
}

describe('preload error recovery', () => {
  it('reloads once when a stale asset fails to preload', () => {
    const reload = vi.fn()
    const handler = createPreloadErrorHandler({
      now: () => 1_000,
      reload,
      storage: createStorage(),
    })
    const event = createPreloadError('Unable to preload CSS for stale.css')

    handler(event)

    expect(event.defaultPrevented).toBe(true)
    expect(reload).toHaveBeenCalledOnce()
  })

  it('does not loop when the same asset still fails after reloading', () => {
    const reload = vi.fn()
    const storage = createStorage()
    const firstHandler = createPreloadErrorHandler({ now: () => 1_000, reload, storage })
    firstHandler(createPreloadError('Unable to preload CSS for stale.css'))

    const repeatedEvent = createPreloadError('Unable to preload CSS for stale.css')
    const secondHandler = createPreloadErrorHandler({ now: () => 2_000, reload, storage })
    secondHandler(repeatedEvent)

    expect(repeatedEvent.defaultPrevented).toBe(false)
    expect(reload).toHaveBeenCalledOnce()
  })

  it('can recover a different stale asset during the retry window', () => {
    const reload = vi.fn()
    const storage = createStorage()
    const handler = createPreloadErrorHandler({ now: () => 1_000, reload, storage })
    handler(createPreloadError('Unable to preload CSS for first.css'))

    const nextEvent = createPreloadError('Unable to preload CSS for second.css')
    createPreloadErrorHandler({ now: () => 2_000, reload, storage })(nextEvent)

    expect(nextEvent.defaultPrevented).toBe(true)
    expect(reload).toHaveBeenCalledTimes(2)
  })
})
