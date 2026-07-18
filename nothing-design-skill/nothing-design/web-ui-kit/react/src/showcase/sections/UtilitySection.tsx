import ScrollArea from '@/ScrollArea'
import Resizable from '@/Resizable'
import AspectRatio from '@/AspectRatio'
import Form from '@/Form'
import Input from '@/Input'
import InputOTP from '@/InputOTP'
import Button from '@/Button'
import { CategorySection } from '../components/CategorySection'
import { DemoCard } from '../components/DemoCard'
import type { T } from '../hooks/useShowcaseState'

interface UtilitySectionProps {
  t: T
  otpValue: string
  setOtpValue: (value: string) => void
}

export function UtilitySection({ t, otpValue, setOtpValue }: UtilitySectionProps) {
  return (
    <CategorySection id="utility" title={t('工具', 'Utility')}>
      <DemoCard title={t('滚动区域', 'Scroll Area')}>
        <ScrollArea height="200px">
          <div style={{ padding: 'var(--space-sm)' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="showcase-scroll-item">
                {t('条目', 'Item')} {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoCard>

      <DemoCard title={t('可调整大小', 'Resizable')}>
        <Resizable
          direction="horizontal"
          initialSizes={[50, 50]}
          minSizes={[20, 20]}
        >
          <div className="showcase-resizable-panel">
            {t('面板 A', 'Panel A')}
          </div>
          <div className="showcase-resizable-panel">
            {t('面板 B', 'Panel B')}
          </div>
        </Resizable>
      </DemoCard>

      <DemoCard title={t('宽高比', 'Aspect Ratio')}>
        <AspectRatio ratio={16 / 9} style={{ maxWidth: '500px' }}>
          <div className="showcase-aspect-inner">
            16:9
          </div>
        </AspectRatio>
      </DemoCard>

      <DemoCard title={t('表单', 'Form')}>
        <Form onSubmit={() => {}} style={{ maxWidth: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Input variant="underline" label={t('姓名', 'Name')} placeholder={t('你的姓名', 'Your name')} />
            <Input variant="underline" label={t('邮箱', 'Email')} placeholder={t('you@example.com', 'you@example.com')} />
            <button type="submit" className="showcase-form-submit">{t('提交', 'Submit')}</button>
          </div>
        </Form>
      </DemoCard>

      <DemoCard title={t('一次性密码输入', 'Input OTP')} last>
        <InputOTP length={6} value={otpValue} onValueChange={setOtpValue} />
      </DemoCard>
    </CategorySection>
  )
}

export default UtilitySection
