import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Quote,
  Newspaper,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Building2,
  Fish,
  Mountain,
  AlertTriangle,
  TrendingUp,
  Users,
  TreePine,
  Anchor,
} from "lucide-react";

/* ───────────────────── DATA ───────────────────── */

const breakingHeadlines = [
  "Kenai River dipnet fishery opens early as sockeye surge upstream — thousands line the banks",
  "Magnitude 4.2 earthquake rattles Soldotna area — no damage reported",
  "Wildfire near Funny River contained at 350 acres; evacuation orders lifted",
  "Kenai Peninsula Borough declares snow emergency after record late-season storm",
  "Coast Guard rescues two halibut fishermen off Homer Spit after vessel capsizes",
];

const articles = [
  {
    title: "Commercial Fishing Fleet Reports Record Sockeye Harvest in Cook Inlet",
    category: "Business",
    color: "bg-purple-500",
    excerpt: "Upper Cook Inlet commercial set-netters landed over 4.2 million sockeye salmon this season, the highest count since 1987, boosting the regional economy.",
    date: "January 15, 2025",
    gradient: "from-blue-900 to-cyan-900",
  },
  {
    title: "Kenai Peninsula Borough Assembly Approves $45M Infrastructure Bond",
    category: "Local",
    color: "bg-blue-500",
    excerpt: "The bond will fund critical road improvements, water-system upgrades, and a new community recreation center in the Soldotna area.",
    date: "January 14, 2025",
    gradient: "from-slate-800 to-blue-900",
  },
  {
    title: "Moose Population Survey Shows Healthy Numbers Across Borough",
    category: "Environment",
    color: "bg-green-500",
    excerpt: "Aerial surveys conducted by ADF&G confirm an estimated 8,400 moose in the borough — a 12% increase from last year's count.",
    date: "January 13, 2025",
    gradient: "from-green-900 to-emerald-950",
  },
  {
    title: "New Emergency Response Center Opens in Soldotna",
    category: "Public Safety",
    color: "bg-red-500",
    excerpt: "The state-of-the-art facility combines fire, EMS, and emergency dispatch under one roof, reducing average response times by 30%.",
    date: "January 12, 2025",
    gradient: "from-red-950 to-slate-900",
  },
  {
    title: "Seward Highway Expansion Project Enters Phase Two",
    category: "Local",
    color: "bg-blue-500",
    excerpt: "AKDOT begins widening the critical 22-mile corridor between Moose Pass and Seward, adding passing lanes and improved shoulders.",
    date: "January 11, 2025",
    gradient: "from-slate-800 to-gray-900",
  },
  {
    title: "Homer Spit Halibut Derby Draws Record Participation",
    category: "Community",
    color: "bg-amber-500",
    excerpt: "Over 12,000 anglers registered for the 2025 derby, with the winning fish tipping the scales at an impressive 327 pounds.",
    date: "January 10, 2025",
    gradient: "from-amber-950 to-slate-900",
  },
  {
    title: "Kenai Fjords National Park Sees 15% Visitor Increase",
    category: "Outdoors",
    color: "bg-teal-500",
    excerpt: "Park officials attribute the surge to expanded cruise-ship schedules and social-media exposure of Exit Glacier and Harding Icefield.",
    date: "January 9, 2025",
    gradient: "from-teal-950 to-blue-950",
  },
  {
    title: "Oil Platform Maintenance Creates 200 Temporary Jobs on Peninsula",
    category: "Business",
    color: "bg-purple-500",
    excerpt: "Hilcorp's Cook Inlet platform refurbishment brings skilled-labor demand to Kenai and Nikiski, with contracts running through late summer.",
    date: "January 8, 2025",
    gradient: "from-indigo-950 to-slate-900",
  },
];

const quotes = [
  { text: "I went to Alaska and I fell in love with the state.", author: "Jewel" },
  { text: "Alaska is what happens when Willy Wonka designs a state.", author: "Robin Williams" },
  { text: "To the lover of wilderness, Alaska is one of the most wonderful countries in the world.", author: "John Muir" },
  { text: "In Alaska, you measure distance in time, not miles.", author: "Local saying" },
  { text: "The Northern Lights are proof that even the sky can dance.", author: "Local saying" },
];

const forecast = [
  { day: "Mon", high: 46, low: 34, icon: "cloud" },
  { day: "Tue", high: 48, low: 36, icon: "sun" },
  { day: "Wed", high: 44, low: 32, icon: "rain" },
  { day: "Thu", high: 42, low: 30, icon: "cloud" },
  { day: "Fri", high: 50, low: 38, icon: "sun" },
  { day: "Sat", high: 52, low: 40, icon: "sun" },
  { day: "Sun", high: 47, low: 35, icon: "rain" },
];

