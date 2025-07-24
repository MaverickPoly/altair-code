import { Link } from "react-router";
import { type ReactNode, useState } from "react";
import { Info, Lock, LogIn, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext.tsx";

interface LinkProps {
  url: string;
  title: string;
  icon?: ReactNode;
  onNavigate?: () => void;
}

function NavLink({ url, title, icon }: LinkProps) {
  return (
    <Link
      to={url}
      className="flex items-center gap-1 text-neutral-400 hover:text-neutral-100 duration-200"
    >
      {icon && icon}
      <span className="text-lg lg:text-xl">{title}</span>
    </Link>
  );
}

function NavLinkMobile({ url, title, icon, onNavigate }: LinkProps) {
  return (
    <Link
      to={url}
      onClick={onNavigate}
      className="flex items-center gap-1 text-neutral-400 hover:text-neutral-100 duration-200 w-full border-b border-neutral-600 py-4"
    >
      {icon && icon}
      <span className="text-xl">{title}</span>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, accessToken, profile } = useAuth();

  const isAuthenticated = !(!loading && !accessToken);

  return (
    <nav className="bg-neutral-900/90 sticky top-0 left-0 w-full backdrop:blur-xl py-1 px-6 md:px-12 lg:px-24 flex justify-between border-b border-neutral-600 z-[40]">
      <Link to="/" className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-14 h-14 rounded-full object-cover"
        />
        <span className="font-bold text-2xl tracking-tight">Altair Code</span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <NavLink url="/courses" title="Courses" />
            <NavLink url="/articles" title="Articles" />
            <NavLink url="/leaderboard" title="Leaderboard" />
            <NavLink
              url={`/user/${profile?.id}`}
              title="Profile"
              icon={<User size={20} />}
            />
          </>
        ) : (
          <>
            <NavLink
              url="/auth/login"
              title="Login"
              icon={<LogIn size={20} />}
            />
            <NavLink
              url="/auth/register"
              title="Register"
              icon={<Lock size={20} />}
            />
          </>
        )}
        <NavLink url="/about" title="About" icon={<Info size={20} />} />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center">
        <button
          className="hover:bg-neutral-700 cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen w-screen bg-neutral-900 shadow-lg md:hidden inset-0 z-[999]"
          >
            <button
              className="absolute top-4 right-5 hover:bg-neutral-700 cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X size={26} />
            </button>
            <div className="flex flex-col items-center mt-20 w-[400px] mx-auto px-4">
              {isAuthenticated ? (
                <>
                  <NavLinkMobile
                    url="/courses"
                    title="Courses"
                    onNavigate={() => setIsOpen(false)}
                  />
                  <NavLinkMobile
                    url="/articles"
                    title="Articles"
                    onNavigate={() => setIsOpen(false)}
                  />
                  <NavLinkMobile
                    url="/leaderboard"
                    title="Leaderboard"
                    onNavigate={() => setIsOpen(false)}
                  />
                  <NavLinkMobile
                    onNavigate={() => setIsOpen(false)}
                    url={`/users/${profile?.id}`}
                    title="Profile"
                    icon={<User size={20} />}
                  />
                </>
              ) : (
                <>
                  <NavLinkMobile
                    onNavigate={() => setIsOpen(false)}
                    url="/auth/login"
                    title="Login"
                    icon={<LogIn size={20} />}
                  />
                  <NavLinkMobile
                    url="/auth/register"
                    title="Register"
                    icon={<Lock size={20} />}
                    onNavigate={() => setIsOpen(false)}
                  />
                </>
              )}
              <NavLinkMobile
                url="/about"
                title="About"
                icon={<Info size={20} />}
                onNavigate={() => setIsOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
