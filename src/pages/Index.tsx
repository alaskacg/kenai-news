import { Header } from "@/components/Header";
import { NewsTicker } from "@/components/NewsTicker";
import { LiveStats } from "@/components/LiveStats";
import { SecondaryTicker, WeatherBand } from "@/components/SecondaryTicker";
import { AlaskaQuoteBanner } from "@/components/AlaskaQuotes";
import { AlertBanner } from "@/components/AlertBanner";
import { HeroSection } from "@/components/HeroSection";
import { RegionalUpdates } from "@/components/RegionalUpdates";
import { NewsGrid } from "@/components/NewsGrid";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breaking News Ticker - Top priority */}
      <NewsTicker />
      
      {/* Live Statistics Bar */}
      <LiveStats />

      {/* Weather Band */}
      <WeatherBand />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <HeroSection />

        {/* Alaska Quote Banner */}
        <AlaskaQuoteBanner />

        {/* Secondary Updates Ticker */}
        <SecondaryTicker />

        {/* Alerts Section */}
        <section className="container mx-auto px-4 pt-6">
          <AlertBanner />
        </section>

        {/* Regional Updates - Interactive Map/Cards */}
        <RegionalUpdates />

        {/* News Grid */}
        <NewsGrid />
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Index;
