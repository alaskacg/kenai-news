import { motion } from "framer-motion";
import { Users, Newspaper, Clock, Radio, TrendingUp, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

export function LiveStats() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const alaskaTime = currentTime.toLocaleTimeString("en-US", {
    timeZone: "America/Anchorage",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const stats: Stat[] = [
    { 
      icon: <Clock className="h-4 w-4" />, 
      label: "Alaska Time", 
      value: alaskaTime 
    },
    { 
      icon: <Newspaper className="h-4 w-4" />, 
      label: "Stories Today", 
      value: "24",
      change: "+8",
      trend: "up"
    },
    { 
      icon: <Eye className="h-4 w-4" />, 
      label: "Readers Online", 
      value: "1,247",
      change: "+156",
      trend: "up"
    },
    { 
      icon: <Radio className="h-4 w-4" />, 
      label: "Live Updates", 
      value: "Active" 
    },
  ];

  return (
    <div className="bg-primary/5 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 overflow-x-auto gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <span className="text-accent">{stat.icon}</span>
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-semibold text-foreground">{stat.value}</span>
              {stat.change && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  stat.trend === "up" 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {stat.change}
                </span>
              )}
            </motion.div>
          ))}
          
          {/* Live indicator */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coral" />
            </span>
            <span className="text-xs font-medium text-coral uppercase tracking-wider">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}
