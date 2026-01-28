import { motion } from "framer-motion";
import { useNewsArticles } from "@/hooks/useNews";
import { ExpandableNewsCard } from "./ExpandableNewsCard";
import { AuroraWidget } from "./AuroraWidget";
import { FloatingQuote } from "./AlaskaQuotes";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Sparkles, Calendar } from "lucide-react";

export function NewsGrid() {
  const { data: articles, isLoading } = useNewsArticles();

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-72 rounded-xl" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-48 rounded-lg" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-52 rounded-xl" />
            <Skeleton className="h-44 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  const featuredArticles = articles?.filter((a) => a.is_featured) || [];
  const regularArticles = articles?.filter((a) => !a.is_featured) || [];

  return (
    <section id="news" className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Header */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-aurora">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                Latest News
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Fresh updates from the Kenai Peninsula — Click to expand full articles
                </p>
              </div>
            </div>
          </motion.div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {featuredArticles.slice(0, 1).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="featured" index={index} />
              ))}
            </motion.div>
          )}

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {regularArticles.slice(0, 6).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
              >
                <ExpandableNewsCard article={article} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Additional Featured if available */}
          {featuredArticles.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {featuredArticles.slice(1).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="featured" index={index + 1} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Aurora Widget - Compact */}
          <AuroraWidget />

          {/* Alaska Quote */}
          <FloatingQuote />

          {/* Trending Stories - Different Frame */}
          <motion.div 
            className="bg-card rounded-xl border-l-4 border-coral overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-4 border-b border-border bg-gradient-to-r from-coral/10 to-transparent">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-coral" />
                <h3 className="font-display text-sm font-bold text-card-foreground">
                  Trending Now
                </h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {regularArticles.slice(0, 4).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="compact" index={index} />
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events - Inset Frame */}
          <motion.div 
            className="bg-gradient-forest rounded-xl p-4 ring-1 ring-inset ring-aurora/20"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary-foreground" />
              <h3 className="font-display text-sm font-bold text-primary-foreground">Events</h3>
            </div>
            <div className="space-y-3">
              {[
                { date: "Jan 30", event: "Kenai Ice Festival", location: "Soldotna" },
                { date: "Feb 2", event: "Wildlife Tour", location: "Homer" },
                { date: "Feb 8", event: "Fish Fry", location: "Kenai" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 3 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-foreground/10 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary-foreground/60">{item.date.split(" ")[0]}</span>
                    <span className="text-sm font-bold text-gold">{item.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-foreground group-hover:text-gold transition-colors">
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
