# 组件详细目录补充 Spec

## Why
现有 catalog-all-components 规范已完成分类体系和基础信息（组件名、文件路径、接口名），但缺少用户要求的详细 Props 字段定义、使用示例和适用场景。需要补充每个组件的完整接口字段、变体模式、典型用法和适用场景，形成可操作的组件目录。

## What Changes
- 补充所有 82 个组件的完整 Props 接口字段定义（字段名、类型、必填性、默认值）
- 补充辅助接口定义（AccordionItem, RadioOption, SelectOption, DataRowItem 等）
- 补充每个组件的变体/模式说明
- 补充每个组件的使用示例代码
- 补充每个组件的适用场景描述

## Impact
- Affected specs: catalog-all-components（基础分类体系）
- Affected code: 无代码变更，仅补充文档化信息

## ADDED Requirements

### Requirement: Props 接口完整字段定义
每个有 Props 接口的组件 SHALL 记录完整的字段定义，包括字段名、TypeScript 类型、是否必填、默认值。

#### Scenario: Props 字段可查阅
- **WHEN** 开发者需要使用某个组件
- **THEN** 可在目录中查阅该组件所有 Props 字段的名称、类型、必填性和默认值

### Requirement: 使用示例
每个有 Props 接口的组件 SHALL 提供 1-2 个典型的 JSX 使用示例代码。

#### Scenario: 使用示例可复制
- **WHEN** 开发者需要快速使用某个组件
- **THEN** 可直接复制使用示例代码并修改参数

### Requirement: 适用场景
每个组件 SHALL 提供 1-3 个典型适用场景描述。

#### Scenario: 组件选型有依据
- **WHEN** 开发者需要选择合适的组件
- **THEN** 可根据适用场景描述判断组件是否满足需求

## MODIFIED Requirements

（无修改的需求）

## REMOVED Requirements

（无移除的需求）

---

## 附录：完整组件详细目录

### 一、UI Primitive（UI 原语）— 7 个

---

#### Accordion

| 属性 | 值 |
|------|-----|
| **文件** | Accordion.tsx |
| **导出** | `export default Accordion` |
| **功能** | 手风琴折叠面板，支持单选/多选展开模式 |
| **依赖** | useState, useRef, useCallback, accordion.css |

**Props 接口：AccordionProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| items | AccordionItem[] | 是 | - |
| type | 'single' \| 'multiple' | 否 | 'single' |
| defaultOpen | string[] | 否 | [] |

**辅助接口：AccordionItem**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| id | string | 是 | - |
| title | string | 是 | - |
| content | string | 是 | - |
| disabled | boolean | 否 | - |

**使用示例**
```tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: 'Content here' },
    { id: '2', title: 'Section 2', content: 'More content' },
  ]}
  type="single"
  defaultOpen={['1']}
/>
```

**适用场景**：FAQ 页面、设置面板分组、可折叠的内容区域

---

#### Collapsible

| 属性 | 值 |
|------|-----|
| **文件** | Collapsible.tsx |
| **导出** | `export default Collapsible` |
| **功能** | 可折叠区域，点击触发器展开/收起内容 |
| **依赖** | useState, useCallback, collapsible.css |

**Props 接口：CollapsibleProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| open | boolean | 否 | -（受控） |
| defaultOpen | boolean | 否 | false |
| onOpenChange | (open: boolean) => void | 否 | - |
| trigger | React.ReactNode | 是 | - |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Collapsible trigger="Advanced Settings" defaultOpen={false}>
  <p>Hidden content here</p>
</Collapsible>
```

**适用场景**：高级选项折叠、详情展开、单区域收起展开

---

#### Resizable

| 属性 | 值 |
|------|-----|
| **文件** | Resizable.tsx |
| **导出** | `export default Resizable` |
| **功能** | 可调整大小面板，支持水平/垂直拖拽分割 |
| **依赖** | React, useState, useRef, useCallback, useEffect, resizable.css |

**Props 接口：ResizableProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| direction | 'horizontal' \| 'vertical' | 否 | 'horizontal' |
| initialSizes | number[] | 否 | -（均分） |
| minSizes | number[] | 否 | -（每面板 10） |
| maxSizes | number[] | 否 | -（每面板 90） |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Resizable direction="horizontal" initialSizes={[30, 70]}>
  <Sidebar />
  <MainContent />
</Resizable>
```

**适用场景**：代码编辑器分栏、侧边栏+主内容布局、可拖拽分割面板

---

#### AspectRatio

| 属性 | 值 |
|------|-----|
| **文件** | AspectRatio.tsx |
| **导出** | `export default AspectRatio` |
| **功能** | 宽高比容器，按指定比例约束子元素尺寸 |
| **依赖** | aspect-ratio.css |

**Props 接口：AspectRatioProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| ratio | number | 否 | 16/9 |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<AspectRatio ratio={4/3}>
  <img src="photo.jpg" alt="Photo" />
</AspectRatio>
```

**适用场景**：图片/视频容器固定比例、响应式媒体展示、卡片封面图

---

#### Separator

| 属性 | 值 |
|------|-----|
| **文件** | Separator.tsx |
| **导出** | `export default Separator` |
| **功能** | 分隔线，支持水平/垂直方向和带标签模式 |
| **依赖** | separator.css |

**Props 接口：SeparatorProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| orientation | 'horizontal' \| 'vertical' | 否 | 'horizontal' |
| decorative | boolean | 否 | false |
| label | string | 否 | - |

**使用示例**
```tsx
<Separator />
<Separator orientation="vertical" />
<Separator label="OR" />
```

**适用场景**：内容分组分隔、表单区域分隔、工具栏分隔

---

#### ScrollArea

| 属性 | 值 |
|------|-----|
| **文件** | ScrollArea.tsx |
| **导出** | `export default ScrollArea` |
| **功能** | 自定义滚动区域，带自定义滚动条样式 |
| **依赖** | useRef, useState, useCallback, useEffect, scroll-area.css |

**Props 接口：ScrollAreaProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| height | string | 否 | - |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<ScrollArea height="300px">
  <LongContentList />
</ScrollArea>
```

**适用场景**：长列表滚动、侧边栏内容区、聊天消息列表

---

#### ErrorBoundary

| 属性 | 值 |
|------|-----|
| **文件** | ErrorBoundary.tsx |
| **导出** | `export default ErrorBoundary` |
| **功能** | 错误边界，捕获子组件渲染错误并显示降级 UI |
| **依赖** | React（Class Component） |

**Props 接口：ErrorBoundaryProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| children | React.ReactNode | 是 | - |
| fallback | React.ReactNode | 否 | -（内置默认错误 UI） |

**使用示例**
```tsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <App />
</ErrorBoundary>
```

**适用场景**：根组件错误保护、风险组件隔离、第三方组件容错

---

### 二、Core Interaction（核心交互）— 12 个

---

#### Button

| 属性 | 值 |
|------|-----|
| **文件** | Buttons.tsx |
| **导出** | `export default Button` |
| **功能** | 按钮，支持 4 种变体和 3 种尺寸 |
| **依赖** | buttons.css |

**Props 接口：ButtonProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'destructive' | 否 | 'primary' |
| size | 'default' \| 'sm' \| 'lg' | 否 | 'default' |
| fullWidth | boolean | 否 | false |
| disabled | boolean | 否 | false |
| children | React.ReactNode | 是 | - |
| onClick | (e: React.MouseEvent\<HTMLElement\>) => void | 否 | - |

