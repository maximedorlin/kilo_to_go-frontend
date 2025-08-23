import { GetDatasArgs } from "@/interfaces/base.interface";
import {
  ConsumablesCreation,
  ConsumablesInterface,
  ConsumablesInterfaceWithPagination,
} from "@/interfaces/sanitary/consumables.interface";

import {
  buildFilterParams,
  buildOrderingParam,
} from "@/utils/transform-sorting";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ConsumablesApi = createApi({
  reducerPath: "ConsumablesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/consumables/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        const userParsed = JSON.parse(token);
        headers.set("authorization", `Bearer ${userParsed}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createConsumables: builder.mutation<
      ConsumablesInterface,
      ConsumablesCreation
    >({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),

    getConsumables: builder.query<
      ConsumablesInterfaceWithPagination,
      GetDatasArgs
    >({
      query: ({ pageIndex, pageSize, sorting, filters }) => {
        const params = new URLSearchParams({
          page: pageIndex.toString(),
          size: pageSize.toString(),
        });

        if (sorting && typeof buildOrderingParam(sorting) != "undefined") {
          params.append("ordering", buildOrderingParam(sorting) as string);
        }
        if (filters) {
          const filterParams = buildFilterParams(filters);
          Object.entries(filterParams).forEach(([key, value]) => {
            params.append(key, value);
          });
        }

        return `?${params.toString()}`;
      },
    }),

    getConsumableWithFilters: builder.query<
      ConsumablesInterfaceWithPagination,
      string
    >({
      query: (query) => `?${query}`,
    }),

    getSingleConsumables: builder.query<ConsumablesInterface, string>({
      query: (id) => `${id}/`,
    }),

    updateConsumables: builder.mutation<
      ConsumablesInterface,
      { id: string; data: Partial<ConsumablesInterface> }
    >({
      query: ({ id, data }) => ({
        url: `${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteConsumables: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
    }),

    deleteConsumablesMultiple: builder.mutation<void, string[]>({
      query: (data) => ({
        url: `bulk-delete/`,
        method: "DELETE",
        body: { ids: data },
      }),
    }),
  }),
});

export const {
  useCreateConsumablesMutation,
  useGetConsumablesQuery,
  useGetSingleConsumablesQuery,
  useGetConsumableWithFiltersQuery,
  useUpdateConsumablesMutation,
  useDeleteConsumablesMutation,
  useDeleteConsumablesMultipleMutation,
} = ConsumablesApi;
