import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Post } from "../../types/models"
import { apiSlice } from "./apiSlice" // Import RTK Query API

type PostsState = Post[]

const initialState: PostsState = []

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (_state, action: PayloadAction<Post[]>) => {
      return action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getPosts.matchFulfilled,
      (_state, action) => {
        return action.payload
      }
    )
  },
})

export const postsActions = postsSlice.actions
export default postsSlice.reducer
