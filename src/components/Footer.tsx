import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, ExternalLink, Sparkles } from "lucide-react";
import kenaiLogo from "@/assets/kenai-news-logo.jpg";

const footerLinks = {
  news: ["Local News", "Outdoors", "Wildlife", "Community", "Weather", "Sports"],
  about: ["About Us", "Contact", "Advertise", "Careers", "Terms", "Privacy"],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="mb-4">
                <img 
                  src={kenaiLogo} 
                  alt="Kenai News" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Your trusted source for local news, weather, and community updates from 
                Alaska's beautiful Kenai Peninsula.
              </p>
            </motion.div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Kenai, Alaska 99611</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(907) 555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>news@kenainews.com</span>
              </div>
            </div>
          </div>

          {/* News Links */}
          <div>
            <h4 className="font-semibold mb-4">News</h4>
            <ul className="space-y-2">
              {footerLinks.news.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Alaska Listings Ad */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Get the latest news delivered to your inbox every morning.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Alaska Listings Advertisement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-accent/20 via-aurora/20 to-accent/20 border border-primary-foreground/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-accent/20">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-semibold bg-coral text-coral-foreground rounded-full">BETA</span>
                  <h4 className="font-display font-bold text-lg">Alaska Listings</h4>
                </div>
                <p className="text-sm text-primary-foreground/80 max-w-md">
                  Discover Alaska's newest private listings marketplace! Regional pages for every corner of Alaska — 
                  from Kenai to Fairbanks, Anchorage to Juneau.
                </p>
                <p className="text-sm font-medium text-accent mt-2">
                  🎉 Get a FREE 60-day listing during our Beta launch!
                </p>
              </div>
            </div>
            <a 
              href="https://aklistings.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-all hover:scale-105 whitespace-nowrap"
            >
              Visit aklistings.com
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>© {new Date().getFullYear()} Kenai News. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>A property of <span className="text-primary-foreground/70 font-medium">Alaska Listings LLC</span></p>
          </div>
          <p>Made with ❤️ in Alaska</p>
        </div>
      </div>
    </footer>
  );
}
