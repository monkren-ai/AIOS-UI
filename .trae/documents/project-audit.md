# Nothing UI 项目全面梳理计划

## 摘要

对 Nothing UI React 项目进行全面审计，识别问题并制定修复方案。项目包含 ~245 个源文件、67 个顶层组件、14 个 nullframe 组件、78 个 CSS 文件。

---

## 当前状态分析

### 项目概况
| 指标 | 数值 |
|------|------|
| React 版本 | 19.2.7 |
| TypeScript | 6.0.3 |
| Vite | 8.0.16 |
| 运行时依赖 | 4 个 (react, react-dom, clsx, motion) |
| 顶层组件 | 67 个 |
| nullframe 组件 | 14 个 |
| Widget 子组件 | 43 个 |
| CSS 文件 | 78 个 |
| 测试文件 | 0 |
| App.tsx 行数 | 1410 |

### 发现的问题（按严重度排序）

#### P0 — 严重问题

1. **缺失 CSS 变量定义**：`nullframe.css` 使用了 `--utility-orange`、`--accent-red`、`--ease-back` 三个变量，但 `tokens.css` 中未定义，导致 nullframe 仪表盘视觉异常
2. **nullframe 亮色主题不兼容**：`nullframe.css` 硬编码了深色值（`#272727`、`#1c1d1d` 等），切换亮色主题时显示异常
3. **锁文件冲突**：同时存在 `package-lock.json` 和 `pnpm-lock.yaml`

#### P1 — 中等问题

4. **App.tsx 过度膨胀**：1410 行，前 124 行全是导入（67 组件 + 40 CSS），无懒加载/代码分割
5. **CSS 手动导入**：每个组件的 CSS 在 App.tsx 中手动导入，组件单独使用时样式丢失
6. **Toast 功能声明但未渲染**：`addToast` 函数存在但无 Toast 渲染组件
7. **Playwright 未使用**：已安装 `^1.60.0` 但无任何测试代码
8. **`CtlCtx` 类型不安全**：`createContext<Ctl>(null as unknown as Ctl)`，Provider 外使用会运行时崩溃

#### P2 — 轻微问题

9. **拼写错误**：`NoSignam` → `NoSignal`，`Wedget` → `Widget`
10. **nullframe 硬编码值**：ClockHero 时区 `America/New_York`、版本号 `SYS.V4.0.0`、统计数据 `Best 23 / day`、`best 63`
11. **颜色值重复硬编码**：`#f26522`（品牌橙）在 NetworkCard 和 SeismoCard 中重复
12. **`useReducedMotion` 处理风格不一致**：NfCard 用 `||`，其他文件用 `?? false`
13. **图片资源哈希命名**：7 个 PNG 文件缺乏语义
14. **`figma:asset` 路径别名**：冒号非标准用法
15. **Widget 子组件命名不规范**：`Active`/`Active1`、`OverLimit`/`OverLimit1` 等数字后缀

---

## 执行步骤

### Step 1: 修复 P0 — 缺失 CSS 变量

**文件**: `src/styles/tokens.css`

在 `:root` 或 `:root, [data-theme="dark"]` 块中添加：
```css
--utility-orange: #f26522;
--accent-red: #d71921;
--ease-back: cubic-bezier(.34,1.56,.64,1);
```

在 `[data-theme="light"]` 块中添加对应的亮色值（如需要）。

### Step 2: 修复 P0 — nullframe 亮色主题适配

**文件**: `src/styles/nullframe.css`

将硬编码的深色值替换为 CSS 变量引用，确保在 `[data-theme="light"]` 下正确显示：
- `#272727` → `var(--border)` 或新增变量
- `#242424` → 新增 `--segbar-off` 变量
- `#1c1c1c` → 新增 `--contrib-empty` 变量
- 贡献热力图颜色 → 使用 CSS 变量
- `#1d1d1d` (hero 背景) → 使用 `var(--surface)` 变量

### Step 3: 修复 P0 — 锁文件冲突

删除 `pnpm-lock.yaml`（项目使用 npm，`package-lock.json` 是正确的锁文件）。

### Step 4: 修复 P1 — App.tsx 拆分（懒加载）

