"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  login: (email: string) => void;
  loginSocial: (provider: "google" | "facebook") => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  updateBankInfo: (data: Partial<UserProfile["bankInfo"]>) => void;
  getEventBySlug: (slug: string) => EventData | undefined;
  createEvent: (data: Partial<EventData>) => EventData;
  updateEvent: (slug: string, data: Partial<EventData>) => void;
  addGiftToEvent: (slug: string, gift: Omit<Gift, "id" | "currentAmount">) => void;
  recordGiftPayment: (
    slug: string,
    giftId: string,
    amount: number,
    dedication?: { name: string; message: string }
  ) => void;
  submitRSVP: (slug: string, rsvp: Omit<RSVP, "id" | "createdAt">) => void;
  submitDedicatoria: (slug: string, dedicatoria: Omit<Dedicatoria, "id" | "createdAt">) => void;
}

const INITIAL_USER: UserProfile = {
  id: "usr_conamor_01",
  name: "Camila",
  lastName: "Fernández Vega",
  email: "camila.fernandez@conamor.mx",
  phone: "+52 55 4912 8301",
  nationality: "Mexicana",
  country: "México",
  state: "Ciudad de México",
  city: "CDMX",
  address: "Av. Horacio 1520, Polanco",
  documentType: "ine",
  documentNumber: "FRVGC89021409H400",
  documentValidated: true,
  documentFileName: "INE_Camila_Fernandez_Oficial.pdf",
  acceptedTerms: true,
  acceptedPrivacy: true,
  consentDataProcessing: true,
  bankInfo: {
    holderName: "Camila Fernández Vega",
    bankName: "BBVA México",
    accountType: "debito",
    accountNumber: "0123 4567 8901",
    clabe: "0121 8000 1234 5678 90",
    stripeConnected: true,
    stripeAccountId: "acct_1TWJC6LQCRbKkM08",
    stripePayoutsEnabled: true,
  },
};

