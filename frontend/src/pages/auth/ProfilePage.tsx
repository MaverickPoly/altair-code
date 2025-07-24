import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { BookOpenCheck, Brain, Github } from "lucide-react";
import Loader from "../../components/Loader.tsx";

import type { ProfileType } from "../../types";
import { useAuth } from "../../context/AuthContext.tsx";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchUserProfile, user: currentUser, logout } = useAuth();

  if (!userId) return;

  console.log("Current user");
  console.log(currentUser);

  useEffect(() => {
    const fetch = async () => {
      const num = parseInt(userId);
      if (isNaN(num)) {
        return navigate("/courses");
      }

      const { success, message, data } = await fetchUserProfile(num);

      if (success && data) {
        setProfile(data);
        console.log(data);
      } else {
        alert(message);
      }
    };

    fetch();
    setLoading(false);
  }, [userId]);

  const handleLogout = async () => {
    const { success, message } = await logout();

    if (success) {
      console.log(message);
    } else {
      console.error(message);
    }
  };

  if (loading) return <Loader />;
  if (!profile) return <p className="text-center mt-20">User not found</p>;
  if (!currentUser) return null;

  const { user } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      <header className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-4xl font-extrabold">
            {user.username}
          </h1>
          <h2 className="text-xl text-neutral-300 mt-3 font-semibold">
            {user.email}
          </h2>

          <div className="text-neutral-400 mt-1 flex items-center gap-2">
            <Github size={18} />
            <a
              href={profile.github_account}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 break-all"
            >
              {profile.github_account}
            </a>
          </div>

          <p className="mt-4 leading-relaxed">{profile.bio || "No bio yet."}</p>
        </div>
      </header>

      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Brain size={28} />
          <h2 className="text-xl font-bold">XP Progress:</h2>
          <span className="text-2xl font-bold text-orange-400">
            {profile.xp}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <BookOpenCheck size={27} />
          <h2 className="text-xl font-bold">Lessons completed :</h2>
          <span className="text-2xl font-bold text-orange-400">
            {profile.completed_lessons.length}
          </span>
        </div>
      </div>

      {/* TODO: Implement Logout functionality */}
      {currentUser.id === profile.user.id && (
        <button
          className="px-5 cursor-pointer py-2 text-lg rounded-lg bg-red-700 hover:bg-red-800"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

      <h3 className="text-neutral-400 mt-4">
        Member since {dayjs(profile.created_at).format("MMM D, YYYY")}
      </h3>
    </motion.div>
  );
}
