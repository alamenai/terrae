"use client"

import Lottie from "lottie-react"
import upcomingAnimation from "../../public/upcoming-animation.json"

export const UpcomingAnimation = () => {
  return (
    <div className="relative isolate w-125 h-96 -mb-24 rounded-3xl overflow-hidden">
      <Lottie
        animationData={upcomingAnimation}
        loop
        className="size-full mix-blend-multiply dark:mix-blend-screen dark:invert"
      />
      <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 mix-blend-color pointer-events-none" />
    </div>
  )
}
