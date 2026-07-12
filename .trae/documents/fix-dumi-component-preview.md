# 修复 dumi 组件预览未显示

## 任务摘要

修复 dumi 文档中组件预览不显示的问题。在浏览器中打开组件页（如 `/components/button`）时，组件预览区域为空白。

## 现状分析

### 探索发现

通过深入分析 dumi 2.4.34 源码，得出以下关键结论：

#### dumi 2.4 已废弃 `demos` 字段
- dumi 2.4.34 在 `templates/ContextWrapper.ts.tpl` 中**主动**把 `demos` getter 设为 `{}` 并发出警告
- dumi 提供的 `useDemo(id)` hook 是新 API
- dumi 自身的 `DumiDemo` 和默认 `Previewer` 都使用 `useDemo(id)` 和 `useLiveDemo(id)`

#### dumi 默认 Previewer 依赖 props.children
- dumi 默认 `Previewer` 用 `liveDemoNode || props.children` 渲染 demo
- `props.children` 由 dumi 的 `DumiDemo` 通过 `createElement(demo.component)` 提供

### 真正的根因分析

dumi 2.4 的 Previewer 渲染流程：

```
Markdown `<code src>` → DumiDemo → useDemo(id) → demo.component
                              ↓
                       Previewer (dumi default)
                              ↓
                       liveDemoNode || props.children
```

警告 `'demos' return empty` 来自 `ContextWrapper.tsx` 中 Object.defineProperty 的 getter，被 dumi 内部某个组件解构访问 `demos` 时触发。

这只是良性警告，不应影响渲染。

但用户报告"组件未显示预览"——可能原因：

1. **CSS 缺失导致视觉上看不到**：dumi 不加载 Vite 入口 `main.tsx`，组件 CSS 通过 tsx→css 链路加载但 `tokens.css` 缺失，导致设计令牌变量未定义，组件透明不可见
2. **DemoErrorBoundary 捕获错误**：组件抛错时静默显示空白（错误状态被吞掉）
3. **依赖循环导致 demo 加载失败**：例如 `ConfigProvider` demo 内部 `useConfig` 等 hook 在 dumi 的 runtime 上下文不可用

### 修复策略

采用**配置层兼容 + 验证 demo 链路**策略：

1. **验证 demo 实际加载状态**：通过浏览器实际查看 button 页面，确认 demo 是否在 DOM 中（即使视觉上看不见）
2. **修复 CSS 加载链路**：通过 `.dumi/app.tsx` 全局加载 `tokens.css`，确保设计令牌可用
3. **修正 entryFile 配置**：参考 lobe-ui 模式，entryFile 仅在 production 设置
4. **修正主题背景样式**：从浏览器 `prefers-color-scheme` 改为 dumi 的 `[data-prefers-color]` 属性

## 方案

### 步骤 1：重启 dev server 并验证 demo DOM

dev server 当前运行在 command id `7ebee9d1-15e1-4c5b-baec-07d779ea6aeb`，编译成功 15376 模块。

通过浏览器实际打开 `/components/button`，检查：
- previewer-demo 容器是否存在
- 容器内是否有 `<button class="nothing-btn">` 元素
- DemoErrorBoundary 是否捕获到错误

### 步骤 2：修正 .dumirc.ts 配置

参考 lobe-ui 的 .dumirc.ts：
1. `entryFile` 改为 `isProduction ? './src/index.ts' : undefined`
2. `apiParser: false`（dev 模式）
3. `mfsu: isWin ? undefined : {}`
4. `jsMinifier: 'swc'`
5. styles 改用 `[data-prefers-color]` 选择器

```typescript
resolve: {
  atomDirs: [{ dir: 'src', type: 'component' }],
  entryFile: isProduction ? './src/index.ts' : undefined,
},
styles: [
  `html, body { background: #000; }
  html[data-prefers-color="light"],
  html[data-prefers-color="light"] body { background: #fff; }`,
],
apiParser: isProduction ? {} : false,
mfsu: process.platform === 'win32' ? undefined : {},
jsMinifier: 'swc',
```

### 步骤 3：创建 .dumi/app.tsx 全局加载 tokens.css

dumi 的约定文件 `.dumi/app.tsx` 用作全局 app wrapper：

```typescript
import '../src/styles/tokens.css'
export default ({ children }: { children: React.ReactNode }) => children
```

**作用**：让 tokens.css 在 dumi 站点中全局可用，组件 demo 的设计令牌（`var(--accent)` 等）生效。

### 步骤 4：移除 src/index.ts 中冗余的 tokens.css 导入

`src/index.ts` 当前有 `import './styles/tokens.css'`。由于：
- `.dumi/app.tsx` 已在文档站点加载
- showcase 的 `main.tsx` 已加载
- npm 包的 `styles` 入口独立

可以移除以避免 tsdown 打包时重复处理。

### 步骤 5：构建并验证

重启 dev server，依次验证：
1. `/components/button` — 基础组件 demo
2. `/components/config-provider` — Provider demo
3. `/components/caffeinate` — 升级后的占位 demo
4. 切换主题（暗/亮），验证 demo 背景与组件颜色联动

## 待修改文件

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/.dumirc.ts` | 修改 | entryFile 改 production-only；styles 改 [data-prefers-color]；添加 jsMinifier |
| `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/.dumi/app.tsx` | 新建 | 全局加载 tokens.css |
| `/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react/src/index.ts` | 修改 | 移除 `import './styles/tokens.css'` |

## 假设与决策

- **demo 渲染不依赖 `demos` 字段**：通过 `props.children` 传递，警告不阻断渲染
- **CSS 加载是主要视觉问题**：tokens.css 通过 .dumi/app.tsx 全局可用
- **保留 entryFile 用于 production**：让 dumi 在 build 时知道主入口（参考 lobe-ui）

## 验证步骤

1. 重启 dev server
2. 浏览器打开 http://localhost:8001/components/button
3. 检查 DOM：`.dumi-default-previewer-demo` 内是否有 `<button class="nothing-btn">`
4. 视觉检查：primary 按钮为白底黑字、secondary 为透明描边、destructive 为红色描边
5. 切换右上角主题：背景与组件颜色应联动变化
6. 打开 http://localhost:8001/components/caffeinate 验证占位 demo 升级
7. 浏览器 Console 应**不再**有阻断性错误（antd 弃用警告可接受）

## 不在范围内

- 升级 React/dumi 大版本
- 修复 dumi 内部的 antd 弃用警告
