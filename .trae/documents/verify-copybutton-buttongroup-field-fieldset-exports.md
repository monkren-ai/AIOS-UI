# 回读校验 CopyButton / ButtonGroup / Field / Fieldset 并补齐导出登记

## 概要

对四个新组件的全部 `.tsx` / `index.ts` / 测试 / 变体 / registry / 示例做回读校验，确认导入路径、`displayName`、语法是否符合项目约定。校验发现：组件实现本身**全部正确**（displayName、语法、ref-as-prop、Base UI 用法、CVA 变体均无问题），但**三处自动生成 / 手动登记的「胶水」层尚未同步**，会导致组件无法被消费、文档站无法渲染。本计划修补这三处 + 一处一致性微调。

工作目录：`/Users/ruishengzhang/Documents/GitHub/Nothing-UI/nothing-design-skill/nothing-design/web-ui-kit/react`（下文简称 `REACT_ROOT`）。

---

## 当前状态分析

### 已校验通过（无需改动）

逐文件回读结论：

| 文件 | displayName | 导入路径 | 语法 | 结论 |
|------|-------------|----------|------|------|
| `src/CopyButton/CopyButton.tsx` | `CopyButton` ✓ | `@/Button/Button`（可解析，见下「微调」） | ✓ ref-as-prop、useEffect 清理计时器、状态机 | 通过 |
| `src/CopyButton/index.ts` | — | `./CopyButton` ✓ | ✓ named + default + type | 通过 |
| `src/CopyButton/CopyButton.test.tsx` | — | `./CopyButton` ✓ | ✓ fireEvent+act、fake timers | 通过 |
| `src/ButtonGroup/ButtonGroup.tsx` | `ButtonGroup` ✓ | `@/Button`（barrel，正确） | ✓ cloneElement 透传 size、role=group | 通过 |
| `src/ButtonGroup/index.ts` | — | `./ButtonGroup`、`./button-group-variants` ✓ | ✓ | 通过 |
| `src/ButtonGroup/button-group-variants.ts` | — | `class-variance-authority` ✓ | ✓ CVA orientation 变体 | 通过 |
| `src/ButtonGroup/ButtonGroup.test.tsx` | — | `@/Button` + `./ButtonGroup` ✓ | ✓ | 通过 |
| `src/Field/Field.tsx` | `Field` + `Field.Label/Description/Error` ✓ | `@/lib/utils`、`@base-ui/react/field`、`@/Input/input-variants`（已确认导出 `inputLabelVariants`/`inputHelperVariants`） | ✓ 自动注入 id/aria-describedby、role=alert | 通过 |
| `src/Field/index.ts` | — | `./Field`、`./field-variants` ✓ | ✓ 导出 Field/FieldLabel/FieldDescription/FieldError + types | 通过 |
| `src/Field/field-variants.ts` | — | `class-variance-authority` ✓ | ✓ | 通过 |
| `src/Field/Field.test.tsx` | — | `./Field` ✓ | ✓ | 通过 |
| `src/Fieldset/Fieldset.tsx` | `Fieldset` ✓ | `@base-ui/react/fieldset`（已确认导出 `Fieldset.Root/Legend`） | ✓ `render={<legend />}`、ref 对齐 `HTMLElement` | 通过 |
| `src/Fieldset/index.ts` | — | `./Fieldset`、`./fieldset-variants` ✓ | ✓ | 通过 |
| `src/Fieldset/fieldset-variants.ts` | — | `class-variance-authority` ✓ | ✓ fieldsetVariants + fieldsetLegendVariants | 通过 |
| `src/Fieldset/Fieldset.test.tsx` | — | `./Fieldset` ✓ | ✓ legend 用 querySelector、ref 用 HTMLElement | 通过 |

变体签名交叉验证：
- `inputLabelVariants({ size: 'md', hasError, disabled })` —— `input-variants.ts:94` 的 CVA 恰好定义 `size/hasError/disabled` 三个变体 ✓
- `inputHelperVariants({ variant: 'default' | 'error' })` —— `input-variants.ts:124` 恰好定义 `variant: default|error` ✓

示例文件全部存在：copy-button(2)、button-group(3)、field(3：basic/with-input/with-error)、fieldset(2)。registry entries 的 `?raw` 源码引用与示例文件一一对应 ✓。

### 发现的三个阻断性问题

#### 问题 1：主 barrel `src/index.ts` 未导出四个新组件（自动生成，需同步）

`src/index.ts` 由 `scripts/sync-exports.ts` 自动生成：扫描 `src/` 一级目录，读取各 `index.ts` 的命名导出，AST 解析后拼出 barrel。当前 barrel（行 28–99）**没有** CopyButton / ButtonGroup / Field / Fieldset 这四条 export。

