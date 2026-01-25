import { motion } from "framer-motion";
import { Sparkles, Clock, Eye } from "lucide-react";
import { useAuroraForecast } from "@/hooks/useNews";
import auroraImage from "@/assets/aurora-kenai.jpg";

export function AuroraWidget() {
  const { data: forecast } = useAuroraForecast();

  const getKpLevel = (kp: number) => {
    if (kp >= 7) return { label: "Strong Storm", color: "text-coral" };
    if (kp >= 5) return { label: "Active", color: "text-aurora" };
    if (kp >= 3) return { label: "Moderate", color: "text-accent" };
    return { label: "Quiet", color: "text-muted-foreground" };
  };

  const kpInfo = forecast ? getKpLevel(Number(forecast.kp_index)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="relative overflow-hidden rounded-2xl glow-aurora"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={auroraImage}
          alt="Aurora Borealis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-aurora/20">
            <Sparkles className="h-5 w-5 text-aurora" />
          </div>
          <h3 className="font-display text-lg font-semibold text-primary-foreground">
            Aurora Forecast
          </h3>
        </div>

        {forecast ? (
          <div className="space-y-4">
            {/* KP Index */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-foreground">
                  Kp {forecast.kp_index}
                </span>
                <span className={`text-sm font-medium ${kpInfo?.color}`}>
                  {kpInfo?.label}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-xs mb-1">
                  <Eye className="h-3 w-3" />
                  Visibility
                </div>
                <div className="text-xl font-semibold text-primary-foreground">
                  {forecast.visibility_chance}%
                </div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-xs mb-1">
                  <Clock className="h-3 w-3" />
                  Best Time
                </div>
                <div className="text-sm font-semibold text-primary-foreground">
                  {forecast.best_viewing_time || "N/A"}
                </div>
              </div>
            </div>

            {/* Progress bar for visibility */}
            <div className="space-y-1">
              <div className="text-xs text-primary-foreground/60">Tonight's Chance</div>
              <div className="h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${forecast.visibility_chance}%` }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-full bg-gradient-aurora rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-primary-foreground/60 text-sm">
            Loading aurora forecast...
          </div>
        )}
      </div>
    </motion.div>
  );
}
