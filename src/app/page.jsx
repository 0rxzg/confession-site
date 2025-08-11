"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Loader from "@/components/Loader"
import SecretCode from "@/components/SecretCode"
import HeartReveal from "@/components/HeartReveal"
import ConfessionIntro from "@/components/ConfessionIntro"
import SpecialMessage from "@/components/SpecialMessage"
import PhotoGallery from "@/components/PhotoGallery"
import Music from "@/components/Music"

export default function ConfessionSite() {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const audioRef = useRef(null)

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen)
  }

  const handleUnlock = () => {
    // Play music immediately when code is unlocked
    if (audioRef.current) {
      audioRef.current.volume = 0.8
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked:", err)
      })
    }
    handleScreenChange("heartReveal")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950/35 via-black/40 to-fuchsia-950/35 relative overflow-hidden">
      {/* Music Component */}
      <Music ref={audioRef} />

      {/* Background Effects */}
      <div
        className="fixed inset-0 z-0 blur-xl opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 30%, rgba(236,72,153,0.7), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 blur-xl opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 75% 75%, rgba(99,102,241,0.7), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 blur-2xl opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228,193,255,0.6), transparent 40%)",
        }}
      />

      {/* Screens */}
      <AnimatePresence mode="wait">
        {currentScreen === "loader" && (
          <Loader key="loader" onComplete={() => handleScreenChange("secretCode")} />
        )}
        {currentScreen === "secretCode" && (
          <SecretCode key="secretCode" onUnlock={handleUnlock} />
        )}
        {currentScreen === "heartReveal" && (
          <HeartReveal key="heartReveal" onComplete={() => handleScreenChange("confessionIntro")} />
        )}
        {currentScreen === "confessionIntro" && (
          <ConfessionIntro key="confessionIntro" onComplete={() => handleScreenChange("message")} />
        )}
        {currentScreen === "message" && (
          <SpecialMessage key="message" onComplete={() => handleScreenChange("photos")} />
        )}
        {currentScreen === "photos" && <PhotoGallery key="photos" />}
      </AnimatePresence>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2.5,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        @tarang
      </motion.div>
    </div>
  )
}
