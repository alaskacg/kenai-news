import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Cloud, Thermometer, Wind, Droplets, Eye, Sunrise, Sunset, 
  CloudRain, CloudSnow, Sun, MapPin, AlertTriangle, TrendingUp,
  Waves, Gauge, Compass, Calendar, ArrowUpRight, Snowflake
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRef } from "react";
import weatherHero from "@/assets/weather-storm.jpg";
import { AuroraWidgetCompact } from "@/components/AuroraWidgetCompact";

const hourlyForecast = [
  { time: "Now", temp: "28°", icon: CloudSnow, condition: "Snow" },
  { time: "1PM", temp: "30°", icon: CloudSnow, condition: "Snow" },
  { time: "2PM", temp: "31°", icon: Cloud, condition: "Cloudy" },
  { time: "3PM", temp: "32°", icon: Cloud, condition: "Cloudy" },
  { time: "4PM", temp: "30°", icon: CloudSnow, condition: "Snow" },
  { time: "5PM", temp: "28°", icon: CloudSnow, condition: "Snow" },
  { time: "6PM", temp: "25°", icon: Snowflake, condition: "Heavy Snow" },
  { time: "7PM", temp: "23°", icon: Snowflake, condition: "Heavy Snow" },
];

const weeklyForecast = [
  { day: "Today", high: "32°", low: "18°", icon: CloudSnow, condition: "Snow Showers", precip: "80%" },
  { day: "Wed", high: "28°", low: "15°", icon: Snowflake, condition: "Heavy Snow", precip: "95%" },
  { day: "Thu", high: "22°", low: "8°", icon: Cloud, condition: "Cloudy", precip: "20%" },
  { day: "Fri", high: "25°", low: "12°", icon: Sun, condition: "Partly Sunny", precip: "10%" },
  { day: "Sat", high: "30°", low: "18°", icon: Sun, condition: "Sunny", precip: "5%" },
  { day: "Sun", high: "33°", low: "20°", icon: Cloud, condition: "Cloudy", precip: "30%" },
  { day: "Mon", high: "35°", low: "22°", icon: CloudRain, condition: "Rain/Snow Mix", precip: "60%" },
];

const alaskaStations = [
  { name: "Kenai", temp: "28°F", condition: "Snow", wind: "NW 15" },
  { name: "Anchorage", temp: "25°F", condition: "Cloudy", wind: "N 8" },
  { name: "Homer", temp: "32°F", condition: "Rain", wind: "SE 20" },
  { name: "Seward", temp: "35°F", condition: "Overcast", wind: "S 12" },
  { name: "Soldotna", temp: "27°F", condition: "Snow", wind: "NW 18" },
  { name: "Fairbanks", temp: "-8°F", condition: "Clear", wind: "Calm" },
];

const weatherAlerts = [
  { type: "Winter Storm Warning", region: "Kenai Mountains", expires: "Tonight 11PM", severity: "warning" },
  { type: "Avalanche Watch", region: "Turnagain Pass", expires: "Thursday", severity: "urgent" },
];

