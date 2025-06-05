import { LuCircleUser } from "react-icons/lu"
import { GoHeartFill } from "react-icons/go"
import { useState } from "react"

interface Comment {
  name: string
  body: string
  date: string
  likesCount: number
}

export default function Comment({ body, date, likesCount, name }: Comment) {
  const [likesCounter, setLikesCounter] = useState<number>(likesCount)

  return (
    <li className="bg-gray-200/30 py-4 px-6 shadow rounded-lg flex flex-col gap-y-3">
      <div className="flex justify-between">
        <div className="flex gap-x-4 text-stone-900">
          <div>
            <LuCircleUser size={50} />
          </div>
          <div>
            <span className="block font-bold text-lg">@{name}</span>
            <small className="block text-gray-600">{date}</small>
          </div>
        </div>
        <div
          onClick={() =>
            likesCounter === likesCount && setLikesCounter(likesCounter + 1)
          }
          className="w-24 flex justify-center items-center gap-x-2 border border-teal-400 rounded-4xl cursor-pointer hover:bg-teal-300 hover:border-white group"
        >
          <GoHeartFill
            size={20}
            className={
              likesCount === likesCounter
                ? "text-teal-500 group-hover:text-white"
                : "text-red-400 group-hover:text-red-400"
            }
          />
          <span>{likesCounter}</span>
        </div>
      </div>
      <div className="p-2 text-stone-800">{body}.</div>
    </li>
  )
}
