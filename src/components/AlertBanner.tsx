import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertCircle, XCircle, X } from "lucide-react";
import { useAlerts, Alert } from "@/hooks/useNews";
import { useState } from "react";

const severityConfig = {
  info: {
    icon: Info,
    gradient: "from-steel/20 to-steel/10",
    border: "border-steel/30",
    iconColor: "text-steel",
    bg: "bg-steel/10",
  },
  warning: {
    icon: AlertTriangle,
    gradient: "from-amber-500/20 to-amber-500/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  urgent: {
    icon: AlertCircle,
    gradient: "from-coral/20 to-coral/10",
    border: "border-coral/30",
    iconColor: "text-coral",
    bg: "bg-coral/10",
  },
  emergency: {
    icon: XCircle,
    gradient: "from-crimson/30 to-crimson/20",
    border: "border-crimson/50",
    iconColor: "text-crimson",
    bg: "bg-crimson/20",
  },
};

export function AlertBanner() {
  const { data: alerts } = useAlerts();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeAlerts = alerts?.filter((a) => !dismissedIds.includes(a.id)) || [];

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-4 mb-6">
      <AnimatePresence>
        {activeAlerts.map((alert, index) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            index={index}
            onDismiss={() => setDismissedIds([...dismissedIds, alert.id])}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function AlertItem({ alert, index, onDismiss }: { alert: Alert; index: number; onDismiss: () => void }) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`relative overflow-hidden rounded-xl border ${config.border} bg-gradient-to-r ${config.gradient}`}
    >
      {/* Animated background for emergency */}
      {alert.severity === "emergency" && (
        <motion.div
          className="absolute inset-0 bg-crimson/10"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <div className="relative flex items-start gap-4 p-5">
        {/* Icon */}
        <motion.div 
          className={`p-2.5 rounded-xl ${config.bg}`}
          animate={alert.severity === "emergency" || alert.severity === "urgent" 
            ? { scale: [1, 1.1, 1] } 
            : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-display font-bold text-foreground">
              {alert.title}
            </h4>
            {(alert.severity === "emergency" || alert.severity === "urgent") && (
              <motion.span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  alert.severity === "emergency" 
                    ? "bg-crimson text-crimson-foreground" 
                    : "bg-coral text-coral-foreground"
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {alert.severity.toUpperCase()}
              </motion.span>
            )}
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {alert.message}
          </p>
        </div>

        {/* Dismiss button */}
        <motion.button
          onClick={onDismiss}
          className="p-2 rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Progress bar for expiring alerts */}
      {alert.expires_at && (
        <div className="h-1 bg-foreground/5">
          <motion.div
            className={`h-full ${config.bg}`}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ 
              duration: Math.max(0, (new Date(alert.expires_at).getTime() - Date.now()) / 1000),
              ease: "linear"
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
