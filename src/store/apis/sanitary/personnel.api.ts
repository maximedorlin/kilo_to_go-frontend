import { GetDatasArgs } from "@/interfaces/base.interface";
import {
  PersonnalInterface,
  PersonnelCreation,
  PersonnelInterfaceWithPagination,
} from "@/interfaces/sanitary/personnel.interface";

import {
  buildFilterParams,
  buildOrderingParam,
} from "@/utils/transform-sorting";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PersonnelApi = createApi({
  reducerPath: "PersonnelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/personnel`,
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
    createPersonnel: builder.mutation<PersonnalInterface, PersonnelCreation>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),

    getPersonnels: builder.query<
      PersonnelInterfaceWithPagination,
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

    getSinglePersonnel: builder.query<PersonnalInterface, string>({
      query: (id) => `${id}/`,
    }),

    updatePersonnel: builder.mutation<
      PersonnalInterface,
      { id: string; data: Partial<PersonnalInterface> }
    >({
      query: ({ id, data }) => ({
        url: `${id}/`,
        method: "PUT",
        body: data,
      }),
    }),

    deletePersonnel: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePersonnelMutation,
  useGetPersonnelsQuery,
  useGetSinglePersonnelQuery,
  useUpdatePersonnelMutation,
  useDeletePersonnelMutation,
} = PersonnelApi;
