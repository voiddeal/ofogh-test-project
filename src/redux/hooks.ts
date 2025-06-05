import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const usePosts = () => useSelector((state: RootState) => state.posts)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
