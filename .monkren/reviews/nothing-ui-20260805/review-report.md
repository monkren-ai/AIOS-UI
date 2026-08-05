# 设计审查报告

**审查对象**：Nothing UI React 组件库（`web-ui-kit/react/src`）  
**审查日期**：2026-08-05  
**审查员**：monkren-design  
**触发命令**：简单审查（组件质量 / 代码合规）  
**对照基线**：2026-07-18 Re-Audit（7.5/10）

---

### 结论层

**总体评分**：7.2/10（B）  
**结论**：上次阻断级 P0（NfCard / Command / Spinner）已修；组件质量受制于 `data-slot` 合规债与个别哲学回潮（blur / 橙色 canvas），细节执行仍是短板。  
**P0 问题**：2 处阻断 | **硬编码值**：约 8 处实质违规（排除 tokens / 文档色板 / ColorPicker 预设）  
**关键 Quick Win**：删除 `project-intro-page.css` 的 `backdrop-filter: blur(8px)` → 预计 2 分钟

```svg
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="220" height="220">
  <!-- grid -->
  <polygon points="100,20 176,76 147,164 53,164 24,76" fill="none" stroke="#666" stroke-width="0.5"/>
  <polygon points="100,36 161,81 138,151 62,151 39,81" fill="none" stroke="#666" stroke-width="0.5"/>
  <polygon points="100,52 145,86 128,138 72,138 55,86" fill="none" stroke="#666" stroke-width="0.5"/>
  <polygon points="100,68 130,91 119,125 81,125 70,91" fill="none" stroke="#666" stroke-width="0.5"/>
  <polygon points="100,84 115,96 109,112 91,112 85,96" fill="none" stroke="#666" stroke-width="0.5"/>
  <line x1="100" y1="100" x2="100" y2="20" stroke="#666" stroke-width="0.5"/>
  <line x1="100" y1="100" x2="176" y2="76" stroke="#666" stroke-width="0.5"/>
  <line x1="100" y1="100" x2="147" y2="164" stroke="#666" stroke-width="0.5"/>
  <line x1="100" y1="100" x2="53" y2="164" stroke="#666" stroke-width="0.5"/>
  <line x1="100" y1="100" x2="24" y2="76" stroke="#666" stroke-width="0.5"/>
  <!-- scores: 哲7 / 视7.5 / 细6.5 / 功8 / 创8 -->
  <polygon points="100,44 157,81.5 130.6,142.1 62.4,151.8 39.1,80.2"
    fill="#D71921" fill-opacity="0.2" stroke="#D71921" stroke-opacity="0.8" stroke-width="1.5"/>
  <text x="100" y="12" text-anchor="middle" font-size="8" fill="#999">哲学 7</text>
  <text x="188" y="76" text-anchor="start" font-size="8" fill="#999">层级 7.5</text>
  <text x="155" y="178" text-anchor="middle" font-size="8" fill="#999">细节 6.5</text>
  <text x="45" y="178" text-anchor="middle" font-size="8" fill="#999">功能 8</text>
  <text x="12" y="76" text-anchor="end" font-size="8" fill="#999">创新 8</text>
</svg>
```

#### 5 维度评分（摘要）

| 维度 | 评分 | 证据 |
|------|------|------|
| 哲学一致性 | 7/10 | 无阴影主路径仍稳；`project-intro` 回潮 blur；`SeismoCard` canvas `#f26522`；dotmatrix 彩色 gradient presets |
| 视觉层级 | 7.5/10 | tokens type scale 完整；Showcase / ProjectIntro 层级清晰 |
| 细节执行 | 6.5/10 | `data-slot` 仅 23/69 合规；Taskbar fallback `#ff5b1f`；off-grid 间距残留 |
| 功能性 | 8/10 | NfCard fallback / Command `useId` / Spinner→Button 已修；Agent+Conversation 全测 |
| 创新性 | 8/10 | AI OS + 对话矩阵辨识度强；工业单色语言未被通用模板稀释 |

相对 2026-07-18：**功能面 +0.5，哲学面 −0.5，细节面持平 → 总分 7.5 → 7.2**。

#### 专项检测总览

| 检测维度 | 状态 | 关键问题 |
|---------|------|---------|
| 硬编码值 | ⚠️ 约 8 处实质违规 | `SeismoCard` `#f26522` / `#cfcfcf`；`Taskbar.css` `#ff5b1f` |
| 设计系统合规 | ⚠️ 系统性问题 | `data-slot` 缺失 46 组件；违反 AGENTS.md §3.4 |
| 反 AI slop | ⚠️ 3 处 | Navigation emoji `⚙`；Card hover radial-gradient；彩色 loader presets |
| 可访问性 | ✅ 改善 | Modal/Input/Command ID 已修好；Tooltip 改 Base UI |
| 测试覆盖 | ⚠️ 约 46% | 40 测试文件；46 个顶层模块无测试 |

