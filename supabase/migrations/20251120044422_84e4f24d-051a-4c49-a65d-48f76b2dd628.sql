-- -- Create newsletter_subscriptions table
-- CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   email TEXT NOT NULL UNIQUE,
--   subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
--   status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
--   source TEXT DEFAULT 'website',
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
-- );

-- -- Enable RLS
-- ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- -- Create policy to allow anyone to subscribe
-- CREATE POLICY "Anyone can subscribe to newsletter"
-- ON public.newsletter_subscriptions
-- FOR INSERT
-- WITH CHECK (true);

-- -- Create policy to allow reading own subscription
-- CREATE POLICY "Users can view all subscriptions"
-- ON public.newsletter_subscriptions
-- FOR SELECT
-- USING (true);

-- -- Create index for email lookups
-- CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);