**使用示例**
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Submit
</Button>
<Button variant="destructive" fullWidth>Delete All</Button>
```

**适用场景**：表单提交、操作确认、页面导航、破坏性操作

---

#### Input

| 属性 | 值 |
|------|-----|
| **文件** | Inputs.tsx |
| **导出** | `export default Input` |
| **功能** | 输入框，支持下划线和边框两种变体 |
| **依赖** | inputs.css |

**Props 接口：InputProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'underline' \| 'bordered' | 否 | 'underline' |
| label | string | 否 | - |
| placeholder | string | 否 | - |
| value | string | 否 | -（受控） |
| error | string | 否 | - |
| disabled | boolean | 否 | false |
| id | string | 否 | -（自动生成） |
| onChange | (value: string) => void | 否 | - |

**使用示例**
```tsx
<Input variant="underline" label="Email" placeholder="you@example.com" />
<Input variant="bordered" label="Password" error="Required" />
```

**适用场景**：登录表单、搜索框、用户资料编辑

---

#### Switch

| 属性 | 值 |
|------|-----|
| **文件** | Switch.tsx |
| **导出** | `export default Switch` |
| **功能** | 开关切换，支持 on/off 状态 |
| **依赖** | useState, switch.css |

**Props 接口：SwitchProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| on | boolean | 否 | -（受控） |
| label | string | 否 | - |
| disabled | boolean | 否 | false |
| onChange | (on: boolean) => void | 否 | - |

**使用示例**
```tsx
<Switch label="Dark Mode" on={isDark} onChange={setIsDark} />
<Switch label="Notifications" disabled />
```

**适用场景**：设置开关、功能启用/禁用、偏好切换

---

#### Checkbox

| 属性 | 值 |
|------|-----|
| **文件** | Checkbox.tsx |
| **导出** | `export default Checkbox` |
| **功能** | 复选框，支持三态（未选/已选/半选） |
| **依赖** | useState, useCallback, useRef, checkbox.css |

**Props 接口：CheckboxProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| checked | boolean \| 'indeterminate' | 否 | -（受控） |
| defaultChecked | boolean | 否 | false |
| onCheckedChange | (checked: boolean \| 'indeterminate') => void | 否 | - |
| disabled | boolean | 否 | false |
| label | string | 否 | - |
| id | string | 否 | - |

**使用示例**
```tsx
<Checkbox label="Accept terms" onCheckedChange={setChecked} />
<Checkbox checked="indeterminate" label="Select all" />
```

**适用场景**：多选列表、全选/半选、协议确认

---

#### RadioGroup

| 属性 | 值 |
|------|-----|
| **文件** | RadioGroup.tsx |
| **导出** | `export default RadioGroup` |
| **功能** | 单选按钮组，支持水平/垂直方向 |
| **依赖** | useState, useRef, useCallback, radio-group.css |

**Props 接口：RadioGroupProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| options | RadioOption[] | 是 | - |
| value | string | 否 | -（受控） |
| defaultValue | string | 否 | - |
| onValueChange | (value: string) => void | 否 | - |
| disabled | boolean | 否 | false |
| name | string | 否 | - |
| orientation | 'horizontal' \| 'vertical' | 否 | 'vertical' |

**辅助接口：RadioOption** — `{ value: string; label: string; disabled?: boolean }`

**使用示例**
```tsx
<RadioGroup
  options={[
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ]}
  orientation="horizontal"
  onValueChange={setTheme}
/>
```

**适用场景**：主题选择、单选设置项、表单单选项

---

#### Slider

| 属性 | 值 |
|------|-----|
| **文件** | Slider.tsx |
| **导出** | `export default Slider` |
| **功能** | 滑块，支持拖拽调节值和数值显示 |
| **依赖** | useState, useRef, useCallback, slider.css |

**Props 接口：SliderProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| value | number | 否 | -（受控） |
| defaultValue | number | 否 | -（回退到 min） |
| onValueChange | (value: number) => void | 否 | - |
| min | number | 否 | 0 |
| max | number | 否 | 100 |
| step | number | 否 | 1 |
| disabled | boolean | 否 | false |
| label | string | 否 | - |
| showValue | boolean | 否 | false |

**使用示例**
```tsx
<Slider label="Volume" min={0} max={100} showValue onValueChange={setVolume} />
```

**适用场景**：音量控制、亮度调节、数值范围选择

---

#### Toggle / ToggleGroup

| 属性 | 值 |
|------|-----|
| **文件** | Toggle.tsx |
| **导出** | `export { Toggle, ToggleGroup }` + `export default Toggle` |
| **功能** | 切换按钮/切换按钮组，支持多选和 outline 变体 |
| **依赖** | useState, useCallback, createContext, useContext, toggle.css |

**Props 接口：ToggleProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| pressed | boolean | 否 | -（受控） |
| defaultPressed | boolean | 否 | false |
| onPressedChange | (pressed: boolean) => void | 否 | - |
| disabled | boolean | 否 | false |
| variant | 'default' \| 'outline' | 否 | 'default' |
| size | 'sm' \| 'md' \| 'lg' | 否 | 'md' |
| value | string | 否 | -（Group 内使用） |
| children | React.ReactNode | 是 | - |

**Props 接口：ToggleGroupProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| value | string[] | 否 | -（受控） |
| defaultValue | string[] | 否 | [] |
| onValueChange | (value: string[]) => void | 否 | - |
| variant | 'default' \| 'outline' | 否 | 'default' |
| size | 'sm' \| 'md' \| 'lg' | 否 | 'md' |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Toggle variant="outline" size="sm" onPressedChange={setActive}>
  Bold
</Toggle>
<ToggleGroup variant="outline" onValueChange={setSelected}>
  <Toggle value="bold">B</Toggle>
  <Toggle value="italic">I</Toggle>
  <Toggle value="underline">U</Toggle>
</ToggleGroup>
```

**适用场景**：富文本编辑器工具栏、多选筛选器、格式切换

---

#### SegmentedControl

| 属性 | 值 |
|------|-----|
| **文件** | SegmentedControl.tsx |
| **导出** | `export default SegmentedControl` |
| **功能** | 分段控制器，在多个选项间切换 |
| **依赖** | segmented-control.css |

**Props 接口：SegmentedControlProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| segments | string[] | 是 | - |
| activeIndex | number | 否 | -（受控） |
| variant | 'pill' \| 'rounded' | 否 | 'pill' |
| disabled | boolean | 否 | false |
| onChange | (index: number) => void | 否 | - |

**使用示例**
```tsx
<SegmentedControl
  segments={['Day', 'Week', 'Month']}
  variant="rounded"
  onChange={setView}
/>
```

**适用场景**：时间范围切换、视图模式切换、筛选维度选择

---

#### Textarea

| 属性 | 值 |
|------|-----|
| **文件** | Textarea.tsx |
| **导出** | `export default Textarea` |
| **功能** | 多行文本框，支持自动调整高度 |
| **依赖** | useState, useRef, useEffect, useId, useCallback, textarea.css |

**Props 接口：TextareaProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| value | string | 否 | -（受控） |
| defaultValue | string | 否 | '' |
| onChange | (e: React.ChangeEvent\<HTMLTextAreaElement\>) => void | 否 | - |
| placeholder | string | 否 | - |
| label | string | 否 | - |
| error | string | 否 | - |
| disabled | boolean | 否 | false |
| autoResize | boolean | 否 | false |
| minRows | number | 否 | 3 |
| maxRows | number | 否 | - |
| id | string | 否 | -（自动生成） |

**使用示例**
```tsx
<Textarea label="Description" autoResize minRows={3} maxRows={10} />
<Textarea label="Notes" error="Required" />
```

**适用场景**：评论输入、描述填写、反馈表单

---

#### InputOTP

| 属性 | 值 |
|------|-----|
| **文件** | InputOTP.tsx |
| **导出** | `export default InputOTP` |
| **功能** | OTP 验证码输入，支持指定长度，自动跳转下一输入框 |
| **依赖** | useState, useRef, useCallback, input-otp.css |

**Props 接口：InputOTPProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| length | number | 否 | 6 |
| value | string | 否 | -（受控） |
| onValueChange | (value: string) => void | 否 | - |
| disabled | boolean | 否 | false |
| error | boolean | 否 | false |

**使用示例**
```tsx
<InputOTP length={6} onValueChange={setCode} />
<InputOTP length={4} error disabled />
```

**适用场景**：短信验证码、邮箱验证码、两步验证

---

#### Form

| 属性 | 值 |
|------|-----|
| **文件** | Form.tsx |
| **导出** | `export default Form` |
| **功能** | 表单容器，自动阻止默认提交行为 |
| **依赖** | form.css |

**Props 接口：FormProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| onSubmit | (e: React.FormEvent) => void | 否 | - |
| children | React.ReactNode | 是 | - |
| className | string | 否 | - |

**使用示例**
```tsx
<Form onSubmit={handleSubmit}>
  <Input label="Name" />
  <Button variant="primary">Submit</Button>
</Form>
```

**适用场景**：登录表单、注册表单、设置表单

---

#### Label

