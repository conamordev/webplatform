-- ==============================================================================
-- CONAMOR, — SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
  CREATE TYPE celebration_type AS ENUM (
    'Boda', 'Baby Shower', 'Cumpleaños', 'Bautizo', 'Aniversario', 'Graduación', 'Networking', 'Evento Privado', 'Otro'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE gift_category AS ENUM (
    'Luna de Miel', 'Hogar', 'Experiencias', 'Nuestro Futuro', 'Aporte Libre', 'Electrodomésticos'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked directly to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  last_name TEXT DEFAULT '',
  email TEXT UNIQUE NOT NULL,
  phone TEXT DEFAULT '',
  nationality TEXT DEFAULT 'Mexicana',
  country TEXT DEFAULT 'México',
  state TEXT DEFAULT '',
  city TEXT DEFAULT '',
  address TEXT DEFAULT '',
  document_type TEXT DEFAULT 'ine',
  document_number TEXT DEFAULT '',
  document_validated BOOLEAN DEFAULT false,
  document_url TEXT,
  accepted_terms BOOLEAN DEFAULT false,
  accepted_privacy BOOLEAN DEFAULT false,
  consent_data_processing BOOLEAN DEFAULT false,
  
  -- Bank & Stripe Connect Information
  bank_holder_name TEXT DEFAULT '',
  bank_name TEXT DEFAULT '',
  bank_account_type TEXT DEFAULT 'debito',
  bank_account_number TEXT DEFAULT '',
  bank_clabe TEXT DEFAULT '',
  stripe_connected BOOLEAN DEFAULT false,
  stripe_account_id TEXT,
  stripe_payouts_enabled BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'Boda',
  host_names TEXT NOT NULL,
  co_hosts TEXT DEFAULT '',
  brand_title TEXT DEFAULT '',
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location_name TEXT NOT NULL,
  address TEXT DEFAULT '',
  city TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  map_image TEXT,
  dress_code_image TEXT,
  dress_code_details JSONB DEFAULT '{"styleName": "Formal", "ladies": "Vestido largo", "gentlemen": "Traje oscuro"}'::jsonb,
  countdown_target_date TEXT,
  countdown_subtitle TEXT,
  closing_quote TEXT,
  story TEXT DEFAULT '',
  dress_code TEXT DEFAULT 'Formal',
  itinerary JSONB DEFAULT '[]'::jsonb,
  primary_color TEXT DEFAULT '#8B162B',
  typography TEXT DEFAULT 'Playfair Display',
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. GIFTS TABLE
CREATE TABLE IF NOT EXISTS public.gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'Experiencias',
  target_price NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  current_amount NUMERIC(12, 2) DEFAULT 0 NOT NULL,
  is_free_amount BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,

  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. RSVPS TABLE (Confirmación de Asistencia)
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  attending BOOLEAN DEFAULT true NOT NULL,
  guests_count INTEGER DEFAULT 1 NOT NULL,
  dietary_restrictions TEXT DEFAULT '',

  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. DEDICATORIAS TABLE (Mensajes y Felicitaciones de Invitados)
CREATE TABLE IF NOT EXISTS public.dedicatorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  gift_id UUID REFERENCES public.gifts(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  message TEXT NOT NULL,
  amount NUMERIC(12, 2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS idx_gifts_event_id ON public.gifts(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_event_id ON public.rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_dedicatorias_event_id ON public.dedicatorias(event_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dedicatorias ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- EVENTS POLICIES
-- Anyone can view active events (public event page for guests)
CREATE POLICY "Public can view active events"
  ON public.events FOR SELECT
  USING (is_active = true);

-- Authenticated users can insert their own events
CREATE POLICY "Users can create own events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Hosts can update their own events
CREATE POLICY "Hosts can update own events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Hosts can delete their own events
CREATE POLICY "Hosts can delete own events"
  ON public.events FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- GIFTS POLICIES
-- Anyone can view gifts for active events
CREATE POLICY "Public can view gifts"
  ON public.gifts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE public.events.id = public.gifts.event_id AND public.events.is_active = true
    )
  );

-- Hosts can insert, update, or delete gifts for their own events
CREATE POLICY "Hosts can manage gifts"
  ON public.gifts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE public.events.id = public.gifts.event_id AND public.events.user_id = auth.uid()
    )
  );

-- Allow public contribution amount update on gifts
CREATE POLICY "Public can update gift amounts"
  ON public.gifts FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- RSVPS POLICIES
-- Anyone (guests) can submit an RSVP
CREATE POLICY "Public can submit RSVP"
  ON public.rsvps FOR INSERT
  WITH CHECK (true);

-- Hosts can view RSVPs for their events
CREATE POLICY "Hosts can view RSVPs"
  ON public.rsvps FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE public.events.id = public.rsvps.event_id AND public.events.user_id = auth.uid()
    )
  );

-- DEDICATORIAS POLICIES
-- Anyone (guests) can submit a dedicatoria
CREATE POLICY "Public can submit dedicatoria"
  ON public.dedicatorias FOR INSERT
  WITH CHECK (true);

-- Anyone can view dedicatorias for active events (wall of love)
CREATE POLICY "Public can view dedicatorias"
  ON public.dedicatorias FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE public.events.id = public.dedicatorias.event_id AND public.events.is_active = true
    )
  );

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    last_name,
    email,
    phone,
    accepted_terms,
    accepted_privacy
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    true,
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for auto-updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_events_updated_at ON public.events;
CREATE TRIGGER set_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

