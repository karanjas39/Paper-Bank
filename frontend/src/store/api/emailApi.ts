import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { BACKEND_URL } from "@/lib/constants";
import { tagTypes } from "@/lib/ApiTags";
import { responseType } from "@/lib/ApiTypes";

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/email`,
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
    sendOTP: builder.mutation<responseType, void>({
      query: () => "/otp",
    }),
  }),
});
