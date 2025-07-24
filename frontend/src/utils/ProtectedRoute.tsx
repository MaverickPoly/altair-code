import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { Navigate } from "react-router";
import Loader from "../components/Loader.tsx";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, accessToken } = useAuth();

  if (loading) return <Loader />;

  if (!loading && !accessToken) return <Navigate to="/auth/login" />;

  return children;
}
