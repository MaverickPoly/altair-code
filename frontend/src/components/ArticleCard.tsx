import type { ArticleType } from "../types";
import { Clock, Eye } from "lucide-react";
import { type NavigateFunction } from "react-router";

interface ArticleCardProps {
  article: ArticleType;
  navigate: NavigateFunction;
}

export default function ArticleCard({ article, navigate }: ArticleCardProps) {
  return (
    <div
      className="border border-neutral-700 rounded-lg hover:border-orange-800 duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/articles/${article.slug}`)}
    >
      <div>
        <img
          src={article.image}
          alt={article.title}
          className="h-72 object-cover w-full"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {article.tags.split(",").map((tag, id) => (
            <span
              key={id}
              className="bg-orange-700 rounded-full px-4 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1 items-center text-neutral-300">
            <Clock size={20} />
            <span className="">{article.created_at.split("T")[0]}</span>
          </div>
          <div className="flex gap-1 items-center text-neutral-300">
            <Eye size={20} />
            <span className="">{article.view_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
