import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useNewsTicker } from "@/hooks/useNews";

export function NewsTicker() {
  const { data: tickerMessages } = useNewsTicker();

  if (!tickerMessages || tickerMessages.length === 0) return null;

  // Duplicate messages for seamless loop
  const allMessages = [...tickerMessages, ...tickerMessages];

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center h-10">
          {/* Breaking label */}
          <div className="flex items-center gap-2 pr-4 border-r border-primary-foreground/20 flex-shrink-0 z-10 bg-primary">
            <Zap className="h-4 w-4 text-coral animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">Live Updates</span>
          </div>

          {/* Scrolling ticker */}
          <div className="flex-1 overflow-hidden ml-4">
            <motion.div
              className="flex items-center gap-8 whitespace-nowrap animate-ticker"
              style={{ width: "fit-content" }}
            >
              {allMessages.map((item, index) => (
                <span key={`${item.id}-${index}`} className="text-sm flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral/80" />
                  {item.message}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
