import { BACKEND_URL } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/lib/ApiTags";
import { z_createMessage_type } from "@singhjaskaran/paperbank-common";
import { responseType } from "@/lib/ApiTypes";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/contact` }),
  tagTypes,
  endpoints: (builder) => ({
    contactAdmin: builder.mutation<responseType, z_createMessage_type>({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
    }),
  }),
});
