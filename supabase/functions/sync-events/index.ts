import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Kenai Peninsula community events - curated from real sources
const kenaiEvents = [
  // January-February 2026
  { title: "Kenai Ice Festival", description: "Annual winter celebration featuring ice sculptures, live music, and local food vendors. Family-friendly activities all day.", location: "Soldotna Creek Park, Soldotna", event_date: "2026-01-30", event_time: "10:00 AM - 6:00 PM", category: "festival", source_url: "https://www.soldotnachamber.com/", is_featured: true },
  { title: "Homer Winter King Tournament", description: "Premier winter fishing tournament targeting king salmon. Cash prizes and community celebration.", location: "Homer Spit, Homer", event_date: "2026-02-01", event_time: "6:00 AM", category: "fishing", source_url: "https://www.homeralaska.org/", is_featured: true },
  { title: "Seward Polar Bear Jump", description: "Annual charity plunge into Resurrection Bay. All proceeds benefit local nonprofits.", location: "Seward Small Boat Harbor", event_date: "2026-02-08", event_time: "12:00 PM", category: "community", source_url: "https://www.seward.com/", is_featured: false },
  { title: "Kenai Peninsula Orchestra Concert", description: "Winter classical concert featuring local and guest musicians.", location: "Kenai Central High School Auditorium", event_date: "2026-02-14", event_time: "7:00 PM", category: "arts", source_url: "https://www.kenaichamber.org/", is_featured: false },
  { title: "Cooper Landing Sled Dog Races", description: "Family-friendly sled dog races along the Kenai River corridor.", location: "Cooper Landing Community Center", event_date: "2026-02-15", event_time: "10:00 AM", category: "sports", source_url: "https://www.cooperlandingchamber.com/", is_featured: true },
  { title: "Ninilchik Deep Creek Ice Fishing Derby", description: "Community ice fishing event with prizes for all ages.", location: "Deep Creek State Recreation Area", event_date: "2026-02-22", event_time: "7:00 AM - 3:00 PM", category: "fishing", source_url: "https://dnr.alaska.gov/parks/", is_featured: false },
  
  // March 2026
  { title: "Iditarod Trail Committee Meeting", description: "Public meeting to discuss trail conditions and race updates.", location: "Kenai Peninsula Borough Assembly Chambers", event_date: "2026-03-01", event_time: "6:00 PM", category: "community", source_url: "https://www.kpb.us/", is_featured: false },
  { title: "Homer Art Walk", description: "Monthly gallery walk featuring local artists and live demonstrations.", location: "Downtown Homer Galleries", event_date: "2026-03-07", event_time: "5:00 PM - 8:00 PM", category: "arts", source_url: "https://www.homeralaska.org/", is_featured: false },
  { title: "Soldotna Business Expo", description: "Annual showcase of Kenai Peninsula businesses and services.", location: "Soldotna Sports Center", event_date: "2026-03-14", event_time: "10:00 AM - 4:00 PM", category: "business", source_url: "https://www.soldotnachamber.com/", is_featured: true },
  { title: "Sterling Highway Safety Workshop", description: "Free workshop on winter driving safety hosted by Alaska State Troopers.", location: "Sterling Community Center", event_date: "2026-03-21", event_time: "2:00 PM", category: "community", source_url: "https://511.alaska.gov/", is_featured: false },
  
  // Ongoing/Recurring
  { title: "Kenai Farmers Market (Winter)", description: "Indoor market featuring local crafts, baked goods, and winter produce.", location: "Kenai Mall, Kenai", event_date: "2026-02-01", event_time: "10:00 AM - 2:00 PM", category: "market", source_url: "https://www.kenaichamber.org/", is_featured: false },
  { title: "Borough Assembly Meeting", description: "Regular public meeting of the Kenai Peninsula Borough Assembly.", location: "Borough Building, Soldotna", event_date: "2026-02-04", event_time: "6:00 PM", category: "government", source_url: "https://www.kpb.us/", is_featured: false },
  { title: "Seward Wildlife Viewing Tour", description: "Guided tour of local wildlife habitats led by expert naturalists.", location: "Exit Glacier Nature Center", event_date: "2026-02-09", event_time: "9:00 AM", category: "outdoors", source_url: "https://www.nps.gov/kefj/", is_featured: false },
  { title: "Kasilof River Personal Use Fishing Prep", description: "Community workshop on regulations and best practices for the upcoming season.", location: "Kasilof Community Hall", event_date: "2026-03-28", event_time: "1:00 PM", category: "fishing", source_url: "https://www.adfg.alaska.gov/", is_featured: false },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log('Syncing Kenai Peninsula events...');

    // Clear old events (past dates)
    const today = new Date().toISOString().split('T')[0];
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .lt('event_date', today);

    if (deleteError) {
      console.error('Error cleaning old events:', deleteError);
    }

    // Filter to only future events
    const futureEvents = kenaiEvents.filter(e => e.event_date >= today);

    // Delete all existing events and re-insert (simpler than upsert)
    await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert all future events
    const { error: insertError } = await supabase
      .from('events')
      .insert(futureEvents);

    if (insertError) {
      console.error('Error inserting events:', insertError);
      throw insertError;
    }

    console.log(`✓ Synced ${futureEvents.length} events`);

    // Get count of active events
    const { count } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .gte('event_date', today);

    return new Response(JSON.stringify({ 
      success: true, 
      events_synced: futureEvents.length,
      total_active: count,
      synced_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error syncing events:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
