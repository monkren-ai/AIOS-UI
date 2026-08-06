import { paginationArrowVariants, paginationButtonVariants, paginationEllipsisVariants, paginationItemVariants, paginationListVariants, paginationVariants } from "./pagination-variants.mjs";
import * as React$1 from "react";

//#region src/Pagination/Pagination.d.ts
type PaginationProps = React$1.ComponentPropsWithRef<'nav'> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};
declare function Pagination({
  className,
  page,
  totalPages,
  onPageChange,
  siblingCount,
  ...props
}: PaginationProps): React$1.JSX.Element | null;
declare namespace Pagination {
  var displayName: string;
}
//#endregion
export { Pagination, PaginationProps };
//# sourceMappingURL=Pagination.d.mts.map