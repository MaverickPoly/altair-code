import { Link } from "react-router";

interface LinkProps {
  title: string;
  url: string;
  blank?: boolean;
}

function FooterLink(props: LinkProps) {
  return (
    <Link
      to={props.url}
      target={props.blank ? "_blank" : ""}
      className="text-lg text-neutral-300 hover:text-neutral-100"
    >
      {props.title}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-neutral-700 md:px-20 lg:px-32 py-14 flex flex-col md:flex-row items-center justify-start md:gap-20 lg:gap-32">
      <p className="text-xl">
        Copyright © {new Date().getFullYear()}{" "}
        <span className="font-bold text-orange-400">Altair Tech.</span>
      </p>
      {/* Links */}
      <div className="flex items-center gap-10">
        <FooterLink title="About" url="/about" />
        <FooterLink title="Articles" url="/articles" />
        <FooterLink title="Learn" url="/courses" />
        <FooterLink
          title="Github"
          url="https://github.com/MaverickPoly/altair-code-web"
          blank={true}
        />
      </div>
    </footer>
  );
}
