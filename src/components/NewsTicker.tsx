import { motion } from "framer-motion";
import { Zap, Radio } from "lucide-react";
import { useNewsTicker } from "@/hooks/useNews";

export function NewsTicker() {
  const { data: tickerMessages } = useNewsTicker();

  if (!tickerMessages || tickerMessages.length === 0) return null;

  // Duplicate messages for seamless loop
  const allMessages = [...tickerMessages, ...tickerMessages];

  return (
    <div className="bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-aurora/10 via-transparent to-gold/10"
          animate={{ 
            x: ["-100%", "100%"] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center h-10">
          {/* Live Updates label */}
          <div className="flex items-center gap-2 px-4 border-r border-primary-foreground/20 flex-shrink-0 bg-primary">
            <Radio className="h-3 w-3 text-coral animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/80">Live Updates</span>
          </div>

          {/* Scrolling ticker */}
          <div className="flex-1 overflow-hidden ml-4">
            <motion.div
              className="flex items-center gap-12 whitespace-nowrap animate-ticker"
              style={{ width: "fit-content" }}
            >
              {allMessages.map((item, index) => (
                <motion.span 
                  key={`${item.id}-${index}`} 
                  className="text-sm flex items-center gap-4 group"
                >
                  <span className="w-2 h-2 rounded-full bg-coral group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-gold transition-colors duration-300">
                    {item.message}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