| 属性 | 值 |
|------|-----|
| **文件** | Label.tsx |
| **导出** | `export default Label` |
| **功能** | 标签组件，支持 required 星号标记 |
| **依赖** | label.css |

**Props 接口：LabelProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| htmlFor | string | 否 | - |
| disabled | boolean | 否 | false |
| required | boolean | 否 | false |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Label htmlFor="email" required>Email</Label>
<Label disabled>Disabled Field</Label>
```

**适用场景**：表单字段标签、必填标记、禁用字段标注

---

### 三、Data Display（数据展示）— 13 个

---

#### Card

| 属性 | 值 |
|------|-----|
| **文件** | Cards.tsx |
| **导出** | `export default Card` |
| **功能** | 卡片容器，支持 4 种变体和交互模式 |
| **依赖** | cards.css |

**Props 接口：CardProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'default' \| 'raised' \| 'compact' \| 'technical' | 否 | 'default' |
| interactive | boolean | 否 | false |
| disabled | boolean | 否 | false |
| title | string | 否 | - |
| action | string | 否 | - |
| onAction | (e: React.MouseEvent\<HTMLElement\>) => void | 否 | - |
| onClick | (e: React.MouseEvent\<HTMLElement\>) => void | 否 | - |
| footer | React.ReactNode | 否 | - |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Card variant="raised" title="Settings" action="Edit" onAction={handleEdit}>
  <p>Card content</p>
</Card>
<Card variant="technical" interactive onClick={handleClick}>
  System Status
</Card>
```

**适用场景**：信息展示卡片、设置面板、可点击的操作入口

---

#### DataRows

| 属性 | 值 |
|------|-----|
| **文件** | DataRows.tsx |
| **导出** | `export default DataRows` |
| **功能** | 数据行列表，展示带标签/值/单位/状态/趋势的行数据 |
| **依赖** | data-rows.css |

**Props 接口：DataRowsProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| rows | DataRowItem[] | 是 | - |
| onRowClick | (index: number) => void | 否 | - |

**辅助接口：DataRowItem** — `{ label: string; value: string; unit?: string; trend?: string; status?: 'good'|'warning'|'error'|'info'; isSub?: boolean; interactive?: boolean; disabled?: boolean }`

**使用示例**
```tsx
<DataRows
  rows={[
    { label: 'CPU', value: '45', unit: '%', status: 'good' },
    { label: 'Memory', value: '89', unit: '%', status: 'warning' },
  ]}
  onRowClick={(i) => console.log(i)}
/>
```

**适用场景**：系统指标展示、设置项列表、键值对数据展示

---

#### DataGrid

| 属性 | 值 |
|------|-----|
| **文件** | DataGrid.tsx |
| **导出** | `export default DataGrid` |
| **功能** | 数据网格，支持列定义、行数据、单元格状态标记 |
| **依赖** | data-grid.css |

**Props 接口：DataGridProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| columns | Column[] | 是 | - |
| rows | Row[] | 是 | - |
| emptyMessage | string | 否 | 'No data' |
| onRowClick | (index: number) => void | 否 | - |

**辅助接口**：Column `{ key, label, type?: 'text'|'numeric' }`、Row `{ cells: Record<string, string|number>; active?; interactive?; cellStatuses?: CellStatus[] }`、CellStatus `{ columnKey, status }`

**使用示例**
```tsx
<DataGrid
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'score', label: 'Score', type: 'numeric' },
  ]}
  rows={[
    { cells: { name: 'Alice', score: 95 }, interactive: true },
  ]}
/>
```

**适用场景**：数据表格、排行榜、监控面板

---

#### ProgressBar

| 属性 | 值 |
|------|-----|
| **文件** | ProgressBar.tsx |
| **导出** | `export default ProgressBar` |
| **功能** | 进度条，支持多种尺寸、状态和不确定模式 |
| **依赖** | useState, useEffect, progress-bar.css |

**Props 接口：ProgressBarProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| value | number | 是 | - |
| total | number | 否 | 100 |
| segments | number | 否 | 20 |
| size | 'hero' \| 'standard' \| 'compact' | 否 | 'standard' |
| variant | 'default' \| 'slim' | 否 | 'default' |
| indeterminate | boolean | 否 | false |
| label | string | 否 | - |
| unit | string | 否 | - |
| status | ProgressStatus | 否 | 'default' |
| showReadout | boolean | 否 | true |
| disabled | boolean | 否 | false |

**辅助类型**：`ProgressStatus = 'default' | 'good' | 'warning' | 'overlimit'`

**使用示例**
```tsx
<ProgressBar value={75} size="hero" status="good" label="Storage" unit="GB" />
<ProgressBar indeterminate size="compact" />
```

**适用场景**：存储用量、下载进度、任务完成度

---

#### Table

| 属性 | 值 |
|------|-----|
| **文件** | Table.tsx |
| **导出** | `export default Table` |
| **功能** | 表格，支持列定义、斑马纹和悬停效果 |
| **依赖** | table.css |

**Props 接口：TableProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| columns | TableColumn[] | 是 | - |
| rows | { cells: Record<string, React.ReactNode>; id?: string }[] | 是 | - |
| caption | string | 否 | - |
| striped | boolean | 否 | false |
| compact | boolean | 否 | false |
| hoverable | boolean | 否 | false |

**辅助接口**：TableColumn `{ key, label, width?, align?: 'left'|'center'|'right' }`

**使用示例**
```tsx
<Table
  columns={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]}
  rows={[{ cells: { name: 'Alice', role: 'Admin' } }]}
  striped
  hoverable
/>
```

**适用场景**：用户列表、配置表、数据报表

---

#### Badge

| 属性 | 值 |
|------|-----|
| **文件** | Badge.tsx |
| **导出** | `export default Badge` |
| **功能** | 徽章/标签，支持 4 种变体 |
| **依赖** | badge.css |

**Props 接口：BadgeProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'default' \| 'secondary' \| 'destructive' \| 'outline' | 否 | 'default' |
| children | React.ReactNode | 是 | - |

**使用示例**
```tsx
<Badge variant="secondary">New</Badge>
<Badge variant="destructive">Alert</Badge>
```

**适用场景**：状态标记、数量提示、分类标签

---

#### Avatar

| 属性 | 值 |
|------|-----|
| **文件** | Avatar.tsx |
| **导出** | `export default Avatar` |
| **功能** | 头像，支持 3 种尺寸和 fallback 文字 |
| **依赖** | useState, avatar.css |

**Props 接口：AvatarProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| src | string | 否 | - |
| alt | string | 否 | '' |
| fallback | string | 否 | - |
| size | 'sm' \| 'md' \| 'lg' | 否 | 'md' |

**使用示例**
```tsx
<Avatar src="/photo.jpg" alt="User" fallback="JD" size="lg" />
```

**适用场景**：用户头像、联系人列表、评论作者

---

#### Skeleton

| 属性 | 值 |
|------|-----|
| **文件** | Skeleton.tsx |
| **导出** | `export default Skeleton` |
| **功能** | 骨架屏，加载占位 |
| **依赖** | skeleton.css |

**Props 接口：SkeletonProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| width | string | 否 | - |
| height | string | 否 | - |
| variant | 'text' \| 'circular' \| 'rectangular' | 否 | 'text' |
| animate | boolean | 否 | true |

**使用示例**
```tsx
<Skeleton width="200px" height="20px" />
<Skeleton variant="circular" width="48px" height="48px" />
```

**适用场景**：内容加载占位、列表项骨架、卡片骨架

---

#### Breadcrumb

| 属性 | 值 |
|------|-----|
| **文件** | Breadcrumb.tsx |
| **导出** | `export default Breadcrumb` |
| **功能** | 面包屑导航，支持多级路径链接 |
| **依赖** | breadcrumb.css |

**Props 接口：BreadcrumbProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| items | BreadcrumbItem[] | 是 | - |
| separator | string | 否 | '/' |

**辅助接口**：BreadcrumbItem `{ label, href?, onClick? }`

**使用示例**
```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ]}
/>
```

**适用场景**：页面层级导航、文件路径展示、分类路径

---

#### Pagination

| 属性 | 值 |
|------|-----|
| **文件** | Pagination.tsx |
| **导出** | `export default Pagination` |
| **功能** | 分页，支持页码导航和总页数显示 |
| **依赖** | useCallback, useRef, pagination.css |

