import { Header } from "@/components/Header";
import { NewsTicker } from "@/components/NewsTicker";
import { AlertBanner } from "@/components/AlertBanner";
import { HeroSection } from "@/components/HeroSection";
import { NewsGrid } from "@/components/NewsGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* News Ticker */}
      <NewsTicker />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Alerts */}
        <div className="container mx-auto px-4 pt-8">
          <AlertBanner />
        </div>

        {/* News Grid */}
        <NewsGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
