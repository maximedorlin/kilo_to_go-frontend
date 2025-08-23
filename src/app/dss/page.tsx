// pages/contribuables.tsx
"use client";
import React from "react";


// import { PaginationState, SortingState, ColumnFiltersState } from "@tanstack/react-table";
// import { Patrimoine_columns } from "@/components/tables/patrimoine/patrimoine-columns";
// import { ServerDataTable } from "@/components/tasks/components/server-data-table";
// import { useGetPatrimoinesQuery } from "@/store/apis/serverless-api";

export default function ContribuablesPage() {
    // const [pagination, setPagination] = React.useState<PaginationState>({
    //     pageIndex: 1,
    //     pageSize: 10,
    // });

    // const [sorting, setSorting] = React.useState<SortingState>([]);
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    // const { data, } = useGetPatrimoinesQuery({
    //     pageIndex: pagination.pageIndex,
    //     pageSize: pagination.pageSize,
    //     sorting,
    //     filters: columnFilters.map((f) => ({ id: f.id, value: f.value })),
    // });

    return (
        <div className="p-4">
            {/* <ServerDataTable
                columns={Patrimoine_columns}
                data={data?.results || []}
                pageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
                onPaginationChange={setPagination}
                sorting={sorting}
                onSortingChange={setSorting}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
            /> */}
        </div>
    );
}
