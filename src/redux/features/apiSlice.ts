import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Post, Comment } from "../../types/models"

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
    }),

    getPost: builder.query<Post, number>({
      query: (postId) => `/posts/${postId}`,
    }),

    getComments: builder.query<Comment[], number>({
      query: (postId) => `/comments?postId=${postId}`,
    }),

    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetCommentsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = apiSlice
