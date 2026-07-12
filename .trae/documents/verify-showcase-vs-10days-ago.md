# 验证 Showcase 内容已对齐 Git 10 天前版本

## 1. 背景 (Context)

**目标**:验证当前 `src/showcase/` 展示页内容与 10 天前 `df7b910` (2026-06-14) 提交中的 `src/App.tsx` 单文件版本在用户可见层面(分类、demo 顺序、组件、文本、布局结构)完全一致。

**为何需要**:
- 用户在 [Phase 1] 探索中发现 `f1dcaea` (HEAD, 2026-06-23) 与 `df7b910` (10 天前) 之间的 diff 显示 `App.tsx` 被拆分到 `src/showcase/` 模块
- 用户希望明确**重构后是否真的保留了 10 天前版本的所有展示内容**

**预期结论**:重构是**纯结构调整**,展示内容 1:1 保留,无需修改代码;生成结构化对照表与回归清单即可。

---

## 2. 探索结果 (Phase 1)

### 2.1 时间锚点

| Commit | Date (Asia/Shanghai) | 说明 |
| --- | --- | --- |
| `df7b910` | 2026-06-14 21:20:42 | 10 天前 (历史版本) |
| `e5a6eca` | 2026-06-14 21:46:50 | +26 分钟小补丁(仅改 Date/WidgetShowcase 内文案) |
| `f1dcaea` | **2026-06-23 22:03:22** | **HEAD**:showcase 模块化重构 |

> 10 天前 = 2026-06-14 = `df7b910` (与 `e5a6eca` 等价展示内容)

### 2.2 关键发现

`git diff --stat e5a6eca..f1dcaea` 显示本次重构**共变更 27 个文件**:

- **删除**:`src/App.tsx`(1263 行单文件)
- **新增**:`src/showcase/` 模块(22 个文件,1977 行)
  - `index.tsx`(155 行):总入口
  - `hooks/useShowcaseState.ts`(137 行):状态管理
  - `components/CategoryNav.tsx`(52 行):侧边栏
  - `components/CategorySection.tsx`(24 行):分类容器
  - `components/DemoCard.tsx`(39 行):demo 包装
  - `components/SectionTitle.tsx`(14 行):小标题
  - `components/FloatingControls.tsx`(58 行):右上角按钮
  - `sections/*.tsx`(16 个文件):每个分类一个 section
  - `styles/showcase.css`(333 行):从 inline style 提取
- **更新**:`.dumirc.ts`(+72 行,补 Showcase 导航 + 主题配置)、`src/main.tsx`(+6 行,接入 showcase)

### 2.3 结构对照(已确认)

