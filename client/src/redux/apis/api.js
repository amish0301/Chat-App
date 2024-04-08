import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURI } from "../../utils/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURI}/api` }),
  tagTypes: [["Chat"], ["User"]],

  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (search) => ({
        url: `/user/search?name=${search}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export default api;
export const { useMyChatQuery, useLazySearchUserQuery, useSendFriendRequestMutation } =
  api;
