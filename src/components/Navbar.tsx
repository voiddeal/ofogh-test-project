import { NavLink, useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"
import logo from "../../public/logo.png"

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
  const navLinks = navbarData.map((item, index) => {
    const { link, name } = item
    return (
      <li key={index}>
        <NavLink
          className="py-1 px-2 rounded-lg transition-all"
          to={link}
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#00bfbf" : "unset",
            color: isActive ? "white" : "teal",
          })}
        >
          {name}
        </NavLink>
      </li>
    )
  })

  return (
    <nav className="sticky top-0 flex items-center w-full h-12 bg-teal-200/80 backdrop-blur-md z-50 shadow">
      <button
        type="button"
        className="ml-4 mr-6 cursor-pointer disabled:cursor-not-allowed text-teal-800"
        title="Go Back"
      >
        <FaArrowCircleLeft className="size-5" onClick={() => navigate(-1)} />
      </button>
      <ul className="flex items-center gap-x-4 text-white">{navLinks}</ul>
      <div className="w-fit h-fit flex justify-center items-center ml-auto">
        <NavLink to={"/"}>
          <img src={logo} alt="logo image" className="size-12" />
        </NavLink>
      </div>
    </nav>
  )
}