**文件**: `src/App.tsx`

将各 CategorySection 的内容拆分为独立组件，使用 `React.lazy` + `Suspense` 按需加载：

```tsx
const NullframeSection = React.lazy(() => import('./sections/NullframeSection'))
const Figma20Section = React.lazy(() => import('./sections/Figma20Section'))
// ... 其他大分类
```

创建 `src/sections/` 目录，每个分类一个文件。

### Step 5: 修复 P1 — CSS 导入方式优化

将每个组件的 CSS 导入从 App.tsx 移到组件自身文件中，确保组件可独立使用。

例如 `Clock.tsx` 中添加 `import '../styles/clock.css'`，从 App.tsx 中移除对应导入。

### Step 6: 修复 P1 — Toast 渲染缺失

添加 Toast 渲染组件，或移除未使用的 `addToast`/`setToasts` 相关代码。

### Step 7: 修复 P1 — CtlCtx 类型安全

**文件**: `src/system/hooks.ts`

```tsx
// 修改前
export const CtlCtx = createContext<Ctl>(null as unknown as Ctl)

// 修改后
export const CtlCtx = createContext<Ctl | null>(null)

export function useCtl(): Ctl {
  const ctx = useContext(CtlCtx)
  if (!ctx) throw new Error('useCtl must be used within CtlCtx.Provider')
  return ctx
}
```

### Step 8: 修复 P2 — 拼写错误

- `NoSignam` → `NoSignal`（WidgetIcons.tsx + App.tsx 导入处 + 使用处）
- `Wedget` → `Widget`（WidgetSubComponents.tsx + App.tsx 导入处 + 使用处）

### Step 9: 修复 P2 — nullframe 硬编码值提取

**文件**: `src/system/fake.ts`

添加缺失的导出：
```ts
export const bestContribPerDay = 23
export const bestStreak = 63
export const timezone = 'America/New_York'
export const version = 'SYS.V4.0.0'
```

**文件**: 各 nullframe 组件

从 `fake.ts` 导入这些值，替换硬编码。

### Step 10: 修复 P2 — 颜色常量统一

**文件**: `src/styles/tokens.css` 或新建 `src/system/theme.ts`

提取共享颜色常量：
```css
--nf-accent: #f26522;
--nf-wave: #cfcfcf;
--nf-bar-old: #d8d8d8;
```

在 NetworkCard 和 SeismoCard 中使用变量引用。

### Step 11: 修复 P2 — useReducedMotion 风格统一

**文件**: `src/components/nullframe/NfCard.tsx`

```tsx
// 修改前
const noFx = useReducedMotion() || ctl.motionOff

// 修改后
const noFx = (useReducedMotion() ?? false) || ctl.motionOff
```

### Step 12: 清理 — 移除 Playwright 或添加基础测试

选择方案 A（移除）或方案 B（添加基础测试）。

### Step 13: 验证

1. `npx tsc --noEmit` — 零类型错误
2. `npm run dev` — 开发服务器正常
3. 浏览器检查 — 所有分类正常显示，nullframe 仪表盘完整渲染
4. 亮色/暗色主题切换 — nullframe 区域正确适配
5. `npm run build` — 生产构建成功

---

## 假设与决策

1. **保留 npm 作为包管理器**：删除 pnpm-lock.yaml，保留 package-lock.json
2. **CSS 变量优先**：所有硬编码颜色值替换为 CSS 变量，确保主题切换兼容
3. **懒加载策略**：仅对大型分类（Figma 2.0、Nullframe）使用 lazy loading，核心组件保持同步加载
4. **Toast 处理**：移除未使用的 toast 代码（当前无 Toast 组件），而非添加新组件
5. **不重命名 Widget 子组件文件**：`Active1`、`OverLimit1` 等命名虽不规范，但重命名会影响大量导入，风险大于收益
6. **Playwright 处理**：移除未使用的 Playwright 依赖，减少安装体积

---

## 优先级建议

- **立即修复**：Step 1-3（P0 问题，影响 nullframe 正常显示）
- **短期优化**：Step 4-7（P1 问题，影响代码质量和可维护性）
- **长期改进**：Step 8-12（P2 问题，代码规范和细节优化）
