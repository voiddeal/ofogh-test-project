import { MdPostAdd } from "react-icons/md"
import { MdOutlineSignpost } from "react-icons/md"
import { HiHome } from "react-icons/hi2"
import { IoStatsChartOutline } from "react-icons/io5"
import { TbLayoutSidebarRightCollapse } from "react-icons/tb"
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb"
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
  const buttons = sidebarData.map((button, index) => {
    const { content, tooltip, target } = button
    return (
      <li key={index} className="w-full relative group cursor-pointer ">
        <NavLink
          to={target}
          className="w-full h-full flex justify-center items-center mx-auto py-2 hover:text-[#81ffe8]"
          style={({ isActive }) => ({
            color: isActive ? "#00efc3" : "",
          })}
        >
          {content}
          <span className="absolute top-0 -left-3 flex justify-center items-center w-max h-full opacity-0 -translate-x-[90%] invisible group-hover:opacity-100 group-hover:-translate-x-full group-hover:visible transition-all text-base text-[#00fff3] bg-stone-800 px-4 rounded-lg">
            {tooltip}
          </span>
        </NavLink>
      </li>
    )
  })

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed z-50 top-20 text-3xl text-cyan-500 transition-all cursor-pointer p-1 ${
          isSidebarOpen
            ? "right-[5px]"
            : "right-0 text-white bg-stone-800 pr-4 rounded-s-lg"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Toggle side bar"
      >
        {isSidebarOpen ? (
          <TbLayoutSidebarRightCollapseFilled />
        ) : (
          <TbLayoutSidebarRightCollapse />
        )}
      </button>

      {/* Side Bar */}
      <aside
        className={`fixed right-1 inset-y-0 my-auto w-10 h-[80dvh] transition-transform text-white text-2xl bg-stone-800 z-40 ${
          isSidebarOpen ? "-translate-x-0" : "translate-x-[calc(100%+5px)]"
        }`}
      >
        <hr className="w-full text-stone-500 mt-20 mb-10" />
        <ul className="h-full flex flex-col items-center gap-y-4 py-4 border-b border-gray-200">
          {buttons}
          <hr className="w-full text-stone-500 mt-10" />
        </ul>
      </aside>
    </>
  )
}
