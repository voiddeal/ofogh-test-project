import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { postsActions } from "../redux/features/postsSlice"
import type { ToastProps } from "../types/models"

interface EditPostProps {
  id: number | null
  modalDisplay: React.Dispatch<React.SetStateAction<boolean>>
  setToast?: ToastProps["setToast"]
}

export default function EditPost({
  id,
  modalDisplay,
  setToast,
}: EditPostProps) {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.posts)
  const data = posts.find((post) => post.id === id)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const postRef = useRef<HTMLTextAreaElement>(null)

  const submit = () => {
    if (!id) return

    const title = titleRef.current?.value
    const body = postRef.current?.value

    if (!title || !body) return

    const newPostsData = posts.map((post) =>
      post.id === id ? { ...post, title, body } : post
    )

    dispatch(postsActions.setPosts(newPostsData))
    modalDisplay(false)
    if (setToast) {
      setToast({ message: "Post edited successfully!", type: "success" })
    }
  }

  return (
    <div
      role="dialog"
      id="edit-post-modal"
      aria-modal={true}
      className="absolute inset-0 m-auto w-10/12 h-10/12 z-50 overflow-hidden"
    >
      <div className="bg-gray-100 p-4 md:px-10 xl:px-20">
        <div className="">
          <header>
            <h4 className="text-2xl text-center">Edit Post</h4>
          </header>
        </div>
        <div className="flex gap-x-4 my-6">
          <div className="w-fit px-4 py-1 border border-gray-300 rounded-2xl">
            <span>Post id: </span>
            <span className="bg-amber-200 px-2">{data?.id}</span>
          </div>
          <div className="w-fit px-4 py-1 border border-gray-300 rounded-2xl">
            <span>User id: </span>
            <span className="bg-amber-200 px-2">{data?.userId || "null"}</span>
          </div>
        </div>
        <div className="my-4">
          <span className="block font-bold py-1">Title:</span>
          <textarea
            ref={titleRef}
            rows={2}
            defaultValue={data?.title}
            className="w-full p-2 bg-white"
          />
        </div>
        <div className="my-4">
          <span className="block font-bold py-1">Post:</span>
          <textarea
            ref={postRef}
            rows={6}
            defaultValue={data?.body}
            className="w-full p-2 bg-white"
          />
        </div>
        <div className="flex justify-evenly my-4">
          <button
            onClick={() => modalDisplay(false)}
            className="text-white bg-red-400 px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="text-white bg-green-400 px-4 py-2 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
