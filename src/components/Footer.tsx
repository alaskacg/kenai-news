import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-aurora flex items-center justify-center">
                  <span className="text-xl font-display font-bold">K</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Kenai Peninsula</h3>
                  <p className="text-xs text-primary-foreground/60">News & Community</p>
                </div>
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

          {/* Newsletter */}
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Kenai Peninsula News. All rights reserved.</p>
          <p>Made with ❤️ in Alaska</p>
        </div>
      </div>
    </footer>
  );
}
