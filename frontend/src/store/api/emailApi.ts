import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes, USER_TAG } from "@/lib/ApiTags";
import { responseType } from "@/lib/ApiTypes";
import { z_verifyOTP_type } from "@singhjaskaran/paperbank-common";
import { RootState } from "../index";

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}`,
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
    sendEmail: builder.mutation<responseType, void>({
      query: () => "/auth/send-otp",
    }),
    verifyEmail: builder.mutation<responseType, z_verifyOTP_type>({
      query: (body) => ({
        url: "/user/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
  }),
});