影响：`import { CopyButton } from 'aios-ui-kit'` 在打包产物里拿不到，且 `sync:exports --check` 会失败。

四个组件目录都有合法的 `index.ts`（含 named export），所以**重跑脚本即可自动补齐**，无需手写。

#### 问题 2：`src/subpath/{copy-button,button-group,field,fieldset}.ts` 转发文件缺失（最严重，阻断文档站）

`src/subpath/*.ts` 由 `scripts/generate-subpaths.ts` 自动生成：为每个组件目录生成一个 kebab-case 转发文件（`export * from '@/ComponentName'`）。已确认 `src/subpath/` 下现有 79 个文件，但**没有** `copy-button.ts` / `button-group.ts` / `field.ts` / `fieldset.ts`。

Vite 配置（`vite.config.ts:15`）把 `'aios-ui-kit'` alias 到 `./src/subpath`。因此所有示例与 registry entry 写的 `import { CopyButton } from 'aios-ui-kit/copy-button'` 会解析到 `src/subpath/copy-button.ts`——**文件不存在，开发服务器与 showcase 构建在加载这四个组件页时必然报错**。

修复方式：重跑 `npm run sync:subpaths`，自动生成这四个转发文件。

#### 问题 3：`src/site/registry/manifest.ts` 缺少四个清单条目（手动维护）

registry 的 entry 文件（`entries/copy-button.tsx` 等）靠 `import.meta.glob` 自动发现，已就位。但侧栏 / 搜索索引读的是 `manifest.ts` 里的 `ENTRIES` 数组——该数组是**手动维护**的，当前（行 21–731）没有这四个条目。

影响：组件实现和文档正文都在，但侧栏与搜索里看不到这四个组件页。

`ComponentStatus` 类型（`types.ts:39`）为 `'stable' | 'beta' | 'new' | 'deprecated'`，四个 registry entry 都标 `status: 'new'`，manifest 同步用 `'new'`。

### 一个一致性微调（非阻断）

CopyButton.tsx 用 `import { Button, type ButtonProps } from '@/Button/Button'`（深路径），而 ButtonGroup.tsx 用 `@/Button`（barrel）。全 `src/` 树里只有 CopyButton 这一处用深路径。

说明：ButtonGroup 当初改用 `@/Button` 是因为 `ButtonSize` 不在 `Button.tsx` 里导出（它在 `button-variants.ts`），深路径拿不到。CopyButton 需要的 `Button` + `ButtonProps` 都在 `Button.tsx` 导出，所以深路径**能解析、不是 bug**。仅为一致性建议对齐到 `@/Button`。

---

## 拟改动

### 改动 1：同步主 barrel（自动生成）

- 操作：在 `REACT_ROOT` 运行 `npm run sync:exports`
- 脚本：`scripts/sync-exports.ts`（已读，确认逻辑：扫描 src 一级目录 → AST 读 index.ts 命名导出 → 重写 `src/index.ts`）
- 预期产物：`src/index.ts` 在 Components 段新增四条，形如：
  ```ts
  export { ButtonGroup, buttonGroupVariants, type ButtonGroupProps } from './ButtonGroup'
  export { CopyButton, type CopyButtonProps } from './CopyButton'
  export { Field, FieldLabel, FieldDescription, FieldError, fieldVariants, type FieldProps, type FieldLabelProps, type FieldDescriptionProps, type FieldErrorProps } from './Field'
  export { Fieldset, fieldsetVariants, fieldsetLegendVariants, type FieldsetProps } from './Fieldset'
  ```
  （确切命名导出由脚本 AST 解析各 `index.ts` 决定，无需手写。）
- 为什么：barrel 是自动生成的，手写会被 `--check` 判定为过期；跑脚本才符合项目约定。

### 改动 2：同步 subpath 转发文件（自动生成）

- 操作：在 `REACT_ROOT` 运行 `npm run sync:subpaths`
- 脚本：`scripts/generate-subpaths.ts`（已读，确认逻辑：扫描 src 一级目录（排除 EXCLUDED）→ 为每个有 `index.ts` 的目录生成 kebab-case 转发文件）
- 预期产物：新增四个文件
  - `src/subpath/copy-button.ts` → `export * from '@/CopyButton'`
  - `src/subpath/button-group.ts` → `export * from '@/ButtonGroup'`
  - `src/subpath/field.ts` → `export * from '@/Field'`
  - `src/subpath/fieldset.ts` → `export * from '@/Fieldset'`
- 为什么：这是阻断文档站的最严重问题；不补这四个文件，四个组件页 + 示例全炸。