**Props 接口：PaginationProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| page | number | 是 | - |
| totalPages | number | 是 | - |
| onPageChange | (page: number) => void | 是 | - |
| siblingCount | number | 否 | 1 |

**使用示例**
```tsx
<Pagination page={currentPage} totalPages={20} onPageChange={setPage} />
```

**适用场景**：数据列表分页、搜索结果分页、表格分页

---

#### Tag / Tags

| 属性 | 值 |
|------|-----|
| **文件** | Tags.tsx |
| **导出** | `export { Tag, Tags }` + `export default Tag` |
| **功能** | 标签/标签组，支持 pill/technical 变体和可移除 |
| **依赖** | tags.css |

**Props 接口：TagProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'pill' \| 'technical' | 否 | 'pill' |
| active | boolean | 否 | false |
| removable | boolean | 否 | false |
| disabled | boolean | 否 | false |
| children | React.ReactNode | 是 | - |
| onClick | () => void | 否 | - |
| onRemove | () => void | 否 | - |

**Props 接口：TagsProps** — `{ children: React.ReactNode }`

**使用示例**
```tsx
<Tags>
  <Tag variant="pill" active>React</Tag>
  <Tag variant="technical" removable onRemove={() => {}}>TypeScript</Tag>
</Tags>
```

**适用场景**：技能标签、筛选标签、分类标记

---

#### States（LoadingState / ErrorState / EmptyState / DisabledState）

| 属性 | 值 |
|------|-----|
| **文件** | States.tsx |
| **导出** | `export { LoadingState, ErrorState, EmptyState, DisabledState }` |
| **功能** | 状态展示组件集：加载中/错误/空/禁用 |
| **依赖** | states.css |

**LoadingStateProps** — `{ progress?: number; totalSegments?: number; label?: string }`

**ErrorStateProps** — `{ headline: string; message?: string; prefix?: string; onRetry?: () => void }`

**EmptyStateProps** — `{ headline?: string; description?: string; action?: React.ReactNode }`

**DisabledStateProps** — `{ headline?: string; description?: string }`

**使用示例**
```tsx
<LoadingState progress={60} totalSegments={20} label="Loading..." />
<ErrorState headline="Failed to load" onRetry={refetch} />
<EmptyState headline="No items" action={<Button>Add Item</Button>} />
<DisabledState headline="Premium only" description="Upgrade to access" />
```

**适用场景**：数据加载状态、API 错误展示、空列表提示、功能锁定提示

---

### 四、Feedback & Overlay（反馈与浮层）— 11 个

---

#### Modal

| 属性 | 值 |
|------|-----|
| **文件** | Modal.tsx |
| **导出** | `export default Modal` |
| **功能** | 模态对话框，支持普通/警告模式 |
| **依赖** | useState, useEffect, useRef, useCallback, modal.css |

**Props 接口：ModalProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| open | boolean | 否 | -（受控） |
| title | string | 否 | - |
| onClose | () => void | 否 | - |
| footer | React.ReactNode | 否 | - |
| children | React.ReactNode | 否 | - |
| variant | 'default' \| 'alert' | 否 | 'default' |
| description | string | 否 | - |
| confirmLabel | string | 否 | 'Confirm' |
| cancelLabel | string | 否 | 'Cancel' |
| onConfirm | () => void | 否 | - |
| onCancel | () => void | 否 | - |
| destructive | boolean | 否 | false |

**使用示例**
```tsx
<Modal variant="default" title="Edit Profile" onClose={close}>
  <Input label="Name" />
</Modal>
<Modal variant="alert" destructive title="Delete?" onConfirm={handleDelete} onCancel={close}>
  This action cannot be undone.
</Modal>
```

**适用场景**：表单编辑弹窗、确认操作、信息展示弹窗

---

#### Select

| 属性 | 值 |
|------|-----|
| **文件** | Select.tsx |
| **导出** | `export default Select` |
| **功能** | 下拉选择，支持搜索过滤和禁用选项 |
| **依赖** | useState, useRef, useEffect, useCallback, useClickOutside, select.css |

**Props 接口：SelectProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| options | SelectOption[] | 是 | - |
| value | string | 否 | -（受控） |
| defaultValue | string | 否 | - |
| onValueChange | (value: string) => void | 否 | - |
| placeholder | string | 否 | 'Select an option' |
| disabled | boolean | 否 | false |
| label | string | 否 | - |
| error | string | 否 | - |
| searchable | boolean | 否 | false |

**辅助接口**：SelectOption `{ value, label, disabled? }`

**使用示例**
```tsx
<Select
  options={[{ value: 'us', label: 'US' }, { value: 'uk', label: 'UK' }]}
  searchable
  onValueChange={setCountry}
/>
```

**适用场景**：国家/地区选择、分类筛选、配置选项

---

#### Sheet

| 属性 | 值 |
|------|-----|
| **文件** | Sheet.tsx |
| **导出** | `export default Sheet` |
| **功能** | 侧边抽屉/底部弹出面板，支持四方向 |
| **依赖** | useState, useEffect, useRef, useCallback, sheet.css |

**Props 接口：SheetProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| open | boolean | 否 | -（受控） |
| onOpenChange | (open: boolean) => void | 否 | - |
| side | 'left' \| 'right' \| 'top' \| 'bottom' | 否 | 'right' |
| title | string | 否 | - |
| full | boolean | 否 | false |
| sections | SheetSection[] | 否 | - |
| footer | React.ReactNode | 否 | - |
| children | React.ReactNode | 否 | - |

**辅助接口**：SheetSection `{ title?, content: React.ReactNode }`

**使用示例**
```tsx
<Sheet side="right" title="Settings" open={isOpen} onOpenChange={setIsOpen}>
  <SettingsForm />
</Sheet>
<Sheet side="bottom" sections={[{ title: 'Share', content: <ShareOptions /> }]} />
```

**适用场景**：设置面板、筛选面板、底部操作表

---

#### Popover

| 属性 | 值 |
|------|-----|
| **文件** | Popover.tsx |
| **导出** | `export default Popover` |
| **功能** | 弹出框，点击触发显示浮层内容 |
| **依赖** | React, useRef, useEffect, useCallback, useId, useDisclosure, useFloating, useClickOutside, popover.css |

**Props 接口：PopoverProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| content | React.ReactNode | 是 | - |
| side | 'top' \| 'bottom' \| 'left' \| 'right' | 否 | 'bottom' |
| open | boolean | 否 | -（受控） |
| onOpenChange | (open: boolean) => void | 否 | - |
| children | React.ReactElement | 是 | - |

**使用示例**
```tsx
<Popover content={<div>Extra info here</div>} side="right">
  <Button variant="ghost">Info</Button>
</Popover>
```

**适用场景**：补充信息展示、操作菜单、内联编辑

---

#### Tooltip

| 属性 | 值 |
|------|-----|
| **文件** | Tooltip.tsx |
| **导出** | `export default Tooltip` |
| **功能** | 工具提示，悬停时显示提示信息 |
| **依赖** | React, useState, useRef, useEffect, useCallback, useId, useFloating, tooltip.css |

**Props 接口：TooltipProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| content | string | 是 | - |
| side | 'top' \| 'bottom' \| 'left' \| 'right' | 否 | 'top' |
| delay | number | 否 | 300 |
| children | React.ReactElement | 是 | - |

**使用示例**
```tsx
<Tooltip content="Copy to clipboard" side="bottom">
  <Button variant="ghost">Copy</Button>
</Tooltip>
```

**适用场景**：按钮功能提示、图标说明、快捷键提示

---

#### HoverCard

| 属性 | 值 |
|------|-----|
| **文件** | HoverCard.tsx |
| **导出** | `export default HoverCard` |
| **功能** | 悬停卡片，鼠标悬停时弹出信息卡片 |
| **依赖** | React, useState, useRef, useEffect, useCallback, useId, useFloating, hover-card.css |

**Props 接口：HoverCardProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| content | React.ReactNode | 是 | - |
| side | 'top' \| 'bottom' | 否 | 'bottom' |
| delay | number | 否 | 300 |
| children | React.ReactElement | 是 | - |

**使用示例**
```tsx
<HoverCard content={<UserPreview userId="123" />} side="bottom">
  <span>@username</span>
</HoverCard>
```

