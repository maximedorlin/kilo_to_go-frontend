import { GetDatasArgs } from "@/interfaces/base.interface";
import {
  EquipementCreation,
  EquipementInterface,
  EquipementInterfaceWithPagination,
} from "@/interfaces/sanitary/equipement.interface";

import {
  buildFilterParams,
  buildOrderingParam,
} from "@/utils/transform-sorting";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EquipementApi = createApi({
  reducerPath: "EquipementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/equipment/`,
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
    // create equipment
    createEquipement: builder.mutation<EquipementInterface, EquipementCreation>(
      {
        query: (body) => ({
          url: ``,
          method: "POST",
          body,
        }),
      }
    ),

    // get all equipments
    getEquipements: builder.query<
      EquipementInterfaceWithPagination,
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

    getEquipmentsWithFilters: builder.query<
      EquipementInterfaceWithPagination,
      string
    >({
      query: (query) => `?${query}`,
    }),

    // get a single equipment
    getSingleEquipement: builder.query<EquipementInterface, string>({
      query: (id) => `${id}/`,
    }),

    // update an equipment
    updateEquipement: builder.mutation<
      EquipementInterface,
      { id: string; data: Partial<EquipementInterface> }
    >({
      query: ({ id, data }) => ({
        url: `${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    // delete a single equipment
    deleteEquipement: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
    }),

    // delete several equipments
    deleteEquipementMultiple: builder.mutation<void, string[]>({
      query: (data) => ({
        url: `bulk-delete/`,
        method: "DELETE",
        body: { ids: data },
      }),
    }),
  }),
});

export const {
  useCreateEquipementMutation,
  useGetEquipementsQuery,
  useGetEquipmentsWithFiltersQuery,
  useGetSingleEquipementQuery,
  useUpdateEquipementMutation,
  useDeleteEquipementMutation,
  useDeleteEquipementMultipleMutation,
} = EquipementApi;
