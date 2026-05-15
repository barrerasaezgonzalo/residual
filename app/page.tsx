"use client";

import { useRef, useEffect, useState } from "react";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { useSlowScroll } from "./hooks/useSlowScroll";
import { CHAPTERS } from "./constants";
import { Scene } from "./components/Scene";
import {
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
  motion,
} from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { audioRef, startAudio } = useAmbientAudio();
  const slowScrollTo = useSlowScroll();
  const { scrollY } = useScroll();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [chapterIndex, setChapterIndex] = useState(0);

  const currentScenes = CHAPTERS[chapterIndex].imagenes;

  const changeChapter = (e: React.MouseEvent, direccion: "sig" | "prev") => {
    e.preventDefault();
    e.stopPropagation();

    setChapterIndex((prev) => {
      const current = Number(prev);
      return direccion === "sig"
        ? (current + 1) % CHAPTERS.length
        : (current - 1 + CHAPTERS.length) % CHAPTERS.length;
    });

    window.scrollTo(0, 0);
    setCurrentStep(0);
    setHasScrolled(false);
  };

  const handleBegin = () => {
    startAudio();
    if (currentStep < currentScenes.length - 1) {
      const nextStep = currentStep + 1;
      slowScrollTo(nextStep * window.innerHeight, 3500);
    } else {
      slowScrollTo(0, 3500);
      setHasScrolled(false);
      setCurrentStep(0);
    }
  };

  useMotionValueEvent(scrollY, "change", (value) => {
    setHasScrolled(value > 50);
    setCurrentStep(Math.round(value / window.innerHeight));
  });

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch(() => {});
  }, [chapterIndex, audioRef]);

  return (
    <>
      <nav className="fixed inset-0 pointer-events-none z-[9999] flex items-center justify-between px-6">
        <button
          type="button"
          onClick={(e) => changeChapter(e, "prev")}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full text-white/20 hover:text-white/100 hover:bg-white/5 transition-all duration-500"
        >
          <span className="text-2xl font-light">←</span>
        </button>

        <button
          type="button"
          onClick={(e) => changeChapter(e, "sig")}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full text-white/20 hover:text-white/100 hover:bg-white/5 transition-all duration-500"
        >
          <span className="text-2xl font-light">→</span>
        </button>
      </nav>

      <main
        ref={containerRef}
        className="relative bg-black cursor-pointer"
        onClick={handleBegin}
        style={{ height: `${currentScenes.length * 100}vh` }}
      >
        <audio
          key={`audio-cap-${chapterIndex}`}
          ref={audioRef}
          src={CHAPTERS[chapterIndex].musica}
          loop
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={chapterIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            {currentScenes.map((scene, index) => (
              <Scene
                key={`cap-${chapterIndex}-img-${index}`}
                scene={scene}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div
          className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/20 text-[10px] tracking-[0.5em] uppercase transition-opacity duration-700 ${
            !hasScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Click to begin
        </div>
      </main>
    </>
  );
}
