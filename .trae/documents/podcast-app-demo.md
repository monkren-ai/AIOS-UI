# 设计师播客 App 实例 — 结合 AI 能力

## 摘要

在 Nothing UI 展示应用中新增一个**完整的设计师播客 App 界面**，作为设计系统组件使用的应用实例。该实例展示如何将现有组件（Sidebar、MusicPlayer、Slider、Command、Accordion、Badge、Avatar 等）组合成一个真实产品界面，并集成 4 项 AI 能力：转录+摘要、内容生成、智能搜索、语音交互。

## 布局结构

```
┌──────────┬────────────────────────┬──────────────┐
│          │                        │              │
│ Sidebar  │   Main Content         │  AI Panel    │
│ (180px)  │   (flex: 1)            │  (320px)     │
│          │                        │              │
│ SHOWS    │  ┌──────────────────┐  │  TRANSCRIPT  │
│ - Design │  │  Now Playing     │  │  SUMMARY     │
│   Matters│  │  (cover + info)  │  │  GENERATE    │
│ - The    │  └──────────────────┘  │  VOICE CHAT  │
│   Type   │                        │              │
│ - Layout │  ┌──────────────────┐  │  [Content    │
│   Lab    │  │  Episode List    │  │   switches   │
│          │  │  (scrollable)    │  │   per tab]   │
│ LIBRARY  │  └──────────────────┘  │              │
│ AI       │                        │              │
│ SETTINGS │                        │              │
├──────────┴────────────────────────┴──────────────┤
│  Player Bar: ◀ ▶▶ ▮▮ | ━━━●━━━━━ | 12:34/45:00  │
└──────────────────────────────────────────────────┘
```

- **三栏布局**：Sidebar（左导航）+ Main Content（中间主内容）+ AI Panel（右 AI 面板）
- **底部播放栏**：全宽播放控制条
- **Cmd+K**：唤起 AI 智能搜索命令面板

## 文件清单

### 新建文件（3 个）

| 文件 | 用途 |
|------|------|
| `src/sections/PodcastSection.tsx` | Section 包装器（thin wrapper，仿 NullframeSection） |
| `src/components/showcase/PodcastShowcase.tsx` | 播客 App 主组件（含全部交互逻辑和 mock 数据） |
| `src/styles/podcast-showcase.css` | 播客 App 样式 |

### 修改文件（1 个）

| 文件 | 改动 |
|------|------|
| `src/App.tsx` | 新增 lazy import + categories 条目 + CategorySection 渲染 |

## 详细设计

### 1. PodcastSection.tsx（Section 包装器）

仿 `NullframeSection.tsx` 模式，极简：
```tsx
import '@/styles/podcast-showcase.css'
import PodcastShowcase from '@/components/showcase/PodcastShowcase'

function PodcastSection() {
  return <PodcastShowcase />
}

export default PodcastSection
```

### 2. PodcastShowcase.tsx（主组件）

#### 2.1 Mock 数据

**播客节目（4 个）**：
- "Design Matters" — 设计师访谈
- "The Type" — 字体与排版
- "Layout Lab" — 布局与网格
- "Creative Current" — 创意趋势

**剧集列表（6-8 集）**，每集包含：
- `id`, `title`, `show`, `duration`, `date`, `coverGlyph`（用 Glyph dot-matrix 图标代替封面图）, `description`, `tags`（如 "TYPOGRAPHY", "GRID", "COLOR"）
- 示例标题："Ep. 42 — The Return of Serif", "Ep. 41 — Grid Systems Beyond Swiss", "Ep. 40 — Color Theory for Dark Mode"

**AI 转录 mock**：一段设计相关的对话转录文本，带时间戳 `[12:34]` 和说话人标签 `HOST:` / `GUEST:`

**AI 摘要 mock**：3-4 个关键点，每点带时间戳引用

**AI 内容生成 mock**：节目笔记草稿、标题建议（3 个）、社交媒体文案

**AI 语音对话 mock**：2-3 轮预设问答（用户问 → AI 答，引用时间戳）

#### 2.2 状态管理

```tsx
const [currentEpisode, setCurrentEpisode] = useState(episodeList[0])
const [isPlaying, setIsPlaying] = useState(false)
const [progress, setProgress] = useState(34) // 0-100
const [volume, setVolume] = useState(65)
const [aiTab, setAiTab] = useState<'transcript' | 'summary' | 'generate' | 'voice'>('transcript')
const [aiPanelOpen, setAiPanelOpen] = useState(true)
const [commandOpen, setCommandOpen] = useState(false)
const [activeView, setActiveView] = useState<'episodes' | 'nowPlaying'>('episodes')
const [activeShow, setActiveShow] = useState<string | null>(null)
```

#### 2.3 布局结构

