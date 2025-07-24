import { useAuth } from "../context/AuthContext.tsx";
import { useEffect, useState } from "react";
import type { ProfileType } from "../types";
import { Link } from "react-router";

export default function LeaderboardPage() {
  const { fetchLeaderboard } = useAuth();
  const [profiles, setProfiles] = useState<ProfileType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { success, message, data } = await fetchLeaderboard();

      if (success && data) {
        setProfiles(data);
      } else {
        alert(message);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">🏆 Leaderboard</h1>

      <div className="space-y-4">
        {profiles.map((profile, idx) => (
          <Link
            key={profile.id}
            to={`/user/${profile.id}`}
            className="flex justify-between items-center p-4 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold w-8 text-right">
                #{idx + 1}
              </span>
              <span className="text-xl font-medium">
                {profile.user.username}
              </span>
            </div>
            <span className="text-orange-400 text-xl font-semibold">
              {profile.xp} XP
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
