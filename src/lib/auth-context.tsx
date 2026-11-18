"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface Gift {
  id: string;
  title: string;
  description: string;
  category: "Hogar" | "Luna de Miel" | "Experiencias" | "Aporte Libre" | "Electrodomésticos";
  targetPrice: number;
  currentAmount: number;
  isFreeAmount: boolean;
  image: string;
}

export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  guestsCount: number;
  dietaryRestrictions?: string;
  createdAt: string;
}

export interface Dedicatoria {
  id: string;
  authorName: string;
  message: string;
  giftTitle?: string;
  amount?: number;
  createdAt: string;
}

export interface EventData {
  id: string;
  slug: string;
  title: string;
  type: "Boda" | "Baby Shower" | "Cumpleaños" | "Bautizo" | "Networking" | "Evento Privado" | "Otro";
  hostNames: string;
  coHosts?: string;
  brandTitle?: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  city: string;
  coverImage: string;
  mapImage?: string;
  dressCodeImage?: string;
  dressCodeDetails?: {
    styleName: string;
    gentlemen: string;
    ladies: string;
  };
  countdownTargetDate?: string;
  countdownSubtitle?: string;
  closingQuote?: string;
  story?: string;
  dressCode: string;
  itinerary: { time: string; title: string; desc: string }[];
  primaryColor: string;
  typography: string;
  isHost: boolean;
  gifts: Gift[];
  rsvps: RSVP[];
  dedicatorias: Dedicatoria[];
}

export interface UserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  country: string;
  state: string;
  city: string;
  address: string;
  documentType: "ine" | "curp" | "rfc" | "passport";
  documentNumber: string;
  documentValidated: boolean;
  documentFileName?: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  consentDataProcessing: boolean;
  bankInfo: {
    holderName: string;
    bankName: string;
    accountType: "cheques" | "debito" | "ahorro";
    accountNumber: string;
    clabe: string;
    stripeConnected: boolean;
    stripeAccountId?: string;
    stripePayoutsEnabled?: boolean;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile;
  events: EventData[];
  activeEvent: EventData | null;
  toggleAuth: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    metadata?: { name: string; lastName?: string; phone?: string }
  ) => Promise<{ success: boolean; error?: string }>;
  loginSocial: (provider: "google" | "facebook") => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void> | void;
  updateBankInfo: (data: Partial<UserProfile["bankInfo"]>) => Promise<void> | void;
  getEventBySlug: (slug: string) => EventData | undefined;
  createEvent: (data: Partial<EventData>) => Promise<EventData>;
  updateEvent: (slug: string, data: Partial<EventData>) => Promise<void> | void;
  addGiftToEvent: (slug: string, gift: Omit<Gift, "id" | "currentAmount">) => Promise<void> | void;
  recordGiftPayment: (
    slug: string,
    giftId: string,
    amount: number,
    dedication?: { name: string; message: string }
  ) => Promise<void> | void;
  submitRSVP: (slug: string, rsvp: Omit<RSVP, "id" | "createdAt">) => Promise<void> | void;
  submitDedicatoria: (
    slug: string,
    dedicatoria: Omit<Dedicatoria, "id" | "createdAt">
  ) => Promise<void> | void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial baseline mock profile
const INITIAL_USER: UserProfile = {
  id: "usr_mock_01",
  name: "Camila",
  lastName: "Fernández",
  email: "camila@conamor.mx",
  phone: "+52 55 4920 1839",
  nationality: "Mexicana",
  country: "México",
  state: "Ciudad de México",
  city: "Benito Juárez",
  address: "Av. Insurgentes Sur 1450, Int. 4B, Col. Del Valle",
  documentType: "ine",
  documentNumber: "IDMX2084920491",
  documentValidated: true,
  documentFileName: "INE_Camila_Fernandez_Oficial.pdf",
  acceptedTerms: true,
  acceptedPrivacy: true,
  consentDataProcessing: true,
  bankInfo: {
    holderName: "Camila Fernández Alcocer",
    bankName: "BBVA México",
    accountType: "debito",
    accountNumber: "•••• 4829",
    clabe: "012180001234567897",
    stripeConnected: true,
    stripeAccountId: "acct_1OuX92K492Lks02",
    stripePayoutsEnabled: true,
  },
};

