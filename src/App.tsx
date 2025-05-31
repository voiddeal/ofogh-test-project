import { Outlet } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/Sidebar"

export default function App() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}
