import { GetDatasArgs } from "@/interfaces/base.interface";
import {
  InfrastructuresCreation,
  InfrastructuresInterface,
  InfrastructuresInterfaceWithPagination,
} from "@/interfaces/sanitary/infrastructures.interface";

import {
  buildFilterParams,
  buildOrderingParam,
} from "@/utils/transform-sorting";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const InfrastructuresApi = createApi({
  reducerPath: "InfrastructuresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/infrastructures/`,
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
    createInfrastructures: builder.mutation<
      InfrastructuresInterface,
      InfrastructuresCreation
    >({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),

    getInfrastructuress: builder.query<
      InfrastructuresInterfaceWithPagination,
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

    getSingleInfrastructures: builder.query<InfrastructuresInterface, string>({
      query: (id) => `${id}/`,
    }),

    updateInfrastructures: builder.mutation<
      InfrastructuresInterface,
      { id: string; data: Partial<InfrastructuresInterface> }
    >({
      query: ({ id, data }) => ({
        url: `${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteInfrastructures: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateInfrastructuresMutation,
  useGetInfrastructuressQuery,
  useGetSingleInfrastructuresQuery,
  useUpdateInfrastructuresMutation,
  useDeleteInfrastructuresMutation,
} = InfrastructuresApi;