**适用场景**：用户信息预览、链接预览、商品摘要

---

#### ContextMenu

| 属性 | 值 |
|------|-----|
| **文件** | ContextMenu.tsx |
| **导出** | `export default ContextMenu` |
| **功能** | 右键上下文菜单 |
| **依赖** | React, useState, useRef, useEffect, useCallback, useClickOutside, useKeyboardNavigation, context-menu.css |

**Props 接口：ContextMenuProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| items | ContextMenuItem[] | 是 | - |
| children | React.ReactElement | 是 | - |

**辅助接口**：ContextMenuItem `{ label, onClick?, disabled?, separator?, shortcut? }`

**使用示例**
```tsx
<ContextMenu
  items={[
    { label: 'Copy', shortcut: 'Ctrl+C', onClick: handleCopy },
    { separator: true },
    { label: 'Delete', onClick: handleDelete },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>
```

**适用场景**：文件右键菜单、列表项操作、编辑器右键

---

#### DropdownMenu

| 属性 | 值 |
|------|-----|
| **文件** | DropdownMenu.tsx |
| **导出** | `export default DropdownMenu` |
| **功能** | 下拉菜单，支持子菜单和 menubar 变体 |
| **依赖** | React, useState, useRef, useEffect, useCallback, useDisclosure, useFloating, useClickOutside, useKeyboardNavigation, dropdown-menu.css |

**Props 接口：DropdownMenuProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| trigger | React.ReactNode | 否 | - |
| items | DropdownMenuItem[] \| MenubarItem[] | 是 | - |
| align | 'start' \| 'center' \| 'end' | 否 | 'start' |
| side | 'top' \| 'bottom' | 否 | 'bottom' |
| variant | 'default' \| 'menubar' | 否 | 'default' |

**辅助接口**：DropdownMenuItem `{ label, onClick?, disabled?, separator?, shortcut?, icon? }`、MenubarItem `{ label, items?: DropdownMenuItem[] }`

**使用示例**
```tsx
<DropdownMenu
  trigger={<Button>Menu</Button>}
  items={[
    { label: 'New', icon: <PlusIcon />, onClick: handleNew },
    { separator: true },
    { label: 'Exit', onClick: handleExit },
  ]}
/>
```

**适用场景**：操作菜单、菜单栏、更多操作下拉

---

#### Command

| 属性 | 值 |
|------|-----|
| **文件** | Command.tsx |
| **导出** | `export default Command` |
| **功能** | 命令面板，支持搜索、分组、快捷键 |
| **依赖** | useState, useRef, useCallback, useEffect, useClickOutside, command.css |

**Props 接口：CommandProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| groups | CommandGroup[] | 是 | - |
| placeholder | string | 否 | 'Type a command...' |
| emptyMessage | string | 否 | 'No results found.' |
| open | boolean | 否 | -（受控） |
| onOpenChange | (open: boolean) => void | 否 | - |

**辅助接口**：CommandGroup `{ heading?, items: CommandItem[] }`、CommandItem `{ id, label, shortcut?, icon?, onSelect?, disabled? }`

**使用示例**
```tsx
<Command
  groups={[
    { heading: 'Actions', items: [
      { id: 'save', label: 'Save', shortcut: 'Ctrl+S', onSelect: handleSave },
      { id: 'open', label: 'Open', shortcut: 'Ctrl+O', onSelect: handleOpen },
    ]},
  ]}
/>
```

**适用场景**：全局命令面板、快速操作搜索、快捷键入口

---

#### Sonner

| 属性 | 值 |
|------|-----|
| **文件** | Sonner.tsx |
| **导出** | `export default Sonner` |
| **功能** | Toast 通知，支持 4 种变体和自动消失 |
| **依赖** | useState, useEffect, useCallback, sonner.css |

**Props 接口：SonnerProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| toasts | Toast[] | 是 | - |
| onDismiss | (id: string) => void | 是 | - |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 否 | 'top-right' |

**辅助接口**：Toast `{ id, title, description?, variant?: 'default'|'success'|'error'|'warning', duration?: number }`

**使用示例**
```tsx
<Sonner
  toasts={[{ id: '1', title: 'Saved!', variant: 'success' }]}
  onDismiss={(id) => removeToast(id)}
  position="top-right"
/>
```

**适用场景**：操作反馈通知、错误提示、成功消息

---

#### Alert

| 属性 | 值 |
|------|-----|
| **文件** | Alert.tsx |
| **导出** | `export default Alert` |
| **功能** | 警告/提示框，支持 default 和 destructive 变体 |
| **依赖** | alert.css |

**Props 接口：AlertProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| variant | 'default' \| 'destructive' | 否 | 'default' |
| title | string | 否 | - |
| children | React.ReactNode | 是 | - |
| icon | React.ReactNode | 否 | - |

**使用示例**
```tsx
<Alert variant="default" title="Info">
  Your session will expire in 5 minutes.
</Alert>
<Alert variant="destructive" title="Error">
  Failed to save changes.
</Alert>
```

**适用场景**：页面级提示、警告信息、错误通知

---

### 五、Navigation（导航）— 5 个

---

#### Navigation

| 属性 | 值 |
|------|-----|
| **文件** | Navigation.tsx |
| **导出** | `export default Navigation` |
| **功能** | 导航栏，支持 bracket/pipe 变体 |
| **依赖** | navigation.css |

**Props 接口：NavigationProps** — `{ items: NavItem[]; variant?: 'bracket'|'pipe'; onBack?: () => void }`

**使用示例**
```tsx
<Navigation
  items={[{ label: 'Home', active: true }, { label: 'Settings' }]}
  variant="bracket"
  onBack={() => navigate(-1)}
/>
```

**适用场景**：页面顶部导航、步骤导航、带返回按钮的导航

---

#### NavigationMenu

| 属性 | 值 |
|------|-----|
| **文件** | NavigationMenu.tsx |
| **导出** | `export default NavigationMenu` |
| **功能** | 多级导航菜单，支持子菜单 |
| **依赖** | useState, useRef, useCallback, useClickOutside, navigation-menu.css |

**Props 接口：NavigationMenuProps** — `{ items: NavMenuItem[]; orientation?: 'horizontal'|'vertical' }`

**使用示例**
```tsx
<NavigationMenu
  items={[
    { label: 'Products', items: [{ label: 'Phone' }, { label: 'Earbuds' }] },
    { label: 'About' },
  ]}
/>
```

**适用场景**：网站主导航、产品分类菜单、文档侧边栏

---

#### Sidebar

| 属性 | 值 |
|------|-----|
| **文件** | Sidebar.tsx |
| **导出** | `export default Sidebar` |
| **功能** | 侧边栏，支持导航项、图标、徽章和折叠 |
| **依赖** | useState, useCallback, sidebar.css |

**Props 接口：SidebarProps** — `{ items: SidebarItem[]; collapsed?: boolean; onToggle?: () => void; header?: React.ReactNode; footer?: React.ReactNode }`

**使用示例**
```tsx
<Sidebar
  items={[
    { label: 'Dashboard', icon: <HomeIcon />, active: true },
    { label: 'Settings', icon: <SettingsIcon />, badge: '3' },
  ]}
  collapsed={isCollapsed}
  onToggle={() => setCollapsed(!isCollapsed)}
/>
```

**适用场景**：管理后台侧边栏、应用导航、可折叠导航

---

#### DateNav

| 属性 | 值 |
|------|-----|
| **文件** | DateNav.tsx |
| **导出** | `export default DateNav` |
| **功能** | 日期导航，带前/后箭头切换月份 |
| **依赖** | date-nav.css |

**Props 接口：DateNavProps** — `{ label: string; onPrev?: () => void; onNext?: () => void; variant?: 'default'|'grotesk'; disabled?: boolean }`

**使用示例**
```tsx
<DateNav label="January 2025" onPrev={goPrev} onNext={goNext} variant="grotesk" />
```

**适用场景**：日历月份切换、报表日期导航、时间范围选择

---

#### Taskbar

| 属性 | 值 |
|------|-----|
| **文件** | Taskbar.tsx |
| **导出** | `export default Taskbar` |
| **功能** | 任务栏，展示应用/功能快捷入口 |
| **依赖** | taskbar.css |

