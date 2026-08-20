import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  AicssAgentInput,
  AicssApprovalCard,
  AicssCodeBlock,
  AicssComparisonTable,
  AicssDataTable,
  AicssFileDiff,
  AicssImageGeneration,
  AicssInlineCitations,
  AicssOrbs,
  AicssStreamingText,
  AicssTaskList,
  AicssTextResponse,
  AicssThinkingReasoning,
  AicssThinkingState,
  AicssWebSearch,
} from './AICSS'

describe('AICSS 组件集成', () => {
  it('渲染思考、推理与 Orbs 状态', () => {
    render(
      <>
        <AicssThinkingState />
        <AicssThinkingReasoning summary="步骤">
          <p>检查上下文</p>
        </AicssThinkingReasoning>
        <AicssOrbs />
      </>,
    )
    expect(screen.getByText('思考中')).toHaveAttribute('data-slot', 'aicss-thinking-state')
    fireEvent.click(screen.getByRole('button', { name: /思考与推理/ }))
    expect(screen.queryByText('检查上下文')).not.toBeInTheDocument()
    expect(screen.getByText('处理中')).toBeInTheDocument()
  })

  it('渲染三种工具输出', () => {
    render(
      <>
        <AicssWebSearch query="AIOS" results={[{ title: 'AIOS', url: 'https://example.com' }]} />
        <AicssFileDiff
          filename="app.ts"
          lines={[{ type: 'add', newLine: 1, content: 'const ok = true' }]}
        />
        <AicssImageGeneration prompt="工业界面" progress={42} />
      </>,
    )
    expect(screen.getByRole('link', { name: /AIOS/ })).toBeInTheDocument()
    expect(screen.getByText('app.ts')).toBeInTheDocument()
    expect(screen.getByText('正在生成图像')).toBeInTheDocument()
  })

  it('渲染文本、流式响应与引用', () => {
    render(
      <>
        <AicssTextResponse>
          <p>完成</p>
        </AicssTextResponse>
        <AicssStreamingText text="正在输出" />
        <AicssInlineCitations citations={[{ id: '1', title: '来源', url: 'https://example.com' }]}>
          有引用的内容
        </AicssInlineCitations>
      </>,
    )
    expect(screen.getByText('完成').parentElement).toHaveAttribute(
      'data-slot',
      'aicss-text-response',
    )
    expect(screen.getByText(/正在输出/)).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByRole('link', { name: /来源/ })).toBeInTheDocument()
  })

  it('复制代码并切换任务', async () => {
    const onCopy = vi.fn()
    const onChange = vi.fn()
    render(
      <>
        <AicssCodeBlock code="const value = 1" onCopy={onCopy} />
        <AicssTaskList tasks={[{ id: '1', label: '接入组件' }]} onChange={onChange} />
      </>,
    )
    fireEvent.click(screen.getByRole('button', { name: '复制' }))
    expect(onCopy).toHaveBeenCalledWith('const value = 1')
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith([
      { id: '1', label: '接入组件', completed: true, status: 'done' },
    ])
  })

  it('渲染数据表与比较表', () => {
    render(
      <>
        <AicssDataTable columns={[{ key: 'model', header: 'Model' }]} rows={[{ model: 'gpt' }]} />
        <AicssComparisonTable
          plans={['个人版']}
          features={[{ feature: '全部组件', values: { 个人版: true } }]}
        />
      </>,
    )
    expect(screen.getByRole('cell', { name: 'gpt' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: '支持' })).toBeInTheDocument()
  })

  it('提交 Agent 输入并清空非受控值', () => {
    const onSubmit = vi.fn()
    render(<AicssAgentInput onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('询问 AI Agent')
    fireEvent.change(input, { target: { value: '运行检查' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith('运行检查')
    expect(input).toHaveValue('')
  })

  it('在推理完成时显示耗时摘要', () => {
    render(
      <AicssThinkingReasoning status="done" durationSec={5} summary="完成">
        <p>检查上下文</p>
      </AicssThinkingReasoning>,
    )
    expect(screen.getByRole('button', { name: /已思考 5s/ })).toBeInTheDocument()
  })

  it('渲染审批卡片的三种形态', () => {
    const onApprove = vi.fn()
    const { rerender } = render(
      <AicssApprovalCard
        questions={[
          {
            id: 'q1',
            prompt: '使用哪种鉴权？',
            options: ['Session', 'JWT'],
          },
        ]}
        onApprove={onApprove}
      />,
    )
    expect(screen.getByText('问题').closest('[data-slot="aicss-approval-card"]')).toBeTruthy()
    fireEvent.click(screen.getByRole('radio', { name: 'Session' }))
    fireEvent.click(screen.getByRole('button', { name: '继续' }))
    expect(onApprove).toHaveBeenCalledWith({ answers: { q1: 'Session' } })

    rerender(
      <AicssApprovalCard
        variant="command"
        cwd="~/aios"
        command="pnpm test"
        onApprove={onApprove}
      />,
    )
    expect(screen.getByText('pnpm test')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '运行' }))
    expect(onApprove).toHaveBeenCalledTimes(2)

    rerender(
      <AicssApprovalCard
        variant="plan"
        planTitle="迁移会话鉴权"
        plan={[
          { id: 'p1', title: '加迁移' },
          { id: 'p2', title: '接中间件' },
          { id: 'p3', title: '补测试' },
          { id: 'p4', title: '发布说明' },
        ]}
        planPreviewCount={2}
      />,
    )
    expect(screen.getByText('加迁移')).toBeInTheDocument()
    expect(screen.queryByText('补测试')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '还有 2 步' }))
    expect(screen.getByText('补测试')).toBeInTheDocument()
  })

  it('增强 Agent 输入提示词', () => {
    const onEnhance = vi.fn()
    render(<AicssAgentInput defaultValue="检查构建" onEnhance={onEnhance} />)
    fireEvent.click(screen.getByRole('button', { name: '增强提示词' }))
    expect(onEnhance).toHaveBeenCalled()
  })
})
