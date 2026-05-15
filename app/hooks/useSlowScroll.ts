import { useCallback } from "react";

export function useSlowScroll() {
  const scrollTo = useCallback((targetY: number, duration: number = 3000) => {
    const startingY = window.pageYOffset;
    const diff = targetY - startingY;
    let startTime: number | null = null;

    const easing = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startingY + diff * easing(progress));

      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return scrollTo;
}