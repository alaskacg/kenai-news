import { motion } from "framer-motion";
import { Menu, Search, Bell, X, Sun, Moon, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import kenaiLogo from "@/assets/kenai-news-logo.jpg";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Local News", href: "#local" },
  { label: "Outdoors", href: "#outdoors" },
  { label: "Wildlife", href: "#wildlife" },
  { label: "Community", href: "#community" },
  { label: "Weather", href: "#weather" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 glass-strong border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img 
              src={kenaiLogo} 
              alt="Kenai News" 
              className="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg transition-colors group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-aurora rounded-full group-hover:w-3/4 transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.div
              className="relative"
              animate={{ width: searchOpen ? 200 : 40 }}
              transition={{ duration: 0.3 }}
            >
              {searchOpen && (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-10 pl-4 pr-10 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Search stories..."
                  autoFocus
                />
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative z-10"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            </motion.div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative group">
              <Bell className="h-5 w-5 group-hover:animate-wiggle" />
              <motion.span 
                className="absolute top-2 right-2 w-2.5 h-2.5 bg-coral rounded-full border-2 border-background"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>

            {/* Subscribe Button */}
            <motion.button
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-aurora text-accent-foreground rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.nav
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={mobileMenuOpen ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.05 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                {item.label}
              </motion.a>
            ))}
            
            {/* Mobile Subscribe */}
            <motion.button
              className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-accent to-aurora text-accent-foreground rounded-lg font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={mobileMenuOpen ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Subscribe Now
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
