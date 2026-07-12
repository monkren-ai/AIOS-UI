import Button from '@/Button'
import Input from '@/Input'
import Switch from '@/Switch'
import Slider from '@/Slider'
import { Tag, Tags } from '@/Tag'
import SegmentedControl from '@/SegmentedControl'
import Tooltip from '@/Tooltip'
import Textarea from '@/Textarea'
import Label from '@/Label'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface CoreInteractionSectionProps {
  t: T
  sliderValue: number
  setSliderValue: (value: number) => void
}

export function CoreInteractionSection({ t, sliderValue, setSliderValue }: CoreInteractionSectionProps) {
  return (
    <CategorySection id="core-interaction" title={t('核心交互', 'Core Interaction')}>
      <DemoCard title={t('按钮', 'Buttons')} variant="flex-wrap">
        <Button variant="primary">{t('主要', 'Primary')}</Button>
        <Button variant="secondary">{t('次要', 'Secondary')}</Button>
        <Button variant="ghost">{t('幽灵', 'Ghost')}</Button>
        <Button variant="destructive">{t('危险', 'Destructive')}</Button>
        <Button variant="primary" size="sm">{t('小号', 'Small')}</Button>
        <Button variant="primary" size="lg">{t('大号', 'Large')}</Button>
        <Button variant="primary" disabled>{t('已禁用', 'Disabled')}</Button>
      </DemoCard>

      <DemoCard title={t('输入框', 'Inputs')}>
        <Input variant="underline" label={t('下划线输入', 'Underline Input')} placeholder={t('请输入内容…', 'Type something...')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
        <Input variant="bordered" label={t('带边框输入', 'Bordered Input')} placeholder={t('请输入内容…', 'Type something...')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
        <Input variant="underline" label={t('错误提示', 'With Error')} placeholder={t('输入无效', 'Invalid input')} error={t('该字段为必填项', 'This field is required')} style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
        <Input variant="bordered" label={t('已禁用', 'Disabled')} placeholder={t('无法编辑', 'Cannot edit')} disabled style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('开关', 'Switch')}>
        <Switch label={t('Wi-Fi', 'Wi-Fi')} style={{ marginBottom: 'var(--space-md)' }} />
        <Switch label={t('蓝牙', 'Bluetooth')} on={true} style={{ marginBottom: 'var(--space-md)' }} />
        <Switch label={t('已禁用', 'Disabled')} disabled />
      </DemoCard>

      <DemoCard title={t('滑块', 'Slider')}>
        <Slider value={sliderValue} onValueChange={setSliderValue} label={t('音量', 'Volume')} showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
        <Slider defaultValue={30} label={t('亮度', 'Brightness')} showValue style={{ maxWidth: '400px', marginBottom: 'var(--space-lg)' }} />
        <Slider disabled label={t('已禁用', 'Disabled')} style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('标签', 'Tags')} variant="flex-wrap">
        <Tags>
          <Tag variant="pill">{t('设计', 'Design')}</Tag>
          <Tag variant="pill" active>{t('激活', 'Active')}</Tag>
          <Tag variant="pill" removable>{t('可移除', 'Removable')}</Tag>
          <Tag variant="pill" disabled>{t('已禁用', 'Disabled')}</Tag>
        </Tags>
        <Tags>
          <Tag variant="technical">v2.1.0</Tag>
          <Tag variant="technical" active>{t('稳定', 'stable')}</Tag>
          <Tag variant="technical" removable>{t('测试', 'beta')}</Tag>
        </Tags>
      </DemoCard>

      <DemoCard title={t('分段控件', 'Segmented Control')}>
        <SegmentedControl segments={[t('日', 'Day'), t('周', 'Week'), t('月', 'Month')]} />
      </DemoCard>

      <DemoCard title={t('提示', 'Tooltip')}>
        <Tooltip content={t('这是一个提示', 'This is a tooltip')} side="top">
          <Button variant="secondary">{t('悬停我', 'Hover me')}</Button>
        </Tooltip>
      </DemoCard>

      <DemoCard title={t('文本域', 'Textarea')}>
        <Textarea label={t('描述', 'Description')} placeholder={t('请输入你的消息…', 'Type your message...')} autoResize minRows={3} style={{ maxWidth: '400px' }} />
      </DemoCard>

      <DemoCard title={t('标签', 'Label')} last>
        <Label style={{ display: 'block', marginBottom: 'var(--space-md)' }}>{t('普通标签', 'Normal Label')}</Label>
        <Label required style={{ display: 'block', marginBottom: 'var(--space-md)' }}>{t('必填标签', 'Required Label')}</Label>
        <Label disabled style={{ display: 'block' }}>{t('已禁用标签', 'Disabled Label')}</Label>
      </DemoCard>
    </CategorySection>
  )
}

export default CoreInteractionSection
