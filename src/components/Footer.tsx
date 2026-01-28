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

      <div className="container mx-auto px-4 py-10 md:py-14 relative">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="mb-4">
                <img 
                  src={kenaiLogo} 
                  alt="Kenai News" 
                  className="h-12 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-xs text-primary-foreground/70 leading-relaxed max-w-sm">
                Your trusted source for local news, weather, and community updates from 
                Alaska's breathtaking Kenai Peninsula.
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="space-y-2 text-xs text-primary-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                <MapPin className="h-3 w-3" />
                <span>Kenai, Alaska 99611</span>
              </div>
              <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                <Phone className="h-3 w-3" />
                <span>(907) 555-0123</span>
              </div>
              <div className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer">
                <Mail className="h-3 w-3" />
                <span>news@kenainews.com</span>
              </div>
            </motion.div>
          </div>

          {/* News Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-sm mb-4 text-primary-foreground">News</h4>
            <ul className="space-y-2">
              {footerLinks.news.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-primary-foreground/60 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-sm mb-4 text-primary-foreground">Regions</h4>
            <ul className="space-y-2">
              {footerLinks.regions.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-primary-foreground/60 hover:text-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-sm mb-4 text-primary-foreground">Stay Connected</h4>
            <p className="text-xs text-primary-foreground/60 mb-3">
              Get Alaska news in your inbox.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                />
                <motion.button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-gold text-gold-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-3 w-3" />
                </motion.button>
              </div>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-2 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="p-2 rounded-lg bg-primary-foreground/5 text-primary-foreground/50 hover:bg-gold/20 hover:text-gold transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alaska Listings Advertisement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-5 rounded-xl overflow-hidden mb-8"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/15 via-aurora/10 to-gold/15" />
          <div className="absolute inset-[1px] rounded-xl bg-gradient-midnight/80 backdrop-blur-sm" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-gold/30 to-accent/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Mountain className="h-6 w-6 text-gold" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.span 
                    className="px-2 py-0.5 text-xs font-bold bg-coral text-coral-foreground rounded-full"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    BETA
                  </motion.span>
                  <h4 className="font-display font-bold text-base text-primary-foreground">Alaska Listings</h4>
                </div>
                <p className="text-xs text-primary-foreground/70 max-w-md">
                  Alaska's newest marketplace! <span className="text-gold font-semibold">FREE 60-day listing</span> during Beta.
                </p>
              </div>
            </div>
            <motion.a 
              href="https://aklistings.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold to-gold/80 text-gold-foreground font-bold text-xs hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              aklistings.com
              <ExternalLink className="h-3 w-3" />
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
            <p>© {new Date().getFullYear()} Kenai News</p>
            <span className="hidden md:inline text-primary-foreground/20">•</span>
            <p>A property of <span className="text-gold font-medium">Alaska Listings LLC</span></p>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-coral fill-coral" /> in Alaska
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
