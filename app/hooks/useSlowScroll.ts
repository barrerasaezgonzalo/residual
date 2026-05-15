import { useCallback, useRef } from "react";

export function useSlowScroll() {
  const animationFrame = useRef<number | null>(null);

  const scrollTo = useCallback((targetY: number, duration: number = 3000) => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    const startingY = window.pageYOffset;

    const diff = targetY - startingY;

    let startTime: number | null = null;

    const easing = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startingY + diff * easing(progress));

      if (timeElapsed < duration) {
        animationFrame.current = window.requestAnimationFrame(step);
      }
    };

    animationFrame.current = window.requestAnimationFrame(step);
  }, []);

  return scrollTo;
}
