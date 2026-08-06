import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "@/styles/table.css";
import "@/styles/data-grid.css";
import "@/styles/data-rows.css";
//#region src/DataTable/DataTable.tsx
const dataTableVariants = cva("aios-data-table", {
	variants: {
		variant: {
			table: "aios-table",
			grid: "aios-data-grid",
			rows: "aios-data-rows"
		},
		striped: {
			true: "aios-table--striped",
			false: ""
		},
		compact: {
			true: "aios-table--compact",
			false: ""
		},
		hoverable: {
			true: "aios-table--hoverable",
			false: ""
		},
		proximity: {
			true: "aios-data-table--proximity",
			false: ""
		}
	},
	defaultVariants: {
		variant: "table",
		striped: false,
		compact: false,
		hoverable: false,
		proximity: false
	}
});
function getSortValue(cell, type) {
	if (cell == null) return "";
	if (typeof cell === "number") return cell;
	const text = typeof cell === "string" ? cell : String(cell);
	if (type === "numeric") {
		const parsed = parseFloat(text);
		return Number.isNaN(parsed) ? text : parsed;
	}
	return text.toLowerCase();
}
function useSortedRows(rows, columns, sortKey, sortDirection) {
	return React$1.useMemo(() => {
		if (!sortKey || !sortDirection) return rows;
		const column = columns.find((c) => c.key === sortKey);
		return [...rows].sort((a, b) => {
			const aValue = getSortValue(a.cells[sortKey], column?.type);
			const bValue = getSortValue(b.cells[sortKey], column?.type);
			if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
			if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});
	}, [
		rows,
		columns,
		sortKey,
		sortDirection
	]);
}
function SortIcon({ direction }) {
	return /* @__PURE__ */ jsxs("svg", {
		className: cn("aios-sort-icon", direction === "asc" && "aios-sort-icon--asc", direction === "desc" && "aios-sort-icon--desc"),
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M4 6l4-4 4 4",
			className: "aios-sort-icon__up"
		}), /* @__PURE__ */ jsx("path", {
			d: "M4 10l4 4 4-4",
			className: "aios-sort-icon__down"
		})]
	});
}
function TableHeader({ columns, sortKey, sortDirection, onSort }) {
	return /* @__PURE__ */ jsx("thead", {
		className: "aios-table__head",
		children: /* @__PURE__ */ jsx("tr", {
			className: "aios-table__row",
			children: columns.map((col) => {
				const active = sortKey === col.key;
				return /* @__PURE__ */ jsx("th", {
					className: cn("aios-table__header", col.align === "center" && "aios-table__cell--center", col.align === "right" && "aios-table__cell--right", col.sortable && "aios-table__header--sortable", active && "aios-table__header--sorted"),
					style: col.width ? { width: col.width } : void 0,
					"aria-sort": active ? sortDirection === "asc" ? "ascending" : "descending" : "none",
					children: col.sortable ? /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "aios-table__sort-button",
						onClick: () => onSort(col.key),
						"aria-label": `Sort by ${col.label}`,
						children: [/* @__PURE__ */ jsx("span", { children: col.label }), /* @__PURE__ */ jsx(SortIcon, { direction: active ? sortDirection : null })]
					}) : col.label
				}, col.key);
			})
		})
	});
}
function TableView({ columns, rows, caption, striped, sortKey, sortDirection, onSort }) {
	return /* @__PURE__ */ jsxs("table", {
		className: "aios-table__table",
		children: [
			caption && /* @__PURE__ */ jsx("caption", {
				className: "aios-table__caption",
				children: caption
			}),
			/* @__PURE__ */ jsx(TableHeader, {
				columns,
				sortKey,
				sortDirection,
				onSort
			}),
			/* @__PURE__ */ jsx("tbody", {
				className: "aios-table__body",
				children: rows.map((row, rowIndex) => /* @__PURE__ */ jsx("tr", {
					className: cn("aios-table__row", striped && rowIndex % 2 === 1 && "aios-table__row--even"),
					children: columns.map((col) => /* @__PURE__ */ jsx("td", {
						className: cn("aios-table__cell", col.align === "center" && "aios-table__cell--center", col.align === "right" && "aios-table__cell--right"),
						children: row.cells[col.key]
					}, col.key))
				}, row.id ?? rowIndex))
			})
		]
	});
}
function GridHeader({ columns, sortKey, sortDirection, onSort }) {
	return /* @__PURE__ */ jsx("div", {
		className: "aios-data-grid__header",
		children: columns.map((col) => {
			const active = sortKey === col.key;
			return /* @__PURE__ */ jsx("div", {
				className: cn("aios-data-grid__header-cell", col.type === "numeric" && "aios-data-grid__header-cell--numeric", col.sortable && "aios-data-grid__header-cell--sortable", active && "aios-data-grid__header-cell--sorted"),
				"aria-sort": active ? sortDirection === "asc" ? "ascending" : "descending" : "none",
				children: col.sortable ? /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "aios-data-grid__sort-button",
					onClick: () => onSort(col.key),
					"aria-label": `Sort by ${col.label}`,
					children: [/* @__PURE__ */ jsx("span", { children: col.label }), /* @__PURE__ */ jsx(SortIcon, { direction: active ? sortDirection : null })]
				}) : col.label
			}, col.key);
		})
	});
}
function GridView({ columns, rows, emptyMessage, onRowClick, sortKey, sortDirection, onSort }) {
	const [activeRowIndex, setActiveRowIndex] = React$1.useState(null);
	const handleRowClick = (index) => {
		setActiveRowIndex(index);
		onRowClick?.(index);
	};
	const handleRowKeyDown = (e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleRowClick(index);
		}
	};
	const getCellStatus = (row, columnKey) => {
		return row.cellStatuses?.find((cs) => cs.columnKey === columnKey)?.status;
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(GridHeader, {
		columns,
		sortKey,
		sortDirection,
		onSort
	}), rows.length === 0 ? /* @__PURE__ */ jsx("div", {
		className: "aios-data-grid__empty",
		children: /* @__PURE__ */ jsx("div", {
			className: "aios-data-grid__empty-cell",
			style: { gridColumn: `1 / ${columns.length + 1}` },
			children: emptyMessage
		})
	}) : rows.map((row, rowIndex) => {
		const isActive = row.active || activeRowIndex === rowIndex;
		return /* @__PURE__ */ jsx("div", {
			className: cn("aios-data-grid__row", isActive && "aios-data-grid__row--active", row.interactive && "aios-data-grid__row--interactive"),
			role: row.interactive ? "button" : void 0,
			tabIndex: row.interactive ? 0 : void 0,
			onClick: row.interactive ? () => handleRowClick(rowIndex) : void 0,
			onKeyDown: row.interactive ? (e) => handleRowKeyDown(e, rowIndex) : void 0,
			"data-state": dataAttr(isActive ? "active" : "idle"),
			"data-interactive": dataAttr(!!row.interactive),
			children: columns.map((col) => {
				const status = getCellStatus(row, col.key);
				return /* @__PURE__ */ jsx("div", {
					className: cn("aios-data-grid__cell", col.type === "text" && "aios-data-grid__cell--text", col.type === "numeric" && "aios-data-grid__cell--numeric", status === "good" && "aios-data-grid__cell--good", status === "warning" && "aios-data-grid__cell--warning", status === "error" && "aios-data-grid__cell--error", status === "info" && "aios-data-grid__cell--info"),
					children: row.cells[col.key] ?? ""
				}, col.key);
			})
		}, rowIndex);
	})] });
}
function RowsView({ items, onRowClick }) {
	const handleRowClick = (index) => {
		onRowClick?.(index);
	};
	const handleRowKeyDown = (e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleRowClick(index);
		}
	};
	return /* @__PURE__ */ jsx(Fragment, { children: items.map((row, index) => {
		const isInteractive = row.interactive && !row.disabled;
		return /* @__PURE__ */ jsxs("div", {
			className: cn("aios-data-row", row.status === "good" && "aios-data-row--good", row.status === "warning" && "aios-data-row--warning", row.status === "error" && "aios-data-row--error", row.status === "info" && "aios-data-row--info", row.isSub && "aios-data-row--sub", row.interactive && "aios-data-row--interactive", row.disabled && "aios-data-row--disabled"),
			role: isInteractive ? "button" : void 0,
			tabIndex: isInteractive ? 0 : void 0,
			onClick: isInteractive ? () => handleRowClick(index) : void 0,
			onKeyDown: isInteractive ? (e) => handleRowKeyDown(e, index) : void 0,
			"data-state": dataAttr(row.disabled ? "disabled" : isInteractive ? "interactive" : "static"),
			children: [/* @__PURE__ */ jsx("div", {
				className: "aios-data-row__left",
				children: /* @__PURE__ */ jsx("div", {
					className: "aios-data-row__label",
					children: row.label
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "aios-data-row__right",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "aios-data-row__value",
						children: row.value
					}),
					row.unit && /* @__PURE__ */ jsx("span", {
						className: "aios-data-row__unit",
						children: row.unit
					}),
					row.trend && /* @__PURE__ */ jsx("span", {
						className: "aios-data-row__trend",
						children: row.trend
					})
				]
			})]
		}, index);
	}) });
}
const DataTable = React$1.forwardRef(({ className, variant = "table", columns, rows = [], caption, items = [], emptyMessage = "No data", onRowClick, onSortChange, striped = false, compact = false, hoverable = false, proximity = false, ...props }, ref) => {
	const [sortKey, setSortKey] = React$1.useState(null);
	const [sortDirection, setSortDirection] = React$1.useState(null);
	const handleSort = React$1.useCallback((key) => {
		setSortKey((prevKey) => {
			if (prevKey !== key) {
				setSortDirection("asc");
				onSortChange?.(key, "asc");
				return key;
			}
			setSortDirection((prevDir) => {
				const nextDir = prevDir === "asc" ? "desc" : prevDir === "desc" ? null : "asc";
				onSortChange?.(nextDir ? key : null, nextDir);
				return nextDir;
			});
			return key;
		});
	}, [onSortChange]);
	const sortedRows = useSortedRows(rows, columns ?? [], sortKey, sortDirection);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dataTableVariants({
			variant,
			striped: variant === "table" ? striped : false,
			compact: variant === "table" ? compact : false,
			hoverable: variant === "table" ? hoverable : false,
			proximity
		}), className),
		"data-state": dataAttr(hoverable ? "hoverable" : "static"),
		"data-variant": dataAttr(variant),
		...props,
		children: [
			variant === "table" && columns && /* @__PURE__ */ jsx(TableView, {
				columns,
				rows: sortedRows,
				caption,
				striped,
				sortKey,
				sortDirection,
				onSort: handleSort
			}),
			variant === "grid" && columns && /* @__PURE__ */ jsx(GridView, {
				columns,
				rows: sortedRows,
				emptyMessage,
				onRowClick,
				sortKey,
				sortDirection,
				onSort: handleSort
			}),
			variant === "rows" && /* @__PURE__ */ jsx(RowsView, {
				items,
				onRowClick
			})
		]
	});
});
DataTable.displayName = "DataTable";
//#endregion
export { dataTableVariants, DataTable as default };

//# sourceMappingURL=DataTable.mjs.map