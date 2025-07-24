import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";

export default function WaveButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const offset = useMotionValue(0);

  useEffect(() => {
    const c = animate(offset, 100, {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    });
    return c.stop;
  }, []);

  const bgPos = useMotionTemplate`${offset}% 0%`;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        backgroundPosition: bgPos,
        backgroundSize: "200% 100%",
        backgroundImage:
          "linear-gradient(120deg,#bd4a00 25%,#ffb17b 50%,#ff7e5f 75%)",
        cursor: "none",
      }}
      className={`relative z-10 overflow-hidden px-14 py-4 rounded-full text-xl font-semibold text-white shadow-xl hover:shadow-orange-600/50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}
