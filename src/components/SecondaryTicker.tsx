import { motion } from "framer-motion";
import { Fish, Mountain, Compass, Anchor, TreePine, Sun, CloudSnow } from "lucide-react";

interface TickerItem {
  icon: React.ReactNode;
  text: string;
  category: string;
}

const tickerItems: TickerItem[] = [
  { icon: <Fish className="h-4 w-4" />, text: "Salmon Run Update: Record numbers at Russian River", category: "Wildlife" },
  { icon: <Mountain className="h-4 w-4" />, text: "Mt. Redoubt volcanic activity remains low", category: "Geology" },
  { icon: <Compass className="h-4 w-4" />, text: "Iditarod Trail: Mushers departing Willow checkpoint", category: "Events" },
  { icon: <Anchor className="h-4 w-4" />, text: "Homer Spit: Halibut fishing charter openings available", category: "Fishing" },
  { icon: <TreePine className="h-4 w-4" />, text: "Chugach Forest: Winter trail grooming complete", category: "Recreation" },
  { icon: <Sun className="h-4 w-4" />, text: "Daylight increasing: 6 minutes more sunlight today", category: "Seasonal" },
  { icon: <CloudSnow className="h-4 w-4" />, text: "Alyeska Resort: 18\" fresh powder overnight", category: "Skiing" },
  { icon: <Fish className="h-4 w-4" />, text: "Kenai River: Ice conditions improving", category: "Conditions" },
];

export function SecondaryTicker() {
  const allItems = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-accent/10 border-y border-accent/20 overflow-hidden py-2">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap animate-ticker-reverse"
        style={{ width: "fit-content" }}
      >
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent">
              {item.icon}
            </span>
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {item.category}:
            </span>
            <span className="text-sm text-foreground/80">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function WeatherBand() {
  const weatherData = [
    { location: "Kenai", temp: "32°F", condition: "⛅" },
    { location: "Homer", temp: "35°F", condition: "🌧️" },
    { location: "Soldotna", temp: "30°F", condition: "❄️" },
    { location: "Seward", temp: "38°F", condition: "🌫️" },
    { location: "Anchorage", temp: "28°F", condition: "❄️" },
    { location: "Fairbanks", temp: "-12°F", condition: "☀️" },
    { location: "Juneau", temp: "40°F", condition: "🌧️" },
    { location: "Kodiak", temp: "36°F", condition: "🌬️" },
  ];

  const allWeather = [...weatherData, ...weatherData];

  return (
    <div className="bg-gradient-to-r from-steel/10 via-primary/5 to-steel/10 overflow-hidden py-2.5 border-b border-border/50">
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap animate-ticker-slow"
        style={{ width: "fit-content" }}
      >
        {allWeather.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="text-lg">{item.condition}</span>
            <span className="font-medium text-foreground">{item.location}</span>
            <span className="text-muted-foreground">{item.temp}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
