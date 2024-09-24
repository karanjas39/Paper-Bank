import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QP_ADMIN_TAG, QP_TAG, tagTypes } from "@/lib/ApiTags";
import {
  QpAdminResponseType,
  QpResponseType,
  responseType,
} from "@/lib/ApiTypes";
import { RootState } from "../index";
import { z_reviewQP_type } from "@singhjaskaran/paperbank-common";

export const qpApi = createApi({
  reducerPath: "qpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/qp`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: (builder) => ({
    myUploads: builder.query<QpResponseType, void>({
      query: () => "/user",
      providesTags: [QP_TAG],
    }),
    allQPsAdmin: builder.query<
      QpAdminResponseType,
      { page: number; pageSize: number; searchTerm: string }
    >({
      query: ({ page, pageSize, searchTerm }) =>
        `/all?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
          searchTerm
        )}`,
      providesTags: [QP_ADMIN_TAG],
    }),
    allQPs: builder.query<QpResponseType, void>({
      query: () => "/approved",
    }),
    reviewQP: builder.mutation<responseType, z_reviewQP_type>({
      query: (body) => ({
        url: "/review",
        method: "POST",
        body,
      }),
      invalidatesTags: [QP_ADMIN_TAG],
    }),
    uploadQP: builder.mutation<responseType, any>({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
      invalidatesTags: [QP_TAG],
    }),
  }),
});
