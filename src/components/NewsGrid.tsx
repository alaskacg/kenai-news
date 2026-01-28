import { motion } from "framer-motion";
import { useNewsArticles } from "@/hooks/useNews";
import { NewsCard } from "./NewsCard";
import { AuroraWidget } from "./AuroraWidget";
import { FloatingQuote } from "./AlaskaQuotes";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Sparkles, Calendar, ArrowUpRight } from "lucide-react";

export function NewsGrid() {
  const { data: articles, isLoading } = useNewsArticles();

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[450px] rounded-2xl" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-56 rounded-xl" />
              <Skeleton className="h-56 rounded-xl" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  const featuredArticles = articles?.filter((a) => a.is_featured) || [];
  const regularArticles = articles?.filter((a) => !a.is_featured) || [];

  return (
    <section id="news" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 gap-10"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Section Header */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-aurora">
                <Sparkles className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Latest Stories
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Breaking news from the Last Frontier
                </p>
              </div>
            </div>
            <motion.a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group"
              whileHover={{ x: 3 }}
            >
              View all stories
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <motion.div 
              className="grid gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {featuredArticles.slice(0, 1).map((article, index) => (
                <NewsCard key={article.id} article={article} variant="featured" index={index} />
              ))}
            </motion.div>
          )}

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {regularArticles.slice(0, 4).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <NewsCard article={article} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div 
            className="text-center pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-8 py-3 rounded-xl border-2 border-accent/30 text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              whileHover={{ scale: 1.02, borderColor: "hsl(var(--accent))" }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Stories
            </motion.button>
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Aurora Widget */}
          <AuroraWidget />

          {/* Alaska Quote */}
          <FloatingQuote />

          {/* Trending Stories */}
          <motion.div 
            className="bg-card rounded-2xl border border-border overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-5 border-b border-border bg-gradient-to-r from-coral/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-coral/20">
                  <TrendingUp className="h-5 w-5 text-coral" />
                </div>
                <h3 className="font-display text-lg font-bold text-card-foreground">
                  Trending Now
                </h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {regularArticles.slice(0, 5).map((article, index) => (
                <NewsCard key={article.id} article={article} variant="compact" index={index} />
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div 
            className="bg-gradient-forest rounded-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-primary-foreground/10">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-primary-foreground">
                Upcoming Events
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { date: "Jan 30", event: "Kenai River Ice Festival", location: "Soldotna" },
                { date: "Feb 2", event: "Winter Wildlife Viewing Tour", location: "Homer" },
                { date: "Feb 8", event: "Community Fish Fry", location: "Kenai" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group cursor-pointer"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary-foreground/10 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-foreground/60">{item.date.split(" ")[0]}</span>
                    <span className="text-lg font-bold text-gold">{item.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground group-hover:text-gold transition-colors">
                      {item.event}
                    </h4>
                    <p className="text-xs text-primary-foreground/60">{item.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </aside>
      </motion.div>
    </section>
  );
}
