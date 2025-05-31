import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import "./App.css"
import Sidebar from "./components/Sidebar"

export default function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  )
}
