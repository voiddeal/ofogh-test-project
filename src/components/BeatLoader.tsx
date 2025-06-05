import Loader from "react-spinners/BeatLoader"

export default function BeatLoader() {
  return (
    <div className="fixed h-dvh w-dvw inset-0 flex items-center justify-center backdrop-blur-lg z-30">
      <Loader color="teal" size={50} />
    </div>
  )
}
