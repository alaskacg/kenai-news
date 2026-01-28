import { motion } from "framer-motion";
import { 
  Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, 
  ExternalLink, Sparkles, Mountain, ArrowUpRight, Heart, Send
} from "lucide-react";
import kenaiLogo from "@/assets/kenai-news-logo.jpg";

const footerLinks = {
  news: ["Local News", "Outdoors", "Wildlife", "Community", "Weather", "Sports"],
  regions: ["Kenai", "Soldotna", "Homer", "Seward", "Anchorage", "Fairbanks"],
  about: ["About Us", "Contact", "Advertise", "Careers", "Terms", "Privacy"],
};

export function Footer() {
  return (
    <footer className="relative bg-gradient-midnight text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-aurora/5 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
            <path 
              fill="currentColor" 
              d="M0,64 L80,58 L160,70 L240,50 L320,80 L400,45 L480,75 L560,35 L640,65 L720,40 L800,85 L880,30 L960,60 L1040,45 L1120,75 L1200,35 L1280,70 L1360,50 L1440,60 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="mb-6">
                <img 
                  src={kenaiLogo} 
                  alt="Kenai News" 
                  className="h-16 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-md">
                Your trusted source for local news, weather, and community updates from 
                Alaska's breathtaking Kenai Peninsula. Connecting Alaskans since 2024.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-3 text-sm text-primary-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-primary-foreground/5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Kenai, Alaska 99611</span>
              </div>
              <div className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-primary-foreground/5">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(907) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 hover:text-gold transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-primary-foreground/5">
                  <Mail className="h-4 w-4" />
                </div>
                <span>news@kenainews.com</span>
              </div>
            </motion.div>
          </div>

          {/* News Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-lg mb-6 text-primary-foreground">News</h4>
            <ul className="space-y-3">
              {footerLinks.news.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-gold transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-lg mb-6 text-primary-foreground">Regions</h4>
            <ul className="space-y-3">
              {footerLinks.regions.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-aurora/50 group-hover:bg-gold transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display font-bold text-lg mb-6 text-primary-foreground">Stay Connected</h4>
            <p className="text-sm text-primary-foreground/60 mb-5">
              Get the latest Alaska news delivered to your inbox every morning.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gold text-gold-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="p-2.5 rounded-xl bg-primary-foreground/5 text-primary-foreground/50 hover:bg-gold/20 hover:text-gold transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alaska Listings Advertisement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 rounded-2xl overflow-hidden mb-12"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-aurora/15 to-gold/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-[1px] rounded-2xl bg-gradient-midnight/80 backdrop-blur-sm" />
          
          {/* Animated border */}
          <motion.div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--gold)), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <motion.div 
                className="p-4 rounded-2xl bg-gradient-to-br from-gold/30 to-accent/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Mountain className="h-8 w-8 text-gold" />
              </motion.div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.span 
                    className="px-3 py-1 text-xs font-bold bg-coral text-coral-foreground rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    BETA
                  </motion.span>
                  <h4 className="font-display font-bold text-xl text-primary-foreground">Alaska Listings</h4>
                </div>
                <p className="text-sm text-primary-foreground/70 max-w-lg mb-3">
                  Discover Alaska's newest private listings marketplace! Regional pages for every corner of Alaska — 
                  from Kenai to Fairbanks, Anchorage to Juneau.
                </p>
                <p className="text-sm font-semibold text-gold flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Get a FREE 60-day listing during our Beta launch!
                </p>
              </div>
            </div>
            <motion.a 
              href="https://aklistings.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-gold/80 text-gold-foreground font-bold text-sm hover:shadow-xl hover:shadow-gold/20 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Visit aklistings.com
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {new Date().getFullYear()} Kenai News. All rights reserved.</p>
            <span className="hidden md:inline text-primary-foreground/20">•</span>
            <p>A property of <span className="text-gold font-medium">Alaska Listings LLC</span></p>
          </div>
          <p className="flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-coral fill-coral" /> in Alaska
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
