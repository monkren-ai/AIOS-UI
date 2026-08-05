import { AspectRatio } from 'nothing-ui/aspect-ratio'

/** 本地 SVG data URI，示例不依赖外部网络图片。 */
const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
      <rect width="320" height="180" fill="#1f1f1f"/>
      <circle cx="160" cy="90" r="46" fill="#8f8f8f"/>
    </svg>`,
  )

export default function AspectRatioMedia() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm overflow-hidden rounded-md">
      <img src={photo} alt="Placeholder" className="h-full w-full object-cover" />
    </AspectRatio>
  )
}
