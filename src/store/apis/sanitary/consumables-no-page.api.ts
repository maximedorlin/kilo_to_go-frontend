import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ConsumablesApiNoPage = createApi({
  reducerPath: "ConsumablesApiNoPage",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/consumables-none-pagenated/`,
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
    getAllConsumables: builder.query<ConsumablesInterface[], void>({
      query: () => ``,
    }),
  }),
});

export const { useGetAllConsumablesQuery } = ConsumablesApiNoPage;
