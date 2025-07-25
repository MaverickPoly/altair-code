import { motion } from "framer-motion";
import Tile from "./Tile";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const tiles = new Array(242).fill(1, 0, 250);
  const navigate = useNavigate();

  return (
    <section className="relative flex size-full items-center justify-center">
      <div className="flex h-dvh w-full flex-wrap justify-center overflow-y-clip">
        {/* Grid Background */}
        {tiles.map((_, i) => (
          <Tile key={i} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 mb-10 flex flex-col items-center justify-center gap-5">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tight text-neutral-100"
        >
          Altair Code
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="w-1/2 text-center text-xl tracking-wide text-white"
        >
          Learn, Code, Compete, Connect: Your Journey to Mastery
        </motion.p>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="pointer-events-auto rounded-full border border-primary-500 bg-zinc-950 px-10 py-3 font-semibold text-primary-500 cursor-pointer"
          onClick={() => {
            navigate("/courses");
          }}
        >
          Start
        </motion.button>
      </div>
    </section>
  );
};
export default HeroSection;
