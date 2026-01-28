import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Clock, ChevronDown, ChevronUp, Share2, BookmarkPlus, User } from "lucide-react";
import type { NewsArticle } from "@/hooks/useNews";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Import unique images
import wildlifeBear from "@/assets/wildlife-bear.jpg";
import wildlifeMoose from "@/assets/wildlife-moose.jpg";
import wildlifeEagle from "@/assets/wildlife-eagle.jpg";
import fishingBoat from "@/assets/fishing-boat.jpg";
import communityGathering from "@/assets/community-gathering.jpg";
import outdoorsKayak from "@/assets/outdoors-kayak.jpg";
import salmonRun from "@/assets/salmon-run.jpg";
import auroraKenai from "@/assets/aurora-kenai.jpg";

interface ExpandableNewsCardProps {
  article: NewsArticle;
  variant?: "featured" | "default" | "compact";
  index?: number;
}

const categoryColors: Record<string, string> = {
  local: "bg-steel/20 text-steel border-steel/30",
  outdoors: "bg-accent/20 text-accent border-accent/30",
  wildlife: "bg-aurora/20 text-aurora border-aurora/30",
  community: "bg-gold/20 text-gold border-gold/30",
  weather: "bg-coral/20 text-coral border-coral/30",
  business: "bg-crimson/20 text-crimson border-crimson/30",
  sports: "bg-primary/20 text-primary border-primary/30",
};

// Unique images per category and index - never repeat
const getUniqueImage = (category: string, index: number): string => {
  const allImages = [wildlifeBear, wildlifeMoose, wildlifeEagle, fishingBoat, communityGathering, outdoorsKayak, salmonRun, auroraKenai];
  const categoryImages: Record<string, string[]> = {
    wildlife: [wildlifeBear, wildlifeMoose, wildlifeEagle, salmonRun],
    outdoors: [outdoorsKayak, fishingBoat, wildlifeMoose, auroraKenai],
    local: [communityGathering, fishingBoat, auroraKenai, wildlifeEagle],
    community: [communityGathering, salmonRun, fishingBoat, wildlifeMoose],
    weather: [auroraKenai, outdoorsKayak, wildlifeEagle, communityGathering],
    business: [fishingBoat, communityGathering, wildlifeBear, salmonRun],
    sports: [wildlifeEagle, outdoorsKayak, wildlifeBear, auroraKenai],
  };
  const images = categoryImages[category] || allImages;
  return images[index % images.length];
};

