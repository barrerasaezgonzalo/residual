import { useRef, useState } from "react";

export function useAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startAudio = async () => {
    if (!audioRef.current || isPlaying) return;

    try {
      audioRef.current.volume = 0; 
      await audioRef.current.play();
      setIsPlaying(true);

      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.15) {
          audioRef.current.volume += 0.05;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    } catch (error) {
      console.error("Audio block:", error);
    }
  };

  return { audioRef, startAudio, isPlaying };
}