```tsx
<div className="podcast-app">
  {/* Sidebar */}
  <aside className="podcast-sidebar">
    <div className="podcast-logo">[ PODCAST.AI ]</div>
    <nav>
      <section>
        <h4>SHOWS</h4>
        {shows.map(show => <button>...</button>)}
      </section>
      <section>
        <h4>LIBRARY</h4>
        <button>Episodes</button>
        <button>Downloaded</button>
      </section>
      <section>
        <h4>AI TOOLS</h4>
        <button onClick={() => setCommandOpen(true)}>Smart Search ⌘K</button>
        <button onClick={() => setAiTab('voice')}>Voice Chat</button>
      </section>
    </nav>
  </aside>

  {/* Main Content */}
  <main className="podcast-main">
    {activeView === 'nowPlaying' ? <NowPlaying /> : <EpisodeList />}
  </main>

  {/* AI Panel */}
  {aiPanelOpen && (
    <aside className="podcast-ai-panel">
      <div className="ai-tabs">
        <button>TRANSCRIPT</button>
        <button>SUMMARY</button>
        <button>GENERATE</button>
        <button>VOICE</button>
      </div>
      <div className="ai-content">
        {aiTab === 'transcript' && <TranscriptView />}
        {aiTab === 'summary' && <SummaryView />}
        {aiTab === 'generate' && <GenerateView />}
        {aiTab === 'voice' && <VoiceChatView />}
      </div>
    </aside>
  )}

  {/* Player Bar */}
  <footer className="podcast-player-bar">
    <div className="player-info">...</div>
    <div className="player-controls">...</div>
    <div className="player-progress">...</div>
  </footer>

  {/* Command Palette (Cmd+K) */}
  <Command open={commandOpen} onOpenChange={setCommandOpen}>
    ...
  </Command>
</div>
```

#### 2.4 各区域详细设计

**Sidebar（左导航）**：
- 顶部 logo：`[ PODCAST.AI ]`，Space Mono，ALL CAPS
- SHOWS 区：4 个播客节目，每项带 Glyph 图标 + 名称 + 未听集数 Badge
- LIBRARY 区：Episodes / Downloaded / History
- AI TOOLS 区：Smart Search (⌘K) / Voice Chat / Auto-Summarize toggle
- 底部：Settings 链接
- 样式：`--surface` 背景，`1px solid var(--border)` 右边框，180px 宽

**Main Content（中间主内容）**：
- 顶部：当前视图标题 + SegmentedControl 切换（Episodes / Now Playing）
- **EpisodeList 视图**：
  - 每集一行：左侧 Glyph 封装图标 + 中间标题/描述/标签 + 右侧时长/日期
  - 行高 64px，hover `--surface-raised`，active `2px solid var(--accent)` 左边框
  - 标签用 Badge 组件：`[TYPOGRAPHY]` `[NEW]` `[AI SUMMARIZED]`
- **NowPlaying 视图**：
  - 大封面区：128×128 dot-matrix Glyph 图标（用 StaticDotMatrix 渲染）
  - 标题：`--font-size-heading`，`--tracking-heading`
  - 描述：`--font-size-body`，`--text-secondary`
  - 标签行：Badge 组件
  - Show Notes：Accordion 折叠面板（Chapter 1 / Chapter 2 / Notes）

**AI Panel（右 AI 面板）**：
- 顶部：4 个 Tab（TRANSCRIPT / SUMMARY / GENERATE / VOICE），SegmentedControl 风格
- **Transcript Tab**：
  - 滚动文本区，带时间戳 `[12:34]` + 说话人 `HOST:` / `GUEST:`
  - 当前播放位置高亮（`--text-display` + 左边框 `2px solid var(--accent)`）
  - 底部：`[ AUTO-SCROLL ON ]` toggle
- **Summary Tab**：
  - "AI GENERATED SUMMARY" 标题 + dot-matrix 装饰
  - 3-4 个关键点，每点带引用时间戳 `[14:20]`
  - 底部：`[ REGENERATE ]` 按钮 + `[ COPY ]` 按钮
- **Generate Tab**：
  - 3 个子区（用 Collapsible 折叠）：
    1. Show Notes — 生成的节目笔记草稿
    2. Title Suggestions — 3 个备选标题
    3. Social Media — Twitter / LinkedIn 文案
  - 每区底部：`[ REGENERATE ]` + `[ COPY ]` 按钮
- **Voice Chat Tab**：
  - 对话历史区：2-3 轮预设 Q&A
    - 用户消息：右对齐，`--surface-raised` 气泡
    - AI 回答：左对齐，`--surface` 气泡，带时间戳引用 `[15:42]`
  - 底部：大圆形 Mic 按钮（用 Glyph `mic` 图标）+ "Hold to speak" 提示
  - 录音状态：按钮变 `--accent` + 脉冲动画 + `[ RECORDING... 00:03 ]` 文字

**Player Bar（底部播放栏）**：
- 三段式布局：
  - 左：当前剧集信息（Glyph 图标 + 标题 + 节目名）
  - 中：播放控制（上一集 / 播放暂停 / 下一集）+ 进度条
  - 右：音量滑块 + AI 面板 toggle + 时长显示
- 进度条：自定义 div，`--surface` 轨道 + `--text-display` 已播放 + 圆点 thumb
- 播放/暂停按钮：48px 圆形，`--text-display` 背景 + `--black` 图标
- 样式：`--surface` 背景，`1px solid var(--border-visible)` 顶部边框，64px 高

