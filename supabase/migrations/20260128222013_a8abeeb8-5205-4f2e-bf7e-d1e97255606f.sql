-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move pg_net extension from public to extensions schema
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net SCHEMA extensions;