import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { BACKEND_URL } from "@/lib/constants";
import { tagTypes } from "@/lib/ApiTags";
import { userDetailType } from "@/lib/ApiTypes";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/user`,
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
    getUserDetail: builder.query<userDetailType, void>({
      query: () => "/me",
    }),
  }),
});