---

### 行动层

#### Quick Wins（立即可做）

- [ ] 删除 `src/showcase/styles/project-intro-page.css:102` 的 `backdrop-filter: blur(8px)`，改用不透明 `var(--pi-surface)` — 预计 2 分钟
- [ ] `SeismoCard.tsx:61,64` 的 canvas 色改为 `getComputedStyle` 读取 `--border` / `--accent`（或 `--nf-wave` / `--accent`）— 预计 10 分钟
- [ ] `Taskbar.css:260` fallback `#ff5b1f` → `#D71921` — 预计 1 分钟

#### Fix 清单

**1. project-intro topbar blur** — P0 ⚠️ — Quick Win  
- 当前：`backdrop-filter: blur(8px)`  
- 问题：design.md / AGENTS 明确禁止 blur；DesignSystemSection 也写了 Don't use blur  
- 修复：去掉 blur，背景用不透明 surface + 1px border  

**2. SeismoCard 双 event 色** — P0 ⚠️ — 小修  
- 当前：canvas `strokeStyle = '#cfcfcf'`、`fillStyle = '#f26522'`  
- 问题：橙色 `#f26522` 是第二强调色，破坏「红是唯一事件」  
- 修复：用 CSS 变量解析后传入 canvas；竖条改 `--accent`  

**3. data-slot 合规债** — P1 ⚡ — 中修  
- 当前：69 个可审计组件中 46 个根节点无 `data-slot`（Alert / Checkbox / ProgressBar / Toggle / Command / Battery …）  
- 问题：AGENTS.md 硬约束；语义化测试与样式钩子失效  
- 修复：按核心交互 → 数据展示 → widgets 分批补 `data-slot="<kebab>"`；可用 lint 规则卡住回归  

**4. 测试覆盖空洞** — P1 ⚡ — 大修  
- 当前：无测试模块含 ProgressBar / Tooltip / Command / Battery / States / Sheet 等常用件  
- 问题：重构与合并后回归靠手工  
- 修复：优先为有交互的 Overlay / Form / Data 组件补渲染 + a11y 冒烟  

**5. Taskbar 橙红 fallback** — P1 ⚡ — Quick Win  
- 当前：`var(--widget-primary, #ff5b1f)`  
- 问题：fallback 不是品牌红 `#D71921`  
- 修复：统一 `#D71921`  

**6. WidgetCard hover 径向渐变** — P1 ⚡ — 小修  
- 当前：`Card.css` `.nothing-widget-card::before` 使用 `radial-gradient`  
- 问题：禁止 UI chrome 渐变  
- 修复：改为 solid `--muted-bg` 或 1px border 明度变化  

**7. DotMatrix 彩色 presets** — P1 ⚡ — 小修  
- 当前：`color-presets.ts` 默认导出含 sunset/ocean/neon 等彩色 gradient  
- 问题：与 monochrome 哲学冲突  
- 修复：默认仅 `solid-theme`；彩色移入 opt-in `experimental`  

**8. Navigation emoji** — P2 💡 — Quick Win  
- 当前：`NavigationSection.tsx` 使用 `⚙`  
- 修复：换成单色 SVG / DotMatrix 图标  

#### Keep（保持）

- **Button / Agent / Conversation 质量标杆**：`data-slot` + CVA + Base UI + 单元测试齐全，是后续组件应复制的模板  
- **tokens.css 字体硬编码清零**：组件 CSS 已走 `var(--font-*)`，比 7 月审查大幅改善  
- **上次阻断 P0 已关闭**：NfCard `section ?? div`、Command `useId`、Spinner 使用 `Button`  
- **AI OS 语义扩展克制**：Agent 组件未引入紫霓虹 / glow，仍落在 monochrome + red event 内  

---

### 变更追踪（相对 2026-07-18）

| 项 | 状态 |
|----|------|
| NfCard `motionModule.section` 崩溃 | ✅ 已修（`section ?? div`） |
| Command 硬编码 ID | ✅ 已修（`useId`） |
| Spinner 绕过 Button | ✅ 已修 |
| podcast box-shadow 动画 / accent border-left | ✅ 基本清除 |
| Tooltip 键盘可达 | ✅ 迁 Base UI Trigger（风险降低） |
| project-intro blur | 🆕 新 P0 |
| SeismoCard 橙色 canvas | 🆕 / 仍存 P0 |
| data-slot 大面积缺失 | 🆕 显性化（AGENTS 债） |

---

### 下一步建议

若需要 **深度审查** 或 **全流程页面遍历**（逐 Showcase section 打分），可以说一声升级命令。  
若要直接修 P0，可指定「按审查报告修 P0」。
