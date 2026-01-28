import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categories = ['local', 'outdoors', 'wildlife', 'community', 'weather', 'business', 'sports'] as const;

const categoryPrompts: Record<string, string> = {
  local: `Generate a LOCAL news update for Kenai Peninsula residents. Topics: borough meetings, road conditions, school updates, local events, community services, infrastructure updates. Make it practical and useful for daily life.`,
  outdoors: `Generate an OUTDOORS/RECREATION update for Kenai Peninsula. Topics: hiking trail conditions, camping updates, kayaking/boating conditions, seasonal outdoor activities, best times to visit spots, gear recommendations, safety tips for current conditions.`,
  wildlife: `Generate a WILDLIFE update for Kenai Peninsula. Topics: animal sightings (bears, moose, eagles, whales), migration patterns, safety around wildlife, photography opportunities, conservation news, fishing reports on salmon/halibut runs.`,
  community: `Generate a COMMUNITY news update for Kenai Peninsula. Topics: local heroes, volunteer opportunities, fundraisers, cultural events, Native heritage celebrations, farmer's markets, community gatherings, local business spotlights.`,
  weather: `Generate a WEATHER update for Kenai Peninsula. Topics: current conditions, upcoming weather patterns, aurora forecast, seasonal changes, weather safety tips, road conditions related to weather, best days for outdoor activities.`,
  business: `Generate a BUSINESS update for Kenai Peninsula. Topics: local business news, job opportunities, economic developments, fishing industry updates, tourism news, new businesses opening, market updates relevant to Alaskans.`,
  sports: `Generate a SPORTS update for Kenai Peninsula. Topics: local high school sports, fishing tournaments, outdoor competitions, recreational leagues, youth sports, upcoming sporting events, local athletes' achievements.`,
};

async function generateNewsContent(category: string, lovableApiKey: string): Promise<{title: string, excerpt: string, content: string}> {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening';

  const systemPrompt = `You are a seasoned Alaska news writer for Kenai News, serving the Kenai Peninsula community. Your writing style is:

- FUN and ENCOURAGING: Make readers feel excited about living in Alaska
- ADVENTUROUS: Celebrate the pioneer spirit and outdoor lifestyle
- SAFETY-FIRST: Always include practical safety tips when relevant
- PRACTICAL: Provide actionable advice and useful information
- WARM: Like a trusted neighbor sharing important updates

Write in a conversational but professional tone. Include specific details, times, locations, and phone numbers when appropriate. Reference real Kenai Peninsula locations like Soldotna, Homer, Seward, Kenai, Sterling, Cooper Landing, Nikiski, etc.

Today is ${currentDate}, ${timeOfDay} edition.`;

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${categoryPrompts[category]}

Generate a complete news article with:
1. A compelling HEADLINE (max 80 characters)
2. A brief EXCERPT/SUMMARY (2-3 sentences, max 200 characters)
3. FULL ARTICLE CONTENT (400-600 words) with practical information, tips, and local flavor

IMPORTANT: Respond ONLY with valid JSON, no markdown, no code blocks, just pure JSON:
{"title": "Your headline here", "excerpt": "Brief summary here", "content": "Full article content with multiple paragraphs separated by \\n\\n"}` }
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI Gateway error [${response.status}]: ${errorText}`);
  }

  const data = await response.json();
  const rawContent = data.choices[0]?.message?.content;
  
  // Clean the response - remove markdown code blocks if present
  let cleanContent = rawContent.trim();
  if (cleanContent.startsWith('```json')) {
    cleanContent = cleanContent.slice(7);
  }
  if (cleanContent.startsWith('```')) {
    cleanContent = cleanContent.slice(3);
  }
  if (cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(0, -3);
  }
  cleanContent = cleanContent.trim();
  
  // Parse the JSON response
  const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Raw AI response:', rawContent);
    throw new Error('Could not parse AI response as JSON');
  }
  
  return JSON.parse(jsonMatch[0]);
}

serve(async (req) => {
  // Handle CORS preflight
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

    // Parse request body for specific category or generate all
    let targetCategories = [...categories];
    try {
      const body = await req.json();
      if (body.category && categories.includes(body.category)) {
        targetCategories = [body.category];
      }
      if (body.categories && Array.isArray(body.categories)) {
        targetCategories = body.categories.filter((c: string) => categories.includes(c as any));
      }
    } catch {
      // No body or invalid JSON, use all categories
    }

    console.log(`Generating news for categories: ${targetCategories.join(', ')}`);

    const results = [];
    
    for (const category of targetCategories) {
      try {
        console.log(`Generating ${category} news...`);
        const article = await generateNewsContent(category, LOVABLE_API_KEY);
        
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
          console.log(`Successfully created ${category} article: ${article.title}`);
          results.push({ category, success: true, title: article.title, id: data.id });
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Error generating ${category} news:`, err);
        results.push({ category, success: false, error: errorMessage });
      }
    }

    // Clean up old articles (keep last 50)
    const { error: cleanupError } = await supabase
      .from('news_articles')
      .delete()
      .not('id', 'in', 
        supabase
          .from('news_articles')
          .select('id')
          .order('published_at', { ascending: false })
          .limit(50)
      );

    if (cleanupError) {
      console.log('Cleanup note:', cleanupError.message);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      results,
      generated_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in generate-daily-news:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

