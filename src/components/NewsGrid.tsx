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
    <section id="news" className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 gap-4"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Section Header */}
          <motion.div 
            className="flex items-center justify-between pb-3 border-b border-border"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-gradient-to-br from-accent to-aurora">
                <Sparkles className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-display font-bold text-foreground">
                  Latest News
                </h2>
                <p className="text-muted-foreground text-[10px]">
                  Click any article to read full story
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
          <div className="grid md:grid-cols-2 gap-3">
            {regularArticles.slice(0, 6).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * index }}
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
        <aside className="space-y-4">
          {/* Aurora Widget - Compact */}
          <AuroraWidget />

          {/* Alaska Quote */}
          <FloatingQuote />

          {/* Trending Stories - Different Frame */}
          <motion.div 
            className="bg-card rounded-lg border-l-4 border-coral overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-3 border-b border-border bg-gradient-to-r from-coral/10 to-transparent">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-coral" />
                <h3 className="font-display text-xs font-bold text-card-foreground">
                  Trending Now
                </h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {regularArticles.slice(0, 5).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="compact" index={index} />
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events - Inset Frame */}
          <motion.div 
            className="bg-gradient-forest rounded-lg p-3 ring-1 ring-inset ring-aurora/20"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-3.5 w-3.5 text-primary-foreground" />
              <h3 className="font-display text-xs font-bold text-primary-foreground">Events</h3>
            </div>
            <div className="space-y-2">
              {[
                { date: "Jan 30", event: "Kenai Ice Festival", location: "Soldotna" },
                { date: "Feb 2", event: "Wildlife Tour", location: "Homer" },
                { date: "Feb 8", event: "Fish Fry", location: "Kenai" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 group cursor-pointer"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary-foreground/10 flex flex-col items-center justify-center">
                    <span className="text-[8px] text-primary-foreground/60">{item.date.split(" ")[0]}</span>
                    <span className="text-xs font-bold text-gold">{item.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-primary-foreground group-hover:text-gold transition-colors">
                      {item.event}
                    </h4>
                    <p className="text-[10px] text-primary-foreground/60">{item.location}</p>
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
