import { motion } from "framer-motion";
import { Clock, ArrowRight, Fish, TreePine, Users, Cloud, Briefcase, Trophy, Newspaper } from "lucide-react";
import { NewsArticle } from "@/hooks/useNews";
import salmonImage from "@/assets/salmon-run.jpg";

const categoryIcons = {
  local: Newspaper,
  outdoors: TreePine,
  wildlife: Fish,
  community: Users,
  weather: Cloud,
  business: Briefcase,
  sports: Trophy,
};

const categoryColors = {
  local: "bg-accent/10 text-accent",
  outdoors: "bg-aurora/10 text-aurora",
  wildlife: "bg-coral/10 text-coral",
  community: "bg-accent/10 text-accent",
  weather: "bg-accent/10 text-accent",
  business: "bg-warning/10 text-warning",
  sports: "bg-coral/10 text-coral",
};

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

export function NewsCard({ article, variant = "default", index = 0 }: NewsCardProps) {
  const Icon = categoryIcons[article.category] || Newspaper;
  const colorClass = categoryColors[article.category] || "bg-muted text-muted-foreground";

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Use salmon image for wildlife articles as a placeholder
  const imageUrl = article.image_url || (article.category === "wildlife" ? salmonImage : null);

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-2xl bg-card hover-lift cursor-pointer"
      >
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
              <Icon className="h-3 w-3" />
              <span className="capitalize">{article.category}</span>
            </span>
            {article.is_breaking && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-coral text-coral-foreground">
                Breaking
              </span>
            )}
          </div>
          <h3 className="text-xl font-display font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatTime(article.published_at)}
            </span>
            <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read more <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group flex gap-4 py-4 border-b border-border last:border-0 cursor-pointer"
      >
        {imageUrl && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium capitalize ${colorClass} px-2 py-0.5 rounded-full`}>
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTime(article.published_at)}
            </span>
          </div>
          <h4 className="font-medium text-card-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h4>
        </div>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden hover-lift cursor-pointer border border-border"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            <Icon className="h-3 w-3" />
            <span className="capitalize">{article.category}</span>
          </span>
        </div>
        <h3 className="font-display font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatTime(article.published_at)}
        </span>
      </div>
    </motion.article>
  );
}
