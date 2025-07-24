import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiBuymeacoffee, SiCodewars, SiWakatime } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import LinkCard from "../LinkCard.tsx";

const socialLinks = [
  { url: "https://github.com/MaverickPoly", icon: FaGithub, title: "GitHub" },
  {
    url: "https://www.youtube.com/@AltaireTech",
    icon: FaYoutube,
    title: "YouTube",
  },
  {
    url: "https://www.instagram.com/altairetech",
    icon: FaInstagram,
    title: "Instagram",
  },
  {
    url: "https://wakatime.com/@Altairetech",
    icon: SiWakatime,
    title: "Wakatime",
  },
  { url: "mailto:realahmadjon82@gmail.com", icon: MdEmail, title: "Email" },
  {
    url: "https://www.codewars.com/users/Maverick2029",
    icon: SiCodewars,
    title: "Codewars",
  },
  {
    url: "https://buymeacoffee.com/maverick_poly",
    icon: SiBuymeacoffee,
    title: "Buy Me a Coffee",
  },
];

export default function SocialLinksSection() {
  return (
    <section className="max-w-7xl mx-auto my-16 px-6">
      <h2 className="text-6xl text-center font-extrabold text-orange-500 drop-shadow mb-12">
        Let’s&nbsp;Connect.
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {socialLinks.map((link) => (
          <LinkCard key={link.url} link={link} />
        ))}
      </div>
    </section>
  );
}
