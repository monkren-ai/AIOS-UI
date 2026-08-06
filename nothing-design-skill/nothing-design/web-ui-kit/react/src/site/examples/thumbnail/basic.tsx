import { Thumbnail } from 'aios-ui-kit/thumbnail'

/** 一张一定能加载成功的本地图片，省去示例对外部网络的依赖。 */
const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#1f1f1f"/>
      <circle cx="32" cy="26" r="12" fill="#8f8f8f"/>
      <path d="M8 64c3-16 12-22 24-22s21 6 24 22z" fill="#8f8f8f"/>
    </svg>`,
  )

export default function ThumbnailBasic() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Thumbnail src={photo} alt="A portrait" size="sm" />
      <Thumbnail src={photo} alt="A portrait" size="md" />
      <Thumbnail src={photo} alt="A portrait" size="lg" />
      <Thumbnail src={photo} alt="A landscape" ratio="16:9" size="md" />
    </div>
  )
}
