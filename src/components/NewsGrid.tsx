import { motion } from "framer-motion";
import { useNewsArticles } from "@/hooks/useNews";
import { useEvents } from "@/hooks/useEvents";
import { ExpandableNewsCard } from "./ExpandableNewsCard";
import { AuroraWidget } from "./AuroraWidget";
import { FloatingQuote } from "./AlaskaQuotes";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Sparkles, Calendar, MapPin, ExternalLink, Clock } from "lucide-react";

const categoryIcons: Record<string, string> = {
  festival: "🎉",
  fishing: "🎣",
  community: "👥",
  arts: "🎨",
  sports: "🏆",
  market: "🛒",
  government: "🏛️",
  outdoors: "🏔️",
  business: "💼",
};

export function NewsGrid() {
  const { data: articles, isLoading } = useNewsArticles();
  const { data: events, isLoading: eventsLoading } = useEvents();

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            <Skeleton className="h-56 rounded-xl" />
            <div className="grid md:grid-cols-2 gap-3">
              <Skeleton className="h-40 rounded-lg" />
              <Skeleton className="h-40 rounded-lg" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-36 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  const featuredArticles = articles?.filter((a) => a.is_featured) || [];
  const regularArticles = articles?.filter((a) => !a.is_featured) || [];

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate().toString(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  };

  return (
    <section id="news" className="container mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-3 gap-3"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-3">
          {/* Section Header */}
          <motion.div 
            className="flex items-center justify-between pb-2 border-b border-border"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-gradient-to-br from-accent to-aurora">
                <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-display font-bold text-foreground">
                  Latest News
                </h2>
                <p className="text-muted-foreground text-[9px]">
                  Click to expand full story
                </p>
              </div>
            </div>
          </motion.div>

          {/* Featured Article - Condensed */}
          {featuredArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {featuredArticles.slice(0, 1).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="featured" index={index} />
              ))}
            </motion.div>
          )}

          {/* Regular Articles Grid - Tighter */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {regularArticles.slice(0, 6).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.02 * index }}
              >
                <ExpandableNewsCard article={article} index={index} />
              </motion.div>
            ))}
          </div>

          {/* Additional Featured */}
          {featuredArticles.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-2"
            >
              {featuredArticles.slice(1).map((article, index) => (
                <ExpandableNewsCard key={article.id} article={article} variant="featured" index={index + 1} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-3">
          {/* Aurora Widget */}
          <AuroraWidget />

          {/* Enhanced Events Section */}
          <motion.div 
            className="bg-card rounded-lg border border-border overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="p-2.5 border-b border-border bg-gradient-to-r from-steel/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-steel" />
                  <h3 className="font-display text-xs font-bold text-card-foreground">
                    Upcoming Events
                  </h3>
                </div>
                <span className="text-[9px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  Kenai Peninsula
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {eventsLoading ? (
                <div className="p-3 space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : events && events.length > 0 ? (
                events.slice(0, 6).map((event, index) => {
                  const { month, day, weekday } = formatEventDate(event.event_date);
                  return (
                    <motion.a
                      key={event.id}
                      href={event.source_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 hover:bg-muted/50 transition-colors group"
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-md bg-steel/10 border border-steel/20 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-muted-foreground uppercase">{month}</span>
                        <span className="text-sm font-bold text-steel leading-none">{day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{categoryIcons[event.category] || "📅"}</span>
                          <h4 className="text-[11px] font-semibold text-card-foreground group-hover:text-steel transition-colors line-clamp-1">
                            {event.title}
                          </h4>
                          {event.is_featured && (
                            <span className="text-[8px] bg-coral/20 text-coral px-1 rounded">★</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                            <MapPin className="h-2 w-2" />
                            <span className="line-clamp-1">{event.location.split(',')[0]}</span>
                          </span>
                          {event.event_time && (
                            <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                              <Clock className="h-2 w-2" />
                              {event.event_time.split(' - ')[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </motion.a>
                  );
                })
              ) : (
                <div className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">No upcoming events</p>
                </div>
              )}
            </div>
            
            {events && events.length > 6 && (
              <div className="p-2 border-t border-border bg-muted/30">
                <p className="text-[9px] text-center text-muted-foreground">
                  +{events.length - 6} more events
                </p>
              </div>
            )}
          </motion.div>

          {/* Alaska Quote */}
          <FloatingQuote />

          {/* Trending Stories */}
          <motion.div 
            className="bg-card rounded-lg border-l-4 border-coral overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-2.5 border-b border-border bg-gradient-to-r from-coral/10 to-transparent">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-coral" />
                <h3 className="font-display text-xs font-bold text-card-foreground">
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
        </aside>
      </motion.div>
    </section>
  );
}