### 改动 3：登记 manifest 条目（手动编辑）

- 文件：`src/site/registry/manifest.ts`
- 操作：在 `ENTRIES` 数组的 `actions-inputs` 段末尾（`quick-toggle` 条目之后、`card` 条目之前，约第 191 行后）插入四条。顺序无所谓——导出时已 `sort((a,b)=>a.name.localeCompare(b.name))`。
- 内容（slug / name / category / description 直接取自各 registry entry，保持两源一致）：

```ts
{
  slug: 'button-group',
  name: 'ButtonGroup',
  category: 'actions-inputs',
  status: 'new',
  description: {
    zh: '按钮组，相邻按钮共享边框，横竖两种排列。',
    en: 'A group of buttons that share borders, horizontal or vertical.',
  },
},
{
  slug: 'copy-button',
  name: 'CopyButton',
  category: 'actions-inputs',
  status: 'new',
  description: {
    zh: '独立复制按钮，复制后短暂显示 [COPIED] 回执，不弹 toast。',
    en: 'A standalone copy button that flashes [COPIED] for a moment instead of firing a toast.',
  },
},
{
  slug: 'field',
  name: 'Field',
  category: 'actions-inputs',
  status: 'new',
  description: {
    zh: '表单字段壳，统一 label、说明与错误文案的排版。',
    en: 'A form field shell that keeps labels, hints, and errors in lockstep.',
  },
},
{
  slug: 'fieldset',
  name: 'Fieldset',
  category: 'actions-inputs',
  status: 'new',
  description: {
    zh: '字段分组，带 legend 标题与 1px 边框。',
    en: 'A field group with a legend and a 1px border.',
  },
},
```

### 改动 4：CopyButton 导入路径对齐（一致性微调）

- 文件：`src/CopyButton/CopyButton.tsx`
- 改动：`import { Button, type ButtonProps } from '@/Button/Button'` → `import { Button, type ButtonProps } from '@/Button'`
- 为什么：与 ButtonGroup 统一走 barrel；`@/Button`（`Button/index.ts`）已 re-export `Button` 与 `ButtonProps`，解析等价。
- 风险：无。仅改导入说明符，不改任何用法。

---

## 假设与决策

1. **不改任何组件实现逻辑**：回读确认四组件的 .tsx / 测试 / 变体 / index.ts / registry / 示例均正确，本次只补「胶水」层（barrel、subpath、manifest）。
2. **barrel 与 subpath 走脚本而非手写**：这两个文件本就是自动生成的，手写会与 `--check` 校验冲突；重跑脚本是项目设计的工作流。
3. **manifest status 用 `'new'`**：与各 registry entry 里的 `status: 'new'` 保持一致；`ComponentStatus` 类型已确认含 `'new'`。
4. **manifest description 直接复制自 registry entry**：保证侧栏摘要与文档页描述一致，避免两处文案分叉。
5. **CopyButton 导入对齐为可选项**：不是 bug，仅为一致性；改动极小且零风险，一并做掉。
6. **不改 `package.json` 的 `exports` 字段**：`./*` → `./es/subpath/*.mjs` 已覆盖 subpath 消费路径，构建产物由 `sync:subpaths` 生成的源码经 `tsdown` 打包得到，无需动 package.json。

---

## 验证

按顺序执行（均在 `REACT_ROOT` 下）：

1. `npm run sync:exports -- --check` → 应输出 `✓ src/index.ts is in sync`（先跑无参版同步，再跑 --check 确认）
2. `npm run sync:subpaths -- --check` → 应输出 `subpath 入口已是最新`
3. `npm run type-check` → 全绿，确认 `src/index.ts` 新增导出与 `src/subpath/*.ts` 转发都类型正确
4. `npm test -- CopyButton ButtonGroup Field Fieldset` → 四个组件测试全过
5. `npm run dev` → 打开 showcase，确认侧栏出现 ButtonGroup / CopyButton / Field / Fieldset 四项，逐页点击能渲染 preview + 示例（验证 subpath alias 解析正常）
6. （可选）`npm run lint` → 无新增告警

完成标志：步骤 1–4 全绿 + 步骤 5 四个组件页可正常浏览渲染。

---

## 执行顺序建议

1. 先跑 `npm run sync:exports` 与 `npm run sync:subpaths`（两条自动生成命令）
2. 手动编辑 `manifest.ts` 插入四条
3. 手动编辑 `CopyButton.tsx` 对齐导入路径
4. 跑验证 1–5

> 注：`sync:exports` 会重写 `src/index.ts`；`sync:subpaths` 会清空并重建 `src/subpath/` 目录。两者都是幂等的，重跑安全。
