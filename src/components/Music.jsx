
"use client"

import React, { forwardRef } from "react"

const Music = forwardRef(function Music(_, ref) {
  return (
    <audio ref={ref} loop preload="auto">
      <source src="/audio/bg.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
})

export default Music
