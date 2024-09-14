import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
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
      query: (body) => "/user",
    }),
    uploadQP: builder.mutation<responseType, any>({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
    }),
  }),
});
