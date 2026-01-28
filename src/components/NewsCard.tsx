import { motion } from "framer-motion";
import { Clock, ArrowUpRight, BookmarkPlus, Share2 } from "lucide-react";
import type { NewsArticle } from "@/hooks/useNews";
import salmonImage from "@/assets/salmon-run.jpg";

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

  if (variant === "compact") {
    return (
      <motion.article
        className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
        whileHover={{ x: 4 }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-aurora/20 flex items-center justify-center text-sm font-bold text-accent">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatTime(article.published_at)}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span className="capitalize">{article.category}</span>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100" />
      </motion.article>
    );
  }

  if (variant === "featured") {
    return (
      <motion.article
        className="relative overflow-hidden rounded-2xl group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4 }}
      >
        {/* Image with parallax effect */}
        <div className="relative h-[400px] md:h-[450px] overflow-hidden">
          <motion.img
            src={article.image_url || salmonImage}
            alt={article.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
          
          {/* Breaking badge */}
          {article.is_breaking && (
            <motion.div 
              className="absolute top-6 left-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="px-4 py-2 bg-coral text-coral-foreground font-bold text-xs uppercase tracking-wider rounded-lg">
                🔴 Breaking
              </span>
            </motion.div>
          )}

          {/* Category */}
          <div className="absolute top-6 right-6">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border ${categoryColors[article.category]}`}>
              {article.category}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {article.title}
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-base md:text-lg mb-6 line-clamp-2 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {article.excerpt}
            </motion.p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {formatTime(article.published_at)}
                </span>
                {article.author && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
                    <span>{article.author}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <motion.button 
                  className="p-2.5 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookmarkPlus className="h-4 w-4" />
                </motion.button>
                <motion.button 
                  className="p-2.5 rounded-lg bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
                <motion.a
                  href="#"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read More
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default card
  return (
    <motion.article
      className="group bg-card rounded-xl overflow-hidden border border-border card-hover cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={article.image_url || salmonImage}
          alt={article.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize border backdrop-blur-sm ${categoryColors[article.category]}`}>
            {article.category}
          </span>
        </div>

        {/* Bookmark */}
        <motion.button 
          className="absolute top-3 right-3 p-2 rounded-lg bg-card/80 backdrop-blur-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookmarkPlus className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-3">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTime(article.published_at)}</span>
          </div>
          <motion.span 
            className="flex items-center gap-1 text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ x: 3 }}
          >
            Read more
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
