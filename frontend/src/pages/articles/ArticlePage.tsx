import { Clock, Eye } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { md } from "../../utils/md.ts";
import { Navigate, useNavigate, useParams } from "react-router";
import { useArticles } from "../../context/ArticleContext.tsx";
import Loader from "../../components/Loader.tsx";
import type { ArticleType } from "../../types";

export default function ArticlePage() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { articles } = useArticles();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<ArticleType | null>(null);
  const { fetchArticle } = useArticles();
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  if (!articleSlug) return <Navigate to="/articles" />;

  useEffect(() => {
    if (hasFetched.current) return; // second mount -> skip
    hasFetched.current = true;

    (async () => {
      const { success, data, message } = await fetchArticle(articleSlug);
      if (success && data) setArticle(data);
      else alert(message);
      setLoading(false);
    })();
  }, [articleSlug]);

  const markdownContent = useMemo(
    () => (article ? md.render(article.content) : ""),
    [article],
  );

  if (loading) return <Loader />;
  if (!article) return <Navigate to="/articles" />;

  const navigateArticle = (slug: string) => {
    navigate(`/articles/${slug}`);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col mt-8 px-4">
      <img
        src={article.image}
        alt={article.slug}
        className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full object-cover rounded-lg"
      />
      <h2 className="text-4xl font-bold mt-6 mb-4 leading-[60px]">
        {article.title}
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        {article.tags.split(",").map((tag, id) => (
          <span key={id} className="bg-orange-700 rounded-full px-5 py-2">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 mb-20">
        <div className="flex gap-1 items-center text-neutral-300">
          <Clock size={20} />
          <span className="">{article.created_at.split("T")[0]}</span>
        </div>
        <div className="flex gap-1 items-center text-neutral-300">
          <Eye size={20} />
          <span className="">{article.view_count}</span>
        </div>
      </div>

      {/*  Content  */}
      <div
        className="markdown-body prose-neutral prose-invert lg:prose-lg mb-18"
        dangerouslySetInnerHTML={{ __html: markdownContent }}
      />

      <h3 className="text-2xl font-semibold mb-6">Related Articles:</h3>
      <div className="flex flex-col mb-16">
        {/* Card */}
        {articles.map(
          (a) =>
            a.id !== article.id && (
              <div
                onClick={() => navigateArticle(a.slug)}
                className="flex flex-col md:flex-row gap-6 w-full rounded-xl p-4 bg-neutral-800 hover:bg-neutral-700 duration-200 cursor-pointer"
                key={a.id}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-[180px] h-[90px] rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold">{a.title}</h2>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 items-center text-neutral-300">
                      <Clock size={20} />
                      <span className="">{a.created_at.split("T")[0]}</span>
                    </div>
                    <div className="flex gap-1 items-center text-neutral-300">
                      <Eye size={20} />
                      <span className="">{a.view_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
