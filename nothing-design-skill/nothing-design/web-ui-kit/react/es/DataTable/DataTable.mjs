import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "@/styles/table.css";
import "@/styles/data-grid.css";
import "@/styles/data-rows.css";
//#region src/DataTable/DataTable.tsx
const dataTableVariants = cva("nothing-data-table", {
	variants: {
		variant: {
			table: "nothing-table",
			grid: "nothing-data-grid",
			rows: "nothing-data-rows"
		},
		striped: {
			true: "nothing-table--striped",
			false: ""
		},
		compact: {
			true: "nothing-table--compact",
			false: ""
		},
		hoverable: {
			true: "nothing-table--hoverable",
			false: ""
		},
		proximity: {
			true: "nothing-data-table--proximity",
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
		className: cn("nothing-sort-icon", direction === "asc" && "nothing-sort-icon--asc", direction === "desc" && "nothing-sort-icon--desc"),
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M4 6l4-4 4 4",
			className: "nothing-sort-icon__up"
		}), /* @__PURE__ */ jsx("path", {
			d: "M4 10l4 4 4-4",
			className: "nothing-sort-icon__down"
		})]
	});
}
function TableHeader({ columns, sortKey, sortDirection, onSort }) {
	return /* @__PURE__ */ jsx("thead", {
		className: "nothing-table__head",
		children: /* @__PURE__ */ jsx("tr", {
			className: "nothing-table__row",
			children: columns.map((col) => {
				const active = sortKey === col.key;
				return /* @__PURE__ */ jsx("th", {
					className: cn("nothing-table__header", col.align === "center" && "nothing-table__cell--center", col.align === "right" && "nothing-table__cell--right", col.sortable && "nothing-table__header--sortable", active && "nothing-table__header--sorted"),
					style: col.width ? { width: col.width } : void 0,
					"aria-sort": active ? sortDirection === "asc" ? "ascending" : "descending" : "none",
					children: col.sortable ? /* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "nothing-table__sort-button",
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
		className: "nothing-table__table",
		children: [
			caption && /* @__PURE__ */ jsx("caption", {
				className: "nothing-table__caption",
				children: caption
			}),
			/* @__PURE__ */ jsx(TableHeader, {
				columns,
				sortKey,
				sortDirection,
				onSort
			}),
			/* @__PURE__ */ jsx("tbody", {
				className: "nothing-table__body",
				children: rows.map((row, rowIndex) => /* @__PURE__ */ jsx("tr", {
					className: cn("nothing-table__row", striped && rowIndex % 2 === 1 && "nothing-table__row--even"),
					children: columns.map((col) => /* @__PURE__ */ jsx("td", {
						className: cn("nothing-table__cell", col.align === "center" && "nothing-table__cell--center", col.align === "right" && "nothing-table__cell--right"),
						children: row.cells[col.key]
					}, col.key))
				}, row.id ?? rowIndex))
			})
		]
	});
}
function GridHeader({ columns, sortKey, sortDirection, onSort }) {
	return /* @__PURE__ */ jsx("div", {
		className: "nothing-data-grid__header",
		children: columns.map((col) => {
			const active = sortKey === col.key;
			return /* @__PURE__ */ jsx("div", {
				className: cn("nothing-data-grid__header-cell", col.type === "numeric" && "nothing-data-grid__header-cell--numeric", col.sortable && "nothing-data-grid__header-cell--sortable", active && "nothing-data-grid__header-cell--sorted"),
				"aria-sort": active ? sortDirection === "asc" ? "ascending" : "descending" : "none",
				children: col.sortable ? /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "nothing-data-grid__sort-button",
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
		className: "nothing-data-grid__empty",
		children: /* @__PURE__ */ jsx("div", {
			className: "nothing-data-grid__empty-cell",
			style: { gridColumn: `1 / ${columns.length + 1}` },
			children: emptyMessage
		})
	}) : rows.map((row, rowIndex) => {
		const isActive = row.active || activeRowIndex === rowIndex;
		return /* @__PURE__ */ jsx("div", {
			className: cn("nothing-data-grid__row", isActive && "nothing-data-grid__row--active", row.interactive && "nothing-data-grid__row--interactive"),
			role: row.interactive ? "button" : void 0,
			tabIndex: row.interactive ? 0 : void 0,
			onClick: row.interactive ? () => handleRowClick(rowIndex) : void 0,
			onKeyDown: row.interactive ? (e) => handleRowKeyDown(e, rowIndex) : void 0,
			"data-state": dataAttr(isActive ? "active" : "idle"),
			"data-interactive": dataAttr(!!row.interactive),
			children: columns.map((col) => {
				const status = getCellStatus(row, col.key);
				return /* @__PURE__ */ jsx("div", {
					className: cn("nothing-data-grid__cell", col.type === "text" && "nothing-data-grid__cell--text", col.type === "numeric" && "nothing-data-grid__cell--numeric", status === "good" && "nothing-data-grid__cell--good", status === "warning" && "nothing-data-grid__cell--warning", status === "error" && "nothing-data-grid__cell--error", status === "info" && "nothing-data-grid__cell--info"),
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
			className: cn("nothing-data-row", row.status === "good" && "nothing-data-row--good", row.status === "warning" && "nothing-data-row--warning", row.status === "error" && "nothing-data-row--error", row.status === "info" && "nothing-data-row--info", row.isSub && "nothing-data-row--sub", row.interactive && "nothing-data-row--interactive", row.disabled && "nothing-data-row--disabled"),
			role: isInteractive ? "button" : void 0,
			tabIndex: isInteractive ? 0 : void 0,
			onClick: isInteractive ? () => handleRowClick(index) : void 0,
			onKeyDown: isInteractive ? (e) => handleRowKeyDown(e, index) : void 0,
			"data-state": dataAttr(row.disabled ? "disabled" : isInteractive ? "interactive" : "static"),
			children: [/* @__PURE__ */ jsx("div", {
				className: "nothing-data-row__left",
				children: /* @__PURE__ */ jsx("div", {
					className: "nothing-data-row__label",
					children: row.label
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "nothing-data-row__right",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "nothing-data-row__value",
						children: row.value
					}),
					row.unit && /* @__PURE__ */ jsx("span", {
						className: "nothing-data-row__unit",
						children: row.unit
					}),
					row.trend && /* @__PURE__ */ jsx("span", {
						className: "nothing-data-row__trend",
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