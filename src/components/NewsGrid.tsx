import { motion } from "framer-motion";
import { useNewsArticles } from "@/hooks/useNews";
import { NewsCard } from "./NewsCard";
import { AuroraWidget } from "./AuroraWidget";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsGrid() {
  const { data: articles, isLoading } = useNewsArticles();

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] rounded-2xl" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  const featuredArticles = articles?.filter((a) => a.is_featured) || [];
  const regularArticles = articles?.filter((a) => !a.is_featured) || [];

  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Latest Stories
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View all →
            </a>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="grid gap-6">
              {featuredArticles.slice(0, 1).map((article, index) => (
                <NewsCard key={article.id} article={article} variant="featured" index={index} />
              ))}
            </div>
          )}

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {regularArticles.slice(0, 4).map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Aurora Widget */}
          <AuroraWidget />

          {/* Trending Stories */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">
              Trending Now
            </h3>
            <div className="space-y-0">
              {regularArticles.slice(0, 5).map((article, index) => (
                <NewsCard key={article.id} article={article} variant="compact" index={index} />
              ))}
            </div>
          </div>
        </aside>
      </motion.div>
    </section>
  );
}
