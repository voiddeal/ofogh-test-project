import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { postsActions } from "../redux/features/postsSlice"
import { useCreatePostMutation } from "../redux/features/apiSlice"

export default function CreatePost() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.posts)
  const [createPost] = useCreatePostMutation()

  const [formData, setFormData] = useState({ id: "", title: "", body: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === "title" && !/^[a-zA-Z\s]*$/.test(value)) {
      alert("Only English letters are allowed in the title!")
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const submitPost = async () => {
    if (!formData.id || !formData.title || !formData.body) {
      alert("All fields are required")
      return
    }

    try {
      const newPost = await createPost({
        id: Number(formData.id),
        title: formData.title,
        body: formData.body,
      }).unwrap()

      dispatch(postsActions.setPosts([newPost, ...posts]))
      alert("Post created successfully!")
      setFormData({ id: "", title: "", body: "" })
    } catch (error) {
      alert("Failed to create post.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100dvh-3rem)] bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          :: Create a New Post ::
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Post ID</label>
            <input
              type="number"
              name="id"
              placeholder="Enter Post ID"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Post Content
            </label>
            <textarea
              name="body"
              placeholder="Write your post here..."
              rows={6}
              value={formData.body}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={submitPost}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  )
}
