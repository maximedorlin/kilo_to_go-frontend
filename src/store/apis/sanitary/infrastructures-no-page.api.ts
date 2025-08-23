import { InfrastructuresInterface } from "@/interfaces/sanitary/infrastructures.interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const InfrastructuresApiNoPage = createApi({
  reducerPath: "InfrastructuresApiNoPage",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/infrastructures-none-pagenated/`,
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
    getAllInfrastructures: builder.query<InfrastructuresInterface[], void>({
      query: () => ({
        url: ``,
      }),
    }),
  }),
});

export const { useGetAllInfrastructuresQuery } = InfrastructuresApiNoPage;
