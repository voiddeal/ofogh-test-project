interface TileBGProps {
  opacity?: number
}

export default function TileBG({ opacity = 0 }: TileBGProps) {
  return (
    <div className="fixed w-dvw h-dvh -z-20">
      <div
        className="absolute size-full bg-white"
        style={{
          opacity,
        }}
      />
      <img
        src="home-bg.jpg"
        alt="image background"
        className="size-full object-cover"
      />
    </div>
  )
}
