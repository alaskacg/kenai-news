import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string;
  event_date: string;
  event_time: string | null;
  category: string;
  source_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export function useEvents() {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(10);

      if (error) throw error;
      return data as Event[];
    },
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("events_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        () => {
          query.refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [query]);

  return query;
}
