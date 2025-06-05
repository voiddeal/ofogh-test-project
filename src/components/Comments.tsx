import { useGetCommentsQuery } from "../redux/features/apiSlice"
import Comment from "./Comment"
import BounceLoader from "./BeatLoader"

interface CommentsProps {
  id: number | null
}

export default function Comments({ id }: CommentsProps) {
  if (id === null) throw new Error("id is null")

  const { data, isLoading } = useGetCommentsQuery(id)

  const comments = data?.map((comment) => {
    const { body, email, id } = comment
    const name = email.split("@")[0]
    const likesCount = Math.floor(Math.random() * 100)
    const randomlyGenerateDate = () => {
      const randomNumber = Math.floor(Math.random() * 12) + 1
      const format = Math.random() < 0.5 ? "days" : "hours"
      return `${randomNumber} ${format} ago`
    }

    return (
      <Comment
        key={id}
        body={body}
        name={name}
        likesCount={likesCount}
        date={randomlyGenerateDate()}
      />
    )
  })

  if (isLoading) return <BounceLoader />

  return (
    <div
      role="dialog"
      id="comments-modal"
      aria-modal={true}
      className="absolute inset-0 m-auto w-10/12 h-8/12 pb-10 z-50"
    >
      <ul className="p-4 flex flex-col gap-y-8 bg-gray-100 rounded-lg pb-10">
        {comments}
      </ul>
    </div>
  )
}
