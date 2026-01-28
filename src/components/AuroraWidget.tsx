import { motion } from "framer-motion";
import { Sparkles, Clock, Eye, Moon, Star } from "lucide-react";
import { useAuroraForecast } from "@/hooks/useNews";
import auroraImage from "@/assets/aurora-kenai.jpg";

export function AuroraWidget() {
  const { data: forecast } = useAuroraForecast();

  const getKpLevel = (kp: number) => {
    if (kp >= 7) return { label: "Strong Storm", color: "text-coral", glow: "glow-crimson" };
    if (kp >= 5) return { label: "Active", color: "text-aurora", glow: "glow-aurora" };
    if (kp >= 3) return { label: "Moderate", color: "text-gold", glow: "glow-gold" };
    return { label: "Quiet", color: "text-muted-foreground", glow: "" };
  };

  const kpInfo = forecast ? getKpLevel(Number(forecast.kp_index)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl border-2 border-aurora/30 ${kpInfo?.glow || ""}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={auroraImage}
          alt="Aurora Borealis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />
        
        {/* Stars */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${15 + Math.random() * 30}%`, left: `${10 + Math.random() * 80}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
          >
            <Star className="h-1.5 w-1.5 text-primary-foreground/50 fill-primary-foreground/30" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div 
              className="p-1.5 rounded-lg bg-aurora/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-aurora" />
            </motion.div>
            <h3 className="font-display text-sm font-bold text-primary-foreground">Aurora Forecast</h3>
          </div>
          <Moon className="h-4 w-4 text-primary-foreground/40" />
        </div>

        {forecast ? (
          <div className="space-y-3">
            {/* KP Index */}
            <div className="text-center py-2">
              <motion.div 
                className="inline-flex items-baseline gap-1"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-4xl font-headline text-primary-foreground tracking-wider">
                  Kp {forecast.kp_index}
                </span>
              </motion.div>
              <div className={`text-xs font-bold ${kpInfo?.color} mt-1 uppercase tracking-wider`}>
                {kpInfo?.label}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="glass-dark rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-1 text-primary-foreground/60 text-xs mb-1">
                  <Eye className="h-3 w-3" /> Chance
                </div>
                <div className="text-lg font-bold text-primary-foreground">{forecast.visibility_chance}%</div>
              </div>
              <div className="glass-dark rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-1 text-primary-foreground/60 text-xs mb-1">
                  <Clock className="h-3 w-3" /> Best Time
                </div>
                <div className="text-xs font-bold text-primary-foreground">{forecast.best_viewing_time || "After 10PM"}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${forecast.visibility_chance}%` }}
                transition={{ delay: 0.3, duration: 1 }}
                className="h-full bg-gradient-aurora rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="h-6 w-6 text-aurora/50 mx-auto" />
            </motion.div>
            <p className="text-primary-foreground/60 text-xs mt-2">Loading...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
