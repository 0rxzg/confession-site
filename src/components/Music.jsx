"use client"

import { useEffect, useRef } from "react"

export default function Music({ shouldPlay }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.volume = 0.8
      audioRef.current.play().catch((err) => {
        console.log("Autoplay failed:", err)
      })
    }
  }, [shouldPlay])

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/audio/bg.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}
