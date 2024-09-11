import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
import { notificationType } from "@/lib/ApiTypes";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/notification` }),
  tagTypes,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<notificationType, void>({
      query: () => "/all",
    }),
  }),
});
