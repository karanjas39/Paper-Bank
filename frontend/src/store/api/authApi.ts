import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
import { z_signin_type, z_signup_type } from "@singhjaskaran/paperbank-common";
import { responseType, signinType } from "@/lib/ApiTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/auth` }),
  tagTypes,
  endpoints: (builder) => ({
    signIn: builder.mutation<signinType, z_signin_type>({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<responseType, z_signup_type>({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
