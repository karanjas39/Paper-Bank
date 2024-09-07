import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
import { allProgramstype } from "@/lib/ApiTypes";

export const programApi = createApi({
  reducerPath: "programApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/program` }),
  tagTypes,
  endpoints: (builder) => ({
    getPrograms: builder.query<allProgramstype, void>({
      query: () => "/all",
    }),
  }),
});
