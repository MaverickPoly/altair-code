import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { Link } from "react-router";

interface SocialLinkType {
  url: string;
  icon: IconType;
  title: string;
}

export default function LinkCard({ link }: { link: SocialLinkType }) {
  return (
    <Link
      to={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="animate-border rounded-2xl w-[320px] sm:w-[360px] h-[200px]"
      >
        <div
          className="relative z-10 flex flex-col items-center justify-center
                     gap-3 h-full rounded-[calc(1rem-3px)]
                     bg-[url('/grid.svg')] bg-cover bg-center"
        >
          <link.icon size={44} className="text-orange-400" />
          <h3 className="text-xl font-semibold tracking-tight">{link.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
