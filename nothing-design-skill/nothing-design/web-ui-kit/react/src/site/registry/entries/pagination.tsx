import { Pagination } from 'nothing-ui/pagination'
import type { ComponentDoc } from '../types'

import PaginationBasic from '../../examples/pagination/basic'
import PaginationSiblingCount from '../../examples/pagination/sibling-count'
import PaginationBoundaries from '../../examples/pagination/boundaries'
import PaginationPagedList from '../../examples/pagination/paged-list'

import basicSource from '../../examples/pagination/basic.tsx?raw'
import siblingCountSource from '../../examples/pagination/sibling-count.tsx?raw'
import boundariesSource from '../../examples/pagination/boundaries.tsx?raw'
import pagedListSource from '../../examples/pagination/paged-list.tsx?raw'

export const paginationDoc: ComponentDoc = {
  slug: 'pagination',
  name: 'Pagination',
  category: 'navigation',
  status: 'stable',
  description: {
    zh: '分页控件，用于翻阅长列表。',
    en: 'Page controls for stepping through a long list.',
  },
  preview: () => <Pagination page={3} totalPages={10} onPageChange={() => {}} />,
  importStatement: `import { Pagination } from 'nothing-ui/pagination'`,
  usageSnippet: `const [page, setPage] = useState(1)

<Pagination page={page} totalPages={12} onPageChange={setPage} />`,
  composition: {
    zh: '没有子组件：整棵 `<nav> → <ul> → <li> → <button>` 都由组件生成，你只负责喂进 `page` / `totalPages`，并在 `onPageChange` 里把 `page` 写回去。页码窗口（首尾各锚一个、当前页两侧留 `siblingCount` 个、中间补省略号）也是算出来的，不需要你自己拼。每个部件都带 `data-slot`（`pagination-button`、`pagination-ellipsis` …），需要改样式时用它们做选择器。',
    en: 'There are no sub-components: the whole `<nav> → <ul> → <li> → <button>` tree is generated. You supply `page` and `totalPages` and write the new page back in `onPageChange`. The window of page numbers — first and last pinned, `siblingCount` neighbours either side of the current page, ellipses filling the gaps — is computed for you. Every part carries a `data-slot` (`pagination-button`, `pagination-ellipsis`, …) to hook styles onto.',
  },
  examples: [
    {
      id: 'basic',
      title: { zh: '基本用法', en: 'Basic usage' },
      description: {
        zh: '这个组件只有受控一种模式：`page`、`totalPages`、`onPageChange` 三个都是必填，组件内部不存任何页码状态。看起来啰嗦，但分页几乎总是要和 URL query、数据请求同步的——把状态留在外面反而省事。',
        en: 'Controlled is the only mode: `page`, `totalPages`, and `onPageChange` are all required, and the component keeps no page state of its own. That sounds like extra work, but pagination almost always has to stay in step with a URL query and a data fetch, so owning the state outside is the shorter path anyway.',
      },
      code: basicSource,
      render: () => <PaginationBasic />,
    },
    {
      id: 'sibling-count',
      title: { zh: '页码窗口', en: 'The page window' },
      description: {
        zh: '`siblingCount` 是当前页两侧各保留几个页码。窗口总长是 `siblingCount * 2 + 5`（当前页、两侧兄弟、首尾两页、两个省略号位）——总页数不超过这个数时会全部平铺，一个省略号都不出现。默认 1 在手机上就够窄；桌面端的密集表格可以给到 2。',
        en: '`siblingCount` is how many page numbers stay visible on each side of the current one. The window is `siblingCount * 2 + 5` slots wide (current page, its siblings, the first and last page, and two ellipsis positions) — below that total the component lays every page out flat and no ellipsis appears at all. The default of 1 stays narrow enough for a phone; a dense desktop table can afford 2.',
      },
      code: siblingCountSource,
      render: () => <PaginationSiblingCount />,
    },
    {
      id: 'boundaries',
      title: { zh: '边界情况', en: 'Edges' },
      description: {
        zh: '到达首尾时对应的箭头会被原生 `disabled` 关掉，同时置上 `data-disabled`。`totalPages <= 1` 时组件直接返回 `null`——所以列表只有一页时不用自己判断要不要渲染。另外 `onPageChange` 不会被越界值或当前页触发，回调里不必再做防抖式的相等判断。',
        en: 'At either end the matching arrow gets the native `disabled` attribute plus `data-disabled`. When `totalPages <= 1` the component returns `null` outright, so you never have to guard the render yourself for single-page results. `onPageChange` also refuses out-of-range values and the page you are already on, which means the handler needs no equality check of its own.',
      },
      code: boundariesSource,
      render: () => <PaginationBoundaries />,
    },
    {
      id: 'paged-list',
      title: { zh: '接上真实列表', en: 'Wired to a list' },
      description: {
        zh: '`totalPages` 由数据条数算出来，而不是写死。切页时记得把列表滚回顶部并让焦点有个落点——分页最常见的可用性问题就是「点了下一页，视口还停在旧位置」。',
        en: 'Derive `totalPages` from the data rather than hard-coding it. When the page changes, scroll the list back to the top and give focus somewhere sensible: the classic pagination failure is pressing “next” and leaving the viewport parked where it was.',
      },
      code: pagedListSource,
      render: () => <PaginationPagedList />,
    },
  ],
  api: [
    {
      name: 'Pagination',
      description: {
        zh: '渲染为带 `aria-label="Pagination"` 的 `<nav>`，其余原生 nav 属性与 `ref` 都透传。',
        en: 'Renders a `<nav>` labelled `aria-label="Pagination"`; every other native nav prop and `ref` is forwarded.',
      },
      props: [
        {
          name: 'page',
          type: 'number',
          description: {
            zh: '当前页，从 1 开始。必填。',
            en: 'The current page, 1-based. Required.',
          },
        },
        {
          name: 'totalPages',
          type: 'number',
          description: {
            zh: '总页数。必填。小于等于 1 时组件渲染 `null`。',
            en: 'Total number of pages. Required. At 1 or less the component renders `null`.',
          },
        },
        {
          name: 'onPageChange',
          type: '(page: number) => void',
          description: {
            zh: '翻页回调。必填。越界与「点当前页」不会触发。',
            en: 'Fires on a page change. Required. Out-of-range values and re-clicking the current page do not fire it.',
          },
        },
        {
          name: 'siblingCount',
          type: 'number',
          default: '1',
          description: {
            zh: '当前页两侧各保留的页码数量。',
            en: 'How many page numbers to keep on each side of the current one.',
          },
        },
        {
          name: 'className',
          type: 'string',
          description: {
            zh: '追加到 `<nav>` 的类名。经 `tailwind-merge` 合并，改 `text-*` 就能整体缩放（按钮尺寸跟着字号走）。',
            en: 'Extra classes on the `<nav>`, merged via `tailwind-merge`. Changing `text-*` scales the whole control, since the buttons size off the type.',
          },
        },
      ],
    },
    {
      name: 'paginationVariants',
      description: {
        zh: '各部件的 CVA 函数：`paginationVariants`（nav）、`paginationListVariants`、`paginationItemVariants`、`paginationButtonVariants`、`paginationEllipsisVariants`、`paginationArrowVariants`。只有按钮那个接受参数。',
        en: 'The CVA functions per part: `paginationVariants` (the nav), `paginationListVariants`, `paginationItemVariants`, `paginationButtonVariants`, `paginationEllipsisVariants`, and `paginationArrowVariants`. Only the button one takes arguments.',
      },
      props: [
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '当前页样式：反相实心。',
            en: 'The current-page look: inverted solid.',
          },
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '禁用样式：50% 不透明度 + `cursor-not-allowed`。',
            en: 'The disabled look: 50% opacity and `cursor-not-allowed`.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '根元素是 `<nav aria-label="Pagination">` 包一个 `<ul>`。同一页面上若有多组分页，请各自传一个更具体的 `aria-label` 覆盖掉默认值，否则读屏的地标列表里会出现两个同名条目。',
      en: 'The root is a `<nav aria-label="Pagination">` wrapping a `<ul>`. If a page carries more than one pager, override that default with something more specific on each, or the screen reader’s landmark list ends up with two identically named entries.',
    },
    {
      zh: '当前页按钮带 `aria-current="page"`——这是读屏用户唯一能听出「我在第几页」的信号，颜色反相只对看得见的人有用。',
      en: 'The current page button carries `aria-current="page"`. That is the only cue a screen-reader user gets about where they are; the inverted fill only helps people who can see it.',
    },
    {
      zh: '每个页码按钮都有 `aria-label="Page N"`，两个箭头是 `Previous page` / `Next page`。箭头字形 `‹` `›` 是 `aria-hidden` 的纯装饰，不会被念成标点。',
      en: 'Each number button is labelled `aria-label="Page N"`, and the arrows are `Previous page` and `Next page`. The `‹` and `›` glyphs are decorative and `aria-hidden`, so they are never read out as punctuation.',
    },
    {
      zh: '左右方向键在 `<nav>` 上监听，可以直接翻页。它依赖事件冒泡，所以只有焦点已经落在分页里的某个按钮上时才生效——`<nav>` 自己不可聚焦。RTL 下键位含义会翻转：靠近书写起点的那个键是「上一页」。',
      en: 'The left and right arrows are handled on the `<nav>` and step a page at a time. They rely on bubbling, so they only work once focus is already on one of the pager’s buttons — the `<nav>` itself is not focusable. Under RTL the mapping flips: the key pointing towards the start of the line means “previous”.',
    },
    {
      zh: '省略号是 `<span>` 而不是按钮：它不可聚焦、不在 tab 序列里，读屏会念成「…」。它只是视觉占位，点它不会发生任何事。',
      en: 'The ellipsis is a `<span>`, not a button: not focusable, not in the tab order, announced as “…”. It is a visual placeholder and clicking it does nothing.',
    },
    {
      zh: '按钮高 32px，低于 44px 的推荐触达尺寸。移动端建议靠 `className` 调大字号（尺寸随 `text-*` 走），或者在窄屏上换成「加载更多」。',
      en: 'The buttons are 32px tall, under the 44px touch-target guideline. On mobile, scale them up through `className` (size follows `text-*`) or switch to a “load more” control on narrow screens.',
    },
    {
      zh: '整个控件是 `<button>`，不是链接——所以页码没法在新标签打开，也复制不出地址。如果你的分页对应真实 URL，考虑另外提供可复制的链接，或在此基础上自己包一层。',
      en: 'Everything here is a `<button>`, not a link, so pages cannot be opened in a new tab or copied as a URL. If your pages have real addresses, expose those separately or wrap this component in something that does.',
    },
  ],
}
