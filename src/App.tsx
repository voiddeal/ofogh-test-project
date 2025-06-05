import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import "./App.css"

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      "/": "Home",
      "/posts": "Posts",
      "/create-post": "Create Post",
      "/view-charts": "View Charts",
    }

    document.title = pageTitles[location.pathname] || "My App"
  }, [location])

  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  )
}
