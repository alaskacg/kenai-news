import { NewsTicker } from "@/components/NewsTicker";
import { LiveStats } from "@/components/LiveStats";
import { SecondaryTicker, WeatherBand } from "@/components/SecondaryTicker";
import { AlaskaQuoteBanner } from "@/components/AlaskaQuotes";
import { AlertBanner } from "@/components/AlertBanner";
import { HeroSection } from "@/components/HeroSection";
import { NewsGrid } from "@/components/NewsGrid";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Live Statistics Bar - Top priority */}
      <LiveStats />
      
      {/* Breaking News Ticker */}
      <NewsTicker />

      {/* Weather Band */}
      <WeatherBand />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <HeroSection />

        {/* Alaska Quote Banner */}
        <AlaskaQuoteBanner />

        {/* Secondary Updates Ticker */}
        <SecondaryTicker />

        {/* News Grid */}
        <NewsGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Theme Toggle */}
      <ThemeToggle />
    </motion.div>
  );
};

export default Index;
