import { motion } from "framer-motion";
import { Sparkles, Clock, Eye, Moon, Star, Camera } from "lucide-react";
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
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl ${kpInfo?.glow || "glow-aurora"}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.img
          src={auroraImage}
          alt="Aurora Borealis"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/40" />
        
        {/* Animated aurora streaks */}
        <motion.div
          className="absolute inset-0 bg-gradient-aurora opacity-20"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
        
        {/* Floating stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              top: `${10 + Math.random() * 40}%`, 
              left: `${10 + Math.random() * 80}%` 
            }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          >
            <Star className="h-2 w-2 text-primary-foreground/50 fill-primary-foreground/30" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2.5 rounded-xl bg-aurora/30 backdrop-blur-sm"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-aurora" />
            </motion.div>
            <div>
              <h3 className="font-display text-lg font-bold text-primary-foreground">
                Aurora Forecast
              </h3>
              <p className="text-xs text-primary-foreground/60">Northern Lights Tonight</p>
            </div>
          </div>
          <Moon className="h-5 w-5 text-primary-foreground/40" />
        </div>

        {forecast ? (
          <div className="space-y-5">
            {/* KP Index - Large Display */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-center py-4"
            >
              <motion.div 
                className="inline-flex items-baseline gap-2"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-6xl font-headline text-primary-foreground tracking-wider">
                  Kp {forecast.kp_index}
                </span>
              </motion.div>
              <div className={`text-sm font-bold ${kpInfo?.color} mt-2 uppercase tracking-widest`}>
                {kpInfo?.label}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                className="glass-dark rounded-xl p-4 text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-xs mb-2">
                  <Eye className="h-3.5 w-3.5" />
                  Visibility
                </div>
                <div className="text-2xl font-bold text-primary-foreground">
                  {forecast.visibility_chance}%
                </div>
              </motion.div>
              <motion.div 
                className="glass-dark rounded-xl p-4 text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-xs mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  Best Time
                </div>
                <div className="text-sm font-bold text-primary-foreground">
                  {forecast.best_viewing_time || "N/A"}
                </div>
              </motion.div>
            </div>

            {/* Visibility Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-primary-foreground/60">Tonight's Chance</span>
                <span className="text-gold font-semibold">{forecast.visibility_chance}%</span>
              </div>
              <div className="h-3 bg-primary-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${forecast.visibility_chance}%` }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-aurora rounded-full relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Pro tip */}
            <motion.div 
              className="flex items-start gap-2 p-3 rounded-lg bg-gold/10 border border-gold/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Camera className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
              <p className="text-xs text-primary-foreground/80">
                <span className="text-gold font-semibold">Pro tip:</span> Head to the coast for clearer skies and less light pollution.
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles className="h-8 w-8 text-aurora/50" />
            </motion.div>
            <p className="text-primary-foreground/60 text-sm mt-3">
              Loading aurora forecast...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
