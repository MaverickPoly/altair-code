export interface AuthContextType {
  // States
  accessToken: string | null;
  refreshToken: string | null;
  user: UserType | null;
  profile: ProfileType | null;
  loading: boolean;

  // Functionality
  login: (params: LoginType) => Promise<ReturnType>;
  register: (params: RegisterType) => Promise<ReturnType>;
  logout: () => Promise<ReturnType>;
  fetchMyProfile: () => Promise<ReturnType>;
  fetchUserProfile: (userId: number) => Promise<FetchUserProfileType>;
  markLessonComplete: (lessonId: number) => Promise<ReturnType>;
  fetchLeaderboard: () => Promise<LeaderboardReturnType>;
}

// Model Types
export interface UserType {
  id: number;
  username: string;
  email: string;
  profile: ProfileType;
}

export interface ProfileType {
  id: number;
  user: UserType;
  bio: string;
  github_account: string;

  completed_lessons: number[];
  xp: number;
  created_at: string;
  updated_at: string;
}

// Return Types
export interface ReturnType {
  success: boolean;
  message: string;
}

export interface FetchUserProfileType {
  success: boolean;
  message: string;
  data?: ProfileType;
}

export interface LeaderboardReturnType {
  success: boolean;
  message: string;
  data?: ProfileType[];
}

// Functions
export interface LoginType {
  username: string;
  password: string;
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
  bio: string;
  github_account: string;
}