**Props 接口：TaskbarProps** — `{ apps: TaskbarApp[]; theme?: 'light'|'dark'; fixed?: boolean; onAppClick?: (id: string) => void }`

**使用示例**
```tsx
<Taskbar
  apps={[
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon /> },
  ]}
  theme="dark"
  fixed
/>
```

**适用场景**：桌面风格界面、应用启动器、底部工具栏

---

### 六、Layout & Container（布局与容器）— 3 个

---

#### Tabs / TabPanel

| 属性 | 值 |
|------|-----|
| **文件** | Tabs.tsx |
| **导出** | `export { Tabs, TabPanel }` + `export default Tabs` |
| **功能** | 标签页，支持选项卡切换和对应面板 |
| **依赖** | useState, useRef, useEffect, useCallback, useId, tabs.css |

**Props 接口：TabsProps** — `{ items: TabItem[]; activeTab?: string; onTabChange?: (id: string) => void; children: React.ReactNode }`

**辅助接口**：TabItem `{ id, label, disabled? }`

**Props 接口：TabPanelProps** — `{ id: string; children: React.ReactNode }`

**使用示例**
```tsx
<Tabs
  items={[{ id: 'tab1', label: 'General' }, { id: 'tab2', label: 'Advanced' }]}
  onTabChange={setTab}
>
  <TabPanel id="tab1"><GeneralSettings /></TabPanel>
  <TabPanel id="tab2"><AdvancedSettings /></TabPanel>
</Tabs>
```

**适用场景**：设置页面分区、内容分类展示、多视图切换

---

#### WidgetGrid

| 属性 | 值 |
|------|-----|
| **文件** | WidgetGrid.tsx |
| **导出** | `export default WidgetGrid` |
| **功能** | Widget 网格布局，自动排列 WidgetCard |
| **依赖** | widget-grid.css |

**Props 接口：WidgetGridProps** — `{ dense?: boolean; compact?: boolean; className?: string; children?: React.ReactNode }`

**使用示例**
```tsx
<WidgetGrid dense>
  <WidgetCard title="Weather" value="30°" />
  <WidgetCard title="Steps" value="8,432" />
</WidgetGrid>
```

**适用场景**：Widget 仪表盘、首页组件网格、移动端桌面布局

---

### 七、Functional Widget（功能小部件）— 19 个

---

#### Clock

| 属性 | 值 |
|------|-----|
| **文件** | Clock.tsx |
| **导出** | `export default Clock` |
| **功能** | 时钟，支持数字/仪表/双环/叠加 4 种模式 |
| **依赖** | clock.css |

**Props 接口：ClockProps** — `{ type?: 'digital'|'gauge'|'dual-ring'|'overlay'; theme?: 'light'|'dark'; updateInterval?: number }`

**使用示例**
```tsx
<Clock type="gauge" theme="dark" />
<Clock type="digital" updateInterval={1000} />
```

**适用场景**：桌面时钟、仪表盘时间、锁屏时间

---

#### Battery

| 属性 | 值 |
|------|-----|
| **文件** | Battery.tsx |
| **导出** | `export default Battery` |
| **功能** | 电池电量显示，带动画充电动效 |
| **依赖** | battery.css |

**Props 接口：BatteryProps** — `{ percent?: number; charging?: boolean; variant?: 'default'|'ring'; theme?: 'light'|'dark' }`

**使用示例**
```tsx
<Battery percent={75} charging variant="ring" theme="dark" />
```

**适用场景**：设备电量展示、系统状态栏、充电状态指示

---

#### Calendar

| 属性 | 值 |
|------|-----|
| **文件** | Calendar.tsx |
| **导出** | `export default Calendar` |
| **功能** | 日历，支持 compact 和 full 两种视图 |
| **依赖** | calendar.css |

**Props 接口：CalendarProps** — `{ variant?: 'compact'|'full'; onDateSelect?: (date: Date) => void }`

**使用示例**
```tsx
<Calendar variant="full" onDateSelect={(d) => console.log(d)} />
<Calendar variant="compact" />
```

**适用场景**：日期选择、日程展示、月历视图

---

#### SystemMonitor

| 属性 | 值 |
|------|-----|
| **文件** | SystemMonitor.tsx |
| **导出** | `export default SystemMonitor` |
| **功能** | 系统监控，展示 CPU/内存/网络等指标 |
| **依赖** | system-monitor.css |

**Props 接口：SystemMonitorProps** — `{ cpu?: number; ram?: number; storage?: number; network?: number; battery?: number }`

**使用示例**
```tsx
<SystemMonitor cpu={45} ram={72} storage={58} battery={85} />
```

**适用场景**：系统状态面板、设备监控、资源使用概览

---

#### MusicPlayer

| 属性 | 值 |
|------|-----|
| **文件** | MusicPlayer.tsx |
| **导出** | `export default MusicPlayer` |
| **功能** | 音乐播放器，展示歌曲信息和播放控制 |
| **依赖** | music-player.css |

**Props 接口：MusicPlayerProps** — `{ title?: string; artist?: string; playing?: boolean; onPlayPause?: () => void; onPrev?: () => void; onNext?: () => void }`

**使用示例**
```tsx
<MusicPlayer title="Song Name" artist="Artist" playing={isPlaying} onPlayPause={toggle} />
```

**适用场景**：音乐播放控件、音频播放器、播客播放器

---

#### PhotoCarousel

| 属性 | 值 |
|------|-----|
| **文件** | PhotoCarousel.tsx |
| **导出** | `export default PhotoCarousel` |
| **功能** | 照片轮播，支持图片切换浏览 |
| **依赖** | photo-carousel.css |

**Props 接口：PhotoCarouselProps** — `{ images: string[]; autoPlay?: boolean; interval?: number }`

**使用示例**
```tsx
<PhotoCarousel images={['/img1.jpg', '/img2.jpg', '/img3.jpg']} autoPlay interval={3000} />
```

**适用场景**：产品图片展示、相册浏览、广告轮播

---

#### Caffeinate

| 属性 | 值 |
|------|-----|
| **文件** | Caffeinate.tsx |
| **导出** | `export default Caffeinate` |
| **功能** | 咖啡因摄入追踪，展示消耗记录 |
| **依赖** | caffeinate.css |

**Props 接口：CaffeinateProps** — `{ drinks?: Drink[]; onAddDrink?: (drink: Drink) => void }`

**使用示例**
```tsx
<Caffeinate onAddDrink={(d) => addDrink(d)} />
```

**适用场景**：健康追踪、饮品记录、咖啡因管理

---

#### Clipboard

| 属性 | 值 |
|------|-----|
| **文件** | Clipboard.tsx |
| **导出** | `export default Clipboard` |
| **功能** | 剪贴板，支持复制文本并显示反馈 |
| **依赖** | clipboard.css |

**Props 接口：ClipboardProps** — `{ items?: ClipboardItem[]; onCopy?: (text: string) => void; onClear?: () => void }`

**使用示例**
```tsx
<Clipboard items={clipboardItems} onCopy={handleCopy} onClear={handleClear} />
```

**适用场景**：剪贴板历史、代码片段管理、快速复制

---

#### Pomodoro

| 属性 | 值 |
|------|-----|
| **文件** | Pomodoro.tsx |
| **导出** | `export default Pomodoro` |
| **功能** | 番茄钟，倒计时工作/休息周期管理 |
| **依赖** | pomodoro.css |

**Props 接口：PomodoroProps** — `{ workDuration?: number; breakDuration?: number; onSessionComplete?: () => void }`

**使用示例**
```tsx
<Pomodoro workDuration={25} breakDuration={5} onSessionComplete={() => {}} />
```

**适用场景**：专注计时、工作休息交替、时间管理

---

#### WalkieTalkie

| 属性 | 值 |
|------|-----|
| **文件** | WalkieTalkie.tsx |
| **导出** | `export default WalkieTalkie` |
| **功能** | 对讲机风格交互，模拟 PTT 通信 |
| **依赖** | walkie-talkie.css |

**Props 接口：WalkieTalkieProps** — `{ channel?: number; onPushToTalk?: () => void; onRelease?: () => void }`

**使用示例**
```tsx
<WalkieTalkie channel={5} onPushToTalk={startTransmit} onRelease={stopTransmit} />
```

**适用场景**：通信模拟、PTT 界面、频道选择

