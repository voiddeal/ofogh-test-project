import Slider from "react-slick"
import type { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import image1 from "../../../public/image-1.png"
import image2 from "../../../public/image-2.png"
import image3 from "../../../public/image-3.png"
import image4 from "../../../public/image-4.png"
import image5 from "../../../public/image-5.png"
import "./image-carousel.css"

type ImageData = string[]

const imageData: ImageData = [image1, image2, image3, image4, image5]

export default function ImageCarousel() {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: "custom-dots",
  }

  const images = imageData.map((data) => {
    return <img src={data} alt="image" className="size-full object-cover" />
  })

  return (
    <div className="absolute w-[78%] top-[.5rem] pr-1 inset-x-0 mx-auto bg-transparent overflow-hidden">
      <Slider className="relative size-full" {...settings}>
        {images}
      </Slider>
    </div>
  )
}