const DEFAULT_EVENTS: EventData[] = [
  {
    id: "evt_01",
    slug: "boda-erika-jose-luis",
    title: "Boda de Ensueño — Erika & Jose Luis",
    type: "Boda",
    brandTitle: "ALURE WEDDINGS",
    hostNames: "Erika & Jose Luis",
    coHosts: "Familia Navarro Delgado",
    date: "30 de Mayo de 2026",
    time: "18:00 hrs",
    locationName: "Hacienda Santa Clara",
    address: "Km 5.5 Carretera a Lagos, León, Guanajuato.",
    city: "León, México",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9b9u2-46-pEYf4taMSCS7F08bVOvSYEeuugKJ2KCcgfGHcoydjYVlkSLZZdGOpoS3Sj8fi-q9p_5-AFwE7XbkduItsoMVT8Q1qeR1ez_7PgPjKTJBi1XVyS1mrJzLFynW7zhra3Bk9__4j1vXrwyIkql9bDtC7t2e1aHkJl5nOVhwx042nkV-kE2wMjF_cd8dFAyPBA44YzAhOxIMx-rypWbpUJqN7bnkuUb_QrBIGp5hwG2OCjVdVFF-h7OXoJMEzn69kYgiDtc",
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWjF4jYpCyEgdh1UGg_YG9vXBwWscYnNV3d4nGIZea7m08NskFjZ1b4mwozfgltxAliF5KpgtybkuyFhNkE-0vV2SjrCwGjJ-KFWWlUokfBFWQAyK7k5YzuaXqg0Kfgh3K_hfcYgutgcC_pQV2fX4gtTTxrhJXa7He9_Kqj81TyTUT6Mrw6Gij16zzgXrlYNbvUYCgFnP7j1NIZ4nf_hx7iquNGNtoX0fH9RAvL4o2ezxQ_aeqQzX2dJveIX6eDi7Ng_ZFHHIqw08",
    dressCode: "Elegante",
    dressCodeImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaimOTr_dIN3vrZ-D1S4rJvW2TEQHFvixOFq839KkNcVZnGvSGVo4m1IbqM42rgTQyvSdE2BZcDEn4UNg_cCz3OlaltylOH67AkGDPJEoPB4Dcm9xcZmvroBZxA9TuaMtp2NnKeDvYXkqgqjl0rd0KvoFkoqH2gHn8yMZX-9dfDqQIFxIq61dp3rQUhc0-PzRaEQhAgRy8U9NZufzcC6j7Y6RRVlyvJe2JGcbNOj9J_zF0zYa_Tf-pnqYUQi7Ox6cMl6Gq_cAQ2YE",
    dressCodeDetails: {
      styleName: "Etiqueta Rigurosa",
      gentlemen: "Smoking o traje oscuro formal con corbata.",
      ladies: "Vestido largo de gala. Tonos sugeridos: Tierra y Joya.",
    },
    countdownTargetDate: "2026-05-30T18:00:00",
    countdownSubtitle: "Hasta el \"Sí, acepto\"",
    story:
      "Nos complace enormemente invitarles a ser testigos de nuestra unión. Este día marca el comienzo de una nueva aventura, rodeados de la elegancia y el amor de quienes más apreciamos. La celebración se llevará a cabo en el corazón de León, prometiendo ser una velada inolvidable de alta costura, música y romance.",
    closingQuote:
      "\"Que este día sea el fiel reflejo de la belleza que compartimos juntos y el inicio de una eternidad rodeados de vuestro cariño.\"",
    itinerary: [
      { time: "17:30 hrs", title: "Ceremonia Religiosa", desc: "Capilla de los Olivos" },
      { time: "18:45 hrs", title: "Cóctel de Bienvenida", desc: "Jardín Central con cuarteto de cuerdas" },
      { time: "20:00 hrs", title: "Banquete & Brindis", desc: "Salón Principal Hacienda Santa Clara" },
      { time: "22:00 hrs", title: "Celebración & Fiesta", desc: "DJ Set & Barra Libre Internacional" },
    ],
    primaryColor: "#870104",
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
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_02",
        title: "Cena Romántica en Le Sirenuse",
        description: "Una velada inolvidable a la luz de las velas frente al mar Mediterráneo.",
        category: "Experiencias",
        targetPrice: 8500,
        currentAmount: 8500,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_03",
        title: "Cafetera Espresso Italiana La Marzocco",
        description: "Para nuestras mañanas juntos disfrutando el mejor café de especialidad.",
        category: "Hogar",
        targetPrice: 38000,
        currentAmount: 22000,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_04",
        title: "Juego de Cava de Vinos Sommelier",
        description: "Colección curada de vinos de autor y copas Riedel de cristal tallado.",
        category: "Hogar",
        targetPrice: 12500,
        currentAmount: 6250,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rsvps: [
      {
        id: "rsvp_01",
        name: "Carlos Mendoza & Mariana Ruiz",
        email: "carlos.mendoza@gmail.com",
        phone: "+52 55 9876 5432",
        attending: true,
        guestsCount: 2,
        dietaryRestrictions: "Mariana es vegetariana",
        createdAt: "2026-10-15",
      },
      {
        id: "rsvp_02",
        name: "Valeria Domínguez",
        email: "valeria.dom@hotmail.com",
        phone: "+52 81 1234 5678",
        attending: true,
        guestsCount: 1,
        dietaryRestrictions: "Ninguna",
        createdAt: "2026-10-18",
      },
    ],
    dedicatorias: [
      {
        id: "ded_01",
        authorName: "Carlos & Mariana",
        message: "¡Los amamos con todo el corazón! Que esta nueva etapa esté llena de bendiciones y momentos inolvidables.",
        giftTitle: "Fondo de Luna de Miel",
        amount: 5000,
        createdAt: "15 Octubre, 2026",
      },
    ],
  },
  {
    id: "evt_02",
    slug: "networking-de-lujo",
    title: "Networking de Lujo — Leaders Circle Gala",
    type: "Networking",
    brandTitle: "LEADERS CIRCLE",
    hostNames: "Leaders Circle Summit",
    coHosts: "Comité Consultivo Ejecutivo",
    date: "18 de Julio de 2026",
    time: "19:00 hrs",
    locationName: "Club de Banqueros de México",
    address: "16 de Septiembre 27, Centro Histórico, CDMX",
    city: "Ciudad de México",
    coverImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2560&q=90",
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
    dressCode: "Elegancia Profesional",
    dressCodeImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    dressCodeDetails: {
      styleName: "Business Formal & Black Tie",
      gentlemen: "Smoking o traje formal oscuro con corbata de seda sobria.",
      ladies: "Traje sastre de alta costura o vestido largo de gala en tonos neutros.",
    },
    countdownTargetDate: "2026-07-18T19:00:00",
    countdownSubtitle: "Hasta la Apertura Oficial",
    story:
      "Nos complace convocar a la comunidad de fundadores, inversionistas y directivos de la industria a una noche de vinculación estratégica sin precedentes. Un espacio exclusivo donde la visión empresarial y la alta hospitalidad convergen para forjar las alianzas del mañana.",
    closingQuote:
      "\"El verdadero poder de una red radica en la autenticidad y excelencia de quienes la construyen.\"",
    itinerary: [
      { time: "19:00 hrs", title: "Acreditación & Welcome Cocktail", desc: "Recepción de invitados y fotos en photo opportunity" },
      { time: "20:00 hrs", title: "Keynote de Apertura", desc: "Perspectivas de Inversión y Capital 2026" },
      { time: "21:00 hrs", title: "Cena de Gala & Mesas Redondas", desc: "Menú degustación en 4 tiempos por chef estrella Michelin" },
      { time: "23:00 hrs", title: "Exclusive Networking Lounge", desc: "Música de jazz contemporáneo y cata de destilados premium" },
    ],
    primaryColor: "#870104",
    typography: "Playfair Display",
    isHost: false,
    gifts: [
      {
        id: "gift_201",
        title: "Fondo de Becas para Jóvenes Emprendedores",
        description: "Aportación para patrocinar talento emergente en programas de aceleración.",
        category: "Experiencias",
        targetPrice: 50000,
        currentAmount: 32000,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_202",
        title: "Cena Exclusiva de Inversionistas & Speakers",
        description: "Mesa privada con los ponentes principales en el Salón Fundadores.",
        category: "Experiencias",
        targetPrice: 24000,
        currentAmount: 18000,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rsvps: [],
    dedicatorias: [],
  },
  {
    id: "evt_03",
    slug: "evento-privado",
    title: "Evento Privado — Gala Nocturna Golden Hour",
    type: "Evento Privado",
    brandTitle: "PRIVATE SOIREE",
    hostNames: "Gala Privada",
    coHosts: "Anfitriones & Amigos",
    date: "24 de Octubre de 2026",
    time: "20:00 hrs",
    locationName: "Belmond Casa de Sierra Nevada",
    address: "Hospicio 35, Zona Centro, San Miguel de Allende, GTO",
    city: "San Miguel de Allende, GTO",
    coverImage:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2560&q=90",
    mapImage:
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80",
    dressCode: "Intimidad y Detalle",
    dressCodeImage:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80",
    dressCodeDetails: {
      styleName: "Cocktail Chic & Toques Dorados",
      gentlemen: "Blazer de etiqueta con camisa italiana sin corbata.",
      ladies: "Vestido midi de diseñador o conjunto sofisticado con toques dorados.",
    },
    countdownTargetDate: "2026-10-24T20:00:00",
    countdownSubtitle: "Hasta la Gran Noche",
    story:
      "Una velada íntima reservada para nuestro círculo más cercano. Entre patios coloniales iluminados por candiles, gastronomía de autor y coctelería artesanal, celebraremos los momentos que dan sentido a nuestro camino.",
    closingQuote:
      "\"La intimidad compartida con las personas indicadas transforma una noche común en un recuerdo para toda la vida.\"",
    itinerary: [
      { time: "20:00 hrs", title: "Cocktail al Atardecer", desc: "Golden hour drinks con vista a las torres de San Miguel" },
      { time: "21:30 hrs", title: "Cena Íntima a la Luz de las Velas", desc: "Menú de autor y maridaje con vinos de autor" },
      { time: "23:00 hrs", title: "Música & Brindis", desc: "Brindis con champagne y set de vinilos clásicos" },
    ],
    primaryColor: "#9E8C34",
    typography: "Playfair Display",
    isHost: true,
    gifts: [
      {
        id: "gift_301",
        title: "Vuelo en Globo al Amanecer sobre Teotihuacán",
        description: "Paseo inolvidable con brindis de champagne sobre el valle.",
        category: "Experiencias",
        targetPrice: 6500,
        currentAmount: 6500,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_302",
        title: "Cata Privada de Vinos Reserva en Cava Subterránea",
        description: "Experiencia sommelier guiada con selección de vinos de guarda.",
        category: "Experiencias",
        targetPrice: 12000,
        currentAmount: 8000,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rsvps: [],
    dedicatorias: [],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [events, setEvents] = useState<EventData[]>(DEFAULT_EVENTS);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("conamor_auth");
      if (storedAuth !== null) {
        setIsLoggedIn(storedAuth === "true");
      }
      const storedEvents = localStorage.getItem("conamor_events");
      if (storedEvents) {
        const parsed: EventData[] = JSON.parse(storedEvents);
        if (parsed.some((e) => e.slug === "boda-erika-jose-luis")) {
          setEvents(parsed);
        } else {
          setEvents(DEFAULT_EVENTS);
          localStorage.setItem("conamor_events", JSON.stringify(DEFAULT_EVENTS));
        }
      }
      const storedUser = localStorage.getItem("conamor_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // LocalStorage unavailable in SSR
    }
  }, []);

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

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({ ...prev, email }));
    try {
      localStorage.setItem("conamor_auth", "true");
    } catch {
      // ignore
    }
  };

  const loginSocial = (provider: "google" | "facebook") => {
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

  const logout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.setItem("conamor_auth", "false");
    } catch {
      // ignore
    }
  };

  const updateUser = (data: Partial<UserProfile>) => {
    const updated = { ...user, ...data };
    saveUser(updated);
  };

  const updateBankInfo = (data: Partial<UserProfile["bankInfo"]>) => {
    const updated = {
      ...user,
      bankInfo: {
        ...user.bankInfo,
        ...data,
      },
    };
    saveUser(updated);
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

  const createEvent = (data: Partial<EventData>): EventData => {
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
      primaryColor: data.primaryColor || "#870104",
      typography: data.typography || "Playfair Display",
      isHost: true,
      gifts: data.gifts || [],
      rsvps: [],
      dedicatorias: [],
    };

    const updated = [newEvent, ...events];
    saveEvents(updated);
    return newEvent;
  };

  const updateEvent = (slug: string, data: Partial<EventData>) => {
    const updated = events.map((e) => (e.slug === slug ? { ...e, ...data } : e));
    saveEvents(updated);
  };

  const addGiftToEvent = (slug: string, gift: Omit<Gift, "id" | "currentAmount">) => {
    const updated = events.map((e) => {
      if (e.slug === slug) {
        const newGift: Gift = {
          ...gift,
          id: "gift_" + Date.now(),
          currentAmount: 0,
        };
        return {
          ...e,
          gifts: [...e.gifts, newGift],
        };
      }
      return e;
    });
    saveEvents(updated);
  };

  const recordGiftPayment = (
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
  };

  const submitRSVP = (slug: string, rsvp: Omit<RSVP, "id" | "createdAt">) => {
    const updated = events.map((e) => {
      if (e.slug === slug) {
        const newRsvp: RSVP = {
          ...rsvp,
          id: "rsvp_" + Date.now(),
          createdAt: new Date().toISOString().split("T")[0],
        };
        return {
          ...e,
          rsvps: [newRsvp, ...e.rsvps],
        };
      }
      return e;
    });
    saveEvents(updated);
  };

  const submitDedicatoria = (slug: string, dedicatoria: Omit<Dedicatoria, "id" | "createdAt">) => {
    const updated = events.map((e) => {
      if (e.slug === slug) {
        const newDed: Dedicatoria = {
          ...dedicatoria,
          id: "ded_" + Date.now(),
          createdAt: "Hoy",
        };
        return {
          ...e,
          dedicatorias: [newDed, ...e.dedicatorias],
        };
      }
      return e;
    });
    saveEvents(updated);
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
