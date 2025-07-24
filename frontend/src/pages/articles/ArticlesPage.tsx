import ArticleCard from "../../components/ArticleCard.tsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useArticles } from "../../context/ArticleContext.tsx";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ArticlesPage() {
  const [search, setSearch] = useState("");
  const { fetchArticles, articles } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { success, message } = await fetchArticles();
      if (success) {
        // alert(message);
      } else {
        alert(message);
      }
    };

    fetch();
  }, []);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return !query
      ? articles
      : articles.filter((a) => a.title.toLowerCase().includes(query));
  }, [articles, search]);

  return (
    <div className="max-w-5xl mx-auto flex flex-col px-4">
      <h2 className="title mb-5">Articles</h2>

      {/* Search */}
      <div className="flex items-center px-2 lg:px-8 py-3 rounded-xl gap-4 w-full border border-neutral-600 hover:border-orange-800 mb-6 focus-within:border-orange-800">
        <Search size={25} />
        <input
          className="outline-none flex-1 text-lg"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <motion.div
        key={filteredArticles.length}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        animate="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {filteredArticles.map((article) => {
          return (
            <motion.div
              key={article.id}
              variants={cardVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ArticleCard article={article} navigate={navigate} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
