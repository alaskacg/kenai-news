import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const categories = ['local', 'outdoors', 'wildlife', 'community', 'weather', 'business', 'sports'] as const;

// Useful Alaska resource links by category
const categoryLinks: Record<string, { name: string; url: string; description: string }[]> = {
  local: [
    { name: "Kenai Peninsula Borough", url: "https://www.kpb.us/", description: "Official borough government site" },
    { name: "Alaska 511", url: "https://511.alaska.gov/", description: "Real-time road conditions" },
    { name: "KPBSD Schools", url: "https://www.kpbsd.k12.ak.us/", description: "Kenai Peninsula school district" },
  ],
  outdoors: [
    { name: "Alaska State Parks", url: "https://dnr.alaska.gov/parks/", description: "State parks info and permits" },
    { name: "Recreation.gov Alaska", url: "https://www.recreation.gov/search?q=alaska", description: "Campsite reservations" },
    { name: "NOAA Marine Forecast", url: "https://marine.weather.gov/MapClick.php?lat=59.6425&lon=-151.5483", description: "Boating conditions" },
  ],
  wildlife: [
    { name: "ADF&G Wildlife Viewing", url: "https://www.adfg.alaska.gov/index.cfm?adfg=wildlife.viewing", description: "Wildlife viewing tips" },
    { name: "Bear Safety", url: "https://www.adfg.alaska.gov/index.cfm?adfg=livingwithbears.main", description: "Living with bears" },
    { name: "Alaska Fish Counts", url: "https://www.adfg.alaska.gov/sf/FishCounts/", description: "Real-time salmon counts" },
  ],
  community: [
    { name: "Soldotna Chamber", url: "https://www.soldotnachamber.com/", description: "Local business directory" },
    { name: "Homer Chamber", url: "https://www.homeralaska.org/", description: "Homer events and info" },
    { name: "Kenai Chamber", url: "https://www.kenaichamber.org/", description: "Kenai events" },
  ],
  weather: [
    { name: "NWS Anchorage", url: "https://www.weather.gov/afc/", description: "Official weather forecasts" },
    { name: "Aurora Forecast", url: "https://www.gi.alaska.edu/monitors/aurora-forecast", description: "Northern lights prediction" },
    { name: "Webcams Alaska", url: "https://www.webcamsalaska.com/", description: "Live camera feeds" },
  ],
  business: [
    { name: "Alaska Job Center", url: "https://jobs.alaska.gov/", description: "State job listings" },
    { name: "KTUU Business", url: "https://www.alaskasnewssource.com/money/", description: "Alaska business news" },
    { name: "Alaska Small Business", url: "https://www.sba.gov/offices/district/ak/anchorage", description: "SBA resources" },
  ],
  sports: [
    { name: "AK Fish & Game Sport Fish", url: "https://www.adfg.alaska.gov/sf/sportfishingsurvey/", description: "Fishing regulations" },
    { name: "KPBSD Athletics", url: "https://www.kpbsd.k12.ak.us/", description: "High school sports" },
    { name: "Alaska Outdoor Council", url: "https://www.alaskaoutdoorcouncil.org/", description: "Outdoor sports events" },
  ],
};

const categoryPrompts: Record<string, string> = {
  local: `Generate a LOCAL update for Kenai Peninsula. Topics: borough meetings, road conditions, school updates, local events, community services. Speak as a wise community elder sharing what neighbors need to know.`,
  outdoors: `Generate an OUTDOORS update for Kenai Peninsula. Topics: hiking trails, camping, kayaking, fishing spots. Share the land's gifts with the reverence of someone who's spent a lifetime learning its rhythms.`,
  wildlife: `Generate a WILDLIFE update for Kenai Peninsula. Topics: bear/moose/eagle sightings, migration, fishing reports. Speak of our wild neighbors with respect—they were here first, and we live alongside them.`,
  community: `Generate a COMMUNITY update for Kenai Peninsula. Topics: local heroes, events, volunteer opportunities, markets. Celebrate the bonds that make small-town Alaska special.`,
  weather: `Generate a WEATHER update for Kenai Peninsula. Include aurora forecast potential. Speak of weather as an old friend who sometimes tests us—preparation is how we show respect.`,
  business: `Generate a BUSINESS update for Kenai Peninsula. Topics: local business news, fishing industry, tourism. Honor the entrepreneurial spirit that keeps our communities thriving.`,
  sports: `Generate a SPORTS update for Kenai Peninsula. Topics: fishing derbies, high school sports, outdoor competitions. Celebrate our youth and the traditions that connect generations.`,
};