const networkAds = [
  { name: "Alaska Consulting Group", url: "https://alaskaconsultinggroup.com", tagline: "Expert business consulting for Alaska enterprises" },
  { name: "Alaska Metals Exchange", url: "https://alaskametalsexchange.com", tagline: "Precious metals trading & investment" },
  { name: "Kenai Borough Realty", url: "https://kenaiboroughrealty.com", tagline: "Kenai Peninsula homes & land" },
  { name: "Alaska Drone Survey", url: "https://alaskadronesurvey.com", tagline: "Aerial mapping & surveying services" },
  { name: "Alaska Minerals Exploration", url: "https://akmineralexploration.com", tagline: "Mineral claims & exploration services" },
  { name: "Alaska Listings", url: "https://aklistings.com", tagline: "Alaska-wide classified listings" },
  { name: "Alaska Guide Listings", url: "https://alaskaguidelistings.com", tagline: "Find fishing & hunting guides" },
  { name: "Alaska Domains", url: "https://alaskadomains.com", tagline: "Premium Alaska domain names" },
];

/* ───────────────────── HELPERS ───────────────────── */

const ForecastIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "sun":
      return <Sun className="w-8 h-8 text-amber-400" />;
    case "rain":
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    default:
      return <Cloud className="w-8 h-8 text-gray-400" />;
  }
};

/* ───────────────────── COMPONENT ───────────────────── */

