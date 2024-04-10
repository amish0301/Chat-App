import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURI } from "../../utils/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURI}/api` }),
  tagTypes: [["Chat"], ["User"]],

  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "/chat/my/chats",
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

    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
export const { useMyChatQuery, useLazySearchUserQuery, useSendFriendRequestMutation, useGetNotificationsQuery, useAcceptFriendRequestMutation } =
  api;