import { NavLink, useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"

interface NavbarData {
  name: string
  link: string
}

const navbarData: NavbarData[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Posts",
    link: "/posts",
  },
  {
    name: "Create Post",
    link: "/create-post",
  },
  {
    name: "View Charts",
    link: "/view-charts",
  },
]

export default function Navbar() {
  const navigate = useNavigate()
  const navLinks = navbarData.map((item) => {
    const { link, name } = item
    return (
      <li>
        <NavLink
          to={link}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          {name}
        </NavLink>
      </li>
    )
  })

  return (
    <nav className="flex items-center w-full h-16 bg-blue-400">
      <button
        type="button"
        // disabled={navigationType === "PUSH" ? false : true}
        className=" mr-8 cursor-pointer disabled:cursor-not-allowed"
      >
        <FaArrowCircleLeft className=" size-5" onClick={() => navigate(-1)} />
      </button>
      <ul className="flex items-center gap-x-4">{navLinks}</ul>
      <div className="w-fit h-fit flex justify-center items-center bg-gray-200 ml-auto">
        LOGO
      </div>
    </nav>
  )
}
