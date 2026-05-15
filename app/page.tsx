"use client";
import { useRef, useEffect, useState } from "react";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { useSlowScroll } from "./hooks/useSlowScroll";
import { SCENES } from "./constants";
import { Scene } from "./components/Scene";

export default function Home() {
  const containerRef = useRef(null);
  const { audioRef, startAudio, isPlaying } = useAmbientAudio();
  const slowScrollTo = useSlowScroll();
  const [currentStep, setCurrentStep] = useState(0);

  const handleBegin = () => {
    startAudio();
    const nextStep = currentStep + 1;
    if (nextStep < SCENES.length) {
      slowScrollTo(nextStep * window.innerHeight, 3500);
      setCurrentStep(nextStep);
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative bg-black"
      onClick={handleBegin}
      style={{ height: `${SCENES.length * 100}vh` }}
    >
      <audio ref={audioRef} src="/00.mp3" loop />

      {SCENES.map((scene, index) => (
        <Scene
          key={scene.id}
          scene={scene}
          index={index}
          isLast={index === SCENES.length - 1}
        />
      ))}

      {!isPlaying && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-white/20 text-[10px] tracking-[0.5em] uppercase">
          Click to begin
        </div>
      )}
    </main>
  );
}

