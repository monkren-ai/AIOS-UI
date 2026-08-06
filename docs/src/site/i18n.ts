import { useCallback } from 'react'
import { useShowcaseContext } from '@/showcase/ShowcaseContext'
import type { Bilingual } from './registry/types'

/**
 * 文档站的语言助手。
 *
 * `t(zh, en)` 是既有 showcase 的写法，站点里沿用；
 * `tb(bilingual)` 用来直接读注册表里的 `{ zh, en }` 对象。
 */
export function useT() {
  const { t, lang, toggleLang } = useShowcaseContext()

  const tb = useCallback((value: Bilingual) => (lang === 'zh' ? value.zh : value.en), [lang])

  return { t, tb, lang, toggleLang }
}
