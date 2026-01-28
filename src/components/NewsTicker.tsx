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
        <div className="flex items-center h-12">
          {/* Breaking label with pulse */}
          <motion.div 
            className="flex items-center gap-2 pr-4 border-r border-primary-foreground/20 flex-shrink-0 z-10 bg-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative">
              <Zap className="h-4 w-4 text-gold" />
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-4 w-4 text-gold" />
              </motion.div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Breaking</span>
          </motion.div>

          {/* Secondary label */}
          <div className="flex items-center gap-2 px-4 border-r border-primary-foreground/10 flex-shrink-0 bg-primary">
            <Radio className="h-3 w-3 text-coral animate-pulse" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary-foreground/70">Live Updates</span>
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
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-gold to-coral group-hover:scale-125 transition-transform" />
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
