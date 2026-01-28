import { motion } from "framer-motion";
import { Sparkles, Eye, Clock } from "lucide-react";
import { useAuroraForecast } from "@/hooks/useNews";

export function AuroraWidgetCompact() {
  const { data: forecast } = useAuroraForecast();

  const getKpLevel = (kp: number) => {
    if (kp >= 7) return { label: "Strong Storm", color: "text-coral" };
    if (kp >= 5) return { label: "Active", color: "text-aurora" };
    if (kp >= 3) return { label: "Moderate", color: "text-gold" };
    return { label: "Quiet", color: "text-muted-foreground" };
  };

  const kpInfo = forecast ? getKpLevel(Number(forecast.kp_index)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-aurora/20 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-aurora" />
          <span className="text-sm font-semibold text-primary-foreground">Aurora Tonight</span>
        </div>
        {kpInfo && (
          <span className={`text-xs font-bold ${kpInfo.color}`}>{kpInfo.label}</span>
        )}
      </div>
      
      {forecast ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-headline text-primary-foreground">
                Kp {forecast.kp_index}
              </div>
            </div>
            <div className="h-10 w-px bg-primary-foreground/20" />
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-primary-foreground/60">
                <Eye className="h-3 w-3" />
                <span>{forecast.visibility_chance}% chance</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-foreground/60">
                <Clock className="h-3 w-3" />
                <span>{forecast.best_viewing_time || "After 10PM"}</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-aurora/30 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-aurora" />
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="h-12 flex items-center justify-center">
          <span className="text-sm text-primary-foreground/50">Loading forecast...</span>
        </div>
      )}
    </motion.div>
  );
}
