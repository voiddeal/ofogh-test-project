import { useState, useEffect } from "react"
import type { ToastProps } from "../types/models"

export default function Toast({
  message,
  type,
  duration = 3000,
  setToast,
  initialToastValue,
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (setToast) {
        setToast({ ...initialToastValue, message: "" } as ToastProps)
      }
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-5 left-5 px-4 py-2 rounded-md text-white shadow-md ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {message}
    </div>
  )
}
