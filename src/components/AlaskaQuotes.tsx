import { motion } from "framer-motion";
import { Quote, Mountain } from "lucide-react";
import { useState, useEffect } from "react";

const alaskaQuotes = [
  {
    quote: "Alaska is not just a state, it's a state of mind.",
    author: "Unknown Alaskan"
  },
  {
    quote: "In a world full of ordinary, Alaska remains extraordinary.",
    author: "Jack London"
  },
  {
    quote: "The wilderness holds answers to questions we have not yet learned to ask.",
    author: "Nancy Newhall"
  },
  {
    quote: "Alaska is what happens when wilderness refuses to be tamed.",
    author: "Local Proverb"
  },
  {
    quote: "Here, the northern lights are not just lights — they are the spirits dancing.",
    author: "Native Alaskan Wisdom"
  },
  {
    quote: "Alaska: where every sunset is a masterpiece painted across a canvas of ice and fire.",
    author: "Anonymous"
  },
  {
    quote: "To the lover of wilderness, Alaska is one of the most wonderful countries in the world.",
    author: "John Muir"
  },
  {
    quote: "The call of the wild is never silent in Alaska.",
    author: "Unknown"
  }
];

export function AlaskaQuoteBanner() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % alaskaQuotes.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative bg-gradient-mountain overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20d%3D%22M0%2C224L48%2C213.3C96%2C203%2C192%2C181%2C288%2C181.3C384%2C181%2C480%2C203%2C576%2C218.7C672%2C235%2C768%2C245%2C864%2C234.7C960%2C224%2C1056%2C192%2C1152%2C181.3C1248%2C171%2C1344%2C181%2C1392%2C186.7L1440%2C192L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-center gap-4">
          <Mountain className="h-5 w-5 text-gold hidden md:block" />
          <Quote className="h-4 w-4 text-gold/70" />
          
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-primary-foreground/90 text-sm md:text-base italic font-light max-w-2xl">
              "{alaskaQuotes[currentQuote].quote}"
            </p>
            <p className="text-gold text-xs md:text-sm mt-1 font-medium">
              — {alaskaQuotes[currentQuote].author}
            </p>
          </motion.div>
          
          <Quote className="h-4 w-4 text-gold/70 rotate-180" />
          <Mountain className="h-5 w-5 text-gold hidden md:block" />
        </div>
      </div>

      {/* Quote navigation dots */}
      <div className="flex justify-center gap-1.5 pb-4">
        {alaskaQuotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentQuote 
                ? "bg-gold w-4" 
                : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function FloatingQuote() {
  const randomQuote = alaskaQuotes[Math.floor(Math.random() * alaskaQuotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-dark rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
      <Quote className="h-8 w-8 text-gold/40 mb-3" />
      <p className="text-primary-foreground/90 text-sm italic leading-relaxed">
        "{randomQuote.quote}"
      </p>
      <p className="text-gold text-xs mt-3 font-medium">
        — {randomQuote.author}
      </p>
    </motion.div>
  );
}
