import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import CoursesPage from "./pages/learn/CoursesPage.tsx";
import LessonsPage from "./pages/learn/LessonsPage.tsx";
import ArticlesPage from "./pages/articles/ArticlesPage.tsx";
import ArticlePage from "./pages/articles/ArticlePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import ProfilePage from "./pages/auth/ProfilePage.tsx";
import LessonPage from "./pages/learn/LessonPage.tsx";
import LanguageDetailsPage from "./pages/learn/LanguageDetailsPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";

const myRoutes = [
  // Base Urls
  {
    url: "/",
    component: <HomePage />,
    protected: false,
  },
  {
    url: "/about",
    component: <AboutPage />,
    protected: false,
  },
  {
    url: "/leaderboard",
    component: <LeaderboardPage />,
    protected: true,
  },

  // Auth
  {
    url: "/auth/login",
    component: <LoginPage />,
    protected: false,
  },
  {
    url: "/auth/register",
    component: <RegisterPage />,
    protected: false,
  },
  {
    url: "/user/:userId",
    component: <ProfilePage />,
    protected: true,
  },

  // Learn
  {
    url: "/courses",
    component: <CoursesPage />,
    protected: true,
  },
  {
    url: "/courses/:courseSlug",
    component: <LessonsPage />,
    protected: true,
  },
  {
    url: "/courses/:courseSlug/:lessonNumber",
    component: <LessonPage />,
    protected: true,
  },
  {
    url: "/languages/:languageSlug",
    component: <LanguageDetailsPage />,
    protected: true,
  },

  // Articles
  {
    url: "/articles",
    component: <ArticlesPage />,
    protected: true,
  },
  {
    url: "/articles/:articleSlug",
    component: <ArticlePage />,
    protected: true,
  },
];

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {myRoutes.map((route, index) => (
            <Route
              key={index}
              element={
                route.protected ? (
                  <ProtectedRoute>{route.component}</ProtectedRoute>
                ) : (
                  route.component
                )
              }
              path={route.url}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </main>
  );
}