const INITIAL_EVENTS: EventData[] = [
  {
    id: "evt_01",
    slug: "boda-erika-jose-luis",
    title: "Boda de Erika & José Luis",
    type: "Boda",
    hostNames: "Erika Alcocer & José Luis Morales",
    coHosts: "María Morales (Wedding Planner)",
    brandTitle: "Mesa de Regalos de Alta Costura",
    date: "14 de Noviembre, 2026",
    time: "17:30 hrs",
    locationName: "Hacienda San José Lavista",
    address: "Carretera San Miguel a Dolores Hidalgo km 10.2",
    city: "San Miguel de Allende, Guanajuato",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
    dressCodeImage:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
    dressCodeDetails: {
      styleName: "Black Tie & Traje de Etiqueta",
      ladies: "Vestido largo de noche en tonos cálidos, tierra o pastel.",
      gentlemen: "Esmoquin o traje oscuro formal con corbata o moño.",
    },
    dressCode: "Black Tie & Traje de Etiqueta",
    countdownTargetDate: "2026-11-14T17:30:00",
    countdownSubtitle: "Cuenta regresiva para nuestro gran día",
    story:
      "Nos complace enormemente invitarles a ser testigos de nuestra unión. Este día marca el comienzo de una nueva aventura, rodeados de la elegancia y el amor de quienes más apreciamos. La celebración se llevará a cabo en el corazón de San Miguel de Allende.",
    closingQuote:
      '"Que este día sea el fiel reflejo de la belleza que compartimos juntos y el inicio de una eternidad."',
    itinerary: [
      { time: "17:30 hrs", title: "Ceremonia Religiosa", desc: "Capilla de la Hacienda" },
      { time: "18:45 hrs", title: "Cóctel de Bienvenida", desc: "Jardín Central con cuarteto de cuerdas" },
      { time: "20:00 hrs", title: "Banquete & Brindis", desc: "Salón Principal" },
      { time: "22:00 hrs", title: "Celebración & Fiesta", desc: "DJ Set & Barra Libre Internacional" },
    ],
    primaryColor: "#8B162B",
    typography: "Playfair Display",
    isHost: true,
    gifts: [
      {
        id: "gift_01",
        title: "Fondo de Luna de Miel en la Costa Amalfitana",
        description: "Ayúdanos a vivir un viaje de ensueño navegando por Positano y Capri.",
        category: "Luna de Miel",
        targetPrice: 75000,
        currentAmount: 48500,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "gift_02",
        title: "Cena Degustación en Restaurante Michelin",
        description: "Experiencia culinaria de 7 tiempos con maridaje de vinos en Florencia.",
        category: "Experiencias",
        targetPrice: 12000,
        currentAmount: 12000,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: "gift_03",
        title: "Juego de Vajilla de Porcelana Francesa",
        description: "Set artesanal de 24 piezas para nuestras primeras cenas como esposos.",
        category: "Hogar",
        targetPrice: 24500,
        currentAmount: 15000,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=1000&q=80",
      },
    ],
    rsvps: [
      {
        id: "rsvp_01",
        name: "Lic. Fernando Garza",
        email: "f.garza@grupoinversion.mx",
        phone: "+52 81 8392 0192",
        attending: true,
        guestsCount: 2,
        dietaryRestrictions: "Vegetariano para acompañante",
        createdAt: "2026-10-12",
      },
      {
        id: "rsvp_02",
        name: "Dra. Carmen Villalobos",
        email: "carmen.villa@hospitalmed.com",
        phone: "+52 55 9301 4920",
        attending: true,
        guestsCount: 1,
        dietaryRestrictions: "Sin gluten",
        createdAt: "2026-10-15",
      },
    ],
    dedicatorias: [
      {
        id: "ded_01",
        authorName: "Sofía & Andrés Mestre",
        message:
          "Queridos Erika y José Luis, que su vida juntos esté repleta de instantes tan luminosos como este día. ¡Todo nuestro cariño!",
        giftTitle: "Fondo de Luna de Miel en la Costa Amalfitana",
        amount: 5000,
        createdAt: "Hace 2 días",
      },
    ],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS);

  // Sync session on mount
  useEffect(() => {
    // 1. If Supabase is configured, initialize Supabase Auth listener
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsLoggedIn(true);
          loadSupabaseUserProfile(session.user.id, session.user.email || "");
          loadSupabaseEvents(session.user.id);
        } else {
          // Check local storage fallback
          loadLocalFallback();
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setIsLoggedIn(true);
            await loadSupabaseUserProfile(session.user.id, session.user.email || "");
            await loadSupabaseEvents(session.user.id);
          } else if (event === "SIGNED_OUT") {
            setIsLoggedIn(false);
            setUser(INITIAL_USER);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    } else {
      // 2. Fallback to localStorage
      loadLocalFallback();
    }
  }, []);

  const loadLocalFallback = () => {
    try {
      const savedAuth = localStorage.getItem("conamor_auth");
      if (savedAuth !== null) {
        setIsLoggedIn(savedAuth === "true");
      }
      const savedUser = localStorage.getItem("conamor_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedEvents = localStorage.getItem("conamor_events");
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch {
      // ignore
    }
  };

  const loadSupabaseUserProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setUser({
          id: data.id,
          name: data.name,
          lastName: data.last_name || "",
          email: data.email || email,
          phone: data.phone || "",
          nationality: data.nationality || "Mexicana",
          country: data.country || "México",
          state: data.state || "",
          city: data.city || "",
          address: data.address || "",
          documentType: data.document_type || "ine",
          documentNumber: data.document_number || "",
          documentValidated: data.document_validated || false,
          documentFileName: data.document_url || "",
          acceptedTerms: data.accepted_terms || true,
          acceptedPrivacy: data.accepted_privacy || true,
          consentDataProcessing: data.consent_data_processing || true,
          bankInfo: {
            holderName: data.bank_holder_name || "",
            bankName: data.bank_name || "",
            accountType: data.bank_account_type || "debito",
            accountNumber: data.bank_account_number || "",
            clabe: data.bank_clabe || "",
            stripeConnected: data.stripe_connected || false,
            stripeAccountId: data.stripe_account_id || undefined,
            stripePayoutsEnabled: data.stripe_payouts_enabled || false,
          },
        });
      }
    } catch (err) {
      console.error("Error loading Supabase profile:", err);
    }
  };

  const loadSupabaseEvents = async (userId: string) => {
    try {
      const { data: dbEvents, error } = await supabase
        .from("events")
        .select(`
          *,
          gifts (*),
          rsvps (*),
          dedicatorias (*)
        `)
        .eq("user_id", userId);

      if (dbEvents && !error && dbEvents.length > 0) {
        const formatted: EventData[] = dbEvents.map((e: any) => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          type: e.type,
          hostNames: e.host_names,
          coHosts: e.co_hosts,
          brandTitle: e.brand_title,
          date: e.date,
          time: e.time,
          locationName: e.location_name,
          address: e.address,
          city: e.city,
          coverImage: e.cover_image,
          mapImage: e.map_image,
          dressCodeImage: e.dress_code_image,
          dressCodeDetails: e.dress_code_details,
          countdownTargetDate: e.countdown_target_date,
          countdownSubtitle: e.countdown_subtitle,
          closingQuote: e.closing_quote,
          story: e.story,
          dressCode: e.dress_code,
          itinerary: e.itinerary || [],
          primaryColor: e.primary_color || "#8B162B",
          typography: e.typography || "Playfair Display",
          isHost: true,
          gifts: (e.gifts || []).map((g: any) => ({
            id: g.id,
            title: g.title,
            description: g.description,
            category: g.category,
            targetPrice: Number(g.target_price),
            currentAmount: Number(g.current_amount),
            isFreeAmount: g.is_free_amount,
            image: g.image_url,
          })),
          rsvps: (e.rsvps || []).map((r: any) => ({
            id: r.id,
            name: r.name,
            email: r.email,
            phone: r.phone,
            attending: r.attending,
            guestsCount: r.guests_count,
            dietaryRestrictions: r.dietary_restrictions,
            createdAt: r.created_at,
          })),
          dedicatorias: (e.dedicatorias || []).map((d: any) => ({
            id: d.id,
            authorName: d.author_name,
            message: d.message,
            amount: Number(d.amount),
            createdAt: d.created_at,
          })),
        }));

        setEvents(formatted);
      }
    } catch (err) {
      console.error("Error loading Supabase events:", err);
    }
  };

  const saveEvents = (updated: EventData[]) => {
    setEvents(updated);
    try {
      localStorage.setItem("conamor_events", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const saveUser = (updated: UserProfile) => {
    setUser(updated);
    try {
      localStorage.setItem("conamor_user", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleAuth = () => {
    const next = !isLoggedIn;
    setIsLoggedIn(next);
    try {
      localStorage.setItem("conamor_auth", String(next));
    } catch {
      // ignore
    }
  };

  const login = async (email: string, password?: string) => {
    if (isSupabaseConfigured && password) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        setIsLoggedIn(true);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || "Error al iniciar sesión" };
      }
    }

    // Local / Demo mode fallback
    setIsLoggedIn(true);
    setUser((prev) => ({ ...prev, email }));
    try {
      localStorage.setItem("conamor_auth", "true");
    } catch {
      // ignore
    }
    return { success: true };
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: { name: string; lastName?: string; phone?: string }
  ) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: metadata?.name || "",
              last_name: metadata?.lastName || "",
              phone: metadata?.phone || "",
            },
          },
        });

        if (error) {
          return { success: false, error: error.message };
        }

        setIsLoggedIn(true);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || "Error al registrarse" };
      }
    }

    // Local fallback
    setIsLoggedIn(true);
    const updated = {
      ...user,
      email,
      name: metadata?.name || user.name,
      lastName: metadata?.lastName || user.lastName,
      phone: metadata?.phone || user.phone,
    };
    saveUser(updated);
    try {
      localStorage.setItem("conamor_auth", "true");
    } catch {
      // ignore
    }
    return { success: true };
  };

  const loginSocial = async (provider: "google" | "facebook") => {
    if (isSupabaseConfigured) {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/perfil` : undefined,
        },
      });
      return;
    }

    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      name: provider === "google" ? "Usuario Google" : "Usuario Facebook",
    }));
    try {
      localStorage.setItem("conamor_auth", "true");
    } catch {
      // ignore
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsLoggedIn(false);
    try {
      localStorage.setItem("conamor_auth", "false");
    } catch {
      // ignore
    }
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    const updated = { ...user, ...data };
    saveUser(updated);

    if (isSupabaseConfigured && user.id) {
      try {
        await supabase
          .from("profiles")
          .update({
            name: updated.name,
            last_name: updated.lastName,
            phone: updated.phone,
            nationality: updated.nationality,
            country: updated.country,
            state: updated.state,
            city: updated.city,
            address: updated.address,
            document_type: updated.documentType,
            document_number: updated.documentNumber,
            document_validated: updated.documentValidated,
            document_url: updated.documentFileName,
            accepted_terms: updated.acceptedTerms,
            accepted_privacy: updated.acceptedPrivacy,
            consent_data_processing: updated.consentDataProcessing,
          })
          .eq("id", user.id);
      } catch (err) {
        console.error("Error updating profile in Supabase:", err);
      }
    }
  };

  const updateBankInfo = async (data: Partial<UserProfile["bankInfo"]>) => {
    const updated = {
      ...user,
      bankInfo: {
        ...user.bankInfo,
        ...data,
      },
    };
    saveUser(updated);

    if (isSupabaseConfigured && user.id) {
      try {
        await supabase
          .from("profiles")
          .update({
            bank_holder_name: updated.bankInfo.holderName,
            bank_name: updated.bankInfo.bankName,
            bank_account_type: updated.bankInfo.accountType,
            bank_account_number: updated.bankInfo.accountNumber,
            bank_clabe: updated.bankInfo.clabe,
            stripe_connected: updated.bankInfo.stripeConnected,
            stripe_account_id: updated.bankInfo.stripeAccountId,
            stripe_payouts_enabled: updated.bankInfo.stripePayoutsEnabled,
          })
          .eq("id", user.id);
      } catch (err) {
        console.error("Error updating bank info in Supabase:", err);
      }
    }
  };

  const getEventBySlug = (slug: string) => {
    const directMatch = events.find((e) => e.slug === slug);
    if (directMatch) return directMatch;
    // Aliases for compatibility
    if (slug === "boda-sofia-mateo" || slug === "boda-de-ensueno") {
      return events.find((e) => e.slug === "boda-erika-jose-luis") || events[0];
    }
    if (slug === "baby-shower-valetina") {
      return events.find((e) => e.slug === "networking-de-lujo") || events[1];
    }
    if (slug === "cumpleanos-camila-30") {
      return events.find((e) => e.slug === "evento-privado") || events[2];
    }
    return events[0];
  };

  const createEvent = async (data: Partial<EventData>): Promise<EventData> => {
    const slug = (data.title || "nuevo-evento")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newEvent: EventData = {
      id: "evt_" + Date.now(),
      slug: slug || "evento-" + Date.now(),
      title: data.title || "Nuestro Gran Evento",
      type: data.type || "Boda",
      hostNames: data.hostNames || user.name + " " + user.lastName,
      coHosts: data.coHosts || "",
      date: data.date || "Fecha por definir",
      time: data.time || "18:00 hrs",
      locationName: data.locationName || "Lugar del Evento",
      address: data.address || "",
      city: data.city || "México",
      coverImage:
        data.coverImage ||
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
      story: data.story || "Los esperamos para celebrar juntos este día tan especial.",
      dressCode: data.dressCode || "Formal",
      itinerary: data.itinerary || [
        { time: "18:00 hrs", title: "Bienvenida", desc: "Recepción de invitados" },
        { time: "19:00 hrs", title: "Cena", desc: "Banquete y brindis" },
      ],
      primaryColor: data.primaryColor || "#8B162B",
      typography: data.typography || "Playfair Display",
      isHost: true,
      gifts: data.gifts || [],
      rsvps: [],
      dedicatorias: [],
    };

    const updated = [newEvent, ...events];
    saveEvents(updated);

    if (isSupabaseConfigured && user.id) {
      try {
        const { data: dbEvent } = await supabase
          .from("events")
          .insert({
            user_id: user.id,
            slug: newEvent.slug,
            title: newEvent.title,
            type: newEvent.type,
            host_names: newEvent.hostNames,
            co_hosts: newEvent.coHosts,
            date: newEvent.date,
            time: newEvent.time,
            location_name: newEvent.locationName,
            address: newEvent.address,
            city: newEvent.city,
            cover_image: newEvent.coverImage,
            story: newEvent.story,
            dress_code: newEvent.dressCode,
            itinerary: newEvent.itinerary,
            primary_color: newEvent.primaryColor,
            typography: newEvent.typography,
          })
          .select()
          .single();

        if (dbEvent) {
          newEvent.id = dbEvent.id;
        }
      } catch (err) {
        console.error("Error creating event in Supabase:", err);
      }
    }

    return newEvent;
  };

  const updateEvent = async (slug: string, data: Partial<EventData>) => {
    const updated = events.map((e) => (e.slug === slug ? { ...e, ...data } : e));
    saveEvents(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("events")
          .update({
            title: data.title,
            type: data.type,
            host_names: data.hostNames,
            co_hosts: data.coHosts,
            date: data.date,
            time: data.time,
            location_name: data.locationName,
            address: data.address,
            city: data.city,
            cover_image: data.coverImage,
            map_image: data.mapImage,
            dress_code_image: data.dressCodeImage,
            story: data.story,
            dress_code: data.dressCode,
            itinerary: data.itinerary,
            primary_color: data.primaryColor,
            typography: data.typography,
          })
          .eq("slug", slug);
      } catch (err) {
        console.error("Error updating event in Supabase:", err);
      }
    }
  };

  const addGiftToEvent = async (slug: string, gift: Omit<Gift, "id" | "currentAmount">) => {
    const targetEvent = events.find((e) => e.slug === slug);
    const newGift: Gift = {
      ...gift,
      id: "gift_" + Date.now(),
      currentAmount: 0,
    };

    const updated = events.map((e) => {
      if (e.slug === slug) {
        return {
          ...e,
          gifts: [...e.gifts, newGift],
        };
      }
      return e;
    });
    saveEvents(updated);

    if (isSupabaseConfigured && targetEvent) {
      try {
        await supabase.from("gifts").insert({
          event_id: targetEvent.id,
          title: gift.title,
          description: gift.description,
          category: gift.category,
          target_price: gift.targetPrice,
          current_amount: 0,
          is_free_amount: gift.isFreeAmount,
          image_url: gift.image,
        });
      } catch (err) {
        console.error("Error adding gift to Supabase:", err);
      }
    }
  };

  const recordGiftPayment = async (
    slug: string,
    giftId: string,
    amount: number,
    dedication?: { name: string; message: string }
  ) => {
    const updated = events.map((e) => {
      if (e.slug === slug) {
        const updatedGifts = e.gifts.map((g) => {
          if (g.id === giftId) {
            return {
              ...g,
              currentAmount: g.currentAmount + amount,
            };
          }
          return g;
        });

        const updatedDedicatorias = dedication?.message
          ? [
              {
                id: "ded_" + Date.now(),
                authorName: dedication.name || "Invitado con Amor",
                message: dedication.message,
                amount: amount,
                createdAt: "Hoy",
              },
              ...e.dedicatorias,
            ]
          : e.dedicatorias;

        return {
          ...e,
          gifts: updatedGifts,
          dedicatorias: updatedDedicatorias,
        };
      }
      return e;
    });
    saveEvents(updated);

    if (isSupabaseConfigured) {
      try {
        const currentGift = events
          .find((e) => e.slug === slug)
          ?.gifts.find((g) => g.id === giftId);

        if (currentGift) {
          await supabase
            .from("gifts")
            .update({ current_amount: currentGift.currentAmount + amount })
            .eq("id", giftId);
        }

        const targetEvt = events.find((e) => e.slug === slug);
        if (targetEvt && dedication?.message) {
          await supabase.from("dedicatorias").insert({
            event_id: targetEvt.id,
            gift_id: giftId,
            author_name: dedication.name || "Invitado con Amor",
            message: dedication.message,
            amount: amount,
          });
        }
      } catch (err) {
        console.error("Error recording payment in Supabase:", err);
      }
    }
  };

  const submitRSVP = async (slug: string, rsvp: Omit<RSVP, "id" | "createdAt">) => {
    const newRsvp: RSVP = {
      ...rsvp,
      id: "rsvp_" + Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = events.map((e) => {
      if (e.slug === slug) {
        return {
          ...e,
          rsvps: [newRsvp, ...e.rsvps],
        };
      }
      return e;
    });
    saveEvents(updated);

    if (isSupabaseConfigured) {
      try {
        const targetEvt = events.find((e) => e.slug === slug);
        if (targetEvt) {
          await supabase.from("rsvps").insert({
            event_id: targetEvt.id,
            name: rsvp.name,
            email: rsvp.email,
            phone: rsvp.phone,
            attending: rsvp.attending,
            guests_count: rsvp.guestsCount,
            dietary_restrictions: rsvp.dietaryRestrictions || "",
          });
        }
      } catch (err) {
        console.error("Error submitting RSVP in Supabase:", err);
      }
    }
  };

  const submitDedicatoria = async (
    slug: string,
    dedicatoria: Omit<Dedicatoria, "id" | "createdAt">
  ) => {
    const newDed: Dedicatoria = {
      ...dedicatoria,
      id: "ded_" + Date.now(),
      createdAt: "Hoy",
    };

    const updated = events.map((e) => {
      if (e.slug === slug) {
        return {
          ...e,
          dedicatorias: [newDed, ...e.dedicatorias],
        };
      }
      return e;
    });
    saveEvents(updated);

    if (isSupabaseConfigured) {
      try {
        const targetEvt = events.find((e) => e.slug === slug);
        if (targetEvt) {
          await supabase.from("dedicatorias").insert({
            event_id: targetEvt.id,
            author_name: dedicatoria.authorName,
            message: dedicatoria.message,
            amount: dedicatoria.amount || 0,
          });
        }
      } catch (err) {
        console.error("Error submitting dedicatoria to Supabase:", err);
      }
    }
  };

  const activeEvent = events[0] || null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        events,
        activeEvent,
        toggleAuth,
        login,
        signUp,
        loginSocial,
        logout,
        updateUser,
        updateBankInfo,
        getEventBySlug,
        createEvent,
        updateEvent,
        addGiftToEvent,
        recordGiftPayment,
        submitRSVP,
        submitDedicatoria,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
