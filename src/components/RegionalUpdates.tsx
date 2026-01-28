import { motion } from "framer-motion";
import { MapPin, Thermometer, Wind, Waves, Fish, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface RegionData {
  id: string;
  name: string;
  temperature: string;
  condition: string;
  wind: string;
  alerts: string[];
  tideInfo?: string;
  fishingReport?: string;
}

const alaskaRegions: RegionData[] = [
  {
    id: "kenai",
    name: "Kenai Peninsula",
    temperature: "32°F",
    condition: "Partly Cloudy",
    wind: "NW 12 mph",
    alerts: ["Winter Storm Watch - Mountains"],
    tideInfo: "High: 2:34 PM (18.2 ft)",
    fishingReport: "King Salmon run strong in Kenai River"
  },
  {
    id: "anchorage",
    name: "Anchorage",
    temperature: "28°F",
    condition: "Light Snow",
    wind: "N 8 mph",
    alerts: [],
    tideInfo: "High: 3:15 PM (29.1 ft)"
  },
  {
    id: "fairbanks",
    name: "Fairbanks",
    temperature: "-12°F",
    condition: "Clear",
    wind: "Calm",
    alerts: ["Extreme Cold Warning"],
    fishingReport: "Ice fishing open on Chena Lakes"
  },
  {
    id: "juneau",
    name: "Juneau",
    temperature: "38°F",
    condition: "Rain",
    wind: "SE 15 mph",
    alerts: [],
    tideInfo: "High: 1:45 PM (16.8 ft)"
  },
  {
    id: "kodiak",
    name: "Kodiak Island",
    temperature: "35°F",
    condition: "Overcast",
    wind: "SW 20 mph",
    alerts: ["Small Craft Advisory"],
    tideInfo: "High: 2:00 PM (9.2 ft)",
    fishingReport: "Halibut season in full swing"
  }
];

export function RegionalUpdates() {
  const [selectedRegion, setSelectedRegion] = useState(alaskaRegions[0]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-mountain py-12 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-aurora rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-gold/20">
            <MapPin className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
              Regional Updates
            </h2>
            <p className="text-primary-foreground/60 text-sm">
              Live conditions across Alaska
            </p>
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {alaskaRegions.map((region) => (
            <motion.button
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap font-medium text-sm transition-all duration-300 ${
                selectedRegion.id === region.id
                  ? "bg-gold text-gold-foreground shadow-lg"
                  : "glass text-primary-foreground/80 hover:bg-primary-foreground/10"
              }`}
            >
              {region.name}
            </motion.button>
          ))}
        </div>

        {/* Selected Region Info */}
        <motion.div
          key={selectedRegion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Temperature */}
          <div className="glass-dark rounded-xl p-5 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-coral/20">
                <Thermometer className="h-5 w-5 text-coral" />
              </div>
              <span className="text-primary-foreground/60 text-sm">Temperature</span>
            </div>
            <div className="text-3xl font-bold text-primary-foreground">
              {selectedRegion.temperature}
            </div>
            <div className="text-primary-foreground/70 text-sm mt-1">
              {selectedRegion.condition}
            </div>
          </div>

          {/* Wind */}
          <div className="glass-dark rounded-xl p-5 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-steel/20">
                <Wind className="h-5 w-5 text-steel" />
              </div>
              <span className="text-primary-foreground/60 text-sm">Wind</span>
            </div>
            <div className="text-2xl font-bold text-primary-foreground">
              {selectedRegion.wind}
            </div>
          </div>

          {/* Tides */}
          {selectedRegion.tideInfo && (
            <div className="glass-dark rounded-xl p-5 group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-aurora/20">
                  <Waves className="h-5 w-5 text-aurora" />
                </div>
                <span className="text-primary-foreground/60 text-sm">Tide</span>
              </div>
              <div className="text-lg font-semibold text-primary-foreground">
                {selectedRegion.tideInfo}
              </div>
            </div>
          )}

          {/* Fishing Report */}
          {selectedRegion.fishingReport && (
            <div className="glass-dark rounded-xl p-5 group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gold/20">
                  <Fish className="h-5 w-5 text-gold" />
                </div>
                <span className="text-primary-foreground/60 text-sm">Fishing</span>
              </div>
              <div className="text-sm font-medium text-primary-foreground leading-relaxed">
                {selectedRegion.fishingReport}
              </div>
            </div>
          )}
        </motion.div>

        {/* Alerts */}
        {selectedRegion.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            {selectedRegion.alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-crimson/20 border border-crimson/30"
              >
                <AlertTriangle className="h-4 w-4 text-crimson animate-pulse" />
                <span className="text-crimson text-sm font-medium">{alert}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
