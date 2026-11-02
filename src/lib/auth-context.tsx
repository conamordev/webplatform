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
  type: "Boda" | "Baby Shower" | "Cumpleaños" | "Bautizo" | "Otro";
  hostNames: string;
  coHosts?: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  city: string;
  coverImage: string;
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
    slug: "boda-sofia-mateo",
    title: "Nuestra Boda — Sofía & Mateo",
    type: "Boda",
    hostNames: "Sofía Alcocer & Mateo Delgado",
    coHosts: "Familia Alcocer Delgado",
    date: "14 de Febrero, 2027",
    time: "17:30 hrs",
    locationName: "Hacienda San José Lavista",
    address: "Carretera San Miguel de Allende - Dolores Hidalgo Km 10",
    city: "San Miguel de Allende, GTO",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    story:
      "Nos conocimos una tarde de otoño en Coyoacán. Ocho años, cientos de viajes y miles de risas después, decidimos unir nuestras vidas rodeados de quienes más amamos.",
    dressCode: "Rigurosa Etiqueta / Black Tie (Tonos Tierra y Neutros)",
    itinerary: [
      { time: "17:30 hrs", title: "Ceremonia Religiosa", desc: "Capilla de los Viñedos" },
      { time: "18:45 hrs", title: "Cóctel de Bienvenida", desc: "Jardín de Olivos con música en vivo" },
      { time: "20:00 hrs", title: "Banquete & Brindis", desc: "Salón Principal Hacienda" },
      { time: "22:00 hrs", title: "Fiesta & Celebración", desc: "DJ Set & Barra Libre Internacional" },
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
      {
        id: "rsvp_03",
        name: "Dr. Rodrigo Salgado",
        email: "dr.salgado@clinica.mx",
        phone: "+52 33 2211 4455",
        attending: false,
        guestsCount: 0,
        dietaryRestrictions: "",
        createdAt: "2026-10-22",
      },
    ],
    dedicatorias: [
      {
        id: "ded_01",
        authorName: "Carlos & Mariana",
        message: "¡Los amamos con todo el corazón! Que esta nueva etapa esté llena de bendiciones y viajes memorables.",
        giftTitle: "Fondo de Luna de Miel",
        amount: 5000,
        createdAt: "15 Octubre, 2026",
      },
      {
        id: "ded_02",
        authorName: "Tía Beatriz Alcocer",
        message: "Querida Sofi y Mateo: Qué dicha tan inmensa verlos tan felices. Que su amor crezca cada día más.",
        giftTitle: "Cena Romántica en Le Sirenuse",
        amount: 8500,
        createdAt: "18 Octubre, 2026",
      },
      {
        id: "ded_03",
        authorName: "Fernando y Andrea",
        message: "¡A brindar por el amor verdadero! Nos vemos en San Miguel para celebrar en grande.",
        giftTitle: "Cafetera Espresso",
        amount: 3000,
        createdAt: "24 Octubre, 2026",
      },
    ],
  },
  {
    id: "evt_02",
    slug: "baby-shower-valetina",
    title: "Bienvenida Valentina — Baby Shower",
    type: "Baby Shower",
    hostNames: "Andrea Torres & Diego Morales",
    coHosts: "Abuelos Morales Torres",
    date: "28 de Noviembre, 2026",
    time: "11:00 hrs",
    locationName: "Jardín Mayita",
    address: "Av. Constituyentes 500",
    city: "Ciudad de México",
    coverImage:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=2000&q=80",
    story: "Esperamos con todo el amor a nuestra pequeña Valentina para iluminar nuestros días.",
    dressCode: "Smart Casual / Colores Pastel",
    itinerary: [
      { time: "11:00 hrs", title: "Recepción & Mimosa Bar", desc: "Bienvenida y fotografía familiar" },
      { time: "12:30 hrs", title: "Brunch Gourmet", desc: "Buffet campirano y mesa de postres" },
      { time: "14:00 hrs", title: "Dinámicas & Juegos", desc: "Momentos divertidos en honor a Valentina" },
    ],
    primaryColor: "#8c4d41",
    typography: "Playfair Display",
    isHost: false,
    gifts: [
      {
        id: "gift_201",
        title: "Cuna Convertible Ergonómica de Madera",
        description: "Cuna nórdica ecológica que crece junto con la bebé.",
        category: "Hogar",
        targetPrice: 18500,
        currentAmount: 14000,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "gift_202",
        title: "Fondo para Pañales & Cuidados del Primer Año",
        description: "Aportación libre para insumos pediátricos y bienestar.",
        category: "Aporte Libre",
        targetPrice: 20000,
        currentAmount: 16500,
        isFreeAmount: true,
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    rsvps: [],
    dedicatorias: [],
  },
  {
    id: "evt_03",
    slug: "cumpleanos-camila-30",
    title: "Camila Turns 30 — Golden Gala",
    type: "Cumpleaños",
    hostNames: "Camila Fernández",
    date: "10 de Diciembre, 2026",
    time: "20:00 hrs",
    locationName: "Terraza Cha Cha Chá",
    address: "Av de la República 157",
    city: "Ciudad de México",
    coverImage:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=2000&q=80",
    story: "¡30 años bien vividos merecen una noche mágica con cócteles, vista al Monumento y buena música!",
    dressCode: "Cocktail Chic / Toques Dorados",
    itinerary: [
      { time: "20:00 hrs", title: "Welcome Drinks", desc: "Champagne & Tapas" },
      { time: "22:00 hrs", title: "Pastel & Brindis", desc: "Golden Hour toast" },
    ],
    primaryColor: "#9E8C34",
    typography: "Playfair Display",
    isHost: true,
    gifts: [
      {
        id: "gift_301",
        title: "Vuelo en Globo sobre Teotihuacán",
        description: "Paseo al amanecer con brindis de champagne.",
        category: "Experiencias",
        targetPrice: 5800,
        currentAmount: 5800,
        isFreeAmount: false,
        image:
          "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80",
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
        setEvents(JSON.parse(storedEvents));
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
    return events.find((e) => e.slug === slug);
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
