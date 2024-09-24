import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
import { notificationType } from "@/lib/ApiTypes";
import { RootState } from "@/store/index";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/notification`,
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
    getAllNotifications: builder.query<notificationType, void>({
      query: () => "/all",
    }),
  }),
});
