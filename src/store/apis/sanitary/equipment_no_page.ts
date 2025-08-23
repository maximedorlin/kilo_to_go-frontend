import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EquipmentNoPageApi = createApi({
  reducerPath: "EquipmentNoPageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/equipments-none-pagenated/`,
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
    getEquipments: builder.query<EquipementInterface[], void>({
      query: () => ``,
    }),
    getAllEquipments: builder.query<EquipementInterface[], void>({
      query: () => ``,
    }),
  }),
});

export const { useGetEquipmentsQuery, useGetAllEquipmentsQuery } =
  EquipmentNoPageApi;