**Command Palette（Cmd+K 智能搜索）**：
- 使用现有 `Command` 组件
- 搜索框 placeholder：`"Ask AI or search episodes..."`
- 预设搜索结果分组：
  - EPISODES：匹配的剧集
  - AI ANSWERS：基于搜索词的 AI 回答（mock）
  - TOPICS：匹配的设计主题
- 示例搜索："serif fonts" → 返回 Ep. 42 + AI 回答 "3 episodes discuss serif typography..."

### 3. podcast-showcase.css

关键样式类：
```css
.podcast-app { /* 三栏 grid + 底部 player */ }
.podcast-sidebar { /* 180px 左导航 */ }
.podcast-main { /* flex:1 主内容 */ }
.podcast-ai-panel { /* 320px 右 AI 面板 */ }
.podcast-player-bar { /* 底部播放栏 */ }
.podcast-episode-row { /* 剧集列表行 */ }
.ai-tab-content { /* AI 面板内容区 */ }
.ai-transcript-line { /* 转录文本行 */ }
.ai-summary-point { /* 摘要关键点 */ }
.ai-chat-bubble { /* 对话气泡 */ }
.ai-mic-button { /* 语音输入按钮 */ }
```

所有样式严格使用 tokens.css 中的 CSS 变量，不硬编码颜色/尺寸。

### 4. App.tsx 注册

3 处改动（仿 DesignSystemSection 模式）：

1. **Lazy import**（line ~124 后）：
```tsx
const PodcastSection = lazy(() => import('./sections/PodcastSection'))
```

2. **Categories 数组**（line ~214 后）：
```tsx
{ id: 'podcast', zh: '播客 App 实例', en: 'Podcast App Demo' }
```

3. **CategorySection 渲染**（line ~1428 后）：
```tsx
<CategorySection id="podcast" title={t('播客 App 实例', 'Podcast App Demo')}>
  <Suspense fallback={<div style={{ color: 'var(--text-secondary)', padding: '24px' }}>{t('加载中…', 'Loading...')}</div>}>
    <PodcastSection />
  </Suspense>
</CategorySection>
```

## 复用的现有组件

| 组件 | 用途 | 来源 |
|------|------|------|
| `Command` | Cmd+K AI 智能搜索 | `@/components/Command` |
| `Accordion` | Show Notes 折叠面板 | `@/components/Accordion` |
| `Collapsible` | AI Generate 子区折叠 | `@/components/Collapsible` |
| `Badge` | 剧集标签 `[NEW]` `[AI]` | `@/components/Badge` |
| `Avatar` | 节目/说话人头像 | `@/components/Avatar` |
| `ScrollArea` | 剧集列表/转录滚动 | `@/components/ScrollArea` |
| `SegmentedControl` | 视图切换/AI Tab 切换 | `@/components/SegmentedControl` |
| `Slider` | 音量控制 | `@/components/Slider` |
| `Tooltip` | 按钮提示 | `@/components/Tooltip` |
| `Switch` | Auto-scroll / Auto-summarize | `@/components/Switch` |
| `Glyph` / `StaticDotMatrix` | 封面图标 + 播放图标 | `@/components/widgets` |
| `Quotes` | AI 高亮引用 | `@/components/Quotes` |

## 假设与决策

1. **Mock 数据**：所有内容（转录、摘要、AI 回答）均为硬编码 mock 文本，不接入真实 AI API。重点展示 UI/UX 设计，不是功能实现。
2. **交互范围**：播放/暂停切换、进度条拖动、Tab 切换、剧集选中、Cmd+K 打开/关闭、AI 面板 toggle — 这些有真实交互。转录自动滚动、AI 回答生成等用 setTimeout 模拟延迟。
3. **设计语言**：严格遵循 Nothing UI — 单色、无阴影、dot-matrix 装饰、Space Mono 标签、OLED 黑底。
4. **响应式**：固定三栏布局，最小宽度 900px。窄屏时 AI 面板可 toggle 隐藏。
5. **不创建新组件**：所有 UI 都在 PodcastShowcase.tsx 内用内联 JSX + CSS 类实现，复用现有组件但不新建独立组件文件。
6. **播放进度模拟**：isPlaying 时用 setInterval 每秒递增 progress，到 100% 自动切下一集。

## 验证步骤

1. `npm run type-check` — 无新增 TS 错误（仅预存的 7 个 TS6133）
2. `npm run dev` — 页面正常加载，侧边栏出现"播客 App 实例"导航
3. 点击导航跳转到 `#podcast` — 三栏布局正确渲染
4. 交互测试：
   - 点击剧集 → 切换 Now Playing 视图
   - 点击播放/暂停 → 进度条递增/暂停
   - 切换 AI Tab → 内容切换
   - 按 Cmd+K → 命令面板弹出
   - 点击 AI 面板 toggle → 面板收起/展开
5. 视觉检查：无阴影、无 blur、单色、dot-matrix 装饰、Space Mono 标签
