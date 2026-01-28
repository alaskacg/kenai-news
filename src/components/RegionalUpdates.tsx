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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-mountain py-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-aurora rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 rounded-lg bg-gold/20">
            <MapPin className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold text-primary-foreground">
              Regional Updates
            </h2>
            <p className="text-primary-foreground/60 text-xs">
              Live conditions across Alaska
            </p>
          </div>
        </div>

        {/* Region Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {alaskaRegions.map((region) => (
            <motion.button
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3 py-2 rounded-lg whitespace-nowrap font-medium text-xs transition-all duration-300 ${
                selectedRegion.id === region.id
                  ? "bg-gold text-gold-foreground shadow-md"
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
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {/* Temperature */}
          <div className="glass-dark rounded-lg p-4 group hover:scale-[1.01] transition-transform duration-300 border border-primary-foreground/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-coral/20">
                <Thermometer className="h-4 w-4 text-coral" />
              </div>
              <span className="text-primary-foreground/60 text-xs">Temperature</span>
            </div>
            <div className="text-2xl font-bold text-primary-foreground">
              {selectedRegion.temperature}
            </div>
            <div className="text-primary-foreground/70 text-xs mt-0.5">
              {selectedRegion.condition}
            </div>
          </div>

          {/* Wind */}
          <div className="glass-dark rounded-lg p-4 group hover:scale-[1.01] transition-transform duration-300 ring-1 ring-inset ring-steel/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-steel/20">
                <Wind className="h-4 w-4 text-steel" />
              </div>
              <span className="text-primary-foreground/60 text-xs">Wind</span>
            </div>
            <div className="text-xl font-bold text-primary-foreground">
              {selectedRegion.wind}
            </div>
          </div>

          {/* Tides */}
          {selectedRegion.tideInfo && (
            <div className="glass-dark rounded-lg p-4 group hover:scale-[1.01] transition-transform duration-300 border-l-2 border-aurora">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md bg-aurora/20">
                  <Waves className="h-4 w-4 text-aurora" />
                </div>
                <span className="text-primary-foreground/60 text-xs">Tide</span>
              </div>
              <div className="text-sm font-semibold text-primary-foreground">
                {selectedRegion.tideInfo}
              </div>
            </div>
          )}

          {/* Fishing Report */}
          {selectedRegion.fishingReport && (
            <div className="glass-dark rounded-lg p-4 group hover:scale-[1.01] transition-transform duration-300 border-dashed border border-gold/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-md bg-gold/20">
                  <Fish className="h-4 w-4 text-gold" />
                </div>
                <span className="text-primary-foreground/60 text-xs">Fishing</span>
              </div>
              <div className="text-xs font-medium text-primary-foreground leading-relaxed">
                {selectedRegion.fishingReport}
              </div>
            </div>
          )}
        </motion.div>

        {/* Alerts */}
        {selectedRegion.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {selectedRegion.alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-crimson/20 border border-crimson/30"
              >
                <AlertTriangle className="h-3 w-3 text-crimson animate-pulse" />
                <span className="text-crimson text-xs font-medium">{alert}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
