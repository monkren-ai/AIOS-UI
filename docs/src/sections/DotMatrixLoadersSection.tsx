import '@/styles/dotmatrix-loaders.css'
import {
  DotmSquare1,
  DotmSquare3,
  DotmSquare7,
  DotmSquare11,
  DotmSquare13,
  DotmSquare18,
  DotmCircular1,
  DotmCircular5,
  DotmCircular8,
  DotmTriangle1,
  DotmTriangle4,
  DotMatrixIcon,
} from '@/components/dotmatrix-loaders'

import type { ComponentType } from 'react'

interface LoaderEntry {
  Comp: ComponentType<{ size?: number; color?: string }>
  title: string
  desc: string
  shape: 'square' | 'circular' | 'triangle' | 'icon'
}

const loaders: LoaderEntry[] = [
  { Comp: DotmSquare1, title: 'Neon Drift', desc: '涟漪从右上扫向左下', shape: 'square' },
  { Comp: DotmSquare3, title: 'Core Spiral', desc: '4 点尾迹顺时针螺旋向心', shape: 'square' },
  { Comp: DotmSquare7, title: 'Block Drop', desc: '俄罗斯方块式堆叠与消行', shape: 'square' },
  { Comp: DotmSquare11, title: 'Echo Ring', desc: '同心菱形涟漪带二次回声', shape: 'square' },
  { Comp: DotmSquare13, title: 'Core Rotor', desc: '中心风扇叶片旋转', shape: 'square' },
  { Comp: DotmSquare18, title: 'Sound Bars', desc: '均衡器竖条随节拍跳动', shape: 'square' },
  { Comp: DotmCircular1, title: 'Halo Drift', desc: '圆形掩膜下的对角半螺旋', shape: 'circular' },
  { Comp: DotmCircular5, title: 'Nova Wheel', desc: '四叶风车旋转带辉光中心', shape: 'circular' },
  { Comp: DotmCircular8, title: 'Heart Pulse', desc: '中心双拍脉冲向外扩散', shape: 'circular' },
  { Comp: DotmTriangle1, title: 'Core Spokes', desc: '三角掩膜下中心辐条外扩', shape: 'triangle' },
  { Comp: DotmTriangle4, title: 'Vertex Chase', desc: '三头沿周长追逐带拖尾', shape: 'triangle' },
  { Comp: DotMatrixIcon, title: 'Matrix Icon', desc: '图标级涟漪动效', shape: 'icon' },
]

const shapeLabel: Record<LoaderEntry['shape'], string> = {
  square: 'SQUARE',
  circular: 'CIRCULAR',
  triangle: 'TRIANGLE',
  icon: 'ICON',
}

function DotMatrixLoadersSection() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'var(--space-md)',
      }}
    >
      {loaders.map(({ Comp, title, desc, shape }, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            padding: 'var(--space-lg) var(--space-md)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--surface)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--caption)',
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              alignSelf: 'flex-start',
            }}
          >
            {shapeLabel[shape]}
          </div>
          <div
            style={{
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '90px',
            }}
          >
            <Comp size={80} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--label)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              textAlign: 'center',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 'var(--caption)',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {desc}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DotMatrixLoadersSection
