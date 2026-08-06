import * as React from 'react'
import Button from '@/Button'
import Input from '@/Input'
import InputCopy from '@/InputCopy'
import InputMessage from '@/InputMessage'
import AskUserQuestions, { type AskUserAnswerValue } from '@/AskUserQuestions'
import Switch from '@/Switch'
import Slider from '@/Slider'
import { Tag, Tags } from '@/Tag'
import SegmentedControl from '@/SegmentedControl'
import Tooltip from '@/Tooltip'
import Textarea from '@/Textarea'
import Label from '@/Label'
import { CheckboxGroup } from '@/CheckboxGroup'
import { Toggle, ToggleGroup } from '@/Toggle'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface CoreInteractionSectionProps {
  t: T
  sliderValue: number
  setSliderValue: (value: number) => void
}

export function CoreInteractionSection({
  t,
  sliderValue,
  setSliderValue,
}: CoreInteractionSectionProps) {
  const [copyValue] = React.useState('npm install aios-ui-kit')
  const [messageValue, setMessageValue] = React.useState('')
  const [answers, setAnswers] = React.useState<Record<string, AskUserAnswerValue>>({})

  return (
    <CategorySection id="core-interaction" title={t('核心交互', 'Core Interaction')}>
      <DemoCard title={t('按钮', 'Buttons')} variant="flex-wrap">
        <Button variant="primary">{t('主要', 'Primary')}</Button>
        <Button variant="secondary">{t('次要', 'Secondary')}</Button>
        <Button variant="tertiary">{t('三级', 'Tertiary')}</Button>
        <Button variant="ghost">{t('幽灵', 'Ghost')}</Button>
        <Button variant="destructive">{t('危险', 'Destructive')}</Button>
        <Button variant="primary" size="sm">
          {t('小号', 'Small')}
        </Button>
        <Button variant="primary" size="lg">
          {t('大号', 'Large')}
        </Button>
        <Button variant="primary" active>
          {t('激活', 'Active')}
        </Button>
        <Button variant="primary" loading>
          {t('加载', 'Loading')}
        </Button>
        <Button variant="primary" disabled>
          {t('已禁用', 'Disabled')}
        </Button>
        <Button variant="primary" size="icon" aria-label="Icon button">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            width="16"
            height="16"
          >
            <circle cx="8" cy="8" r="6" />
          </svg>
        </Button>
      </DemoCard>

      <DemoCard title={t('输入框', 'Inputs')}>
        <Input
          variant="underline"
          label={t('下划线输入', 'Underline Input')}
          placeholder={t('请输入内容…', 'Type something...')}
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="bordered"
          label={t('带边框输入', 'Bordered Input')}
          placeholder={t('请输入内容…', 'Type something...')}
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="bordered"
          label={t('可清除输入', 'Clearable Input')}
          placeholder={t('输入后显示清除按钮', 'Type to see clear button')}
          clearable
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="bordered"
          label={t('带图标输入', 'Input with Icons')}
          placeholder={t('搜索…', 'Search...')}
          leadingIcon={
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="16"
              height="16"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3 3" />
            </svg>
          }
          trailingIcon={
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="16"
              height="16"
            >
              <path d="M3 8h10" />
            </svg>
          }
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="underline"
          label={t('错误提示', 'With Error')}
          placeholder={t('输入无效', 'Invalid input')}
          error={t('该字段为必填项', 'This field is required')}
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="bordered"
          label={t('帮助信息', 'With Message')}
          placeholder={t('普通输入', 'Normal input')}
          message={t('此处展示辅助说明文案', 'Helper text is shown here')}
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Input
          variant="bordered"
          label={t('已禁用', 'Disabled')}
          placeholder={t('无法编辑', 'Cannot edit')}
          disabled
          style={{ maxWidth: '400px' }}
        />
      </DemoCard>

      <DemoCard title={t('开关', 'Switch')}>
        <Switch label={t('Wi-Fi', 'Wi-Fi')} style={{ marginBottom: 'var(--space-md)' }} />
        <Switch
          label={t('蓝牙', 'Bluetooth')}
          checked={true}
          style={{ marginBottom: 'var(--space-md)' }}
        />
        <Switch
          label={t('已禁用', 'Disabled')}
          disabled
          style={{ marginBottom: 'var(--space-md)' }}
        />
        <Switch
          label={t('小尺寸', 'Small')}
          size="sm"
          style={{ marginBottom: 'var(--space-md)' }}
        />
        <Switch label={t('大尺寸', 'Large')} size="lg" />
      </DemoCard>

      <DemoCard title={t('复选框组', 'Checkbox Group')}>
        <CheckboxGroup
          options={[
            { value: 'design', label: t('设计', 'Design') },
            { value: 'engineering', label: t('工程', 'Engineering') },
            { value: 'product', label: t('产品', 'Product') },
            { value: 'research', label: t('研究', 'Research') },
          ]}
          defaultValue={['design', 'engineering']}
        />
      </DemoCard>

      <DemoCard title={t('滑块', 'Slider')}>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          label={t('音量', 'Volume')}
          showValue
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Slider
          defaultValue={30}
          label={t('亮度', 'Brightness')}
          showValue
          style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }}
        />
        <Slider disabled label={t('已禁用', 'Disabled')} style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('标签', 'Tags')} variant="flex-wrap">
        <Tags>
          <Tag variant="pill">{t('设计', 'Design')}</Tag>
          <Tag variant="pill" active>
            {t('激活', 'Active')}
          </Tag>
          <Tag variant="pill" removable>
            {t('可移除', 'Removable')}
          </Tag>
          <Tag variant="pill" disabled>
            {t('已禁用', 'Disabled')}
          </Tag>
        </Tags>
        <Tags>
          <Tag variant="technical">v2.1.0</Tag>
          <Tag variant="technical" active>
            {t('稳定', 'stable')}
          </Tag>
          <Tag variant="technical" removable>
            {t('测试', 'beta')}
          </Tag>
        </Tags>
        <Tags proximity>
          <Tag variant="pill">{t('接近', 'Proximity')}</Tag>
          <Tag variant="pill">{t('悬停', 'Hover')}</Tag>
          <Tag variant="pill">{t('聚焦', 'Focus')}</Tag>
          <Tag variant="pill">{t('反馈', 'Feedback')}</Tag>
        </Tags>
      </DemoCard>

      <DemoCard title={t('分段控件', 'Segmented Control')}>
        <SegmentedControl
          segments={[t('日', 'Day'), t('周', 'Week'), t('月', 'Month')]}
          style={{ marginBottom: 'var(--space-md)' }}
        />
        <SegmentedControl
          segments={[t('列表', 'List'), t('网格', 'Grid'), t('画廊', 'Gallery')]}
          proximity
        />
      </DemoCard>

      <DemoCard title={t('切换', 'Toggle')} variant="flex-wrap">
        <Toggle defaultPressed>{t('按下', 'Pressed')}</Toggle>
        <Toggle>{t('未按下', 'Unpressed')}</Toggle>
        <Toggle variant="outline" defaultPressed>
          {t('描边', 'Outline')}
        </Toggle>
        <ToggleGroup defaultValue={['bold']}>
          <Toggle value="bold">B</Toggle>
          <Toggle value="italic">I</Toggle>
          <Toggle value="underline">U</Toggle>
        </ToggleGroup>
      </DemoCard>

      <DemoCard title={t('提示', 'Tooltip')}>
        <Tooltip content={t('这是一个提示', 'This is a tooltip')} side="top">
          <Button variant="secondary">{t('悬停我', 'Hover me')}</Button>
        </Tooltip>
      </DemoCard>

      <DemoCard title={t('文本域', 'Textarea')}>
        <Textarea
          label={t('描述', 'Description')}
          placeholder={t('请输入你的消息…', 'Type your message...')}
          autoResize
          minRows={3}
          message={t('支持自动高度与两种变体。', 'Supports auto-resize and two variants.')}
          style={{ maxWidth: '400px', marginBottom: 'var(--space-md)' }}
        />
        <Textarea
          variant="bordered"
          label={t('边框变体', 'Bordered Variant')}
          placeholder={t('边框样式…', 'Bordered style...')}
          minRows={3}
          style={{ maxWidth: '400px' }}
        />
      </DemoCard>

      <DemoCard title={t('可复制输入', 'Input Copy')}>
        <InputCopy
          value={copyValue}
          label={t('安装命令', 'Install Command')}
          style={{ maxWidth: '420px' }}
        />
      </DemoCard>

      <DemoCard title={t('消息输入', 'Message Input')}>
        <InputMessage
          value={messageValue}
          onChange={setMessageValue}
          onSend={() => {
            setMessageValue('')
          }}
          placeholder={t('输入消息…', 'Type a message...')}
          style={{ maxWidth: '520px' }}
        />
      </DemoCard>

      <DemoCard title={t('问答流', 'Question Flow')}>
        <AskUserQuestions
          title={t('快速配置', 'Quick Setup')}
          questions={[
            { id: 'project', title: t('项目名称', 'Project name'), type: 'text', required: true },
            {
              id: 'theme',
              title: t('默认主题', 'Default theme'),
              type: 'single',
              options: [t('暗色', 'Dark'), t('亮色', 'Light')],
              required: true,
            },
            {
              id: 'features',
              title: t('启用功能', 'Enable features'),
              type: 'multiple',
              options: ['Motion', 'Telemetry', 'AI Agent'],
            },
            {
              id: 'confirm',
              title: t('同意使用条款', 'Agree to terms'),
              type: 'confirm',
              required: true,
            },
          ]}
          value={answers}
          onChange={setAnswers}
          onSubmit={() => {}}
        />
      </DemoCard>

      <DemoCard title={t('标签', 'Label')} last>
        <Label style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
          {t('普通标签', 'Normal Label')}
        </Label>
        <Label required style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
          {t('必填标签', 'Required Label')}
        </Label>
        <Label disabled style={{ display: 'block' }}>
          {t('已禁用标签', 'Disabled Label')}
        </Label>
      </DemoCard>
    </CategorySection>
  )
}

export default CoreInteractionSection
