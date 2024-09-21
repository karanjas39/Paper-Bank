import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROGRAM_TAG, tagTypes } from "@/lib/ApiTags";
import { allProgramstype, responseType } from "@/lib/ApiTypes";
import { z_createProgram_type } from "@singhjaskaran/paperbank-common";
import { RootState } from "../index";

export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/program`,
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
    getPrograms: builder.query<allProgramstype, void>({
      query: () => "/all",
      providesTags: [PROGRAM_TAG],
    }),
    createProgram: builder.mutation<responseType, z_createProgram_type>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [PROGRAM_TAG],
    }),
  }),
});