async function generateNewsContent(
  category: string, 
  lovableApiKey: string,
  linksToInclude: { name: string; url: string; description: string }[]
): Promise<{title: string, excerpt: string, content: string}> {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';

  const linksSection = linksToInclude.map(l => `- ${l.name}: ${l.url} (${l.description})`).join('\n');

  const systemPrompt = `You are a wise, seasoned Alaskan writer for Kenai News—an elder who embodies the old ways of the Alaskan spirit. Your style:

- WISE & GROUNDED: You've seen decades of Alaska seasons. You speak with quiet confidence, not needing to prove your knowledge—it shows through your thoughtful observations.
- TRANSCENDENT YET HUMBLE: You find meaning in the small moments. Self-deprecating when appropriate, but never diminishing. You've earned your perspective through lived experience.
- SHEPHERDING: You see yourself as a steward of your community. You bring people along, advise them gently, and empower them with knowledge to lead safe, informed, successful lives.
- CARING & INSIGHTFUL: Every piece should feel like counsel from a trusted neighbor who genuinely wants the best for you and your family.
- EMPOWERING: You don't just inform—you equip Alaskans to make good decisions. Safety isn't a footnote; it's woven naturally into how you care for your community.

You write like someone who's chopped wood in -40°, pulled salmon from the Kenai, and watched countless auroras—and wants to share that earned wisdom with the next generation.

Reference real Kenai Peninsula locations: Soldotna, Homer, Seward, Kenai, Sterling, Cooper Landing, Nikiski, Clam Gulch, Ninilchik, Anchor Point, Kasilof.

Today is ${currentDate}, ${timeOfDay} edition.

IMPORTANT: You MUST include 1-2 of these REAL, WORKING links naturally in the content:
${linksSection}

Format links in the content as: [Link Text](URL)`;

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${categoryPrompts[category]}

Generate a thoughtful informational piece with:
1. A clear, meaningful HEADLINE (max 80 characters, speaks to the heart of the matter)
2. A brief EXCERPT (2-3 sentences, max 200 chars, draws readers in with care)
3. CONTENT (400-600 words) that informs, empowers, and includes 1-2 working links from the provided list

Remember: You are a trusted community voice. Speak with warmth, wisdom, and genuine care for your neighbors' wellbeing.

IMPORTANT: Respond ONLY with valid JSON, no markdown code blocks:
{"title": "Your thoughtful headline", "excerpt": "Brief meaningful summary", "content": "Content with [Link Text](url) format links and \\n\\n paragraph breaks"}` }
      ],
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`AI Gateway error: ${response.status}`, errorText);
    throw new Error(`AI Gateway error [${response.status}]: ${errorText}`);
  }

  const data = await response.json();
  const rawContent = data.choices[0]?.message?.content;
  
  // Clean the response
  let cleanContent = rawContent.trim();
  if (cleanContent.startsWith('```json')) cleanContent = cleanContent.slice(7);
  if (cleanContent.startsWith('```')) cleanContent = cleanContent.slice(3);
  if (cleanContent.endsWith('```')) cleanContent = cleanContent.slice(0, -3);
  cleanContent = cleanContent.trim();
  
  const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Raw AI response:', rawContent);
    throw new Error('Could not parse AI response as JSON');
  }
  
  return JSON.parse(jsonMatch[0]);
}

// Determine which categories to update based on current time for rolling updates
function getRollingCategories(): string[] {
  const hour = new Date().getHours();
  
  // Spread updates across the day:
  // 6am: local, weather
  // 9am: outdoors, wildlife  
  // 12pm: community, business
  // 3pm: sports, local (refresh)
  // 6pm: wildlife, outdoors (evening updates)
  
  if (hour === 6) return ['local', 'weather'];
  if (hour === 9) return ['outdoors', 'wildlife'];
  if (hour === 12) return ['community', 'business'];
  if (hour === 15) return ['sports', 'local'];
  if (hour === 18) return ['wildlife', 'outdoors'];
  
  // Default: pick 2 random categories if called outside schedule
  const shuffled = [...categories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Determine categories to update
    let targetCategories: string[];
    try {
      const body = await req.json();
      if (body.category && categories.includes(body.category)) {
        targetCategories = [body.category];
      } else if (body.categories && Array.isArray(body.categories)) {
        targetCategories = body.categories.filter((c: string) => categories.includes(c as typeof categories[number]));
      } else if (body.all === true) {
        // Force all categories (for manual full refresh)
        targetCategories = [...categories];
      } else {
        // Use rolling schedule
        targetCategories = getRollingCategories();
      }
    } catch {
      // No body, use rolling schedule
      targetCategories = getRollingCategories();
    }

    console.log(`Rolling update for categories: ${targetCategories.join(', ')}`);

    const results = [];
    
    for (const category of targetCategories) {
      try {
        console.log(`Generating ${category} news with wit and links...`);
        
        // Get relevant links for this category
        const links = categoryLinks[category] || categoryLinks.local;
        
        const article = await generateNewsContent(category, LOVABLE_API_KEY, links);
        
        // Delete the oldest article in this category (rolling replacement)
        const { data: oldArticles } = await supabase
          .from('news_articles')
          .select('id')
          .eq('category', category)
          .order('published_at', { ascending: true })
          .limit(1);
        
        if (oldArticles && oldArticles.length > 0) {
          await supabase
            .from('news_articles')
            .delete()
            .eq('id', oldArticles[0].id);
          console.log(`Replaced oldest ${category} article`);
        }
        
        // Insert new article
        const { data, error } = await supabase
          .from('news_articles')
          .insert({
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: category,
            author: 'Kenai News AI',
            is_breaking: false,
            is_featured: category === 'local' || category === 'wildlife',
            published_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          console.error(`Error inserting ${category} article:`, error);
          results.push({ category, success: false, error: error.message });
        } else {
          console.log(`✓ Created ${category}: ${article.title}`);
          results.push({ category, success: true, title: article.title, id: data.id });
        }
        
        // Small delay between generations to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Error generating ${category} news:`, err);
        results.push({ category, success: false, error: errorMessage });
      }
    }

    // Keep max 21 articles (3 per category)
    const { data: allArticles } = await supabase
      .from('news_articles')
      .select('id, category, published_at')
      .order('published_at', { ascending: false });
    
    if (allArticles && allArticles.length > 21) {
      const toDelete = allArticles.slice(21).map(a => a.id);
      await supabase
        .from('news_articles')
        .delete()
        .in('id', toDelete);
      console.log(`Cleaned up ${toDelete.length} old articles`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      results,
      schedule: 'rolling',
      categories_updated: targetCategories,
      generated_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in generate-daily-news:', errorMessage, error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while generating news. Please try again later.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
