import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin, ArrowRight, Play } from "lucide-react";
import { useNewsArticles } from "@/hooks/useNews";
import heroImage from "@/assets/hero-kenai.jpg";
import { useRef } from "react";

export function HeroSection() {
  const { data: articles } = useNewsArticles();
  const featuredArticle = articles?.find((a) => a.is_featured);
  const breakingArticle = articles?.find((a) => a.is_breaking);
  const heroArticle = breakingArticle || featuredArticle;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
    <section ref={sectionRef} className="relative min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale }}>
        <img
          src={heroImage}
          alt="Kenai Peninsula Landscape"
          className="w-full h-full object-cover"
        />
        {/* Complex gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        
        {/* Animated noise texture */}
        <div className="absolute inset-0 noise-overlay" />
        
        {/* Decorative aurora glow */}
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-aurora/20 rounded-full blur-[100px]"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gold/15 rounded-full blur-[80px]"
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            x: [-20, 20, -20],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl">
          {/* Top badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="glass-dark px-4 py-2 rounded-full flex items-center gap-2 text-sm text-primary-foreground">
              <MapPin className="h-4 w-4 text-gold" />
              Kenai Peninsula, Alaska
            </span>
            {heroArticle?.is_breaking && (
              <motion.span 
                className="bg-gradient-to-r from-coral to-crimson text-coral-foreground px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
                animate={{ 
                  boxShadow: ["0 0 20px rgba(217, 83, 79, 0.3)", "0 0 40px rgba(217, 83, 79, 0.5)", "0 0 20px rgba(217, 83, 79, 0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔴 Breaking News
              </motion.span>
            )}
          </motion.div>

          {/* Main Headline */}
          {heroArticle ? (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {heroArticle.title}
              </motion.h1>
              <motion.p 
                className="text-lg md:text-2xl text-primary-foreground/85 mb-8 max-w-2xl font-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {heroArticle.excerpt}
              </motion.p>
              <motion.div 
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatTime(heroArticle.published_at)}
                  </span>
                  <span className="capitalize px-3 py-1 rounded-full bg-gold/20 text-gold font-medium text-xs">
                    {heroArticle.category}
                  </span>
                </div>
                <motion.a
                  href="#"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-aurora text-accent-foreground rounded-xl font-semibold hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.div>
            </motion.article>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[1.05]">
                Your Voice for the
                <span className="block text-gradient-aurora animate-aurora bg-gradient-aurora">Kenai Peninsula</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/85 mt-8 max-w-2xl font-light leading-relaxed">
                Stay connected with the latest news, weather, wildlife updates, and community events
                from Alaska's stunning Kenai Peninsula.
              </p>
              <motion.div 
                className="flex flex-wrap gap-4 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="#news"
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-aurora text-accent-foreground rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-accent/25 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Stories
                  <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#video"
                  className="flex items-center gap-2 px-8 py-4 glass text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary-foreground/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="h-5 w-5 text-gold" />
                  Watch Live
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Side stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden xl:flex absolute right-8 bottom-24 flex-col gap-4"
        >
          {[
            { value: "12°F", label: "Current Temp" },
            { value: "4.5 Kp", label: "Aurora Index" },
            { value: "High", label: "Tide at 2PM" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-dark rounded-xl px-5 py-4 text-center min-w-[120px]"
              whileHover={{ scale: 1.05, x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-gold">{stat.value}</div>
              <div className="text-xs text-primary-foreground/60 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-gold rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
