import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { useNewsArticles } from "@/hooks/useNews";
import heroImage from "@/assets/hero-kenai.jpg";

export function HeroSection() {
  const { data: articles } = useNewsArticles();
  const featuredArticle = articles?.find((a) => a.is_featured);
  const breakingArticle = articles?.find((a) => a.is_breaking);
  const heroArticle = breakingArticle || featuredArticle;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Kenai Peninsula Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-sm text-primary-foreground">
              <MapPin className="h-4 w-4" />
              Kenai Peninsula, Alaska
            </span>
            {heroArticle?.is_breaking && (
              <span className="bg-coral text-coral-foreground px-3 py-1.5 rounded-full text-sm font-semibold animate-pulse">
                Breaking
              </span>
            )}
          </motion.div>

          {/* Main Headline */}
          {heroArticle ? (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-4">
                {heroArticle.title}
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 max-w-2xl">
                {heroArticle.excerpt}
              </p>
              <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(heroArticle.published_at)}
                </span>
                <span className="capitalize px-2 py-0.5 rounded bg-primary-foreground/10">
                  {heroArticle.category}
                </span>
              </div>
            </motion.article>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight">
                Your Voice for the
                <span className="text-gradient-aurora block">Kenai Peninsula</span>
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/80 mt-6 max-w-2xl">
                Stay connected with the latest news, weather, wildlife updates, and community events
                from Alaska's stunning Kenai Peninsula.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