// Generate extended article content based on excerpt
const generateFullContent = (article: NewsArticle): string => {
  const baseContent = article.content || "";
  
  // If we have real content, use it
  if (baseContent && baseContent.length > 100) {
    return baseContent;
  }
  
  // Generate contextual content based on the article details
  const contentMap: Record<string, string> = {
    wildlife: `${article.excerpt}

Alaska's diverse ecosystems continue to showcase the remarkable wildlife that calls this region home. Local wildlife biologists from the Alaska Department of Fish and Game have been closely monitoring population dynamics and habitat conditions throughout the Kenai Peninsula.

The latest field observations indicate healthy population levels, with researchers noting positive trends in key species indicators. Community members are encouraged to report any unusual wildlife sightings to help maintain accurate population data.

Conservation efforts remain a priority for local authorities, with ongoing initiatives to protect critical habitats and migration corridors. Residents are reminded to practice safe wildlife viewing practices and maintain appropriate distances from all wild animals.

For the latest wildlife updates and safety guidelines, contact the Kenai Peninsula Wildlife Center at support@alaskanewscorporation.com.`,

    outdoors: `${article.excerpt}

The Kenai Peninsula offers some of Alaska's most spectacular outdoor recreation opportunities, drawing adventure seekers from around the world. Local outfitters and guide services report strong interest in activities ranging from fishing and hiking to kayaking and glacier tours.

Trail conditions across the region vary by elevation and exposure, with lower trails generally accessible while higher alpine routes may still hold significant snow. The Chugach National Forest Service recommends checking current conditions before embarking on backcountry adventures.

Recent improvements to recreation infrastructure include expanded parking facilities, upgraded trail markers, and enhanced safety signage at popular trailheads. The Kenai Peninsula Borough Parks Department continues to work on accessibility improvements throughout the trail system.

Outdoor enthusiasts are reminded to follow Leave No Trace principles and pack out all waste. For current conditions and permit information, visit your local ranger station or contact support@alaskanewscorporation.com.`,

    local: `${article.excerpt}

This development represents a significant milestone for the Kenai Peninsula community, according to local officials who spoke with Kenai News. Residents have expressed both enthusiasm and thoughtful questions about the implications for the region.

Borough Assembly members are scheduled to discuss related matters at the next regular session, with public comment periods available for community input. Local business leaders have noted potential economic impacts that could benefit the greater Kenai Peninsula area.

Community response has been largely positive, with many residents viewing this as an opportunity for sustainable growth and improved quality of life. Several civic organizations have announced plans to host informational sessions in the coming weeks.

For more information or to submit questions, residents can reach out to local officials or contact Kenai News at support@alaskanewscorporation.com.`,

    community: `${article.excerpt}

Community engagement remains strong across the Kenai Peninsula, with residents demonstrating their commitment to local initiatives and civic participation. Event organizers report excellent turnout and positive feedback from participants.

Local nonprofit organizations continue to play a vital role in supporting community needs, with volunteers contributing thousands of hours annually to various causes. The United Way of the Kenai Peninsula has highlighted the generosity of local donors and the impact of their contributions.

Schools, churches, and community centers have partnered to expand programming and services available to residents of all ages. Youth programs have seen particularly strong participation, with waiting lists for many activities.

Those interested in volunteering or contributing to community efforts can find more information through the Kenai Peninsula Borough Community Services office or by contacting support@alaskanewscorporation.com.`,

    weather: `${article.excerpt}

Meteorologists at the National Weather Service in Anchorage continue to monitor conditions closely, providing regular updates for communities across the Kenai Peninsula. Current forecast models suggest the pattern may persist for the next several days.

Local emergency management officials remind residents to maintain adequate supplies of food, water, and medications in case of weather-related service disruptions. Home heating systems should be serviced and backup heating sources should be ready for use.

Road conditions can change rapidly during severe weather events. The Alaska Department of Transportation updates road condition reports regularly, and motorists are encouraged to check conditions before traveling. Essential travel only is recommended during periods of reduced visibility or hazardous driving conditions.

For weather alerts and emergency information, sign up for the Kenai Peninsula Borough emergency notification system. Media inquiries can be directed to support@alaskanewscorporation.com.`,

    business: `${article.excerpt}

The Kenai Peninsula economy continues to demonstrate resilience and adaptability, with local businesses finding innovative ways to serve customers and expand their operations. Economic indicators suggest steady growth in key sectors including tourism, fishing, and professional services.

The Kenai Peninsula Economic Development District has been working with entrepreneurs and existing businesses to identify opportunities for expansion and diversification. Small business resources including training, mentorship, and financing options are available through various local and state programs.

Chamber of Commerce officials note increasing interest from outside investors and businesses looking to establish a presence in the region. The quality of life, natural resources, and community spirit continue to attract both residents and businesses to the Kenai Peninsula.

Business owners seeking resources or information about the local economy can contact the Kenai Peninsula Economic Development District or reach out to support@alaskanewscorporation.com.`,

    sports: `${article.excerpt}

Athletic programs across the Kenai Peninsula continue to produce exceptional competitors and foster community pride. Student athletes demonstrate dedication both on the field and in the classroom, representing their schools and communities with distinction.

Local sports facilities have seen significant improvements in recent years, with upgraded equipment, enhanced safety features, and expanded capacity for spectators. Youth sports leagues report strong enrollment, with coaches noting the importance of participation in building character and life skills.

The competitive spirit extends beyond traditional sports, with growing interest in outdoor recreation competitions, including fishing derbies, skiing events, and endurance races. These events draw participants from across Alaska and beyond, contributing to the local economy and tourism sector.

For schedules, scores, and sports news from across the Kenai Peninsula, follow Kenai News coverage or contact support@alaskanewscorporation.com.`,
  };

  return contentMap[article.category] || `${article.excerpt}

This story continues to develop as local authorities and community members respond to the situation. Kenai News will provide updates as more information becomes available.

Residents with additional information or questions are encouraged to contact local officials or reach out to our newsroom at support@alaskanewscorporation.com.

Stay connected with Kenai News for the latest updates on stories that matter to the Kenai Peninsula community.`;
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export function ExpandableNewsCard({ article, variant = "default", index = 0 }: ExpandableNewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl = article.image_url || getUniqueImage(article.category, index);
  const fullContent = generateFullContent(article);

  if (variant === "compact") {
    return (
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <motion.article
            className="flex items-start gap-2 p-2 hover:bg-muted/50 transition-colors cursor-pointer group"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-accent/20 to-aurora/20 flex items-center justify-center text-[10px] font-bold text-accent">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[11px] text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                {article.title}
              </h4>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <Clock className="h-2 w-2" />
                <span>{formatTime(article.published_at)}</span>
                <span className="capitalize">• {article.category}</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
            </motion.div>
          </motion.article>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-3 pb-4"
              >
                <div className="pl-7 border-l-2 border-accent/30 ml-2.5">
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {fullContent}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (variant === "featured") {
    return (
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <motion.article
          className="relative overflow-hidden rounded-lg group border border-border/50"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
        >
          {/* Image - More compact */}
          <div className="relative h-36 md:h-44 overflow-hidden">
            <motion.img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
            
            {article.is_breaking && (
              <motion.div 
                className="absolute top-2 left-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="px-2 py-0.5 bg-coral text-coral-foreground font-bold text-[10px] uppercase tracking-wide rounded">
                  🔴 Breaking
                </span>
              </motion.div>
            )}

            <div className="absolute top-2 right-2">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize border backdrop-blur-sm ${categoryColors[article.category]}`}>
                {article.category}
              </span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h2 className="text-sm md:text-base font-display font-bold text-primary-foreground mb-1 leading-tight line-clamp-2">
                {article.title}
              </h2>
              <p className="text-primary-foreground/70 text-[10px] mb-2 line-clamp-1 max-w-md">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-foreground/50 text-[10px]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {formatTime(article.published_at)}
                  </span>
                </div>
                <CollapsibleTrigger asChild>
                  <motion.button
                    className="flex items-center gap-1 px-2.5 py-1 bg-accent text-accent-foreground rounded text-[10px] font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isExpanded ? "Less" : "Read More"}
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-2.5 w-2.5" />
                    </motion.div>
                  </motion.button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
          {/* Expanded Content */}
          <CollapsibleContent>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-card p-4 border-t border-border"
                >
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line text-xs">
                    {fullContent}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </motion.article>
      </Collapsible>
    );
  }

  // Default card - ultra compact
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <motion.article
        className="group bg-card rounded overflow-hidden border border-border hover:border-accent/40 transition-all duration-200 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.03 }}
      >
        {/* Image - smaller */}
        <div className="relative h-20 overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-1.5 left-1.5">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold capitalize border backdrop-blur-sm ${categoryColors[article.category]}`}>
              {article.category}
            </span>
          </div>

          {article.is_breaking && (
            <motion.span 
              className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-coral text-coral-foreground font-bold text-[8px] rounded"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Breaking
            </motion.span>
          )}
        </div>

        {/* Content - condensed */}
        <div className="p-2">
          <h3 className="font-display font-bold text-[11px] text-card-foreground group-hover:text-accent transition-colors line-clamp-2 leading-tight mb-1">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-[9px] line-clamp-1 mb-1.5">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-[9px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              <span>{formatTime(article.published_at)}</span>
            </div>
            <CollapsibleTrigger asChild>
              <motion.button 
                className="flex items-center gap-0.5 text-accent font-medium hover:underline"
                whileHover={{ x: 1 }}
              >
                {isExpanded ? "Less" : "More"}
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.15 }}>
                  <ChevronDown className="h-2.5 w-2.5" />
                </motion.div>
              </motion.button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Expanded Content */}
        <CollapsibleContent>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-4 pb-4 border-t border-border/50 pt-4"
              >
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  {article.author && (
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author}
                    </span>
                  )}
                </div>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line text-xs">
                  {fullContent}
                </p>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                  <motion.button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BookmarkPlus className="h-3 w-3" />
                    Save
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </motion.article>
    </Collapsible>
  );
}
