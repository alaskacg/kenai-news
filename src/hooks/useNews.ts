import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: "local" | "outdoors" | "wildlife" | "community" | "weather" | "business" | "sports";
  image_url: string | null;
  author: string;
  is_breaking: boolean;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "urgent" | "emergency";
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface TickerMessage {
  id: string;
  message: string;
  is_active: boolean;
  priority: number;
  created_at: string;
}

export interface AuroraForecast {
  id: string;
  kp_index: number;
  visibility_chance: number;
  best_viewing_time: string | null;
  forecast_date: string;
  created_at: string;
}

export function useNewsArticles() {
  const query = useQuery({
    queryKey: ["news_articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as NewsArticle[];
    },
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("news_articles_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news_articles" },
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

export function useAlerts() {
  const query = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Alert[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("alerts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "alerts" },
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

export function useNewsTicker() {
  const query = useQuery({
    queryKey: ["news_ticker"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_ticker")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });

      if (error) throw error;
      return data as TickerMessage[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("ticker_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news_ticker" },
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

export function useAuroraForecast() {
  return useQuery({
    queryKey: ["aurora_forecast"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("aurora_forecast")
        .select("*")
        .order("forecast_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as AuroraForecast | null;
    },
  });
}
