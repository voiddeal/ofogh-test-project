export interface PortalProps {
  children: React.ReactNode
  containerId?: string
}

export interface Post {
  id: number
  title: string
  body: string
  userId: string
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface ToastProps {
  message: string
  type: "success" | "error" | "info" | undefined
  duration?: number
  setToast?: React.Dispatch<React.SetStateAction<ToastProps>>
  initialToastValue?: ToastProps
}
