import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Current Kenai Peninsula ticker topics by category for thorough research
const tickerCategories = {
  weather: [
    "Current temperature and conditions in Kenai/Soldotna",
    "Incoming weather fronts or storms",
    "Road conditions on Sterling Highway and Seward Highway",
    "Freeze/thaw warnings for pipes and outdoor activities",
    "Wind advisories for coastal areas",
  ],
  wildlife: [
    "Active moose sightings and crossing areas",
    "Bear activity levels and locations",
    "Eagle congregation spots",
    "Salmon run status and fish counts",
    "Wildlife-vehicle collision hotspots",
  ],
  community: [
    "Borough meeting announcements",
    "School closures or schedule changes",
    "Community event reminders",
    "Local business updates",
    "Volunteer opportunities",
  ],
  safety: [
    "Ice thickness on lakes",
    "Avalanche conditions in backcountry",
    "Tide warnings for beach activities",
    "Fire danger levels",
    "Emergency preparedness reminders",
  ],
  recreation: [
    "Trail conditions for hiking/skiing",
    "Fishing regulation updates",
    "State park announcements",
    "Campground availability",
    "Boat launch conditions",
  ],
  services: [
    "Ferry and airport status",
    "Post office and government office hours",
    "Healthcare facility updates",
    "Utility company notices",
    "Road construction updates",
  ],
};

async function generateTickerMessages(lovableApiKey: string): Promise<{ message: string; priority: number }[]> {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentHour = new Date().getHours();
  const timeContext = currentHour < 6 ? 'early morning' : 
                      currentHour < 12 ? 'morning' : 
                      currentHour < 17 ? 'afternoon' : 
                      currentHour < 21 ? 'evening' : 'night';

  // Select relevant categories based on time of day
  const priorityCategories = [];
  if (currentHour >= 5 && currentHour <= 9) {
    priorityCategories.push('weather', 'safety', 'services');
  } else if (currentHour >= 10 && currentHour <= 14) {
    priorityCategories.push('community', 'recreation', 'wildlife');
  } else if (currentHour >= 15 && currentHour <= 18) {
    priorityCategories.push('wildlife', 'weather', 'recreation');
  } else {
    priorityCategories.push('safety', 'weather', 'community');
  }

  const systemPrompt = `You are a wise, seasoned Alaskan news editor for Kenai News. You create short, urgent, and highly relevant ticker messages for the Kenai Peninsula community. 

Your messages should:
- Be FACTUAL and TIMELY for ${currentDate}, ${timeContext}
- Focus on information that genuinely affects daily life
- Use clear, direct language (max 80 characters per message)
- Prioritize SAFETY first, then practical information
- Reference real Kenai Peninsula locations when relevant

Create messages that a longtime Kenai resident would find genuinely useful right now.`;

  const userPrompt = `Generate 6 ticker messages for the Kenai Peninsula news ticker. Focus on these categories for ${timeContext}: ${priorityCategories.join(', ')}.

Consider real-world factors like:
- It's ${currentDate} - what's seasonally relevant?
- Time of day: ${timeContext} - what do people need to know right now?
- Kenai Peninsula specifics: fishing seasons, wildlife patterns, weather patterns, local events

Return ONLY valid JSON array, no markdown:
[
  {"message": "Short urgent message under 80 chars", "priority": 3},
  {"message": "Another important update", "priority": 2},
  ...
]

Priority scale: 3 = breaking/urgent, 2 = important, 1 = informational, 0 = general`;

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
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
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
  
  const jsonMatch = cleanContent.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error('Raw AI response:', rawContent);
    throw new Error('Could not parse AI response as JSON array');
  }
  
  return JSON.parse(jsonMatch[0]);
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

    console.log('Generating researched ticker messages...');
    
    const tickerMessages = await generateTickerMessages(LOVABLE_API_KEY);
    
    console.log(`Generated ${tickerMessages.length} ticker messages`);

    // Deactivate old ticker messages
    await supabase
      .from('news_ticker')
      .update({ is_active: false })
      .eq('is_active', true);

    // Insert new ticker messages
    const { data, error } = await supabase
      .from('news_ticker')
      .insert(tickerMessages.map(t => ({
        message: t.message,
        priority: t.priority,
        is_active: true,
      })))
      .select();

    if (error) {
      console.error('Error inserting ticker messages:', error);
      throw error;
    }

    console.log(`✓ Updated ${data.length} ticker messages`);

    // Cleanup: keep only last 50 ticker entries
    const { data: allTickers } = await supabase
      .from('news_ticker')
      .select('id')
      .order('created_at', { ascending: false });

    if (allTickers && allTickers.length > 50) {
      const toDelete = allTickers.slice(50).map(t => t.id);
      await supabase
        .from('news_ticker')
        .delete()
        .in('id', toDelete);
      console.log(`Cleaned up ${toDelete.length} old ticker entries`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      messages_updated: data.length,
      generated_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in update-tickers:', errorMessage, error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An error occurred while updating tickers. Please try again later.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

