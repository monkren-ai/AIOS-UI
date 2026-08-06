import * as React$1 from "react";
//#region src/DataTable/DataTable.d.ts
/**
 * DataTable — 统一表格展示入口 (合并自 Table / DataGrid / DataRows)
 *
 * variant:
 *   - 'table'  原 Table (HTML <table>) — 静态列/行展示, striped/compact/hoverable
 *   - 'grid'   原 DataGrid (CSS grid)  — 可排序, 行 active/interactive, 单元格 status
 *   - 'rows'   原 DataRows (label/value) — 状态行, sub-row, trend/unit
 *
 * 三种 variant 共享:
 *   - 行点击回调 (onRowClick / onSelectRow)
 *   - 行交互态 (interactive / disabled)
 *   - data-state 属性 (用于 e2e/CSS 选择器)
 */
type DataCellStatus = 'good' | 'warning' | 'error' | 'info';
interface DataTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'numeric';
  sortable?: boolean;
}
interface DataTableCellStatus {
  columnKey: string;
  status?: DataCellStatus;
}
interface DataTableGridRow {
  cells: Record<string, React$1.ReactNode>;
  active?: boolean;
  interactive?: boolean;
  cellStatuses?: DataTableCellStatus[];
  id?: string;
}
interface DataTableRowsItem {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  status?: DataCellStatus;
  isSub?: boolean;
  interactive?: boolean;
  disabled?: boolean;
}
type SortDirection = 'asc' | 'desc' | null;
declare const dataTableVariants: (props?: ({
  variant?: "table" | "grid" | "rows" | null | undefined;
  striped?: boolean | null | undefined;
  compact?: boolean | null | undefined;
  hoverable?: boolean | null | undefined;
  proximity?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DataTableVariant = 'table' | 'grid' | 'rows';
interface DataTableProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: DataTableVariant;
  /** variant='table' */
  columns?: DataTableColumn[];
  rows?: DataTableGridRow[];
  caption?: string;
  /** variant='grid' */
  emptyMessage?: string;
  /** variant='rows' */
  items?: DataTableRowsItem[];
  onRowClick?: (index: number) => void;
  onSortChange?: (key: string | null, direction: SortDirection) => void;
  striped?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  /** 启用 proximity hover 效果 */
  proximity?: boolean;
}
declare const DataTable: React$1.ForwardRefExoticComponent<DataTableProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { DataCellStatus, DataTable, DataTableCellStatus, DataTableColumn, DataTableGridRow, DataTableProps, DataTableRowsItem, DataTableVariant, dataTableVariants };
//# sourceMappingURL=DataTable.d.mts.map