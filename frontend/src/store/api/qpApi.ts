import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QP_TAG, tagTypes } from "@/lib/ApiTags";
import { QpResponseType, responseType } from "@/lib/ApiTypes";
import { RootState } from "../index";

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
    allQPs: builder.query<QpResponseType, void>({
      query: () => "/approved",
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
