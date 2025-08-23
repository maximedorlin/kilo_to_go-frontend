/** @format */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/interfaces/user.interfac';
import { Annonce } from '@/interfaces/anononce.interface';
import { Transaction } from '@/interfaces/transaction.interface';
import { Evaluation } from '@/interfaces/evaluation.interface';


const BACKEND_API_URL = "http://localhost:8080/";

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('WD_USER');
      if (token) {
        headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Annonce', 'Transaction', 'Evaluation', 'Notification'],
  endpoints: (builder) => ({
    // Opérations de base sur les utilisateurs
    getUsers: builder.query<User[], void>({
      query: () => '',
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<User, { id: number; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    partialUpdateUser: builder.mutation<User, { id: number; updates: Partial<User> }>({
      query: ({ id, updates }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Opérations sur les annonces
    getUserAnnonces: builder.query<Annonce[], number>({
      query: (userId) => `/${userId}/annonces`,
      providesTags: (result, error, userId) => [
        { type: 'Annonce', id: userId },
      ],
    }),
    createAnnonceForUser: builder.mutation<Annonce, { userId: number; annonce: Partial<Annonce> }>({
      query: ({ userId, annonce }) => ({
        url: `/${userId}/annonces`,
        method: 'POST',
        body: annonce,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: 'Annonce', id: userId },
      ],
    }),
    deleteAllAnnoncesForUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/${userId}/annonces`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'Annonce', id: userId },
      ],
    }),

    // Opérations sur les transactions
    getUserTransactions: builder.query<Transaction[], number>({
      query: (userId) => `/${userId}/transactions`,
      providesTags: (result, error, userId) => [
        { type: 'Transaction', id: userId },
      ],
    }),
    deleteAllTransactionsForUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/${userId}/transactions`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'Transaction', id: userId },
      ],
    }),

    // Opérations sur les évaluations
    getUserEvaluations: builder.query<Evaluation[], number>({
      query: (userId) => `/${userId}/evaluations`,
      providesTags: (result, error, userId) => [
        { type: 'Evaluation', id: userId },
      ],
    }),

    // Opérations sur les notifications
    getUserNotifications: builder.query<Notification[], number>({
      query: (userId) => `/${userId}/notifications`,
      providesTags: (result, error, userId) => [
        { type: 'Notification', id: userId },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  usePartialUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserAnnoncesQuery,
  useCreateAnnonceForUserMutation,
  useDeleteAllAnnoncesForUserMutation,
  useGetUserTransactionsQuery,
  useDeleteAllTransactionsForUserMutation,
  useGetUserEvaluationsQuery,
  useGetUserNotificationsQuery,
} = UserApi;