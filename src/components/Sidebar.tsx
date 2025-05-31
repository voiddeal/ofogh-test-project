import { MdPostAdd } from "react-icons/md"
import { MdOutlineSignpost } from "react-icons/md"
import { HiHome } from "react-icons/hi2"
import { IoStatsChartOutline } from "react-icons/io5"
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb"
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb"
import { NavLink } from "react-router-dom"
import { useState } from "react"

interface SidebarData {
  content: React.ReactNode
  tooltip: string
  target: string
}

const sidebarData: SidebarData[] = [
  {
    content: <HiHome />,
    tooltip: "Home",
    target: "/",
  },
  {
    content: <MdOutlineSignpost />,
    tooltip: "Posts",
    target: "/posts",
  },
  {
    content: <MdPostAdd />,
    tooltip: "Create a New Post",
    target: "/create-post",
  },
  {
    content: <IoStatsChartOutline />,
    tooltip: "View Charts",
    target: "/view-charts",
  },
]

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const buttons = sidebarData.map((button) => {
    const { content, tooltip, target } = button
    return (
      <li className="w-full relative group cursor-pointer hover:text-emerald-500">
        <NavLink
          to={target}
          className="w-full h-full flex justify-center items-center mx-auto py-2 "
        >
          {content}
        </NavLink>
        <span className="absolute top-0 -right-3 justify-center items-center translate-x-full w-max h-full hidden group-hover:flex text-base text-white bg-stone-800 px-2">
          {tooltip}
        </span>
      </li>
    )
  })

  return (
    <>
      <button
        className={`fixed z-10 top-20 text-3xl text-cyan-400 transition-all cursor-pointer p-1 ${
          isSidebarOpen
            ? "left-[5px]"
            : "left-0 text-white bg-stone-800 pl-4 rounded-e-lg"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Toggle side bar"
      >
        {isSidebarOpen ? (
          <TbLayoutSidebarLeftCollapseFilled />
        ) : (
          <TbLayoutSidebarLeftCollapse />
        )}
      </button>

      <aside
        className={`absolute left-1 inset-y-0 my-auto w-10 h-[80dvh] transition-transform text-white text-2xl bg-stone-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+5px)]"
        }`}
      >
        <ul className="h-full flex flex-col items-center gap-y-4 py-4 pt-20">
          {buttons}
        </ul>
      </aside>
    </>
  )
}
