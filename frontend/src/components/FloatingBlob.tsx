import { motion } from "framer-motion";

export default function FloatingBlob({
  size = 350,
  colorFrom,
  colorTo,
  initial,
  animate,
  duration = 10,
  className = "",
}: {
  size?: number;
  colorFrom: string;
  colorTo: string;
  initial: { x: number; y: number; scale: number };
  animate: { x: number; y: number; scale: number };
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
        backgroundImage: `radial-gradient(circle at center, ${colorFrom} 0%, ${colorTo} 60%)`,
      }}
      className={`absolute rounded-full blur-3xl opacity-60 ${className}`}
    />
  );
}
