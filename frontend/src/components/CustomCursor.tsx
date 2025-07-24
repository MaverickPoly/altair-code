import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const translateX = useTransform(mouseX, (v) => v - 16);
  const translateY = useTransform(mouseY, (v) => v - 16);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ translateX, translateY }}
    >
      <div
        className="w-8 h-8 rounded-full bg-orange-500/60
                   backdrop-blur-sm mix-blend-difference"
      />
    </motion.div>
  );
}
