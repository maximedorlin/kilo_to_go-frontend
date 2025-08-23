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


// endpoints: (builder) => ({
//     // Endpoint pour obtenir les patrimoines avec pagination, tri, et filtres
//     getPatrimoines: builder.query<PatrimoineResponse, GetPatrimoinesArgs>({
//       query: ({ pageIndex, pageSize, sorting, filters }) => {
//         const params = new URLSearchParams({
//           page: pageIndex.toString(),
//           size: pageSize.toString(),
//         });

//         // Ajoute les paramètres de tri
//         if (sorting) {
//           sorting.forEach((s) =>
//             params.append('sort', `${s.id}:${s.desc ? 'desc' : 'asc'}`)
//           );
//         }

//         // Ajoute les paramètres de filtrage
//         if (filters) {
//           filters.forEach((f) => params.append(`filter_${f.id}`, f.value));
//         }

//         return `patrimoine-filter/?${params.toString()}`; // Utilise l'endpoint correspondant à "patrimoines"
//       },
//     }),
//   }),



// interface PatrimoineResponse {
//     count: number;
//     next: string | null;
//     previous: string | null;
//     results: Patrimoine[];
//   }
  
//   interface Sort {
//     id: string;
//     desc: boolean;
//   }
  
//   interface Filter {
//     id: string;
//     value: any;
//   }
  
//   interface GetPatrimoinesArgs {
//     pageIndex: number;
//     pageSize: number;
//     sorting?: Sort[];
//     filters?: Filter[];
//   }