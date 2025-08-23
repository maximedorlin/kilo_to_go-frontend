/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "../components/data-table-pagination";
import {
  DataTableToolbar,
  StatutFilter,
} from "../components/data-table-toolbar";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  maxHeight?: string;
  stickyHeader?: boolean;
  state_filters?: StatutFilter[];
  onRowClick?: (rowData: TData) => void;
  onSelectActions?: React.ReactNode[];
}

export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filter?: "text" | "select";
  filterOptions?: string[];
};

const DataTable = React.forwardRef<
  ReactTable<any>, // You can replace `any` with `TData` if you need the specific type.
  DataTableProps<any, any> // The props should also use `any` here, but you can replace it with `TData` and `TValue` as needed.
>(
  (
    {
      columns,
      data,
      maxHeight = "400px",
      stickyHeader,
      state_filters,
      onRowClick,
      onSelectActions,
    }: DataTableProps<any, any>,
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
        rowSelection,
        columnFilters,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    React.useImperativeHandle(ref, () => table, [table]);

    const { t } = useTranslation();

    return (
      <div className="space-y-4 relative">
        {Object.keys(rowSelection).length > 0 && (
          <div
            role="toolbar"
            aria-orientation="horizontal"
            className="absolute -top-1.3 left-0 z-50 flex w-fit flex-wrap items-center justify-center gap-2 p-2 shadow-sm min-w-[100px]"
          >
            <>
              {onSelectActions &&
                onSelectActions.map((e, i) => (
                  <React.Fragment key={i}>{e}</React.Fragment>
                ))}
            </>
          </div>
        )}
        <DataTableToolbar state_filters={state_filters} table={table} />
        <div className="">
          <Table {...(maxHeight ? { maxHeight } : {})} className="rounded-sm">
            <TableHeader
              className={`bg-[#efeff0] ${
                stickyHeader ? "sticky top-0 z-50  shadow" : ""
              }`}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  <TableRow>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        className="font-semibold"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableHeader>
            <TableHeader className="h-5"></TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => onRowClick?.(row.original)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {t("No_results")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    );
  }
);

DataTable.displayName = "DataTable";

export { DataTable };
