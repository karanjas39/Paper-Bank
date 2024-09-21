import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { BACKEND_URL } from "@/lib/constants";
import { tagTypes, USER_TAG } from "@/lib/ApiTags";
import { allUsersType, responseType, userDetailType } from "@/lib/ApiTypes";
import {
  z_updatePassword_type,
  z_updateUser_type,
} from "@singhjaskaran/paperbank-common";

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
      providesTags: [USER_TAG],
    }),
    getAllUsers: builder.query<allUsersType, void>({
      query: () => "/all",
    }),
    updateUser: builder.mutation<responseType, z_updateUser_type>({
      query: (body) => ({
        url: "/detail",
        method: "PUT",
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    updatePassword: builder.mutation<responseType, z_updatePassword_type>({
      query: (body) => ({
        url: "/password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});
