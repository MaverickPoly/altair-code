import { createContext, type ReactNode, useContext, useState } from "react";
import type { ArticleContextType, ArticleType } from "../types";
import { api } from "../utils/axios.ts";

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get("learning/articles/");

      console.log("Fetch articles:");
      console.log(res.data);

      setArticles(res.data);

      return { success: true, message: "Fetched articles successfully!" };
    } catch (e: any) {
      console.error(`Error fetching articles!`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error fetching articles!",
      };
    } finally {
      setLoading(false);
    }
  };

  const fetchArticle = async (slug: string) => {
    try {
      const res = await api.get<ArticleType>(`learning/articles/${slug}/`);

      console.log("Fetch Article:");
      console.log(res.data);

      return {
        success: true,
        message: "Fetched article successfully!",
        data: res.data,
      };
    } catch (e: any) {
      console.error(`Error fetching article!`);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error fetching article!",
      };
    }
  };

  return (
    <ArticleContext.Provider
      value={{ articles, loading, fetchArticles, fetchArticle }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticles must be used within a ArticleProvider");
  }
  return context;
};
