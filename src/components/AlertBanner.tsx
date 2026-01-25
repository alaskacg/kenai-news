import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertCircle, X } from "lucide-react";
import { useAlerts, Alert } from "@/hooks/useNews";
import { useState } from "react";

const severityConfig = {
  info: {
    icon: Info,
    className: "bg-accent/10 border-accent text-accent",
    iconClass: "text-accent",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-warning/10 border-warning text-warning",
    iconClass: "text-warning",
  },
  urgent: {
    icon: AlertCircle,
    className: "bg-coral/10 border-coral text-coral",
    iconClass: "text-coral",
  },
  emergency: {
    icon: AlertTriangle,
    className: "bg-destructive/10 border-destructive text-destructive animate-pulse-glow",
    iconClass: "text-destructive",
  },
};

export function AlertBanner() {
  const { data: alerts } = useAlerts();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeAlerts = alerts?.filter((a) => !dismissedIds.includes(a.id)) || [];

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence>
        {activeAlerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onDismiss={() => setDismissedIds([...dismissedIds, alert.id])}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss: () => void }) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      className={`rounded-lg border-l-4 p-4 ${config.className}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconClass}`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{alert.title}</h4>
          <p className="text-sm opacity-90 mt-1">{alert.message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-md hover:bg-foreground/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
