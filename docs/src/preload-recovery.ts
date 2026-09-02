const PRELOAD_RELOAD_KEY = 'aios-ui:preload-reload'
const PRELOAD_RETRY_WINDOW_MS = 30_000

interface PreloadFailureRecord {
  signature: string
  timestamp: number
}

interface PreloadRecoveryOptions {
  now?: () => number
  reload?: () => void
  storage?: Pick<Storage, 'getItem' | 'setItem'>
}

type VitePreloadErrorEvent = Event & { payload?: unknown }

function getFailureSignature(payload: unknown) {
  if (payload instanceof Error) return `${payload.name}:${payload.message}`
  return String(payload ?? 'unknown preload error')
}

export function createPreloadErrorHandler({
  now = Date.now,
  reload = () => window.location.reload(),
  storage = window.sessionStorage,
}: PreloadRecoveryOptions = {}) {
  return (event: Event) => {
    const signature = getFailureSignature((event as VitePreloadErrorEvent).payload)
    const timestamp = now()

    try {
      const storedValue = storage.getItem(PRELOAD_RELOAD_KEY)
      const previous = storedValue
        ? (JSON.parse(storedValue) as PreloadFailureRecord)
        : undefined

      // If the same asset still fails after a refresh, let Vite surface the error
      // instead of trapping the tab in a reload loop.
      if (
        previous?.signature === signature &&
        timestamp - previous.timestamp < PRELOAD_RETRY_WINDOW_MS
      ) {
        return
      }

      storage.setItem(PRELOAD_RELOAD_KEY, JSON.stringify({ signature, timestamp }))
    } catch {
      // Without durable per-tab state, reloading could loop indefinitely.
      return
    }

    event.preventDefault()
    reload()
  }
}

export function installPreloadErrorRecovery() {
  const handler = createPreloadErrorHandler()
  window.addEventListener('vite:preloadError', handler)
  return () => window.removeEventListener('vite:preloadError', handler)
}
