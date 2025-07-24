import type { ReturnType } from "./auth.types.ts";

export interface ArticleContextType {
  articles: ArticleType[];
  fetchArticles: () => Promise<ReturnType>;
  loading: boolean;
  fetchArticle: (slug: string) => Promise<ArticleReturnType>;
}

export interface ArticleType {
  id: number;
  tags: string;
  title: string;
  slug: string;
  content: string;
  image: string; // URL
  view_count: number;

  created_at: string;
  updated_at: string;
}

export interface ArticleReturnType {
  success: boolean;
  message: string;
  data?: ArticleType;
}
