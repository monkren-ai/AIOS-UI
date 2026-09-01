import type { ThemeDefinition } from '@/ThemeProvider'

const DB_NAME = 'aios-ui-themes'
const STORE_NAME = 'themes'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function listStoredThemes(): Promise<ThemeDefinition[]> {
  const database = await openDatabase()
  return new Promise<ThemeDefinition[]>((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll()
    request.onsuccess = () => resolve(request.result as ThemeDefinition[])
    request.onerror = () => reject(request.error)
  }).finally(() => database.close())
}

export async function storeTheme(theme: ThemeDefinition): Promise<void> {
  const database = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).put(theme)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  }).finally(() => database.close())
}

export async function removeStoredTheme(id: string): Promise<void> {
  const database = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    transaction.objectStore(STORE_NAME).delete(id)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  }).finally(() => database.close())
}
