import { motion } from "framer-motion";
import { useMemo } from "react";

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  left: string;
  opacity: number;
  drift: number;
}

function Snowflake({ delay, duration, size, left, opacity, drift }: SnowflakeProps) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top: -20,
        opacity,
        filter: size > 4 ? "blur(0.5px)" : "none",
      }}
      initial={{ y: -20, x: 0 }}
      animate={{
        y: "100vh",
        x: [0, drift, -drift, drift / 2, 0],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
        x: {
          duration: duration * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    />
  );
}

interface SnowfallProps {
  count?: number;
}

export function Snowfall({ count = 60 }: SnowfallProps) {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 5,
      left: `${Math.random() * 100}%`,
      opacity: 0.4 + Math.random() * 0.6,
      drift: 20 + Math.random() * 40,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  );
}
