import { motion } from "framer-motion";
import { Clock, ArrowUpRight, BookmarkPlus, Share2 } from "lucide-react";
import type { NewsArticle } from "@/hooks/useNews";

// Import unique images
import wildlifeBear from "@/assets/wildlife-bear.jpg";
import wildlifeMoose from "@/assets/wildlife-moose.jpg";
import wildlifeEagle from "@/assets/wildlife-eagle.jpg";
import fishingBoat from "@/assets/fishing-boat.jpg";
import communityGathering from "@/assets/community-gathering.jpg";
import outdoorsKayak from "@/assets/outdoors-kayak.jpg";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

const categoryColors: Record<string, string> = {
  local: "bg-steel/20 text-steel border-steel/30",
  outdoors: "bg-accent/20 text-accent border-accent/30",
  wildlife: "bg-aurora/20 text-aurora border-aurora/30",
  community: "bg-gold/20 text-gold border-gold/30",
  weather: "bg-coral/20 text-coral border-coral/30",
  business: "bg-crimson/20 text-crimson border-crimson/30",
  sports: "bg-primary/20 text-primary border-primary/30",
};

// Unique images per category and index
const getUniqueImage = (category: string, index: number): string => {
  const categoryImages: Record<string, string[]> = {
    wildlife: [wildlifeBear, wildlifeMoose, wildlifeEagle],
    outdoors: [outdoorsKayak, wildlifeMoose, fishingBoat],
    local: [fishingBoat, communityGathering, wildlifeEagle],
    community: [communityGathering, fishingBoat, wildlifeMoose],
    weather: [outdoorsKayak, wildlifeEagle, communityGathering],
    business: [fishingBoat, communityGathering, wildlifeBear],
    sports: [wildlifeEagle, outdoorsKayak, wildlifeBear],
  };
  const images = categoryImages[category] || [fishingBoat, wildlifeBear, outdoorsKayak];
  return images[index % images.length];
};

export function NewsCard({ article, variant = "default", index = 0 }: NewsCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const imageUrl = article.image_url || getUniqueImage(article.category, index);

  if (variant === "compact") {
    return (
      <motion.article
        className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer group"
        whileHover={{ x: 3 }}
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.04 }}
      >
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-accent/20 to-aurora/20 flex items-center justify-center text-xs font-bold text-accent">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-xs text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            <span>{formatTime(article.published_at)}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/50" />
            <span className="capitalize">{article.category}</span>
          </div>
        </div>
        <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100" />
      </motion.article>
    );
  }

  if (variant === "featured") {
    return (
      <motion.article
        className="relative overflow-hidden rounded-xl group cursor-pointer border border-border/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent" />
          
          {article.is_breaking && (
            <motion.div 
              className="absolute top-4 left-4"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="px-3 py-1 bg-coral text-coral-foreground font-bold text-xs uppercase tracking-wide rounded-md">
                🔴 Breaking
              </span>
            </motion.div>
          )}

          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold capitalize border backdrop-blur-sm ${categoryColors[article.category]}`}>
              {article.category}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-2 leading-tight">
              {article.title}
            </h2>
            <p className="text-primary-foreground/75 text-sm mb-4 line-clamp-2 max-w-lg">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary-foreground/60 text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(article.published_at)}
                </span>
                {article.author && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                    <span>{article.author}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <motion.button 
                  className="p-2 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookmarkPlus className="h-3.5 w-3.5" />
                </motion.button>
                <motion.a
                  href="#"
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold text-xs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read More
                  <ArrowUpRight className="h-3 w-3" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default card - with unique image
  return (
    <motion.article
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer shadow-sm"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3, boxShadow: "0 12px 24px -12px hsl(220 20% 14% / 0.15)" }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70" />
        
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize border backdrop-blur-sm ${categoryColors[article.category]}`}>
            {article.category}
          </span>
        </div>

        <motion.button 
          className="absolute top-2 right-2 p-1.5 rounded-md bg-card/80 backdrop-blur-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookmarkPlus className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-sm text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>{formatTime(article.published_at)}</span>
          </div>
          <motion.span 
            className="flex items-center gap-1 text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ x: 2 }}
          >
            Read
            <ArrowUpRight className="h-3 w-3" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
