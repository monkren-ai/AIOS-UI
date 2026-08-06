import { describe, expect, it } from 'vitest'

import { CATEGORY_BY_ID } from './categories'
import { COMPONENT_MANIFEST, COMPONENT_MANIFEST_BY_SLUG } from './manifest'
import { hasComponentDoc, loadComponentDoc } from './index'

/**
 * 清单和正文是两份东西（清单同步、正文懒加载），很容易各写各的。
 * 这里把两边对齐的约束固化下来，免得侧栏有链接、点进去是空页。
 */
describe('component registry', () => {
  it('has unique slugs', () => {
    const slugs = COMPONENT_MANIFEST.map((entry) => entry.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('uses slugs that are URL-safe and match the route param', () => {
    for (const entry of COMPONENT_MANIFEST) {
      expect(entry.slug, `${entry.name} slug`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('points every entry at a category that exists', () => {
    for (const entry of COMPONENT_MANIFEST) {
      expect(CATEGORY_BY_ID.has(entry.category), `${entry.name} → ${entry.category}`).toBe(true)
    }
  })

  it('is sorted by name so the sidebar order is stable', () => {
    const names = COMPONENT_MANIFEST.map((entry) => entry.name)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  it('describes every entry in both languages', () => {
    for (const entry of COMPONENT_MANIFEST) {
      expect(entry.description.zh.length, `${entry.name} zh`).toBeGreaterThan(0)
      expect(entry.description.en.length, `${entry.name} en`).toBeGreaterThan(0)
    }
  })

  // 每个 entry 都会把真实组件和 `?raw` 源码一并拉进来，逐个 await 的话总时长
  // 随条目数线性增长，很容易顶到默认超时。并发加载后墙钟时间由最慢的那个决定。
  it('loads a doc whose fields agree with the manifest', async () => {
    const documented = COMPONENT_MANIFEST.filter((entry) => hasComponentDoc(entry.slug))
    expect(documented.length, 'at least one component should be documented').toBeGreaterThan(0)

    const docs = await Promise.all(documented.map((entry) => loadComponentDoc(entry.slug)))

    for (const [index, entry] of documented.entries()) {
      const doc = docs[index]
      expect(doc, `${entry.slug} should export a ComponentDoc`).not.toBeNull()
      expect(doc!.slug).toBe(entry.slug)
      expect(doc!.name).toBe(entry.name)
      expect(doc!.category).toBe(entry.category)

      // 页面会直接渲染这些字段，缺了就是空白区块。
      expect(doc!.importStatement).toContain('aios-ui-kit/')
      expect(doc!.usageSnippet.length).toBeGreaterThan(0)
      expect(doc!.accessibility.length).toBeGreaterThan(0)

      for (const example of doc!.examples) {
        expect(example.code.length, `${entry.slug}/${example.id} raw source`).toBeGreaterThan(0)
      }
      const exampleIds = doc!.examples.map((example) => example.id)
      expect(new Set(exampleIds).size, `${entry.slug} duplicate example id`).toBe(exampleIds.length)
    }
  })

  it('has no orphan entry file that the manifest forgot to list', async () => {
    const modules = import.meta.glob('./entries/*.tsx')
    for (const path of Object.keys(modules)) {
      const slug = path.replace('./entries/', '').replace('.tsx', '')
      expect(COMPONENT_MANIFEST_BY_SLUG.has(slug), `${slug} is missing from the manifest`).toBe(
        true,
      )
    }
  })
})
