import { useRef } from "react";
import { SceneProps } from "../types";
import { motion } from "framer-motion";
import { SCENES } from "../constants";

export function Scene({ scene, index }:SceneProps) { 
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen"
      style={{ zIndex: SCENES.length - index }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {scene.image && (
          <motion.div 
          className="absolute inset-0">
            <img
              src={scene.image}
              className="h-full w-full object-cover grayscale-[0.2] brightness-[0.8]"
              alt=""
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </motion.div>
        )}

        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          {scene.title && (
            <h2 className="text-6xl font-extralight uppercase tracking-[0.6em] text-white md:text-8xl mb-8">
              {scene.title}
            </h2>
          )}

          {scene.subtitle && (
            <p className={`text-sm tracking-[0.4em] uppercase ${scene.title ? 'text-white/50 italic lowercase' : 'text-white/70'}`}>
              {scene.subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}