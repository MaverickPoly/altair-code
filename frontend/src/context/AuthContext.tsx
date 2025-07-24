import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  AuthContextType,
  LoginType,
  ProfileType,
  RegisterType,
  UserType,
} from "../types";
import { api } from "../utils/axios";
import { completeLesson } from "../utils/lessonServices.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken") || null,
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken") || null,
  );
  const [user, setUser] = useState<UserType | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!refreshToken) return setLoading(false);

      await refreshAccessToken();
      await fetchMyProfile();
      setLoading(false);
    })();
  }, []);

  const login = async (params: LoginType) => {
    try {
      const res = await api.post("token/", params);

      console.log("Login:");
      console.log(res.data);

      localStorage.setItem("accessToken", res.data.access);
      setAccessToken(res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      setRefreshToken(res.data.refresh);
      await fetchMyProfile();
      return { success: true, message: res.data.detail };
    } catch (e: any) {
      console.error(`Error logging in: ${e}`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error logging in!",
      };
    }
  };

  const register = async (params: RegisterType) => {
    try {
      console.log("Register params:");
      console.log(params);
      const res = await api.post("users/register/", params);

      console.log("Register:");
      console.log(res.data);

      return { success: true, message: "Registered successfully!" };
    } catch (e: any) {
      console.error(`Error registering: ${e}`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error registering!",
      };
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("users/auth/logout/");

      console.log("Logout:");
      console.log(res.data);

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setProfile(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { success: true, message: res.data.detail };
    } catch (e: any) {
      console.error(`Error logging out: ${e}`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error logging out!",
      };
    }
  };

  // My Profile
  const fetchMyProfile = async () => {
    try {
      const res = await api.get("users/profiles/");

      console.log("Fetch My Profile:");
      console.log(res.data);

      setProfile(res.data[0]);
      setUser(res.data[0].user);

      return { success: true, message: "My Profile fetched successfully!" };
    } catch (e: any) {
      console.error(`Error fetching my profile: ${e}`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error fetching my profile!",
      };
    }
  };

  // Other user's profile
  const fetchUserProfile = async (userId: number) => {
    try {
      console.log("UserId get:");
      console.log(userId);
      const res = await api.get(`users/profiles/${userId}/`);

      console.log("Fetch User Profile:");
      console.log(res.data);

      return {
        success: true,
        message: "Fetched User Profile successfully!",
        data: res.data,
      };
    } catch (e: any) {
      console.error(`Error fetching user profile: ${e}`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error fetching user profile!",
      };
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      return { success: false, message: "No refresh token available" };
    }
    try {
      const res = await api.post("token/refresh/", { refresh: refreshToken });

      console.log("Refresh Access Token:");
      console.log(res.data);

      setAccessToken(res.data.access);
      localStorage.setItem("accessToken", res.data.access);

      return { success: true, message: "Token refreshed successfully" };
    } catch (error: any) {
      console.error("Error refreshing token:", error);
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setProfile(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        success: false,
        message: error.response?.data?.detail || "Token refresh failed",
      };
    }
  };

  const markLessonComplete = async (lessonId: number) => {
    const res = await completeLesson(lessonId);
    if (res.success && profile) {
      // merge lesson & xp locally
      setProfile({
        ...profile,
        xp: res.data.xp,
        completed_lessons: [...profile.completed_lessons, lessonId],
      });
    }
    return res;
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("users/leaderboard/");
      console.log("Fetch leaderboard:");
      console.log(res.data);
      return {
        success: true,
        message: "Fetched leaderboard successfully!",
        data: res.data,
      };
    } catch (e: any) {
      console.error(`Error fetching leaderboard!`);
      return {
        success: false,
        message: e?.response?.data.detail || "Error fetching leaderboard!",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // States
        accessToken,
        refreshToken,
        user,
        profile,
        loading,

        // Functionality
        login,
        register,
        logout,
        fetchMyProfile,
        fetchUserProfile,
        markLessonComplete,
        fetchLeaderboard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
