import { useEffect } from "react"

interface ModalProps {
  children: React.ReactNode
  backdropClickHandler?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
}

export default function Modal({ children, backdropClickHandler }: ModalProps) {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (typeof backdropClickHandler !== "undefined") backdropClickHandler(e)
  }

  // disable document's scroll bars
  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    document.documentElement.style.height = "100dvh"

    return () => {
      document.documentElement.style.overflow = "unset"
      document.documentElement.style.height = "auto"
    }
  }, [])

  return (
    <div
      role="dialog"
      onClick={handleBackdropClick}
      id="modal-backdrop"
      className="fixed inset-0 w-dvw h-dvh bg-black/20 backdrop-blur-lg z-50 flex justify-center items-center overflow-y-auto"
    >
      {children}
    </div>
  )
}