---

#### SunDial

| 属性 | 值 |
|------|-----|
| **文件** | SunDial.tsx |
| **导出** | `export default SunDial` |
| **功能** | 日晷，可视化展示日出日落时段 |
| **依赖** | sun-dial.css |

**Props 接口：SunDialProps** — `{ sunrise?: string; sunset?: string; location?: string }`

**使用示例**
```tsx
<SunDial sunrise="06:30" sunset="18:45" location="Beijing" />
```

**适用场景**：日照时间展示、户外活动规划、天气组件

---

#### AgeMotion

| 属性 | 值 |
|------|-----|
| **文件** | AgeMotion.tsx |
| **导出** | `export default AgeMotion` |
| **功能** | 年龄动态展示，基于日期计算并动画展示 |
| **依赖** | age-motion.css |

**Props 接口：AgeMotionProps** — `{ birthDate?: string }`

**使用示例**
```tsx
<AgeMotion birthDate="1990-06-15" />
```

**适用场景**：个人资料展示、生日倒计时、年龄可视化

---

#### Chrono

| 属性 | 值 |
|------|-----|
| **文件** | Chrono.tsx |
| **导出** | `export default Chrono` |
| **功能** | 计时器/秒表，支持计时和圈数记录 |
| **依赖** | chrono.css |

**Props 接口：ChronoProps** — `{ onStart?: () => void; onStop?: () => void; onLap?: (time: number) => void; onReset?: () => void }`

**使用示例**
```tsx
<Chrono onLap={(t) => addLap(t)} />
```

**适用场景**：运动计时、实验计时、任务耗时追踪

---

#### Spinner

| 属性 | 值 |
|------|-----|
| **文件** | Spinner.tsx |
| **导出** | `export default Spinner` |
| **功能** | 旋转选择器，展示可旋转的项目列表 |
| **依赖** | spinner.css |

**Props 接口：SpinnerProps** — `{ items?: string[]; onSelect?: (item: string) => void }`

**使用示例**
```tsx
<Spinner items={['Option A', 'Option B', 'Option C']} onSelect={handleSelect} />
```

**适用场景**：随机选择、轮盘抽奖、选项旋转

---

#### WorldClock

| 属性 | 值 |
|------|-----|
| **文件** | WorldClock.tsx |
| **导出** | `export default WorldClock` |
| **功能** | 世界时钟，展示多城市时区和当前时间 |
| **依赖** | world-clock.css |

**Props 接口：WorldClockProps** — `{ cities?: City[] }`

**使用示例**
```tsx
<WorldClock cities={[
  { name: 'Tokyo', offset: 9 },
  { name: 'London', offset: 0 },
]} />
```

**适用场景**：多时区展示、国际团队协作、旅行时间对照

---

#### DateWidget

| 属性 | 值 |
|------|-----|
| **文件** | Date.tsx |
| **导出** | `export default DateWidget` |
| **功能** | 日期展示，显示日期信息 |
| **依赖** | date.css |

**Props 接口：DateWidgetProps** — `{ variant?: 'rect'|'dual-ring'; theme?: 'light'|'dark' }`

**使用示例**
```tsx
<DateWidget variant="rect" theme="dark" />
```

**适用场景**：桌面日期显示、锁屏日期、日历 Widget

---

#### NextEvent

| 属性 | 值 |
|------|-----|
| **文件** | NextEvent.tsx |
| **导出** | `export default NextEvent` |
| **功能** | 下一事件/日程提醒 |
| **依赖** | next-event.css |

**Props 接口：NextEventProps** — `{ title?: string; date?: string; month?: string; theme?: 'light'|'dark' }`

**使用示例**
```tsx
<NextEvent title="Team Meeting" date="15" month="JAN" theme="dark" />
```

**适用场景**：日程提醒、事件倒计时、日历集成

---

#### Quotes

| 属性 | 值 |
|------|-----|
| **文件** | Quotes.tsx |
| **导出** | `export default Quotes` |
| **功能** | 引言/引用展示 |
| **依赖** | quotes.css |

**Props 接口：QuotesProps** — `{ text?: string; author?: string; theme?: 'light'|'dark' }`

**使用示例**
```tsx
<Quotes text="Stay hungry, stay foolish." author="Steve Jobs" theme="dark" />
```

**适用场景**：每日名言、引用展示、励志内容

---

#### QuickToggle

| 属性 | 值 |
|------|-----|
| **文件** | QuickToggle.tsx |
| **导出** | `export default QuickToggle` |
| **功能** | 快捷开关，支持 circle/pill 变体和 light/dark/accent 主题 |
| **依赖** | quick-toggle.css |

**Props 接口：QuickToggleProps** — `{ variant?: 'circle'|'pill'; theme?: 'light'|'dark'|'accent'; label?: string; icon?: React.ReactNode; active?: boolean; onClick?: () => void }`

**使用示例**
```tsx
<QuickToggle variant="circle" theme="accent" label="WiFi" active onClick={toggle} />
<QuickToggle variant="pill" theme="dark" label="Bluetooth" />
```

**适用场景**：快捷设置开关、功能启用/禁用、控制中心

---

### 八、Nothing Widget 2.0（Nothing 风格组件）

---

#### WidgetCard

| 属性 | 值 |
|------|-----|
| **文件** | WidgetCard.tsx |
| **导出** | `export default WidgetCard` |
| **功能** | Widget 卡片容器，支持多种尺寸/形状/主题 |
| **依赖** | widget-card.css |

**Props 接口：WidgetCardProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| size | 'square' \| 'wide' \| 'tall' \| 'auto' | 否 | 'square' |
| shape | 'rounded' \| 'pill' \| 'circle' | 否 | 'rounded' |
| theme | 'light' \| 'dark' \| 'accent' | 否 | 'dark' |
| title | string | 否 | - |
| value | string \| number | 否 | - |
| subtitle | string | 否 | - |
| icon | React.ReactNode | 否 | - |
| iconPosition | 'top' \| 'left' \| 'right' \| 'bottom' | 否 | 'top' |
| align | 'left' \| 'center' \| 'right' | 否 | 'center' |
| className | string | 否 | - |
| children | React.ReactNode | 否 | - |
| onClick | () => void | 否 | - |

**使用示例**
```tsx
<WidgetCard size="wide" theme="light" title="Weather" value="30°" subtitle="Sunny">
  <WeatherIcon />
</WidgetCard>
<WidgetCard shape="circle" theme="accent" value="85" subtitle="BPM" />
```

**适用场景**：Widget 仪表盘卡片、信息展示卡片、快捷操作入口

---

#### WidgetIcon

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WidgetIcon.tsx |
| **导出** | `export default WidgetIcon` |
| **功能** | Widget 图标组件，支持 4 种主题和 3 种尺寸 |
| **依赖** | widget-icon.css |

**Props 接口：WidgetIconProps** — `{ theme?: 'light'|'dark'|'accent'|'error'; size?: 'sm'|'md'|'lg'; children?: React.ReactNode; icon?: React.ReactNode; label?: string; className?: string }`

**使用示例**
```tsx
<WidgetIcon theme="dark" size="md" icon={<WifiIcon />} label="WiFi" />
```

**适用场景**：Widget 图标区、快捷功能图标、状态指示图标

---

#### WidgetPill

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WidgetPill.tsx |
| **导出** | `export default WidgetPill` |
| **功能** | Widget 药丸组件，带图标和标签的胶囊形控件 |
| **依赖** | widget-pill.css |

**Props 接口：WidgetPillProps** — `{ theme?: 'light'|'dark'|'accent'|'error'; children?: React.ReactNode; icon?: React.ReactNode; label?: string; onClick?: () => void; className?: string }`

**使用示例**
```tsx
<WidgetPill theme="dark" icon={<NfcIcon />} label="NFC" onClick={toggleNfc} />
```

**适用场景**：快捷开关药丸、功能标签、设置项胶囊

---

#### DotMatrix

| 属性 | 值 |
|------|-----|
| **文件** | DotMatrix.tsx |
| **导出** | `export default DotMatrix` |
| **功能** | 点阵渲染引擎，Nothing 风格核心视觉元素 |
| **依赖** | useMemo, dot-matrix.css |

**Props 接口：DotMatrixProps**

