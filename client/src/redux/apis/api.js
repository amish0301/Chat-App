import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURI } from "../../utils/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURI}/api/` }),
  tagTypes: ["Chat"],

  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;
export const { useMyChatQuery } = api;
