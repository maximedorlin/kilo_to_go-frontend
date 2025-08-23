import { PersonnalInterface } from "@/interfaces/sanitary/personnel.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PersonnelApiNoPage = createApi({
  reducerPath: "PersonnelApiNoPage",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}sanitary/personnels-none-pagenated/`,
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
    getAllPersonal: builder.query<PersonnalInterface[], void>({
      query: () => ``,
    }),
  }),
});

export const { useGetAllPersonalQuery } = PersonnelApiNoPage;
