-- Create enum for news categories
CREATE TYPE public.news_category AS ENUM ('local', 'outdoors', 'wildlife', 'community', 'weather', 'business', 'sports');

-- Create enum for alert severity
CREATE TYPE public.alert_severity AS ENUM ('info', 'warning', 'urgent', 'emergency');

-- Create news articles table
CREATE TABLE public.news_articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    category news_category NOT NULL DEFAULT 'local',
    image_url TEXT,
    author TEXT DEFAULT 'Kenai Peninsula News',
    is_breaking BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity alert_severity NOT NULL DEFAULT 'info',
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news ticker table
CREATE TABLE public.news_ticker (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    message TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create aurora forecast table
CREATE TABLE public.aurora_forecast (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    kp_index DECIMAL(3,1) NOT NULL,
    visibility_chance INTEGER NOT NULL CHECK (visibility_chance >= 0 AND visibility_chance <= 100),
    best_viewing_time TEXT,
    forecast_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_ticker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aurora_forecast ENABLE ROW LEVEL SECURITY;

-- Create public read policies (news is public)
CREATE POLICY "Anyone can read news articles" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Anyone can read alerts" ON public.alerts FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read ticker" ON public.news_ticker FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can read aurora forecast" ON public.aurora_forecast FOR SELECT USING (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_articles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_ticker;
ALTER PUBLICATION supabase_realtime ADD TABLE public.aurora_forecast;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add trigger to news_articles
CREATE TRIGGER update_news_articles_updated_at
BEFORE UPDATE ON public.news_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.news_articles (title, excerpt, category, is_featured, is_breaking, image_url) VALUES
('Record Salmon Run Expected on Kenai River This Summer', 'Wildlife experts predict one of the largest sockeye salmon runs in decades, drawing anglers from across the globe.', 'wildlife', true, false, null),
('Kenai Peninsula Borough Assembly Approves New Trail System', 'A 15-mile multi-use trail connecting Soldotna to Kenai receives unanimous approval.', 'community', false, false, null),
('Aurora Borealis Puts on Spectacular Show Over Kenai Mountains', 'Residents captured breathtaking photos of the northern lights dancing across the night sky.', 'local', true, false, null),
('Local Business Expansion Brings 50 New Jobs to Kenai', 'Peninsula Manufacturing announces major expansion plans with significant hiring initiative.', 'business', false, false, null),
('Winter Storm Warning: Heavy Snow Expected This Weekend', 'National Weather Service issues advisory for Kenai Peninsula with 12-18 inches of snow forecasted.', 'weather', false, true, null),
('Kenai Central High School Hockey Team Advances to State Finals', 'The Kardinals defeat Juneau-Douglas in overtime thriller.', 'sports', false, false, null);

INSERT INTO public.alerts (title, message, severity) VALUES
('Winter Weather Advisory', 'Heavy snow expected Friday through Sunday. Prepare for hazardous driving conditions.', 'warning'),
('Moose Activity Alert', 'Increased moose sightings reported on Kalifornsky Beach Road. Drive with caution.', 'info');

INSERT INTO public.news_ticker (message, priority) VALUES
('Breaking: Record low temperatures expected tonight - protect pipes and pets', 3),
('Kenai River Personal Use Fishery opens July 10th', 2),
('Community cleanup event Saturday at Old Town Kenai', 1),
('Borough offices closed Monday for state holiday', 0);

INSERT INTO public.aurora_forecast (kp_index, visibility_chance, best_viewing_time) VALUES
(4.5, 65, '11 PM - 2 AM');