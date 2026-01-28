import { motion } from "framer-motion";
import { 
  Mail, ExternalLink, Heart, Send, Bell, Apple
} from "lucide-react";
import { SiGoogleplay } from "react-icons/si";
import alaskaListingsLogo from "@/assets/alaska-listings-logo.jpg";

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
        {/* Alaska Listings Premium Advertisement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden mb-10"
        >
          {/* Dark slate gradient background matching the logo */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2330] via-[#1e2a3a] to-[#232d3d]" />
          
          {/* Subtle tech grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-cyan-400/20" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-cyan-400/20" />
          </div>

          {/* Glowing dots like in the logo */}
          <motion.div 
            className="absolute top-8 right-20 w-2 h-2 bg-cyan-400 rounded-full blur-[2px]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-16 right-32 w-1.5 h-1.5 bg-red-500 rounded-full blur-[1px]"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-12 left-24 w-1 h-1 bg-cyan-300 rounded-full"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Logo Image */}
              <motion.div 
                className="flex-shrink-0 w-full lg:w-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={alaskaListingsLogo} 
                  alt="Alaska Listings" 
                  className="w-full lg:w-72 h-auto rounded-lg shadow-2xl shadow-black/50"
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
                  <motion.span 
                    className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 rounded-full uppercase tracking-wider"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Beta
                  </motion.span>
                  <span className="px-3 py-1 text-xs font-semibold bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
                    Free 60-Day Listings
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  Alaska's Premier Private Listings Marketplace
                </h3>
                
                <p className="text-sm md:text-base text-slate-300 mb-4 max-w-lg">
                  List anything in <span className="text-cyan-400 font-semibold">every region of Alaska</span> completely free during our beta launch. 
                  From Kenai to Fairbanks, your listings reach all of Alaska.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <motion.a 
                    href="https://aklistings.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Listing Free
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                  <span className="text-xs text-slate-400">
                    aklistings.com • No credit card required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid - Simplified */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-10">
          {/* Brand Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-3">
                Kenai News
              </h3>
              <p className="text-xs text-primary-foreground/70 leading-relaxed max-w-sm">
                Your trusted source for local news, weather, and community updates from 
                Alaska's breathtaking Kenai Peninsula.
              </p>
            </motion.div>

            {/* Contact Info - Email Only */}
            <motion.div 
              className="text-xs text-primary-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <a 
                href="mailto:support@alaskanewscorporation.com" 
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>support@alaskanewscorporation.com</span>
              </a>
            </motion.div>
          </div>

          {/* Email Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-sm mb-4 text-primary-foreground flex items-center gap-2">
              <Bell className="h-4 w-4 text-gold" />
              Email Alerts
            </h4>
            <p className="text-xs text-primary-foreground/60 mb-3">
              Get breaking news and weather alerts delivered to your inbox.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 text-xs focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
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
              <p className="text-[10px] text-primary-foreground/40">
                Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </motion.div>

          {/* Get the App */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-sm mb-4 text-primary-foreground">
              Get the App
            </h4>
            <p className="text-xs text-primary-foreground/60 mb-4">
              Stay connected with push notifications for breaking news and severe weather alerts.
            </p>
            <div className="flex flex-col gap-2">
              <motion.a
                href="#"
                className="group flex items-center gap-3 px-4 py-2.5 bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Apple className="h-6 w-6 text-primary-foreground" />
                <div className="text-left">
                  <span className="block text-[10px] text-primary-foreground/60 leading-tight">Download on the</span>
                  <span className="block text-sm font-semibold text-primary-foreground leading-tight">App Store</span>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                className="group flex items-center gap-3 px-4 py-2.5 bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl transition-all"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <SiGoogleplay className="h-5 w-5 text-primary-foreground" />
                <div className="text-left">
                  <span className="block text-[10px] text-primary-foreground/60 leading-tight">Get it on</span>
                  <span className="block text-sm font-semibold text-primary-foreground leading-tight">Google Play</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>

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
            <p>A property of <span className="text-gold font-medium">Alaska News Corporation</span></p>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-coral fill-coral" /> in Alaska
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