const Index = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [tickerOffset, setTickerOffset] = useState(0);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Animate ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => prev - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const tickerText = breakingHeadlines.join("  ●  ");
  const repeatedTicker = `${tickerText}  ●  ${tickerText}`;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* ──── 1. BREAKING NEWS TICKER ──── */}
      <div className="bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="flex items-center">
          <span className="flex-shrink-0 bg-amber-500 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 z-10">
            <AlertTriangle className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
            Breaking
          </span>
          <div className="overflow-hidden whitespace-nowrap py-2 flex-1">
            <span
              className="inline-block text-sm text-gray-300"
              style={{ transform: `translateX(${tickerOffset}px)` }}
            >
              {repeatedTicker}
            </span>
          </div>
        </div>
      </div>

      {/* ──── 2. HERO SECTION ──── */}
      <section className="relative bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/30">
                Featured Story
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-3.5 h-3.5" /> 5 min read
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Kenai River Salmon Run Forecast Exceeds Expectations for 2025 Season
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              Alaska Department of Fish &amp; Game projects 4.6 million sockeye will return to the Kenai River system this summer — the strongest forecast in over a decade, promising a banner year for commercial and sport fisheries alike.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                MK
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">By Maria Kowalski</p>
                <p className="text-xs text-gray-500">Senior Environmental Correspondent • January 16, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── SITE HEADER BAR ──── */}
      <nav className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold tracking-tight">Kenai News</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#weather" className="hover:text-white transition-colors">Weather</a>
            <a href="#news" className="hover:text-white transition-colors">Local News</a>
            <a href="#business" className="hover:text-white transition-colors">Business</a>
            <a href="#outdoors" className="hover:text-white transition-colors">Outdoors</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>
        </div>
      </nav>

      {/* ──── 3. WEATHER SECTION ──── */}
      <section id="weather" className="bg-gradient-to-br from-slate-900 to-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <Thermometer className="w-7 h-7 text-blue-400" />
            <h2 className="text-3xl font-bold">Kenai Peninsula Weather</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Conditions */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" /> Kenai, AK
                <span className="ml-auto text-xs">Updated 30 min ago</span>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <Cloud className="w-16 h-16 text-gray-300" />
                <div>
                  <p className="text-5xl font-bold">45°F</p>
                  <p className="text-gray-400 text-lg">Partly Cloudy</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <Wind className="w-5 h-5 mx-auto text-blue-400 mb-1" />
                  <p className="text-xs text-gray-400">Wind</p>
                  <p className="text-sm font-semibold">NW 12 mph</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <Droplets className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
                  <p className="text-xs text-gray-400">Humidity</p>
                  <p className="text-sm font-semibold">68%</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <Thermometer className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                  <p className="text-xs text-gray-400">Feels Like</p>
                  <p className="text-sm font-semibold">41°F</p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-2">
                {forecast.map((d) => (
                  <div
                    key={d.day}
                    className="text-center bg-slate-900/50 rounded-lg p-3 hover:bg-slate-900 transition-colors"
                  >
                    <p className="text-xs text-gray-400 mb-2 font-medium">{d.day}</p>
                    <ForecastIcon type={d.icon} />
                    <p className="text-sm font-bold mt-2">{d.high}°</p>
                    <p className="text-xs text-gray-500">{d.low}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Windy.com Radar */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-6 py-3 border-b border-slate-700 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Live Radar — Kenai Peninsula</span>
            </div>
            <iframe
              src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=6&overlay=radar&product=radar&level=surface&lat=60.55&lon=-151.26"
              width="100%"
              height="400"
              frameBorder="0"
              title="Windy Radar Map"
              className="block"
            />
          </div>
        </div>
      </section>

      {/* ──── 4. REGIONAL NEWS GRID ──── */}
      <section id="news" className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <Newspaper className="w-7 h-7 text-blue-400" />
          <h2 className="text-3xl font-bold">Regional News</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((a, i) => (
            <article
              key={i}
              className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient placeholder image */}
              <div className={`h-40 bg-gradient-to-br ${a.gradient} relative`}>
                <div className="absolute inset-0 bg-black/20" />
                <span
                  className={`absolute top-3 left-3 ${a.color} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md`}
                >
                  {a.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {a.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {a.date}
                  </span>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                  >
                    Read More <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ──── 5. ALASKA QUOTES SECTION ──── */}
      <section className="bg-slate-900/30 py-16 relative overflow-hidden">
        <Quote className="absolute top-6 left-6 w-32 h-32 text-slate-800/40 -rotate-12" />
        <Quote className="absolute bottom-6 right-6 w-32 h-32 text-slate-800/40 rotate-12" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl font-bold mb-10">Voices of Alaska</h2>
          <div className="min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed mb-6">
                  "{quotes[quoteIndex].text}"
                </p>
                <p className="text-blue-400 font-medium">— {quotes[quoteIndex].author}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ──── 6. CROSS-PROMOTION AD NETWORK ──── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <Building2 className="w-7 h-7 text-blue-400" />
          <h2 className="text-2xl font-bold">From Our Network</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {networkAds.map((ad, i) => (
            <a
              key={i}
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                {ad.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{ad.tagline}</p>
              <span className="text-xs text-blue-400 flex items-center gap-1 font-medium">
                Visit <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ──── 7. REGIONAL INFO SECTION ──── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <Mountain className="w-7 h-7 text-blue-400" />
            <h2 className="text-3xl font-bold">Kenai Peninsula at a Glance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Demographics */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Demographics &amp; Geography</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between">
                  <span>Population</span>
                  <span className="text-gray-200 font-medium">~59,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Borough Area</span>
                  <span className="text-gray-200 font-medium">25,600 sq mi</span>
                </li>
                <li className="flex justify-between">
                  <span>Borough Seat</span>
                  <span className="text-gray-200 font-medium">Soldotna</span>
                </li>
              </ul>
            </div>

            {/* Key Industries */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Key Industries</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-500/20">
                  Oil &amp; Gas
                </span>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500/20">
                  Commercial Fishing
                </span>
                <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20">
                  Tourism
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Major communities include Kenai, Soldotna, Homer, Seward, and Sterling. The Kenai River is world-renowned for king and sockeye salmon fishing.
              </p>
            </div>

            {/* Fishing & Emergency */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Fish className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Fishing &amp; Emergency Info</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Anchor className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Kenai River king salmon: May 15 – Jul 31; Sockeye: Jun 11 – Aug 15</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Emergency: <strong className="text-white">911</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Borough Office: <strong className="text-white">(907) 714-2160</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <TreePine className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <a
                    href="https://tidesandcurrents.noaa.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    NOAA Tide Tables →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 8. FOOTER ──── */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">Kenai News</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Your trusted source for Kenai Peninsula news, weather, and community stories.
              </p>
              <p className="text-xs text-gray-600">Part of Alaska News Corporation</p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-300">Sections</h4>
              <ul className="space-y-2 text-sm">
                {["Home", "Weather", "Local News", "Business", "Outdoors", "Community"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sister Sites */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-300">Sister Sites</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Tongass News", url: "#" },
                  { name: "Chugach News", url: "#" },
                  { name: "ALCAN News", url: "#" },
                  { name: "Alaska News Corporation", url: "#" },
                ].map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      {s.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gray-300">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:news@kenainews.com" className="hover:text-blue-400 transition-colors">
                    news@kenainews.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>(907) 555-0100</span>
                </li>
              </ul>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-gray-600">
            © 2025 Alaska News Corporation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
