import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import type { NewsArticle } from "@/hooks/useNews";

// Category-specific images
import wildlifeBear from "@/assets/wildlife-bear.jpg";
import wildlifeMoose from "@/assets/wildlife-moose.jpg";
import wildlifeEagle from "@/assets/wildlife-eagle.jpg";
import fishingBoat from "@/assets/fishing-boat.jpg";
import communityGathering from "@/assets/community-gathering.jpg";
import outdoorsKayak from "@/assets/outdoors-kayak.jpg";

interface HeroNewsCardProps {
  article: NewsArticle;
  index: number;
  variant?: "compact" | "featured";
}

const categoryImages: Record<string, string> = {
  wildlife: wildlifeBear,
  outdoors: outdoorsKayak,
  community: communityGathering,
  local: fishingBoat,
  business: fishingBoat,
  weather: communityGathering,
  sports: wildlifeEagle,
};

const categoryColors: Record<string, string> = {
  local: "bg-steel/30 text-steel",
  outdoors: "bg-accent/30 text-accent",
  wildlife: "bg-aurora/30 text-aurora",
  community: "bg-gold/30 text-gold",
  weather: "bg-coral/30 text-coral",
  business: "bg-crimson/30 text-crimson",
  sports: "bg-primary-foreground/20 text-primary-foreground",
};

export function HeroNewsCard({ article, index, variant = "compact" }: HeroNewsCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getImage = () => {
    if (article.image_url) return article.image_url;
    // Rotate through category images
    const images = [wildlifeBear, wildlifeMoose, wildlifeEagle, fishingBoat, communityGathering, outdoorsKayak];
    return categoryImages[article.category] || images[index % images.length];
  };

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        whileHover={{ y: -3 }}
        className="relative group cursor-pointer rounded-lg overflow-hidden"
      >
        <div className="relative h-28 overflow-hidden">
          <img
            src={getImage()}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          
          <div className="absolute inset-0 p-3 flex flex-col justify-end">
            <span className={`self-start px-2 py-0.5 rounded text-xs font-medium capitalize mb-1 ${categoryColors[article.category]}`}>
              {article.category}
            </span>
            <h3 className="text-sm font-semibold text-primary-foreground line-clamp-2 leading-snug group-hover:text-gold transition-colors">
              {article.title}
            </h3>
          </div>
        </div>
      </motion.article>
    );
  }

  // Compact variant
  return (
    <motion.article
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-start gap-3 py-2 border-b border-primary-foreground/10 last:border-0 cursor-pointer group"
    >
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent/40 to-aurora/40 flex items-center justify-center text-xs font-bold text-primary-foreground">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-primary-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-primary-foreground/50">
          <Clock className="h-3 w-3" />
          <span>{formatTime(article.published_at)}</span>
          <span className="w-1 h-1 rounded-full bg-primary-foreground/30" />
          <span className="capitalize">{article.category}</span>
        </div>
      </div>
      <ArrowUpRight className="h-3 w-3 text-primary-foreground/30 group-hover:text-gold transition-colors opacity-0 group-hover:opacity-100" />
    </motion.article>
  );
}
