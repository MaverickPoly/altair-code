import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ArticleProvider } from "./context/ArticleContext.tsx";
import { CourseProvider } from "./context/CourseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CourseProvider>
        <ArticleProvider>
          <App />
        </ArticleProvider>
      </CourseProvider>
    </AuthProvider>
  </StrictMode>,
);
