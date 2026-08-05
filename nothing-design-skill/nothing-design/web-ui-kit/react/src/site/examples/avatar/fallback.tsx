import { Avatar } from 'nothing-ui/avatar'

/** 一张一定能加载成功的本地图片，省去示例对外部网络的依赖。 */
const portrait =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="#1f1f1f"/>
      <circle cx="20" cy="15" r="7" fill="#8f8f8f"/>
      <path d="M4 40c2-10 8-14 16-14s14 4 16 14z" fill="#8f8f8f"/>
    </svg>`,
  )

export default function AvatarFallback() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Avatar src={portrait} alt="Ada Lovelace" fallback="AL" />
      <Avatar src="/does-not-exist.png" alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Ada Lovelace" fallback="AL" />
      <Avatar alt="Unknown member" />
    </div>
  )
}
