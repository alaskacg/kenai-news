import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useNewsArticles } from "@/hooks/useNews";
import heroImage from "@/assets/hero-mountains.jpg";
import { useRef } from "react";
import { HeroNewsCard } from "./HeroNewsCard";

export function HeroSection() {
  const { data: articles } = useNewsArticles();
  const breakingArticle = articles?.find((a) => a.is_breaking);
  const featuredArticles = articles?.filter((a) => a.is_featured).slice(0, 3) || [];
  const topStories = articles?.filter((a) => !a.is_breaking && !a.is_featured).slice(0, 4) || [];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const titleText = "Kenai News";

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] flex flex-col overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale }}>
        <img
          src={heroImage}
          alt="Kenai Peninsula"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute inset-0 noise-overlay" />
      </motion.div>

      {/* Animated Title - Top Center */}
      <motion.div 
        className="relative z-10 flex justify-center pt-8 md:pt-12"
        animate={{
          textShadow: [
            "0 0 20px rgba(100, 150, 200, 0.3)",
            "0 0 40px rgba(100, 150, 200, 0.5)",
            "0 0 20px rgba(100, 150, 200, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground tracking-tight flex overflow-hidden perspective-1000">
          {titleText.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: "easeOut",
              }}
              className={`inline-block ${letter === " " ? "w-3 md:w-4" : ""} hover:text-accent transition-colors duration-300`}
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ 
                scale: 1.2, 
                y: -5,
                color: "hsl(var(--accent))",
                transition: { duration: 0.2 } 
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative flex-1 flex items-end container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-5 gap-6 w-full">
          {/* Main Story - Left Column */}
          <div className="lg:col-span-3">

            {/* Breaking Badge */}
            {breakingArticle && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
              >
                <motion.span 
                  className="bg-coral text-coral-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Breaking
                </motion.span>
              </motion.div>
            )}

            {/* Main Headline */}
            {breakingArticle ? (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary-foreground leading-tight mb-3">
                  {breakingArticle.title}
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/75 mb-4 max-w-xl line-clamp-2">
                  {breakingArticle.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-primary-foreground/60">
                    <Clock className="h-3 w-3" />
                    {formatTime(breakingArticle.published_at)}
                  </span>
                  <motion.a
                    href="#"
                    className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read Story
                    <ArrowRight className="h-3 w-3" />
                  </motion.a>
                </div>
              </motion.article>
            ) : featuredArticles[0] ? (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary-foreground leading-tight mb-3">
                  {featuredArticles[0].title}
                </h1>
                <p className="text-sm md:text-base text-primary-foreground/75 mb-4 max-w-xl line-clamp-2">
                  {featuredArticles[0].excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-primary-foreground/60">
                    <Clock className="h-3 w-3" />
                    {formatTime(featuredArticles[0].published_at)}
                  </span>
                  <span className="capitalize px-2 py-0.5 rounded bg-gold/20 text-gold text-xs font-medium">
                    {featuredArticles[0].category}
                  </span>
                </div>
              </motion.article>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
                  Your trusted source for Kenai Peninsula news, weather, and community updates.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Top Stories */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary-foreground/10">
                <TrendingUp className="h-4 w-4 text-coral" />
                <h2 className="text-sm font-bold text-primary-foreground">Top Stories</h2>
              </div>
              <div className="space-y-2">
                {topStories.map((article, i) => (
                  <HeroNewsCard key={article.id} article={article} index={i} variant="compact" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