export default function Weather() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={weatherHero} alt="Alaska Weather" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/60 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative h-full container mx-auto px-4 flex items-end pb-8"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-3"
            >
              <Cloud className="h-5 w-5 text-steel" />
              <span className="text-sm text-primary-foreground/80 font-medium">Kenai Peninsula Weather</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-3"
            >
              Alaska Weather Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/70 text-sm md:text-base"
            >
              Real-time conditions, forecasts, and alerts for the Last Frontier
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Current Conditions - Main Stats */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Large Current Temp Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gradient-mountain rounded-2xl p-6 border border-steel/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>Kenai, Alaska</span>
                </div>
                <div className="flex items-end gap-3">
                  <span className="text-6xl md:text-7xl font-headline text-primary-foreground">28°</span>
                  <div className="pb-3">
                    <span className="text-primary-foreground/60 text-sm">Feels like 18°</span>
                  </div>
                </div>
              </div>
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CloudSnow className="h-16 w-16 text-steel" />
              </motion.div>
            </div>
            <p className="text-lg text-primary-foreground font-medium mb-4">Light Snow</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Wind, label: "Wind", value: "NW 15 mph" },
                { icon: Droplets, label: "Humidity", value: "78%" },
                { icon: Eye, label: "Visibility", value: "2 mi" },
              ].map((item, i) => (
                <div key={i} className="glass-dark rounded-lg p-3 text-center">
                  <item.icon className="h-4 w-4 text-aurora mx-auto mb-1" />
                  <div className="text-xs text-primary-foreground/50">{item.label}</div>
                  <div className="text-sm font-semibold text-primary-foreground">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sun Times Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-5 border border-border shadow-sm"
          >
            <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <Sun className="h-4 w-4 text-gold" /> Daylight
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-gold" />
                  <span className="text-sm text-muted-foreground">Sunrise</span>
                </div>
                <span className="font-bold text-card-foreground">9:42 AM</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gold via-coral to-crimson"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sunset className="h-5 w-5 text-coral" />
                  <span className="text-sm text-muted-foreground">Sunset</span>
                </div>
                <span className="font-bold text-card-foreground">5:18 PM</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
              7h 36m of daylight today (+2m from yesterday)
            </p>
          </motion.div>

          {/* Pressure & Barometer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-forest rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-primary-foreground mb-4 flex items-center gap-2">
              <Gauge className="h-4 w-4" /> Atmospheric
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-foreground/70">Pressure</span>
                <span className="font-bold text-primary-foreground">29.85 in</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-foreground/70">Trend</span>
                <span className="text-coral font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Rising
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-foreground/70">UV Index</span>
                <span className="font-bold text-primary-foreground">1 Low</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary-foreground/70">Dew Point</span>
                <span className="font-bold text-primary-foreground">22°F</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <section className="container mx-auto px-4 mt-6">
          <div className="space-y-2">
            {weatherAlerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  alert.severity === "urgent" 
                    ? "bg-crimson/10 border-crimson/30" 
                    : "bg-gold/10 border-gold/30"
                }`}
              >
                <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                  alert.severity === "urgent" ? "text-crimson" : "text-gold"
                } animate-pulse`} />
                <div className="flex-1">
                  <span className={`font-semibold text-sm ${
                    alert.severity === "urgent" ? "text-crimson" : "text-gold"
                  }`}>{alert.type}</span>
                  <span className="text-muted-foreground text-sm"> — {alert.region}</span>
                </div>
                <span className="text-xs text-muted-foreground">Until {alert.expires}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Hourly Forecast */}
      <section className="container mx-auto px-4 mt-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" /> Hourly Forecast
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {hourlyForecast.map((hour, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex-shrink-0 w-20 p-3 rounded-xl text-center border transition-all ${
                i === 0 
                  ? "bg-accent text-accent-foreground border-accent" 
                  : "bg-card border-border hover:border-accent/50"
              }`}
            >
              <p className={`text-xs font-medium mb-2 ${i === 0 ? "text-accent-foreground" : "text-muted-foreground"}`}>
                {hour.time}
              </p>
              <hour.icon className={`h-6 w-6 mx-auto mb-2 ${i === 0 ? "text-accent-foreground" : "text-steel"}`} />
              <p className={`text-lg font-bold ${i === 0 ? "text-accent-foreground" : "text-card-foreground"}`}>
                {hour.temp}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7-Day & Sidebar */}
      <section className="container mx-auto px-4 mt-8 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 7-Day Forecast */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">7-Day Forecast</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              {weeklyForecast.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-4 p-4 ${
                    i !== weeklyForecast.length - 1 ? "border-b border-border" : ""
                  } hover:bg-muted/30 transition-colors`}
                >
                  <span className={`w-12 font-semibold ${i === 0 ? "text-accent" : "text-card-foreground"}`}>
                    {day.day}
                  </span>
                  <day.icon className={`h-6 w-6 ${i === 0 ? "text-steel" : "text-muted-foreground"}`} />
                  <span className="flex-1 text-sm text-muted-foreground">{day.condition}</span>
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets className="h-3 w-3 text-steel" />
                    <span className="text-muted-foreground w-8">{day.precip}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-card-foreground w-8">{day.high}</span>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-steel to-coral rounded-full"
                        style={{ width: `${(parseInt(day.high) + 20) * 1.5}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8">{day.low}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Aurora Widget */}
            <AuroraWidgetCompact />

            {/* Regional Temps */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-midnight rounded-2xl p-5"
            >
              <h3 className="text-sm font-semibold text-primary-foreground mb-4 flex items-center gap-2">
                <Compass className="h-4 w-4 text-gold" /> Alaska Stations
              </h3>
              <div className="space-y-3">
                {alaskaStations.map((station, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-primary-foreground/10 last:border-0">
                    <span className="text-sm text-primary-foreground">{station.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-primary-foreground/50">{station.condition}</span>
                      <span className="font-bold text-primary-foreground">{station.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Marine Conditions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-5 border-2 border-dashed border-steel/30"
            >
              <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Waves className="h-4 w-4 text-steel" /> Marine Forecast
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cook Inlet</span>
                  <span className="text-card-foreground">Seas 3-5 ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kachemak Bay</span>
                  <span className="text-card-foreground">Seas 2-4 ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Small Craft</span>
                  <span className="text-gold font-medium">Advisory</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    High Tide: 2:34 PM (18.2 ft)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
