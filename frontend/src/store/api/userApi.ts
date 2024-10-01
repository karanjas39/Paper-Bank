import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { BACKEND_URL } from "@/lib/constants";
import { ALL_USER_TAG, tagTypes, USER_TAG } from "@/lib/ApiTags";
import { allUsersType, responseType, userDetailType } from "@/lib/ApiTypes";
import {
  z_resetUploads_type,
  z_updatePassword_type,
  z_updateUser_type,
  z_verifyOTP_type,
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
    getAllUsers: builder.query<
      allUsersType,
      { page: number; pageSize: number; searchTerm: string }
    >({
      query: ({ page, pageSize, searchTerm }) =>
        `/all?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
          searchTerm
        )}`,
      providesTags: [ALL_USER_TAG],
    }),
    updateUser: builder.mutation<responseType, z_updateUser_type>({
      query: (body) => ({
        url: "/detail",
        method: "PUT",
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    verifyEmail: builder.mutation<responseType, z_verifyOTP_type>({
      query: (body) => ({
        url: "/user/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: [USER_TAG],
    }),
    resetUploads: builder.mutation<responseType, z_resetUploads_type>({
      query: (body) => ({
        url: "/reset/uploads",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ALL_USER_TAG],
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