| 维度 | 10 天前 `App.tsx` | 当前 `src/showcase/` | 一致性 |
| --- | --- | --- | --- |
| 分类数量 | 16 | 16 | ✅ |
| 分类 id / zh / en | 见 [App.tsx:182-206](file:///tmp/app_10days_ago.tsx#L182-L206) | 见 [CategoryNav.tsx:9-26](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/components/CategoryNav.tsx#L9-L26) | ✅ 完全一致 |
| 侧边栏布局 | 220px sticky aside, `top:0` | 220px sticky aside, `top:0`(见 [showcase.css:21-29](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/styles/showcase.css#L21-L29)) | ✅ |
| 浮动按钮(theme / lang / force-sim) | 3 个 fixed 按钮(具体 right 偏移见 inline) | 3 个 fixed 按钮(具体 right 偏移见 [showcase.css:93-103](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/styles/showcase.css#L93-L103)) | ✅ 视觉一致 |
| 主题切换实现 | `document.documentElement.setAttribute('data-theme', ...)` | 同上(见 [useShowcaseState.ts:48-54](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/hooks/useShowcaseState.ts#L48-L54)) | ✅ |
| 强制模拟数据 | `data-force-sim` 写到 `<html>` | 同上(见 [useShowcaseState.ts:44-46](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/hooks/useShowcaseState.ts#L44-L46)) | ✅ |
| 中英双语 `t(zh, en)` | 函数式 | `useCallback` 包装,行为一致 | ✅ |
| 分类标题字号 / 字重 / letter-spacing | 复刻自 tokens.css | 复刻自 tokens.css(见 [showcase.css:199-208](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/showcase/styles/showcase.css#L199-L208)) | ✅ |

### 2.4 唯一已知差异(非内容)

`WidgetShowcase.tsx` 中:

```diff
- card={{ size: 'wide' }}
+ card={{ size: 'auto' }}
```

`WeatherWidget` 内部 `size` enum 的 `'wide'` 已被改名为 `'auto'`(组件 API 演进),以及 `className="card-wide"` 也加到第 13 项 NfCard。展示视觉无变化,仅为 API 名称同步。

---

## 3. 验证实施步骤 (Phase 3)

### Step 1 — 自动分类清单比对

**目的**:确认 16 个分类的 id / 中英文标题与 10 天前完全一致

**操作**:
1. 提取 `df7b910` 中 `App.tsx:182-206` 的 `categories` 数组
2. 提取当前 `src/showcase/components/CategoryNav.tsx:9-26` 的 `categories` 数组
3. `diff` 对比 → 期望 0 行差异

**输出**:`.trae/documents/showcase-vs-10days-ago.md`(新建),包含分类对照表

### Step 2 — Demo 块逐分类清单比对

**目的**:确认每个分类下的 DemoCard 标题与渲染组件与 10 天前完全一致

**操作**:
1. 编写临时脚本 `scripts/verify-showcase.mjs`(新建):
   - 用 `git show df7b910:.../App.tsx` 取出 10 天前源码
   - 用 `fs.readFileSync` 读出当前 16 个 section 源码
   - 抽取每段 `<CategorySection id="X">` 内部所有 demo(标题 + 关键 props)
   - 输出对照表(分类 / 10 天前 demo 数 / 当前 demo 数 / diff)
2. 跑 `node scripts/verify-showcase.mjs > .trae/documents/showcase-vs-10days-ago.md`

**期望输出**:
- 16 个分类下 demo 数量完全相等
- 标题文本与 props 关键值一致
- 唯一允许差异:`WidgetShowcase` 中 `size: 'wide' → 'auto'` 同步

### Step 3 — CSS 视觉回归抽样

**目的**:对 4 个最容易出问题的视觉点做对照(浮动按钮位置、侧边栏宽度、主内容 max-width、分类标题样式)

**操作**:
1. 读 `df7b910` 中 `App.tsx:140-180` 的 inline style(浮动按钮部分)
2. 读当前 `showcase.css:72-108`(浮动按钮部分)
3. 输出一份样式对照表(4 项 × 2 列),逐条标 ✅/❌

### Step 4 — 启动 dumi dev 跑通

**目的**:在 `http://localhost:8000/showcase` 实际打开页面,确认路由可达、控制台 0 报错

**操作**:
```bash
cd nothing-design-skill/nothing-design/web-ui-kit/react
npm run docs:dev
# 浏览器打开 http://localhost:8000/showcase
# 检查项:
#   - 顶部 nav 出现 Components · Showcase · Changelog 三个页签
#   - Showcase 高亮
#   - 左侧 16 项分类导航
#   - 右侧 3 个浮动按钮(REAL / EN / 切换主题)
#   - 切换语言 → 文案 EN/中 文切换
#   - 切换主题 → 整页背景由黑变白
#   - 强制模拟数据 → Battery / SystemMonitor 等 LIVE 标签组件变模拟数据
#   - 点击任一分类锚点 → 平滑滚动
```

**输出**:在 `.trae/documents/showcase-vs-10days-ago.md` 末尾记录 ✅ 验证结果

### Step 5 —(可选)关闭 main.tsx 中的冗余导入

**目的**:`src/main.tsx` 重构后可能存在已不再使用的旧 CSS 引用,清理可避免构建膨胀

**操作**:
1. 读当前 [src/main.tsx](file:///Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/main.tsx)
2. 对比 10 天前 `main.tsx`(若 10 天前未重构 main.tsx,跳过此步)
3. 若发现 `import '@/styles/buttons.css'` 等已迁移到组件内部的 import,提示给用户

**注意**:本步骤若发现差异,需要用户二次确认(避免误删)

---

## 4. 文件变更清单

### 新建(2)
1. `.trae/documents/showcase-vs-10days-ago.md` — 对照报告
2. `scripts/verify-showcase.mjs` — 自动化比对脚本

### 修改(0)
不修改任何源码,仅生成报告

---

## 5. 验证步骤 (Phase 4)

```bash
# 在仓库根目录
node scripts/verify-showcase.mjs           # 输出对照表
cat .trae/documents/showcase-vs-10days-ago.md

# 启动 dev server(可选,需手动观察浏览器)
cd nothing-design-skill/nothing-design/web-ui-kit/react
npm run docs:dev
```

**通过标准**:
- 16 个分类 id + 中英文标题 diff 0
- 16 个 section 下 demo 数量与 10 天前完全相等
- 唯一允许的差异:`size: 'wide' → 'auto'`(API 重命名,非展示差异)
- dumi 路由 `/showcase` 可达,浏览器控制台 0 error / 0 warning
- 中英主题语言切换、强制模拟数据三个交互按钮功能正常

---

## 6. 风险与决策

| 风险 | 对策 |
| --- | --- |
| `verify-showcase.mjs` 误判 diff(如行内注释 / import 顺序) | 脚本只匹配 demo 标题、组件名、关键 props(白名单),不做逐行 diff |
| 10 天前 App.tsx 已删除,无法直接 `git show` | 已在 `/tmp/app_10days_ago.tsx` 缓存 1263 行源码,脚本读取该文件 |
| 浮动按钮位置 inline style 与 CSS class 不完全等价 | Step 3 抽样 4 个关键样式点逐条人工对照 |
| dumi dev 启动慢(>30s) | 接受,验证步骤不卡构建时间 |

---

## 7. 不在范围内 (Out of Scope)

- 不修改 `src/showcase/` 任何文件
- 不修改 `src/components/showcase/WidgetShowcase.tsx` 中的 `size: 'auto'` 还原为 `wide`(因 WeatherWidget 组件 API 已变更)
- 不动 `.dumirc.ts`、`src/main.tsx`
- 不增加新分类 / 新 demo
- 不优化样式(保持当前)

---

## 8. 假设 (Assumptions)

- 10 天前 = `df7b910` (2026-06-14 21:20:42) 这一个 commit,且 `e5a6eca` 仅补丁文案,展示内容等价
- 用户期望"已对齐"= 内容 / 分类 / 顺序 / 文案 / 交互全部一致(允许代码组织不同)
- 报告文件位置选 `.trae/documents/`(与现有项目文档保持一致,见 [project memory](file:///Users/ruishengzhang/.trae-cn/memory/projects/-Users-ruishengzhang-Documents-GitHub-Nothing-UI/project_memory.md))
- 不需要 CI 集成,验证脚本仅本地使用
