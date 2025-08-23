/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  Table as ReactTable,
  PaginationState,
  SortingState,
  ColumnFiltersState,
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
import { ExtendedColumnDef } from "./data-table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  setMapCount,
  setSelectedFeature,
} from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  onSelectActions?: React.ReactNode[];
  data: TData[];
  maxHeight?: string;
  stickyHeader?: boolean;
  state_filters?: StatutFilter[];
  onRowClick?: (rowData: TData) => void;
  isFetching?: boolean;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  onPaginationChange: (
    updaterOrValue:
      | PaginationState
      | ((old: PaginationState) => PaginationState)
  ) => void;
  onRowSelectionChangeFromParent?: (rowSelection: string[]) => void;
  // Gestion côté serveur du tri et filtre
  onSortingChange?: (
    updaterOrValue: SortingState | ((old: SortingState) => SortingState)
  ) => void;
  onColumnFiltersChange?: (
    updaterOrValue:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => void;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  isLoading?: boolean;
}

const ServerDataTable = React.forwardRef<
  ReactTable<any>,
  DataTableProps<any, any>
>(
  (
    {
      columns,
      data,
      maxHeight = "400px",
      stickyHeader,
      state_filters,
      onRowClick,
      pageIndex,
      pageSize,
      pageCount,
      onPaginationChange,
      onSortingChange,
      onColumnFiltersChange,
      sorting = [],
      columnFilters = [],
      onSelectActions,
      isFetching,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const dispatch = useAppDispatch();
    const geoSelectedIds = useAppSelector(
      (state) => state.geoSelectedIds.geoSelectedIds
    );
    const unselectRows = useAppSelector(
      (state) => state.geoSelectedIds.unselectRows
    );

    const table = useReactTable({
      data,
      columns,
      pageCount,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination: { pageIndex, pageSize },
      },
      manualPagination: true,
      manualSorting: true,
      manualFiltering: true,
      enableRowSelection: geoSelectedIds.length === 0,
      enableMultiRowSelection: geoSelectedIds.length === 0,
      onRowSelectionChange:
        geoSelectedIds.length === 0 ? setRowSelection : undefined,
      onSortingChange,
      onColumnFiltersChange,
      onColumnVisibilityChange: setColumnVisibility,
      onPaginationChange,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    React.useImperativeHandle(ref, () => table, [table]);

    React.useEffect(() => {
      if (geoSelectedIds.length > 0 && Object.keys(rowSelection).length > 0) {
        setRowSelection({});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geoSelectedIds]);

    React.useEffect(() => {
      if (Object.keys(rowSelection).length > 0) {
        setRowSelection({});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unselectRows]);
    React.useEffect(() => {
      if (table.getRowModel().rows) {
        dispatch(setMapCount());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, table.getRowModel().rows]);

    React.useEffect(() => {
      const features = table
        .getSelectedRowModel()
        .rows.filter((e) => {
          const geom = e.original.geom;
          return (
            geom &&
            typeof geom === "object" &&
            typeof geom.type === "string" &&
            "coordinates" in geom
          );
        })
        .map((e) => {
          return {
            type: "Feature",
            id: e.original.id,
            geometry: { ...e.original.geom },
            properties: {
              ...e.original,
            },
          };
        });

      dispatch(
        setSelectedFeature({
          selelectedFeature: {
            type: "FeatureCollection",
            features,
          },
        })
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [table.getSelectedRowModel().rowsById]);

    const { t } = useTranslation();

    return (
      <div className="space-y-4 relative">
        {(Object.keys(rowSelection).length > 0 ||
          geoSelectedIds.length > 0) && (
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
        <div
          className={`relative ${
            geoSelectedIds.length > 0 ? "opacity-60" : ""
          }`}
        >
          <Table
            className={`rounded-sm ${
              geoSelectedIds.length > 0 ? "cursor-not-allowed" : ""
            }`}
            {...(maxHeight ? { maxHeight } : {})}
          >
            <TableHeader
              className={`bg-[#efeff0] ${
                !stickyHeader ? "sticky top-0 z-50  shadow" : ""
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
              {isFetching && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-52 text-center z-50"
                  >
                    <div className="flex justify-center w-full">
                      <LoaderCircle
                        size={50}
                        className="animate-spin text-primary"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isFetching && (
                <>
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
                </>
              )}
            </TableBody>
          </Table>
          {geoSelectedIds.length > 0 && (
            <div className="absolute inset-0 z-10 cursor-not-allowed" />
          )}
          <DataTablePagination table={table} />
        </div>
      </div>
    );
  }
);

ServerDataTable.displayName = "ServerDataTable";

export { ServerDataTable };
