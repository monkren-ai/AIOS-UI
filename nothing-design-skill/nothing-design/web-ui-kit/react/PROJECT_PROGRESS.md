# AIOS UI — 项目进度

> 最后更新：2026-08-06  
> 产品名：**AIOS UI** · 包名：`aios-ui-kit@2.0.0`  
> 路径：`nothing-design-skill/nothing-design/web-ui-kit/react`

---

## 概览

AIOS UI 是面向 AI OS 的 React 组件库，视觉基于 Nothing 设计语言。**v2.0** 已完成样式层重写（Tailwind v4 + CVA）与文档站；组件文档 **71/71**。

| 指标 | 数值 |
|------|------|
| 产品名 | AIOS UI |
| 包名 | `aios-ui-kit` |
| React | ^19.2.7 |
| TypeScript | ^6.0.3 |
| 样式 | Tailwind CSS ^4.3 + tokens / `@theme` |
| 文档组件页 | 71 |

---

## 里程碑

### ✅ v2.0（当前）

| 项目 | 状态 |
|------|------|
| Tailwind v4 + `theme.css` + `cn` / CVA | ✅ |
| API 破坏性变更（Switch / Input / Modal·Sheet / ContextMenu） | ✅ |
| 子路径导出 + barrel sync | ✅ |
| DirectionProvider · ReducedMotionProvider | ✅ |
| 文档站 · 组件文档 71/71 · migrating-v2 | ✅ |
| 产品更名 AIOS UI · 包名 `aios-ui-kit` | ✅ |
| CI（sync / tsc / lint / test / build） | ✅ |

### ⬜ 发布与后续

| 项目 | 说明 |
|------|------|
| **npm 发布** | 包名 `aios-ui-kit` 可用；需本机 `npm login` 后 `npm publish` |
| **GitHub Pages** | 站点 `base: '/AIOS-UI/'`（与仓库名一致） |
| Vanilla JS Kit 对齐 | `web-ui-kit/` 下非 React 版本尚未完全对齐 v2 |

规范见 [AGENTS.md](./AGENTS.md)、[REFACTOR-SPEC.md](./REFACTOR-SPEC.md)。变更见 [CHANGELOG.md](./CHANGELOG.md)。
