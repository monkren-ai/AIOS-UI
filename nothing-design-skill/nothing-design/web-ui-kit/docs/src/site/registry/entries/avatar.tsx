import { Avatar } from 'aios-ui-kit/avatar'
import type { ComponentDoc } from '../types'

import AvatarSizes from '../../examples/avatar/sizes'
import AvatarVariants from '../../examples/avatar/variants'
import AvatarFallback from '../../examples/avatar/fallback'
import AvatarAsChild from '../../examples/avatar/as-child'

import sizesSource from '../../examples/avatar/sizes.tsx?raw'
import variantsSource from '../../examples/avatar/variants.tsx?raw'
import fallbackSource from '../../examples/avatar/fallback.tsx?raw'
import asChildSource from '../../examples/avatar/as-child.tsx?raw'

export const avatarDoc: ComponentDoc = {
  slug: 'avatar',
  name: 'Avatar',
  category: 'data-display',
  status: 'stable',
  description: {
    zh: '头像，图片加载失败时回退到首字母。',
    en: 'A user avatar that falls back to initials when the image fails.',
  },
  preview: () => <Avatar alt="Ada Lovelace" fallback="AL" />,
  importStatement: `import { Avatar } from 'aios-ui-kit/avatar'`,
  usageSnippet: `<Avatar src={user.avatarUrl} alt={user.name} fallback="AL" />`,
  examples: [
    {
      id: 'sizes',
      title: { zh: '尺寸', en: 'Sizes' },
      description: {
        zh: '三档直径是 32 / 40 / 56px，兜底文字的字号跟着一起走。`md` 是列表行里最常用的一档；`lg` 留给个人主页那种单独出现的场合。',
        en: 'The three diameters are 32 / 40 / 56px, and the fallback type scales with them. `md` is what list rows want; `lg` is for the places where a single avatar carries a page, like a profile header.',
      },
      code: sizesSource,
      render: () => <AvatarSizes />,
    },
    {
      id: 'variants',
      title: { zh: '变体与形状', en: 'Variant and shape' },
      description: {
        zh: '头像不承载语义色，`variant` 只决定图片缺席时那块底的处理：`soft` 有灰底，`outline` 换成一条边，`ghost` 什么都不留。`shape="technical"` 把圆形换成小圆角方形——放在方角卡片里比正圆更协调。',
        en: 'An avatar carries no semantic colour; `variant` only decides how the plate behind a missing image is drawn — `soft` fills it, `outline` trades the fill for a hairline, `ghost` leaves nothing. `shape="technical"` swaps the circle for a slightly rounded square, which sits better inside square-cornered cards.',
      },
      code: variantsSource,
      render: () => <AvatarVariants />,
    },
    {
      id: 'fallback',
      title: { zh: '回退', en: 'Fallback' },
      description: {
        zh: '组件监听 `<img>` 的 `onError`，一次失败就永久切到兜底文字，不会反复重试。注意兜底只在渲染期间生效：`src` 变了也不会重置错误状态，所以列表复用节点时给 `Avatar` 加一个以 URL 为准的 `key`。没传 `fallback` 时是一块空的底——这在「用户还没设头像」的场景里是有意的，不是 bug。',
        en: 'The component listens for the `<img>` `onError` and switches to the initials permanently after a single failure, rather than retrying. Note the error state is not reset when `src` changes, so key the `Avatar` on the URL if a list recycles nodes. With no `fallback` you get an empty plate — deliberate for “user has not set a picture yet”, not a bug.',
      },
      code: fallbackSource,
      render: () => <AvatarFallback />,
    },
    {
      id: 'as-child',
      title: { zh: '合并到子元素', en: 'Merging onto a child' },
      description: {
        zh: '`asChild` 把样式合并到唯一子元素上，而不是再套一层 `div`——头像要可点击时用它，就能得到真正的 `<button>` 语义。代价是 `src` / `fallback` 都不再生效：children 完全由你提供，图片和兜底也得自己写。',
        en: '`asChild` merges the styling onto the single child instead of nesting another `div`, which is how you get real `<button>` semantics when the avatar is clickable. The trade-off: `src` and `fallback` stop working — the children are entirely yours, image and fallback included.',
      },
      code: asChildSource,
      render: () => <AvatarAsChild />,
    },
  ],
  api: [
    {
      name: 'Avatar',
      description: {
        zh: '默认渲染为 `<div>`，透传所有原生 div 属性。',
        en: 'Renders a `<div>` by default and forwards every native div prop.',
      },
      props: [
        {
          name: 'src',
          type: 'string',
          description: {
            zh: '图片地址。加载失败后自动切到 `fallback`。',
            en: 'Image URL. On a load error it switches to `fallback`.',
          },
        },
        {
          name: 'alt',
          type: 'string',
          default: `''`,
          description: {
            zh: '图片替代文本。没传 `fallback` 时它也会被当作兜底元素的 `aria-label`。',
            en: 'Alt text for the image. It also becomes the fallback element’s `aria-label` when no `fallback` is given.',
          },
        },
        {
          name: 'fallback',
          type: 'string',
          description: {
            zh: '图片缺席时展示的缩写。会被 CSS 转成大写，一般用两个字母。',
            en: 'The initials shown when there is no image. Uppercased by CSS; two letters is the norm.',
          },
        },
        {
          name: 'variant',
          type: `'soft' | 'outline' | 'ghost'`,
          default: `'soft'`,
          description: { zh: '底板的处理方式。', en: 'How the plate behind the content is drawn.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '直径。v1 的 `default` 仍被接受，映射到 `md`。',
            en: 'Diameter. The v1 name `default` still works and maps to `md`.',
          },
        },
        {
          name: 'shape',
          type: `'circle' | 'technical'`,
          default: `'circle'`,
          description: { zh: '正圆或小圆角方形。', en: 'A circle, or a slightly rounded square.' },
        },
        {
          name: 'asChild',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '把样式合并到唯一子元素上，不再渲染额外的 `div`。开启后 `src` 与 `fallback` 都不生效。',
            en: 'Merge the styling onto the single child instead of rendering an extra `div`. `src` and `fallback` are ignored when it is on.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加类名。经 `tailwind-merge` 合并，可覆盖变体自带的工具类。',
            en: 'Extra classes, merged via `tailwind-merge` so they override the variant’s own utilities.',
          },
        },
      ],
    },
    {
      name: 'avatarVariants',
      description: {
        zh: '生成头像类名的 CVA 函数。适合直接贴到自己的元素上，例如一个已经有语义的 `<a>`。',
        en: 'The CVA function behind the class names. Apply it directly to your own element — an `<a>` that already has semantics, say.',
      },
      props: [
        {
          name: 'variant',
          type: 'AvatarVariant',
          default: `'soft'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: {
            zh: '同上。注意这里不接受 v1 别名，需要先过 `resolveAvatarSize`。',
            en: 'Same as above. It does not accept the v1 alias, so run it through `resolveAvatarSize` first.',
          },
        },
        {
          name: 'shape',
          type: 'AvatarShape',
          default: `'circle'`,
          description: { zh: '同上。', en: 'Same as above.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '有图片时渲染真正的 `<img>`，`alt` 直接落到它上面。头像若只是名字旁边的装饰，`alt=""`（默认值）比重复一遍名字更好——重复会让读屏念两次。',
      en: 'With an image it renders a real `<img>` and puts `alt` on it. When the avatar merely decorates a name that is already in the DOM, the default `alt=""` beats repeating the name, which would make a screen reader say it twice.',
    },
    {
      zh: '兜底元素是个 `<span>`，带 `aria-label={alt || fallback}`。也就是说即使只传了 `fallback="AL"`，读屏也会念出 “AL”；想让它念全名，就把全名放在 `alt` 里。',
      en: 'The fallback is a `<span>` carrying `aria-label={alt || fallback}`. So even with only `fallback="AL"` a screen reader says “AL”; pass the full name as `alt` if you want it read out properly.',
    },
    {
      zh: '`data-state` 会报出当前是 `image` 还是 `fallback`，测试里可以据此断言回退是否发生，不必去猜 DOM 结构。',
      en: '`data-state` reports whether the current render is `image` or `fallback`, which gives tests something stable to assert on instead of guessing at the DOM.',
    },
    {
      zh: '根元素默认没有 role，也不可聚焦——头像本身不是控件。需要点击时用 `asChild` 包一个真正的 `<button>` 或 `<a>`，并给它写 `aria-label`，不要在 `div` 上硬加 `onClick`。',
      en: 'The root has no role and is not focusable, because an avatar is not a control. When it needs to be clickable, wrap a real `<button>` or `<a>` with `asChild` and give it an `aria-label` — do not bolt an `onClick` onto the `div`.',
    },
    {
      zh: '基类里已经有 `focus-visible` 的双层轮廓（`outline-2` + `offset-2`），所以 `asChild` 换成按钮后焦点环是现成的，不用另配。',
      en: 'The base classes already include the `focus-visible` outline (`outline-2` plus `offset-2`), so an `asChild` button gets a correct focus ring for free.',
    },
    {
      zh: '头像堆叠（互相重叠的一排）请在容器上加 `role="group"` 与说明性的 `aria-label`，否则读屏只会听到一串孤立的缩写。',
      en: 'For stacked, overlapping avatar rows, put `role="group"` and a descriptive `aria-label` on the container, or a screen reader just reads a string of disconnected initials.',
    },
  ],
}
