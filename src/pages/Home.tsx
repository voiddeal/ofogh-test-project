import ImageCarousel from "../components/image-carousel/ImageCarousel"
import monitorImage from "../../public/monitor.png"
import HomeGelAnimation from "../components/HomeGelAnimation"

export default function HomePage() {
  return (
    <main className="relative w-dvw">
      <img
        src="home-bg.jpg"
        alt="image background"
        className="fixed w-dvw h-dvh object-cover -z-20"
      />
      <HomeGelAnimation />
      <section className="w-full h-[calc(100dvh-3rem)] flex justify-center items-center">
        <div className="relative 2xl:w-[100rem] xl:w-[50rem] w-[45rem] mx-auto">
          <img
            src={monitorImage}
            alt="Monitor Image"
            className="size-full object-contain"
          />
          <ImageCarousel />
        </div>
      </section>
    </main>
  )
}
