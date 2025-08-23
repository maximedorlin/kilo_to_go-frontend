// src/api/annonceApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Annonce } from '@/interfaces/anononce.interface';
import { Transaction } from '@/interfaces/transaction.interface';


interface AnnonceCreatePayload extends Partial<Annonce> {}
interface AnnonceUpdatePayload extends Partial<Annonce> {
  id: number;
}
const BACKEND_API_URL = "http://localhost:8080/";

export const AnnonceApi = createApi({
  reducerPath: 'AnnonceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/annonces`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('WD_USER');
      if (token) {
        headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['Annonce', 'Transaction'],
  endpoints: (builder) => ({
    // Opérations de base sur les annonces
    getAnnonces: builder.query<Annonce[], void>({
      query: () => '',
      providesTags: (result) =>
        result 
          ? [...result.map(({ id }) => ({ type: 'Annonce' as const, id })), 'Annonce']
          : ['Annonce'],
    }),
    getAnnonceById: builder.query<Annonce, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Annonce', id }],
    }),
    createAnnonce: builder.mutation<Annonce, AnnonceCreatePayload>({
      query: (annonce) => ({
        url: '',
        method: 'POST',
        body: annonce,
      }),
      invalidatesTags: ['Annonce'],
    }),
    updateAnnonce: builder.mutation<Annonce, AnnonceUpdatePayload>({
      query: ({ id, ...annonce }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: annonce,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Annonce', id }],
    }),
    partialUpdateAnnonce: builder.mutation<Annonce, { id: number; updates: Partial<AnnonceUpdatePayload> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Annonce', id }],
    }),
    deleteAnnonce: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Annonce', id }],
    }),

    // Opérations sur les transactions
    createTransactionForAnnonce: builder.mutation<Transaction, { annonceId: number; transaction: Partial<Transaction> }>({
      query: ({ annonceId, transaction }) => ({
        url: `/${annonceId}/transaction`,
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: (result, error, { annonceId }) => [
        { type: 'Transaction', id: annonceId },
        { type: 'Annonce', id: annonceId }
      ],
    }),
    getTransactionForAnnonce: builder.query<Transaction, number>({
      query: (annonceId) => `/${annonceId}/transaction`,
      providesTags: (result, error, annonceId) => [{ type: 'Transaction', id: annonceId }],
    }),
    deleteTransactionForAnnonce: builder.mutation<void, number>({
      query: (annonceId) => ({
        url: `/${annonceId}/transaction`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, annonceId) => [
        { type: 'Transaction', id: annonceId },
        { type: 'Annonce', id: annonceId }
      ],
    }),
  }),
});

export const {
  useGetAnnoncesQuery,
  useGetAnnonceByIdQuery,
  useCreateAnnonceMutation,
  useUpdateAnnonceMutation,
  usePartialUpdateAnnonceMutation,
  useDeleteAnnonceMutation,
  useCreateTransactionForAnnonceMutation,
  useGetTransactionForAnnonceQuery,
  useDeleteTransactionForAnnonceMutation,
} = AnnonceApi;