| 字段 | 类型 | 必填 | 默认值 |
|------|------|------|--------|
| rows | number | 是 | - |
| cols | number | 是 | - |
| dotSize | 'sm' \| 'md' \| 'lg' | 否 | 'md' |
| theme | 'light' \| 'dark' | 否 | 'light' |
| pattern | 'grid' \| 'glyph' \| 'pulse' \| 'custom' | 否 | 'grid' |
| activeDots | [number, number][] | 否 | [] |
| dimDots | [number, number][] | 否 | [] |
| className | string | 否 | - |

**使用示例**
```tsx
<DotMatrix rows={7} cols={7} dotSize="sm" theme="dark" pattern="grid" />
<DotMatrix rows={5} cols={5} pattern="custom" activeDots={[[0,0], [2,2], [4,4]]} />
```

**适用场景**：Nothing 风格装饰背景、点阵图案、字形渲染基础

---

#### Glyph

| 属性 | 值 |
|------|-----|
| **文件** | widgets/Glyph.tsx |
| **导出** | `export default Glyph` |
| **功能** | 点阵字形图标，支持 44 种字形 |
| **依赖** | DotMatrix（组件依赖）, glyph.css |

**Props 接口：GlyphProps** — `{ type: GlyphType; size?: 'sm'|'md'|'lg'; theme?: 'light'|'dark'|'accent'; className?: string }`

**GlyphType 联合类型**（44 种）：'arrow-up'|'arrow-down'|'arrow-left'|'arrow-right'|'check'|'cross'|'plus'|'minus'|'heart'|'star'|'play'|'pause'|'wifi'|'bluetooth'|'battery'|'battery-charging'|'phone'|'message'|'clock'|'camera'|'music'|'location'|'bell'|'settings'|'home'|'backspace'|'search'|'cloud'|'moon'|'sun'|'circle'|'square'|'triangle'|'triangle-up'|'triangle-down'|'chevron-up'|'chevron-down'|'chevron-left'|'chevron-right'|'volume-up'|'volume-down'|'volume-mute'|'lock'|'unlock'

**使用示例**
```tsx
<Glyph type="wifi" size="lg" theme="dark" />
<Glyph type="heart" theme="accent" />
```

**适用场景**：Nothing 风格图标、点阵风格 UI 图标、装饰性图标

---

#### ActivityWidget

| 属性 | 值 |
|------|-----|
| **文件** | widgets/ActivityWidget.tsx |
| **导出** | `export default ActivityWidget` |
| **功能** | 活动追踪，展示一周每日活动时长和标记点 |
| **依赖** | activity-widget.css |

**Props 接口：ActivityWidgetProps** — `{ days?: ActivityDay[]; className?: string }`

**辅助接口**：ActivityDay `{ label, value, markers: number[] }`

**使用示例**
```tsx
<ActivityWidget
  days={[
    { label: 'MON', value: '9H14', markers: [1, 1, 0] },
    { label: 'TUE', value: '8H52', markers: [0, 1, 1] },
  ]}
/>
```

**适用场景**：健康活动追踪、每周运动统计、久坐提醒

---

#### CompassWidget

| 属性 | 值 |
|------|-----|
| **文件** | widgets/CompassWidget.tsx |
| **导出** | `export default CompassWidget` |
| **功能** | 指南针，显示方向和角度，带点阵圆环 |
| **依赖** | useMemo, compass-widget.css |

**Props 接口：CompassWidgetProps** — `{ heading?: number; showDots?: boolean; className?: string }`

**使用示例**
```tsx
<CompassWidget heading={45} showDots />
```

**适用场景**：方向指示、导航辅助、位置感知

---

#### WeatherWidget

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WeatherWidget.tsx |
| **导出** | `export default WeatherWidget` |
| **功能** | 天气，支持 square/wide 变体，展示温度和预报 |
| **依赖** | DotMatrix（组件依赖）, dot-matrix.css, weather-widget.css |

**Props 接口：WeatherWidgetProps** — `{ temp?: string; hi?: string; lo?: string; city?: string; condition?: string; forecast?: WeatherForecast[]; variant?: 'square'|'wide'; className?: string }`

**辅助接口**：WeatherForecast `{ day, hi, lo, condition? }`

**使用示例**
```tsx
<WeatherWidget
  temp="28°" hi="32°" lo="22°" city="Shanghai" condition="Partly cloudy"
  variant="wide"
  forecast={[{ day: 'Mon', hi: '30°', lo: '22°' }]}
/>
```

**适用场景**：天气信息展示、桌面天气 Widget、旅行天气

---

#### StepsWidget

| 属性 | 值 |
|------|-----|
| **文件** | widgets/StepsWidget.tsx |
| **导出** | `export default StepsWidget` |
| **功能** | 步数统计，展示步数、连续天数和目标进度 |
| **依赖** | steps-widget.css |

**Props 接口：StepsWidgetProps** — `{ steps?: number; streak?: number; streakUnit?: string; className?: string }`

**使用示例**
```tsx
<StepsWidget steps={8432} streak={7} streakUnit="DAYS" />
```

**适用场景**：健康步数追踪、运动目标、每日步数统计

---

#### TimeWidget

| 属性 | 值 |
|------|-----|
| **文件** | widgets/TimeWidget.tsx |
| **导出** | `export default TimeWidget` |
| **功能** | 时间显示，支持 5 种变体（over-limit/over-limit-accent/total-time/recording/date） |
| **依赖** | useState, useEffect, time-widget.css |

**Props 接口：TimeWidgetProps** — `{ variant?: 'over-limit'|'over-limit-accent'|'total-time'|'recording'|'date'; label?: string; value?: string; unit?: string; subtitle?: string; className?: string }`

**使用示例**
```tsx
<TimeWidget variant="recording" value="02:34:15" label="Recording" />
<TimeWidget variant="date" value="15" subtitle="JAN" />
<TimeWidget variant="over-limit" value="12:45" unit="HRS" label="Screen Time" />
```

**适用场景**：屏幕使用时间、录音计时、日期展示、超限提醒

---

#### WidgetIcons（预设图标集合）

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WidgetIcons.tsx |
| **导出** | 40 个具名导出函数 + WidgetIconList 常量 |
| **功能** | 40 个预设 68×68 圆形图标（Home, DarkMode, Remote 等） |
| **Props** | 无（均为无参数函数组件） |
| **依赖** | svg-qvv4ctcv53.ts |

**使用示例**
```tsx
import { Home, DarkMode, Wifi } from './WidgetIcons'
<Home />
<DarkMode />
```

**适用场景**：Nothing Widgets 2.0 图标网格、快捷功能图标

---

#### WidgetPills（预设药丸集合）

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WidgetPills.tsx |
| **导出** | 17 个具名导出函数 + WidgetPillList 常量 |
| **功能** | 17 个预设药丸控件（Dim, Calculator, BatterySaver 等） |
| **Props** | 无 |
| **依赖** | svg-qvv4ctcv53.ts |

**使用示例**
```tsx
import { Dim, Nfc, Torch } from './WidgetPills'
<Dim />
<Nfc />
```

**适用场景**：Nothing Widgets 2.0 药丸网格、快捷开关

---

#### WidgetSubComponents（预设子组件集合）

| 属性 | 值 |
|------|-----|
| **文件** | widgets/WidgetSubComponents.tsx |
| **导出** | 68 个具名导出函数 |
| **功能** | 68 个预设子组件（Record2, Compass, MusicPlayer 等） |
| **Props** | 无 |
| **依赖** | svg-qvv4ctcv53.ts, 7 个 PNG 图片资源 |

**使用示例**
```tsx
import { Record2, Compass, MusicPlayer } from './WidgetSubComponents'
<Record2 />
<Compass />
```

**适用场景**：Nothing Widgets 2.0 大尺寸 Widget、复合组件

---

#### NothingWidgets20

| 属性 | 值 |
|------|-----|
| **文件** | widgets/NothingWidgets20.tsx |
| **导出** | `export default function NothingWidgets` |
| **功能** | Nothing Widgets 2.0 完整展示组件，组合所有预设子组件 |
| **Props** | 无 |
| **依赖** | WidgetIcons, WidgetPills, WidgetSubComponents |

**使用示例**
```tsx
<NothingWidgets />
```

**适用场景**：Nothing Widgets 2.0 完整设计稿展示、Widget 仪表盘全览
